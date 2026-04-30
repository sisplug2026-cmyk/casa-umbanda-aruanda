// Dados para numeração de rifas com nomes e times

export const nomesMasculinos = [
  "Arthur", "Bernardo", "Carlos", "Daniel", "Eduardo", "Felipe", "Gabriel", "Henrique",
  "Igor", "João", "Kleber", "Lucas", "Marcos", "Nicolas", "Otávio", "Pedro",
  "Quintino", "Rafael", "Samuel", "Thiago", "Ulisses", "Vinícius", "William", "Xavier",
  "Yago", "Zeca", "Adriano", "Bruno", "Caio", "Diego", "Emerson", "Fábio",
  "Gustavo", "Hugo", "Ian", "Jorge", "Kaique", "Leonardo", "Mateus", "Nathan",
  "Oscar", "Paulo", "Queiroz", "Rodrigo", "Sérgio", "Tales", "Ugo", "Vitor",
  "Wagner", "Yuri"
];

export const nomesFemininos = [
  "Ana", "Beatriz", "Carolina", "Daniela", "Eduarda", "Fernanda", "Gabriela", "Helena",
  "Isabela", "Juliana", "Karina", "Larissa", "Mariana", "Natália", "Olívia", "Patrícia",
  "Queila", "Raquel", "Sofia", "Tatiana", "Ursula", "Valentina", "Wanessa", "Ximena",
  "Yasmin", "Zilda", "Amanda", "Bianca", "Camila", "Débora", "Elisa", "Flávia",
  "Giovanna", "Heloísa", "Ingrid", "Jéssica", "Kelly", "Lorena", "Melissa", "Nina",
  "Ophelia", "Priscila", "Quésia", "Renata", "Sabrina", "Talita", "Úrsula", "Viviane",
  "Walesca", "Yara"
];

export const timesBrasil = [
  "Flamengo", "Palmeiras", "Santos", "São Paulo", "Corinthians", "Vasco", "Botafogo",
  "Fluminense", "Grêmio", "Internacional", "Cruzeiro", "Atlético-MG", "Bahia", "Sport",
  "Ceará", "Fortaleza", "Goiás", "Coritiba", "Athletico-PR", "América-MG",
  "Red Bull Bragantino", "Cuiabá", "Juventude", "Vitória"
];

export const timesEuropa = [
  "Real Madrid", "Barcelona", "Manchester United", "Liverpool", "Bayern Munich",
  "Juventus", "Milan", "Inter", "PSG", "Chelsea", "Arsenal", "Manchester City",
  "Borussia Dortmund", "Atlético Madrid", "Tottenham", "Napoli", "Roma", "Ajax",
  "Benfica", "Porto", "Sporting", "Celtic", "Rangers", "Olympique Lyon",
  "Marseille", "Sevilla", "Valencia", "Villarreal", "Real Sociedad", "Betis"
];

export function getNumeracao(tipo: string, quantidade: number): string[] {
  switch (tipo) {
    case "nomes_masculinos":
      return nomesMasculinos.slice(0, quantidade);
    case "nomes_femininos":
      return nomesFemininos.slice(0, quantidade);
    case "times_brasil":
      return timesBrasil.slice(0, quantidade);
    case "times_europa":
      return timesEuropa.slice(0, quantidade);
    default:
      // Numérica padrão
      return Array.from({ length: quantidade }, (_, i) => (i + 1).toString().padStart(3, "0"));
  }
}
