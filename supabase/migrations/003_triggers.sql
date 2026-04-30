-- Migration 003: Triggers e Funções

-- =====================
-- Trigger: Auto-criar profile ao registrar usuário
-- =====================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================
-- Trigger: updated_at em posts
-- =====================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS posts_set_updated_at ON public.posts;
CREATE TRIGGER posts_set_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================
-- Função: Expirar reservas de rifa (chamada por cron ou lazy)
-- =====================
CREATE OR REPLACE FUNCTION public.expirar_reservas_rifa()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.rifa_numeros
  SET
    status = 'disponivel',
    reservado_por = NULL,
    nome_interessado = NULL,
    telefone_interessado = NULL,
    email_interessado = NULL,
    payment_id = NULL,
    payment_qr_code = NULL,
    payment_pix_key = NULL,
    reserved_at = NULL
  WHERE
    status = 'reservado'
    AND reserved_at < NOW() - INTERVAL '30 minutes';
END;
$$;

-- =====================
-- Função: Reservar números de rifa (transação atômica)
-- =====================
CREATE OR REPLACE FUNCTION public.reservar_numeros(
  p_rifa_id       UUID,
  p_numeros       INT[],
  p_nome          TEXT,
  p_telefone      TEXT,
  p_email         TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INT;
BEGIN
  -- Verificar se todos os números estão disponíveis
  SELECT COUNT(*) INTO v_count
  FROM public.rifa_numeros
  WHERE rifa_id = p_rifa_id
    AND numero = ANY(p_numeros)
    AND status = 'disponivel';

  IF v_count <> array_length(p_numeros, 1) THEN
    RAISE EXCEPTION 'Um ou mais números já não estão disponíveis';
  END IF;

  -- Reservar os números atomicamente
  UPDATE public.rifa_numeros
  SET
    status               = 'reservado',
    nome_interessado     = p_nome,
    telefone_interessado = p_telefone,
    email_interessado    = p_email,
    reserved_at          = NOW()
  WHERE rifa_id = p_rifa_id
    AND numero = ANY(p_numeros)
    AND status = 'disponivel';

  RETURN TRUE;
END;
$$;

-- =====================
-- Seed: Popular números de uma rifa ao criá-la
-- REMOVIDO: Agora os números são criados via Server Action com suporte a nomes/times
-- =====================
-- CREATE OR REPLACE FUNCTION public.popular_numeros_rifa()
-- ...

DROP TRIGGER IF EXISTS rifa_popular_numeros ON public.rifas;
DROP FUNCTION IF EXISTS public.popular_numeros_rifa();
