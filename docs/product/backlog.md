# EduComp — Backlog

**Atualizado em:** 07/11/2026  
**Situação:** planejamento e revisão dos protótipos; desenvolvimento não iniciado.

## 1. Como usar este backlog

Este arquivo organiza o trabalho necessário para desenvolver o EduComp. Cada item tem um código fixo (`BK`), uma prioridade e uma situação. Os requisitos e critérios de aceitação estão nos documentos específicos; aqui ficam as entregas a acompanhar.

| Prioridade | Significado |
| --- | --- |
| **P0** | Resolver antes de começar a implementação afetada. |
| **P1** | Necessário para concluir o MVP. |
| **P2** | Complementar à entrega, sem bloquear o desenvolvimento dos fluxos principais. |
| **P3** | Evolução futura, fora do MVP. |

As situações usadas são **A fazer**, **Em andamento**, **Em revisão**, **A verificar**, **Concluído** e **Planejado para etapa futura**. Uma entrega só passa a Concluído depois de ser conferida; a existência de uma tela no Figma ou de uma descrição no repositório não basta.

## 2. Situação atual

As 88 decisões do checklist de produto foram respondidas. A documentação está sendo atualizada para refletir essas escolhas, e o Figma ainda precisa de alguns ajustes, principalmente no envio de materiais e na moderação.

A aplicação ainda não foi implementada ou testada. O desenvolvimento começará pelo desktop; tablet e celular fazem parte da entrega do MVP, não de uma versão posterior.

## 3. Produto e UX/UI

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-001** | Consolidar os documentos de produto de acordo com o MVP definido. | P0 | Em revisão |
| **BK-002** | Conferir links, códigos e consistência entre os documentos. | P0 | Em andamento |
| **BK-003** | Incorporar as decisões de acesso, permissões e revisão às especificações. | P0 | Em andamento |
| **BK-004** | Finalizar os detalhes da pesquisa, ordenação e paginação. | P0 | Em revisão |
| **BK-005** | Consolidar os filtros e os comportamentos de Aplicar, Limpar e fechar. | P0 | Em revisão |
| **BK-006** | Ajustar os metadados: tags livres, classificações múltiplas, anos/séries e arquivos. | P0 | Em revisão |
| **BK-007** | Especificar acesso autenticado aos arquivos e tratamento de indisponibilidade. | P0 | Em revisão |
| **BK-008** | Atualizar a arquitetura da informação conforme o acesso público e as áreas restritas. | P1 | Em revisão |
| **BK-009** | Atualizar os fluxos de navegação, envio, acompanhamento e revisão. | P1 | Em revisão |
| **BK-010** | Consolidar componentes, estados e tokens visuais do Design System. | P1 | Em revisão |
| **BK-011** | Verificar lacunas nos wireframes e estados de interface; criar apenas o que faltar. | P1 | A verificar |
| **BK-012** | Revisar o protótipo desktop e adequar os formulários ao MVP. | P1 | Em revisão |
| **BK-031** | Desenhar a área restrita de moderação, com lista, detalhes e decisões. | P0 | A fazer |

**Ajustes prioritários no Figma:** acrescentar Tema / palavras-chave, permitir vários tipos, etapas e eixos, relacionar anos/séries às etapas selecionadas, aceitar vários arquivos e desenhar a interface mínima do revisor. As ações fora do MVP não devem aparecer como funcionais.

## 4. Preparação técnica

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-014** | Definir o framework React, a organização do backend e os serviços de hospedagem. | P0 | A fazer |
| **BK-015** | Preparar o plano de testes e as verificações automáticas do projeto. | P0 | A fazer |
| **BK-019** | Escolher a autenticação e implementar o modelo de papéis e permissões. | P0 | A fazer |
| **BK-020** | Preparar a aplicação, o PostgreSQL, o armazenamento, as migrations e os dados de demonstração. | P1 | A fazer |
| **BK-030** | Implementar a base visual desktop e os componentes compartilhados. | P1 | A fazer |

As escolhas de base já estão encaminhadas: **React com TypeScript**, backend integrado ao framework, **PostgreSQL**, APIs HTTP/REST, armazenamento de objetos, repositório único e hospedagem gerenciada. Ainda faltam os fornecedores e bibliotecas específicos.

O ambiente deverá usar variáveis de configuração, migrations e dados de demonstração reproduzíveis. A qualidade mínima inclui lint, formatação, checagem de tipos e testes no CI. As permissões devem ser validadas no servidor; a interface, sozinha, não protege dados ou arquivos.

## 5. Funcionalidades do MVP

| ID | Entrega | Prioridade | Situação | Dependências principais |
| --- | --- | --- | --- | --- |
| **BK-021** | Implementar Início, cadastro, login, recuperação de senha e saída. | P1 | A fazer | BK-019, BK-020, BK-030 |
| **BK-022** | Implementar Biblioteca, pesquisa, filtros, ordenação e paginação. | P1 | A fazer | BK-004, BK-005, BK-006, BK-020, BK-030 |
| **BK-023** | Implementar detalhes dos materiais e acesso autorizado aos arquivos. | P1 | A fazer | BK-006, BK-007, BK-019, BK-020 |
| **BK-017** | Implementar favoritos persistentes e a área Salvos. | P1 | A fazer | BK-021, BK-022, BK-023 |
| **BK-016** | Implementar o envio de materiais e a revisão antes da publicação. | P1 | A fazer | BK-006, BK-019, BK-020, BK-031 |
| **BK-025** | Implementar Meus envios, com situação atual e justificativa de recusa. | P1 | A fazer | BK-016, BK-021 |
| **BK-024** | Implementar consulta e edição de nome, foto e senha no perfil. | P1 | A fazer | BK-021 |
| **BK-018** | Implementar a cópia do link da página inicial, com feedback e rótulo claro. | P2 | A fazer | BK-030 |
| **BK-026** | Tratar carregamento, erros, estados vazios, teclado e acessibilidade nas telas. | P1 | A fazer | BK-010 e fluxos correspondentes |

As entregas acima devem seguir as regras já documentadas. Alguns pontos que afetam diretamente a implementação merecem atenção:

- **Biblioteca (BK-022):** pesquisar título e tags; aplicar os três filtros; oferecer ordenação por mais recentes ou título; paginar de 12 em 12; manter os critérios na URL.
- **Detalhes (BK-023):** permitir consulta pública, mas exigir login para abrir arquivos. Não haverá links externos no MVP.
- **Envio e revisão (BK-016):** aceitar classificações e arquivos múltiplos, com até **20 MB por arquivo**. A submissão começa como Pendente e pode passar a Em análise, Aprovado ou Recusado. A recusa exige justificativa.
- **Moderação (BK-016/BK-031):** somente pessoas autorizadas revisam, editam materiais publicados ou os retiram de circulação. Despublicar não significa recusar.
- **Salvos (BK-017):** não terá pesquisa nem filtros próprios nesta versão.

## 6. Responsividade, validação e entrega

| ID | Entrega | Prioridade | Situação | Dependências principais |
| --- | --- | --- | --- | --- |
| **BK-032** | Adaptar todos os fluxos do MVP para tablet e celular. | P1 | A fazer | Fluxos desktop e BK-026 |
| **BK-027** | Executar testes, corrigir falhas e verificar os critérios do MVP. | P1 | A fazer | BK-015 e fluxos implementados |
| **BK-013** | Realizar testes moderados de tarefas com um pequeno grupo de professores e registrar os resultados. | P2 | A fazer | Protótipo ou versão funcional adequada aos testes |
| **BK-028** | Publicar a demonstração, preparar dados autorizados e documentar o que foi entregue. | P1 | A fazer | BK-027, BK-032 |

A verificação deverá abranger testes unitários, integração dos fluxos críticos e um teste ponta a ponta das jornadas principais. A acessibilidade terá a **WCAG 2.2 AA** como referência, com testes manuais. Também serão verificados navegadores atuais (Chrome, Firefox, Edge e Safari), tamanhos de tela e métricas de desempenho definidas antes dos testes.

Os testes com professores ainda não aconteceram. Seus resultados só deverão ser apresentados no portfólio depois de realizados. Para a demonstração pública, serão necessários Termos de uso, Política de privacidade, um meio de contato e regras de tratamento de dados compatíveis com o funcionamento escolhido.

## 7. Depois do MVP

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| **BK-029** | Avaliar funcionalidades para versões posteriores, a partir do uso e dos aprendizados do projeto. | P3 | Planejado para etapa futura |

Entre as possibilidades estão login com Google, links externos para materiais, comentários, notificações, relatos de aplicação, coleções e outras funcionalidades de comunidade. Nenhuma delas será implementada apenas porque aparece no protótipo.

## 8. Ordem sugerida de trabalho

1. **Concluir a revisão documental e do Figma:** BK-001 a BK-012 e BK-031, conforme a necessidade de cada fluxo.
2. **Preparar a base técnica:** BK-014, BK-015, BK-019, BK-020 e BK-030.
3. **Desenvolver as funcionalidades desktop:** BK-021, BK-022, BK-023, BK-017, BK-016, BK-025, BK-024 e BK-018. O BK-026 acompanha a implementação.
4. **Adaptar e verificar:** BK-032 e BK-027, com testes durante o desenvolvimento, não apenas no final.
5. **Avaliar e publicar:** executar o BK-013 quando houver uma versão adequada para os testes e preparar o BK-028.

Não há datas ou estimativas de esforço definidas. A ordem poderá mudar quando surgirem dependências técnicas reais.

## 9. Pendências para as próximas etapas

- [ ] Fechar os detalhes de busca: data de ordenação, desempate, termos entre título e tags e parâmetros da URL (**BK-004**).
- [ ] Definir limites de campos e tags, associação de anos/séries e quantidade total de arquivos por material (**BK-006**).
- [ ] Definir as verificações de segurança do upload múltiplo (**BK-007**, **BK-016**, **BK-020**).
- [ ] Desenhar o fluxo de revisão e esclarecer a edição/despublicação por responsáveis autorizados (**BK-031**).
- [ ] Escolher framework, autenticação, armazenamento e hospedagem concretos (**BK-014**, **BK-019**, **BK-020**).
- [ ] Definir metas de desempenho e preparar os cenários de teste (**BK-015**).

Essas pendências não impedem iniciar tarefas independentes. Devem ser resolvidas antes da funcionalidade correspondente.

## 10. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [User Flow](../ux-ui/user-flow.md)
- [Design System](../ux-ui/design-system.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
