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
    ('man'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, aparte tiempo personal para orar.', 1, 1),
    ('man'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, lei la Biblia con atencion y no solo por costumbre.', 2, 2),
    ('man'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, pedi la direccion de Dios antes de tomar decisiones importantes del hogar.', 3, 3),
    ('man'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, hable con mi esposa sobre algun tema espiritual.', 4, 4),
    ('man'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, tome iniciativa para promover la vida espiritual de mi hogar.', 5, 5),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, servi a mi esposa en necesidades concretas del dia a dia.', 6, 1),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, asumi responsabilidad en decisiones del hogar sin evadirlas.', 7, 2),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, pregunte a mi esposa como se sentia y la escuche con atencion.', 8, 3),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, ordene mi tiempo de manera que beneficiara a mi hogar.', 9, 4),
    ('man'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, mis decisiones en casa consideraron el bienestar de mi esposa.', 10, 5),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, escuche a mi esposa sin interrumpirla cuando me expreso una preocupacion.', 11, 1),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, controle mi tono de voz durante un desacuerdo.', 12, 2),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, evite responder con dureza cuando me senti frustrado.', 13, 3),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, pedi perdon con claridad cuando falle a mi esposa.', 14, 4),
    ('man'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, hable con mi esposa de forma que la animara.', 15, 5),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, cuide mis ojos y mis pensamientos en fidelidad a mi esposa.', 16, 1),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, administre con responsabilidad mi tiempo.', 17, 2),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, administre con responsabilidad el dinero o los recursos del hogar.', 18, 3),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, mi conducta en casa reflejo el mismo testimonio cristiano que doy en publico.', 19, 4),
    ('man'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, actue de manera que fortaleciera la confianza de mi esposa en mi.', 20, 5),
    ('woman'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, aparte tiempo personal para orar.', 1, 1),
    ('woman'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, lei la Biblia con atencion y no solo por costumbre.', 2, 2),
    ('woman'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, busque al Senor antes de reaccionar en momentos de carga o frustracion.', 3, 3),
    ('woman'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, hable con mi esposo sobre algun tema espiritual.', 4, 4),
    ('woman'::public.gender, 'communion-with-christ', 'En las ultimas 2 semanas, contribui con mi actitud a la vida espiritual de mi hogar.', 5, 5),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, hable a mi esposo con respeto.', 6, 1),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, apoye la direccion de mi esposo cuando no implicaba pecado.', 7, 2),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, evite debilitar a mi esposo con critica constante.', 8, 3),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, servi en mi hogar con disposicion aun en dias dificiles.', 9, 4),
    ('woman'::public.gender, 'love-and-order-in-the-home', 'En las ultimas 2 semanas, mis actitudes ayudaron a crear paz en casa.', 10, 5),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, escuche a mi esposo con humildad cuando me hablo de algo que debia corregir.', 11, 1),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, controle mi tono de voz durante un desacuerdo.', 12, 2),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, evite responder con desprecio, sarcasmo o frialdad.', 13, 3),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, pedi perdon con claridad cuando falle a mi esposo.', 14, 4),
    ('woman'::public.gender, 'grace-in-the-relationship', 'En las ultimas 2 semanas, hable con mi esposo de forma que lo animara y edificara.', 15, 5),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, cuide mis ojos y mis pensamientos en fidelidad a mi esposo.', 16, 1),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, administre con responsabilidad mi tiempo.', 17, 2),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, administre con responsabilidad los recursos del hogar.', 18, 3),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, mi conducta en casa reflejo el mismo testimonio cristiano que doy en publico.', 19, 4),
    ('woman'::public.gender, 'faithfulness-and-testimony', 'En las ultimas 2 semanas, actue de manera que fortaleciera la confianza de mi esposo en mi.', 20, 5)
) as seeded(audience, category_id, prompt, order_in_survey, order_in_category)
join public.question_sets qs on qs.key = seeded.audience
on conflict (question_set_id, order_in_survey) do update
set
  category_id = excluded.category_id,
  prompt = excluded.prompt,
  order_in_category = excluded.order_in_category,
  is_active = true;
