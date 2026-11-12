# Exemplos de materiais na Biblioteca

Esta etapa reproduz os cards de `[3.1] Biblioteca` do Figma, mas preserva a diferença entre uma publicação real e um exemplo de apresentação. Ela não finge que um conteúdo foi enviado, aprovado ou que possui um arquivo que não existe.

## Ativação

Após aplicar as migrations 001–011, execute `supabase/migrations/202611110012_library_showcase.sql` no SQL Editor do Supabase. Atualize o código da aplicação, reinicie `npm run dev` e acesse `/biblioteca`. Não é preciso cadastrar os cards um a um: o script inclui os 24 registros de exemplo. A execução depende de acesso administrativo ao SQL Editor, não da chave pública da aplicação.

A migration cria `catalog_examples` e `saved_catalog_examples`, cadastra os 24 exemplos e atualiza as RPCs de Biblioteca e Salvos. Também adiciona os tipos **Aula completa** e **Sequência de atividades** às classificações de materiais reais. Nenhuma conta recebe novas permissões de revisão.

## Comportamento

- A Biblioteca mostra materiais reais revisados e publicados antes dos exemplos. Sem materiais reais, os 12 primeiros exemplos aparecem na mesma ordem do Figma; os outros 12 aparecem na página seguinte.
- Cada exemplo tem título, descrição, eixo, etapa, abordagem, objetivos e página própria. A página deixa claro que é uma representação de interface sem arquivo para download.
- Pesquisa, filtros e paginação consideram tanto publicações quanto exemplos. Em Salvos, contas autenticadas podem salvar os exemplos de forma privada e recuperar sua coleção em outra sessão.
- Se um material real publicado tiver o mesmo título de um exemplo, o exemplo deixa de aparecer na busca pública, evitando duplicações. Não são apagados materiais reais nem dados das contas.
- Os exemplos ficam fora da tabela `materials`; não criam `material_files`, `review_events`, comentários ou notificações de publicação. Não podem ser confundidos com uma aprovação editorial real.

## Administração

Os exemplos são identificados por UUIDs estáveis com prefixo `d3000000-0000-4000-8000-...`. O SQL usa `ON CONFLICT DO NOTHING` para o cadastro, protegendo contra duplicação. Apenas o SQL Editor administrativo pode incluir ou editar os dados de `catalog_examples`; visitantes têm somente leitura e os favoritos são protegidos por RLS.

Para ocultar um exemplo sem apagá-lo, execute, como administrador, `update public.catalog_examples set is_active = false where id = 'd3000000-0000-4000-8000-000000000001';` substituindo o identificador desejado. Use a interface normal de **Enviar material** e o fluxo de revisão para publicar um recurso pedagógico com arquivos reais. Nunca converta um exemplo em material publicado alterando diretamente `review_status` ou `is_published`.

## Checklist de QA

1. Abrir `/biblioteca` como visitante e conferir os títulos e a ordem dos 12 primeiros cards (quando não houver outros materiais publicados).
2. Usar a segunda página; devem existir 24 exemplos no total e IDs únicos.
3. Filtrar por `Aula completa` e `Sequência de atividades`; conferir os cards respectivos.
4. Abrir dois exemplos; título, objetivos e demais metadados devem ser diferentes e nenhum deve disponibilizar download inexistente.
5. Entrar como professor e salvar um exemplo; conferir em `/salvos`. Entrar com outra conta e verificar que não pode visualizar o favorito alheio.
6. Publicar um material real com o mesmo título de um exemplo pela revisão. O card real deve ter prioridade, e o exemplo com mesmo título não deve ser duplicado na Biblioteca.
7. Verificar que as RLS impedem inserts, updates ou deletes de exemplos a partir de visitantes ou professores comuns.

**Estado dos testes:** os testes automatizados foram escritos, mas dependem da instalação de todas as dependências npm e de execução com Supabase/PGlite. Esta mudança não foi aplicada automaticamente ao projeto remoto.
