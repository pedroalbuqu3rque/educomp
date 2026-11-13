# Biblioteca

A Biblioteca pública utiliza as funções `search_library` e `search_saved_library` do Supabase para consultar os materiais por título/tema, tipo, etapa, eixo e abordagem. Os filtros são independentes, aceitam seleção múltipla e se combinam na consulta. A paginação apresenta até 12 materiais por página.

## Estrutura

- `src/app/biblioteca/page.tsx`: entrada da Biblioteca.
- `src/components/library/library-browser.tsx`: pesquisa, filtros, cards, favoritos e paginação.
- `src/lib/library/catalog.ts`: definição das categorias, interpretação de URLs e funções locais para testes.
- `src/lib/library/load.ts`: consulta ao Supabase e obtenção dos estados de favorito.
- `src/lib/library/catalog-resources.ts`: metadados editoriais e vínculos dos PDFs do acervo inicial.
- `src/components/material/example-material-page.tsx`: ficha detalhada dos materiais do acervo.
- `src/app/biblioteca/library.css`: apresentação da Biblioteca e de Salvos.

## Dados e autorização

Materiais de professores só aparecem quando aprovados e publicados. Os 24 registros editoriais são armazenados em `catalog_examples`; quatro possuem PDFs completos e os demais têm anexo provisório identificado nas páginas de detalhes. O cadastro inicial foi feito pelas migrations `012`–`013`. Comentários no acervo dependem da migration `014`.

O ícone de favorito indica o estado salvo em azul preenchido. O estado é persistido por usuário e não deve ser confirmado antes do retorno do banco. A página Salvos é restrita a usuários autenticados.

## Verificação

Testar consulta sem login, resultados vazios, combinações de filtros, paginação, favoritos, acesso aos PDFs e erros de conexão. Os fluxos de alteração de estado devem ser testados com o Supabase real durante a homologação.
