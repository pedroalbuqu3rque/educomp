# Detalhes do material e perfil público

A biblioteca e a coleção de salvos agora abrem `/materiais/[id]`. A página apresenta as informações pedagógicas, descrição, objetivos, autoria e arquivos do recurso. O link `Ver perfil` abre `/perfis/[id]`, com a apresentação do professor e seus materiais publicados, em páginas de até 12 itens.

As consultas usam as tabelas e políticas existentes. Não há nova migração nesta atualização. Tanto os detalhes quanto a lista do professor exigem `is_published = true` e `review_status = approved`, inclusive quando a sessão pertence ao autor ou a um revisor. O perfil consulta apenas `id`, `display_name`, `occupation` e `bio`.

Visitantes podem ler as páginas. O download e os salvos exigem autenticação. O retorno do login aceita o endereço local de um material com UUID válido; endereços externos continuam bloqueados. Materiais enviados por professores são baixados por rota protegida com URLs temporárias do Storage. PDFs do acervo institucional também exigem login, por uma rota autenticada que não os expõe em `public/`.

A página distingue ausência de registro de falha de consulta. Falhas de arquivos ou favoritos preservam as informações do material e apresentam aviso. Os materiais enviados por professores têm ficha própria; os registros do acervo editorial ficam separados, com autoria indicada e arquivos vinculados.

## Escopo desta etapa

Implementados: detalhes, lista de arquivos em diálogo, salvos, retorno após login, perfil público, paginação e navegação entre as páginas. O cabeçalho compartilhado existente foi preservado.

Discussões, relatos, respostas, denúncias, edição do perfil, fotografia e notificações ainda não fazem parte desta etapa. A tela do material não exibe os comentários ilustrativos do Figma. A fotografia do perfil será implementada com o fluxo de edição; por enquanto são usadas as iniciais do nome.

## Verificação

- TypeScript: `npm.cmd run typecheck` passou no ambiente de preparação.
- Consultas e segurança de retorno: `node --test tests/material-pages.check.mjs`, nove testes aprovados com cliente de banco simulado.
- Revisão visual: renderização das duas páginas com dados de teste, usando os próprios componentes. Essa revisão não testa hidratação, login nem download real.
- A suíte Vitest existente não iniciou no ambiente Linux porque as dependências recebidas no RAR são do Windows e falta o binding nativo de Rolldown para Linux. Não foi possível certificar essa suíte nem o build de produção nesta entrega.
- Não houve conexão ao Supabase do projeto; login, persistência de salvos e downloads precisam ser confirmados no ambiente local.

## Teste manual

1. Na biblioteca, abrir um material publicado. Conferir se título, classificações, autoria e objetivos correspondem ao registro.
2. Como visitante, selecionar `Entrar para acessar`. Fazer login e conferir o retorno ao mesmo material.
3. Acessar os arquivos e baixar um arquivo válido.
4. Adicionar aos salvos, recarregar e conferir a persistência. Remover e conferir a coleção de salvos.
5. Abrir `Ver perfil`, conferir nome e apresentação e abrir um material do professor.
6. Consultar um ID inexistente e um material não publicado. Nenhum deve exibir conteúdo público.
7. Conferir as duas páginas em uma janela estreita e navegar por teclado, incluindo abertura e fechamento do diálogo de arquivos.
