import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rifaId } = await params;

  // Verificar autenticação e role admin
  const supabaseUser = await createClient();
  const { data: { user } } = await supabaseUser.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const supabase = await createServiceClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  // Verificar rifa
  const { data: rifa } = await supabase
    .from("rifas")
    .select("id, status")
    .eq("id", rifaId)
    .single();

  if (!rifa || rifa.status !== "active") {
    return NextResponse.json({ error: "Rifa não elegível para sorteio" }, { status: 400 });
  }

  // Buscar apenas números pagos
  const { data: pagos } = await supabase
    .from("rifa_numeros")
    .select("numero, reservado_por, telefone_interessado, nome_interessado")
    .eq("rifa_id", rifaId)
    .eq("status", "pago");

  // Verificar se todos os números estão pagos
  const { data: todos } = await supabase
    .from("rifa_numeros")
    .select("id")
    .eq("rifa_id", rifaId)
    .neq("status", "pago");

  if (!pagos || pagos.length === 0) {
    return NextResponse.json({ error: "Nenhum número pago" }, { status: 400 });
  }

  if (todos && todos.length > 0) {
    return NextResponse.json(
      { error: "Ainda há números não pagos. Todos devem estar pagos para sortear." },
      { status: 400 }
    );
  }

  // Sorteio com crypto.randomInt
  const { randomInt } = await import("crypto");
  const vencedorIdx = randomInt(0, pagos.length);
  const vencedor = pagos[vencedorIdx];

  // Persistir resultado
  await supabase
    .from("rifas")
    .update({
      status: "drawn",
      winner_numero: vencedor.numero,
      winner_id: vencedor.reservado_por,
      drawn_at: new Date().toISOString(),
    })
    .eq("id", rifaId);

  // Notificar via WhatsApp se houver telefone
  if (vencedor.telefone_interessado) {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/whatsapp/notificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telefone: vencedor.telefone_interessado,
        nome: vencedor.nome_interessado,
        numero: vencedor.numero,
        rifa_id: rifaId,
      }),
    });
  }

  return NextResponse.json({
    winner_numero: vencedor.numero,
    winner_name: vencedor.nome_interessado,
  });
}
