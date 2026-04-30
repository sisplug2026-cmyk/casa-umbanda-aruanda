// Dados para numeração de rifas com nomes e times

export const nomesMasculinos = [
  "Arthur", "Bernardo", "Carlos", "Daniel", "Eduardo", "Felipe", "Gabriel", "Henrique",
  "Igor", "João", "Kleber", "Lucas", "Marcos", "Nicolas", "Otávio", "Pedro",
  "Quintino", "Rafael", "Samuel", "Thiago", "Ulisses", "Vinícius", "William", "Xavier",
  "Yago", "Zeca", "Adriano", "Bruno", "Caio", "Diego", "Emerson", "Fábio",
  "Gustavo", "Hugo", "Ian", "Jorge", "Kaique", "Leonardo", "Mateus", "Nathan",
  "Oscar", "Paulo", "Queiroz", "Rodrigo", "Sérgio", "Tales", "Ugo", "Vitor",
  "Wagner", "Yuri", "Alexandre", "Breno", "César", "Davi", "Elias", "Fernando",
  "George", "Heitor", "Isaac", "Jonas", "Kevin", "Luan", "Miguel", "Noah",
  "Oliver", "Patrick", "Quirino", "Ricardo", "Silas", "Tobias", "Uriel", "Victor",
  "Wesley", "Yan", "Álvaro", "Bryan", "Caleb", "Dante", "Enzo", "Frederico",
  "Gael", "Hector", "Ivan", "Jasper", "Klaus", "Lorenzo", "Martin", "Nelson",
  "Orlando", "Pietro", "Quentin", "Ramiro", "Saulo", "Teodoro", "Urbano", "Valente",
  "Wallace", "Xandro", "Yael", "Zion"
];

export const nomesFemininos = [
  "Ana", "Beatriz", "Carolina", "Daniela", "Eduarda", "Fernanda", "Gabriela", "Helena",
  "Isabela", "Juliana", "Karina", "Larissa", "Mariana", "Natália", "Olívia", "Patrícia",
  "Queila", "Raquel", "Sofia", "Tatiana", "Ursula", "Valentina", "Wanessa", "Ximena",
  "Yasmin", "Zilda", "Amanda", "Bianca", "Camila", "Débora", "Elisa", "Flávia",
  "Giovanna", "Heloísa", "Ingrid", "Jéssica", "Kelly", "Lorena", "Melissa", "Nina",
  "Ophelia", "Priscila", "Quésia", "Renata", "Sabrina", "Talita", "Úrsula", "Viviane",
  "Walesca", "Yara", "Aline", "Bruna", "Cecília", "Diana", "Esther", "Fabiana",
  "Gisele", "Hortência", "Isis", "Joana", "Kamila", "Letícia", "Mirela", "Nicole",
  "Oriana", "Paola", "Quezia", "Rita", "Simone", "Teresa", "Una", "Vanessa",
  "Wanda", "Yolanda", "Zara", "Alana", "Bárbara", "Clara", "Dora", "Eva",
  "Frida", "Geovana", "Hanna", "Irina", "Julieta", "Kiara", "Lívia", "Maiara",
  "Nádia", "Odete", "Pérola", "Quirina", "Rosa", "Sara", "Tereza", "Vera",
  "Wilma", "Xena", "Yara", "Zuleica"
];

export const timesBrasil = [
  "Flamengo", "Palmeiras", "Santos", "São Paulo", "Corinthians", "Vasco", "Botafogo",
  "Fluminense", "Grêmio", "Internacional", "Cruzeiro", "Atlético-MG", "Bahia", "Sport",
  "Ceará", "Fortaleza", "Goiás", "Coritiba", "Athletico-PR", "América-MG",
  "Red Bull Bragantino", "Cuiabá", "Juventude", "Vitória", "Paysandu", "Remo",
  "Sampaio Corrêa", "Vila Nova", "Londrina", "Ponte Preta", "Guarani", "Operário",
  "Tombense", "Novorizontino", "CSA", "CRB", "Avaí", "Chapecoense", "Figueirense",
  "Brusque", "Náutico", "Santa Cruz", "Ypiranga", "Manaus", "Confiança",
  "Botafogo-SP", "Ferroviária", "Mirassol", "São Bernardo", "Água Santa"
];

export const timesEuropa = [
  "Real Madrid", "Barcelona", "Manchester United", "Liverpool", "Bayern Munich",
  "Juventus", "Milan", "Inter", "PSG", "Chelsea", "Arsenal", "Manchester City",
  "Borussia Dortmund", "Atlético Madrid", "Tottenham", "Napoli", "Roma", "Ajax",
  "Benfica", "Porto", "Sporting", "Celtic", "Rangers", "Olympique Lyon",
  "Marseille", "Sevilla", "Valencia", "Villarreal", "Real Sociedad", "Betis",
  "Fiorentina", "Lazio", "Atalanta", "West Ham", "Aston Villa", "Newcastle",
  "Brighton", "Wolves", "Everton", "Leicester", "Leeds", "Southampton",
  "Brentford", "Fulham", "Crystal Palace", "Bournemouth", "Nottingham Forest",
  "Burnley", "Sheffield United", "Luton Town", "Werder Bremen", "Frankfurt",
  "Leipzig", "Leverkusen", "Hoffenheim", "Wolfsburg", "Stuttgart", "Freiburg",
  "Mainz", "Köln", "Hertha", "Schalke", "Hamburg", "Nürnberg", "Monaco",
  "Nice", "Lille", "Rennes", "Lens", "Strasbourg", "Nantes", "Reims",
  "Montpellier", "Toulouse", "Brest", "Le Havre", "Metz", "Lorient"
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
