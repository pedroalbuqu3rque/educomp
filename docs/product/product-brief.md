# EduComp — Product Brief

**Versão:** 0.7  
**Data:** 07/11/2026  
**Status:** Visão do produto documentada; preparação para desenvolvimento  

## 1. Visão do produto

O **EduComp** é uma proposta de plataforma digital voltada a professores da Educação Básica, com foco na descoberta, consulta, organização e compartilhamento de materiais pedagógicos relacionados à Computação.

A plataforma pretende reunir recursos educacionais em uma Biblioteca organizada, permitindo que os professores encontrem materiais, compreendam suas características, acessem os conteúdos disponíveis e salvem itens de interesse para consultas futuras. Também prevê a contribuição de materiais pelos próprios professores, mediante revisão antes da publicação.

A proposta busca apoiar o planejamento e a realização de atividades de ensino, preservando a autonomia do professor na escolha e adaptação dos recursos ao seu contexto.

## 2. Contexto e problema

O ensino de Computação na Educação Básica envolve diferentes conteúdos, etapas de ensino e eixos de conhecimento. Nesse contexto, professores podem precisar consultar diversas fontes para localizar materiais adequados aos temas e às necessidades de suas aulas.

O EduComp parte da **hipótese** de que a dispersão dos recursos e a dificuldade de comparar suas características podem tornar essa busca mais trabalhosa. Uma Biblioteca com pesquisa, filtros e informações descritivas é proposta como uma possível forma de facilitar esse processo.

**Essa hipótese ainda não foi validada com professores reais.** Não há, nesta etapa, evidências de pesquisa que permitam afirmar a frequência ou a intensidade do problema, nem comprovar os benefícios da solução.

## 3. Público-alvo

### Público prioritário

**Professores da Educação Básica que buscam materiais pedagógicos para o ensino de Computação.**

O produto considera especialmente situações em que o professor precisa:

- Localizar recursos relacionados a temas, etapas de ensino e eixos da Computação.
- Consultar informações para avaliar a pertinência de um material antes de utilizá-lo.
- Retomar materiais selecionados anteriormente.
- Compartilhar uma contribuição com a Biblioteca para possível disponibilização a outros professores.

### Público secundário potencial

Outras pessoas envolvidas no planejamento de aulas, oficinas e atividades educacionais poderão se beneficiar da plataforma. Esse público não é prioritário na primeira versão e ainda requer avaliação específica.

A operação do acervo também demandará **responsáveis autorizados pela revisão de materiais submetidos**. Esse papel integra o funcionamento do MVP, embora suas permissões e sua interface ainda precisem de definição.

## 4. Objetivos do produto

### Objetivo principal

**Facilitar a descoberta, a avaliação inicial e o acesso a materiais pedagógicos de Computação para professores da Educação Básica.**

### Objetivos específicos

- Organizar o acervo de modo que os materiais possam ser encontrados por pesquisa e filtros.
- Apresentar informações claras sobre cada recurso e suas possibilidades de acesso.
- Permitir que professores organizem referências de interesse por meio de materiais salvos.
- Viabilizar a contribuição de materiais para o acervo, com revisão antes da publicação.
- Oferecer uma experiência compreensível, consistente, responsiva e acessível.

Esses objetivos descrevem resultados pretendidos, não resultados já alcançados.

## 5. Proposta de valor

O EduComp propõe **um ponto de acesso organizado a materiais pedagógicos de Computação**, combinando descoberta, consulta e organização pessoal de recursos.

A experiência busca oferecer ao professor:

- **Descoberta orientada:** pesquisa e filtros por tipo de material, etapa de ensino e eixo da Computação.
- **Informações para escolha:** detalhes e metadados que ajudem a compreender a finalidade de cada recurso.
- **Continuidade da consulta:** possibilidade de salvar materiais para encontrá-los novamente.
- **Contribuição ao acervo:** envio de materiais para avaliação e eventual publicação.

O valor proposto está na organização e no acesso à informação sobre os recursos. A plataforma não se propõe, na primeira versão, a criar ou adaptar conteúdos pedagógicos dentro do sistema.

## 6. Experiência principal do usuário

A jornada central começa na apresentação da plataforma e segue para a exploração da Biblioteca. O professor pesquisa ou filtra os materiais, consulta os detalhes de um recurso e utiliza a forma de acesso disponibilizada.

Com uma conta, poderá manter uma lista pessoal de favoritos, atualizar suas informações e submeter materiais para análise.

Materiais enviados não serão publicados automaticamente: sua inclusão no acervo dependerá da aprovação por um responsável autorizado. O professor deverá conseguir acompanhar a situação das próprias submissões.

A experiência também deverá comunicar claramente ações concluídas, erros, ausência de resultados e indisponibilidade de conteúdo.

As regras de acesso para visitantes e usuários autenticados ainda precisam ser definidas.

## 7. Direcionamento do produto e primeira versão

A primeira versão funcional está orientada aos seguintes conjuntos de capacidades:

- **Acesso e conta:** apresentação da plataforma, cadastro, autenticação, recuperação de senha e perfil do professor.
- **Descoberta de recursos:** Biblioteca, pesquisa por título e tema, filtros combinados e detalhes dos materiais.
- **Organização pessoal:** favoritos persistentes e área de materiais salvos.
- **Contribuição:** envio de materiais, acompanhamento das submissões e revisão autorizada antes da publicação.
- **Compartilhamento básico:** cópia de um link compartilhável, com destino ainda a definir.

Funcionalidades mais amplas, como notificações completas, login com Google, interações da comunidade e integração direta com redes sociais, poderão ser consideradas em etapas posteriores.

### 7.1. Estratégia de desenvolvimento

O desenvolvimento será iniciado pela **interface desktop**, utilizando o protótipo do Figma como referência visual.

Essa prioridade organiza a execução inicial dos componentes e fluxos, mas não altera os compromissos da primeira versão funcional. A experiência responsiva para tablet e dispositivos móveis será desenvolvida posteriormente e deverá ser verificada antes da conclusão do MVP.

O detalhamento das funcionalidades incluídas, excluídas, critérios de conclusão e pendências está registrado no [Escopo do MVP](escopo-mvp.md).

O Product Brief apresenta o direcionamento do produto, sem substituir a especificação funcional.

## 8. Princípios do produto

### 8.1. Foco na atividade docente

O produto deve apoiar tarefas de busca e seleção de recursos, preservando a autonomia do professor para avaliar sua adequação ao contexto de ensino.

### 8.2. Clareza e facilidade de descoberta

A organização da Biblioteca, os filtros e a apresentação dos resultados devem permitir que o usuário compreenda o conteúdo disponível e refine sua busca.

### 8.3. Transparência sobre os materiais

As informações de autoria, descrição, classificação e acesso devem corresponder aos dados disponíveis. A interface não deve sugerir ações que não possam ser realizadas.

### 8.4. Confiança na contribuição

O envio de materiais deve estar associado a um processo de revisão, com responsabilidades e situações compreensíveis para quem contribui.

A disponibilização dos recursos no acervo deve depender de autorização adequada, preservando a distinção entre submissão e publicação.

### 8.5. Acessibilidade e consistência

As interfaces devem considerar responsividade, contraste, navegação por teclado, identificação dos controles e mensagens claras de feedback.

A consistência entre as áreas da plataforma deve facilitar o reconhecimento das ações e a continuidade das tarefas.

## 9. Hipóteses a avaliar

As hipóteses abaixo poderão orientar pesquisas e avaliações futuras:

| Hipótese | O que deverá ser investigado |
| --- | --- |
| Uma Biblioteca organizada facilita a descoberta de recursos. | Se professores conseguem localizar materiais pertinentes às suas necessidades. |
| Pesquisa e filtros tornam a exploração mais eficiente. | Se as opções de busca e classificação são compreensíveis e úteis. |
| Detalhes claros apoiam a escolha de materiais. | Se as informações apresentadas são suficientes para uma avaliação inicial. |
| Favoritos facilitam consultas posteriores. | Se os professores conseguem retomar recursos selecionados com facilidade. |
| Um fluxo de contribuição revisada pode ampliar a utilidade do acervo. | Se o envio e o acompanhamento dos materiais fazem sentido para o público. |

Nenhuma dessas hipóteses deve ser tratada como validada antes da coleta e análise de dados reais.

## 10. Indicadores e avaliação futura

O sucesso do produto deverá ser avaliado a partir de critérios e métodos definidos antes dos testes.

Entre os aspectos a observar estão:

- Capacidade de localizar materiais a partir de um tema ou necessidade de ensino.
- Compreensão e uso dos filtros da Biblioteca.
- Clareza das informações e das opções de acesso aos recursos.
- Facilidade para salvar e reencontrar materiais.
- Compreensão do envio de materiais e de sua situação de revisão.
- Percepção de utilidade da plataforma entre professores participantes de avaliações futuras.

A avaliação também poderá investigar dificuldades de navegação, compreensão das mensagens e continuidade das tarefas.

Ainda não foram estabelecidas metas quantitativas nem coletados resultados de uso. Qualquer avaliação deverá diferenciar dados reais, observações de teste e cenários simulados.

## 11. Situação atual do projeto

O EduComp possui documentação de produto e UX/UI, identidade visual definida e protótipos elaborados no Figma, incluindo telas desktop, mobile e referências para tablet.

As interfaces representam a experiência planejada, mas **não constituem uma aplicação funcional**.

A documentação passou por uma revisão de alinhamento entre escopo, requisitos, histórias de usuário, backlog, arquitetura da informação, fluxos e padrões visuais.

O projeto está na transição entre a conclusão dessa etapa documental e a preparação técnica do desenvolvimento.

As próximas atividades envolvem a definição da arquitetura e das tecnologias, a resolução das decisões funcionais prioritárias e a construção da base da aplicação desktop.

**Ainda não foram iniciados** o desenvolvimento de frontend e backend, os testes da aplicação e a validação da solução com professores reais.

## 12. Principais decisões e riscos em aberto

- **Acesso e identidade:** definir permissões de visitantes, requisitos de cadastro e política de autenticação.
- **Organização do acervo:** confirmar metadados obrigatórios, representação do tema pesquisável e regras de classificação.
- **Contribuição e moderação:** definir responsáveis, critérios de aprovação e recusa, situações de revisão e interface mínima do avaliador.
- **Arquivos e conteúdo:** definir formatos, limites, armazenamento, disponibilidade e cuidados relacionados aos direitos de uso.
- **Viabilidade técnica:** selecionar arquitetura, tecnologias, serviços e estratégia de implementação.
- **Experiência responsiva:** adaptar os fluxos desktop e verificar sua utilização em diferentes tamanhos de tela.
- **Validação:** investigar com professores se o problema identificado e a proposta correspondem às suas necessidades.

Esses pontos não impedem a preparação da aplicação, mas precisam ser resolvidos ou delimitados antes da implementação das funcionalidades diretamente afetadas.

## 13. Documentos relacionados

- [README.md](../../README.md) — apresentação geral do projeto.
- [Escopo do MVP](escopo-mvp.md) — delimitação da primeira versão funcional.
- [Requisitos](requisitos.md) — comportamentos esperados e regras do sistema.
- [Histórias de usuário](historias-de-usuario.md) — necessidades e critérios de aceitação.
- [Backlog](backlog.md) — organização e priorização do trabalho.
- [Especificação de busca e filtros](especificacao-busca-filtros.md) — pesquisa e filtragem da Biblioteca.
- [Especificação de metadados](especificacao-metadados.md) — informações e classificação dos recursos.
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md) — organização das áreas e conteúdos.
- [Objetivos de UX](../ux-ui/objetivos-de-ux.md) — objetivos da experiência.
- [User Flow](../ux-ui/user-flow.md) — jornadas e decisões de navegação.
- [Design System](../ux-ui/design-system.md) — identidade visual e padrões de interface.
- [Handoff de UI/UX](../ux-ui/handoff.md) — referência para implementação desktop.

---

O Product Brief deverá ser atualizado quando houver mudanças relevantes na visão, no público ou na proposta de valor do EduComp.

Decisões sobre funcionalidades, regras e implementação devem ser registradas nos documentos correspondentes, preservando a função deste arquivo como referência de direcionamento do produto.
