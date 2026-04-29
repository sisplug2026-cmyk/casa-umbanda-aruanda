"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export async function criarPost(formData: FormData) {
  const supabase = createServiceClient();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as "draft" | "published";
  const tags = (formData.get("tags") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [];

  if (!title || !content) {
    return { error: "Título e conteúdo são obrigatórios" };
  }

  const slug = slugify(title);

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug,
      content,
      excerpt,
      category,
      status,
      tags,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar post:", error);
    return { error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");

  return { success: true, post };
}
