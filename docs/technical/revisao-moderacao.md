# Revisão e moderação

A área **Revisão** é exclusiva de contas autorizadas. Mantém a fila de contribuições e a análise de denúncias em seções separadas, conforme a seção 10 do Figma.

## Preparação do Supabase

Execute `supabase/migrations/202611110007_review_moderation.sql` no SQL Editor **após** a migration 006. Não execute novamente as migrations anteriores em um banco que já as recebeu. A nova migration não cria revisores, não publica materiais e não insere comentários ou denúncias de demonstração.

Com a conta de revisor já criada em **Authentication → Users**, obtenha seu UUID e execute no SQL Editor, substituindo apenas o valor indicado:

```sql
insert into public.reviewer_roles (user_id)
values ('UUID_DA_CONTA_DE_REVISOR')
on conflict (user_id) do nothing;
```

Faça isso somente com uma conta que realmente deve ter acesso editorial. O cadastro comum **não** concede a função de revisor. Depois, entre novamente na aplicação para conferir o item **Revisão** no menu.

## Revisão de materiais

- `/revisao`: fila restrita com contadores de pendentes, em análise e concluídos, filtros e paginação.
- `/revisao/[id]`: dados, classificações, autoria, declaração de direitos, links privados para arquivos e histórico de decisões.
- O revisor inicia a análise, aprova ou recusa. Uma recusa exige justificativa, exibida ao autor em **Meus envios**.
- A aprovação não é publicação. Um segundo comando disponibiliza o recurso na Biblioteca, e o revisor também pode retirá-lo de circulação.
- O backend exige sessão válida e autorização. A função `review_material` repete as verificações no banco, controla as transições e grava `review_events`. Não há chave de serviço exposta no navegador.
- Um arquivo em revisão só pode ser obtido por revisor autorizado. O sistema emite um endereço temporário para um arquivo específico no bucket privado `materials`.

## Moderação de comentários

- `/revisao/denuncias`: lista de denúncias reais, sem dados falsos de demonstração.
- `/revisao/denuncias/[id]`: texto denunciado, motivo, estado, decisão e histórico.
- Denunciar **não** oculta o comentário automaticamente. A decisão é tomada por revisor autorizado, com justificativa.
- Ocultar retira o comentário e suas respostas da consulta pública. Restaurar desfaz a ocultação, quando permitido.
- Excluir definitivamente apaga o conteúdo original e não permite recuperá-lo; um registro sem o texto original continua existindo para rastreabilidade. A confirmação na interface é explícita.
- As tabelas `discussion_comments`, `comment_reports` e `moderation_events`, além de `report_comment` e `moderate_report`, preparam a integração futura com a Comunidade. A migration 008 habilita a interface pública da Comunidade e as funções de criação, edição e exclusão. A fila mostra apenas denúncias reais; confira `comunidade.md`.

Nenhum usuário comum tem permissão para alterar diretamente `review_status`, `is_published`, `visibility` ou `status` de uma denúncia. As consultas de tabelas ficam protegidas por RLS. Logs internos e identificação do denunciante não são públicos.

## Verificação

1. Confirme que uma conta normal não vê **Revisão** nem acessa suas rotas ou endpoints.
2. Envie um material com conta docente e verifique **Pendente** na fila do revisor.
3. Inicie a análise e aprove; o material deve continuar fora da Biblioteca.
4. Publique e confira a Biblioteca com outra conta. Depois despublique e confirme que o material e o download ficam indisponíveis para quem não tem autorização.
5. Em outro material, inicie a análise e recuse com justificativa. Confira o motivo em **Meus envios**.
6. Execute `npm run typecheck`, `npm run lint` e `npm test` em uma instalação com dependências completas.
7. Com a migration 008 aplicada, denuncie um comentário de uma conta diferente, confirme que ele não foi ocultado automaticamente e teste ocultar, restaurar e excluir. Confirme o histórico e a ausência do conteúdo para visitantes.

## Limites atuais

A autorização editorial precisa ser conferida em um Supabase ativo. O fluxo de solicitações de ajustes e reenvio ainda não tem mecanismo próprio; a recusa é final na versão atual. A integração da Comunidade com denúncias foi incluída no código e requer validação com o Supabase ativo. Não marque os testes de integração como concluídos apenas porque os arquivos da interface já foram criados.
