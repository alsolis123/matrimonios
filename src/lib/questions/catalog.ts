import type {
  CategoryDefinition,
  QuestionDefinition,
  QuestionSetDefinition,
} from "@/types";

export const participantIntroNote =
  "Este formulario es personal y confidencial. Responde con honestidad delante de Dios, pensando en la condicion real de tu matrimonio, especialmente durante las ultimas 2 semanas, y no solo en como te gustaria que fuera visto. El proposito de esta evaluacion no es la condenacion, sino ayudar a identificar fortalezas y areas que necesitan crecer para que Cristo sea visto con mas claridad en tu matrimonio.";

export const categories: CategoryDefinition[] = [
  {
    id: "communion-with-christ",
    title: "Comunion con Cristo",
    description:
      "Vida espiritual, devocion, oracion y liderazgo centrado en Cristo dentro del hogar.",
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
    title: "Gracia en la relacion",
    description: "Escucha, perdon, tono, conflicto y honra mutua en el matrimonio.",
    sortOrder: 3,
  },
  {
    id: "faithfulness-and-testimony",
    title: "Fidelidad y testimonio",
    description: "Integridad, consistencia, mayordomia y testimonio cristiano visible.",
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
    prompt: "En las ultimas 2 semanas, aparte tiempo personal para orar.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 2,
    orderInCategory: 2,
    prompt:
      "En las ultimas 2 semanas, lei la Biblia con atencion y no solo por costumbre.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 3,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, pedi la direccion de Dios antes de tomar decisiones importantes del hogar.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 4,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, hable con mi esposa sobre algun tema espiritual.",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 5,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, tome iniciativa para promover la vida espiritual de mi hogar.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 6,
    orderInCategory: 1,
    prompt:
      "En las ultimas 2 semanas, servi a mi esposa en necesidades concretas del dia a dia.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 7,
    orderInCategory: 2,
    prompt:
      "En las ultimas 2 semanas, asumi responsabilidad en decisiones del hogar sin evadirlas.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 8,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, pregunte a mi esposa como se sentia y la escuche con atencion.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 9,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, ordene mi tiempo de manera que beneficiara a mi hogar.",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 10,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, mis decisiones en casa consideraron el bienestar de mi esposa.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 11,
    orderInCategory: 1,
    prompt:
      "En las ultimas 2 semanas, escuche a mi esposa sin interrumpirla cuando me expreso una preocupacion.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 12,
    orderInCategory: 2,
    prompt:
      "En las ultimas 2 semanas, controle mi tono de voz durante un desacuerdo.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 13,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, evite responder con dureza cuando me senti frustrado.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 14,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, pedi perdon con claridad cuando falle a mi esposa.",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 15,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, hable con mi esposa de forma que la animara.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 16,
    orderInCategory: 1,
    prompt:
      "En las ultimas 2 semanas, cuide mis ojos y mis pensamientos en fidelidad a mi esposa.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 17,
    orderInCategory: 2,
    prompt: "En las ultimas 2 semanas, administre con responsabilidad mi tiempo.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 18,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, administre con responsabilidad el dinero o los recursos del hogar.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 19,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, mi conducta en casa reflejo el mismo testimonio cristiano que doy en publico.",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 20,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, actue de manera que fortaleciera la confianza de mi esposa en mi.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 1,
    orderInCategory: 1,
    prompt: "En las ultimas 2 semanas, aparte tiempo personal para orar.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 2,
    orderInCategory: 2,
    prompt:
      "En las ultimas 2 semanas, lei la Biblia con atencion y no solo por costumbre.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 3,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, busque al Senor antes de reaccionar en momentos de carga o frustracion.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 4,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, hable con mi esposo sobre algun tema espiritual.",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 5,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, contribui con mi actitud a la vida espiritual de mi hogar.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 6,
    orderInCategory: 1,
    prompt: "En las ultimas 2 semanas, hable a mi esposo con respeto.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 7,
    orderInCategory: 2,
    prompt:
      "En las ultimas 2 semanas, apoye la direccion de mi esposo cuando no implicaba pecado.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 8,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, evite debilitar a mi esposo con critica constante.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 9,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, servi en mi hogar con disposicion aun en dias dificiles.",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 10,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, mis actitudes ayudaron a crear paz en casa.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 11,
    orderInCategory: 1,
    prompt:
      "En las ultimas 2 semanas, escuche a mi esposo con humildad cuando me hablo de algo que debia corregir.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 12,
    orderInCategory: 2,
    prompt:
      "En las ultimas 2 semanas, controle mi tono de voz durante un desacuerdo.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 13,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, evite responder con desprecio, sarcasmo o frialdad.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 14,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, pedi perdon con claridad cuando falle a mi esposo.",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 15,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, hable con mi esposo de forma que lo animara y edificara.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 16,
    orderInCategory: 1,
    prompt:
      "En las ultimas 2 semanas, cuide mis ojos y mis pensamientos en fidelidad a mi esposo.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 17,
    orderInCategory: 2,
    prompt: "En las ultimas 2 semanas, administre con responsabilidad mi tiempo.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 18,
    orderInCategory: 3,
    prompt:
      "En las ultimas 2 semanas, administre con responsabilidad los recursos del hogar.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 19,
    orderInCategory: 4,
    prompt:
      "En las ultimas 2 semanas, mi conducta en casa reflejo el mismo testimonio cristiano que doy en publico.",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 20,
    orderInCategory: 5,
    prompt:
      "En las ultimas 2 semanas, actue de manera que fortaleciera la confianza de mi esposo en mi.",
  },
];
