"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function atualizarPagina(formData: FormData): Promise<void> {
  const supabase = createServiceClient();
  
  const id = formData.get("id") as string;
  const titulo = formData.get("titulo") as string;
  const conteudo = formData.get("conteudo") as string;
  const meta_descricao = formData.get("meta_descricao") as string;
  const imagem_url = formData.get("imagem_url") as string;

  if (!id || !titulo || !conteudo) {
    throw new Error("Preencha todos os campos obrigatórios");
  }

  const { error } = await supabase
    .from("paginas_conteudo")
    .update({
      titulo,
      conteudo,
      meta_descricao,
      imagem_url: imagem_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar página:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/fundacao");
  revalidatePath("/orixas");
  revalidatePath("/admin/paginas");
}
