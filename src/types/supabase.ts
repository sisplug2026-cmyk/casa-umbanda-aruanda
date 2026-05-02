export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          role: "admin" | "membro";
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          phone?: string | null;
          role?: "admin" | "membro";
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          role?: "admin" | "membro";
          avatar_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: string;
          excerpt: string | null;
          cover_url: string | null;
          author_id: string | null;
          status: "draft" | "published";
          category: string | null;
          tags: string[] | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          content: string;
          excerpt?: string | null;
          cover_url?: string | null;
          author_id?: string | null;
          status?: "draft" | "published";
          category?: string | null;
          tags?: string[] | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          cover_url?: string | null;
          author_id?: string | null;
          status?: "draft" | "published";
          category?: string | null;
          tags?: string[] | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          content?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      downloads: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          file_url: string;
          file_type: "pdf" | "audio" | "video" | "other" | null;
          category: string | null;
          size_bytes: number | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          file_url: string;
          file_type?: "pdf" | "audio" | "video" | "other" | null;
          category?: string | null;
          size_bytes?: number | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          file_url?: string;
          file_type?: "pdf" | "audio" | "video" | "other" | null;
          category?: string | null;
          size_bytes?: number | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      rifas: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          prize_images: string[] | null;
          numero_inicio: number;
          numero_fim: number;
          price_per_num: number;
          status: "active" | "closed" | "drawn";
          winner_numero: number | null;
          winner_id: string | null;
          drawn_at: string | null;
          created_by: string | null;
          created_at: string;
          tipo_numeracao: "numerica" | "nomes_masculinos" | "nomes_femininos" | "times_brasil" | "times_europa" | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          prize_images?: string[] | null;
          numero_inicio: number;
          numero_fim: number;
          price_per_num: number;
          status?: "active" | "closed" | "drawn";
          winner_numero?: number | null;
          winner_id?: string | null;
          drawn_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          tipo_numeracao?: "numerica" | "nomes_masculinos" | "nomes_femininos" | "times_brasil" | "times_europa" | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          prize_images?: string[] | null;
          numero_inicio?: number;
          numero_fim?: number;
          price_per_num?: number;
          status?: "active" | "closed" | "drawn";
          winner_numero?: number | null;
          winner_id?: string | null;
          drawn_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          tipo_numeracao?: "numerica" | "nomes_masculinos" | "nomes_femininos" | "times_brasil" | "times_europa" | null;
        };
        Relationships: [];
      };
      rifa_numeros: {
        Row: {
          id: string;
          rifa_id: string;
          numero: number;
          nome_exibicao: string | null;
          status: "disponivel" | "reservado" | "pago";
          reservado_por: string | null;
          nome_interessado: string | null;
          telefone_interessado: string | null;
          email_interessado: string | null;
          payment_id: string | null;
          payment_qr_code: string | null;
          payment_pix_key: string | null;
          reserved_at: string | null;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          rifa_id: string;
          numero: number;
          nome_exibicao?: string | null;
          status?: "disponivel" | "reservado" | "pago";
          reservado_por?: string | null;
          nome_interessado?: string | null;
          telefone_interessado?: string | null;
          email_interessado?: string | null;
          payment_id?: string | null;
          payment_qr_code?: string | null;
          payment_pix_key?: string | null;
          reserved_at?: string | null;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          rifa_id?: string;
          numero?: number;
          nome_exibicao?: string | null;
          status?: "disponivel" | "reservado" | "pago";
          reservado_por?: string | null;
          nome_interessado?: string | null;
          telefone_interessado?: string | null;
          email_interessado?: string | null;
          payment_id?: string | null;
          payment_qr_code?: string | null;
          payment_pix_key?: string | null;
          reserved_at?: string | null;
          paid_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "rifa_numeros_rifa_id_fkey";
            columns: ["rifa_id"];
            isOneToOne: false;
            referencedRelation: "rifas";
            referencedColumns: ["id"];
          }
        ];
      };
      doacoes: {
        Row: {
          id: string;
          donor_id: string | null;
          donor_name: string | null;
          donor_email: string | null;
          amount: number;
          type: "unica" | "recorrente";
          status: "pending" | "approved" | "rejected";
          payment_method: "pix" | "credit_card" | null;
          payment_id: string | null;
          payment_url: string | null;
          recurrence_id: string | null;
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          donor_id?: string | null;
          donor_name?: string | null;
          donor_email?: string | null;
          amount: number;
          type: "unica" | "recorrente";
          status?: "pending" | "approved" | "rejected";
          payment_method?: "pix" | "credit_card" | null;
          payment_id?: string | null;
          payment_url?: string | null;
          recurrence_id?: string | null;
          created_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          donor_id?: string | null;
          donor_name?: string | null;
          donor_email?: string | null;
          amount?: number;
          type?: "unica" | "recorrente";
          status?: "pending" | "approved" | "rejected";
          payment_method?: "pix" | "credit_card" | null;
          payment_id?: string | null;
          payment_url?: string | null;
          recurrence_id?: string | null;
          created_at?: string;
          paid_at?: string | null;
        };
        Relationships: [];
      };
      bazar_anuncios: {
        Row: {
          id: string;
          titulo: string;
          descricao: string | null;
          preco: number;
          condicao: "novo" | "usado";
          categoria: string | null;
          imagens: string[] | null;
          telefone: string;
          localizacao: string | null;
          status: "ativo" | "vendido" | "cancelado";
          anunciante_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          titulo: string;
          descricao?: string | null;
          preco: number;
          condicao: "novo" | "usado";
          categoria?: string | null;
          imagens?: string[] | null;
          telefone: string;
          localizacao?: string | null;
          status?: "ativo" | "vendido" | "cancelado";
          anunciante_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          titulo?: string;
          descricao?: string | null;
          preco?: number;
          condicao?: "novo" | "usado";
          categoria?: string | null;
          imagens?: string[] | null;
          telefone?: string;
          localizacao?: string | null;
          status?: "ativo" | "vendido" | "cancelado";
          anunciante_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bazar_anuncios_anunciante_id_fkey";
            columns: ["anunciante_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      reservar_numeros: {
        Args: {
          p_rifa_id: string;
          p_numeros: number[];
          p_nome: string;
          p_telefone: string;
          p_email: string;
        };
        Returns: boolean;
      };
      expirar_reservas_rifa: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
