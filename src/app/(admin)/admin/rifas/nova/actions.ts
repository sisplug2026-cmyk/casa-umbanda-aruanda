"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { getNumeracao } from "@/data/numeracao-rifa";

export async function criarRifa(formData: FormData) {
  const supabase = createServiceClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const prize_image = formData.get("prize_image") as string;
  const numero_inicio = parseInt(formData.get("numero_inicio") as string);
  const numero_fim = parseInt(formData.get("numero_fim") as string);
  const price_per_num = parseFloat(formData.get("price_per_num") as string);
  const tipo_numeracao = (formData.get("tipo_numeracao") as "numerica" | "nomes_masculinos" | "nomes_femininos" | "times_brasil" | "times_europa") || "numerica";

  console.log("Dados recebidos:", { title, prize_image: prize_image || "VAZIO", tipo_numeracao, numero_inicio, numero_fim });

  if (!title || !numero_inicio || !numero_fim || !price_per_num) {
    return { error: "Preencha todos os campos obrigatórios" };
  }

  const quantidade = numero_fim - numero_inicio + 1;

  const { data: rifa, error } = await supabase
    .from("rifas")
    .insert({
      title,
      description,
      prize_images: prize_image ? [prize_image] : null,
      numero_inicio,
      numero_fim,
      price_per_num,
      status: "active",
      tipo_numeracao,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar rifa:", error);
    return { error: error.message };
  }

  // Gerar números/nomes/times conforme o tipo
  const numeracao = getNumeracao(tipo_numeracao, quantidade);
  
  const numerosParaInserir = numeracao.map((valor, index) => ({
    rifa_id: rifa.id,
    numero: index + 1, // número sequencial interno
    nome_exibicao: valor, // nome/time exibido
  }));

  // Inserir na tabela rifa_numeros
  const { error: numerosError } = await supabase
    .from("rifa_numeros")
    .insert(numerosParaInserir);

  if (numerosError) {
    console.error("Erro ao criar números:", numerosError);
    return { error: numerosError.message };
  }

  revalidatePath("/rifas");
  revalidatePath("/admin/rifas");

  return { success: true, rifa };
}
