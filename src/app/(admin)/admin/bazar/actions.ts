"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function excluirAnuncio(formData: FormData): Promise<void> {
  const supabase = createServiceClient();
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID do anúncio não fornecido");
  }

  const { error } = await supabase
    .from("bazar_anuncios")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir anúncio:", error);
    throw new Error(error.message);
  }

  revalidatePath("/bazar");
  revalidatePath("/admin/bazar");
}
