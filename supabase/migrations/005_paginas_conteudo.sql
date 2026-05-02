-- Migration: Tabela para conteúdo editável das páginas institucionais

CREATE TABLE IF NOT EXISTS public.paginas_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  imagem_url TEXT,
  meta_descricao TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- RLS
ALTER TABLE public.paginas_conteudo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "paginas_public_read"
  ON public.paginas_conteudo FOR SELECT
  USING (true);

CREATE POLICY "paginas_admin_all"
  ON public.paginas_conteudo FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Inserir páginas padrão
INSERT INTO public.paginas_conteudo (slug, titulo, conteudo, meta_descricao) VALUES
('inicio', 'Página Inicial', 
'## Bem-vindo à Casa de Umbanda Aruanda

A Casa de Umbanda Aruanda é um espaço sagrado dedicado à prática e preservação da Umbanda, religião brasileira que une tradições africanas, indígenas e europeias.

### Nossa Missão
- Promover a fé e a espiritualidade
- Acolher a todos sem distinção
- Preservar as tradições ancestrais
- Servir ao próximo com amor e caridade

### Fundação
A Umbanda foi fundada em 15 de novembro de 1908 por Zélio Fernandino de Morais, no Rio de Janeiro. Desde então, tem sido uma fonte de luz e orientação para milhões de brasileiros.

Venha conhecer nossa casa e participar de nossas atividades!',
'Casa de Umbanda Aruanda - Fé, Tradição e Espiritualidade. Conheça nossa história e participe.'),

('fundacao', 'Fundação da Umbanda',
'## A Fundação da Umbanda

A Umbanda nasceu oficialmente em **15 de novembro de 1908**, no Rio de Janeiro, através do médium **Zélio Fernandino de Morais**.

### O Primeiro Chamado
Zélio tinha apenas 17 anos quando, durante uma sessão espírita, foi incorporado por um espírito que se identificou como **Caboclo das Sete Encruzilhadas**. Este espírito anunciou o nascimento de uma nova doutrina que uniria todas as raças e credos.

### Os Três Princípios Fundamentais
1. **Caridade** - A prática do bem sem distinção
2. **Fraternidade** - A união entre todos os seres
3. **Amor ao Próximo** - O serviço desinteressado

### Expansão
Desde sua fundação, a Umbanda se espalhou por todo o Brasil e hoje é uma das maiores religiões do país, com milhões de praticantes.

A Casa de Umbanda Aruanda mantém viva esta tradição desde [ano de fundação da casa].',
'História da fundação da Umbanda por Zélio Fernandino de Morais em 15 de novembro de 1908.'),

('orixas', 'Os Orixás',
'## Os Orixás na Umbanda

Os Orixás são as divindades da natureza, representando as forças cósmicas que regem o universo. Na Umbanda, são reverenciados como guias espirituais e protetores.

### Principais Orixás

**Oxalá** - O criador, pai de todos. Representa a paz, a pureza e a sabedoria. Sua cor é o branco.

**Iemanjá** - A mãe de todos os orixás, rainha do mar. Representa a maternidade, a proteção e o amor incondicional. Sua cor é o azul/prateado.

**Xangô** - O justeiro, senhor do fogo e dos trovões. Representa a justiça, a verdade e a lei. Sua cor é o vermelho/branco.

**Oxum** - A rainha das águas doces. Representa o amor, a fertilidade e a beleza. Sua cor é o amarelo/dourado.

**Ogum** - O guerreiro, senhor da guerra e do ferro. Representa a coragem, a determinação e a vitória. Sua cor é o azul/vermelho.

**Iansã** - A senhora dos ventos e tempestades. Representa a mudança, a transformação e a paixão. Sua cor é o vermelho.

**Oxóssi** - O caçador, senhor das matas. Representa a sabedoria, a concentração e a providência. Sua cor é o verde.

Cada Orixá possui características únicas e oferece proteção específica a seus filhos de santo.',
'Conheça os Orixás da Umbanda: Oxalá, Iemanjá, Xangô, Oxum, Ogum, Iansã e Oxóssi.')

ON CONFLICT (slug) DO NOTHING;
