"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

export async function criarRifa(formData: FormData) {
  const supabase = createServiceClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const numero_inicio = parseInt(formData.get("numero_inicio") as string);
  const numero_fim = parseInt(formData.get("numero_fim") as string);
  const price_per_num = parseFloat(formData.get("price_per_num") as string);

  if (!title || !numero_inicio || !numero_fim || !price_per_num) {
    return { error: "Preencha todos os campos obrigatórios" };
  }

  const { data: rifa, error } = await supabase
    .from("rifas")
    .insert({
      title,
      description,
      numero_inicio,
      numero_fim,
      price_per_num,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar rifa:", error);
    return { error: error.message };
  }

  revalidatePath("/rifas");
  revalidatePath("/admin/rifas");

  return { success: true, rifa };
}
