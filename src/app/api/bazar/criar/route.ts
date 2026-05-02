import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const formData = await request.formData();
    
    const titulo = formData.get("titulo") as string;
    const descricao = formData.get("descricao") as string;
    const preco = parseFloat(formData.get("preco") as string);
    const condicao = formData.get("condicao") as "novo" | "usado";
    const categoria = formData.get("categoria") as string;
    const telefone = formData.get("telefone") as string;
    const localizacao = formData.get("localizacao") as string;
    const imagensJson = formData.get("imagens") as string;
    const imagens = imagensJson ? JSON.parse(imagensJson) : [];

    if (!titulo || !preco || !condicao || !telefone) {
      return NextResponse.json({ error: "Preencha todos os campos obrigatórios" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("bazar_anuncios")
      .insert({
        titulo,
        descricao,
        preco,
        condicao,
        categoria,
        telefone,
        localizacao,
        imagens,
        anunciante_id: user.id,
        status: "ativo",
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao criar anúncio:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, anuncio: data });
  } catch (error: any) {
    console.error("Erro:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
