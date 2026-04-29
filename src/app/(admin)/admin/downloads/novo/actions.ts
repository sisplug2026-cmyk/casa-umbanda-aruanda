"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function criarDownload(formData: FormData) {
  const supabase = createServiceClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const file_type = formData.get("file_type") as string;
  const file_url = formData.get("file_url") as string;

  if (!title || !file_url) {
    return { error: "Título e URL do arquivo são obrigatórios" };
  }

  const { data: download, error } = await supabase
    .from("downloads")
    .insert({
      title,
      description,
      category,
      file_type,
      file_url,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar download:", error);
    return { error: error.message };
  }

  revalidatePath("/membro/downloads");
  revalidatePath("/admin/downloads");

  return { success: true, download };
}
