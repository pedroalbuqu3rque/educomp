# Controle de implementação

Este controle acompanha as entregas incrementais iniciadas a partir de `educomp-github.rar`. Não substitui o backlog geral.

| Entrega | Situação | Validação |
| --- | --- | --- |
| Detalhes do material e perfil público | Código entregue e aplicação confirmada pelo usuário | TypeScript e 9 testes de consultas/retorno após login; revisão visual com dados de teste |
| Meu perfil: nome, cargo e apresentação | Código entregue; aplicação local a confirmar | TypeScript e 8 testes de validação/autorização; revisão visual com dados de teste |
| Revisão e moderação | Código entregue; migration 007 e integração com Supabase a validar | Fila, transições editoriais, denúncia, exclusão e RLS; ver `revisao-moderacao.md` |
| Foto de perfil | Pendente | Seleção, prévia, upload e políticas de armazenamento |
| Discussões e relatos | Implementados no código; migration 008 e testes reais pendentes | Formulários, respostas, edição/exclusão, denúncia, RLS; ver `comunidade.md` |
| Notificações | Implementadas no código; migration 009 e testes reais pendentes | Eventos, destinatários, leitura e interface; ver `notificacoes.md` |
| Contato e páginas institucionais | Implementados no código; migration 010, revisão jurídica e testes reais pendentes | Formulário, gravação privada e páginas de Termos/Privacidade; ver `contato-institucional.md` |

## Organização do trabalho

- Uma funcionalidade delimitada por entrega, com ZIP incremental.
- Reutilizar os componentes existentes e consultar apenas as telas necessárias no Figma.
- Executar TypeScript e testes direcionados ao comportamento alterado.
- Repetir verificações amplas somente quando houver mudança ou falha que justifique.
- Conferir integração real no ambiente do projeto; não confundir dados simulados de teste com dados do Supabase.
- Registrar pendências concretas ao terminar cada entrega.

A cota restante de Codex não está disponível para consulta pelo assistente. Este controle reduz retrabalho e mantém o escopo de cada rodada explícito.


## Notificações — etapa 009

A central de notificações, o sininho com contador, a lista completa, as ações de leitura e os gatilhos de eventos estão implementados no código. A integração com o Supabase depende da aplicação da migration `202611110009_notifications.sql`; os testes de integração real e o build precisam ser executados em ambiente com dependências completas. Detalhes em [Notificações](notificacoes.md).


## Contato e páginas institucionais — etapa 010

As rotas `/contato`, `/termos` e `/privacidade` substituem as páginas provisórias. O formulário permite registrar mensagens de visitantes numa tabela privada; a leitura é reservada ao SQL Editor administrativo. As páginas jurídicas estão marcadas como rascunhos para revisão antes da publicação pública. A aplicação real da migration `202611110010_contact.sql` e os testes completos permanecem pendentes. Veja [Contato e páginas institucionais](contato-institucional.md).
