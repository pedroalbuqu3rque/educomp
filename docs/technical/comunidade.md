# Comunidade

A Comunidade fica dentro do detalhe de cada material publicado (`/materiais/[id]#comunidade`), conforme a seção 6 do protótipo no Figma. Não é um fórum separado nem um espaço de postagem sem vínculo com um recurso pedagógico.

## Preparação

Execute **somente** `supabase/migrations/202611110008_community.sql` no SQL Editor de um projeto que já tenha aplicado a migration 007. Não reexecute as migrations anteriores. A 008 acrescenta os campos de relato e três funções seguras de escrita às tabelas existentes; não adiciona exemplos nem concede papel de revisor.

## Comportamentos

- Visitantes podem ler comentários, relatos e respostas **visíveis** em materiais publicados, mas precisam entrar para publicar, responder ou denunciar.
- Cada comentário ou relato tem um autor, data e referência ao material. Os filtros **Todos**, **Relatos de aplicação** e **Discussões** têm URL própria e paginação (10 contribuições principais por página).
- Comentários são texto simples de até 1.000 caracteres. Respostas também são texto simples e só podem ficar **um nível** abaixo de uma publicação principal.
- Relatos pedem **ano escolar da turma**, descrição de como a aplicação funcionou e **adaptações realizadas**, que são opcionais. Descrição e adaptações têm limite de 1.000 caracteres cada.
- Um autor pode editar ou excluir a própria contribuição enquanto estiver visível. Excluir não apaga a linha do banco: remove o texto público e oculta as respostas vinculadas. Comentários ocultados por moderação não podem ser editados pelo autor até serem restaurados.
- A denúncia tem três motivos: exposição de dados pessoais, ofensa/assédio e spam. Cada pessoa pode denunciar o mesmo comentário uma vez, no máximo cinco vezes por hora. Denúncia **não** oculta o conteúdo automaticamente.
- A moderação continua funcionando em `/revisao/denuncias`. Apenas um revisor pode iniciar, ocultar, restaurar, descartar denúncia ou excluir definitivamente; a decisão exige justificativa e gera histórico.
- A aplicação mostra o nome público do perfil, não o e-mail. Não há suporte a imagens, anexos ou formatação HTML nos comentários.

## Permissões

As tabelas mantêm RLS e **não** têm `insert`, `update` ou `delete` concedidos ao cliente. As mutações usam `create_community_comment`, `edit_community_comment`, `delete_community_comment` e a função `report_comment` (migration 007), todas autorizadas pelo Supabase Auth com `auth.uid()` dentro do banco. O material precisa estar aprovado e publicado para receber novas contribuições. O autor só pode alterar os próprios comentários, e há um limite de doze contribuições por hora por conta.

A API `/api/comunidade` valida o formato, a origem, a sessão e o payload; o banco repete as verificações de autorização e transição. Todas as respostas são privadas e usam `Cache-Control: private, no-store`.

## Roteiro de validação real

1. Com um material **aprovado e publicado**, abra seu detalhe como visitante: a leitura funciona; as ações pedem login.
2. Entre com a conta A, escreva um comentário, publique um relato com o ano da turma e faça uma edição. Confira o nome público.
3. Entre com a conta B e responda a uma discussão. Tente responder à própria resposta; o sistema não deve permitir.
4. Tente editar ou excluir a contribuição da conta A usando a conta B; não deve funcionar.
5. Pela conta B, denuncie o comentário da conta A e confirme que ele continua visível.
6. Entre com a conta de revisor, abra **Revisão → Denúncias**, inicie a análise e oculte a contribuição com justificativa. Confira que desapareceu da consulta pública.
7. Restaure e confira o retorno. Depois exclua definitivamente outra contribuição denunciada, confirmando que seu texto original não volta.
8. Despublique o material: a página e os comentários não devem ser acessíveis por visitantes até uma nova publicação.
9. Verifique responsividade, acesso por teclado, mensagens de validação e o estado vazio em cada filtro.
10. Execute `npm run typecheck`, `npm run lint`, `npm test` e `npm run build` com as dependências instaladas.

## Limites conhecidos

A integração com o Supabase em produção ainda precisa ser exercitada com contas reais. A página carrega até 500 respostas dos 10 tópicos exibidos; se esse limite for atingido, mostra um aviso. Fotos nos relatos, notificações e denúncias de materiais são funcionalidades separadas do MVP e não foram implementadas aqui.
