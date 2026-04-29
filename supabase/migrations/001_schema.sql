-- Migration 001: Schema completo — Casa de Umbanda Aruanda

-- Perfis de usuário (extensão de auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       TEXT,
  role        TEXT NOT NULL DEFAULT 'membro' CHECK (role IN ('admin', 'membro')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Posts do blog
CREATE TABLE IF NOT EXISTS public.posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  excerpt      TEXT,
  cover_url    TEXT,
  author_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category     TEXT,
  tags         TEXT[],
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Comentários
CREATE TABLE IF NOT EXISTS public.comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Arquivos para download
CREATE TABLE IF NOT EXISTS public.downloads (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  file_url     TEXT NOT NULL,
  file_type    TEXT CHECK (file_type IN ('pdf', 'audio', 'video', 'other')),
  category     TEXT,
  size_bytes   BIGINT,
  created_by   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Rifas
CREATE TABLE IF NOT EXISTS public.rifas (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  description    TEXT,
  prize_images   TEXT[],
  numero_inicio  INT NOT NULL,
  numero_fim     INT NOT NULL,
  price_per_num  NUMERIC(10,2) NOT NULL,
  status         TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'drawn')),
  winner_numero  INT,
  winner_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  drawn_at       TIMESTAMPTZ,
  created_by     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Números de rifa
CREATE TABLE IF NOT EXISTS public.rifa_numeros (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rifa_id              UUID NOT NULL REFERENCES public.rifas(id) ON DELETE CASCADE,
  numero               INT NOT NULL,
  status               TEXT NOT NULL DEFAULT 'disponivel'
                         CHECK (status IN ('disponivel', 'reservado', 'pago')),
  reservado_por        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  nome_interessado     TEXT,
  telefone_interessado TEXT,
  email_interessado    TEXT,
  payment_id           TEXT,
  payment_qr_code      TEXT,
  payment_pix_key      TEXT,
  reserved_at          TIMESTAMPTZ,
  paid_at              TIMESTAMPTZ,
  UNIQUE (rifa_id, numero)
);

-- Doações
CREATE TABLE IF NOT EXISTS public.doacoes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  donor_name      TEXT,
  donor_email     TEXT,
  amount          NUMERIC(10,2) NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('unica', 'recorrente')),
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected')),
  payment_method  TEXT CHECK (payment_method IN ('pix', 'credit_card')),
  payment_id      TEXT,
  payment_url     TEXT,
  recurrence_id   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  paid_at         TIMESTAMPTZ
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_rifa_numeros_rifa_id ON public.rifa_numeros(rifa_id);
CREATE INDEX IF NOT EXISTS idx_rifa_numeros_status ON public.rifa_numeros(status);
CREATE INDEX IF NOT EXISTS idx_rifa_numeros_payment_id ON public.rifa_numeros(payment_id);
CREATE INDEX IF NOT EXISTS idx_doacoes_donor_id ON public.doacoes(donor_id);
CREATE INDEX IF NOT EXISTS idx_doacoes_payment_id ON public.doacoes(payment_id);
