insert into public.categories (id, title, description, sort_order)
values
  ('communion-with-christ', 'Comunión con Cristo', 'Vida espiritual, devoción, oración y liderazgo centrado en Cristo dentro del hogar.', 1),
  ('love-and-order-in-the-home', 'Amor y orden en el hogar', 'Servicio, liderazgo, respeto y responsabilidad diaria dentro del hogar.', 2),
  ('grace-in-the-relationship', 'Gracia en la relación', 'Escucha, perdón, tono, conflicto y honra mutua en el matrimonio.', 3),
  ('faithfulness-and-testimony', 'Fidelidad y testimonio', 'Integridad, consistencia, mayordomía y testimonio cristiano visible.', 4)
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
    ('man'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, aparté tiempo personal para orar.', 1, 1),
    ('man'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, leí la Biblia con atención y no solo por costumbre.', 2, 2),
    ('man'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, pedí la dirección de Dios antes de tomar decisiones importantes del hogar.', 3, 3),
    ('man'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, hablé con mi esposa sobre algún tema espiritual.', 4, 4),
    ('man'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, tomé iniciativa para promover la vida espiritual de mi hogar.', 5, 5),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, serví a mi esposa en necesidades concretas del día a día.', 6, 1),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, asumí responsabilidad en decisiones del hogar sin evadirlas.', 7, 2),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, pregunté a mi esposa cómo se sentía y la escuché con atención.', 8, 3),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, ordené mi tiempo de manera que beneficiara a mi hogar.', 9, 4),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, mis decisiones en casa consideraron el bienestar de mi esposa.', 10, 5),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, escuché a mi esposa sin interrumpirla cuando me expresó una preocupación.', 11, 1),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, controlé mi tono de voz durante un desacuerdo.', 12, 2),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, evité responder con dureza cuando me sentí frustrado.', 13, 3),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, pedí perdón con claridad cuando fallé a mi esposa.', 14, 4),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, hablé con mi esposa de forma que la animara.', 15, 5),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, cuidé mis ojos y mis pensamientos en fidelidad a mi esposa.', 16, 1),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, administré con responsabilidad mi tiempo.', 17, 2),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, administré con responsabilidad el dinero o los recursos del hogar.', 18, 3),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, mi conducta en casa reflejó el mismo testimonio cristiano que doy en público.', 19, 4),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, actué de manera que fortaleciera la confianza de mi esposa en mí.', 20, 5),
    ('woman'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, aparté tiempo personal para orar.', 1, 1),
    ('woman'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, leí la Biblia con atención y no solo por costumbre.', 2, 2),
    ('woman'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, busqué al Señor antes de reaccionar en momentos de carga o frustración.', 3, 3),
    ('woman'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, hablé con mi esposo sobre algún tema espiritual.', 4, 4),
    ('woman'::public.gender, 'communion-with-christ', 'En las últimas 2 semanas, contribuí con mi actitud a la vida espiritual de mi hogar.', 5, 5),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, hablé a mi esposo con respeto.', 6, 1),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, apoyé la dirección de mi esposo cuando no implicaba pecado.', 7, 2),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, evité debilitar a mi esposo con crítica constante.', 8, 3),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, serví en mi hogar con disposición aun en días difíciles.', 9, 4),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las últimas 2 semanas, mis actitudes ayudaron a crear paz en casa.', 10, 5),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, escuché a mi esposo con humildad cuando me habló de algo que debía corregir.', 11, 1),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, controlé mi tono de voz durante un desacuerdo.', 12, 2),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, evité responder con desprecio, sarcasmo o frialdad.', 13, 3),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, pedí perdón con claridad cuando fallé a mi esposo.', 14, 4),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las últimas 2 semanas, hablé con mi esposo de forma que lo animara y edificara.', 15, 5),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, cuidé mis ojos y mis pensamientos en fidelidad a mi esposo.', 16, 1),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, administré con responsabilidad mi tiempo.', 17, 2),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, administré con responsabilidad los recursos del hogar.', 18, 3),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, mi conducta en casa reflejó el mismo testimonio cristiano que doy en público.', 19, 4),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las últimas 2 semanas, actué de manera que fortaleciera la confianza de mi esposo en mí.', 20, 5)
) as seeded(audience, category_id, prompt, order_in_survey, order_in_category)
join public.question_sets qs on qs.key = seeded.audience
on conflict (question_set_id, order_in_survey) do update
set
  category_id = excluded.category_id,
  prompt = excluded.prompt,
  order_in_category = excluded.order_in_category,
  is_active = true;
