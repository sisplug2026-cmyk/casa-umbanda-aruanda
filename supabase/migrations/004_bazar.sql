-- Migration: Tabela de anúncios do bazar

CREATE TABLE IF NOT EXISTS public.bazar_anuncios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  preco NUMERIC(10,2) NOT NULL,
  condicao TEXT NOT NULL CHECK (condicao IN ('novo', 'usado')),
  categoria TEXT,
  imagens TEXT[],
  telefone TEXT NOT NULL,
  localizacao TEXT,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'vendido', 'cancelado')),
  anunciante_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bazar_status ON public.bazar_anuncios(status);
CREATE INDEX IF NOT EXISTS idx_bazar_categoria ON public.bazar_anuncios(categoria);
CREATE INDEX IF NOT EXISTS idx_bazar_anunciante ON public.bazar_anuncios(anunciante_id);

-- RLS
ALTER TABLE public.bazar_anuncios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bazar_public_read"
  ON public.bazar_anuncios FOR SELECT
  USING (status = 'ativo');

CREATE POLICY "bazar_insert_authenticated"
  ON public.bazar_anuncios FOR INSERT
  WITH CHECK (auth.uid() = anunciante_id);

CREATE POLICY "bazar_update_own"
  ON public.bazar_anuncios FOR UPDATE
  USING (auth.uid() = anunciante_id);

CREATE POLICY "bazar_delete_own"
  ON public.bazar_anuncios FOR DELETE
  USING (auth.uid() = anunciante_id);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_bazar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS bazar_updated_at ON public.bazar_anuncios;
CREATE TRIGGER bazar_updated_at
  BEFORE UPDATE ON public.bazar_anuncios
  FOR EACH ROW EXECUTE FUNCTION update_bazar_updated_at();
