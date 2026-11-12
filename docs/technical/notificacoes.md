# Notificações

A central de notificações do EduComp reúne avisos sobre materiais, revisão, comunidade e atualizações institucionais. Os avisos ficam vinculados à conta do destinatário e são apresentados no sininho do cabeçalho e na página **Notificações**.

## O que foi implementado

A página `/notificacoes` lista o histórico com paginação. No cabeçalho, o sininho indica a quantidade de notificações não lidas e abre uma lista das cinco mais recentes. Em ambos os lugares, é possível abrir o destino do aviso, marcar uma notificação como lida ou não lida e marcar todas como lidas. Lê-las não as exclui. O contador é atualizado ao abrir o painel, ao voltar à janela e periodicamente enquanto a página está visível.

Os avisos são criados automaticamente nos seguintes eventos:

| Evento | Quem recebe | Onde abre |
| --- | --- | --- |
| Novo envio concluído | Autor do material | Meus envios |
| Novo envio na fila | Revisores já autorizados | Análise de submissão |
| Análise iniciada, aprovação ou recusa | Autor do material | Meus envios |
| Material publicado ou despublicado | Autor do material | Material ou Meus envios |
| Novo material publicado na Biblioteca | Outras contas cadastradas | Material publicado |
| Comentário ou relato novo | Autor do material, quando não for o próprio autor da contribuição | Comunidade do material |
| Resposta a comentário | Autor do comentário original, se for outra pessoa | Discussão do material |
| Decisão de moderação | Autor afetado e responsável pela denúncia, conforme o caso | Comunidade do material |
| Comunicado institucional publicado | Contas cadastradas | Caminho local informado no comunicado |

**Aprovação e publicação são ações separadas.** Uma aprovação editorial não dispara o aviso de novo material na Biblioteca; isso só ocorre após a ação de publicação. Despublicar não envia novamente o aviso de lançamento ao republicar o mesmo material.

Não são enviados e-mails nem notificações push nesta versão. A lista é interna à aplicação e guarda histórico por conta. Não são geradas notificações retroativas para eventos anteriores à instalação da migration 009.

## Ativação

1. Atualize o repositório com os arquivos desta etapa.
2. No SQL Editor do Supabase, depois das migrations 001 a 008, execute **somente** `supabase/migrations/202611110009_notifications.sql`.
3. Inicie a aplicação com `npm ci` e `npm run dev` (com o `.env.local` configurado).
4. Entre com uma conta de professor. O sininho deve aparecer na Biblioteca, na página de um material e nas outras páginas autenticadas.
5. Acesse `/notificacoes` para visualizar o histórico. Se ainda não houver eventos, a central deve exibir o estado vazio, sem itens de demonstração.

## Publicar um comunicado institucional

A tabela `public.platform_announcements` é restrita ao banco. Para publicar uma novidade, use o **SQL Editor do Supabase com uma conta administradora**. Usuários autenticados comuns e revisores não recebem permissão para publicar comunicados.

```sql
-- Primeiro cria um rascunho, ainda sem disparar notificações.
insert into public.platform_announcements (title, body, target_url)
values (
  'Novidades do EduComp',
  'Uma atualização da plataforma já está disponível.',
  '/biblioteca'
)
returning id;

-- Ao definir published_at pela primeira vez, o banco cria um aviso
-- para cada conta que já possua perfil na plataforma.
update public.platform_announcements
set published_at = now()
where id = 'UUID_DO_COMUNICADO'
  and published_at is null;
```

O destino precisa ser um caminho interno da aplicação. Evite colocar dados pessoais ou informações privadas em títulos e mensagens. Um comunicado entregue não é recriado se sua data de publicação for alterada.

## Segurança

- `notifications` tem RLS: cada conta só lê suas próprias linhas.
- Clientes não podem inserir, alterar ou excluir notificações diretamente. As funções `set_notification_read` e `mark_all_notifications_read` permitem mudar apenas o estado de leitura do usuário autenticado.
- Os gatilhos geram conteúdo breve e genérico; não incluem justificativas sigilosas, dados pessoais de estudantes ou identidade de denunciantes.
- O servidor valida a sessão com `auth.getUser()`; a API de escrita valida origem, tipo e tamanho da requisição.
- O frontend rejeita links externos mesmo que um destino inválido apareça nos dados recebidos.
- Ao despublicar, o conteúdo deixa de ser acessível ao público pelas políticas já existentes. Uma notificação antiga não concede permissão para abri-lo.
- A publicação de um novo material ou comunicado gera um registro por conta cadastrada, em transação. Para uma base maior, será necessário transferir esta distribuição para uma fila de processamento sem alterar os contratos de leitura.

## Testes de aceite

Teste com duas contas de professores e uma conta de revisor:

1. Abra a central sem eventos e confira a mensagem de estado vazio.
2. Envie um material. Confira o aviso de protocolo para o autor e o item na fila do revisor.
3. Inicie a análise, aprove e confirme que **nenhum aviso de novo material público** foi gerado antes da publicação.
4. Publique. Confira o aviso para o autor e o aviso de novo material para a outra conta cadastrada.
5. Com a segunda conta, comente em um material do primeiro professor. Confirme o aviso e use o link para chegar à Comunidade.
6. Responda ao comentário com a primeira conta. Confirme que a segunda recebe o aviso de resposta.
7. Marque um aviso como lido, desmarque, marque todas as notificações como lidas e recarregue a página. Os estados devem persistir.
8. Acesse com a outra conta e verifique que ela não lê nem altera os avisos da primeira.
9. Publique um comunicado administrativo e confirme sua entrega sem enviar mensagens por uma conta comum.
10. Despublique um material e confira que um aviso antigo não permite abrir conteúdo privado.

Os testes estão em `tests/notifications-validation.test.ts` e `tests/notifications-database.test.ts`. Rode `npm run typecheck`, `npm run lint`, `npm test` e `npm run build` com as dependências instaladas e o Supabase configurado quando necessário.
