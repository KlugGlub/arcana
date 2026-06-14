import { TarotCard, majorArcana } from "./tarotCards";

export interface SynthesisResult {
  arcanum1: TarotCard;
  arcanum2: TarotCard;
  synthesis: TarotCard;
  interaction: string;
  loveReading: string;
  familyReading: string;
  friendshipReading: string;
}

// Reduce sum to 1-22 range
function reduceTo22(num: number): number {
  while (num > 22) {
    num = num.toString().split("").reduce((a, d) => a + parseInt(d), 0);
  }
  return num;
}

// Personality traits for each arcanum
const arcanaPersonality: Record<number, { traits: string; shadow: string }> = {
  0: { traits: "espírito livre, espontâneo e aventureiro", shadow: "imprudência e falta de compromisso" },
  1: { traits: "criativo, determinado e cheio de recursos", shadow: "manipulação e ego inflado" },
  2: { traits: "intuitivo, misterioso e sábio", shadow: "isolamento e segredos excessivos" },
  3: { traits: "acolhedor, abundante e criativo", shadow: "possessividade e dependência emocional" },
  4: { traits: "estruturado, líder nato e protetor", shadow: "rigidez e controle excessivo" },
  5: { traits: "sábio, tradicional e orientador", shadow: "dogmatismo e resistência à mudança" },
  6: { traits: "amoroso, harmonioso e fiel", shadow: "indecisão e idealização" },
  7: { traits: "determinado, ambicioso e vitorioso", shadow: "agressividade e impaciência" },
  8: { traits: "corajoso, paciente e compassivo", shadow: "repressão emocional e teimosia" },
  9: { traits: "introspectivo, sábio e independente", shadow: "isolamento e frieza emocional" },
  10: { traits: "adaptável, otimista e aberto a mudanças", shadow: "instabilidade e dependência da sorte" },
  11: { traits: "justo, equilibrado e íntegro", shadow: "rigidez moral e frieza" },
  12: { traits: "altruísta, visionário e paciente", shadow: "passividade e sacrifício excessivo" },
  13: { traits: "transformador, resiliente e renovador", shadow: "medo de apego e destruição" },
  14: { traits: "equilibrado, harmonioso e diplomático", shadow: "indecisão e passividade" },
  15: { traits: "intenso, magnético e apaixonado", shadow: "obsessão e comportamento destrutivo" },
  16: { traits: "revolucionário, verdadeiro e corajoso", shadow: "caos e instabilidade" },
  17: { traits: "esperançoso, inspirador e sereno", shadow: "ingenuidade e expectativas irreais" },
  18: { traits: "intuitivo, sensível e profundo", shadow: "medo, ilusão e confusão" },
  19: { traits: "alegre, vital e radiante", shadow: "superficialidade e excesso de otimismo" },
  20: { traits: "consciente, reflexivo e transformador", shadow: "julgamento excessivo e culpa" },
  21: { traits: "realizado, completo e integrado", shadow: "estagnação e medo de novos ciclos" },
  22: { traits: "espírito livre, espontâneo e aventureiro", shadow: "imprudência e falta de compromisso" },
};

// Synthesis meanings based on the result arcanum
const synthesisMeanings: Record<number, { love: string; family: string; friendship: string }> = {
  1: {
    love: "A relação tem o poder de manifestar grandes coisas juntos. A comunicação e a criatividade são a base dessa união.",
    family: "Juntos, vocês têm o poder de criar uma dinâmica familiar cheia de possibilidades e soluções criativas.",
    friendship: "Uma amizade que inspira ação e criatividade mútua. Juntos, vocês tornam ideias em realidade.",
  },
  2: {
    love: "O amor entre vocês é profundo e intuitivo. Há uma conexão que vai além das palavras.",
    family: "A sabedoria interior guia essa relação familiar. Confiem nos sentimentos não ditos entre vocês.",
    friendship: "Uma amizade que opera em níveis profundos de compreensão mútua e intuição.",
  },
  3: {
    love: "A relação transborda amor, criatividade e fertilidade. É uma união que gera abundância em todos os sentidos.",
    family: "Uma relação familiar nutritiva e acolhedora, onde todos florescem juntos.",
    friendship: "Uma amizade que nutre e faz crescer. Juntos, vocês criam coisas belas.",
  },
  4: {
    love: "A relação oferece segurança e estabilidade. Juntos, vocês constroem algo sólido e duradouro.",
    family: "Uma base familiar forte e estruturada. Vocês são pilares um do outro.",
    friendship: "Uma amizade confiável e estruturada, onde ambos se sentem seguros.",
  },
  5: {
    love: "O amor aqui é guiado por valores compartilhados e respeito mútuo pelas tradições.",
    family: "A sabedoria ancestral guia esta relação. Há muito a aprender um com o outro.",
    friendship: "Uma amizade baseada em valores profundos e respeito mútuo.",
  },
  6: {
    love: "Uma união abençoada pelo amor verdadeiro. A harmonia e a escolha consciente definem este relacionamento.",
    family: "O amor incondicional é a base desta relação familiar. As escolhas feitas juntos fortalecem o laço.",
    friendship: "Uma amizade de almas. A harmonia entre vocês é natural e verdadeira.",
  },
  7: {
    love: "Juntos, vocês são imparáveis. A determinação compartilhada leva essa relação à vitória.",
    family: "Uma relação familiar que supera qualquer obstáculo com união e determinação.",
    friendship: "Uma amizade vitoriosa. Juntos, vocês conquistam o que quiserem.",
  },
  8: {
    love: "A paciência e a compaixão sustentam esse amor. É uma relação de força interior compartilhada.",
    family: "A gentileza e a coragem são os pilares dessa relação familiar.",
    friendship: "Uma amizade baseada na coragem de ser vulnerável e na força de apoiar um ao outro.",
  },
  9: {
    love: "Essa relação valoriza o espaço individual. O amor cresce quando ambos têm liberdade para se conhecer.",
    family: "Sabedoria e introspecção guiam essa relação. Respeitem o tempo de cada um.",
    friendship: "Uma amizade de profundidade. Mesmo à distância, a conexão permanece forte.",
  },
  10: {
    love: "O destino sorri para essa relação. Mudanças trazem renovação e novas oportunidades juntos.",
    family: "Os ciclos da vida fortalecem essa relação familiar. Cada mudança traz crescimento.",
    friendship: "Uma amizade marcada pelo destino. As voltas da vida sempre os reaproximam.",
  },
  11: {
    love: "A verdade e a justiça sustentam esse amor. Uma relação de equilíbrio e integridade.",
    family: "O equilíbrio e a verdade são a base desta relação familiar. A justiça prevalece.",
    friendship: "Uma amizade honesta e equilibrada, onde ambos crescem com integridade.",
  },
  12: {
    love: "Esse amor pede entrega e uma nova perspectiva. Sacrifícios mútuos fortalecem o laço.",
    family: "Ver a relação por um novo ângulo transforma tudo. A entrega mútua cura e fortalece.",
    friendship: "Uma amizade que ensina a ver o mundo de forma diferente. A paciência é recompensada.",
  },
  13: {
    love: "Uma relação transformadora. O que era precisa morrer para que algo mais bonito nasça entre vocês.",
    family: "Transformações profundas renovam essa relação familiar. Aceitem as mudanças juntos.",
    friendship: "Uma amizade que transforma ambos. Cada fase traz uma versão mais forte da conexão.",
  },
  14: {
    love: "A harmonia e o equilíbrio definem esse amor. Juntos, vocês encontram a moderação perfeita.",
    family: "A paciência e a harmonia sustentam essa relação familiar. O equilíbrio é a chave.",
    friendship: "Uma amizade equilibrada e harmoniosa, onde ambos aprendem a arte da moderação.",
  },
  15: {
    love: "Uma atração intensa e magnética. Cuidado com apegos — a liberdade mantém o amor vivo.",
    family: "Reconheçam padrões que prendem. A consciência liberta e fortalece essa relação.",
    friendship: "Uma amizade intensa que precisa de consciência. Libertem-se do que não serve mais.",
  },
  16: {
    love: "Revelações e mudanças súbitas definem essa relação. O que se destrói abre espaço para o amor verdadeiro.",
    family: "Grandes revelações transformam essa relação familiar. Confiem no processo.",
    friendship: "Uma amizade que passa por grandes mudanças. Cada crise fortalece o vínculo.",
  },
  17: {
    love: "A esperança e a inspiração brilham nessa relação. É um amor que renova a fé na vida.",
    family: "Uma relação familiar iluminada pela esperança. O futuro é brilhante juntos.",
    friendship: "Uma amizade que inspira e renova. Vocês são a estrela guia um do outro.",
  },
  18: {
    love: "Um amor profundo e misterioso. Confiem na intuição e naveguem juntos pelas incertezas.",
    family: "Nem tudo é o que parece nessa relação. A intuição será sua melhor guia familiar.",
    friendship: "Uma amizade misteriosa e profunda. Confiem um no outro além das aparências.",
  },
  19: {
    love: "Um amor radiante e cheio de alegria! Essa relação traz luz e vitalidade para ambos.",
    family: "Uma relação familiar abençoada pela alegria e pelo sucesso. O sol brilha para vocês.",
    friendship: "Uma amizade luminosa e energizante. Juntos, vocês irradiam positividade.",
  },
  20: {
    love: "Um chamado para elevar essa relação. A reflexão mútua traz renovação e um novo começo.",
    family: "É hora de perdoar e renovar. Essa relação familiar está pronta para uma nova fase.",
    friendship: "Uma amizade que chama ambos a crescer. A reflexão conjunta traz despertar.",
  },
  21: {
    love: "A relação mais completa e realizada. Vocês celebram a integração de dois mundos em um.",
    family: "Uma relação familiar de plenitude. Vocês completam um ciclo juntos com celebração.",
    friendship: "Uma amizade completa e integrada. Juntos, vocês representam a totalidade.",
  },
  22: {
    love: "Um amor livre e aventureiro, cheio de novos começos e potencial ilimitado.",
    family: "Uma relação familiar que abraça o novo. A liberdade e a confiança guiam vocês.",
    friendship: "Uma amizade espontânea e cheia de aventura. O universo conspira a favor de vocês.",
  },
};

export function calculateSynthesis(
  arcNum1: number,
  arcNum2: number,
  relationType: "amor" | "amizade" | "familia"
): SynthesisResult {
  const synthesisNum = reduceTo22(arcNum1 + arcNum2);

  const arcanum1 = majorArcana.find((c) => c.id === arcNum1) || majorArcana[0];
  const arcanum2 = majorArcana.find((c) => c.id === arcNum2) || majorArcana[0];
  const synthesis = majorArcana.find((c) => c.id === (synthesisNum > 21 ? 0 : synthesisNum)) || majorArcana[0];

  const p1 = arcanaPersonality[arcNum1] || arcanaPersonality[0];
  const p2 = arcanaPersonality[arcNum2] || arcanaPersonality[0];
  const synMeaning = synthesisMeanings[synthesisNum] || synthesisMeanings[1];

  const interaction = `${arcanum1.name} é ${p1.traits}. ${arcanum2.name} é ${p2.traits}. Juntos, podem enfrentar desafios como ${p1.shadow} (de ${arcanum1.name}) e ${p2.shadow} (de ${arcanum2.name}), mas suas qualidades complementares criam uma conexão poderosa.`;

  const readingMap = {
    amor: synMeaning.love,
    amizade: synMeaning.friendship,
    familia: synMeaning.family,
  };

  return {
    arcanum1,
    arcanum2,
    synthesis,
    interaction,
    loveReading: synMeaning.love,
    familyReading: synMeaning.family,
    friendshipReading: readingMap[relationType],
  };
}
