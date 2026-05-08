import type {
  CategoryDefinition,
  QuestionDefinition,
  QuestionSetDefinition,
} from "@/types";

export const participantIntroNote =
  "Este formulario es personal y confidencial. Responde con honestidad delante de Dios, pensando en la condición real de tu matrimonio, especialmente durante las últimas 2 semanas, y no solo en cómo te gustaría que fuera visto. El propósito de esta evaluación no es la condenación, sino ayudar a identificar fortalezas y áreas que necesitan crecer para que Cristo sea visto con más claridad en tu matrimonio.";

export const categories: CategoryDefinition[] = [
  {
    id: "communion-with-christ",
    title: "Comunión con Cristo",
    description:
      "Vida espiritual, devoción, oración y liderazgo centrado en Cristo dentro del hogar.",
    sortOrder: 1,
  },
  {
    id: "love-and-order-in-the-home",
    title: "Amor y orden en el hogar",
    description:
      "Servicio, liderazgo, respeto y responsabilidad diaria dentro del hogar.",
    sortOrder: 2,
  },
  {
    id: "grace-in-the-relationship",
    title: "Gracia en la relación",
    description: "Escucha, perdón, tono, conflicto y honra mutua en el matrimonio.",
    sortOrder: 3,
  },
  {
    id: "faithfulness-and-testimony",
    title: "Fidelidad y testimonio",
    description: "Integridad, consistencia, mayordomía y testimonio cristiano visible.",
    sortOrder: 4,
  },
];

export const questionSets: QuestionSetDefinition[] = [
  { key: "man", title: "Preguntas para hombres" },
  { key: "woman", title: "Preguntas para mujeres" },
];

export const questions: QuestionDefinition[] = [
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 1,
    orderInCategory: 1,
    prompt: "En las últimas 2 semanas, aparté tiempo personal para orar.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 2,
    orderInCategory: 2,
    prompt:
      "En las últimas 2 semanas, leí la Biblia con atención y no solo por costumbre.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 3,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, pedí la dirección de Dios antes de tomar decisiones importantes del hogar.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 4,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, hablé con mi esposa sobre algún tema espiritual.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 5,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, tomé iniciativa para promover la vida espiritual de mi hogar.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 6,
    orderInCategory: 1,
    prompt:
      "En las últimas 2 semanas, serví a mi esposa en necesidades concretas del día a día.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 7,
    orderInCategory: 2,
    prompt:
      "En las últimas 2 semanas, asumí responsabilidad en decisiones del hogar sin evadirlas.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 8,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, pregunté a mi esposa cómo se sentía y la escuché con atención.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 9,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, ordené mi tiempo de manera que beneficiara a mi hogar.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 10,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, mis decisiones en casa consideraron el bienestar de mi esposa.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 11,
    orderInCategory: 1,
    prompt:
      "En las últimas 2 semanas, escuché a mi esposa sin interrumpirla cuando me expresó una preocupación.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 12,
    orderInCategory: 2,
    prompt:
      "En las últimas 2 semanas, controlé mi tono de voz durante un desacuerdo.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 13,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, evité responder con dureza cuando me sentí frustrado.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 14,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, pedí perdón con claridad cuando fallé a mi esposa.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 15,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, hablé con mi esposa de forma que la animara.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 16,
    orderInCategory: 1,
    prompt:
      "En las últimas 2 semanas, cuidé mis ojos y mis pensamientos en fidelidad a mi esposa.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 17,
    orderInCategory: 2,
    prompt: "En las últimas 2 semanas, administré con responsabilidad mi tiempo.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 18,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, administré con responsabilidad el dinero o los recursos del hogar.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 19,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, mi conducta en casa reflejó el mismo testimonio cristiano que doy en público.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 20,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, actué de manera que fortaleciera la confianza de mi esposa en mí.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 1,
    orderInCategory: 1,
    prompt: "En las últimas 2 semanas, aparté tiempo personal para orar.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 2,
    orderInCategory: 2,
    prompt:
      "En las últimas 2 semanas, leí la Biblia con atención y no solo por costumbre.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 3,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, busqué al Señor antes de reaccionar en momentos de carga o frustración.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 4,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, hablé con mi esposo sobre algún tema espiritual.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 5,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, contribuí con mi actitud a la vida espiritual de mi hogar.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 6,
    orderInCategory: 1,
    prompt: "En las últimas 2 semanas, hablé a mi esposo con respeto.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 7,
    orderInCategory: 2,
    prompt:
      "En las últimas 2 semanas, apoyé la dirección de mi esposo cuando no implicaba pecado.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 8,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, evité debilitar a mi esposo con crítica constante.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 9,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, serví en mi hogar con disposición aun en días difíciles.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 10,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, mis actitudes ayudaron a crear paz en casa.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 11,
    orderInCategory: 1,
    prompt:
      "En las últimas 2 semanas, escuché a mi esposo con humildad cuando me habló de algo que debía corregir.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 12,
    orderInCategory: 2,
    prompt:
      "En las últimas 2 semanas, controlé mi tono de voz durante un desacuerdo.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 13,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, evité responder con desprecio, sarcasmo o frialdad.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 14,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, pedí perdón con claridad cuando fallé a mi esposo.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 15,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, hablé con mi esposo de forma que lo animara y edificara.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 16,
    orderInCategory: 1,
    prompt:
      "En las últimas 2 semanas, cuidé mis ojos y mis pensamientos en fidelidad a mi esposo.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 17,
    orderInCategory: 2,
    prompt: "En las últimas 2 semanas, administré con responsabilidad mi tiempo.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 18,
    orderInCategory: 3,
    prompt:
      "En las últimas 2 semanas, administré con responsabilidad los recursos del hogar.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 19,
    orderInCategory: 4,
    prompt:
      "En las últimas 2 semanas, mi conducta en casa reflejó el mismo testimonio cristiano que doy en público.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 20,
    orderInCategory: 5,
    prompt:
      "En las últimas 2 semanas, actué de manera que fortaleciera la confianza de mi esposo en mí.",
  },
];
