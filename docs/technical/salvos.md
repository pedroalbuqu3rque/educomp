# Materiais salvos

A tabela saved_materials e suas políticas já existem desde a migration 001. A migration 005 acrescenta somente a consulta search_saved_library, SECURITY INVOKER, executável por authenticated. A seleção exige user_id=auth.uid(), material aprovado e publicado, além das políticas RLS. Não aceita um identificador de usuário do cliente. Os filtros, contagem e paginação de 12 itens são aplicados no banco; a ordem segue a publicação (created_at e id decrescentes), como na Biblioteca.

A página /salvos verifica getUser no servidor e redireciona visitantes a /entrar?next=/salvos. Reutiliza os cartões, filtros, prévias e downloads da biblioteca. O cabeçalho indica a seção ativa. O layout do grupo de autenticação reconhece essa rota e não a envolve no cartão de login, mantendo o caminho do arquivo antigo para que uma atualização por cópia de ZIP não crie duas rotas /salvos.

A Server Action setMaterialSaved recebe apenas o ID do material e o estado desejado. O usuário vem de getUser. Para salvar, verifica a publicação e insere a associação; o índice único impede duplicação e um conflito 23505 significa que o estado solicitado já existe. Para remover, restringe a exclusão por user_id e material_id. Revalida Biblioteca e Salvos após sucesso. Não modifica materiais, arquivos ou permissões de revisão.

A interface bloqueia novos cliques enquanto aguarda a operação e só confirma o estado após sucesso no servidor. Erros são exibidos, sem marcar um item como salvo. Uma falha na leitura dos favoritos desabilita temporariamente os botões e solicita atualização. Visitantes recebem um diálogo de acesso. A página privada mostra um estado vazio e acesso à Biblioteca quando não há resultados.

Materiais despublicados não aparecem na coleção, mas a associação é mantida; uma republicação volta a torná-los visíveis. As regras de download continuam verificando publicação, usuário e arquivo, com URL assinada de 60 segundos.

Não há atualização em tempo real entre abas. Recarregar a página consulta o estado persistido no banco.
