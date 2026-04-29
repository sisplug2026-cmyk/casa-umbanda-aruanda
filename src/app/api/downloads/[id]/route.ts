import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServiceClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { data: file } = await supabase
    .from("downloads")
    .select("file_url, title")
    .eq("id", id)
    .single();

  if (!file) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  // Gera URL assinada com validade de 1 hora
  const { data: signed } = await supabase.storage
    .from("downloads")
    .createSignedUrl(file.file_url, 3600);

  if (!signed?.signedUrl) {
    return NextResponse.json({ error: "Erro ao gerar URL" }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}
