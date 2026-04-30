"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function excluirRifa(formData: FormData) {
  const supabase = createServiceClient();
  const id = formData.get("id") as string;

  if (!id) {
    return { error: "ID da rifa não fornecido" };
  }

  // Primeiro excluir os números associados
  const { error: numerosError } = await supabase
    .from("rifa_numeros")
    .delete()
    .eq("rifa_id", id);

  if (numerosError) {
    console.error("Erro ao excluir números:", numerosError);
    return { error: numerosError.message };
  }

  // Depois excluir a rifa
  const { error } = await supabase
    .from("rifas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir rifa:", error);
    return { error: error.message };
  }

  revalidatePath("/rifas");
  revalidatePath("/admin/rifas");

  return { success: true };
}
