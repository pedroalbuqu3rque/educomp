# EduComp — Product Brief

**Versão:** 0.5  
**Status:** Consolidado para orientar o design do MVP  
**Tipo de projeto:** Projeto de desenvolvimento de produto com dados e cenários simulados para fins de estudo

## 1. Visão do produto

O EduComp é uma proposta de plataforma digital especializada em Computação na Educação Básica, destinada a facilitar a descoberta e o acesso a materiais pedagógicos para o ensino de Computação.

A plataforma busca reunir materiais em um catálogo que permita aos professores pesquisar recursos, refinar os resultados, consultar informações relevantes e identificar as formas de acesso disponíveis.

O produto tem como prioridade apoiar professores na localização de materiais que possam contribuir para o planejamento e a realização de suas aulas.

## 2. Problema

Professores que procuram materiais pedagógicos de Computação podem precisar consultar diferentes fontes até encontrar recursos relacionados ao eixo da Computação, à habilidade curricular e à etapa de ensino e às necessidades de suas aulas.

O EduComp parte da hipótese de que um catálogo organizado, com busca e filtros, pode facilitar a descoberta desses recursos.

Essa hipótese ainda não foi validada por uma pesquisa com usuários reais. Ela orienta a proposta inicial do produto, mas não deve ser apresentada como uma conclusão empírica.

## 3. Público-alvo

### Público prioritário

**Professores que procuram materiais pedagógicos de Computação para utilizar em suas aulas.**

O produto deve considerar as necessidades de quem deseja localizar recursos relacionados a determinado conteúdo ou etapa de ensino, compreender suas características e verificar como acessá-los.

### Público secundário potencial

Outras pessoas envolvidas na preparação de aulas, atividades, oficinas ou ações educacionais poderão se beneficiar da plataforma.

A prioridade do MVP, entretanto, permanece centrada nos professores que procuram materiais para suas aulas.

## 4. Objetivo do produto

Facilitar a descoberta, a consulta e o acesso a materiais pedagógicos de Computação, reduzindo o esforço necessário para localizar recursos potencialmente relevantes.

O produto deverá permitir que o usuário:

- Explore um catálogo de materiais cadastrados.
- Pesquise por palavras-chave.
- Refine os resultados com filtros.
- Consulte informações sobre cada material.
- Identifique as opções de acesso disponíveis.
- Receba informações claras quando não houver resultados ou quando ocorrer uma falha de acesso que possa ser identificada.
- Envie materiais pedagógicos para avaliação e possível inclusão no acervo.
- Salve materiais como favoritos para encontrá-los novamente.
- Compartilhe materiais por meio de um link direto.

## 5. Proposta de valor

Oferecer um ambiente organizado para descobrir materiais pedagógicos de Computação, com mecanismos de busca, filtros e apresentação clara das informações e opções de acesso.

A proposta de valor está concentrada em facilitar a localização e a consulta dos recursos, sem pressupor que todos os materiais estejam hospedados na plataforma.

Um material poderá reunir múltiplos links externos e múltiplos arquivos hospedados na própria plataforma, combinando as duas formas no mesmo cadastro. No cadastro, deverá existir pelo menos uma forma de acesso.

A edição e a adaptação de materiais dentro da plataforma não fazem parte do MVP. A pré-visualização de arquivos diretamente na plataforma também está fora do escopo atual.

## 6. Escopo do Produto Mínimo Viável (MVP)

O MVP previsto contempla as funcionalidades essenciais para localizar, consultar e acessar os materiais cadastrados.

### 6.1 Funcionalidades incluídas

- Catálogo de materiais pedagógicos de Computação.
- Busca por palavras-chave.
- Pesquisa nos campos título, tipo de material, resumo e descrição.
- Busca sem distinção entre letras maiúsculas e minúsculas.
- Busca sem distinção de acentuação.
- Correspondência parcial de termos.
- Ordenação dos resultados por relevância.
- Prioridade de relevância dos campos na seguinte ordem: título, tipo de material, resumo e descrição.
- Filtros por tipo de material e etapa de ensino.
- Tipos previstos para o catálogo inicial: Plano de aula, Slides, Material de apoio, Atividade, Avaliação e Projeto pedagógico.
- Apresentação dos detalhes dos materiais.
- Acesso a múltiplos links externos, quando disponíveis.
- Acesso a múltiplos arquivos hospedados na plataforma, quando disponíveis.
- Representação dos cenários de acesso: somente link externo, somente arquivo ou ambos. Registros preexistentes/incompletos sem acesso direto devem ser identificados; novos cadastros exigem ao menos uma forma de acesso.
- Mensagens para catálogo vazio e ausência de resultados.
- Tratamento informativo de falhas de acesso que possam ser identificadas.
- Apresentação clara das informações disponíveis sobre os materiais.
- Envio de materiais pelos usuários por meio de formulário e upload de arquivos, com validação dos campos obrigatórios e envio para revisão antes da publicação.
- Favoritar e desfavoritar materiais, com lista pessoal persistente associada à conta do usuário.
- Compartilhar um material por link direto, com ação para copiar o link; o acesso ao material compartilhado respeita as regras normais de acesso da plataforma.

### 6.2 Funcionalidades fora do escopo atual

Não fazem parte do MVP:
- Criação de materiais dentro da plataforma.
- Edição ou adaptação de materiais.
- Pré-visualização de arquivos diretamente na plataforma.
- Recomendação automática de materiais.
- Coleções pessoais personalizadas além da lista básica de favoritos.
- Compartilhamento de coleções, colaboração em tempo real ou permissões avançadas de compartilhamento.

As funcionalidades de envio, favoritos e compartilhamento por link passam a integrar o escopo aprovado do MVP. O envio de materiais não implica publicação automática: os materiais enviados deverão permanecer pendentes de revisão até que um responsável os aprove. Coleções personalizadas e recursos avançados de compartilhamento permanecem para etapas futuras.

### 6.3 Limites da especificação atual

Embora as regras funcionais de busca e filtros já estejam definidas na especificação funcional, algumas decisões continuam pendentes antes da implementação:

- Sugestão automática de correção de consulta sem resultados: fora do escopo do MVP atual; a interface permitirá ajustar manualmente a busca e os filtros.
- Definição dos detalhes técnicos de representação e validação dos metadados e dos casos de preenchimento condicional.
- Limite total combinado de arquivos por cadastro, validação técnica e política de segurança para uploads. O limite individual por arquivo está definido em 50 MB.
- Definir autenticação e permissões mínimas para envio de materiais, revisão/publicação e manutenção da lista de favoritos. O usuário precisa estar identificado para manter favoritos persistentes; somente responsáveis autorizados podem aprovar ou rejeitar envios.
- Tratamento específico e detecção possível de falhas de acesso.
- Critérios técnicos de acessibilidade.
- Composição visual definitiva dos itens do catálogo e dos componentes responsivos.

Essas pendências devem ser acompanhadas no `backlog.md` e refletidas nos documentos relacionados quando forem resolvidas.

## 7. Princípios do produto

### 7.1 Facilidade de descoberta

A organização do catálogo, a busca e os filtros devem apoiar a localização de materiais relevantes de maneira clara e compreensível.

### 7.2 Autonomia docente

A plataforma deve apoiar o trabalho dos professores, permitindo que avaliem a pertinência dos recursos para seus próprios contextos de ensino.

### 7.3 Transparência

As informações disponíveis sobre autoria, origem e condições de uso devem ser apresentadas com clareza, respeitando os dados cadastrados para cada material.

### 7.4 Clareza de acesso

O usuário deve conseguir identificar se um material possui link externo, arquivo hospedado, as duas opções ou nenhum acesso direto disponível.

### 7.5 Consistência

Os requisitos, a interface e os comportamentos previstos devem estar alinhados. Mensagens e opções de acesso não devem sugerir a existência de recursos que não estejam disponíveis no cadastro.

### 7.6 Acessibilidade

A experiência deve considerar legibilidade, contraste, clareza dos controles, responsividade e práticas de navegação acessível.

Os critérios técnicos específicos serão detalhados em etapas posteriores.

## 8. Premissas, hipóteses e limitações

### 8.1 Premissas de trabalho

- O público prioritário é formado por professores que procuram materiais para suas aulas.
- O MVP concentra-se na descoberta, consulta e acesso aos materiais.
- Os materiais podem ter diferentes formas de disponibilização.
- O produto deve informar claramente quando não houver acesso direto disponível.
- A implementação será orientada pelos requisitos, histórias de usuário e critérios de aceitação documentados.

### 8.2 Hipóteses a avaliar

- Um catálogo organizado pode facilitar a descoberta de materiais pedagógicos de Computação.
- A busca e os filtros podem reduzir o esforço necessário para localizar recursos relacionados às necessidades dos professores.
- A apresentação clara das opções de acesso pode ajudar os usuários a compreender como chegar aos materiais.

Essas hipóteses ainda precisam ser avaliadas. Não devem ser descritas como benefícios comprovados ou resultados de uma pesquisa realizada.

### 8.3 Limitações metodológicas

O projeto encontra-se em fase de revisão documental. A especificação atual descreve o comportamento pretendido do produto, mas não comprova sua implementação nem sua eficácia.

Um formulário de pesquisa foi considerado anteriormente, mas sua aplicação foi abandonada. Dados simulados podem ser utilizados para exercitar cenários e apoiar decisões de desenvolvimento, mas não devem ser apresentados como respostas reais de usuários, evidências empíricas ou validação das necessidades dos professores.

A avaliação com usuários reais, os testes de qualidade e a validação das hipóteses pertencem a etapas futuras.

## 9. Etapas do projeto

O projeto está organizado em etapas que poderão ser ajustadas conforme a evolução do trabalho.

### Etapa 1 — Revisão e consolidação documental

- Revisar os documentos de produto e UX/UI.
- Alinhar requisitos, histórias de usuário, arquitetura, fluxos e backlog.
- Identificar decisões confirmadas e questões pendentes.
- Conferir a consistência da documentação publicada.

**Situação atual:** em andamento.

### Etapa 2 — Especificação funcional e preparação da experiência

- Alinhar os documentos às regras de busca e filtros já consolidadas.
- Consolidar os metadados dos materiais.
- Definir os comportamentos relacionados ao acesso.
- Revisar a arquitetura da informação e o fluxo do usuário.
- Consolidar as diretrizes visuais.

**Situação:** parcialmente especificada, com decisões pendentes.

### Etapa 3 — Prototipação

- Criar wireframes das telas principais.
- Elaborar um protótipo visual navegável.
- Representar os principais estados e cenários de uso.

**Situação:** planejada para etapa futura.

### Etapa 4 — Avaliação da experiência

- Planejar uma avaliação com professores.
- Definir tarefas, critérios de observação e método de análise.
- Coletar e analisar dados reais, caso a avaliação seja executada.

**Situação:** planejada para etapa futura.

### Etapa 5 — Implementação e verificação de qualidade

- Planejar a implementação das funcionalidades aprovadas.
- Desenvolver o MVP.
- Verificar o atendimento aos critérios de aceitação.
- Registrar os resultados das verificações e as limitações identificadas.

**Situação:** planejada para etapa futura.

## 10. Indicadores e avaliação futura

A avaliação do produto deverá considerar indicadores adequados aos objetivos da plataforma, definidos antes da coleta de dados.

Entre os aspectos que poderão ser avaliados estão:

- Capacidade de localizar materiais relacionados a uma consulta.
- Facilidade de utilização da busca e dos filtros.
- Clareza das informações apresentadas nos detalhes.
- Compreensão das opções de acesso.
- Clareza das mensagens de ausência de resultados e falha de acesso.
- Percepção dos professores sobre a utilidade da plataforma.

Os indicadores, instrumentos e critérios de análise ainda deverão ser especificados. Nenhum resultado deve ser atribuído ao produto antes de sua efetiva coleta e análise.

## 11. Critérios gerais de alinhamento do produto

A documentação do EduComp será considerada coerente quando:

- A visão do produto corresponder ao escopo do MVP.
- Os requisitos funcionais representarem as funcionalidades previstas.
- As histórias de usuário refletirem esses requisitos e apresentarem critérios de aceitação verificáveis.
- A arquitetura da informação e os fluxos representarem os comportamentos especificados.
- O backlog registrar as tarefas e pendências reais.
- As decisões confirmadas não forem tratadas como questões em aberto sem justificativa.
- As hipóteses forem diferenciadas de resultados validados.
- O status dos documentos e das etapas corresponder ao andamento efetivo do projeto.

## 12. Documentos relacionados

- `README.md`
- `docs/product/requisitos.md`
- `docs/product/historias-de-usuario.md`
- `docs/product/backlog.md`
- `docs/ux-ui/arquitetura-da-informacao.md`
- `docs/ux-ui/design-system.md`
- `docs/ux-ui/objetivos-de-ux.md`
- `docs/ux-ui/user-flow.md`

Alterações no escopo ou nas decisões do produto deverão ser refletidas nos documentos pertinentes, mantendo a consistência e a rastreabilidade do projeto.


### Decisão de metadados — habilidades da BNCC
As habilidades da BNCC são um campo opcional e aceitam múltiplos valores por material, informados por texto livre digitado ou colado manualmente. O MVP não exige catálogo estruturado nem seletor de códigos oficiais. A etapa de ensino também aceita múltiplos valores por material, e o cadastro deverá permitir especificar os anos escolares correspondentes a cada etapa selecionada. As etapas confirmadas para o catálogo inicial são Educação Infantil, Ensino Fundamental — Anos Iniciais, Ensino Fundamental — Anos Finais, Ensino Médio e Educação de Jovens e Adultos (EJA). As subdivisões confirmadas para o catálogo inicial são: Educação Infantil — Bebês, Crianças bem pequenas e Crianças pequenas; Ensino Fundamental — Anos Iniciais — 1º ao 5º ano; Ensino Fundamental — Anos Finais — 6º ao 9º ano; Ensino Médio — 1ª à 3ª série; EJA — Ensino Fundamental — 1º e 2º segmentos; EJA — Ensino Médio — sem exigir série específica.


### Decisão de metadados — subdivisões educacionais
O catálogo inicial oferece Educação Infantil (Bebês, Crianças bem pequenas e Crianças pequenas); Ensino Fundamental — Anos Iniciais (1º ao 5º ano); Ensino Fundamental — Anos Finais (6º ao 9º ano); Ensino Médio (1ª à 3ª série); EJA — Ensino Fundamental (1º e 2º segmentos); e EJA — Ensino Médio, sem exigir série específica. Um material pode estar associado a múltiplas etapas e subdivisões, preservando a relação entre elas.
