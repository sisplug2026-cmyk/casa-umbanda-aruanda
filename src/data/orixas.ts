export interface Orixa {
  slug: string;
  nome: string;
  dominio: string;
  cor: string;
  corHex: string;
  dia: string;
  saudacao: string;
  descricao: string;
  elemento: string;
}

export const orixas: Orixa[] = [
  {
    slug: "ogum",
    nome: "Ogum",
    dominio: "Guerra, trabalho, caminhos e proteção",
    cor: "Azul e vermelho",
    corHex: "#1E40AF",
    dia: "Segunda-feira",
    saudacao: "Ogum Yê!",
    descricao:
      "Ogum é o orixá dos caminhos, da guerra e do trabalho. Protetor dos trabalhadores e guerreiros, abre as estradas e remove os obstáculos. Regente do ferro e das ferramentas, é invocado para proteção e abertura de caminhos na vida material e espiritual.",
    elemento: "Ferro e terra",
  },
  {
    slug: "oxossi",
    nome: "Oxóssi",
    dominio: "Caça, fartura, floresta e abundância",
    cor: "Verde e azul",
    corHex: "#166534",
    dia: "Quinta-feira",
    saudacao: "Okê Arô!",
    descricao:
      "Oxóssi é o orixá da caça, da floresta e da abundância. Senhor das matas e dos animais, representa a fartura e a prosperidade. É o caçador divino que provê sustento e sabedoria através da observação da natureza.",
    elemento: "Floresta e natureza",
  },
  {
    slug: "xango",
    nome: "Xangô",
    dominio: "Justiça, trovão, raios e equilíbrio",
    cor: "Vermelho e branco",
    corHex: "#DC2626",
    dia: "Quarta-feira",
    saudacao: "Kaô Kabiesilê!",
    descricao:
      "Xangô é o orixá da justiça, do trovão e da equidade. Rei das pedreiras e senhor dos raios, representa a força da justiça divina. É invocado para equilibrar situações injustas e trazer o retorno correto a cada ação.",
    elemento: "Fogo e pedra",
  },
  {
    slug: "iansa",
    nome: "Iansã",
    dominio: "Tempestades, ventos, raios e transformação",
    cor: "Vermelho e marrom",
    corHex: "#B91C1C",
    dia: "Terça-feira",
    saudacao: "Epahei Iansã!",
    descricao:
      "Iansã é a orixá das tempestades, dos ventos e da transformação. Guerreira corajosa e senhora dos raios ao lado de Xangô, representa a força feminina, a coragem e a capacidade de mudança. Rege as almas dos mortos (eguns).",
    elemento: "Vento e fogo",
  },
  {
    slug: "oxum",
    nome: "Oxum",
    dominio: "Amor, rios, fertilidade e riqueza",
    cor: "Amarelo e dourado",
    corHex: "#D97706",
    dia: "Sábado",
    saudacao: "Ora Yê Yê Ô!",
    descricao:
      "Oxum é a orixá do amor, dos rios e da fertilidade. Senhora das águas doces e da riqueza, representa o amor materno, a beleza e a abundância. É a protetora das crianças e das gestantes, trazendo alegria e prosperidade.",
    elemento: "Água doce e ouro",
  },
  {
    slug: "iemanja",
    nome: "Iemanjá",
    dominio: "Mar, maternidade, proteção e cura",
    cor: "Azul claro e branco",
    corHex: "#0EA5E9",
    dia: "Sábado",
    saudacao: "Odoyá!",
    descricao:
      "Iemanjá é a grande mãe das águas, orixá do mar e da maternidade universal. Protetora dos pescadores e de todos que navegam, representa o amor materno incondicional. É invocada para proteção, cura emocional e equilíbrio espiritual.",
    elemento: "Mar e água salgada",
  },
  {
    slug: "oxala",
    nome: "Oxalá",
    dominio: "Paz, criação, sabedoria e pureza",
    cor: "Branco",
    corHex: "#F8FAFC",
    dia: "Sexta-feira",
    saudacao: "Êpa Babá!",
    descricao:
      "Oxalá é o orixá da paz, da criação e da pureza. Pai de todos os orixás e criador da forma humana, representa a sabedoria ancestral, a calma e a espiritualidade elevada. É o mensageiro de Olorum e o grande protetor da humanidade.",
    elemento: "Ar e luz",
  },
];
