import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";

const reservaSchema = z.object({
  numeros: z.array(z.number().int().positive()).min(1).max(10),
  nome: z.string().min(2).max(100),
  telefone: z.string().min(10).max(20),
  email: z.string().email(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rifaId } = await params;

  let body: z.infer<typeof reservaSchema>;
  try {
    body = reservaSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  // Verificar se a rifa existe e está ativa
  const { data: rifa } = await supabase
    .from("rifas")
    .select("id, price_per_num, status")
    .eq("id", rifaId)
    .single();

  if (!rifa || rifa.status !== "active") {
    return NextResponse.json({ error: "Rifa não disponível" }, { status: 400 });
  }

  // Reservar números atomicamente via RPC
  const { error: rpcError } = await supabase.rpc("reservar_numeros", {
    p_rifa_id: rifaId,
    p_numeros: body.numeros,
    p_nome: body.nome,
    p_telefone: body.telefone,
    p_email: body.email,
  });

  if (rpcError) {
    return NextResponse.json(
      { error: rpcError.message ?? "Números não disponíveis" },
      { status: 409 }
    );
  }

  const totalAmount = rifa.price_per_num * body.numeros.length;

  // Criar pagamento PIX no Mercado Pago
  const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      "X-Idempotency-Key": `rifa-${rifaId}-${body.numeros.join("-")}-${Date.now()}`,
    },
    body: JSON.stringify({
      transaction_amount: totalAmount,
      description: `Rifa ${rifaId} — números ${body.numeros.join(", ")}`,
      payment_method_id: "pix",
      payer: {
        email: body.email,
        first_name: body.nome.split(" ")[0],
        last_name: body.nome.split(" ").slice(1).join(" ") || body.nome,
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
    }),
  });

  if (!mpRes.ok) {
    // Desfazer reserva em caso de erro MP
    await supabase
      .from("rifa_numeros")
      .update({ status: "disponivel", nome_interessado: null, telefone_interessado: null, email_interessado: null, reserved_at: null })
      .eq("rifa_id", rifaId)
      .in("numero", body.numeros);

    return NextResponse.json(
      { error: "Erro ao criar pagamento PIX" },
      { status: 500 }
    );
  }

  const mpData = await mpRes.json();
  const paymentId = String(mpData.id);
  const qrCode: string = mpData.point_of_interaction?.transaction_data?.qr_code_base64 ?? "";
  const pixKey: string = mpData.point_of_interaction?.transaction_data?.qr_code ?? "";

  // Salvar payment_id e QR Code nos números
  await supabase
    .from("rifa_numeros")
    .update({ payment_id: paymentId, payment_qr_code: qrCode, payment_pix_key: pixKey })
    .eq("rifa_id", rifaId)
    .in("numero", body.numeros);

  return NextResponse.json({
    payment_id: paymentId,
    qr_code_base64: qrCode,
    pix_copia_cola: pixKey,
    amount: totalAmount,
  });
}
