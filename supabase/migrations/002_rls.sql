-- Migration 002: Row Level Security Policies

-- =====================
-- PROFILES
-- =====================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_select_all"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- =====================
-- POSTS
-- =====================
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_public_read"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "posts_admin_all"
  ON public.posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================
-- COMMENTS
-- =====================
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments_public_read"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "comments_insert_authenticated"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "comments_delete_own"
  ON public.comments FOR DELETE
  USING (auth.uid() = author_id);

CREATE POLICY "comments_admin_delete"
  ON public.comments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================
-- DOWNLOADS
-- =====================
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "downloads_members_read"
  ON public.downloads FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "downloads_admin_all"
  ON public.downloads FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================
-- RIFAS
-- =====================
ALTER TABLE public.rifas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rifas_public_read"
  ON public.rifas FOR SELECT
  USING (true);

CREATE POLICY "rifas_admin_all"
  ON public.rifas FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================
-- RIFA_NUMEROS
-- =====================
ALTER TABLE public.rifa_numeros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rifa_numeros_public_read"
  ON public.rifa_numeros FOR SELECT
  USING (true);

-- Reserva pública via função RPC (service_role contorna RLS)
-- Admin pode tudo
CREATE POLICY "rifa_numeros_admin_all"
  ON public.rifa_numeros FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================
-- DOACOES
-- =====================
ALTER TABLE public.doacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "doacoes_select_own"
  ON public.doacoes FOR SELECT
  USING (auth.uid() = donor_id);

CREATE POLICY "doacoes_insert_public"
  ON public.doacoes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "doacoes_admin_all"
  ON public.doacoes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
