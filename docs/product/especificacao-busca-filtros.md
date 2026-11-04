# EduComp — Especificação Funcional de Busca e Filtros

**Versão:** 0.2  
**Data:** 04/11/2026  
**Módulo:** Biblioteca  
**Situação:** Especificação funcional em consolidação; decisões complementares pendentes.

## 1. Objetivo

Definir o comportamento esperado da pesquisa textual, dos filtros e da apresentação dos resultados da Biblioteca do EduComp. Esta especificação orienta a implementação e os testes dessas funcionalidades, sem determinar antecipadamente tecnologias, componentes de infraestrutura ou mecanismos de consulta ao banco de dados.

O módulo deve permitir que professores encontrem materiais pedagógicos de Computação combinando palavras-chave e classificações do acervo.

## 2. Escopo e condições gerais

A Biblioteca deve oferecer:

- Consulta aos materiais aprovados e disponibilizados para publicação.
- Pesquisa textual por título e tema.
- Filtros por tipo de material, etapa de ensino e eixo da Computação.
- Seleção de múltiplas opções em cada categoria.
- Aplicação combinada da pesquisa e dos filtros.
- Acesso aos detalhes dos materiais encontrados.
- Estados de carregamento, ausência de resultados e falha.
- Navegação por resultados por paginação ou carregamento progressivo, conforme decisão posterior.

Materiais pendentes, em análise ou recusados não devem aparecer como itens publicados na Biblioteca. As regras de acesso à Biblioteca por visitantes e usuários autenticados serão definidas separadamente.

## 3. Pesquisa textual

### 3.1. Campo e dados pesquisáveis

A Biblioteca deve disponibilizar um campo de pesquisa por palavras-chave. A consulta deve considerar, no mínimo, os seguintes dados dos materiais publicados:

1. **Título:** nome atribuído ao material.
2. **Tema:** assunto ou temas associados ao material.

O formato de armazenamento, a obrigatoriedade e a possibilidade de múltiplos temas serão definidos na especificação de metadados. A inclusão de outros campos pesquisáveis não está aprovada nesta versão.

### 3.2. Comportamento da consulta

- Uma consulta deve retornar apenas materiais que atendam às regras de correspondência textual definidas para título e tema.
- A pesquisa deve ser combinada com os filtros que estiverem aplicados.
- Alterar ou limpar o texto pesquisado não deve remover as seleções de filtros já aplicadas.
- Quando não houver texto de pesquisa nem filtros aplicados, a Biblioteca deve apresentar o conjunto de materiais publicados, respeitando a navegação por resultados.
- A execução de novas consultas deve substituir os resultados da consulta anterior, sem misturar itens de critérios diferentes.

**Decisão pendente:** definir o momento de execução da pesquisa (por exemplo, após digitação, por Enter ou por acionamento do controle de busca), a normalização de texto e a interpretação de consultas com várias palavras.

### 3.3. Ordenação dos resultados

A ordenação deve ser consistente: consultas equivalentes sobre os mesmos dados, com os mesmos critérios, devem apresentar os itens na mesma sequência.

**Decisão pendente:** confirmar o uso de relevância, campos de prioridade, regras de desempate e eventual opção de ordenar por outros critérios. Não se estabelece, por enquanto, uma hierarquia de relevância por campos adicionais ao título e ao tema.

### 3.4. Ausência de correspondências

Quando a pesquisa, isoladamente ou combinada com filtros, não localizar materiais, a interface deve:

- Informar que nenhum item corresponde aos critérios usados.
- Preservar o texto pesquisado e os filtros aplicados.
- Permitir alterar ou limpar os critérios para realizar uma nova consulta.

Esse estado é diferente da situação em que ainda não existem materiais publicados no acervo.

## 4. Filtros da Biblioteca

### 4.1. Categorias e opções

A primeira versão prevê três categorias, cada uma apresentada por uma sobreposição de seleção.

**Tipo de material**

- Plano de aula
- Slides
- Material de apoio
- Atividade
- Sequência didática

**Etapa de ensino**

- Educação Infantil
- Ensino Fundamental — Anos iniciais
- Ensino Fundamental — Anos finais
- Ensino Médio

**Eixo da Computação**

- Pensamento Computacional
- Mundo Digital
- Cultura Digital

As opções da interface devem corresponder às classificações utilizadas no cadastro dos materiais. A taxonomia definitiva, incluindo possíveis subdivisões e modalidades adicionais, será detalhada na especificação de metadados.

### 4.2. Seleção múltipla e combinação lógica

Cada categoria deve permitir a seleção de mais de uma opção.

- **Dentro da mesma categoria:** as opções selecionadas são combinadas por **OU**. Um material pode corresponder a qualquer uma das opções selecionadas dessa categoria.
- **Entre categorias diferentes:** as categorias com seleções ativas são combinadas por **E**. O material deve atender a cada categoria utilizada.
- **Entre filtros e pesquisa textual:** os resultados devem atender tanto aos filtros aplicados quanto à consulta pesquisada (**E**).
- **Sem seleção em determinada categoria:** essa categoria não restringe os resultados.

**Exemplo:** com *Plano de aula* ou *Atividade* em tipo, *Ensino Médio* em etapa, *Pensamento Computacional* em eixo e o termo `algoritmo` na pesquisa, o resultado deve satisfazer simultaneamente a pesquisa, a etapa e o eixo, além de corresponder a pelo menos um dos dois tipos selecionados.

A forma como um material recebe uma ou várias classificações por categoria precisa ser coerente com o modelo de metadados.

### 4.3. Edição temporária e aplicação

As sobreposições devem distinguir dois conjuntos de valores:

- **Seleções aplicadas:** valores que estão efetivamente restringindo a Biblioteca.
- **Seleções em edição:** valores temporários que o professor altera enquanto uma sobreposição está aberta.

Fluxo funcional:

1. Ao abrir uma categoria, o sistema apresenta as seleções já aplicadas nela.
2. O professor marca ou desmarca uma ou mais opções.
3. Enquanto as alterações estiverem apenas em edição, a listagem continua usando os filtros anteriormente aplicados.
4. Ao acionar **Aplicar**, o sistema confirma as seleções editadas e atualiza os resultados.
5. Ao reabrir a sobreposição, as seleções efetivamente aplicadas continuam identificadas.
6. Aplicar uma categoria não deve apagar as seleções já aplicadas em outras categorias nem o texto pesquisado.

**Decisão pendente:** definir o resultado de fechar a sobreposição sem acionar **Aplicar**. O comportamento deverá ser uniforme nas três categorias e não pode ser deixado a uma consequência acidental da implementação.

### 4.4. Ação Limpar

A ação **Limpar** deve permitir remover seleções, sem apagar por consequência o texto de pesquisa.

**Decisões pendentes:** confirmar se a limpeza afeta somente a categoria aberta ou todos os filtros e se a remoção se torna efetiva imediatamente ou apenas após **Aplicar**. Até essa definição, o comportamento de Limpar não deve ser considerado integralmente especificado.

### 4.5. Preservação das seleções

- As opções aplicadas devem continuar ativas ao abrir e fechar uma sobreposição e ao navegar pelos resultados da Biblioteca.
- A remoção de uma opção não deve remover outras seleções que continuem válidas e aplicadas.
- A mudança no texto pesquisado não deve apagar filtros.
- Ao retornar de uma página de detalhes, o professor deve encontrar os critérios de pesquisa e filtragem que utilizava durante a navegação, observadas as regras de acesso e sessão.

A preservação da posição exata de rolagem e a persistência do estado após recarregar a página precisam de definição específica.

## 5. Atualização e apresentação dos resultados

### 5.1. Aplicação dos critérios

Os resultados devem representar a combinação vigente de pesquisa e filtros aplicados. A interface não deve apresentar como resultado atual uma resposta pertencente a critérios anteriores.

Sempre que uma nova pesquisa for executada ou uma nova combinação de filtros for aplicada, a listagem deverá refletir esses critérios, inclusive quando o resultado for vazio.

### 5.2. Carregamento e navegação

O sistema deve permitir consultar o acervo além do primeiro conjunto de materiais exibidos, por **paginação ou carregamento progressivo**.

- Os resultados devem ser apresentados em grupos de tamanho controlado.
- A interface deve informar quando uma consulta ou o carregamento de mais resultados estiver em andamento.
- Os materiais já apresentados não devem ser duplicados durante o carregamento adicional.
- Ao alterar os critérios, a navegação deve retornar ao início do novo conjunto de resultados.
- Se uma requisição antiga terminar depois de uma consulta mais recente, sua resposta não deve substituir nem se misturar aos resultados atuais.

**Decisão pendente:** escolher paginação ou carregamento progressivo, a quantidade de itens por lote e o controle utilizado para solicitar novos resultados.

### 5.3. Estados da listagem

| Estado | Comportamento esperado |
|---|---|
| **Carregamento inicial** | Informar que os materiais estão sendo consultados, sem apresentar dados provisórios como resultados definitivos. |
| **Resultados disponíveis** | Exibir materiais correspondentes aos critérios e permitir abrir seus detalhes. |
| **Acervo sem materiais publicados** | Informar que não há materiais disponíveis na Biblioteca. |
| **Pesquisa ou filtros sem correspondência** | Informar que nenhum material atende à combinação atual e permitir revisar os critérios. |
| **Erro na consulta** | Exibir mensagem de falha e oferecer nova tentativa quando possível. |
| **Erro no carregamento adicional** | Preservar itens já carregados e permitir repetir a tentativa, sem duplicá-los. |

A redação final das mensagens será definida na documentação de interface. A diferença entre *acervo vazio* e *consulta sem resultados* deve ser preservada.

## 6. Comportamento de interface e acessibilidade

- Os controles de pesquisa, filtros, **Aplicar**, **Limpar** e fechamento devem ter identificação compreensível.
- As opções de seleção múltipla devem informar visualmente e por recursos acessíveis se estão selecionadas.
- As sobreposições devem permitir navegação por teclado, indicação perceptível de foco e um mecanismo claro de fechamento.
- A implementação deve oferecer feedback sobre carregamento e alterações efetivamente aplicadas.
- A Biblioteca deve permanecer utilizável em computadores, tablets e celulares.
- A adaptação responsiva não pode eliminar categorias de filtros nem impedir a combinação dos critérios.

**Decisão pendente:** especificar o layout e os controles próprios das telas menores, inclusive o comportamento de fechamento por clique fora da sobreposição ou pela tecla Esc. A apresentação das opções deve seguir o design system e os fluxos de interface atualizados.

## 7. Cenários de aceitação

| ID | Cenário | Resultado esperado |
|---|---|---|
| **CA-BF-01** | Abrir a Biblioteca sem pesquisa nem filtros. | São apresentados materiais publicados conforme o mecanismo de navegação definido. |
| **CA-BF-02** | Pesquisar um termo presente no título de um material. | O material pode ser localizado conforme a regra de correspondência textual definida. |
| **CA-BF-03** | Pesquisar um termo associado ao tema de um material. | O material pode ser localizado conforme a representação definida para tema. |
| **CA-BF-04** | Selecionar *Plano de aula* e *Atividade* no mesmo filtro e aplicar. | São elegíveis materiais de qualquer um dos tipos selecionados. |
| **CA-BF-05** | Combinar tipo, etapa e eixo da Computação. | Cada resultado atende às categorias selecionadas, usando **E** entre elas. |
| **CA-BF-06** | Combinar pesquisa textual com filtros aplicados. | Os resultados atendem à pesquisa **e** aos filtros. |
| **CA-BF-07** | Alterar opções em uma sobreposição sem acionar Aplicar. | Os resultados não são atualizados com seleções ainda temporárias. |
| **CA-BF-08** | Acionar Aplicar após modificar uma categoria. | As novas seleções passam a restringir os resultados, sem apagar outras categorias nem a pesquisa. |
| **CA-BF-09** | Reabrir uma categoria após a aplicação. | As opções anteriormente aplicadas permanecem selecionadas. |
| **CA-BF-10** | Alterar ou limpar o texto pesquisado com filtros ativos. | Os filtros permanecem aplicados. |
| **CA-BF-11** | Usar critérios que não correspondam a nenhum material. | Aparece um estado sem resultados, preservando os critérios utilizados. |
| **CA-BF-12** | Consultar a Biblioteca sem materiais publicados. | Aparece um estado de acervo vazio, distinto do estado sem correspondência. |
| **CA-BF-13** | Falhar o carregamento de resultados. | A interface informa a falha e permite nova tentativa quando aplicável. |
| **CA-BF-14** | Mudar critérios enquanto uma consulta anterior está em andamento. | Uma resposta antiga não substitui os resultados da consulta mais recente. |
| **CA-BF-15** | Abrir detalhes e retornar à Biblioteca na mesma navegação. | Os critérios de pesquisa e filtragem usados anteriormente continuam disponíveis. |

Os cenários que dependem de escolhas ainda abertas só poderão ser executados como testes definitivos após a formalização dessas escolhas. Em especial, **Limpar**, o fechamento sem **Aplicar**, a ordenação e a navegação entre lotes exigem critérios complementares.

## 8. Decisões necessárias para conclusão da especificação

| Tema | Definição necessária |
|---|---|
| **Campo tema** | Estrutura, obrigatoriedade e possibilidade de múltiplos temas associados ao material. |
| **Correspondência textual** | Uso de acentos, maiúsculas/minúsculas, termos parciais e várias palavras. |
| **Disparo da pesquisa** | Atualização automática, Enter ou botão, e eventual intervalo de espera entre consultas. |
| **Ordenação** | Critério padrão, relevância e desempates. |
| **Limpar** | Alcance da ação e momento em que a limpeza altera os resultados. |
| **Fechar sem aplicar** | Descarte ou manutenção das seleções temporárias não confirmadas. |
| **Opções sem correspondência** | Manter, ocultar ou desabilitar opções que não retornam materiais na combinação atual. |
| **Taxonomia** | Classificações definitivas, multiplicidade de valores e relação com as subdivisões educacionais. |
| **Navegação por resultados** | Paginação ou carregamento progressivo, tamanho de lote e eventual total de resultados. |
| **Contexto da navegação** | Preservação da rolagem e do estado após recarregamento da página. |
| **Responsividade** | Disposição e comportamento das sobreposições em dispositivos menores. |

Essas decisões devem ser registradas antes de implementar ou testar os comportamentos por elas afetados. A seleção de tecnologias e a definição de contratos de API pertencem à preparação técnica, não a este documento.

## 9. Rastreabilidade e documentos relacionados

- **Requisitos funcionais:** RF-001, RF-002, RF-003, RF-004 e RF-005, em [`requisitos.md`](requisitos.md).
- **Histórias de usuário:** US-001, US-002 e US-003, em [`historias-de-usuario.md`](historias-de-usuario.md).
- **Backlog:** BK-004 (busca), BK-005 (filtros) e BK-022 (implementação da Biblioteca), em [`backlog.md`](backlog.md).
- **Escopo da primeira versão:** [`escopo-mvp.md`](escopo-mvp.md).
- **Classificações e campos dos materiais:** [`especificacao-funcional-bk-006-metadados.md`](especificacao-funcional-bk-006-metadados.md), até a revisão e renomeação desse documento.
- **Fluxos de navegação:** [`../ux-ui/user-flow.md`](../ux-ui/user-flow.md).
- **Padrões de interface:** [`../ux-ui/design-system.md`](../ux-ui/design-system.md).
