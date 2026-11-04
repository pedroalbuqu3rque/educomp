# EduComp — Backlog do Projeto

**Versão:** 0.8  
**Data:** 04/11/2026  
**Status:** Preparação para desenvolvimento; documentação em revisão e protótipo visual elaborado.

## 1. Objetivo

Este backlog organiza o trabalho necessário para transformar a proposta do EduComp em uma primeira versão funcional. Reúne atividades de especificação, UX/UI, preparação técnica, implementação e verificação de qualidade, com prioridades, situação atual e dependências.

O escopo das funcionalidades é definido em [`escopo-mvp.md`](escopo-mvp.md); os comportamentos e critérios de aceitação são detalhados em [`requisitos.md`](requisitos.md), [`historias-de-usuario.md`](historias-de-usuario.md) e nas especificações funcionais. O backlog não substitui esses documentos.

## 2. Situação atual

- A visão do produto e o escopo da primeira versão estão documentados, com decisões ainda pendentes.
- O protótipo visual contém as telas principais, menus e sobreposições. A navegação e parte das interações ainda precisam de revisão.
- A documentação de produto e UX/UI está sendo atualizada para representar a versão atual da experiência.
- As tecnologias, a arquitetura, o banco de dados e a estratégia de armazenamento ainda não foram definidos.
- Frontend, backend e testes de software ainda não foram iniciados.
- Não foi realizada validação com professores reais.

**Princípio de acompanhamento:** uma funcionalidade desenhada no protótipo ou descrita em um documento não deve ser marcada como implementada.

## 3. Organização e critérios de prioridade

| Prioridade | Significado |
|---|---|
| **P0 — Preparação necessária** | Decisões e definições que precisam estar suficientemente resolvidas antes da implementação afetada. |
| **P1 — Entrega essencial** | Trabalho necessário para construir, integrar e verificar os fluxos principais do MVP. |
| **P2 — Complemento da entrega** | Recurso previsto no MVP que pode ser implementado após a estabilização dos fluxos centrais. |
| **P3 — Evolução futura** | Pesquisa ou funcionalidades que não condicionam a entrega inicial. |

**Situações utilizadas:** `A fazer`, `Em andamento`, `Em revisão`, `A verificar`, `Concluído` e `Planejado para etapa futura`. A prioridade indica importância e dependência, não uma data nem uma estimativa de esforço.

## 4. Itens do backlog

### 4.1. Produto e especificação

| ID | Entrega | Prioridade | Situação |
|---|---|---|---|
| **BK-001** | Consolidar a documentação de produto e seus limites de escopo. | P0 | Em andamento |
| **BK-002** | Conferir links, nomes de arquivos e rastreabilidade entre documentos. | P0 | A fazer |
| **BK-003** | Registrar e resolver decisões essenciais de negócio e acesso. | P0 | Em andamento |
| **BK-004** | Revisar a especificação da busca textual e da ordenação. | P0 | Em revisão |
| **BK-005** | Revisar a especificação dos filtros e sua interação com a busca. | P0 | Em revisão |
| **BK-006** | Consolidar os metadados, classificações e validações dos materiais. | P0 | Em revisão |
| **BK-007** | Definir as formas de acesso aos recursos e o tratamento de indisponibilidade. | P0 | Em revisão |

**Resultados esperados:**

- **BK-001:** visão, MVP, requisitos, histórias e backlog coerentes, sem apresentar hipóteses como resultados comprovados.
- **BK-002:** links internos válidos, identificadores únicos e referências cruzadas verificáveis após as revisões dos arquivos.
- **BK-003:** regras de visitantes, contas, submissões, moderação e permissões registradas ou delimitadas como pendências impeditivas.
- **BK-004:** campos pesquisáveis, correspondência de termos, ordenação e estados sem resultados definidos para implementação e teste.
- **BK-005:** três categorias de filtros, seleção múltipla, combinação de critérios e ações **Aplicar** e **Limpar** especificadas, inclusive o fechamento sem confirmação.
- **BK-006:** campos obrigatórios e opcionais, conceito de tema, taxonomias, cardinalidade, arquivos e limites definidos ou com decisões explicitamente atribuídas.
- **BK-007:** acesso a arquivos e/ou links externos, permissões, estados sem acesso e falhas identificáveis descritos de forma verificável.

### 4.2. UX/UI e prototipação

| ID | Entrega | Prioridade | Situação |
|---|---|---|---|
| **BK-008** | Atualizar a arquitetura da informação. | P1 | Em revisão |
| **BK-009** | Atualizar os fluxos de navegação e interação. | P1 | Em revisão |
| **BK-010** | Consolidar o design system e os estados dos componentes. | P1 | Em revisão |
| **BK-011** | Verificar os wireframes e a cobertura de estados alternativos. | P1 | A verificar |
| **BK-012** | Revisar e concluir a consistência do protótipo navegável. | P1 | Em revisão |

**Resultados esperados:**

- **BK-008:** áreas, páginas, menus e pontos de entrada organizados, incluindo ações de usuários autenticados e visitantes.
- **BK-009:** jornadas de entrada, descoberta, detalhes, favoritos, envio, perfil e revisão representadas, com caminhos de sucesso e erro pertinentes.
- **BK-010:** cores, estilos, componentes, estados, responsividade e acessibilidade documentados de maneira consistente.
- **BK-011:** existência dos wireframes verificada e lacunas de estados vazios, carregamento, erros e telas menores identificadas; não presumir sua conclusão pela existência de telas visuais.
- **BK-012:** navegação e sobreposições revisadas no modo de apresentação, ações demonstrativas identificadas e inconsistências de interação corrigidas ou registradas.

### 4.3. Preparação técnica e planejamento de qualidade

| ID | Entrega | Prioridade | Situação |
|---|---|---|---|
| **BK-014** | Definir a arquitetura e o plano inicial de implementação. | P0 | A fazer |
| **BK-015** | Planejar testes e critérios de verificação do MVP. | P0 | A fazer |
| **BK-019** | Definir autenticação, papéis e permissões mínimas. | P0 | A fazer |
| **BK-020** | Preparar frontend, backend, banco de dados e armazenamento. | P1 | A fazer |

**Resultados esperados:**

- **BK-014:** stack, arquitetura, organização de módulos, contratos de API, estratégia de implantação e dependências técnicas documentadas.
- **BK-015:** cenários de teste vinculados às histórias e requisitos, cobrindo fluxos principais, erros, segurança, responsividade e acessibilidade.
- **BK-019:** regras para visitantes, professores e responsáveis pela moderação; cadastro, sessões, recuperação de senha e autorização por operação.
- **BK-020:** projetos e persistência preparados para usuários, materiais, favoritos, submissões e suas situações; armazenamento e proteção de arquivos considerados.

### 4.4. Implementação do MVP

| ID | Entrega | Prioridade | Situação | Dependências principais |
|---|---|---|---|---|
| **BK-021** | Implementar Início, cadastro, login, recuperação de senha e saída. | P1 | A fazer | BK-014, BK-019, BK-020 |
| **BK-022** | Implementar Biblioteca, pesquisa, ordenação, filtros e estados de resultados. | P1 | A fazer | BK-004, BK-005, BK-006, BK-020 |
| **BK-023** | Implementar detalhes do material e acesso aos recursos. | P1 | A fazer | BK-006, BK-007, BK-020 |
| **BK-017** | Implementar favoritos persistentes e área de Salvos. | P1 | A fazer | BK-021, BK-022, BK-023 |
| **BK-016** | Implementar envio de materiais e fluxo mínimo de moderação. | P1 | A fazer | BK-006, BK-019, BK-020, BK-021 |
| **BK-025** | Implementar acompanhamento da situação dos materiais enviados. | P1 | A fazer | BK-016, BK-021 |
| **BK-024** | Implementar consulta e edição do perfil do professor. | P1 | A fazer | BK-021 |
| **BK-018** | Implementar cópia de link compartilhável com feedback. | P2 | A fazer | BK-003, BK-023 |
| **BK-026** | Aplicar e verificar estados de interface, responsividade e acessibilidade ao longo das entregas. | P1 | A fazer | BK-010 e funcionalidades correspondentes |
| **BK-027** | Executar testes, corrigir falhas e verificar os critérios do MVP. | P1 | A fazer | BK-015 e funcionalidades implementadas |
| **BK-028** | Disponibilizar a versão demonstrável e atualizar a documentação de entrega. | P1 | A fazer | BK-027 |

**Critérios mínimos de entrega:**

- **BK-021:** o usuário consegue criar conta, entrar, recuperar acesso e sair; sessões e erros são tratados com segurança.
- **BK-022:** a Biblioteca consulta dados reais, combina pesquisa e três filtros, e apresenta carregamento, ausência de resultados e falhas.
- **BK-023:** a tela exibe metadados cadastrados e oferece somente acessos existentes e autorizados.
- **BK-017:** o usuário autenticado salva e remove favoritos sem duplicação, com persistência entre sessões.
- **BK-016:** o professor envia material com validação; a submissão não é publicada automaticamente; um responsável autorizado pode aprovar ou recusar. A interface mínima de revisão ainda precisa ser definida.
- **BK-025:** o autor consegue consultar a situação atual dos próprios envios, conforme o fluxo de revisão definido.
- **BK-024:** alterações permitidas de perfil, foto e senha são validadas, confirmadas e persistidas.
- **BK-018:** o endereço correto é copiado e a interface confirma sucesso ou falha; o destino do link precisa ser decidido.
- **BK-026:** os fluxos funcionam em tamanhos de tela previstos, por teclado, com foco identificável e feedback adequado. Essa atividade acompanha cada implementação; não deve ser deixada apenas para o final.
- **BK-027:** os critérios de aceitação pertinentes são testados e as falhas impeditivas da entrega estão resolvidas.
- **BK-028:** existe versão utilizável ou demonstrável, com instruções de acesso, configuração, limitações conhecidas e estado real de implementação registrados.

### 4.5. Pesquisa e evolução

| ID | Entrega | Prioridade | Situação |
|---|---|---|---|
| **BK-013** | Planejar uma avaliação com professores. | P3 | Planejado para etapa futura |
| **BK-029** | Avaliar funcionalidades posteriores ao MVP. | P3 | Planejado para etapa futura |

A avaliação com professores deverá ter objetivos, tarefas, método de recrutamento e registro de evidências definidos antes de qualquer coleta. Nenhum resultado deve ser apresentado como real antes de sua realização.

Como possíveis evoluções, poderão ser avaliados login com Google, notificações completas, compartilhamento integrado com redes sociais, visualização interna de arquivos, coleções personalizadas, colaboração e recomendações de materiais. Esses recursos **não compõem os compromissos da primeira entrega**.

## 5. Sequência sugerida de execução

A ordem abaixo organiza dependências, sem estabelecer datas ou estimativas ainda não definidas:

1. **Fechamento funcional:** concluir BK-001, BK-003 a BK-007 e revisar BK-008 a BK-012; executar BK-002 após as alterações documentais.
2. **Preparação técnica:** concluir BK-014, BK-015 e BK-019; decidir arquitetura, dados, serviços, permissões e contratos.
3. **Fundação e acesso:** executar BK-020 e BK-021.
4. **Descoberta e consulta:** executar BK-022 e BK-023; em seguida, BK-017.
5. **Contribuição e conta:** executar BK-016, BK-025 e BK-024; integrar BK-018.
6. **Qualidade e disponibilização:** aplicar BK-026 durante todo o desenvolvimento, executar BK-027 e então BK-028.

As etapas podem ocorrer parcialmente em paralelo quando não houver dependências impeditivas. A ordem entre funcionalidades poderá ser ajustada após estimativa técnica.

## 6. Pendências que afetam a implementação

| Tema | Decisão a registrar | Itens afetados |
|---|---|---|
| Acesso | O que visitantes podem consultar; obrigatoriedade de e-mail institucional; política de senha. | BK-003, BK-019, BK-021 |
| Busca | Representação de tema, correspondência de termos, relevância e ordenação. | BK-004, BK-022 |
| Filtros | Fechamento sem aplicar, alcance de Limpar e comportamento de opções sem resultados. | BK-005, BK-022 |
| Metadados | Campos, taxonomias definitivas, múltiplas classificações e tratamento de modalidades não exibidas nos filtros. | BK-006, BK-016, BK-022, BK-023 |
| Recursos | Arquivos hospedados, links externos ou ambos; formatos, quantidade, limites e direitos de uso. | BK-006, BK-007, BK-016, BK-023 |
| Moderação | Papéis, critérios de decisão, transições de situação, justificativas e interface mínima de revisão. | BK-003, BK-016, BK-019, BK-025 |
| Compartilhamento | Definir se a URL copiada aponta para a plataforma, um material ou ambos. | BK-018 |
| Tecnologia e qualidade | Stack, armazenamento, segurança, contratos, critérios mensuráveis e ambiente de demonstração. | BK-014, BK-015, BK-020, BK-026, BK-027, BK-028 |

Uma decisão pendente deve ser resolvida antes da implementação que dependa diretamente dela, sem impedir o avanço independente de outras tarefas.

## 7. Rastreabilidade funcional

| Área | Backlog de implementação | Histórias de usuário | Requisitos funcionais |
|---|---|---|---|
| Início e autenticação | BK-019, BK-021 | US-014 a US-016, US-018 | RF-015 a RF-017, RF-020 |
| Biblioteca, busca e filtros | BK-022 | US-001 a US-003 | RF-001 a RF-005 |
| Detalhes e acesso | BK-023 | US-004 a US-008 | RF-006 a RF-010 |
| Salvos | BK-017 | US-010 | RF-012 |
| Envio e revisão | BK-016, BK-025 | US-009, US-012, US-013 | RF-011, RF-014, RF-019 |
| Perfil | BK-024 | US-017 | RF-018 |
| Compartilhamento básico | BK-018 | US-011 | RF-013 |

Os requisitos não funcionais (`RNF-001` a `RNF-011`) se aplicam às entregas pertinentes e são considerados principalmente em BK-015, BK-026 e BK-027. Os critérios detalhados de aceite permanecem nas histórias e especificações, evitando duplicação neste backlog.

## 8. Regra de atualização e conclusão

O backlog deverá ser atualizado quando um item mudar de situação, prioridade, dependência ou escopo. Um item será marcado como **Concluído** apenas quando sua entrega correspondente puder ser verificada:

- **Documentação:** conteúdo revisado, decisões ou pendências explícitas e referências consistentes.
- **UX/UI:** artefato produzido, fluxos conferidos e eventuais limitações registradas.
- **Implementação:** comportamento integrado a dados e serviços reais, com critérios de aceitação atendidos.
- **Qualidade:** evidências de execução de testes e tratamento das falhas relevantes.

A criação de uma tela, o registro de uma intenção ou a redação de um requisito não equivalem à entrega de uma funcionalidade implementada. Mudanças importantes de escopo devem ser refletidas nos documentos de produto antes de replanejar os itens associados.

## 9. Documentos relacionados

- [`product-brief.md`](product-brief.md) — visão e proposta de valor.
- [`escopo-mvp.md`](escopo-mvp.md) — limites da primeira versão.
- [`requisitos.md`](requisitos.md) — requisitos funcionais e não funcionais.
- [`historias-de-usuario.md`](historias-de-usuario.md) — histórias e critérios de aceitação.
- [`especificacao-funcional-bk-004-bk-005.md`](especificacao-funcional-bk-004-bk-005.md) — especificação atual de busca e filtros, a revisar.
- [`especificacao-funcional-bk-006-metadados.md`](especificacao-funcional-bk-006-metadados.md) — especificação atual de metadados, a revisar.
- [`../ux-ui/arquitetura-da-informacao.md`](../ux-ui/arquitetura-da-informacao.md) — estrutura da navegação.
- [`../ux-ui/user-flow.md`](../ux-ui/user-flow.md) — fluxos de uso.
- [`../ux-ui/design-system.md`](../ux-ui/design-system.md) — padrões visuais e de interação.

Os dois arquivos de especificação funcional serão revisados separadamente. Seus nomes poderão ser simplificados para refletir os assuntos tratados; até essa alteração, os links acima preservam os caminhos existentes no repositório.
