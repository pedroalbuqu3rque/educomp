# EduComp — Requisitos do Produto

**Versão:** 0.5  
**Data:** 04/11/2026  
**Status:** Requisitos da primeira versão funcional em consolidação; desenvolvimento não iniciado.

## 1. Objetivo

Este documento define os requisitos funcionais, as regras de negócio e os requisitos não funcionais do EduComp, plataforma voltada à descoberta, consulta, organização e contribuição de materiais pedagógicos de Computação para a Educação Básica.

Os requisitos descrevem o comportamento esperado da aplicação. Não representam funcionalidades já implementadas ou validadas com professores reais. O recorte da primeira entrega está definido em [`escopo-mvp.md`](escopo-mvp.md).

## 2. Convenções

- **RF:** requisito funcional — comportamento que o sistema deve oferecer.
- **RN:** regra de negócio — condição que deve ser respeitada em um ou mais fluxos.
- **RNF:** requisito não funcional — qualidade ou restrição aplicável à solução.
- **Pendente:** definição necessária antes de concluir a especificação ou implementar o comportamento correspondente.

Os identificadores já utilizados em documentos anteriores foram preservados para facilitar a rastreabilidade. Por isso, os requisitos são apresentados por área funcional, e não em ordem numérica.

## 3. Requisitos funcionais

### 3.1. Início, cadastro e autenticação

#### RF-020 — Apresentar a plataforma e a navegação inicial

O sistema deve oferecer uma página inicial com apresentação do EduComp e caminhos identificáveis para a Biblioteca, a criação de conta e a entrada na plataforma.

**Critérios de verificação:**
- O usuário identifica a finalidade da plataforma e as principais ações disponíveis.
- Os controles de navegação direcionam para as áreas correspondentes.
- A interface diferencia, quando aplicável, ações disponíveis a visitantes e a usuários autenticados.

**Pendente:** definir o que pode ser consultado sem autenticação.

#### RF-015 — Permitir criação de conta

O sistema deve permitir o cadastro de um professor mediante nome completo, e-mail e senha.

**Critérios de verificação:**
- Campos obrigatórios e formato de e-mail são validados.
- O sistema impede a criação de contas duplicadas para o mesmo e-mail.
- A conclusão do cadastro apresenta confirmação; falhas apresentam mensagem compreensível.
- A senha não é armazenada em texto simples.

**Pendente:** política de senha e exigência, ou não, de e-mail institucional.

#### RF-016 — Autenticar usuários e gerenciar sessões

O sistema deve permitir entrada com e-mail e senha, manter uma sessão autenticada e oferecer saída segura.

**Critérios de verificação:**
- Credenciais válidas permitem acesso às funcionalidades autorizadas.
- Credenciais inválidas não iniciam sessão e produzem feedback adequado.
- O encerramento da sessão impede o uso posterior de ações protegidas por aquela sessão.
- São apresentados estados de carregamento e erro nas operações de autenticação.

A integração de login com Google não integra a primeira versão funcional.

#### RF-017 — Permitir recuperação de senha

O sistema deve permitir solicitar a redefinição de senha por e-mail e concluir a alteração por meio de um link seguro.

**Critérios de verificação:**
- O endereço informado é validado.
- O usuário recebe feedback sobre a solicitação.
- O link de redefinição deve ter controles de segurança apropriados, definidos na implementação.
- Solicitações inválidas ou expiradas são tratadas com mensagem compreensível.

**Pendente:** política de validade do link e comportamento específico para e-mails não cadastrados.

#### RF-018 — Permitir consulta e atualização do perfil

O sistema deve permitir que o professor autenticado consulte seus dados, altere informações pessoais, atualize a foto de perfil e modifique sua senha.

**Critérios de verificação:**
- As alterações são validadas antes de serem salvas.
- O sistema confirma sucesso ou informa falha.
- Alterações concluídas permanecem disponíveis em sessões posteriores.
- Um usuário não pode editar dados de outra conta sem autorização.

### 3.2. Biblioteca, pesquisa e filtros

#### RF-001 — Exibir a Biblioteca de materiais

O sistema deve apresentar materiais disponíveis para consulta, permitindo acessar os detalhes de cada recurso.

**Critérios de verificação:**
- Os materiais apresentados na Biblioteca pública possuem situação de publicação autorizada.
- Os itens exibem informações suficientes para identificação, como título e classificações disponíveis.
- O usuário pode abrir os detalhes de um material.
- O sistema oferece carregamento progressivo ou paginação, com feedback durante a consulta.

**Pendente:** escolher o mecanismo de navegação entre resultados e a quantidade de itens por carregamento.

#### RF-002 — Pesquisar materiais

O sistema deve permitir pesquisa textual por **título e tema** dos materiais cadastrados e disponibilizados na Biblioteca.

**Critérios de verificação:**
- A consulta retorna materiais correspondentes aos critérios de busca definidos.
- A pesquisa pode ser utilizada em conjunto com os filtros ativos.
- Ao alterar ou limpar o texto, a listagem é atualizada sem remover indevidamente as seleções aplicadas nos filtros.
- Consultas sem correspondência apresentam o estado previsto no RF-005.

**Pendente:** definir a representação do campo *tema* nos dados, o tratamento de acentos e maiúsculas/minúsculas, correspondências parciais e consultas com várias palavras.

#### RF-003 — Ordenar os resultados da Biblioteca

O sistema deve apresentar os resultados em uma ordem consistente e previsível, inclusive quando houver materiais com características semelhantes.

**Critérios de verificação:**
- Consultas equivalentes, com os mesmos dados e critérios, preservam a mesma ordenação.
- A ordem escolhida é aplicada de forma consistente à pesquisa e à navegação por resultados.

**Pendente:** confirmar se haverá ordenação por relevância e quais campos, critérios e desempates serão utilizados.

#### RF-004 — Filtrar materiais por classificações

O sistema deve permitir combinar filtros por **tipo de material**, **etapa de ensino** e **eixo da Computação**.

| Filtro | Opções previstas |
|---|---|
| Tipo de material | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| Etapa de ensino | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| Eixo da Computação | Pensamento Computacional; Mundo Digital; Cultura Digital |

**Critérios de verificação:**
- Cada categoria aceita seleção de múltiplas opções.
- Opções selecionadas na mesma categoria ampliam os resultados elegíveis (**OU**); categorias diferentes e a pesquisa textual restringem conjuntamente os resultados (**E**).
- As seleções podem ser alteradas temporariamente antes de acionar **Aplicar**.
- **Aplicar** atualiza a Biblioteca com os filtros selecionados.
- **Limpar** permite remover as seleções do filtro, com comportamento consistente com a confirmação da alteração.
- Ao reabrir um filtro, o usuário visualiza as seleções efetivamente aplicadas.

**Pendente:** confirmar o comportamento de fechamento sem aplicar, o alcance de **Limpar** (categoria ou todos os filtros) e se opções sem resultados permanecem visíveis.

#### RF-005 — Informar estados da Biblioteca e da busca

O sistema deve diferenciar as situações de acervo vazio, ausência de correspondência para uma consulta, carregamento e falha na obtenção de resultados.

**Critérios de verificação:**
- A ausência de materiais cadastrados ou publicados não é confundida com uma pesquisa sem correspondências.
- O usuário consegue rever a pesquisa ou os filtros após um resultado vazio.
- Falhas de carregamento são informadas e possuem possibilidade de nova tentativa quando aplicável.

### 3.3. Detalhes e acesso aos materiais

#### RF-006 — Exibir detalhes do material

O sistema deve apresentar uma página com título, descrição, classificações e informações de acesso de cada material disponível.

**Critérios de verificação:**
- São identificados o tipo de material, a etapa de ensino e o eixo da Computação, conforme os dados associados.
- Autoria e demais metadados cadastrados são apresentados quando disponíveis.
- As ações de acesso e de favoritar respeitam a disponibilidade do recurso e as permissões do usuário.
- Campos opcionais ausentes não aparecem como informações inventadas ou erros de cadastro.

**Pendente:** finalizar os campos obrigatórios e opcionais, a multiplicidade das classificações e a representação dos temas.

#### RF-007 — Disponibilizar acesso por link externo

Quando o modelo de disponibilização do material incluir links externos, o sistema deve oferecer acesso identificável a cada endereço cadastrado.

**Critérios de verificação:**
- O usuário distingue o acesso à página de detalhes do acesso a uma fonte externa.
- Não é apresentado controle de acesso para um link inexistente.
- O destino associado ao controle corresponde ao recurso cadastrado.

**Pendente:** confirmar se links externos serão aceitos como forma de acesso na primeira versão e se haverá múltiplos links por material.

#### RF-008 — Disponibilizar acesso a arquivos hospedados

Quando um material possuir arquivo armazenado na plataforma, o sistema deve disponibilizar uma ação para acessá-lo, conforme as permissões aplicáveis.

**Critérios de verificação:**
- O controle de acesso corresponde a um arquivo existente e permitido.
- Arquivos indisponíveis ou sem autorização não são apresentados como acessíveis.
- Os erros identificáveis de acesso são tratados conforme o RF-010.

**Pendente:** definir formatos, tamanhos, quantidade de arquivos por material e regras de disponibilização.

#### RF-009 — Representar as formas de acesso disponíveis

O sistema deve apresentar somente as opções de acesso efetivamente associadas ao material.

**Critérios de verificação:**
- Com arquivo disponível, exibe a respectiva ação.
- Com link externo aceito e disponível, exibe a respectiva ação.
- Se ambas as formas forem admitidas e estiverem disponíveis, não oculta uma delas.
- Quando não houver forma de acesso permitida, apresenta uma indicação clara da indisponibilidade, sem sugerir que o material foi excluído do catálogo.

#### RF-010 — Tratar falhas de acesso aos recursos

O sistema deve informar falhas de acesso a materiais quando a indisponibilidade ou a falta de permissão puder ser identificada.

**Critérios de verificação:**
- A mensagem diferencia, quando possível, recurso inexistente, indisponível e acesso não autorizado.
- O sistema não declara indisponibilidade de um endereço externo sem conseguir constatar a falha.
- A interface oferece orientação ou nova tentativa quando isso for tecnicamente possível.

### 3.4. Materiais salvos

#### RF-012 — Permitir favoritar e consultar materiais salvos

O sistema deve permitir que o professor autenticado favorite e desfavorite materiais, consulte sua lista pessoal e abra os detalhes dos itens salvos.

**Critérios de verificação:**
- Cada material pode constar somente uma vez na lista de favoritos de um mesmo usuário.
- A lista é atualizada após favoritar ou desfavoritar.
- As escolhas permanecem registradas entre sessões.
- Uma lista sem favoritos apresenta estado vazio informativo.
- Os favoritos de um usuário não são alterados por outro usuário sem autorização.

### 3.5. Contribuição e revisão de materiais

#### RF-011 — Permitir envio de material para revisão

O sistema deve permitir que um professor autorizado preencha um formulário de submissão, associe um arquivo ao material e envie a contribuição para avaliação.

**Critérios de verificação:**
- Os campos obrigatórios e os arquivos são validados antes da submissão.
- O usuário recebe feedback sobre progresso, sucesso ou falha do envio.
- Um envio concluído gera registro identificável para acompanhamento.
- O envio não publica o material automaticamente na Biblioteca.

**Pendente:** definir campos obrigatórios, formatos e limites de upload e tratamento de direitos de uso.

#### RF-019 — Permitir acompanhar a situação de um envio

O sistema deve permitir que o autor autenticado consulte a situação dos materiais que submeteu.

**Critérios de verificação:**
- O professor consegue identificar seus envios e a situação atual de cada um.
- Alterações de situação realizadas por responsável autorizado são refletidas na consulta do autor.
- Um usuário não consulta submissões privadas de outras pessoas sem autorização.

Os estados propostos são **Pendente**, **Em análise**, **Aprovado** e **Recusado**; a máquina de estados e as mensagens associadas ainda precisam de definição.

#### RF-014 — Permitir revisão e publicação por responsável autorizado

O sistema deve oferecer um fluxo mínimo para que um responsável com permissão adequada analise uma submissão e registre sua aprovação ou recusa.

**Critérios de verificação:**
- Usuários sem permissão não executam decisões de moderação.
- Um material somente passa a integrar a Biblioteca publicada após aprovação.
- Materiais recusados ou ainda em análise não são publicados como aprovados.
- A decisão registrada fica associada ao material e pode ser consultada conforme as permissões aplicáveis.

**Pendente:** definir papéis administrativos, critérios de análise, possibilidade de reenvio e interface de moderação.

### 3.6. Compartilhamento básico

#### RF-013 — Permitir cópia de link compartilhável

O sistema deve disponibilizar uma ação para copiar um link compartilhável, acompanhada de confirmação ou mensagem de falha.

**Critérios de verificação:**
- A ação copia um endereço válido para o destino definido.
- O usuário recebe feedback ao copiar ou quando a ação falhar.
- A abertura do endereço respeita as regras de acesso à plataforma.

**Pendente:** definir se o link terá como destino a plataforma, um material específico ou ambos.

## 4. Regras de negócio

### RN-001 — Publicação condicionada à aprovação

Materiais enviados por professores não devem ser publicados automaticamente. A disponibilização no acervo depende de uma decisão autorizada de aprovação.

### RN-002 — Permissões por ação

As permissões para consultar conteúdos, favoritar, enviar, revisar, publicar, editar e remover materiais devem respeitar o papel e a identidade do usuário. O detalhamento dos papéis está pendente.

### RN-003 — Favoritos exclusivos por conta

A associação entre usuário e material deve ser única. Alterações na lista de favoritos devem ser persistentes e restritas ao usuário correspondente.

### RN-004 — Integridade das submissões

Cada submissão deve manter a identificação do autor, os dados do material, o momento do envio e sua situação de revisão. A publicação não pode ser inferida apenas da existência de um registro de envio.

### RN-005 — Coerência entre classificação e consulta

As classificações usadas na Biblioteca devem corresponder aos metadados associados aos materiais. A taxonomia definitiva de cadastro precisa ser concluída antes da implementação dos filtros.

### RN-006 — Disponibilidade e permissões dos arquivos

A interface não deve oferecer ações para recursos inexistentes ou sem permissão de acesso. As restrições devem ser aplicadas também no serviço responsável pela entrega dos arquivos, e não apenas na interface.

## 5. Requisitos não funcionais

### RNF-001 — Usabilidade

As tarefas principais devem possuir rótulos, ações e mensagens compreensíveis, com linguagem consistente para professores da Educação Básica.

### RNF-002 — Responsividade

As interfaces devem se adaptar a computadores, tablets e celulares, preservando a possibilidade de realizar as tarefas principais. Os comportamentos por largura de tela ainda precisam ser especificados.

### RNF-003 — Consistência visual e de interação

Cores, tipografia, espaçamentos, componentes e estados devem seguir o design system do produto. Controles equivalentes devem apresentar comportamentos equivalentes.

### RNF-004 — Clareza do acesso ao conteúdo

A interface deve distinguir consulta aos detalhes, acesso a arquivo, acesso a link externo e recurso indisponível ou sem permissão.

### RNF-005 — Transparência dos dados apresentados

Autoria, fonte, classificação e condições de uso devem refletir as informações efetivamente cadastradas, sem simular dados ausentes.

### RNF-006 — Acessibilidade

A interface deve permitir navegação por teclado, foco perceptível, identificação de controles, legibilidade e contraste adequados, com mensagens de erro e sucesso acessíveis. Os critérios técnicos mensuráveis serão definidos para os testes.

### RNF-007 — Segurança da autenticação

Credenciais devem ser protegidas; senhas devem ser armazenadas com hash seguro; sessões e fluxos de recuperação de senha devem adotar mecanismos apropriados de segurança.

### RNF-008 — Proteção de dados e autorização

Dados pessoais, favoritos e submissões privadas devem ser acessíveis somente conforme as permissões aplicáveis. As regras de retenção e tratamento de dados pessoais precisam ser definidas.

### RNF-009 — Integridade e persistência

Operações concluídas de cadastro, perfil, favoritos, submissão e moderação devem persistir de forma consistente, evitando duplicações e estados contraditórios.

### RNF-010 — Feedback e tratamento de falhas

Operações relevantes devem apresentar estados de carregamento, sucesso, vazio e erro quando aplicáveis, incluindo falhas de autenticação, consulta, envio, atualização de perfil e acesso a materiais.

### RNF-011 — Desempenho percebido

Pesquisa, filtragem e navegação devem fornecer feedback durante o processamento e evitar respostas obsoletas que substituam resultados mais recentes. Metas quantitativas de desempenho serão definidas durante a preparação de testes.

## 6. Decisões pendentes de especificação

| Tema | Definição necessária |
|---|---|
| Acesso de visitantes | Quais telas e materiais podem ser consultados sem login e quais ações exigem sessão. |
| Cadastro e recuperação | Política de e-mail institucional, requisitos de senha e validade do link de redefinição. |
| Metadados e taxonomia | Campos obrigatórios e opcionais; definição de tema; multiplicidade de classificações; tratamento de etapas e modalidades não representadas nos filtros atuais. |
| Busca e ordenação | Campos adicionais, normalização, correspondências, lógica de múltiplos termos, relevância e desempates. |
| Filtros | Fechamento sem aplicar; efeito da limpeza; apresentação de opções sem resultados. |
| Navegação pelos resultados | Paginação ou carregamento progressivo, tamanho de lote e preservação do contexto ao voltar dos detalhes. |
| Disponibilização dos recursos | Arquivos hospedados, links externos ou ambos; quantidade de recursos e tratamento de indisponibilidade. |
| Upload | Formatos, limites, verificações de segurança e condições de direitos de uso. |
| Revisão | Papéis, critérios, transições de status, recusas, possibilidade de reenvio e interface de moderação. |
| Compartilhamento | Destino do link compartilhável e permissões para quem o recebe. |
| Qualidade | Critérios mensuráveis de acessibilidade, desempenho, compatibilidade e testes funcionais. |

As decisões pendentes não devem ser interpretadas como funcionalidades já definidas em todos os seus detalhes. A especificação funcional deverá registrar as escolhas antes da implementação dos comportamentos afetados.

## 7. Funcionalidades previstas para evolução posterior

Não integram a primeira versão funcional: autenticação com Google, central completa de notificações, compartilhamento integrado com redes sociais, pré-visualização de arquivos, coleções personalizadas, colaboração em tempo real e recomendação automática de materiais.

Essas possibilidades não são requisitos obrigatórios do MVP. Sua inclusão futura dependerá de nova decisão de escopo.

## 8. Verificação e rastreabilidade

Os critérios de verificação associados a cada RF são pontos de partida para histórias de usuário, critérios de aceite e casos de teste. Eles não indicam aprovação de testes.

A rastreabilidade deverá ser mantida entre os identificadores deste documento, as histórias em [`historias-de-usuario.md`](historias-de-usuario.md), os itens de [`backlog.md`](backlog.md) e as especificações funcionais correspondentes. Os documentos de busca, filtros e metadados deverão ser revisados para refletir as definições atuais antes da implementação.

## 9. Documentos relacionados

- [`product-brief.md`](product-brief.md) — visão e proposta de valor.
- [`escopo-mvp.md`](escopo-mvp.md) — funcionalidades e limites da primeira versão.
- [`historias-de-usuario.md`](historias-de-usuario.md) — necessidades dos usuários e critérios de aceite.
- [`backlog.md`](backlog.md) — organização do trabalho.
- [`especificacao-funcional-bk-004-bk-005.md`](especificacao-funcional-bk-004-bk-005.md) — detalhamento de busca e filtros, a revisar.
- [`especificacao-funcional-bk-006-metadados.md`](especificacao-funcional-bk-006-metadados.md) — detalhamento de metadados, a revisar.
- [`../ux-ui/arquitetura-da-informacao.md`](../ux-ui/arquitetura-da-informacao.md) — organização da experiência.
- [`../ux-ui/user-flow.md`](../ux-ui/user-flow.md) — fluxos de navegação.
