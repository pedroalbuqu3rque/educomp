# Registros institucionais na Biblioteca

A migration 012 criou 24 fichas do acervo inicial em `catalog_examples`, separadas das contribuições enviadas por professores, que passam por revisão editorial. Os registros são acessíveis ao público e podem ser salvos por usuários autenticados; o campo interno `is_demo` continua identificando a origem do registro para selecionar a tabela correta de favoritos.

Nesta revisão, as páginas foram reorganizadas e receberam acesso aos arquivos PDF disponíveis. Quatro fichas têm conteúdos completos; as demais utilizam um arquivo provisório, identificado explicitamente no painel de acesso. Os cards não exibem a linguagem do protótipo ou do Figma, mas a aplicação não afirma que esses materiais institucionais passaram por um fluxo de revisão de terceiros.

Para nomes, PDFs, pendências e atualização de metadados, consulte [Acervo inicial](acervo-inicial.md).

A migration `202611130013_catalog_editorial.sql` sincroniza a busca e os filtros com os títulos de quatro fichas, mantendo os IDs estáveis. O SQL atualiza apenas `catalog_examples`; não altera `materials` nem publicações aprovadas. Para retirar uma ficha do ar, utilize o controle administrativo de `catalog_examples.is_active`, sem apagar seus favoritos históricos.
