# EduComp — Requisitos do Produto

**Versão:** 0.6  
**Data:** 06/11/2026  
**Situação:** requisitos da primeira versão funcional em consolidação; desenvolvimento não iniciado.

## 1. Objetivo

Este documento define os requisitos funcionais, as regras de negócio e os requisitos não funcionais do EduComp, plataforma voltada à descoberta, consulta, organização e contribuição de materiais pedagógicos de Computação para a Educação Básica.

Os requisitos descrevem o comportamento esperado da aplicação e estabelecem referências para implementação, testes e validação. Não representam funcionalidades já desenvolvidas ou verificadas com professores reais.

O recorte da primeira entrega está definido no [Escopo do MVP](escopo-mvp.md). Os requisitos aqui apresentados devem permanecer coerentes com esse documento e orientar o detalhamento das histórias de usuário e do backlog.

### 1.1. Estratégia de implementação

O desenvolvimento será iniciado pelas interfaces desktop, utilizando o protótipo do Figma como referência visual.

Essa decisão define uma sequência de execução, não uma limitação funcional do produto. A versão desktop constitui uma etapa intermediária, seguida pela adaptação responsiva e pelas verificações necessárias à conclusão do MVP.

As interfaces e os estados visuais estão documentados no [Handoff de UI/UX](../ux-ui/handoff.md), enquanto os fundamentos de identidade e componentes estão registrados no [Design System](../ux-ui/design-system.md).

A existência de uma funcionalidade no protótipo não determina sua inclusão no MVP. Em caso de divergência, o escopo funcional deve ser confirmado antes da implementação.

## 2. Convenções

Os requisitos estão organizados em três categorias:

- **RF — Requisito funcional:** comportamento que a aplicação deve oferecer.
- **RN — Regra de negócio:** condição que deve ser respeitada na execução dos fluxos.
- **RNF — Requisito não funcional:** qualidade ou restrição aplicável à solução.

Cada requisito funcional apresenta uma descrição, critérios de verificação e, quando necessário, decisões pendentes.

Os critérios de verificação estabelecem condições para os testes, mas não indicam que a funcionalidade já foi aprovada ou implementada.

### 2.1. Identificadores e rastreabilidade

Os identificadores existentes foram preservados para manter a relação com as histórias de usuário, o backlog e as especificações funcionais.

Por esse motivo, os requisitos são apresentados por área, sem renumeração sequencial.

As alterações futuras devem preservar os identificadores já utilizados. Novos requisitos devem receber novos códigos, evitando alterações que comprometam o histórico documental.

### 2.2. Decisões pendentes

Uma decisão pendente identifica um comportamento que ainda precisa de definição funcional ou técnica.

Essas pendências devem ser resolvidas antes da implementação diretamente afetada, mas não impedem o avanço de funcionalidades independentes.

Quando um requisito depender de uma escolha ainda não realizada — como a aceitação de links externos —, sua implementação deverá respeitar a decisão posteriormente registrada.

## 3. Requisitos funcionais

### 3.1. Início, cadastro e autenticação

#### RF-020 — Apresentar a plataforma e a navegação inicial

O sistema deve oferecer uma página inicial que apresente a proposta do EduComp e disponibilize caminhos identificáveis para a Biblioteca, a criação de conta e a entrada na plataforma.

**Critérios de verificação**

- O usuário consegue identificar a finalidade da plataforma.
- As ações principais apresentam rótulos compreensíveis.
- Os controles de navegação direcionam às áreas correspondentes.
- A interface diferencia ações públicas e ações restritas a usuários autenticados, conforme as permissões definidas.
- Os conteúdos de apresentação não são confundidos com materiais necessariamente disponíveis no acervo.

**Pendente:** definir as áreas e funcionalidades acessíveis sem autenticação.

#### RF-015 — Permitir criação de conta

O sistema deve permitir o cadastro de professores mediante nome completo, e-mail e senha.

**Critérios de verificação**

- Os campos obrigatórios são identificados e validados.
- O endereço de e-mail deve possuir formato válido.
- O sistema impede a duplicação de contas associadas ao mesmo e-mail.
- O cadastro apresenta confirmação de conclusão ou mensagem de falha.
- A senha é armazenada de forma segura, conforme o RNF-007.
- Tentativas inválidas não produzem contas incompletas apresentadas como concluídas.

**Pendente:** definir a política de senhas e a eventual obrigatoriedade de e-mail institucional.

A autenticação com Google não integra a primeira versão funcional.

#### RF-016 — Autenticar usuários e gerenciar sessões

O sistema deve permitir autenticação por e-mail e senha, manutenção de sessão e encerramento seguro do acesso.

**Critérios de verificação**

- Credenciais válidas permitem o acesso às funcionalidades autorizadas.
- Credenciais inválidas não iniciam uma sessão.
- A interface apresenta mensagens adequadas para falhas de autenticação.
- O usuário consegue encerrar sua sessão.
- Após a saída, operações protegidas não permanecem acessíveis pela sessão encerrada.
- As operações de autenticação apresentam feedback de carregamento e erro, quando aplicável.
- O acesso a páginas protegidas respeita a condição de autenticação do usuário.

As regras de sessão e autorização devem ser aplicadas pela solução, não apenas pela apresentação visual do frontend.

#### RF-017 — Permitir recuperação de senha

O sistema deve permitir que o usuário solicite uma redefinição de senha por e-mail e conclua a alteração por meio de um fluxo seguro.

**Critérios de verificação**

- O endereço informado é validado.
- A solicitação apresenta feedback compreensível.
- A redefinição utiliza um mecanismo seguro, com validade limitada.
- Links inválidos ou expirados não permitem alteração de senha.
- O usuário recebe confirmação após a redefinição.
- O processo não deve revelar indevidamente a existência de uma conta associada ao e-mail informado.

**Pendente:** definir validade dos links, política de invalidação e detalhes do envio das instruções.

#### RF-018 — Permitir consulta e atualização do perfil

O sistema deve permitir que professores autenticados consultem e atualizem as informações autorizadas de suas contas.

A funcionalidade contempla dados pessoais, foto de perfil e alteração de senha.

**Critérios de verificação**

- O usuário consegue consultar os dados associados à própria conta.
- Campos editáveis e não editáveis são identificados corretamente.
- As alterações são validadas antes do salvamento.
- Dados atualizados permanecem disponíveis em sessões posteriores.
- A interface confirma alterações concluídas e informa falhas.
- A foto de perfil possui tratamento adequado quando não houver imagem cadastrada.
- Um usuário não pode modificar dados pertencentes a outra conta sem autorização.

**Pendente:** confirmar campos editáveis, limites de preenchimento, regras de atualização de foto e exposição de informações pessoais.

### 3.2. Biblioteca, pesquisa e filtros

#### RF-001 — Exibir a Biblioteca de materiais

O sistema deve apresentar uma Biblioteca organizada com os materiais aprovados e disponíveis para consulta, respeitando as permissões aplicáveis.

**Critérios de verificação**

- Apenas materiais autorizados para publicação aparecem na listagem publicada.
- Cada item apresenta informações suficientes para sua identificação.
- O usuário consegue acessar os detalhes de um material.
- A listagem apresenta quantidade de resultados ou indicação equivalente.
- A navegação entre resultados utiliza paginação ou carregamento progressivo.
- Operações de consulta apresentam estados de carregamento e falha quando necessário.

**Pendente:** definir o mecanismo de navegação entre resultados, a quantidade de itens por carregamento e a ordenação inicial.

#### RF-002 — Pesquisar materiais

O sistema deve permitir pesquisa textual por **título e tema** dos materiais disponíveis na Biblioteca.

**Critérios de verificação**

- O usuário consegue informar e executar uma pesquisa.
- Os resultados correspondem aos critérios definidos para título e tema.
- A pesquisa pode ser utilizada em conjunto com os filtros aplicados.
- Alterar ou limpar o texto atualiza os resultados.
- A alteração da pesquisa não remove indevidamente os filtros já aplicados.
- Consultas sem correspondência apresentam o estado previsto no RF-005.

**Pendente:** definir a representação de tema nos dados, o tratamento de acentos e diferenças entre maiúsculas e minúsculas, as correspondências parciais e as consultas com múltiplas palavras.

O comportamento detalhado está documentado na [Especificação de busca e filtros](especificacao-busca-filtros.md).

#### RF-003 — Ordenar os resultados da Biblioteca

O sistema deve apresentar resultados em uma ordem consistente e previsível.

**Critérios de verificação**

- Consultas equivalentes, com os mesmos dados e critérios, preservam a mesma ordenação.
- A regra de ordenação é aplicada à pesquisa, aos filtros e à navegação entre resultados.
- Resultados com valores equivalentes possuem tratamento consistente de desempate.
- Alterações na consulta não produzem ordenações contraditórias entre páginas ou carregamentos.

**Pendente:** definir a ordenação inicial, os critérios de relevância e as regras de desempate.

#### RF-004 — Filtrar materiais por classificações

O sistema deve permitir a seleção e combinação de filtros por **tipo de material**, **etapa de ensino** e **eixo da Computação**.

As opções previstas para a primeira versão são:

| Categoria | Opções |
| --- | --- |
| Tipo de material | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| Etapa de ensino | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| Eixo da Computação | Pensamento Computacional; Mundo Digital; Cultura Digital |

**Critérios de verificação**

- Cada categoria aceita múltiplas seleções.
- Opções da mesma categoria são combinadas pela lógica **OU**.
- Categorias diferentes são combinadas pela lógica **E**.
- A pesquisa textual também é combinada aos filtros pela lógica **E**.
- Seleções temporárias podem ser alteradas antes da confirmação.
- A ação **Aplicar** atualiza os resultados conforme as seleções confirmadas.
- A ação **Limpar** remove as seleções correspondentes ao contexto definido.
- Ao reabrir um filtro, o usuário visualiza os critérios efetivamente aplicados.

**Pendente:** confirmar o fechamento sem aplicar, o alcance da ação Limpar e a apresentação de opções que não retornam materiais.

A combinação dos filtros deve ser consistente com a [Especificação de busca e filtros](especificacao-busca-filtros.md).

#### RF-005 — Informar estados da Biblioteca e da busca

O sistema deve diferenciar as situações de carregamento, ausência de materiais publicados, pesquisa sem resultados e falha na obtenção dos dados.

**Critérios de verificação**

- A Biblioteca sem materiais apresenta mensagem apropriada.
- Uma pesquisa sem correspondências não é apresentada como ausência total de materiais no acervo.
- O usuário consegue modificar ou limpar critérios de pesquisa e filtros após um resultado vazio.
- Operações de consulta apresentam indicação de carregamento quando necessário.
- Falhas são comunicadas de maneira compreensível.
- Uma nova tentativa é disponibilizada quando tecnicamente aplicável.

### 3.3. Detalhes e acesso aos materiais

#### RF-006 — Exibir detalhes do material

O sistema deve apresentar uma página de detalhes com informações pedagógicas, identificação de autoria e formas de acesso associadas ao material.

**Critérios de verificação**

- A página apresenta título e descrição do recurso.
- Tipo de material, etapa de ensino e eixo da Computação são apresentados conforme os dados cadastrados.
- Ano escolar, objetivos, autoria e informações adicionais aparecem quando disponíveis.
- Campos opcionais ausentes não são substituídos por dados fictícios.
- O usuário consegue identificar as formas de acesso disponíveis.
- A ação de favoritar respeita a condição de autenticação e as permissões aplicáveis.

**Pendente:** confirmar os campos obrigatórios e opcionais, a multiplicidade das classificações e a representação de temas.

O detalhamento está registrado na [Especificação de metadados](especificacao-metadados.md).

#### RF-007 — Disponibilizar acesso por link externo

Caso links externos sejam adotados como forma de disponibilização no MVP, o sistema deve oferecer acesso aos endereços associados ao material.

**Critérios de verificação**

- O usuário distingue o acesso ao material do retorno à página de detalhes.
- O controle direciona ao endereço correspondente ao recurso cadastrado.
- Não é apresentado link de acesso quando não houver endereço associado.
- O comportamento respeita as permissões definidas.

**Pendente:** confirmar a adoção de links externos, a quantidade permitida por material e as validações aplicáveis.

Este requisito é condicionado à decisão sobre as formas de disponibilização dos recursos. Seu identificador é mantido para preservar a rastreabilidade.

#### RF-008 — Disponibilizar acesso a arquivos hospedados

O sistema deve permitir acesso aos arquivos armazenados na plataforma, respeitando a disponibilidade e as permissões correspondentes.

**Critérios de verificação**

- A ação de acesso corresponde a um arquivo existente.
- O usuário autorizado consegue obter o recurso.
- Arquivos inexistentes, indisponíveis ou sem permissão não são apresentados como acessíveis.
- Falhas identificáveis são tratadas conforme o RF-010.
- A disponibilização do arquivo respeita os controles de segurança aplicáveis.

**Pendente:** definir formatos, tamanho máximo, quantidade de arquivos por material e estratégia de armazenamento e disponibilização.

#### RF-009 — Representar as formas de acesso disponíveis

O sistema deve apresentar as ações de acesso correspondentes aos recursos associados a cada material.

**Critérios de verificação**

- Materiais com arquivo disponível apresentam a respectiva ação.
- Materiais com link externo admitido e disponível apresentam a ação correspondente.
- Quando ambas as formas forem adotadas e estiverem disponíveis, a interface apresenta as opções aplicáveis.
- Quando não houver recurso acessível, a interface informa a situação sem simular disponibilidade.
- Os controles possuem identificação compreensível.

#### RF-010 — Tratar falhas de acesso aos recursos

O sistema deve comunicar falhas de acesso quando a indisponibilidade ou a ausência de permissão puder ser identificada.

**Critérios de verificação**

- O usuário recebe mensagem apropriada quando um arquivo não puder ser acessado.
- A interface diferencia, quando possível, recurso inexistente, indisponibilidade e ausência de autorização.
- Não é declarada falha de um endereço externo sem que essa condição possa ser constatada.
- Uma nova tentativa ou orientação é disponibilizada quando aplicável.
- Mensagens de erro não revelam informações protegidas sobre o armazenamento dos recursos.

### 3.4. Materiais salvos

#### RF-012 — Permitir favoritar e consultar materiais salvos

O sistema deve permitir que professores autenticados salvem materiais em uma lista pessoal, removam favoritos e consultem os recursos armazenados nessa coleção.

**Critérios de verificação**

- Um material pode ser salvo por um usuário.
- O mesmo material não aparece duplicado na coleção da mesma conta.
- O usuário consegue remover um item dos favoritos.
- As alterações são refletidas nas interfaces relacionadas.
- A coleção permanece disponível em sessões posteriores.
- O usuário pode acessar os detalhes dos itens salvos.
- A ausência de favoritos apresenta estado vazio apropriado.
- Um usuário não pode alterar os favoritos pertencentes a outra conta sem autorização.

A coleção pessoal do MVP não representa um sistema de listas personalizadas ou compartilhadas.

### 3.5. Contribuição e revisão de materiais

#### RF-011 — Permitir envio de material para revisão

O sistema deve permitir que professores autenticados e autorizados preencham um formulário de submissão e enviem um material para avaliação.

O fluxo deverá receber as informações pedagógicas previstas e o arquivo associado ao recurso.

**Critérios de verificação**

- O formulário identifica os campos obrigatórios.
- Dados e arquivos são validados antes da submissão.
- Arquivos incompatíveis ou acima do limite definido são rejeitados com mensagem apropriada.
- O usuário recebe feedback de progresso, sucesso ou falha.
- Uma submissão concluída gera um registro identificável.
- Falhas não são apresentadas como envios concluídos.
- O envio não publica automaticamente o material na Biblioteca.
- O autor pode consultar posteriormente a situação da submissão.

**Pendente:** definir campos obrigatórios, formatos e limites de upload, verificações de segurança e condições de direitos de uso.

As restrições definitivas devem ser registradas na [Especificação de metadados](especificacao-metadados.md) e na implementação técnica.

#### RF-019 — Permitir acompanhar a situação de um envio

O sistema deve permitir que o professor autenticado consulte os materiais enviados por sua conta e acompanhe suas situações de revisão.

**Critérios de verificação**

- O usuário consegue identificar seus envios.
- Cada submissão apresenta a situação atual.
- Alterações de situação são refletidas após a atualização dos dados.
- O histórico não apresenta materiais de outros usuários sem autorização.
- Situações de recusa ou aprovação são comunicadas de forma compreensível.
- O acompanhamento não apresenta uma submissão como publicada antes da autorização correspondente.

Os estados inicialmente previstos são:

| Estado | Significado |
| --- | --- |
| Pendente | Submissão recebida e aguardando avaliação |
| Em análise | Material em processo de revisão |
| Aprovado | Material autorizado para publicação |
| Recusado | Material não aprovado |

**Pendente:** confirmar a máquina de estados, as transições permitidas e as informações apresentadas ao autor.

#### RF-014 — Permitir revisão e publicação por responsável autorizado

O sistema deve oferecer um fluxo mínimo para que um responsável autorizado consulte as submissões, avalie os materiais e registre decisões de aprovação ou recusa.

**Critérios de verificação**

- Existe uma interface que permite consultar os materiais pendentes de avaliação.
- O responsável consegue acessar as informações necessárias à revisão.
- Somente usuários autorizados executam ações de aprovação ou recusa.
- As decisões são registradas e persistidas.
- Materiais em análise ou recusados não são publicados como aprovados.
- Materiais aprovados podem ser disponibilizados na Biblioteca conforme as regras estabelecidas.
- As alterações de situação são refletidas no acompanhamento do autor.
- Falhas ao registrar decisões são informadas sem confirmar indevidamente a operação.

**Pendente:** definir os papéis de moderação, critérios de aprovação, registro de justificativas, possibilidade de reenvio, transições de situação e interface mínima de revisão.

A interface administrativa ainda não possui especificação visual definitiva no Figma. Sua definição é necessária para concluir este requisito, mas não implica a construção de um painel administrativo avançado.

### 3.6. Compartilhamento básico

#### RF-013 — Permitir cópia de link compartilhável

O sistema deve disponibilizar uma ação para copiar um endereço compartilhável e informar o resultado da operação.

**Critérios de verificação**

- O usuário identifica a ação de compartilhamento.
- A operação copia um endereço válido para o destino definido.
- A interface confirma a conclusão da cópia.
- Falhas identificáveis são comunicadas.
- O acesso ao endereço compartilhado respeita as permissões aplicáveis.

**Pendente:** definir se o endereço corresponderá à página inicial, ao detalhe de um material ou a ambos.

O compartilhamento integrado com redes sociais não faz parte deste requisito.

## 4. Regras de negócio

### RN-001 — Publicação condicionada à aprovação

Materiais enviados por professores devem passar por revisão antes de serem disponibilizados no acervo publicado.

A existência de um registro de submissão não representa autorização de publicação.

### RN-002 — Permissões por ação

As permissões para consultar conteúdos, favoritar, enviar, revisar, publicar e modificar informações devem respeitar a identidade e o papel do usuário.

As restrições devem ser verificadas pelos serviços da aplicação, não apenas pela presença ou ausência de controles visuais.

**Pendente:** consolidar os papéis e suas permissões.

### RN-003 — Favoritos exclusivos por conta

Cada associação entre usuário e material deve ser única.

As alterações dos favoritos devem ser persistentes e restritas à conta correspondente.

### RN-004 — Integridade das submissões

Cada submissão deve manter identificação do autor, informações do material, registro de envio e situação de revisão.

Alterações de situação devem preservar a consistência dos dados necessários ao acompanhamento e à publicação.

### RN-005 — Coerência entre classificação e consulta

Os filtros e as informações exibidas na Biblioteca devem corresponder aos metadados associados aos materiais.

As classificações utilizadas na consulta devem ser consistentes com as regras de cadastro.

**Pendente:** concluir a taxonomia e as regras de multiplicidade dos campos.

### RN-006 — Disponibilidade e permissões dos arquivos

O sistema não deve disponibilizar arquivos inexistentes ou recursos para os quais o usuário não possua autorização.

As restrições devem ser aplicadas ao mecanismo responsável pela entrega dos arquivos, independentemente da interface utilizada.

## 5. Requisitos não funcionais

### RNF-001 — Usabilidade

A aplicação deve apresentar linguagem, navegação e controles compreensíveis para professores da Educação Básica.

As principais tarefas devem possuir caminhos identificáveis, mensagens claras e ações consistentes.

### RNF-002 — Responsividade

A aplicação deve permitir a realização dos fluxos principais em computadores, tablets e celulares.

O desenvolvimento será iniciado pelo desktop, mas a adaptação responsiva integra a conclusão do MVP.

O layout deve preservar a legibilidade, a navegação e as ações essenciais nos tamanhos de tela previstos.

**Pendente:** definir os pontos de quebra e os critérios técnicos de verificação conforme as referências do Figma.

### RNF-003 — Consistência visual e de interação

A aplicação deve utilizar os padrões definidos no Design System para cores, tipografia, espaçamentos, componentes e estados.

Elementos com funções equivalentes devem apresentar aparência e comportamento consistentes.

### RNF-004 — Clareza do acesso ao conteúdo

A interface deve permitir distinguir:

- Consulta aos detalhes do material.
- Acesso a arquivo hospedado.
- Acesso a endereço externo, quando admitido.
- Recurso indisponível.
- Acesso não autorizado.

As ações disponíveis devem corresponder aos recursos efetivamente associados ao material.

### RNF-005 — Transparência dos dados apresentados

Autoria, fonte, classificações e condições de uso devem refletir as informações cadastradas.

Dados ausentes não devem ser preenchidos artificialmente para reproduzir o conteúdo do protótipo.

### RNF-006 — Acessibilidade

A aplicação deve oferecer condições adequadas de navegação, compreensão e interação, incluindo:

- Navegação por teclado.
- Foco visível.
- Rótulos associados aos controles.
- Estrutura semântica apropriada.
- Contraste e legibilidade adequados.
- Mensagens de erro e sucesso acessíveis.
- Utilização de menus e modais sem dependência exclusiva do mouse.

Os critérios técnicos mensuráveis e os procedimentos de avaliação devem ser definidos no planejamento de testes.

### RNF-007 — Segurança da autenticação

A aplicação deve proteger credenciais e mecanismos de autenticação.

As senhas devem ser armazenadas com hash seguro, e os processos de sessão e recuperação de acesso devem utilizar mecanismos apropriados de segurança.

A implementação deve evitar exposição indevida de credenciais, tokens e informações sensíveis.

### RNF-008 — Proteção de dados e autorização

Dados pessoais, favoritos e submissões privadas devem ser acessíveis somente conforme as permissões aplicáveis.

A autorização precisa ser verificada nas operações de consulta e alteração de dados.

As regras de retenção, tratamento e proteção das informações pessoais deverão ser definidas durante a preparação técnica.

### RNF-009 — Integridade e persistência

As operações concluídas de cadastro, atualização de perfil, favoritos, envio e moderação devem permanecer armazenadas de forma consistente.

A aplicação deve evitar duplicações indevidas e estados contraditórios entre os registros e as interfaces.

### RNF-010 — Feedback e tratamento de falhas

As operações relevantes devem apresentar feedback compatível com sua situação.

Isso inclui carregamento, sucesso, validação, indisponibilidade, ausência de resultados e erro, conforme cada contexto.

Falhas de autenticação, consulta, envio, acesso a arquivos e atualização de dados não devem ser apresentadas como operações concluídas.

### RNF-011 — Desempenho percebido

A pesquisa, os filtros e a navegação devem oferecer retorno adequado durante o processamento.

A aplicação deve evitar que respostas antigas substituam resultados de consultas mais recentes, especialmente quando o usuário altera rapidamente os critérios.

**Pendente:** definir métricas de desempenho e condições de medição no planejamento técnico e de testes.

## 6. Estratégia de implementação e verificação

Os requisitos funcionais definem o comportamento esperado do MVP, independentemente da ordem em que as interfaces forem desenvolvidas.

A implementação seguirá duas etapas principais.

### 6.1. Desenvolvimento desktop

A primeira etapa contempla a preparação técnica, os componentes compartilhados e os fluxos desktop previstos no MVP.

A verificação dessa etapa deve considerar:

- Correspondência visual com o protótipo desktop.
- Funcionamento dos controles e da navegação.
- Integração com os serviços necessários.
- Persistência e autorização das operações.
- Tratamento dos estados de interface.
- Acessibilidade e adaptação a janelas desktop menores.

A referência visual principal utiliza frames de 1536 px. Essa medida não deve ser transformada em largura fixa obrigatória para a aplicação.

O aceite da etapa desktop não representa a conclusão do MVP.

### 6.2. Responsividade e consolidação

A etapa seguinte deve adaptar os fluxos implementados para tablet e dispositivos móveis.

Os mesmos requisitos funcionais devem permanecer atendidos nas versões responsivas.

A verificação final do MVP deverá incluir testes funcionais, integração, acessibilidade, segurança, persistência e funcionamento em diferentes tamanhos de tela, conforme os critérios definidos para o projeto.

## 7. Decisões pendentes de especificação

| Tema | Definição necessária |
| --- | --- |
| Acesso de visitantes | Determinar quais páginas e materiais podem ser consultados sem autenticação. |
| Cadastro | Confirmar exigência de e-mail institucional e política de senha. |
| Recuperação de senha | Definir validade dos links e comportamento de solicitações inválidas. |
| Perfil | Confirmar campos editáveis, limites e regras para fotos e informações pessoais. |
| Metadados | Definir campos obrigatórios, tema, classificações múltiplas e taxonomia de cadastro. |
| Pesquisa | Confirmar normalização, correspondências, múltiplos termos, relevância e desempates. |
| Filtros | Definir fechamento sem aplicar, alcance da limpeza e opções sem resultados. |
| Navegação pelos resultados | Escolher paginação ou carregamento progressivo e comportamento ao retornar dos detalhes. |
| Disponibilização dos recursos | Definir arquivos hospedados, links externos ou ambos, quantidade e condições de acesso. |
| Upload | Confirmar formatos, limites, verificações de segurança e direitos de uso. |
| Revisão | Definir papéis, critérios de análise, transições de situação, justificativas e reenvio. |
| Interface de moderação | Especificar a experiência mínima do responsável autorizado. |
| Compartilhamento | Definir os endereços compartilháveis e suas condições de acesso. |
| Responsividade | Consolidar breakpoints e critérios de adaptação. |
| Qualidade | Definir métricas de desempenho, critérios de acessibilidade e procedimentos de teste. |

As decisões deverão ser registradas nos documentos correspondentes antes da implementação dos comportamentos diretamente afetados.

Pendências específicas não impedem o desenvolvimento de funcionalidades que já possuem definições suficientes.

## 8. Funcionalidades previstas para evolução posterior

Não integram os requisitos obrigatórios da primeira versão funcional:

- Autenticação com Google.
- Central completa de notificações.
- Comentários e respostas em materiais.
- Relatos de aplicação.
- Denúncias e moderação de interações da comunidade.
- Perfis públicos ampliados.
- Compartilhamento integrado com redes sociais.
- Pré-visualização interna de arquivos.
- Coleções personalizadas.
- Compartilhamento de coleções.
- Colaboração em tempo real.
- Recomendações automáticas de materiais.
- Funcionalidades administrativas avançadas além da revisão necessária ao MVP.

Alguns desses recursos possuem referências visuais no Figma, mas não devem ser implementados como funcionalidades operacionais sem decisão explícita de escopo.

As páginas institucionais e o formulário de contato apresentados no protótipo dependem de definição de conteúdo e necessidade funcional. Sua presença visual não amplia automaticamente os fluxos centrais do MVP.

## 9. Verificação e rastreabilidade

Os critérios de verificação associados aos requisitos funcionais orientam a elaboração de testes e o acompanhamento das entregas.

A rastreabilidade deve ser preservada entre requisitos, histórias de usuário, backlog e especificações.

| Área | Requisitos funcionais | Histórias | Backlog |
| --- | --- | --- | --- |
| Início e autenticação | RF-020, RF-015, RF-016, RF-017 | US-018, US-014 a US-016 | BK-019, BK-021 |
| Perfil | RF-018 | US-017 | BK-024 |
| Biblioteca e pesquisa | RF-001 a RF-005 | US-001 a US-003 | BK-004, BK-005, BK-022 |
| Detalhes e acesso | RF-006 a RF-010 | US-004 a US-008 | BK-007, BK-023 |
| Salvos | RF-012 | US-010 | BK-017 |
| Envio de materiais | RF-011 | US-009 | BK-016 |
| Acompanhamento | RF-019 | US-013 | BK-025 |
| Revisão e publicação | RF-014 | US-012 | BK-016, BK-031 |
| Compartilhamento básico | RF-013 | US-011 | BK-018 |

Os requisitos não funcionais RNF-001 a RNF-011 devem ser considerados nas entregas pertinentes, especialmente nas atividades de preparação técnica, desenvolvimento da interface, responsividade e qualidade.

A aprovação das funcionalidades dependerá de testes executados e evidências registradas, não apenas da correspondência visual com o protótipo.

## 10. Documentos relacionados

- [Product Brief](product-brief.md) — visão e proposta de valor.
- [Escopo do MVP](escopo-mvp.md) — funcionalidades e limites da primeira versão.
- [Histórias de usuário](historias-de-usuario.md) — necessidades e critérios de aceitação.
- [Backlog](backlog.md) — planejamento e dependências das entregas.
- [Especificação de busca e filtros](especificacao-busca-filtros.md) — pesquisa, filtros e comportamento dos resultados.
- [Especificação de metadados](especificacao-metadados.md) — dados, classificação e acesso aos materiais.
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md) — organização das páginas e navegação.
- [Objetivos de UX](../ux-ui/objetivos-de-ux.md) — objetivos da experiência.
- [User Flow](../ux-ui/user-flow.md) — jornadas e fluxos de interação.
- [Design System](../ux-ui/design-system.md) — identidade visual e padrões de interface.
- [Handoff de UI/UX](../ux-ui/handoff.md) — referência de implementação desktop.

---

Este documento deve ser atualizado quando houver decisões que alterem o comportamento esperado da aplicação.

Mudanças de escopo devem ser refletidas no Escopo do MVP, nas histórias de usuário e no backlog. As especificações funcionais devem acompanhar as decisões detalhadas para manter a documentação coerente durante o desenvolvimento.
