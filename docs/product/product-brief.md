# EduComp — Product Brief

**Versão:** 0.6  
**Data:** 04/11/2026  
**Status:** Visão do produto documentada; preparação para desenvolvimento  
**Natureza:** Projeto de portfólio em produto digital e UX/UI

## 1. Visão do produto

O **EduComp** é uma proposta de plataforma digital voltada a professores da Educação Básica, com foco na descoberta, consulta, organização e compartilhamento de materiais pedagógicos relacionados à Computação.

A plataforma pretende reunir recursos educacionais em uma Biblioteca organizada, permitindo que os professores encontrem materiais, compreendam suas características, acessem os conteúdos disponíveis e salvem itens de interesse para consultas futuras. Também prevê a contribuição de materiais pelos próprios professores, mediante revisão antes da publicação.

A proposta busca apoiar o planejamento e a realização de atividades de ensino, sem substituir a autonomia do professor na escolha e adaptação dos recursos para seu contexto.

## 2. Contexto e problema

O ensino de Computação na Educação Básica envolve diferentes conteúdos, etapas de ensino e eixos de conhecimento. Nesse contexto, professores podem precisar consultar diversas fontes para localizar materiais adequados aos temas e às necessidades de suas aulas.

O EduComp parte da **hipótese** de que a dispersão dos recursos e a dificuldade de comparar suas características podem tornar essa busca mais trabalhosa. Uma biblioteca com pesquisa, filtros e informações descritivas é proposta como uma possível forma de facilitar esse processo.

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

A operação do acervo também demandará pessoas autorizadas a revisar materiais submetidos. Seus papéis e responsabilidades serão detalhados nas regras de negócio.

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

Ao possuir uma conta, poderá manter uma lista pessoal de favoritos, atualizar suas informações e submeter materiais para análise. Materiais enviados não serão publicados automaticamente: sua inclusão no acervo dependerá de uma revisão autorizada.

A experiência deverá comunicar claramente ações concluídas, erros, ausência de resultados e indisponibilidade de conteúdo. As regras para visitantes e usuários autenticados ainda precisam ser definidas.

## 7. Direcionamento do produto e primeira versão

A primeira versão funcional está orientada aos seguintes conjuntos de capacidades:

- **Acesso e conta:** apresentação da plataforma, cadastro, autenticação, recuperação de senha e perfil do professor.
- **Descoberta de recursos:** Biblioteca, pesquisa, filtros combinados e detalhes dos materiais.
- **Organização pessoal:** favoritos persistentes e área de materiais salvos.
- **Contribuição:** envio de materiais e revisão antes da publicação.
- **Compartilhamento básico:** cópia de um link compartilhável, com destino ainda a definir.

Funcionalidades mais amplas, como notificações completas, login com Google, integração direta com redes sociais e recursos de colaboração, poderão ser consideradas em etapas posteriores.

O detalhamento das funcionalidades incluídas, excluídas, critérios de conclusão e pendências de implementação está registrado em [`escopo-mvp.md`](escopo-mvp.md). O Product Brief apresenta o direcionamento do produto, sem substituir a especificação funcional.

## 8. Princípios do produto

### 8.1. Foco na atividade docente

O produto deve apoiar tarefas reais de busca e seleção de recursos, preservando a autonomia do professor para avaliar sua adequação ao contexto de ensino.

### 8.2. Clareza e facilidade de descoberta

A organização da Biblioteca, os filtros e a apresentação dos resultados devem permitir que o usuário compreenda o conteúdo disponível e refine sua busca.

### 8.3. Transparência sobre os materiais

As informações de autoria, descrição, classificação e acesso devem corresponder aos dados disponíveis. A interface não deve sugerir ações que não possam ser realizadas.

### 8.4. Confiança na contribuição

O envio de materiais deve estar associado a um processo de revisão, com responsabilidades e situações compreensíveis para quem contribui.

### 8.5. Acessibilidade e consistência

As interfaces devem considerar responsividade, contraste, navegação por teclado, identificação dos controles e mensagens claras de feedback.

## 9. Hipóteses a avaliar

As hipóteses abaixo poderão orientar pesquisas e avaliações futuras:

| Hipótese | O que deverá ser investigado |
|---|---|
| Uma Biblioteca organizada facilita a descoberta de recursos. | Se professores conseguem localizar materiais pertinentes às suas necessidades. |
| Pesquisa e filtros tornam a exploração mais eficiente. | Se as opções de busca e classificação são compreensíveis e úteis. |
| Detalhes claros apoiam a escolha de materiais. | Se as informações apresentadas são suficientes para uma avaliação inicial. |
| Favoritos facilitam consultas posteriores. | Se os professores conseguem retomar recursos selecionados com facilidade. |
| Um fluxo de contribuição revisada pode ampliar a utilidade do acervo. | Se o envio e o acompanhamento dos materiais fazem sentido para o público. |

Nenhuma dessas hipóteses deve ser tratada como validada antes da coleta e análise de dados reais.

## 10. Indicadores e avaliação futura

O sucesso do produto deverá ser avaliado a partir de critérios e métodos definidos antes dos testes. Entre os aspectos a observar estão:

- Capacidade de localizar materiais a partir de um tema ou necessidade de ensino.
- Compreensão e uso dos filtros da Biblioteca.
- Clareza das informações e das opções de acesso aos recursos.
- Facilidade para salvar e reencontrar materiais.
- Compreensão do envio de materiais e de sua situação de revisão.
- Percepção de utilidade da plataforma entre professores participantes de avaliações futuras.

Ainda não foram estabelecidas metas quantitativas nem coletados resultados de uso. Qualquer avaliação deverá diferenciar dados reais, observações de teste e cenários simulados.

## 11. Situação atual do projeto

O EduComp possui documentação de produto e UX/UI e um protótipo visual elaborado no Figma, com telas para os principais fluxos e interações parcialmente configuradas. O protótipo representa a experiência planejada, mas **não constitui uma aplicação funcional**.

No momento, o trabalho está concentrado na consolidação dos documentos, no fechamento de regras de negócio e na preparação das definições técnicas necessárias ao desenvolvimento.

**Ainda não foram iniciados** o desenvolvimento de frontend e backend, os testes de software e a validação da solução com professores reais.

## 12. Principais decisões e riscos em aberto

- **Acesso e identidade:** definir permissões de visitantes, requisitos de cadastro e política de e-mail institucional.
- **Organização do acervo:** confirmar metadados obrigatórios, classificações e regras de acesso aos materiais.
- **Contribuição e moderação:** definir responsáveis, critérios de aprovação e recusa e acompanhamento das submissões.
- **Arquivos e conteúdo:** definir formatos, limites, armazenamento e cuidados relacionados à disponibilidade e aos direitos de uso.
- **Viabilidade técnica:** selecionar arquitetura, tecnologias e estratégia de implementação.
- **Validação:** investigar com professores se o problema e a proposta correspondem às suas necessidades.

Esses pontos não impedem a continuidade da especificação, mas precisam ser resolvidos ou explicitamente delimitados antes da implementação das funcionalidades correspondentes.

## 13. Documentos relacionados

- [`README.md`](../../README.md) — apresentação geral do projeto.
- [`escopo-mvp.md`](escopo-mvp.md) — delimitação da primeira versão funcional.
- [`requisitos.md`](requisitos.md) — requisitos e regras do sistema.
- [`historias-de-usuario.md`](historias-de-usuario.md) — necessidades e critérios de aceite do ponto de vista dos usuários.
- [`backlog.md`](backlog.md) — organização e priorização do trabalho.
- [`objetivos-de-ux.md`](../ux-ui/objetivos-de-ux.md) — objetivos e diretrizes de experiência.
