# Comunidade dos materiais do acervo

As páginas de detalhes dos materiais do acervo inicial exibem a mesma área de Comunidade dos materiais enviados pelos professores: discussões, respostas, relatos de aplicação e denúncias.

A identificação **Enviado por Pedro Albuquerque** é editorial e vale apenas para as 24 fichas do acervo inicial. Ela não representa uma conta do Supabase nem concede privilégios. Nos materiais enviados pela plataforma, o nome continua vindo do perfil público do usuário responsável pelo envio.

## Banco de dados

A migration `202611130014_catalog_community.sql` deve ser aplicada após `202611130013_catalog_editorial.sql`. Ela:

- Associa comentários a exatamente um tipo de recurso: material publicado ou ficha ativa do acervo.
- Mantém comentários e histórico anteriores sem alteração de autoria ou vínculo.
- Usa as mesmas regras de autenticação, limites de postagem, edição, denúncia e moderação.
- Notifica o autor de uma discussão quando alguém responde. Como as fichas editoriais não possuem `user_id`, não há notificação automática ao responsável pelo acervo para novos comentários-raiz.

As fichas continuam sem acesso direto de usuários às tabelas de escrita: comentários e denúncias são registrados por funções que verificam a autenticação e o estado de publicação. A moderação continua concentrada no painel de revisão.

## Implantação

1. Faça um backup e confirme se a migration `013` já foi executada; não a repita se estiver aplicada.
2. Execute a migration `014` **uma única vez** no SQL Editor, após `013`.
3. Teste com duas contas distintas: publicar comentário, responder, editar o próprio, denunciar o de outra pessoa e moderar o relato como revisor.
4. Confira que a conversa de uma ficha não aparece em outra e que os materiais enviados pelos professores continuam operando normalmente.

A migration `014` não cria revisores. Uma conta autorizada em `reviewer_roles` será necessária para validar a moderação na etapa de QA.
