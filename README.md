# EduComp

O EduComp é uma plataforma educacional em planejamento, especializada em reunir e facilitar a descoberta, a seleção e o acesso a materiais pedagógicos de Computação para a Educação Básica.

A proposta é organizar recursos educacionais em um catálogo que permita explorar materiais, pesquisar por palavras-chave, aplicar filtros e consultar informações relevantes antes de acessar os recursos.

O acesso poderá ocorrer por meio de links externos, arquivos hospedados diretamente na plataforma ou ambos, conforme as opções disponíveis para cada material.

## Sobre o projeto

O EduComp é um projeto de planejamento de produto digital, com foco em Product Discovery, Product Ownership e UX/UI Design.

A proposta parte da hipótese de que localizar materiais pedagógicos de Computação adequados pode exigir que professores consultem diferentes fontes e avaliem diversos recursos antes de escolher aqueles que pretendem utilizar em suas aulas.

O catálogo organizado, a pesquisa, os filtros e as informações descritivas são propostos como possíveis formas de facilitar esse processo. Entretanto, essa hipótese ainda não foi validada por pesquisa com usuários reais.

A documentação, portanto, registra o planejamento do produto, suas decisões de escopo, suas hipóteses e as questões que permanecem pendentes. Ela não deve ser interpretada como evidência de que as necessidades identificadas já foram comprovadas.

## Objetivo

Planejar uma solução digital que facilite a descoberta, a avaliação inicial e o acesso a materiais didáticos, estabelecendo uma visão de produto, requisitos, histórias de usuário, arquitetura da informação, fluxos de navegação e diretrizes de interface coerentes entre si.

## Público-alvo

O público prioritário são professores da Educação Básica que procuram materiais pedagógicos para ensinar Computação.

A experiência proposta deve ajudar esse público a:

- Explorar os materiais disponíveis;
- Localizar recursos por palavras-chave;
- Refinar os resultados por critérios relevantes;
- Consultar informações sobre cada material;
- Identificar as formas disponíveis de acesso.

Outros profissionais da educação poderão se beneficiar da proposta, mas não constituem a prioridade para a definição do MVP.

## Escopo do MVP

A versão inicial planejada do produto contempla:

- **Catálogo de materiais:** apresentação organizada dos recursos cadastrados.
- **Pesquisa por palavras-chave:** localização de materiais relacionados aos termos informados.
- **Filtros:** refinamento dos resultados por tipo de material e etapa de ensino. O eixo da Computação poderá ser exibido como metadado; sua adoção como filtro depende da consolidação do modelo de dados.
- **Detalhes do material:** apresentação de informações que ajudem o professor a compreender e avaliar inicialmente o recurso.
- **Acesso aos materiais:** disponibilização de links externos, arquivos hospedados na plataforma ou ambas as opções, quando disponíveis.
- **Estados informativos:** comunicação de situações como catálogo vazio, pesquisa sem resultados e ausência de uma forma de acesso cadastrada.

O MVP inclui envio de materiais para revisão, favoritos persistentes por usuário e compartilhamento de materiais por link direto. O envio não publica o material automaticamente: ele permanece pendente até a aprovação de um responsável. A pré-visualização de arquivos, a criação/edição/adaptação de materiais e as coleções personalizadas estão fora do escopo.

As regras detalhadas de pesquisa, as opções dos filtros, os campos obrigatórios dos materiais e o tratamento de falhas de acesso permanecem sujeitos a especificação.

## Processo de planejamento

O projeto está organizado nas seguintes frentes:

1. **Product Discovery:** formulação do problema, identificação do público prioritário e registro das hipóteses do produto.
2. **Product Ownership:** definição do escopo, dos requisitos, das histórias de usuário e das prioridades do MVP.
3. **UX/UI Design:** organização da arquitetura da informação, dos fluxos de navegação, dos objetivos de UX e das diretrizes visuais.
4. **Desenvolvimento:** implementação futura, caso o projeto avance para essa etapa.
5. **Quality Assurance (QA):** planejamento e execução futura de atividades de verificação e testes, em uma etapa posterior.

**Fase atual:** adaptação da identidade e das telas no Figma para o posicionamento EduComp. Este ZIP contém documentação Markdown; não inclui código-fonte de aplicação. A implementação ainda deverá ser realizada em um repositório de código quando disponível. A descrição das etapas futuras não significa que a implementação, os testes de software ou a validação com usuários já tenham ocorrido.

## Metodologia e integridade das informações

A coleta de respostas por meio do Google Forms foi abandonada. Portanto, não existem resultados desse questionário que possam ser apresentados como evidência de pesquisa com professores.

Dados simulados, exemplos fictícios e cenários ilustrativos não devem ser apresentados como respostas reais, resultados empíricos ou validações do produto.

Para manter a transparência documental, o projeto diferencia:

- **Decisões confirmadas:** definições adotadas para orientar o escopo atual.
- **Hipóteses:** suposições sobre o problema, as necessidades do público e os benefícios esperados.
- **Pendências:** questões que ainda precisam de definição.
- **Etapas futuras:** atividades planejadas que não foram executadas.

A documentação atual se fundamenta nas decisões de escopo e na coerência entre os artefatos do projeto, sem atribuir conclusões a participantes ou dados que não foram efetivamente coletados.

## Tecnologias e ferramentas

As tecnologias de implementação ainda não estão definidas neste estágio. A escolha deverá ocorrer em uma etapa posterior, considerando as necessidades do produto e as decisões de arquitetura.

O GitHub é utilizado para organizar e versionar a documentação do projeto. Outras ferramentas poderão ser incorporadas conforme as necessidades das próximas etapas.

## Status do projeto

**Status geral:** documentação funcional consolidada; próxima etapa: design no Figma.

As prioridades atuais são:

- Concluir e revisar no Figma as telas de apresentação institucional, biblioteca, detalhes, envio de material, favoritos e compartilhamento;
- Validar a coerência visual dos estados principais e alternativos;
- Manter decisões confirmadas, hipóteses e pendências claramente diferenciadas;
- Garantir que dados simulados não sejam apresentados como evidências reais.

A implementação e as atividades de QA não fazem parte da fase atual.

## Organização do repositório

A documentação está organizada nas seguintes áreas:

- `docs/product/`: visão do produto, requisitos, histórias de usuário, especificações funcionais e auditoria documental.
- `docs/ux-ui/`: arquitetura da informação, design system, objetivos de UX e fluxos de navegação.

## Portfólio

Este repositório registra o processo de planejamento do EduComp, especializado em Computação na Educação Básica, incluindo decisões de escopo, hipóteses, requisitos e artefatos de produto e UX/UI.

Caso o projeto avance para implementação ou avaliação, as atividades realizadas e seus resultados deverão ser documentados separadamente, de acordo com as evidências efetivamente produzidas.


## Especificações funcionais

- `docs/product/especificacao-funcional-bk-004-bk-005.md` — busca e filtros.
- `docs/product/especificacao-funcional-bk-006-metadados.md` — metadados, etapas educacionais e acesso a arquivos/links.\n- `docs/product/auditoria-documental-2026-10-28.md` — resultado da auditoria e decisões consolidadas.
