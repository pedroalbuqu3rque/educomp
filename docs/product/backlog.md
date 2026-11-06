# EduComp — Backlog do Projeto

**Versão:** 0.9  
**Data:** 06/11/2026  
**Situação:** planejamento para desenvolvimento; documentação em alinhamento final e implementação não iniciada.

## 1. Objetivo

Este backlog organiza as entregas necessárias para desenvolver a primeira versão funcional do EduComp.

Reúne atividades de produto, UX/UI, preparação técnica, implementação e qualidade, com prioridades, dependências e critérios de conclusão.

O backlog orienta a execução do projeto, mas não substitui os documentos que definem seu funcionamento.

O escopo está registrado em [Escopo do MVP](escopo-mvp.md). Os comportamentos e critérios de aceitação são detalhados em [Requisitos](requisitos.md), [Histórias de usuário](historias-de-usuario.md) e nas especificações funcionais.

## 2. Situação atual

O EduComp está na transição entre a definição do produto e o desenvolvimento.

Até o momento:

- A visão do produto, o escopo do MVP e os requisitos estão documentados, com decisões pontuais pendentes.
- A identidade visual e os protótipos desktop, mobile e tablet foram elaborados no Figma.
- O Design System e o handoff desktop passaram por atualização documental.
- A revisão de consistência entre os documentos do repositório está em andamento.
- As tecnologias, a arquitetura e os serviços da aplicação ainda precisam ser definidos.
- O desenvolvimento do frontend, backend e banco de dados não foi iniciado.
- Não foram realizados testes da aplicação nem validação com professores reais.

A existência de telas no Figma ou de funcionalidades descritas na documentação não representa implementação concluída.

### 2.1. Estratégia de desenvolvimento

A implementação será conduzida em duas etapas principais.

**Etapa 1 — Desenvolvimento desktop**

Construção da base técnica, dos componentes compartilhados e dos fluxos desktop previstos para o MVP, com integração aos serviços e persistência dos dados.

O [handoff de UI/UX](../ux-ui/handoff.md) será utilizado como referência visual.

**Etapa 2 — Responsividade e consolidação**

Adaptação dos fluxos implementados para tablet e dispositivos móveis, utilizando as referências do Figma, seguida das verificações necessárias para concluir a primeira versão funcional.

A etapa desktop é um marco intermediário de desenvolvimento. Sua conclusão não significa que o MVP esteja pronto.

Funcionalidades representadas no protótipo, mas excluídas do escopo funcional, não serão antecipadas apenas para reproduzir todas as telas.

## 3. Organização do backlog

### 3.1. Prioridades

| Prioridade | Significado |
| --- | --- |
| **P0 — Preparação necessária** | Definições e decisões que precisam estar resolvidas antes das atividades diretamente afetadas. |
| **P1 — Essencial ao MVP** | Entrega necessária para implementar, integrar ou verificar a primeira versão funcional. |
| **P2 — Complementar ao MVP** | Funcionalidade incluída no escopo, mas que pode ser implementada após a estabilização dos fluxos centrais. |
| **P3 — Evolução futura** | Pesquisa ou funcionalidade que não condiciona a primeira entrega. |

A prioridade representa importância e dependência, não uma estimativa de esforço ou prazo.

### 3.2. Situações

As atividades poderão assumir as seguintes situações:

| Situação | Significado |
| --- | --- |
| A fazer | Entrega identificada, mas ainda não iniciada. |
| Em andamento | Trabalho iniciado e ainda não finalizado. |
| Em revisão | Entrega produzida, aguardando conferência ou ajustes. |
| A verificar | Existência ou qualidade da entrega ainda precisa ser confirmada. |
| Concluído | Entrega realizada e verificada conforme seus critérios. |
| Planejado para etapa futura | Item fora da execução atual. |

As situações devem refletir o andamento real. Uma tarefa documental revisada não será considerada concluída apenas porque existe uma nova redação; é necessário conferir sua integração ao repositório.

## 4. Itens do backlog

### 4.1. Produto e especificação

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-001** | Consolidar a documentação de produto e os limites do MVP. | P0 | Em revisão |
| **BK-002** | Conferir referências, links internos e rastreabilidade documental. | P0 | Em andamento |
| **BK-003** | Resolver as decisões essenciais de negócio, acesso e permissões. | P0 | Em andamento |
| **BK-004** | Consolidar a especificação da pesquisa textual e ordenação. | P0 | Em revisão |
| **BK-005** | Consolidar a especificação dos filtros e sua interação com a pesquisa. | P0 | Em revisão |
| **BK-006** | Definir metadados, classificações e validações dos materiais. | P0 | Em revisão |
| **BK-007** | Definir as formas de acesso aos recursos e o tratamento de indisponibilidade. | P0 | Em revisão |

**Resultados esperados**

**BK-001 — Documentação de produto**

Visão, escopo, requisitos, histórias e backlog coerentes, com distinção entre funcionalidades do MVP e possibilidades futuras.

**BK-002 — Consistência documental**

Links internos válidos, nomes de arquivos atualizados, identificadores preservados e ausência de contradições relevantes entre documentos.

**BK-003 — Decisões de negócio**

Regras de acesso de visitantes, contas, permissões, submissão e moderação registradas de forma verificável.

**BK-004 — Pesquisa textual**

Campos pesquisáveis, correspondência de termos, ordenação e comportamento de consultas definidos para implementação.

**BK-005 — Filtros**

Três categorias de filtros, seleção múltipla, combinação de critérios e ações Aplicar e Limpar especificadas, incluindo fechamento sem confirmação.

**BK-006 — Metadados**

Campos obrigatórios e opcionais, classificações pedagógicas, cardinalidade, validações e tratamento dos arquivos definidos.

**BK-007 — Acesso aos materiais**

Condições de acesso por arquivo hospedado ou link externo, permissões e tratamento de recursos indisponíveis documentados.

As decisões que afetarem diretamente a implementação devem ser resolvidas antes da execução correspondente. Não é necessário encerrar todas as pendências para começar a estrutura técnica ou os componentes independentes.

### 4.2. UX/UI e prototipação

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-008** | Alinhar a arquitetura da informação ao escopo atual. | P1 | Em revisão |
| **BK-009** | Alinhar os fluxos de navegação e interação. | P1 | Em revisão |
| **BK-010** | Consolidar o Design System e os estados dos componentes. | P1 | Em revisão |
| **BK-011** | Verificar a cobertura dos wireframes e estados alternativos. | P1 | A verificar |
| **BK-012** | Conferir a consistência do protótipo desktop e suas interações. | P1 | Em revisão |
| **BK-031** | Especificar a interface mínima de revisão e moderação de materiais. | P0 | A fazer |

**Resultados esperados**

**BK-008 — Arquitetura da informação**

Áreas, páginas, navegação e pontos de entrada organizados, considerando o acesso público, as áreas autenticadas e o fluxo de revisão.

**BK-009 — User Flow**

Jornadas de entrada, descoberta, consulta, favoritos, envio, acompanhamento, perfil e moderação coerentes com o MVP.

Os caminhos de sucesso e erro necessários devem estar identificados.

**BK-010 — Design System**

Identidade visual, cores, tipografia, componentes e estados documentados conforme o Figma, com orientações para implementação.

**BK-011 — Cobertura de wireframes**

Verificação da existência dos wireframes e identificação de possíveis lacunas de navegação, estados alternativos e composição.

**BK-012 — Protótipo desktop**

Telas, menus, sobreposições e interações revisados. Funcionalidades futuras devem estar distinguidas da experiência exigida no MVP.

**BK-031 — Interface de moderação**

Definição da interface mínima utilizada pelo responsável autorizado para consultar submissões, acessar informações necessárias à análise e aprovar ou recusar materiais.

O trabalho deve incluir os estados e feedbacks correspondentes, sem pressupor a criação de um painel administrativo completo.

### 4.3. Preparação técnica e qualidade

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-014** | Definir a arquitetura e o plano inicial de implementação. | P0 | A fazer |
| **BK-015** | Planejar testes e critérios de verificação do MVP. | P0 | A fazer |
| **BK-019** | Definir autenticação, papéis e permissões mínimas. | P0 | A fazer |
| **BK-020** | Preparar frontend, backend, banco de dados e armazenamento. | P1 | A fazer |

**Resultados esperados**

**BK-014 — Arquitetura**

Stack tecnológica, organização de módulos, comunicação entre componentes, contratos de API, persistência e estratégia de disponibilização definidos.

**BK-015 — Plano de testes**

Cenários vinculados aos requisitos e histórias de usuário, contemplando fluxos principais, falhas, segurança, acessibilidade e responsividade.

**BK-019 — Autenticação e autorização**

Regras para visitantes, professores e responsáveis pela revisão, incluindo sessões, recuperação de senha e autorização por operação.

**BK-020 — Preparação do ambiente**

Estrutura dos projetos, configuração do ambiente e persistência preparadas para usuários, materiais, favoritos, submissões e suas situações.

A estratégia de armazenamento e proteção dos arquivos também deve ser considerada.

### 4.4. Fundação da interface desktop

| ID | Entrega | Prioridade | Situação | Dependências principais |
| --- | --- | --- | --- | --- |
| **BK-030** | Implementar os fundamentos visuais, componentes compartilhados e estruturas de página desktop. | P1 | A fazer | BK-010, BK-014 |

**Resultado esperado**

A aplicação deve possuir uma base de interface reutilizável, coerente com o Design System e preparada para receber os fluxos funcionais.

Esta entrega compreende:

- Configuração da fonte Inter e das variáveis visuais.
- Aplicação dos ativos de identidade.
- Estilos e estruturas globais.
- Cabeçalhos e navegação compartilhados.
- Botões, campos, seletores e controles de formulário.
- Cartões de material, filtros e elementos de feedback.
- Modais, menus e estados de carregamento.
- Estruturas reutilizáveis para as páginas internas.

Os componentes devem ser preparados para receber propriedades e dados, sem incorporar permanentemente o conteúdo ilustrativo do protótipo.

A primeira implementação deve ser comparada com o Figma na largura de referência desktop, incluindo verificações em janelas menores.

### 4.5. Implementação dos fluxos do MVP

| ID | Entrega | Prioridade | Situação | Dependências principais |
| --- | --- | --- | --- | --- |
| **BK-021** | Implementar Início, cadastro, login, recuperação de senha e saída. | P1 | A fazer | BK-014, BK-019, BK-020, BK-030 |
| **BK-022** | Implementar Biblioteca, pesquisa, filtros e navegação pelos resultados. | P1 | A fazer | BK-004, BK-005, BK-006, BK-020, BK-030 |
| **BK-023** | Implementar detalhes do material e acesso aos recursos. | P1 | A fazer | BK-006, BK-007, BK-020, BK-030 |
| **BK-017** | Implementar favoritos persistentes e área de Salvos. | P1 | A fazer | BK-021, BK-022, BK-023 |
| **BK-016** | Implementar envio de materiais e fluxo mínimo de moderação. | P1 | A fazer | BK-006, BK-019, BK-020, BK-021, BK-031 |
| **BK-025** | Implementar acompanhamento da situação dos envios. | P1 | A fazer | BK-016, BK-021 |
| **BK-024** | Implementar consulta e atualização do perfil. | P1 | A fazer | BK-021, BK-030 |
| **BK-018** | Implementar compartilhamento básico por cópia de link. | P2 | A fazer | BK-003, BK-023 |
| **BK-026** | Implementar e verificar estados de interface, acessibilidade e adaptação a janelas desktop menores. | P1 | A fazer | BK-010 e fluxos correspondentes |

**Critérios mínimos de entrega**

**BK-021 — Início e autenticação**

O usuário consegue criar uma conta, entrar, recuperar o acesso e sair. A sessão é gerenciada com segurança e os erros são tratados adequadamente.

O login com Google não integra esta entrega.

**BK-022 — Biblioteca**

A listagem consulta os materiais disponibilizados pela aplicação, permite pesquisa textual e combinação dos três filtros previstos e apresenta estados de carregamento, ausência de resultados e falha.

**BK-023 — Detalhes**

A página exibe os metadados cadastrados e oferece somente as formas de acesso existentes e autorizadas.

Comentários e outras interações da comunidade não integram esta entrega.

**BK-017 — Salvos**

O professor autenticado pode salvar e remover materiais sem duplicação, com persistência entre sessões e atualização consistente das interfaces relacionadas.

**BK-016 — Envio e moderação**

O professor envia um material com validação e recebe confirmação. A submissão não é publicada automaticamente.

Um responsável autorizado pode consultar os envios e aprovar ou recusar materiais, conforme as regras definidas.

**BK-025 — Acompanhamento**

O autor consulta a situação atual dos próprios envios e recebe informações coerentes com o processo de revisão.

**BK-024 — Perfil**

O professor consulta e atualiza as informações permitidas de sua conta, com validação, confirmação e persistência.

**BK-018 — Compartilhamento**

Um endereço válido é copiado e a interface apresenta confirmação ou falha. O destino do link deve estar definido.

**BK-026 — Estados e acessibilidade**

Os fluxos apresentam feedback adequado, navegação por teclado, foco visível, tratamento de erros e funcionamento utilizável em janelas desktop menores.

Essa atividade acompanha cada entrega e não deve ser reservada apenas para o final.

### 4.6. Responsividade, testes e disponibilização

| ID | Entrega | Prioridade | Situação | Dependências principais |
| --- | --- | --- | --- | --- |
| **BK-032** | Adaptar os fluxos do MVP para tablet e dispositivos móveis. | P1 | A fazer | BK-010, BK-026 e fluxos desktop correspondentes |
| **BK-027** | Executar testes, corrigir falhas e verificar os critérios do MVP. | P1 | A fazer | BK-015 e funcionalidades implementadas |
| **BK-028** | Disponibilizar a versão demonstrável e atualizar a documentação de entrega. | P1 | A fazer | BK-027 |

**BK-032 — Responsividade**

Adaptar navegação, formulários, cartões, filtros, menus, modais e demais interfaces do MVP às referências responsivas do Figma.

A adaptação deve preservar os comportamentos funcionais, a acessibilidade e a legibilidade dos conteúdos.

Essa tarefa representa uma etapa posterior à construção inicial desktop, mas integra os critérios de conclusão do MVP.

**BK-027 — Verificação de qualidade**

Executar os cenários previstos, registrar resultados e corrigir falhas que impeçam o atendimento dos critérios de aceitação.

A verificação final deve considerar segurança, integridade dos dados, funcionamento responsivo e acessibilidade.

**BK-028 — Disponibilização**

Disponibilizar uma versão demonstrável, com instruções de execução ou acesso, configuração, limitações conhecidas e situação real das funcionalidades.

A documentação deve distinguir o que foi efetivamente implementado daquilo que continua planejado.

### 4.7. Pesquisa e evolução futura

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-013** | Planejar avaliação da experiência com professores. | P3 | Planejado para etapa futura |
| **BK-029** | Avaliar funcionalidades posteriores ao MVP. | P3 | Planejado para etapa futura |

A avaliação com professores deverá possuir objetivos, tarefas, método de participação e registro de evidências definidos antes de sua realização.

Nenhuma conclusão sobre usuários deverá ser apresentada como resultado de pesquisa sem que essa pesquisa tenha ocorrido.

As possibilidades de evolução incluem:

- Login com Google.
- Central de notificações.
- Comentários, relatos de aplicação, respostas e denúncias.
- Perfis públicos ampliados.
- Compartilhamento integrado com redes sociais.
- Visualização interna de arquivos.
- Coleções personalizadas.
- Colaboração entre professores.
- Recomendações de materiais.

Essas funcionalidades não fazem parte dos compromissos da primeira versão funcional.

## 5. Sequência recomendada de execução

A ordem abaixo considera as dependências e a estratégia de desenvolvimento desktop. Não representa um cronograma fechado.

### Etapa 0 — Alinhamento documental

**Itens:** BK-001 a BK-012, conforme aplicável, e BK-031 para o fluxo de moderação.

Concluir as revisões documentais necessárias, resolver decisões funcionais prioritárias e conferir a consistência entre produto e UX/UI.

Não é necessário antecipar todas as decisões futuras. Pendências específicas devem ser resolvidas antes da implementação diretamente afetada.

### Etapa 1 — Preparação técnica

**Itens:** BK-014, BK-015, BK-019 e BK-020.

Definir arquitetura, tecnologias, serviços, dados, autenticação, autorização e ambiente de desenvolvimento.

Preparar a estrutura inicial do projeto e os critérios de verificação.

### Etapa 2 — Fundação desktop

**Item principal:** BK-030.

Construir os fundamentos visuais e componentes compartilhados, utilizando o Design System e o handoff como referência.

Preparar a navegação e as estruturas que serão reutilizadas nas páginas.

### Etapa 3 — Fluxos desktop

**Itens:** BK-021, BK-022, BK-023, BK-017, BK-016, BK-025, BK-024 e BK-018.

Implementar os fluxos do MVP e suas integrações.

A ordem interna pode ser ajustada conforme as dependências técnicas identificadas durante o desenvolvimento.

O item BK-026 deverá acompanhar essa etapa, garantindo feedback, acessibilidade e consistência da interface.

### Etapa 4 — Responsividade

**Item principal:** BK-032.

Adaptar os fluxos funcionais para os tamanhos de tela previstos, utilizando as referências mobile e tablet do Figma.

Corrigir problemas de composição, navegação e interação identificados durante a adaptação.

### Etapa 5 — Verificação e entrega

**Itens:** BK-027 e BK-028.

Executar a verificação final dos requisitos, corrigir falhas relevantes e preparar a versão demonstrável.

Testes devem ocorrer ao longo do desenvolvimento, não somente nesta etapa.

## 6. Decisões pendentes

| Tema | Decisão necessária | Itens afetados |
| --- | --- | --- |
| Acesso | Permissões de visitantes, exigência de autenticação e e-mail institucional. | BK-003, BK-019, BK-021 |
| Autenticação | Política de senhas, sessões e recuperação de acesso. | BK-019, BK-021 |
| Pesquisa | Correspondência de termos, relevância e ordenação. | BK-004, BK-022 |
| Filtros | Fechamento sem aplicar, limpeza e opções sem resultados. | BK-005, BK-022 |
| Navegação dos resultados | Paginação ou carregamento progressivo. | BK-004, BK-022 |
| Metadados | Campos obrigatórios, classificações e regras de cadastro. | BK-006, BK-016, BK-022, BK-023 |
| Arquivos | Formatos, tamanho máximo, armazenamento e acesso. | BK-006, BK-007, BK-016, BK-023 |
| Moderação | Papéis, estados, transições, critérios de decisão e interface mínima. | BK-003, BK-016, BK-019, BK-025, BK-031 |
| Compartilhamento | Definição do endereço que será copiado. | BK-018 |
| Perfil | Regras para foto, campos e exposição de dados pessoais. | BK-024 |
| Tecnologia | Stack, arquitetura, contratos de API, persistência e implantação. | BK-014, BK-020 |
| Responsividade | Breakpoints e adaptação dos componentes. | BK-026, BK-032 |
| Qualidade | Cenários de teste e critérios verificáveis. | BK-015, BK-027 |

Cada decisão deve ser registrada no documento correspondente e refletida nos itens afetados.

## 7. Rastreabilidade funcional

| Área | Backlog | Histórias de usuário | Requisitos funcionais |
| --- | --- | --- | --- |
| Início e autenticação | BK-019, BK-021 | US-014 a US-016, US-018 | RF-015 a RF-017, RF-020 |
| Biblioteca, pesquisa e filtros | BK-022 | US-001 a US-003 | RF-001 a RF-005 |
| Detalhes e acesso | BK-023 | US-004 a US-008 | RF-006 a RF-010 |
| Salvos | BK-017 | US-010 | RF-012 |
| Envio e revisão | BK-016, BK-025, BK-031 | US-009, US-012, US-013 | RF-011, RF-014, RF-019 |
| Perfil | BK-024 | US-017 | RF-018 |
| Compartilhamento básico | BK-018 | US-011 | RF-013 |

Os requisitos não funcionais **RNF-001 a RNF-011** se aplicam às entregas pertinentes, especialmente aos itens de preparação técnica, fundação, acessibilidade, responsividade e testes.

A rastreabilidade permite localizar os critérios detalhados sem reproduzi-los integralmente neste backlog.

## 8. Critérios para conclusão dos itens

Uma atividade só deverá ser marcada como **Concluída** quando sua entrega puder ser verificada.

### 8.1. Documentação

- Conteúdo revisado e integrado ao repositório.
- Links e referências consistentes.
- Decisões registradas e pendências identificadas.
- Ausência de contradições relevantes com os documentos relacionados.

### 8.2. UX/UI

- Artefato ou especificação produzido.
- Correspondência com o escopo funcional.
- Estados e interações pertinentes conferidos.
- Limitações e decisões pendentes registradas.

### 8.3. Implementação

- Comportamento desenvolvido e integrado aos serviços necessários.
- Dados persistidos quando previsto.
- Permissões e validações aplicadas.
- Estados de sucesso, carregamento e falha tratados.
- Critérios de aceitação correspondentes atendidos.

### 8.4. Qualidade

- Cenários de teste executados.
- Resultados registrados.
- Falhas impeditivas corrigidas.
- Critérios de acessibilidade e responsividade verificados conforme o escopo da entrega.

A conclusão de uma etapa não substitui a verificação das demais.

A construção das telas desktop, por exemplo, não representa a entrega do MVP enquanto ainda houver fluxos funcionais, integrações ou requisitos responsivos pendentes.

## 9. Manutenção do backlog

Este backlog deverá ser atualizado quando houver alteração de prioridade, situação, dependência ou escopo.

Os identificadores existentes devem ser preservados para manter a rastreabilidade. Novas entregas deverão receber novos identificadores, sem renumerar itens anteriores.

Mudanças relevantes de funcionalidades precisam ser refletidas primeiro no escopo e nos requisitos, com posterior atualização das histórias de usuário e das tarefas correspondentes.

A execução pode ser reorganizada conforme o desenvolvimento revelar novas dependências. Entretanto, funcionalidades futuras não devem ser incluídas silenciosamente no MVP.

## 10. Documentos relacionados

- [Product Brief](product-brief.md) — visão e proposta de valor.
- [Escopo do MVP](escopo-mvp.md) — funcionalidades incluídas e limites da primeira versão.
- [Requisitos](requisitos.md) — requisitos funcionais e não funcionais.
- [Histórias de usuário](historias-de-usuario.md) — necessidades e critérios de aceitação.
- [Especificação de busca e filtros](especificacao-busca-filtros.md) — pesquisa, filtros e comportamento dos resultados.
- [Especificação de metadados](especificacao-metadados.md) — classificação e informações dos materiais.
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md) — organização da navegação.
- [Objetivos de UX](../ux-ui/objetivos-de-ux.md) — objetivos de experiência.
- [User Flow](../ux-ui/user-flow.md) — jornadas e fluxos de interação.
- [Design System](../ux-ui/design-system.md) — fundamentos visuais e componentes.
- [Handoff de UI/UX](../ux-ui/handoff.md) — referência para implementação desktop.
