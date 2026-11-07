# EduComp — Histórias de Usuário

**Versão:** 0.6  
**Data:** 07/11/2026  
**Situação:** histórias da primeira versão funcional em consolidação; desenvolvimento não iniciado.

## 1. Objetivo

Este documento apresenta as histórias de usuário do EduComp e seus critérios de aceitação, descrevendo as necessidades que orientam a primeira versão funcional da plataforma.

As histórias representam situações de uso e os resultados esperados para professores e responsáveis pela revisão de materiais. Servem de referência para o planejamento das entregas, a implementação e a elaboração dos testes.

O escopo funcional está definido em [Escopo do MVP](escopo-mvp.md), enquanto os comportamentos e regras específicos são detalhados em [Requisitos](requisitos.md) e nas especificações complementares.

Os critérios de aceitação ainda não foram executados. A aplicação não foi implementada nem validada com professores reais.

### 1.1. Estratégia de implementação

O desenvolvimento começará pelas interfaces desktop, utilizando o protótipo do Figma como referência visual.

A prioridade desktop representa uma etapa de execução. A adaptação responsiva e a verificação dos requisitos não funcionais continuam necessárias para a conclusão do MVP.

As histórias descrevem comportamentos da aplicação, independentemente do dispositivo utilizado. Seus critérios devem permanecer válidos nas versões responsivas, respeitando as adaptações de interface.

Funcionalidades representadas no Figma, mas não incluídas no escopo do MVP, não devem ser acrescentadas às histórias sem uma decisão funcional correspondente.

## 2. Convenções

Cada história apresenta:

- **Identificador (US):** código estável utilizado na rastreabilidade.
- **História:** necessidade descrita na estrutura “Como [pessoa], quero [ação], para [benefício]”.
- **Critérios de aceitação:** condições observáveis que permitem verificar o comportamento esperado.
- **Requisitos relacionados:** ligação com os requisitos funcionais e, quando pertinente, regras de negócio ou requisitos não funcionais.
- **Pendências:** decisões ainda necessárias para concluir a especificação ou os testes.

Os identificadores existentes devem ser preservados. Novas histórias deverão receber códigos próprios, sem renumerar as anteriores.

Os critérios descrevem condições de entrega, não resultados já alcançados.

## 3. Histórias de usuário

### 3.1. Entrada e gestão da conta

#### US-018 — Conhecer a plataforma e acessar as áreas principais

**História**

Como pessoa interessada em materiais pedagógicos de Computação, quero conhecer a proposta do EduComp e encontrar os caminhos de acesso à plataforma, para decidir como começar a utilizá-la.

**Critérios de aceitação**

- [ ] A página inicial apresenta a finalidade do EduComp de maneira compreensível.
- [ ] Existem caminhos identificáveis para Biblioteca, Entrar e Criar conta.
- [ ] As ações de navegação conduzem aos destinos correspondentes.
- [ ] Quando uma ação exigir autenticação, a interface informa essa condição e oferece um caminho adequado para entrar.
- [ ] Os conteúdos demonstrativos da página inicial não são apresentados como materiais necessariamente disponíveis no acervo.

**Requisito relacionado:** RF-020.

**Pendente:** definir quais áreas poderão ser consultadas por visitantes sem autenticação.

#### US-014 — Criar uma conta

**História**

Como professor interessado na plataforma, quero criar uma conta com meus dados, para utilizar funcionalidades associadas ao meu perfil.

**Critérios de aceitação**

- [ ] O formulário solicita nome completo, e-mail e senha.
- [ ] Os campos obrigatórios são identificados.
- [ ] Dados inválidos recebem mensagens de validação compreensíveis.
- [ ] O sistema impede o cadastro de duas contas com o mesmo e-mail.
- [ ] Um cadastro válido é registrado e confirmado.
- [ ] Uma falha não é apresentada como cadastro concluído.
- [ ] O cadastro não concede permissões de revisão de materiais automaticamente.

**Requisito relacionado:** RF-015.

**Pendências:** confirmar a exigência de e-mail institucional, a política de senhas e o destino após a criação da conta.

O cadastro com Google, presente no protótipo, não integra esta história.

#### US-015 — Entrar e sair da plataforma

**História**

Como professor cadastrado, quero acessar minha conta e encerrar minha sessão, para utilizar minhas informações e funcionalidades pessoais com segurança.

**Critérios de aceitação**

- [ ] O professor consegue informar e-mail e senha para entrar.
- [ ] Credenciais válidas iniciam uma sessão e permitem acessar as funcionalidades autorizadas.
- [ ] Credenciais incorretas não iniciam uma sessão.
- [ ] A interface comunica o processamento e eventuais falhas de autenticação.
- [ ] O professor consegue sair da plataforma pelo menu de perfil.
- [ ] A saída encerra a sessão correspondente.
- [ ] Após sair, operações protegidas exigem nova autenticação.
- [ ] Uma conta autenticada não consegue executar operações para as quais não possui autorização.

**Requisito relacionado:** RF-016.

**Pendente:** definir o destino após o login e o comportamento de retorno a uma tarefa interrompida pela exigência de autenticação.

#### US-016 — Recuperar o acesso à conta

**História**

Como professor que esqueceu sua senha, quero solicitar a redefinição por e-mail, para recuperar o acesso à minha conta.

**Critérios de aceitação**

- [ ] A interface permite informar um e-mail e solicitar instruções de recuperação.
- [ ] O formato do e-mail é validado antes da solicitação.
- [ ] O sistema apresenta uma resposta compreensível, sem revelar indevidamente se o endereço pertence a uma conta cadastrada.
- [ ] Um link válido permite definir uma nova senha.
- [ ] Links inválidos ou expirados não permitem concluir a redefinição.
- [ ] A conclusão da alteração é confirmada.
- [ ] A interface oferece um caminho para retornar à entrada.
- [ ] Falhas no processo não são apresentadas como alterações concluídas.

**Requisito relacionado:** RF-017.

**Pendências:** definir a validade do link, as regras de invalidação e o comportamento após redefinição.

#### US-017 — Consultar e atualizar o perfil

**História**

Como professor autenticado, quero consultar e atualizar meus dados de perfil, para manter minhas informações corretas.

**Critérios de aceitação**

- [ ] O professor consegue consultar os dados associados à sua conta.
- [ ] Os campos editáveis e não editáveis são identificados corretamente.
- [ ] É possível atualizar as informações pessoais permitidas.
- [ ] A interface oferece os fluxos previstos para alteração de foto e senha.
- [ ] Dados inválidos são identificados antes da confirmação.
- [ ] Alterações concluídas são persistidas.
- [ ] A interface informa sucesso ou falha de maneira coerente com a operação.
- [ ] Um usuário não consegue modificar os dados de outra conta sem autorização.

**Requisito relacionado:** RF-018.

**Pendente:** confirmar os campos editáveis, os limites de preenchimento e as regras de atualização da foto.

### 3.2. Descoberta de materiais

#### US-001 — Visualizar a Biblioteca de materiais

**História**

Como professor que procura recursos pedagógicos, quero visualizar os materiais disponíveis na Biblioteca, para conhecer opções relacionadas às minhas aulas.

**Critérios de aceitação**

- [ ] A Biblioteca apresenta os materiais aprovados e disponibilizados para publicação.
- [ ] Submissões pendentes, em análise ou recusadas não aparecem como materiais publicados.
- [ ] Cada item apresenta título e informações resumidas disponíveis para identificação.
- [ ] É possível abrir os detalhes de um material a partir da listagem.
- [ ] A interface informa quando os materiais estão sendo carregados.
- [ ] A ausência de materiais publicados apresenta um estado vazio apropriado.
- [ ] A Biblioteca diferencia ausência de materiais de pesquisa sem resultados.
- [ ] Existe um mecanismo para consultar materiais além do primeiro conjunto apresentado.
- [ ] Falhas de carregamento são comunicadas sem serem apresentadas como uma Biblioteca vazia.

**Requisitos relacionados:** RF-001 e RF-005.

**Pendente:** definir paginação ou carregamento progressivo, quantidade de itens e ordenação inicial.

#### US-002 — Pesquisar materiais por palavras-chave

**História**

Como professor que procura um recurso para determinado assunto, quero pesquisar por título ou tema, para encontrar materiais relacionados ao que pretendo ensinar.

**Critérios de aceitação**

- [ ] A Biblioteca oferece um campo identificável para pesquisa textual.
- [ ] A consulta considera título e tema dos materiais publicados, conforme as regras de correspondência definidas.
- [ ] A pesquisa pode ser combinada com os filtros ativos.
- [ ] O professor consegue alterar ou limpar o texto e executar outra consulta.
- [ ] Modificar a pesquisa não remove indevidamente os filtros aplicados.
- [ ] Uma consulta sem correspondências apresenta mensagem apropriada.
- [ ] A interface permite revisar os critérios utilizados.
- [ ] Consultas equivalentes, com os mesmos dados e critérios, apresentam uma ordenação consistente.
- [ ] Respostas de consultas anteriores não substituem os resultados de uma consulta mais recente.

**Requisitos relacionados:** RF-002, RF-003, RF-005 e RNF-011.

**Pendências:** definir a representação do tema, a forma de execução da pesquisa, as regras de correspondência e os critérios de ordenação.

O formulário de envio deve possuir uma forma definida de cadastrar o tema utilizado pela pesquisa. Essa decisão é detalhada na [Especificação de metadados](especificacao-metadados.md).

#### US-003 — Filtrar materiais

**História**

Como professor que procura recursos adequados ao contexto da aula, quero combinar filtros por tipo de material, etapa de ensino e eixo da Computação, para refinar os resultados da Biblioteca.

**Critérios de aceitação**

- [ ] Existem filtros por tipo de material, etapa de ensino e eixo da Computação.
- [ ] As opções de tipo são Plano de aula, Slides, Material de apoio, Atividade e Sequência didática.
- [ ] As etapas são Educação Infantil, Ensino Fundamental — Anos iniciais, Ensino Fundamental — Anos finais e Ensino Médio.
- [ ] Os eixos são Pensamento Computacional, Mundo Digital e Cultura Digital.
- [ ] É possível selecionar múltiplas opções em cada categoria.
- [ ] Opções da mesma categoria são combinadas por **OU**.
- [ ] Categorias diferentes e pesquisa textual são combinadas por **E**.
- [ ] O professor consegue modificar as seleções antes de acionar **Aplicar**.
- [ ] Alterações em edição não modificam os resultados antes da confirmação.
- [ ] A ação **Aplicar** atualiza a listagem com os critérios confirmados.
- [ ] A ação **Limpar** permite remover seleções conforme a regra funcional definida.
- [ ] Ao reabrir um filtro, as seleções efetivamente aplicadas permanecem identificadas.
- [ ] A alteração dos critérios reinicia a navegação pelo conjunto de resultados correspondente.
- [ ] Quando não houver correspondências, a Biblioteca apresenta o estado apropriado.

**Requisitos relacionados:** RF-004 e RF-005.

**Pendências:** definir o comportamento de fechamento sem aplicar, o alcance de Limpar e a apresentação de opções sem resultados.

As regras detalhadas estão na [Especificação de busca e filtros](especificacao-busca-filtros.md).

### 3.3. Detalhes e acesso ao conteúdo

#### US-004 — Consultar detalhes de um material

**História**

Como professor interessado em um recurso, quero consultar seus detalhes, para avaliar inicialmente se ele atende à minha necessidade pedagógica.

**Critérios de aceitação**

- [ ] A página identifica o material por título e descrição.
- [ ] As classificações de tipo, etapa de ensino e eixo da Computação correspondem aos dados cadastrados.
- [ ] Ano escolar, objetivos e informações complementares são apresentados quando disponíveis.
- [ ] A autoria ou fonte é identificada conforme os dados e as regras de apresentação.
- [ ] Campos opcionais ausentes não são preenchidos com informações fictícias.
- [ ] As ações de acesso correspondem aos recursos realmente disponíveis e permitidos.
- [ ] A ação de favoritar respeita a autenticação e as permissões aplicáveis.
- [ ] Existe um caminho para retornar ao contexto de origem.

**Requisito relacionado:** RF-006.

**Pendente:** concluir a definição dos metadados obrigatórios, opcionais e das formas de acesso.

#### US-005 — Acessar um material por link externo

**História**

Como professor que encontrou um recurso com endereço externo cadastrado, quero abrir sua fonte de acesso, para consultar o conteúdo disponibilizado fora da plataforma.

**Critérios de aceitação**

- [ ] Quando links externos forem admitidos e houver endereço disponível, uma ação identificável permite abri-lo.
- [ ] A ação utiliza o endereço associado ao material consultado.
- [ ] O usuário consegue distinguir o acesso externo da navegação pela página de detalhes.
- [ ] Um material sem endereço cadastrado não apresenta uma ação para um link inexistente.
- [ ] As permissões de acesso são respeitadas.
- [ ] Falhas que puderem ser identificadas recebem tratamento adequado.

**Requisitos relacionados:** RF-007, RF-009 e RF-010.

**Pendente:** confirmar a inclusão de links externos no MVP e a quantidade permitida por material.

Esta história depende dessa decisão funcional. Sua manutenção no documento preserva a rastreabilidade, sem antecipar a implementação.

#### US-006 — Acessar arquivo hospedado na plataforma

**História**

Como professor que encontrou um material com arquivo disponível, quero acessá-lo, para consultar ou utilizar o recurso.

**Critérios de aceitação**

- [ ] Quando houver arquivo disponível e permitido, o sistema apresenta uma ação clara para acessá-lo.
- [ ] A ação corresponde ao arquivo associado ao material.
- [ ] O recurso pode ser obtido pelo usuário autorizado.
- [ ] Arquivos inexistentes ou indisponíveis não são apresentados como acessíveis.
- [ ] O acesso direto ao arquivo também respeita as permissões aplicáveis.
- [ ] Uma falha identificável é comunicada de maneira compreensível.

**Requisitos relacionados:** RF-008, RF-009 e RF-010.

**Pendente:** definir formatos, limites, quantidade de arquivos e estratégia de disponibilização.

#### US-007 — Identificar as formas de acesso disponíveis

**História**

Como professor que consulta um material, quero distinguir as formas de acesso realmente disponíveis, para escolher como chegar ao conteúdo.

**Critérios de aceitação**

- [ ] A interface apresenta acesso ao arquivo quando esse recurso existir e estiver permitido.
- [ ] Se links externos forem admitidos, apresenta a ação correspondente quando houver endereço cadastrado.
- [ ] Se ambas as formas forem admitidas e estiverem disponíveis, as opções aplicáveis são identificáveis.
- [ ] Quando não houver recurso acessível, a interface comunica a situação.
- [ ] A indisponibilidade do recurso não é confundida com a inexistência do registro do material.
- [ ] Não são apresentadas ações para arquivos ou endereços inexistentes.

**Requisito relacionado:** RF-009.

#### US-008 — Receber informações sobre falhas de acesso

**História**

Como professor que tenta acessar um recurso, quero receber uma explicação quando o acesso falhar, para compreender a situação e saber como proceder.

**Critérios de aceitação**

- [ ] Uma falha identificável apresenta mensagem compreensível.
- [ ] A interface diferencia, quando possível, indisponibilidade, recurso inexistente e falta de autorização.
- [ ] O sistema não declara falha de um endereço externo quando não puder verificar essa condição.
- [ ] O erro de acesso não é apresentado como remoção automática do material da Biblioteca.
- [ ] A interface oferece orientação ou nova tentativa quando tecnicamente aplicável.
- [ ] As mensagens não expõem informações protegidas sobre o armazenamento dos arquivos.

**Requisito relacionado:** RF-010.

### 3.4. Organização pessoal

#### US-010 — Favoritar e consultar materiais salvos

**História**

Como professor autenticado, quero salvar materiais de interesse e consultá-los posteriormente, para retomar recursos sem precisar procurá-los novamente.

**Critérios de aceitação**

- [ ] O professor consegue salvar e remover materiais dos favoritos nos contextos em que a ação estiver disponível.
- [ ] A coleção Salvos apresenta os materiais associados à sua conta.
- [ ] Um mesmo material aparece no máximo uma vez na coleção do professor.
- [ ] As alterações são refletidas nas interfaces relacionadas.
- [ ] A coleção persiste entre sessões.
- [ ] O professor consegue abrir os detalhes de um material salvo.
- [ ] A ausência de favoritos apresenta um estado vazio apropriado.
- [ ] Falhas de salvamento ou remoção não são apresentadas como operações concluídas.
- [ ] Um usuário não consegue alterar os favoritos de outra conta sem autorização.

**Requisito relacionado:** RF-012.

**Pendente:** confirmar se os controles de pesquisa e filtros representados no protótipo de Salvos integrarão o comportamento funcional da primeira versão.

A lista de Salvos não constitui um sistema de coleções personalizadas.

### 3.5. Envio e revisão de materiais

#### US-009 — Enviar material para revisão

**História**

Como professor autorizado a contribuir, quero preencher as informações de um material e enviar um arquivo, para submetê-lo à análise e possível inclusão na Biblioteca.

**Critérios de aceitação**

- [ ] O formulário permite informar os metadados exigidos e selecionar um arquivo.
- [ ] Os campos obrigatórios são identificados e validados.
- [ ] O arquivo é verificado conforme as regras de formato, tamanho e segurança aprovadas.
- [ ] Dados ou arquivos inválidos apresentam mensagens específicas.
- [ ] O envio apresenta feedback de progresso, conclusão ou falha.
- [ ] Uma falha não é apresentada como submissão concluída.
- [ ] Um envio válido gera um registro identificável e associado ao professor.
- [ ] O professor recebe confirmação de recebimento e informação sobre a situação inicial.
- [ ] O material não aparece como publicado na Biblioteca antes da aprovação.
- [ ] A aplicação evita duplicação acidental do envio durante o processamento, quando aplicável.

**Requisitos relacionados:** RF-011 e RN-001.

**Pendências:** confirmar campos obrigatórios, cadastro de tema, formatos e limites dos arquivos, condições de direitos de uso e situação inicial da submissão.

Os valores de upload apresentados no Figma ainda não constituem regras definitivas.

#### US-013 — Acompanhar a situação dos materiais enviados

**História**

Como professor que enviou um material, quero consultar o andamento da submissão, para saber se ela está aguardando análise, foi aprovada ou foi recusada.

**Critérios de aceitação**

- [ ] O professor consegue identificar e consultar os próprios envios.
- [ ] Cada submissão apresenta uma situação correspondente ao registro armazenado.
- [ ] As alterações de situação realizadas na revisão são refletidas na consulta do autor.
- [ ] O professor não consegue consultar submissões privadas pertencentes a outra conta sem autorização.
- [ ] A ausência de envios apresenta mensagem apropriada.
- [ ] As situações permanecem registradas entre sessões.
- [ ] Uma submissão não aprovada não aparece como material publicado.
- [ ] Falhas de consulta não são confundidas com a inexistência de envios.

**Requisito relacionado:** RF-019.

**Pendente:** confirmar as transições e as informações apresentadas nos estados Pendente, Em análise, Aprovado e Recusado.

O acompanhamento pelo professor não exige a implementação de uma central de notificações no MVP.

#### US-012 — Revisar e decidir sobre materiais enviados

**História**

Como responsável autorizado pela revisão, quero analisar os materiais submetidos e registrar sua aprovação ou recusa, para controlar quais recursos poderão integrar o acervo publicado.

**Critérios de aceitação**

- [ ] Existe uma interface restrita para consultar as submissões que necessitam de avaliação.
- [ ] O responsável autorizado consegue identificar e selecionar uma submissão.
- [ ] É possível consultar os metadados e o recurso necessários à análise.
- [ ] A interface permite registrar aprovação ou recusa.
- [ ] As decisões são persistidas e associadas à submissão correspondente.
- [ ] Apenas usuários autorizados conseguem executar essas operações.
- [ ] Materiais pendentes, em análise ou recusados não aparecem como recursos publicados.
- [ ] Materiais aprovados podem ser publicados conforme as regras definidas.
- [ ] A situação atualizada fica disponível para consulta pelo autor.
- [ ] Falhas na decisão são comunicadas sem confirmar uma operação não concluída.

**Requisitos relacionados:** RF-014, RF-019 e RN-001.

**Pendências:** definir papéis de revisão, critérios de aprovação, justificativas, transições de situação, possibilidade de reenvio e interface mínima do responsável.

A interface de moderação ainda precisa de especificação visual. Essa definição faz parte da preparação da entrega, sem exigir um painel administrativo completo.

### 3.6. Compartilhamento básico

#### US-011 — Copiar link compartilhável

**História**

Como pessoa que deseja indicar um recurso ou a plataforma, quero copiar um link compartilhável, para enviá-lo por um canal de minha escolha.

**Critérios de aceitação**

- [ ] Existe uma ação identificável para copiar o link no contexto definido.
- [ ] O endereço copiado corresponde ao destino especificado.
- [ ] O sistema confirma quando a cópia é concluída.
- [ ] Falhas identificáveis são comunicadas.
- [ ] O destinatário que abrir o link permanece sujeito às regras normais de acesso da plataforma.

**Requisito relacionado:** RF-013.

**Pendente:** definir se o compartilhamento será aplicado à plataforma, aos detalhes de um material ou a ambos.

O compartilhamento por integração direta com redes sociais não faz parte desta história.

## 4. Critérios transversais de aceitação

Além das condições específicas de cada história, todas as entregas devem respeitar os requisitos não funcionais aplicáveis.

### 4.1. Feedback e recuperação

As operações devem distinguir carregamento, conclusão, erro e indisponibilidade conforme o contexto.

Uma falha não deve ser apresentada como sucesso, e a interface deve oferecer um caminho de continuidade quando houver uma ação de recuperação possível.

### 4.2. Persistência e consistência

Operações que modificam dados devem refletir o estado confirmado pela aplicação.

Informações de conta, favoritos, submissões e decisões de revisão precisam manter consistência entre interfaces e sessões, conforme os requisitos.

### 4.3. Segurança e autorização

A disponibilidade visual de uma ação não substitui a autorização necessária para executá-la.

Operações pessoais devem respeitar a identidade do usuário. A revisão e a publicação dos materiais exigem permissões específicas.

### 4.4. Acessibilidade

As interfaces devem oferecer navegação por teclado, foco visível, identificação acessível dos controles, mensagens compreensíveis e organização semântica adequada.

Os critérios técnicos de avaliação serão estabelecidos no planejamento de testes.

### 4.5. Responsividade

Os fluxos serão implementados inicialmente no desktop.

As histórias somente poderão ser consideradas plenamente atendidas para a entrega do MVP quando os comportamentos previstos permanecerem utilizáveis nos tamanhos de tela contemplados pelo projeto.

A conclusão visual da versão desktop não equivale ao aceite da versão funcional completa.

## 5. Matriz de rastreabilidade

| História | Requisitos relacionados | Backlog principal |
| --- | --- | --- |
| US-001 — Visualizar Biblioteca | RF-001, RF-005 | BK-022 |
| US-002 — Pesquisar materiais | RF-002, RF-003, RF-005, RNF-011 | BK-004, BK-022 |
| US-003 — Filtrar materiais | RF-004, RF-005 | BK-005, BK-022 |
| US-004 — Consultar detalhes | RF-006 | BK-023 |
| US-005 — Acessar link externo | RF-007, RF-009, RF-010 | BK-007, BK-023 |
| US-006 — Acessar arquivo hospedado | RF-008, RF-009, RF-010 | BK-007, BK-023 |
| US-007 — Identificar formas de acesso | RF-009 | BK-023 |
| US-008 — Tratar falhas de acesso | RF-010 | BK-023 |
| US-009 — Enviar material | RF-011, RN-001 | BK-016 |
| US-010 — Favoritar e consultar Salvos | RF-012 | BK-017 |
| US-011 — Copiar link | RF-013 | BK-018 |
| US-012 — Revisar submissões | RF-014, RF-019, RN-001 | BK-016, BK-031 |
| US-013 — Acompanhar submissões | RF-019 | BK-025 |
| US-014 — Criar conta | RF-015 | BK-021 |
| US-015 — Entrar e sair | RF-016 | BK-019, BK-021 |
| US-016 — Recuperar senha | RF-017 | BK-021 |
| US-017 — Atualizar perfil | RF-018 | BK-024 |
| US-018 — Conhecer a plataforma | RF-020 | BK-021 |

Os itens de fundação visual, arquitetura, responsividade e qualidade devem considerar as histórias pertinentes, mesmo quando não aparecem individualmente como dependências nesta matriz.

## 6. Preparação dos testes

Antes de transformar os critérios em cenários definitivos, deverão ser resolvidas as decisões funcionais que condicionam seus resultados.

| Área | Decisões necessárias |
| --- | --- |
| Autenticação | Acesso de visitantes, política de senhas, sessões e redirecionamentos. |
| Pesquisa | Representação do tema, regras de correspondência e ordenação. |
| Filtros | Fechamento sem aplicar, alcance de Limpar e opções sem resultados. |
| Biblioteca | Paginação ou carregamento progressivo. |
| Materiais | Campos obrigatórios, classificações e autoria. |
| Recursos | Formas de acesso, limites de arquivos e tratamento da indisponibilidade. |
| Envios | Validação, situação inicial e requisitos de publicação. |
| Moderação | Permissões, critérios de decisão, estados e interface restrita. |
| Perfil | Campos editáveis, foto e limites de preenchimento. |
| Compartilhamento | Destino do link copiado. |
| Qualidade | Critérios mensuráveis de acessibilidade, responsividade e desempenho. |

### 6.1. Condições de execução

A verificação das histórias deverá utilizar dados e situações controladas que permitam observar o comportamento esperado.

Os testes deverão contemplar, conforme a necessidade:

- Caminho principal da tarefa.
- Dados e ações inválidas.
- Ausência de conteúdo.
- Falhas de consulta ou operação.
- Restrições de acesso.
- Persistência de alterações.
- Atualização consistente entre interfaces.
- Navegação e interação por teclado.

As histórias não devem ser marcadas como concluídas apenas pela existência de suas telas no Figma.

Sua conclusão deverá ser registrada no backlog com evidências de implementação e verificação dos critérios correspondentes.

### 6.2. Validação com usuários

A validação da experiência com professores é uma atividade distinta da verificação funcional.

Quando realizada, deverá considerar tarefas representativas, objetivos definidos e registro das dificuldades observadas.

Até o momento, as histórias representam necessidades e comportamentos planejados, sem resultados de avaliação com usuários reais.

## 7. Documentos relacionados

- [Product Brief](product-brief.md) — visão do produto e proposta de valor.
- [Escopo do MVP](escopo-mvp.md) — funcionalidades incluídas e limites da primeira versão.
- [Requisitos](requisitos.md) — comportamentos funcionais, regras de negócio e requisitos não funcionais.
- [Backlog](backlog.md) — planejamento e acompanhamento das entregas.
- [Especificação de busca e filtros](especificacao-busca-filtros.md) — comportamento da pesquisa e dos filtros.
- [Especificação de metadados](especificacao-metadados.md) — informações, classificação e acesso aos materiais.
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md) — organização das áreas e conteúdos.
- [Objetivos de UX](../ux-ui/objetivos-de-ux.md) — objetivos da experiência.
- [User Flow](../ux-ui/user-flow.md) — percursos e decisões de navegação.
- [Design System](../ux-ui/design-system.md) — identidade visual e padrões de interface.
- [Handoff de UI/UX](../ux-ui/handoff.md) — referência para a implementação desktop.

---

As histórias de usuário devem acompanhar as decisões funcionais e a evolução do projeto.

Alterações de escopo precisam ser registradas nos documentos de produto e refletidas no backlog. Novos critérios devem ser incluídos quando necessários para tornar as entregas verificáveis, preservando os identificadores e a rastreabilidade existente.
