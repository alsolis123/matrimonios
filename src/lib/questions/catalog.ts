import type {
  CategoryDefinition,
  QuestionDefinition,
  QuestionSetDefinition,
} from "@/types";

export const participantIntroNote =
  "Este formulario es personal y confidencial. Responde con honestidad delante de Dios, pensando en la condicion real de tu matrimonio y no solo en como te gustaria que fuera visto. El proposito de esta evaluacion no es la condenacion, sino ayudar a identificar fortalezas y areas que necesitan crecer para que Cristo sea visto con mas claridad en tu matrimonio.";

export const categories: CategoryDefinition[] = [
  {
    id: "communion-with-christ",
    title: "Comunion con Cristo",
    description: "Vida espiritual, devocion, oracion y liderazgo centrado en Cristo dentro del hogar.",
    sortOrder: 1,
  },
  {
    id: "love-and-order-in-the-home",
    title: "Amor y orden en el hogar",
    description: "Servicio, liderazgo, respeto y responsabilidad diaria dentro del hogar.",
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
    prompt:
      "En las ultimas semanas, he apartado con constancia tiempo para orar y meditar en la Palabra de Dios, o he descuidado mi comunion con Dios?",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 2,
    orderInCategory: 2,
    prompt:
      "Suelo iniciar o promover los devocionales familiares en casa, en lugar de esperar a que ocurran solo de vez en cuando?",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 3,
    orderInCategory: 3,
    prompt:
      "Cuando debo tomar decisiones para mi hogar, busco primero la direccion de Dios, o actuo solo segun mi propio criterio?",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 4,
    orderInCategory: 4,
    prompt:
      "Puede mi esposa ver evidencia real de piedad en mi vida diaria, como dominio propio, oracion, obediencia y temor de Dios?",
  },
  {
    audience: "man",
    categoryId: "communion-with-christ",
    orderInSurvey: 5,
    orderInCategory: 5,
    prompt:
      "Cuando noto frialdad espiritual en mi hogar, asumo la responsabilidad de animar a mi familia hacia Cristo?",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 6,
    orderInCategory: 1,
    prompt:
      "Sirvo a mi esposa en necesidades concretas del dia a dia, o normalmente espero ser servido?",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 7,
    orderInCategory: 2,
    prompt:
      "Mi liderazgo en el hogar se refleja en cuidado, ejemplo y sacrificio, o mas bien en imposicion, pasividad o comodidad?",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 8,
    orderInCategory: 3,
    prompt:
      "Tomo la iniciativa de hablar con mi esposa sobre sus cargas espirituales, emocionales y practicas?",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 9,
    orderInCategory: 4,
    prompt:
      "Asumo mi responsabilidad de guiar el hogar hacia Cristo aun cuando estoy cansado, ocupado o desanimado?",
  },
  {
    audience: "man",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 10,
    orderInCategory: 5,
    prompt:
      "Las decisiones que tomo en casa muestran amor y consideracion por mi esposa, o suelen girar principalmente alrededor de mi?",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 11,
    orderInCategory: 1,
    prompt:
      "Cuando mi esposa me expresa una preocupacion, la escucho con paciencia, o me defiendo antes de entenderla?",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 12,
    orderInCategory: 2,
    prompt:
      "En medio del conflicto, controlo mi tono, mis palabras y mis gestos, o reacciono con dureza, silencio hiriente o impaciencia?",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 13,
    orderInCategory: 3,
    prompt:
      "Cuando peco contra mi esposa, pido perdon de forma clara y sincera, sin justificarme ni minimizar lo que hice?",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 14,
    orderInCategory: 4,
    prompt:
      "Trato a mi esposa con honra tambien en privado, y no solo delante de otros?",
  },
  {
    audience: "man",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 15,
    orderInCategory: 5,
    prompt:
      "En las ultimas semanas, he cultivado conversaciones que edifican a mi esposa, o la mayor parte de nuestra interaccion ha sido solo funcional, fria o tensa?",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 16,
    orderInCategory: 1,
    prompt:
      "He guardado mi mente, mis ojos y mi corazon en fidelidad hacia mi esposa, evitando alimentar pensamientos o conductas impuras?",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 17,
    orderInCategory: 2,
    prompt:
      "Administro mi tiempo, dinero y prioridades responsablemente, o he descuidado areas importantes del hogar?",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 18,
    orderInCategory: 3,
    prompt:
      "Mi conducta dentro y fuera del hogar refleja el mismo cristianismo, o muestro una imagen distinta segun quien me vea?",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 19,
    orderInCategory: 4,
    prompt:
      "Estoy modelando un matrimonio que honra a Cristo delante de mi familia, la iglesia y los demas?",
  },
  {
    audience: "man",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 20,
    orderInCategory: 5,
    prompt:
      "Se siente mi esposa segura de mi integridad, consistencia y compromiso con nuestro pacto matrimonial?",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 1,
    orderInCategory: 1,
    prompt:
      "En las ultimas semanas, he apartado con constancia tiempo para orar y meditar en la Palabra de Dios, o he descuidado mi comunion con Dios?",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 2,
    orderInCategory: 2,
    prompt:
      "Participo con disposicion y seriedad en los devocionales familiares, en lugar de tratarlos como algo secundario?",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 3,
    orderInCategory: 3,
    prompt:
      "Cuando enfrento cargas o frustraciones en el hogar, busco primero al Senor antes de reaccionar?",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 4,
    orderInCategory: 4,
    prompt:
      "Puede mi esposo ver evidencia real de piedad en mi vida diaria, como mansedumbre, obediencia, oracion y temor de Dios?",
  },
  {
    audience: "woman",
    categoryId: "communion-with-christ",
    orderInSurvey: 5,
    orderInCategory: 5,
    prompt:
      "Cuando noto frialdad espiritual en mi hogar, animo a mi familia hacia Cristo con un ejemplo y actitud piadosos?",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 6,
    orderInCategory: 1,
    prompt:
      "Trato a mi esposo con respeto en la forma en que le hablo, lo corrijo y me refiero a el?",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 7,
    orderInCategory: 2,
    prompt:
      "Me someto a su liderazgo con amor cuando no implica pecado, o suelo resistirlo por orgullo, enojo o deseo de controlar?",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 8,
    orderInCategory: 3,
    prompt:
      "Apoyo a mi esposo en su responsabilidad espiritual, o debilito su liderazgo con critica constante, desprecio o indiferencia?",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 9,
    orderInCategory: 4,
    prompt:
      "Procuro edificar el ambiente del hogar con sabiduria, servicio y disposicion, aun en dias dificiles?",
  },
  {
    audience: "woman",
    categoryId: "love-and-order-in-the-home",
    orderInSurvey: 10,
    orderInCategory: 5,
    prompt:
      "Las actitudes que llevo al hogar ayudan a crear paz y orden, o suelen aumentar la tension y el desgaste?",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 11,
    orderInCategory: 1,
    prompt:
      "Cuando mi esposo me habla sobre algo que necesita correccion o conversacion, escucho con humildad, o reacciono de inmediato con actitud defensiva o molestia?",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 12,
    orderInCategory: 2,
    prompt:
      "En medio del conflicto, controlo mi tono, mis palabras y mis gestos, o reacciono con dureza, desprecio o silencio hiriente?",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 13,
    orderInCategory: 3,
    prompt:
      "Cuando peco contra mi esposo, pido perdon de forma clara y sincera, sin justificarme ni trasladar la culpa?",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 14,
    orderInCategory: 4,
    prompt:
      "Evito usar palabras, comparaciones o actitudes que humillen o debiliten a mi esposo?",
  },
  {
    audience: "woman",
    categoryId: "grace-in-the-relationship",
    orderInSurvey: 15,
    orderInCategory: 5,
    prompt:
      "En las ultimas semanas, he procurado hablar a mi esposo de una manera que lo haga sentirse respetado, animado y edificado?",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 16,
    orderInCategory: 1,
    prompt:
      "He guardado mi mente, mis ojos y mi corazon en fidelidad hacia mi esposo, evitando alimentar pensamientos o conductas impuras?",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 17,
    orderInCategory: 2,
    prompt:
      "Administro mi tiempo, recursos y prioridades responsablemente dentro del hogar?",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 18,
    orderInCategory: 3,
    prompt:
      "Mi conducta dentro y fuera del hogar refleja el mismo cristianismo, o proyecto una imagen distinta segun quien me vea?",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 19,
    orderInCategory: 4,
    prompt:
      "Estoy contribuyendo a que nuestro matrimonio refleje a Cristo delante de la familia, la iglesia y los demas?",
  },
  {
    audience: "woman",
    categoryId: "faithfulness-and-testimony",
    orderInSurvey: 20,
    orderInCategory: 5,
    prompt:
      "Puede mi esposo confiar en mi integridad, consistencia y compromiso con nuestro pacto matrimonial?",
  },
];
