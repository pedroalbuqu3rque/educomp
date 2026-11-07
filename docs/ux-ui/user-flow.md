# EduComp — User flow

**Versão:** 1.0 · **Data:** 07/11/2026 · **Situação:** fluxos definidos no protótipo; implementação não iniciada.

## 1. Objetivo

Este documento descreve os principais percursos de visitantes, professores autenticados e revisores no EduComp. Registra os pontos de entrada, as decisões, os estados alternativos e as condições de conclusão de cada tarefa.

Os fluxos refletem a experiência prevista no protótipo do Figma. As transições funcionais, a persistência e as permissões deverão ser implementadas e verificadas durante o desenvolvimento.

## 2. Organização do protótipo

A página **EduComp · Protótipo** está organizada em dez seções:

| Seção | Conteúdo |
| --- | --- |
| 01 · Início | Apresentação da plataforma e acesso aos principais percursos. |
| 02 · Acesso | Cadastro, login, recuperação e redefinição de senha. |
| 03 · Biblioteca e salvos | Listagem de materiais, pesquisa, favoritos e coleção pessoal. |
| 04 · Filtros | Seleção de tipo, etapa, eixo e abordagem. |
| 05 · Material e autor | Detalhes, arquivos, autoria e perfis públicos. |
| 06 · Comunidade | Discussões, relatos de aplicação, respostas, edição, exclusão e denúncia. |
| 07 · Envio de materiais | Cadastro, validação, confirmação e acompanhamento de materiais. |
| 08 · Perfil e notificações | Dados pessoais, fotografia, segurança e avisos. |
| 09 · Contato e informações | Fale conosco, compartilhamento e páginas institucionais. |
| 10 · Revisão e moderação | Avaliação editorial de materiais e tratamento de denúncias. |

As telas representam etapas, estados e alternativas de interação. Nem toda tela corresponde a uma rota independente da aplicação.

## 3. Fluxo 01 — Conhecer a plataforma

**Ator:** visitante ou professor autenticado.

**Objetivo:** compreender a proposta do EduComp e encontrar o caminho para a Biblioteca.

**Percurso principal:**

1. O usuário acessa a página inicial.
2. Visualiza a apresentação da plataforma e seus principais recursos.
3. Seleciona a ação de explorar a Biblioteca.
4. É direcionado à listagem pública de materiais.

**Alternativas:**

- Selecionar Entrar ou Criar conta para acessar recursos pessoais.
- Utilizar a navegação para consultar outras áreas públicas.
- Selecionar a logo do EduComp, em outra página, para retornar ao Início.

**Resultado esperado:** o visitante consegue conhecer a plataforma e iniciar a exploração sem precisar criar uma conta.

## 4. Fluxo 02 — Pesquisar e filtrar materiais

**Ator:** visitante ou professor autenticado.

**Objetivo:** localizar materiais adequados a uma necessidade pedagógica.

**Percurso principal:**

1. O usuário acessa a Biblioteca.
2. O sistema apresenta os materiais aprovados e publicados.
3. O usuário digita um título ou tema no campo de pesquisa.
4. Executa a consulta por **Buscar** ou Enter.
5. O sistema apresenta os materiais correspondentes.
6. O usuário pode abrir um cartão ou navegar para outra página de resultados.

**Aplicação de filtros:**

1. O usuário abre um dos quatro botões independentes: **Tipo**, **Etapa**, **Eixo** ou **Abordagem**.
2. Seleciona uma ou mais opções da categoria.
3. Seleciona **Aplicar**.
4. O filtro é incorporado à consulta e os resultados são atualizados.
5. O usuário pode repetir o processo com outras categorias.

As opções de uma mesma categoria são combinadas por **OU**. Categorias diferentes e o texto da pesquisa são combinados por **E**.

O filtro Tipo inclui seis opções, entre elas **Jogo**. O filtro Abordagem oferece **Plugada** e **Desplugada**, aceitando materiais classificados com ambas.

**Alternativas e exceções:**

- **Limpar:** remove as seleções temporárias da categoria aberta; Aplicar confirma a alteração.
- **Fechar sem aplicar:** descarta alterações ainda não confirmadas.
- **Nenhum resultado:** mantém os critérios e oferece caminhos para revisar a consulta.
- **Acervo vazio:** informa que ainda não existem materiais publicados.
- **Falha de carregamento:** apresenta feedback e permite uma nova tentativa.
- **Mudança de critérios:** reinicia a paginação.

**Resultado esperado:** a Biblioteca apresenta resultados coerentes com a pesquisa e os filtros, com até 12 materiais por página.

O retorno de um detalhe à Biblioteca deve preservar, quando possível, a consulta, a página e a posição anterior.

## 5. Fluxo 03 — Consultar um material

**Ator:** visitante ou professor autenticado.

**Objetivo:** avaliar a adequação de um recurso e acessar seus arquivos.

**Percurso principal:**

1. O usuário seleciona um cartão da Biblioteca.
2. A página de detalhes apresenta título, descrição, classificações, abordagem, objetivos disponíveis e autoria.
3. O usuário consulta as informações pedagógicas.
4. Se houver arquivos, identifica os recursos disponíveis.
5. Seleciona a ação de acesso ao arquivo.

**Decisão: usuário autenticado?**

- **Sim:** o sistema verifica a permissão e disponibiliza o arquivo.
- **Não:** o usuário é encaminhado ao login, com possibilidade de retomar a ação após autenticação.

**Alternativas:**

- Abrir o perfil público do autor para conhecer seus materiais publicados.
- Consultar as discussões associadas ao material.
- Salvar o material na coleção pessoal, mediante autenticação.
- Retornar à Biblioteca ou a Salvos, preservando o contexto quando possível.

**Exceções:**

- Arquivo indisponível.
- Falha na transferência.
- Acesso não autorizado.
- Material retirado da circulação.

**Resultado esperado:** o professor compreende o recurso e recebe uma resposta clara sobre a disponibilidade de seus arquivos.

## 6. Fluxo 04 — Cadastro, login e recuperação de senha

**Ator:** visitante ou professor cadastrado.

### 6.1. Cadastro

1. O visitante seleciona **Criar conta**.
2. Preenche nome, e-mail e senha.
3. O sistema valida os campos.
4. Se os dados forem válidos, registra a conta conforme as regras de autenticação.
5. Apresenta a confirmação e orienta a continuidade do acesso.

**Exceções:** dados incompletos, e-mail inválido, conta existente ou falha no cadastro.

### 6.2. Login

1. O professor seleciona **Entrar**.
2. Informa e-mail e senha.
3. O sistema valida as credenciais.
4. Se forem corretas, inicia a sessão e libera os recursos da conta.

**Exceções:** credenciais inválidas, sessão não autorizada ou falha de serviço.

Se o login foi solicitado durante uma ação protegida, o sistema deve recuperar a intenção original quando viável.

### 6.3. Recuperação de senha

1. O usuário seleciona **Esqueci minha senha**.
2. Informa seu e-mail.
3. O sistema apresenta o resultado da solicitação sem expor indevidamente a existência de uma conta.
4. O usuário acessa o link recebido.
5. Informa a nova senha.
6. Após validação, conclui a redefinição e retorna ao login.

**Exceções:** link inválido, expirado, já utilizado ou senha fora dos critérios.

**Resultado esperado:** os processos de acesso são compreensíveis, seguros e oferecem continuidade em situações de erro.

## 7. Fluxo 05 — Salvar e recuperar materiais

**Ator:** professor autenticado.

**Objetivo:** manter uma coleção pessoal de recursos para consulta posterior.

**Percurso principal:**

1. O professor encontra um material na Biblioteca ou nos detalhes.
2. Seleciona o controle de favorito.
3. O sistema vincula o material à sua conta.
4. O controle passa a indicar o estado salvo.
5. O professor acessa **Salvos** pelo cabeçalho.
6. Visualiza sua coleção e pode pesquisar por título ou tema.
7. Seleciona um material para consultar seus detalhes.

**Alternativas:**

- Selecionar novamente o favorito para remover o material.
- Encontrar uma coleção vazia e utilizar **Explorar biblioteca**.
- Pesquisar por um termo sem correspondências na coleção.

A busca de Salvos atua somente sobre a coleção pessoal. Não deve ser confundida com a pesquisa global da Biblioteca.

As variações de filtros de Salvos existentes no arquivo de design não estão conectadas ao fluxo principal da página e não representam controles ativos nesta versão.

**Resultado esperado:** os favoritos permanecem associados à conta, sem duplicação e com estados sincronizados.

## 8. Fluxo 06 — Participar da comunidade

**Ator:** visitante ou professor autenticado.

**Objetivo:** consultar e compartilhar experiências sobre materiais.

### 8.1. Consultar discussões

1. O usuário abre os detalhes de um material.
2. Acessa a área de Discussões.
3. Visualiza as contribuições publicadas.
4. Alterna entre **Todos**, **Relatos de aplicação** e **Discussões**.

A filtragem acontece diretamente na página, sem abrir um modal.

### 8.2. Publicar comentário ou resposta

1. O professor autenticado seleciona a ação de comentar ou responder.
2. Escreve uma contribuição de até **1.000 caracteres**.
3. Confirma a publicação.
4. O sistema valida e registra o conteúdo.
5. A contribuição aparece no contexto do material.

As respostas possuem apenas um nível de encadeamento. Não há anexos, curtidas ou mensagens privadas no MVP.

**Exceções:** usuário não autenticado, texto vazio, limite excedido, conteúdo inválido ou falha na publicação.

### 8.3. Publicar relato de aplicação

1. O professor seleciona a opção de compartilhar uma experiência.
2. Informa o ano/série da turma.
3. Descreve como utilizou o material.
4. Pode registrar adaptações realizadas.
5. Confirma o envio.
6. O relato aparece na categoria correspondente.

O formulário deve orientar o professor a não divulgar informações pessoais de estudantes.

### 8.4. Editar ou excluir uma contribuição

1. O autor identifica uma contribuição própria.
2. Seleciona **Editar** ou **Excluir**.
3. Na edição, altera o texto e confirma.
4. Na exclusão, visualiza uma confirmação antes da operação.
5. O sistema atualiza ou remove a contribuição conforme a ação autorizada.

Uma contribuição de outra pessoa não apresenta as ações comuns de edição e exclusão para o usuário.

### 8.5. Denunciar uma contribuição

1. O professor autenticado seleciona a opção de denúncia.
2. Escolhe o motivo.
3. Confirma o envio.
4. O sistema registra a denúncia e apresenta confirmação.

**Importante:** a denúncia não oculta o comentário automaticamente. A decisão cabe à moderação.

**Resultado esperado:** professores conseguem participar das discussões com ações claras e regras de convivência aplicáveis.

## 9. Fluxo 07 — Enviar um material

**Ator:** professor autenticado.

**Objetivo:** contribuir com um recurso para a Biblioteca.

**Percurso principal:**

1. O professor seleciona **Enviar material**.
2. Preenche título e descrição.
3. Informa tema ou palavras-chave.
4. Seleciona um ou mais tipos, etapas, anos/séries compatíveis e eixos da Computação.
5. Informa se o recurso é plugado, desplugado ou contempla ambas as abordagens.
6. Preenche autoria ou fonte e objetivos de aprendizagem, quando houver.
7. Adiciona um ou mais arquivos.
8. Confirma a declaração de direitos de compartilhamento.
9. Seleciona a ação de enviar.
10. O sistema valida os dados e os arquivos.
11. A submissão válida é registrada com situação **Pendente**.
12. O sistema apresenta a confirmação e oferece acesso a **Meus envios**.

**Regras dos arquivos:**

- Formatos: PDF, DOCX, PPTX, PNG e JPG.
- Limite: 20 MB por arquivo.
- É possível selecionar e remover arquivos antes da confirmação.
- Tipo, tamanho e permissões devem ser verificados no servidor.

**Exceções:**

- Campos obrigatórios ausentes.
- Ano/série incompatível com a etapa.
- Arquivo com formato não permitido.
- Arquivo acima do limite.
- Falha de transferência.
- Ausência da declaração de direitos.

O usuário deve receber mensagens específicas e conseguir corrigir erros sem perder desnecessariamente os dados válidos.

**Resultado esperado:** o envio é registrado para revisão, sem publicação automática.

## 10. Fluxo 08 — Acompanhar materiais enviados

**Ator:** professor autenticado.

**Objetivo:** conhecer o andamento das próprias contribuições.

**Percurso principal:**

1. O professor acessa **Meus envios**.
2. Visualiza os materiais associados à sua conta.
3. Seleciona uma submissão.
4. Consulta informações e situação editorial.
5. Acompanha atualizações de avaliação e disponibilidade.

**Situações previstas:**

| Situação | Significado |
| --- | --- |
| Pendente | Material recebido e aguardando análise. |
| Em análise | Um revisor iniciou a avaliação. |
| Aprovado | Material aceito editorialmente. |
| Recusado | Material não aceito, com justificativa. |
| Publicado | Material aprovado e disponível na Biblioteca. |

A condição **Publicado** representa disponibilidade pública, não uma substituição obrigatória da situação editorial. Um material pode estar aprovado e ainda não estar disponível na Biblioteca.

Quando houver orientação de ajustes ou reenvio, ela deve ser apresentada ao professor com clareza, conforme o fluxo implementado.

**Resultado esperado:** o responsável conhece o andamento e o resultado de cada submissão sem precisar entrar na área de revisão.

## 11. Fluxo 09 — Revisar materiais

**Ator:** revisor autorizado.

**Objetivo:** avaliar contribuições antes de disponibilizá-las publicamente.

**Percurso principal:**

1. O revisor autenticado acessa **Revisão**.
2. Seleciona a área **Envios**.
3. Visualiza a fila de submissões.
4. Abre um material pendente.
5. Consulta seus metadados, arquivos, autoria e declaração de direitos.
6. Seleciona **Iniciar análise**.
7. O sistema registra a situação **Em análise**.
8. O revisor avalia o material.
9. Seleciona **Aprovar** ou **Recusar**.
10. O sistema confirma e registra a decisão, vinculando data e responsável.

**Aprovação:**

- Registra a aceitação editorial.
- Não deve ser confundida com publicação automática.
- A visibilidade pública depende da condição de publicação.

**Recusa:**

- Exige justificativa antes da conclusão.
- Registra a decisão e seu responsável.
- Disponibiliza o motivo ao professor em Meus envios.

**Alternativas e exceções:**

- Material indisponível ou arquivo inválido.
- Falha ao registrar a decisão.
- Mudança de situação por outro revisor.
- Conta sem autorização.

O sistema não deve apresentar sucesso antes de confirmar a persistência da decisão.

**Resultado esperado:** somente materiais aprovados e publicados entram no acervo público, com decisões editoriais rastreáveis.

## 12. Fluxo 10 — Moderar denúncias

**Ator:** revisor autorizado.

**Objetivo:** avaliar conteúdos denunciados e aplicar medidas de moderação.

**Percurso principal:**

1. O revisor acessa **Revisão**.
2. Abre a área **Denúncias**.
3. Visualiza os registros recebidos.
4. Seleciona uma denúncia.
5. Consulta o motivo, o comentário denunciado e o contexto do material.
6. Decide a medida adequada.
7. Confirma a decisão quando necessário.
8. O sistema registra responsável, data, motivo e resultado.

**Ações previstas:**

| Ação | Resultado |
| --- | --- |
| Ocultar | Retira o comentário da visualização pública sem excluí-lo definitivamente. |
| Restaurar | Torna novamente visível um comentário ocultado. |
| Excluir definitivamente | Remove o conteúdo conforme a política de retenção e exige confirmação. |

**Exceções:**

- Comentário já removido ou indisponível.
- Denúncia já tratada.
- Falha ao executar a medida.
- Usuário sem permissão de moderação.

**Resultado esperado:** denúncias recebem tratamento controlado, sem remoção automática e com rastreabilidade das decisões.

## 13. Fluxo 11 — Gerenciar perfil e notificações

**Ator:** professor autenticado.

### 13.1. Perfil

1. O professor abre o menu da conta.
2. Acessa **Meu perfil**.
3. Consulta seus dados pessoais.
4. Altera nome, foto, cargo/função ou apresentação, quando desejar.
5. Visualiza a prévia da fotografia selecionada.
6. Confirma a atualização.
7. O sistema valida e salva os dados.

A alteração de senha segue um percurso protegido, com validação e confirmação. O perfil público utiliza apenas as informações autorizadas para divulgação.

### 13.2. Notificações

1. O professor identifica o indicador de notificações no cabeçalho.
2. Abre a central.
3. Consulta avisos sobre envios, novos materiais ou novidades da plataforma.
4. Seleciona uma notificação para abrir seu contexto, quando houver.
5. Pode acessar a lista completa ou marcar todas como lidas.

**Alternativas:**

- Nenhuma notificação disponível.
- Todas as notificações já lidas.
- Falha de carregamento.
- Conteúdo associado à notificação não mais disponível.

**Resultado esperado:** o professor consegue manter o perfil atualizado e acompanhar acontecimentos relevantes da plataforma.

## 14. Fluxo 12 — Contato, informações e compartilhamento

**Ator:** visitante ou professor autenticado.

### 14.1. Fale conosco

1. O usuário acessa a página de contato.
2. Informa nome, e-mail, assunto e mensagem.
3. Seleciona a ação de envio.
4. O sistema valida os dados.
5. Após registrar a mensagem, apresenta confirmação.

**Exceções:** dados inválidos, campos incompletos ou falha no envio.

### 14.2. Informações institucionais

Termos de uso e Política de privacidade ficam disponíveis sem autenticação. Seus textos deverão corresponder às práticas efetivas da plataforma antes da publicação.

### 14.3. Compartilhar o EduComp

1. O usuário acessa a opção de compartilhamento.
2. Seleciona uma alternativa social ou **Copiar link**.
3. O sistema executa a ação compatível.
4. A cópia do endereço é confirmada quando concluída.

O endereço utilizado deve ser o domínio real do EduComp, não um endereço ilustrativo do protótipo.

## 15. Regras transversais

### Autenticação e permissões

- Consultar Biblioteca, detalhes públicos, discussões e perfis públicos não exige conta.
- Salvar materiais, acessar arquivos, comentar, denunciar e enviar recursos exige autenticação.
- Ações pessoais só podem operar sobre dados autorizados da própria conta.
- Revisão editorial e moderação exigem papel específico.
- Todas as permissões devem ser verificadas no servidor, não apenas pela visibilidade dos controles.

### Diálogos e confirmações

Ações destrutivas devem informar claramente suas consequências antes da confirmação. Janelas de filtros e diálogos precisam ter foco adequado, fechamento previsível e retorno ao contexto de origem.

O estilo visual de sobreposições, fundo escurecido e desfoque segue o Design System e o protótipo. Esses efeitos não substituem tratamento de foco e acessibilidade.

### Estados de retorno

Os fluxos devem considerar:

- Carregamento e processamento.
- Confirmação de sucesso somente após operação concluída.
- Erros de validação próximos aos campos correspondentes.
- Falhas técnicas com orientação de continuidade.
- Estados vazios específicos de cada contexto.
- Recuperação da navegação após login ou retorno de detalhes, quando possível.

## 16. Critérios para validação

Os fluxos deverão ser verificados na aplicação funcional, contemplando:

- Conclusão das tarefas principais sem caminhos bloqueados.
- Coerência entre informações do material, filtros e cartões.
- Persistência de dados e atualização dos estados visuais.
- Proteção de ações por autenticação e permissão.
- Tratamento de falhas, confirmações e estados vazios.
- Navegação por teclado, foco, semântica e feedback acessível.
- Adaptação dos percursos para desktop, tablet e celular.

A referência de acessibilidade será a **WCAG 2.2 AA**. A documentação dos resultados dependerá da realização efetiva dos testes.

## 17. Referências

- [Protótipo do EduComp no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [Design System](design-system.md)
- [Handoff de UI/UX](handoff.md)
- [Requisitos](../product/requisitos.md)
- [Histórias de usuário](../product/historias-de-usuario.md)
