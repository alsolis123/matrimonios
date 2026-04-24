insert into public.categories (id, title, description, sort_order)
values
  ('communion-with-christ', 'Comunion con Cristo', 'Vida espiritual, devocion, oracion y liderazgo centrado en Cristo dentro del hogar.', 1),
  ('love-and-order-in-the-home', 'Amor y orden en el hogar', 'Servicio, liderazgo, respeto y responsabilidad diaria dentro del hogar.', 2),
  ('grace-in-the-relationship', 'Gracia en la relacion', 'Escucha, perdon, tono, conflicto y honra mutua en el matrimonio.', 3),
  ('faithfulness-and-testimony', 'Fidelidad y testimonio', 'Integridad, consistencia, mayordomia y testimonio cristiano visible.', 4)
on conflict (id) do update
set
  title = excluded.title,
  description = excluded.description,
  sort_order = excluded.sort_order;

insert into public.question_sets (key, title)
values
  ('man', 'Preguntas para hombres'),
  ('woman', 'Preguntas para mujeres')
on conflict (key) do update
set title = excluded.title;

insert into public.questions (
  question_set_id,
  category_id,
  prompt,
  order_in_survey,
  order_in_category
)
select
  qs.id,
  seeded.category_id,
  seeded.prompt,
  seeded.order_in_survey,
  seeded.order_in_category
from (
  values
    ('man'::public.gender, 'communion-with-christ', 'En las ultimas semanas, he apartado con constancia tiempo para orar y meditar en la Palabra de Dios, o he descuidado mi comunion con Dios?', 1, 1),
    ('man'::public.gender, 'communion-with-christ', 'Suelo iniciar o promover los devocionales familiares en casa, en lugar de esperar a que ocurran solo de vez en cuando?', 2, 2),
    ('man'::public.gender, 'communion-with-christ', 'Cuando debo tomar decisiones para mi hogar, busco primero la direccion de Dios, o actuo solo segun mi propio criterio?', 3, 3),
    ('man'::public.gender, 'communion-with-christ', 'Puede mi esposa ver evidencia real de piedad en mi vida diaria, como dominio propio, oracion, obediencia y temor de Dios?', 4, 4),
    ('man'::public.gender, 'communion-with-christ', 'Cuando noto frialdad espiritual en mi hogar, asumo la responsabilidad de animar a mi familia hacia Cristo?', 5, 5),
    ('man'::public.gender, 'love-and-order-in-the-home', 'Sirvo a mi esposa en necesidades concretas del dia a dia, o normalmente espero ser servido?', 6, 1),
    ('man'::public.gender, 'love-and-order-in-the-home', 'Mi liderazgo en el hogar se refleja en cuidado, ejemplo y sacrificio, o mas bien en imposicion, pasividad o comodidad?', 7, 2),
    ('man'::public.gender, 'love-and-order-in-the-home', 'Tomo la iniciativa de hablar con mi esposa sobre sus cargas espirituales, emocionales y practicas?', 8, 3),
    ('man'::public.gender, 'love-and-order-in-the-home', 'Asumo mi responsabilidad de guiar el hogar hacia Cristo aun cuando estoy cansado, ocupado o desanimado?', 9, 4),
    ('man'::public.gender, 'love-and-order-in-the-home', 'Las decisiones que tomo en casa muestran amor y consideracion por mi esposa, o suelen girar principalmente alrededor de mi?', 10, 5),
    ('man'::public.gender, 'grace-in-the-relationship', 'Cuando mi esposa me expresa una preocupacion, la escucho con paciencia, o me defiendo antes de entenderla?', 11, 1),
    ('man'::public.gender, 'grace-in-the-relationship', 'En medio del conflicto, controlo mi tono, mis palabras y mis gestos, o reacciono con dureza, silencio hiriente o impaciencia?', 12, 2),
    ('man'::public.gender, 'grace-in-the-relationship', 'Cuando peco contra mi esposa, pido perdon de forma clara y sincera, sin justificarme ni minimizar lo que hice?', 13, 3),
    ('man'::public.gender, 'grace-in-the-relationship', 'Trato a mi esposa con honra tambien en privado, y no solo delante de otros?', 14, 4),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las ultimas semanas, he cultivado conversaciones que edifican a mi esposa, o la mayor parte de nuestra interaccion ha sido solo funcional, fria o tensa?', 15, 5),
    ('man'::public.gender, 'faithfulness-and-testimony', 'He guardado mi mente, mis ojos y mi corazon en fidelidad hacia mi esposa, evitando alimentar pensamientos o conductas impuras?', 16, 1),
    ('man'::public.gender, 'faithfulness-and-testimony', 'Administro mi tiempo, dinero y prioridades responsablemente, o he descuidado areas importantes del hogar?', 17, 2),
    ('man'::public.gender, 'faithfulness-and-testimony', 'Mi conducta dentro y fuera del hogar refleja el mismo cristianismo, o muestro una imagen distinta segun quien me vea?', 18, 3),
    ('man'::public.gender, 'faithfulness-and-testimony', 'Estoy modelando un matrimonio que honra a Cristo delante de mi familia, la iglesia y los demas?', 19, 4),
    ('man'::public.gender, 'faithfulness-and-testimony', 'Se siente mi esposa segura de mi integridad, consistencia y compromiso con nuestro pacto matrimonial?', 20, 5),
    ('woman'::public.gender, 'communion-with-christ', 'En las ultimas semanas, he apartado con constancia tiempo para orar y meditar en la Palabra de Dios, o he descuidado mi comunion con Dios?', 1, 1),
    ('woman'::public.gender, 'communion-with-christ', 'Participo con disposicion y seriedad en los devocionales familiares, en lugar de tratarlos como algo secundario?', 2, 2),
    ('woman'::public.gender, 'communion-with-christ', 'Cuando enfrento cargas o frustraciones en el hogar, busco primero al Senor antes de reaccionar?', 3, 3),
    ('woman'::public.gender, 'communion-with-christ', 'Puede mi esposo ver evidencia real de piedad en mi vida diaria, como mansedumbre, obediencia, oracion y temor de Dios?', 4, 4),
    ('woman'::public.gender, 'communion-with-christ', 'Cuando noto frialdad espiritual en mi hogar, animo a mi familia hacia Cristo con un ejemplo y actitud piadosos?', 5, 5),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'Trato a mi esposo con respeto en la forma en que le hablo, lo corrijo y me refiero a el?', 6, 1),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'Me someto a su liderazgo con amor cuando no implica pecado, o suelo resistirlo por orgullo, enojo o deseo de controlar?', 7, 2),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'Apoyo a mi esposo en su responsabilidad espiritual, o debilito su liderazgo con critica constante, desprecio o indiferencia?', 8, 3),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'Procuro edificar el ambiente del hogar con sabiduria, servicio y disposicion, aun en dias dificiles?', 9, 4),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'Las actitudes que llevo al hogar ayudan a crear paz y orden, o suelen aumentar la tension y el desgaste?', 10, 5),
    ('woman'::public.gender, 'grace-in-the-relationship', 'Cuando mi esposo me habla sobre algo que necesita correccion o conversacion, escucho con humildad, o reacciono de inmediato con actitud defensiva o molestia?', 11, 1),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En medio del conflicto, controlo mi tono, mis palabras y mis gestos, o reacciono con dureza, desprecio o silencio hiriente?', 12, 2),
    ('woman'::public.gender, 'grace-in-the-relationship', 'Cuando peco contra mi esposo, pido perdon de forma clara y sincera, sin justificarme ni trasladar la culpa?', 13, 3),
    ('woman'::public.gender, 'grace-in-the-relationship', 'Evito usar palabras, comparaciones o actitudes que humillen o debiliten a mi esposo?', 14, 4),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las ultimas semanas, he procurado hablar a mi esposo de una manera que lo haga sentirse respetado, animado y edificado?', 15, 5),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'He guardado mi mente, mis ojos y mi corazon en fidelidad hacia mi esposo, evitando alimentar pensamientos o conductas impuras?', 16, 1),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'Administro mi tiempo, recursos y prioridades responsablemente dentro del hogar?', 17, 2),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'Mi conducta dentro y fuera del hogar refleja el mismo cristianismo, o proyecto una imagen distinta segun quien me vea?', 18, 3),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'Estoy contribuyendo a que nuestro matrimonio refleje a Cristo delante de la familia, la iglesia y los demas?', 19, 4),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'Puede mi esposo confiar en mi integridad, consistencia y compromiso con nuestro pacto matrimonial?', 20, 5)
) as seeded(audience, category_id, prompt, order_in_survey, order_in_category)
join public.question_sets qs on qs.key = seeded.audience
on conflict (question_set_id, order_in_survey) do update
set
  category_id = excluded.category_id,
  prompt = excluded.prompt,
  order_in_category = excluded.order_in_category,
  is_active = true;
