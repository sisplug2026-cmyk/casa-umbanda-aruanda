"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function excluirPost(formData: FormData) {
  const supabase = createServiceClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { error: "ID do post não fornecido" };
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir post:", error);
    return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");

  return { success: true };
}
