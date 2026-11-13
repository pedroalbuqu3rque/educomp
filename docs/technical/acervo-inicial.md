# Acervo inicial da Biblioteca

A Biblioteca reúne dois tipos de registro. Os materiais enviados por professores continuam na tabela `materials`, sujeitos ao fluxo de revisão e publicação. Os 24 registros institucionais de `catalog_examples` continuam em tabela própria, identificados internamente por IDs estáveis, consultáveis e disponíveis para salvar. A interface apresenta ambos como materiais da Biblioteca, mas **não atribui aprovação editorial de contribuições de terceiros aos registros institucionais**.

## Arquivos fornecidos

Os PDFs abaixo foram disponibilizados para integrar a Biblioteca. Permanecem no repositório em `private/biblioteca/arquivos/`, fora dos arquivos públicos. A rota autenticada `/api/biblioteca/arquivos/[id]` disponibiliza o PDF apenas para usuários logados, sem utilizar o Storage dos materiais submetidos.

| Registro do acervo | PDF vinculado | Situação |
| --- | --- | --- |
| Algoritmos no dia a dia | `desafio-dos-algoritmos.pdf` | Caderno completo com cinco atividades; 8 páginas |
| Privacidade e segurança | `privacidade-e-seguranca-na-internet.pdf` | Aula e folha de atividade; 5 páginas |
| Quiz interativo no Scratch | `quiz-interativo-no-scratch.pdf` | Atividade de programação; 6 páginas |
| Como funciona a internet? | `como-funciona-a-internet.pdf` | Material de apoio; 6 páginas |
| Demais 20 registros | `material-de-demonstracao.pdf` | Arquivo provisório; não contém as atividades descritas |

Os arquivos completos têm prévias de capa em `public/biblioteca/capas/`. As páginas públicas mostram título, resumo, classificações pedagógicas, objetivo e informações de aplicação; visualizar e baixar o PDF exige login. Para os registros sem material definitivo, uma observação no painel de download explica que o arquivo é provisório. **Não considerar esses 20 registros como materiais pedagógicos finalizados.**

O PDF do quiz faz referência a um arquivo `.sb3` complementar, que não foi enviado. A página informa essa ausência sem oferecer download inexistente.

## Sincronização com o Supabase

A aplicação aplica correções editoriais dos quatro registros com PDF completo na exibição (`src/lib/library/catalog-resources.ts`). Isso permite apresentar títulos e classificações coerentes com os anexos sem aguardar alterações no banco. Entretanto, a busca e os filtros são executados no Supabase antes dessas correções; para que pesquisas como **quiz** e **servidores** encontrem os respectivos materiais e as novas classificações sejam consideradas, aplicar a migration `supabase/migrations/202611130013_catalog_editorial.sql` após a 012, uma única vez. Não modifica `materials`, `review_events`, RLS ou permissões.

A consulta `search_library` mantém prioridade para materiais reais aprovados e publicados. A migration 013 só atualiza metadados de registros do acervo inicial, sem fingir publicação de professores nem enviar documentos para o banco. As fichas do acervo permanecem públicas, mas a visualização e o download dos PDFs exigem autenticação. **Não mover PDFs institucionais ou privados de professores para `public/`**.

## Finalização do conteúdo

Para concluir a Biblioteca antes do lançamento, substituir os anexos provisórios pelos arquivos didáticos correspondentes. Atualizar o mapeamento de anexos em `catalog-resources.ts`, mantendo tamanho, número de páginas e título corretos. Os quatro documentos completos desta etapa já estão disponíveis; os demais são fichas de proposta com anexo temporário, não recursos completos.

A verificação funcional de download, favoritos, busca, filtros, responsividade e permissões faz parte da fase de QA.

A migration `202611130016_catalog_title_cards.sql` encurta apenas o titulo do segundo registro para a exibicao compacta nos cards e para manter a busca do banco sincronizada. Antes de aplicá-la, a correção já é apresentada na interface. Os PDFs, descrições e dados dos materiais enviados por usuários não são modificados.
