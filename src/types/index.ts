import type { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Download = Database["public"]["Tables"]["downloads"]["Row"];
export type Rifa = Database["public"]["Tables"]["rifas"]["Row"];
export type RifaNumero = Database["public"]["Tables"]["rifa_numeros"]["Row"];
export type Doacao = Database["public"]["Tables"]["doacoes"]["Row"];
