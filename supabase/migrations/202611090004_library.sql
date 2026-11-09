begin;
insert into public.taxonomies(category,label) values
 ('type','Plano de aula'),('type','Slides'),('type','Material de apoio'),('type','Atividade'),('type','Sequência didática'),('type','Jogo'),
 ('stage','Educação Infantil'),('stage','Ensino Fundamental — Anos iniciais'),('stage','Ensino Fundamental — Anos finais'),('stage','Ensino Médio'),
 ('axis','Pensamento Computacional'),('axis','Mundo Digital'),('axis','Cultura Digital'),
 ('grade','Educação Infantil'),('grade','1º ano'),('grade','2º ano'),('grade','3º ano'),('grade','4º ano'),('grade','5º ano'),('grade','6º ano'),('grade','7º ano'),('grade','8º ano'),('grade','9º ano'),('grade','1ª série do Ensino Médio'),('grade','2ª série do Ensino Médio'),('grade','3ª série do Ensino Médio')
on conflict(category,label) do nothing;
create or replace function private.library_normalize(value text) returns text
language sql immutable strict set search_path='' as $$
 select lower(regexp_replace(normalize(value,NFD), U&'[\0300-\036f]', '', 'g'));
$$;
revoke all on function private.library_normalize(text) from public;
grant execute on function private.library_normalize(text) to anon,authenticated;
create or replace function public.search_library(
 p_q text default '', p_types text[] default '{}', p_stages text[] default '{}',
 p_axes text[] default '{}', p_approaches text[] default '{}', p_page bigint default 1
) returns jsonb language sql stable security invoker set search_path='' as $$
 with classified as (
  select m.*,coalesce(t.types,'{}') as types,coalesce(t.stages,'{}') as stages,
   coalesce(t.axes,'{}') as axes,coalesce(t.grades,'{}') as grades,
   case m.approach when 'plugged' then array['Plugada'] when 'unplugged' then array['Desplugada'] else array['Plugada','Desplugada'] end as approaches
  from public.materials m
  left join lateral (
   select array_agg(t.label order by t.id) filter(where t.category='type') as types,
    array_agg(t.label order by t.id) filter(where t.category='stage') as stages,
    array_agg(t.label order by t.id) filter(where t.category='axis') as axes,
    array_agg(t.label order by t.id) filter(where t.category='grade') as grades
   from public.material_taxonomies mt join public.taxonomies t on t.id=mt.taxonomy_id where mt.material_id=m.id
  ) t on true
  where m.is_published and m.review_status='approved'
 ), matched as (
  select * from classified m where
   not exists(select 1 from regexp_split_to_table(private.library_normalize(left(coalesce(p_q,''),200)),E'\\s+') term
    where term<>'' and strpos(private.library_normalize(m.title||' '||array_to_string(m.keywords,' ')),term)=0)
   and (coalesce(cardinality(p_types),0)=0 or m.types && p_types)
   and (coalesce(cardinality(p_stages),0)=0 or m.stages && p_stages)
   and (coalesce(cardinality(p_axes),0)=0 or m.axes && p_axes)
   and (coalesce(cardinality(p_approaches),0)=0 or m.approaches && p_approaches)
 ), counts as (select count(*) as total,greatest(1,(count(*)+11)/12) as pages from matched),
 bounds as (select total,pages,least(greatest(coalesce(p_page,1),1),pages) as page from counts),
 paged as (select * from matched order by created_at desc,id desc limit 12 offset(select (page-1)*12 from bounds))
 select jsonb_build_object('total',b.total,'pages',b.pages,'page',b.page,'items',coalesce((
  select jsonb_agg(jsonb_build_object('id',m.id,'title',m.title,'description',m.description,
   'keywords',m.keywords,'authorship',m.authorship,'objectives',coalesce(m.objectives,''),
   'year',array_to_string(m.grades,' · '),'type',m.types,'stage',m.stages,'axis',m.axes,'approach',m.approaches)
   order by m.created_at desc,m.id desc) from paged m),'[]'::jsonb)) from bounds b;
$$;
revoke all on function public.search_library(text,text[],text[],text[],text[],bigint) from public;
grant execute on function public.search_library(text,text[],text[],text[],text[],bigint) to anon,authenticated;
commit;
