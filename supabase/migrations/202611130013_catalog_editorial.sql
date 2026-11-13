-- Ajustes editoriais do acervo inicial, sem alterar materiais enviados ou regras de revisão.
-- Aplicar uma única vez após 012, no SQL Editor administrativo do Supabase.
-- As páginas já utilizam essas correções no frontend mesmo antes desta migration.
begin;

-- Autor institucional dos registros criados pelo EduComp: não atribuir autoria docente fictícia.
update public.catalog_examples
set authorship = 'EduComp'
where id >= 'd3000000-0000-4000-8000-000000000001'::uuid
  and id <= 'd3000000-0000-4000-8000-000000000024'::uuid
  and authorship = 'EduComp · exemplo de interface';

update public.catalog_examples
set description = 'Cinco desafios desplugados com tabuleiros para planejar instruções, executar percursos, identificar erros e explorar repetições.',
    objectives = 'Planejar, executar, testar e revisar algoritmos em percursos e desafios progressivos.'
where id = 'd3000000-0000-4000-8000-000000000001';

update public.catalog_examples
set description = 'Aula de 50 minutos sobre dados pessoais e cuidados ao compartilhar informações na internet, com roteiro e folha de atividade.',
    objectives = 'Reconhecer riscos de exposição de dados e justificar escolhas mais seguras em situações fictícias.'
where id = 'd3000000-0000-4000-8000-000000000002';

update public.catalog_examples
set title = 'Quiz interativo no Scratch',
    description = 'Atividade plugada para programar perguntas, respostas, condições e pontuação em um quiz no Scratch.',
    type = array['Atividade']::text[],
    keywords = array['scratch','quiz','programação','pontuação']::text[],
    objectives = 'Programar um quiz com perguntas, decisões, pontuação e testes usando blocos do Scratch.'
where id = 'd3000000-0000-4000-8000-000000000004';

update public.catalog_examples
set title = 'Como funciona a internet?',
    description = 'Guia visual sobre dispositivos, redes, servidores, endereços e o caminho percorrido pelos dados na internet.',
    keywords = array['internet','redes','servidores','dados']::text[],
    objectives = 'Explicar o funcionamento básico das redes e diferenciar a internet da Web.',
    year = 'EF · 8º ano',
    approach = array['Plugada','Desplugada']::text[]
where id = 'd3000000-0000-4000-8000-000000000005';

commit;
