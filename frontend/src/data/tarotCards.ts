export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  keywords: string[];
  message: string;
  element?: string;
}

export const majorArcana: TarotCard[] = [
  { id: 0, name: "O Louco", meaning: "Novos começos, aventura, potencial ilimitado e liberdade.", keywords: ["Liberdade", "Aventura", "Espontaneidade"], message: "Hoje é dia de abraçar o desconhecido. Confie no universo e dê o primeiro passo rumo a algo novo." },
  { id: 1, name: "O Mago", meaning: "Manifestação, poder pessoal, habilidade e concentração.", keywords: ["Poder", "Habilidade", "Ação"], message: "Você tem todos os recursos que precisa. Use sua criatividade e willpower para manifestar seus desejos." },
  { id: 2, name: "A Sacerdotisa", meaning: "Intuição, mistério, sabedoria interior e o subconsciente.", keywords: ["Intuição", "Mistério", "Sabedoria"], message: "Ouça sua voz interior hoje. As respostas que busca já estão dentro de você." },
  { id: 3, name: "A Imperatriz", meaning: "Fertilidade, abundância, natureza e nutrição.", keywords: ["Abundância", "Criatividade", "Nutrição"], message: "Conecte-se com a natureza e permita que a abundância flua em sua vida." },
  { id: 4, name: "O Imperador", meaning: "Autoridade, estrutura, controle e liderança.", keywords: ["Autoridade", "Estrutura", "Estabilidade"], message: "Assuma o controle da sua vida. Organize seus pensamentos e aja com determinação." },
  { id: 5, name: "O Hierofante", meaning: "Tradição, sabedoria espiritual, conformidade e ensinamentos.", keywords: ["Tradição", "Sabedoria", "Orientação"], message: "Busque orientação em tradições e ensinamentos antigos. A sabedoria coletiva pode iluminar seu caminho." },
  { id: 6, name: "Os Amantes", meaning: "Amor, harmonia, escolhas e alinhamento de valores.", keywords: ["Amor", "Harmonia", "Escolha"], message: "Siga seu coração nas decisões de hoje. O amor e a harmonia guiam seu caminho." },
  { id: 7, name: "O Carro", meaning: "Determinação, força de vontade, vitória e autocontrole.", keywords: ["Vitória", "Determinação", "Conquista"], message: "Avance com confiança! Sua determinação será recompensada com a vitória." },
  { id: 8, name: "A Força", meaning: "Coragem, paciência, compaixão e controle interior.", keywords: ["Coragem", "Paciência", "Compaixão"], message: "A verdadeira força vem de dentro. Seja gentil consigo mesmo e com os outros." },
  { id: 9, name: "O Eremita", meaning: "Introspecção, busca interior, solidão e iluminação.", keywords: ["Introspecção", "Solidão", "Iluminação"], message: "Reserve um tempo para si. Na quietude, você encontrará as respostas que procura." },
  { id: 10, name: "A Roda da Fortuna", meaning: "Ciclos, destino, mudanças e oportunidades.", keywords: ["Destino", "Mudança", "Sorte"], message: "A roda está girando a seu favor. Esteja aberto às mudanças que o universo prepara." },
  { id: 11, name: "A Justiça", meaning: "Equilíbrio, verdade, causa e efeito, justiça.", keywords: ["Equilíbrio", "Verdade", "Justiça"], message: "Aja com integridade e justiça. O equilíbrio será restaurado em sua vida." },
  { id: 12, name: "O Enforcado", meaning: "Sacrifício, nova perspectiva, pausa e entrega.", keywords: ["Perspectiva", "Sacrifício", "Pausa"], message: "Às vezes, é preciso ver as coisas de outro ângulo. Permita-se mudar de perspectiva." },
  { id: 13, name: "A Morte", meaning: "Transformação, fim de ciclos, renovação e transição.", keywords: ["Transformação", "Renovação", "Fim"], message: "Não tema as mudanças. Cada fim é um novo começo esperando para florescer." },
  { id: 14, name: "A Temperança", meaning: "Equilíbrio, moderação, paciência e harmonia.", keywords: ["Equilíbrio", "Moderação", "Harmonia"], message: "Encontre o equilíbrio em todas as áreas da vida. A moderação é a chave hoje." },
  { id: 15, name: "O Diabo", meaning: "Tentação, apego, ilusão e materialismo.", keywords: ["Tentação", "Libertação", "Consciência"], message: "Liberte-se do que te prende. Reconheça suas correntes e escolha a liberdade." },
  { id: 16, name: "A Torre", meaning: "Destruição, revelação, mudança súbita e despertar.", keywords: ["Mudança", "Revelação", "Despertar"], message: "Grandes mudanças trazem grandes revelações. Confie que o que se destrói abre espaço para o novo." },
  { id: 17, name: "A Estrela", meaning: "Esperança, inspiração, renovação e serenidade.", keywords: ["Esperança", "Inspiração", "Serenidade"], message: "Mantenha a esperança brilhando. Você está no caminho certo, continue acreditando." },
  { id: 18, name: "A Lua", meaning: "Ilusão, medo, intuição e o inconsciente.", keywords: ["Intuição", "Ilusão", "Mistério"], message: "Nem tudo é o que parece. Confie na sua intuição para navegar pelas ilusões." },
  { id: 19, name: "O Sol", meaning: "Alegria, sucesso, vitalidade e positividade.", keywords: ["Alegria", "Sucesso", "Vitalidade"], message: "O sol brilha para você hoje! Aproveite a energia positiva e espalhe alegria." },
  { id: 20, name: "O Julgamento", meaning: "Renovação, despertar, reflexão e redenção.", keywords: ["Despertar", "Renovação", "Reflexão"], message: "É hora de refletir sobre suas ações e abraçar uma nova fase com consciência." },
  { id: 21, name: "O Mundo", meaning: "Completude, realização, integração e celebração.", keywords: ["Realização", "Completude", "Celebração"], message: "Você está completando um ciclo importante. Celebre suas conquistas e prepare-se para o próximo capítulo." },
];

export function getRandomCard(): TarotCard {
  return majorArcana[Math.floor(Math.random() * majorArcana.length)];
}

export function getCompatibilityCards(count: number): TarotCard[] {
  const shuffled = [...majorArcana].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
