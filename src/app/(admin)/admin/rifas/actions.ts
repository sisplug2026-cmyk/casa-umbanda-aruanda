"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function excluirRifa(formData: FormData): Promise<void> {
  const supabase = createServiceClient();
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID da rifa não fornecido");
  }

  // Primeiro excluir os números associados
  const { error: numerosError } = await supabase
    .from("rifa_numeros")
    .delete()
    .eq("rifa_id", id);

  if (numerosError) {
    console.error("Erro ao excluir números:", numerosError);
    throw new Error(numerosError.message);
  }

  // Depois excluir a rifa
  const { error } = await supabase
    .from("rifas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao excluir rifa:", error);
    throw new Error(error.message);
  }

  revalidatePath("/rifas");
  revalidatePath("/admin/rifas");
}
