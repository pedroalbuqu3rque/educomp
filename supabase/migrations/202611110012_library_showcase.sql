-- Exemplos de interface (24): dados ilustrativos, SEM anexos e SEM aprovação editorial fictícia.
-- A Biblioteca exibe materiais reais primeiro, depois os exemplos.
-- A migration não modifica materiais submetidos, publicações ou permissões de revisores.
begin;
insert into public.taxonomies(category,label) values
 ('type','Aula completa'),('type','Sequência de atividades')
on conflict (category,label) do nothing;

create table public.catalog_examples (
 id uuid primary key,
 position smallint not null unique check (position between 1 and 500),
 title text not null check (length(btrim(title)) between 1 and 200),
 description text not null check (length(btrim(description)) between 1 and 10000),
 keywords text[] not null check (cardinality(keywords)>0),
 objectives text not null default '',
 authorship text not null default 'EduComp · exemplo de interface',
 year text not null,
 type text[] not null,
 stage text[] not null,
 axis text[] not null,
 approach text[] not null,
 is_active boolean not null default true
);

create table public.saved_catalog_examples (
 user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 example_id uuid not null references public.catalog_examples(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(user_id,example_id)
);
create index saved_catalog_examples_user on public.saved_catalog_examples(user_id);

alter table public.catalog_examples enable row level security;
alter table public.saved_catalog_examples enable row level security;
revoke all on public.catalog_examples,public.saved_catalog_examples from anon,authenticated;
grant select on public.catalog_examples to anon,authenticated;
grant select,insert,delete on public.saved_catalog_examples to authenticated;
create policy catalog_examples_visible on public.catalog_examples for select to anon,authenticated using (is_active);
create policy saved_examples_select on public.saved_catalog_examples for select to authenticated using(user_id=auth.uid());
create policy saved_examples_insert on public.saved_catalog_examples for insert to authenticated
 with check(user_id=auth.uid() and exists(select 1 from public.catalog_examples e where e.id=example_id and e.is_active));
create policy saved_examples_delete on public.saved_catalog_examples for delete to authenticated using(user_id=auth.uid());

-- Cadastro administrativo, de uso exclusivo do SQL Editor. Reexecutar os dados não duplica exemplos.
insert into public.catalog_examples(id,position,title,description,keywords,objectives,authorship,year,type,stage,axis,approach)
select id,position,title,description,keywords,objectives,authorship,year,type,stage,axis,approach
from jsonb_to_recordset($catalog$
[
  {
    "id": "d3000000-0000-4000-8000-000000000001",
    "position": 1,
    "title": "Algoritmos no dia a dia",
    "description": "Instruções, execução, identificação de erros e repetições.",
    "keywords": [
      "algoritmos",
      "sequências",
      "repetições",
      "depuração"
    ],
    "objectives": "Organizar instruções sequenciais, identificar erros e reconhecer repetições em algoritmos do cotidiano.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 4º e 5º ano",
    "type": [
      "Sequência de atividades"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000002",
    "position": 2,
    "title": "Privacidade e segurança na internet",
    "description": "O que compartilhar e o que manter em segurança na internet?",
    "keywords": [
      "privacidade",
      "segurança",
      "dados pessoais",
      "internet"
    ],
    "objectives": "Distinguir informações pessoais e públicas e estabelecer cuidados para compartilhar dados na internet.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 7º ano",
    "type": [
      "Aula completa"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000003",
    "position": 3,
    "title": "Jogos de lógica",
    "description": "Pistas e desafios para praticar o raciocínio lógico.",
    "keywords": [
      "lógica",
      "raciocínio"
    ],
    "objectives": "Resolver desafios por dedução e argumentar sobre estratégias de raciocínio lógico.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 5º ano",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000004",
    "position": 4,
    "title": "Histórias no Scratch",
    "description": "Apresentação para criar histórias interativas no Scratch.",
    "keywords": [
      "scratch",
      "programação",
      "histórias"
    ],
    "objectives": "Planejar personagens, cenas e comandos para uma narrativa interativa no Scratch.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 6º ano",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000005",
    "position": 5,
    "title": "Redes e conexões",
    "description": "Guia ilustrado sobre redes, dispositivos e internet.",
    "keywords": [
      "redes",
      "internet"
    ],
    "objectives": "Reconhecer redes e dispositivos conectados e explicar trocas de informações na internet.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 7º ano",
    "type": [
      "Material de apoio"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Plugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000006",
    "position": 6,
    "title": "Segurança na internet",
    "description": "Aulas sobre senhas, golpes e cuidados no ambiente digital.",
    "keywords": [
      "senhas",
      "segurança",
      "internet"
    ],
    "objectives": "Identificar riscos digitais e formular medidas de proteção contra golpes e exposição de dados.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 8º ano",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000007",
    "position": 7,
    "title": "Padrões e formas",
    "description": "Brincadeiras com cores e formas para reconhecer padrões.",
    "keywords": [
      "padrões",
      "formas"
    ],
    "objectives": "Observar, comparar e continuar padrões de cores, formas e sequências.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EI · 5 anos",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000008",
    "position": 8,
    "title": "Dados e privacidade",
    "description": "Debata a coleta, o uso e a proteção de dados pessoais.",
    "keywords": [
      "privacidade",
      "dados"
    ],
    "objectives": "Debater consentimento, coleta de dados e atitudes responsáveis em situações digitais.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EM · 1ª série",
    "type": [
      "Plano de aula"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000009",
    "position": 9,
    "title": "Comandos com blocos",
    "description": "Use blocos e cartões para montar sequências de comandos.",
    "keywords": [
      "comandos",
      "algoritmos"
    ],
    "objectives": "Organizar blocos de comandos e prever o resultado de uma sequência de instruções.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 3º ano",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000010",
    "position": 10,
    "title": "Mensagens codificadas",
    "description": "Desafios de criptografia simples com símbolos e códigos.",
    "keywords": [
      "criptografia",
      "códigos"
    ],
    "objectives": "Representar e decodificar mensagens com regras simples de substituição e símbolos.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 9º ano",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000011",
    "position": 11,
    "title": "Cidadania digital",
    "description": "Apresentação sobre respeito e convivência nas redes.",
    "keywords": [
      "cidadania",
      "convivência"
    ],
    "objectives": "Reconhecer práticas de respeito, participação e segurança nos espaços digitais.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EM · 2ª série",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000012",
    "position": 12,
    "title": "Caminhos e movimentos",
    "description": "Percursos com setas e brincadeiras para explorar algoritmos.",
    "keywords": [
      "algoritmos",
      "movimentos"
    ],
    "objectives": "Representar deslocamentos com comandos, setas e percursos.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EI · 4 anos",
    "type": [
      "Material de apoio"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000013",
    "position": 13,
    "title": "Meu primeiro programa",
    "description": "Explore comandos e repetições em uma animação simples.",
    "keywords": [
      "programação",
      "repetição"
    ],
    "objectives": "Criar uma animação com comandos e repetições simples.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 5º ano",
    "type": [
      "Plano de aula"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000014",
    "position": 14,
    "title": "Como funciona o computador",
    "description": "Conheça os componentes e suas funções.",
    "keywords": [
      "hardware",
      "computador"
    ],
    "objectives": "Identificar componentes básicos do computador e explicar suas funções.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 6º ano",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000015",
    "position": 15,
    "title": "Detetives da informação",
    "description": "Investigue pistas para avaliar informações na internet.",
    "keywords": [
      "informação",
      "fontes"
    ],
    "objectives": "Avaliar evidências e comparar fontes de informação na internet.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 8º ano",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000016",
    "position": 16,
    "title": "Contando em binário",
    "description": "Represente números usando apenas dois símbolos.",
    "keywords": [
      "binário",
      "números"
    ],
    "objectives": "Compreender a ideia de representação binária de números.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 7º ano",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000017",
    "position": 17,
    "title": "Robôs no papel",
    "description": "Crie instruções para um personagem percorrer um mapa.",
    "keywords": [
      "robôs",
      "mapas"
    ],
    "objectives": "Planejar trajetos por meio de instruções precisas e testar suas soluções.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 4º ano",
    "type": [
      "Atividade"
    ],
    "stage": [
      "Ensino Fundamental — Anos iniciais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000018",
    "position": 18,
    "title": "Histórias com padrões",
    "description": "Reconheça repetições em histórias e brincadeiras.",
    "keywords": [
      "padrões",
      "histórias"
    ],
    "objectives": "Identificar regularidades e construir narrativas baseadas em padrões.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EI · 5 anos",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000019",
    "position": 19,
    "title": "Imagens e pixels",
    "description": "Descubra como imagens digitais são representadas.",
    "keywords": [
      "pixels",
      "imagens"
    ],
    "objectives": "Descrever como pixels formam imagens e experimentar resoluções distintas.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 6º ano",
    "type": [
      "Material de apoio"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Mundo Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000020",
    "position": 20,
    "title": "Decisões e condições",
    "description": "Explore escolhas e condições em pequenos programas.",
    "keywords": [
      "condições",
      "programação"
    ],
    "objectives": "Empregar condições para representar decisões em programas simples.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EM · 1ª série",
    "type": [
      "Plano de aula"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000021",
    "position": 21,
    "title": "Pegadas digitais",
    "description": "Reflita sobre os rastros que deixamos ao usar a internet.",
    "keywords": [
      "privacidade",
      "rastros"
    ],
    "objectives": "Reconhecer rastros digitais e avaliar escolhas de compartilhamento online.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EM · 3ª série",
    "type": [
      "Slides"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000022",
    "position": 22,
    "title": "Organizando coleções",
    "description": "Separe objetos por características e critérios.",
    "keywords": [
      "classificação",
      "coleções"
    ],
    "objectives": "Classificar objetos em conjuntos conforme critérios construídos coletivamente.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EI · 4 anos",
    "type": [
      "Jogo"
    ],
    "stage": [
      "Educação Infantil"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000023",
    "position": 23,
    "title": "Tecnologia e sociedade",
    "description": "Discuta os impactos da tecnologia na vida cotidiana.",
    "keywords": [
      "sociedade",
      "tecnologia"
    ],
    "objectives": "Analisar impactos da tecnologia no cotidiano e discutir alternativas de uso responsável.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EM · 2ª série",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Ensino Médio"
    ],
    "axis": [
      "Cultura Digital"
    ],
    "approach": [
      "Plugada",
      "Desplugada"
    ]
  },
  {
    "id": "d3000000-0000-4000-8000-000000000024",
    "position": 24,
    "title": "Criando jogos no Scratch",
    "description": "Planeje personagens, regras e desafios interativos.",
    "keywords": [
      "scratch",
      "jogos",
      "programação"
    ],
    "objectives": "Planejar jogos digitais com objetivos, regras, desafios e personagens no Scratch.",
    "authorship": "EduComp · exemplo de interface",
    "year": "EF · 9º ano",
    "type": [
      "Sequência didática"
    ],
    "stage": [
      "Ensino Fundamental — Anos finais"
    ],
    "axis": [
      "Pensamento Computacional"
    ],
    "approach": [
      "Plugada"
    ]
  }
]
$catalog$::jsonb) as item(
 id uuid, position smallint, title text, description text, keywords text[], objectives text,
 authorship text, year text, type text[], stage text[], axis text[], approach text[]
)
on conflict (id) do nothing;

-- A RPC continua invoker: materiais reais precisam estar aprovados e publicados sob RLS.
create or replace function public.search_library(
 p_q text default '', p_types text[] default '{}', p_stages text[] default '{}',
 p_axes text[] default '{}', p_approaches text[] default '{}', p_page bigint default 1
) returns jsonb language sql stable security invoker set search_path='' as $$
 with live as (
  select m.id, m.title, m.description, m.keywords, m.authorship,
   coalesce(m.objectives,'') as objectives,
   array_to_string(coalesce(t.grades,'{}'::text[]),' · ') as year,
   coalesce(t.types,'{}'::text[]) as types,
   coalesce(t.stages,'{}'::text[]) as stages,
   coalesce(t.axes,'{}'::text[]) as axes,
   (case m.approach when 'plugged' then array['Plugada'] when 'unplugged' then array['Desplugada'] else array['Plugada','Desplugada'] end)::text[] as approaches,
   false as is_demo, 0 as sort_group, m.created_at as sort_date, 0 as position
  from public.materials m
  left join lateral (
   select array_agg(t.label order by t.id) filter(where t.category='type') as types,
    array_agg(t.label order by t.id) filter(where t.category='stage') as stages,
    array_agg(t.label order by t.id) filter(where t.category='axis') as axes,
    array_agg(t.label order by t.id) filter(where t.category='grade') as grades
   from public.material_taxonomies mt join public.taxonomies t on t.id=mt.taxonomy_id where mt.material_id=m.id
  ) t on true
  where m.is_published and m.review_status='approved'
 ), examples as (
  select e.id,e.title,e.description,e.keywords,e.authorship,e.objectives,e.year,
   e.type as types,e.stage as stages,e.axis as axes,e.approach as approaches,
   true as is_demo,1 as sort_group,null::timestamptz as sort_date,e.position::integer as position
  from public.catalog_examples e
  where e.is_active
  -- Um material real aprovado substitui seu cartão de exemplo, sem duplicação.
  and not exists(select 1 from public.materials m where m.is_published and m.review_status='approved'
   and private.library_normalize(m.title)=private.library_normalize(e.title))
 ), combined as (
  select * from live union all select * from examples
 ), matched as (
  select * from combined m where
   not exists(select 1 from regexp_split_to_table(private.library_normalize(left(coalesce(p_q,''),200)),E'\\s+') term
    where term<>'' and strpos(private.library_normalize(m.title||' '||array_to_string(m.keywords,' ')),term)=0)
   and (coalesce(cardinality(p_types),0)=0 or m.types && p_types)
   and (coalesce(cardinality(p_stages),0)=0 or m.stages && p_stages)
   and (coalesce(cardinality(p_axes),0)=0 or m.axes && p_axes)
   and (coalesce(cardinality(p_approaches),0)=0 or m.approaches && p_approaches)
 ), counts as (select count(*) as total,greatest(1,(count(*)+11)/12) as pages from matched),
 bounds as (select total,pages,least(greatest(coalesce(p_page,1),1),pages) as page from counts),
 paged as (
  select * from matched order by sort_group,sort_date desc nulls last,position,id desc
  limit 12 offset(select (page-1)*12 from bounds)
 )
 select jsonb_build_object('total',b.total,'pages',b.pages,'page',b.page,'items',coalesce((
  select jsonb_agg(jsonb_build_object('id',m.id,'title',m.title,'description',m.description,
   'keywords',m.keywords,'authorship',m.authorship,'objectives',m.objectives,
   'year',m.year,'type',m.types,'stage',m.stages,'axis',m.axes,'approach',m.approaches,
   'is_demo',m.is_demo)
   order by m.sort_group,m.sort_date desc nulls last,m.position,m.id desc) from paged m),'[]'::jsonb)) from bounds b;
$$;
revoke all on function public.search_library(text,text[],text[],text[],text[],bigint) from public;
grant execute on function public.search_library(text,text[],text[],text[],text[],bigint) to anon,authenticated;

-- A RPC continua invoker: materiais reais precisam estar aprovados e publicados sob RLS.
create or replace function public.search_saved_library(
 p_q text default '', p_types text[] default '{}', p_stages text[] default '{}',
 p_axes text[] default '{}', p_approaches text[] default '{}', p_page bigint default 1
) returns jsonb language sql stable security invoker set search_path='' as $$
 with live as (
  select m.id, m.title, m.description, m.keywords, m.authorship,
   coalesce(m.objectives,'') as objectives,
   array_to_string(coalesce(t.grades,'{}'::text[]),' · ') as year,
   coalesce(t.types,'{}'::text[]) as types,
   coalesce(t.stages,'{}'::text[]) as stages,
   coalesce(t.axes,'{}'::text[]) as axes,
   (case m.approach when 'plugged' then array['Plugada'] when 'unplugged' then array['Desplugada'] else array['Plugada','Desplugada'] end)::text[] as approaches,
   false as is_demo, 0 as sort_group, m.created_at as sort_date, 0 as position
  from public.materials m
  left join lateral (
   select array_agg(t.label order by t.id) filter(where t.category='type') as types,
    array_agg(t.label order by t.id) filter(where t.category='stage') as stages,
    array_agg(t.label order by t.id) filter(where t.category='axis') as axes,
    array_agg(t.label order by t.id) filter(where t.category='grade') as grades
   from public.material_taxonomies mt join public.taxonomies t on t.id=mt.taxonomy_id where mt.material_id=m.id
  ) t on true
  where m.is_published and m.review_status='approved' and exists(select 1 from public.saved_materials s where s.material_id=m.id and s.user_id=auth.uid())
 ), examples as (
  select e.id,e.title,e.description,e.keywords,e.authorship,e.objectives,e.year,
   e.type as types,e.stage as stages,e.axis as axes,e.approach as approaches,
   true as is_demo,1 as sort_group,null::timestamptz as sort_date,e.position::integer as position
  from public.catalog_examples e
  where e.is_active and exists(select 1 from public.saved_catalog_examples s where s.example_id=e.id and s.user_id=auth.uid())
  -- Um material real aprovado substitui seu cartão de exemplo, sem duplicação.
  and not exists(select 1 from public.materials m where m.is_published and m.review_status='approved'
   and private.library_normalize(m.title)=private.library_normalize(e.title))
 ), combined as (
  select * from live union all select * from examples
 ), matched as (
  select * from combined m where
   not exists(select 1 from regexp_split_to_table(private.library_normalize(left(coalesce(p_q,''),200)),E'\\s+') term
    where term<>'' and strpos(private.library_normalize(m.title||' '||array_to_string(m.keywords,' ')),term)=0)
   and (coalesce(cardinality(p_types),0)=0 or m.types && p_types)
   and (coalesce(cardinality(p_stages),0)=0 or m.stages && p_stages)
   and (coalesce(cardinality(p_axes),0)=0 or m.axes && p_axes)
   and (coalesce(cardinality(p_approaches),0)=0 or m.approaches && p_approaches)
 ), counts as (select count(*) as total,greatest(1,(count(*)+11)/12) as pages from matched),
 bounds as (select total,pages,least(greatest(coalesce(p_page,1),1),pages) as page from counts),
 paged as (
  select * from matched order by sort_group,sort_date desc nulls last,position,id desc
  limit 12 offset(select (page-1)*12 from bounds)
 )
 select jsonb_build_object('total',b.total,'pages',b.pages,'page',b.page,'items',coalesce((
  select jsonb_agg(jsonb_build_object('id',m.id,'title',m.title,'description',m.description,
   'keywords',m.keywords,'authorship',m.authorship,'objectives',m.objectives,
   'year',m.year,'type',m.types,'stage',m.stages,'axis',m.axes,'approach',m.approaches,
   'is_demo',m.is_demo)
   order by m.sort_group,m.sort_date desc nulls last,m.position,m.id desc) from paged m),'[]'::jsonb)) from bounds b;
$$;
revoke all on function public.search_saved_library(text,text[],text[],text[],text[],bigint) from public;
grant execute on function public.search_saved_library(text,text[],text[],text[],text[],bigint) to authenticated;

commit;
