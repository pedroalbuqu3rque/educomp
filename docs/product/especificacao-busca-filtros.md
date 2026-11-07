# EduComp — Especificação Funcional de Busca e Filtros

**Versão:** 0.3  
**Data:** 07/11/2026  
**Módulo:** Biblioteca  
**Situação:** especificação funcional em consolidação; decisões complementares pendentes.

## 1. Objetivo

Este documento define o comportamento da pesquisa textual, dos filtros e da apresentação dos resultados da Biblioteca do EduComp.

A especificação orienta a implementação, a integração e os testes dessas funcionalidades, estabelecendo regras para seleção de critérios, combinação de filtros, atualização dos resultados e tratamento dos diferentes estados da consulta.

O objetivo é permitir que professores encontrem materiais pedagógicos de Computação utilizando palavras-chave e classificações associadas aos recursos disponíveis.

As tecnologias, os contratos de API e os mecanismos de consulta ao banco de dados serão definidos na preparação técnica do projeto.

### 1.1. Referências

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Especificação de metadados](especificacao-metadados.md)
- [Design System](../ux-ui/design-system.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
- [Biblioteca desktop — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32684)
- [Filtros e sobreposições — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33638)

## 2. Escopo e condições gerais

A Biblioteca deve oferecer:

- Consulta aos materiais aprovados e disponibilizados para publicação.
- Pesquisa textual por título e tema.
- Filtros por tipo de material, etapa de ensino e eixo da Computação.
- Seleção múltipla de opções em cada categoria.
- Combinação entre pesquisa textual e filtros aplicados.
- Acesso aos detalhes dos materiais encontrados.
- Indicação da quantidade de resultados, quando disponível.
- Navegação por resultados.
- Estados de carregamento, ausência de correspondências e falha.

Somente materiais publicados e disponíveis ao público correspondente podem integrar os resultados da Biblioteca.

Materiais pendentes, em análise ou recusados não devem aparecer como recursos publicados.

As permissões de acesso para visitantes e usuários autenticados serão definidas conforme as regras funcionais do produto.

### 2.1. Limites do módulo

Esta especificação trata da pesquisa e dos filtros da Biblioteca.

A área de **Materiais salvos** poderá reutilizar componentes e padrões de interação, mas suas consultas devem operar sobre a coleção pessoal do professor. A aplicação dos mesmos recursos de pesquisa e filtros em Salvos depende da definição do comportamento correspondente.

A especificação também não contempla recomendações automáticas, pesquisa semântica, personalização de resultados ou mecanismos avançados de classificação por comportamento.

### 2.2. Estratégia de implementação

O desenvolvimento começará pela interface desktop, utilizando o protótipo de 1536 px como referência visual.

Essa prioridade não altera as regras funcionais descritas neste documento. A adaptação para tablet e dispositivos móveis será realizada posteriormente, mantendo a pesquisa e os filtros disponíveis na experiência responsiva.

Os frames do Figma representam estados e exemplos de apresentação. Quantidades de materiais, nomes de recursos e resultados ilustrativos não constituem dados fixos da aplicação.

## 3. Pesquisa textual

### 3.1. Campo e dados pesquisáveis

A Biblioteca deve disponibilizar um campo para informar palavras-chave relacionadas aos materiais.

A pesquisa considera dois campos:

| Campo | Conteúdo pesquisado |
| --- | --- |
| **Título** | Nome cadastrado para o material. |
| **Tema** | Assunto ou temas associados ao material. |

A descrição e os demais metadados não estão incluídos como campos pesquisáveis nesta versão.

A representação dos temas deverá seguir a [Especificação de metadados](especificacao-metadados.md).

Ainda é necessário definir se o tema será armazenado como texto, lista de termos ou outra estrutura, bem como sua obrigatoriedade e possibilidade de múltiplos valores.

### 3.2. Execução da pesquisa

A pesquisa deverá seguir estas condições:

1. O usuário informa uma palavra ou expressão no campo.
2. A consulta é executada pelo mecanismo de acionamento definido para a interface.
3. O sistema considera os campos pesquisáveis dos materiais publicados.
4. Os resultados respeitam os filtros efetivamente aplicados.
5. A listagem apresenta os materiais correspondentes ou um estado apropriado quando não houver resultados.

Ao alterar o texto pesquisado, o sistema não deve apagar as seleções de filtros existentes.

Ao executar uma nova pesquisa, os resultados da consulta anterior devem ser substituídos, preservando a consistência entre os critérios utilizados e os materiais apresentados.

Quando não houver texto de pesquisa nem filtros aplicados, a Biblioteca deve apresentar os materiais publicados, respeitando as regras de ordenação e navegação.

**Decisões pendentes**

- Definir se a pesquisa será executada por Enter, botão Buscar, digitação ou combinação desses mecanismos.
- Definir o tratamento de maiúsculas, minúsculas e acentos.
- Definir correspondências parciais e palavras completas.
- Definir como consultas com múltiplas palavras serão interpretadas.
- Determinar se haverá intervalo de espera antes de executar consultas durante a digitação.

O protótipo desktop apresenta campo de pesquisa e botão **Buscar**, que devem orientar a definição do comportamento inicial.

### 3.3. Ordenação

Os resultados devem possuir uma ordenação estável e previsível.

Consultas equivalentes, realizadas sobre o mesmo conjunto de dados e com os mesmos critérios, devem apresentar os materiais na mesma sequência.

A ordenação precisa permanecer consistente ao combinar pesquisa, filtros e navegação pelos resultados.

**Decisões pendentes**

- Critério padrão de ordenação.
- Uso de relevância textual.
- Prioridade entre título e tema.
- Regras de desempate.
- Disponibilidade de outras opções de ordenação.

A definição desses critérios deve ocorrer antes da implementação definitiva da consulta.

### 3.4. Pesquisa sem correspondências

Quando nenhum material atender ao texto pesquisado, isoladamente ou em combinação com filtros, a interface deverá:

- Informar que não foram encontrados materiais para os critérios utilizados.
- Preservar o texto da pesquisa.
- Preservar os filtros aplicados.
- Permitir a alteração ou remoção dos critérios.
- Disponibilizar um caminho claro para realizar outra consulta.

Esse estado não deve ser confundido com uma Biblioteca que ainda não possui materiais publicados.

## 4. Filtros da Biblioteca

### 4.1. Categorias e opções

O MVP prevê três categorias de filtros.

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

As opções precisam corresponder às classificações utilizadas no cadastro dos materiais.

A inclusão de subdivisões, modalidades adicionais e outras classificações dependerá de revisão da taxonomia e dos requisitos.

### 4.2. Seleção múltipla

Cada categoria deve permitir a seleção de mais de uma opção.

As seleções deverão ser combinadas de acordo com as seguintes regras:

| Contexto | Operador | Comportamento |
| --- | --- | --- |
| Opções da mesma categoria | **OU** | O material pode corresponder a qualquer uma das opções selecionadas. |
| Categorias diferentes | **E** | O material deve atender a todas as categorias com filtros ativos. |
| Pesquisa textual e filtros | **E** | O material deve corresponder à pesquisa e às categorias filtradas. |
| Categoria sem seleção | Nenhum | A categoria não restringe os resultados. |

**Exemplo de combinação**

O professor seleciona:

- **Tipo:** Plano de aula ou Atividade.
- **Etapa:** Ensino Fundamental — Anos iniciais.
- **Eixo:** Pensamento Computacional.
- **Pesquisa:** `algoritmo`.

O sistema deverá apresentar apenas materiais que correspondam ao termo pesquisado, à etapa de ensino e ao eixo selecionados, pertencendo a pelo menos um dos dois tipos de material escolhidos.

A seleção múltipla realizada pelo usuário não implica necessariamente que cada material possa possuir várias classificações da mesma categoria. Essa cardinalidade deverá ser definida na especificação de metadados.

## 5. Aplicação e gerenciamento dos filtros

### 5.1. Estados de seleção

Os controles devem distinguir dois estados:

**Seleções aplicadas**

São os critérios confirmados que estão restringindo a consulta atual.

**Seleções em edição**

São os critérios temporários que o usuário está alterando antes da confirmação.

Essa distinção evita que mudanças ainda não confirmadas afetem a Biblioteca.

### 5.2. Abertura e edição

Ao abrir uma categoria de filtro, a interface deverá apresentar as opções e identificar aquelas que já estão aplicadas.

O comportamento previsto é:

1. O usuário abre uma categoria.
2. As opções aplicadas aparecem selecionadas.
3. O usuário marca ou desmarca opções.
4. As modificações permanecem em edição.
5. A listagem continua utilizando os critérios anteriormente aplicados.
6. O usuário confirma as alterações por meio da ação **Aplicar**.
7. A interface atualiza a consulta e apresenta os novos resultados.

Aplicar alterações em uma categoria não deve remover os filtros das demais categorias nem o texto da pesquisa.

### 5.3. Ação Aplicar

A ação **Aplicar** confirma as seleções em edição da categoria correspondente.

Após a confirmação:

- Os novos critérios passam a integrar a consulta.
- Os resultados são atualizados.
- Os demais filtros permanecem aplicados.
- O texto da pesquisa é preservado.
- A navegação pelos resultados retorna ao início do conjunto correspondente à nova consulta.
- Ao reabrir a categoria, as opções aplicadas continuam identificadas.

Se as seleções confirmadas forem equivalentes às já aplicadas, a interface não precisa alterar desnecessariamente o estado dos resultados.

### 5.4. Fechamento sem aplicar

O resultado de fechar um filtro sem acionar **Aplicar** ainda precisa ser definido.

As alternativas a avaliar são:

- Descartar as alterações temporárias e preservar as seleções anteriormente aplicadas.
- Manter as alterações em edição para uma abertura posterior, sem aplicá-las à listagem.

Independentemente da decisão, fechar uma sobreposição não pode alterar os resultados de maneira implícita ou inconsistente.

O comportamento deve ser uniforme nas três categorias.

### 5.5. Ação Limpar

A ação **Limpar** deve permitir remover seleções de filtros.

Seu funcionamento ainda depende de duas decisões:

- **Alcance:** limpar apenas a categoria aberta ou todas as categorias.
- **Confirmação:** aplicar a limpeza imediatamente ou aguardar o acionamento de Aplicar.

O texto de pesquisa não deve ser removido como consequência de uma ação destinada exclusivamente à limpeza de filtros.

O comportamento definitivo precisa ser documentado antes da implementação.

### 5.6. Preservação dos critérios

Os filtros aplicados devem ser preservados durante a navegação pela Biblioteca.

Isso inclui:

- Abrir e fechar sobreposições.
- Modificar o texto da pesquisa.
- Navegar entre conjuntos de resultados.
- Abrir os detalhes de um material e retornar à Biblioteca durante a mesma navegação.

Ao retornar dos detalhes, o professor deve encontrar a pesquisa e os filtros anteriormente utilizados.

Ainda será necessário definir:

- A preservação da posição de rolagem.
- A persistência da consulta após recarregar a página.
- A representação dos critérios no endereço da página ou no estado da aplicação.

A solução técnica deverá manter a experiência coerente sem depender do armazenamento exclusivo de informações na interface visual.

## 6. Atualização e navegação pelos resultados

### 6.1. Aplicação dos critérios

Cada listagem deve corresponder à combinação atual de texto pesquisado e filtros efetivamente aplicados.

Resultados obtidos com critérios anteriores não devem ser apresentados como definitivos após a execução de uma nova consulta.

Quando o usuário alterar a pesquisa ou aplicar uma nova combinação de filtros, a navegação deverá voltar ao início do novo conjunto de resultados.

### 6.2. Consultas concorrentes

A aplicação deve tratar adequadamente situações em que uma nova consulta é executada antes da conclusão da anterior.

**Exemplo**

1. O usuário pesquisa por `algoritmo`.
2. Antes do retorno da consulta, altera o termo para `internet` e executa uma nova pesquisa.
3. A segunda consulta é concluída.
4. A primeira consulta termina depois.

Nesse cenário, a resposta da primeira consulta não pode substituir os resultados correspondentes à pesquisa mais recente.

O controle poderá ser realizado por cancelamento de requisições, identificação da consulta ativa ou outro mecanismo tecnicamente apropriado.

A escolha da implementação pertence à arquitetura técnica, desde que preserve o comportamento especificado.

### 6.3. Navegação pelos resultados

A Biblioteca deve permitir consultar os materiais além do primeiro conjunto apresentado.

As alternativas previstas são:

- **Paginação:** navegação entre páginas numeradas ou controles equivalentes.
- **Carregamento progressivo:** apresentação de novos conjuntos de materiais mediante uma ação de continuidade.

O protótipo desktop apresenta paginação como referência visual, mas a escolha definitiva ainda não foi registrada.

Independentemente do mecanismo adotado:

- A quantidade de itens por carregamento deve ser controlada.
- Os materiais não devem ser duplicados na listagem.
- O estado de carregamento deve ser comunicado.
- A alteração dos critérios deve reiniciar a navegação.
- Erros no carregamento adicional não devem eliminar indevidamente resultados já apresentados.
- A ordenação deve permanecer consistente entre páginas ou lotes.

**Decisões pendentes**

- Escolha do mecanismo.
- Quantidade de materiais por página ou lote.
- Apresentação da quantidade total de resultados.
- Tratamento do retorno à posição anteriormente consultada.

### 6.4. Estados da listagem

| Estado | Comportamento esperado |
| --- | --- |
| Carregamento inicial | Informar que os materiais estão sendo consultados. |
| Resultados disponíveis | Apresentar os materiais correspondentes e permitir acesso aos detalhes. |
| Acervo vazio | Informar que não existem materiais publicados disponíveis. |
| Sem correspondências | Informar que os critérios atuais não retornaram resultados e permitir sua revisão. |
| Falha na consulta | Comunicar o problema e oferecer nova tentativa quando aplicável. |
| Carregamento adicional | Indicar a obtenção de mais materiais sem interromper desnecessariamente a consulta atual. |
| Falha no carregamento adicional | Preservar resultados existentes e permitir repetir a operação. |

A interface não deve apresentar dados fictícios como resultados definitivos de uma consulta.

As mensagens devem utilizar linguagem clara e informar a situação encontrada.

A redação visual das mensagens deverá seguir o Design System e o handoff.

### 6.5. Quantidade de resultados

Quando a aplicação disponibilizar a quantidade de materiais encontrados, a interface deverá apresentar esse número de maneira consistente com a consulta.

A contagem deve refletir os critérios aplicados e não pode continuar exibindo um valor anterior após a atualização dos resultados.

Se a quantidade total não estiver disponível, a interface não deve apresentar estimativas como valores confirmados.

## 7. Orientações de interface e acessibilidade

A interface desktop deverá seguir o [Handoff de UI/UX](../ux-ui/handoff.md) e o [Design System](../ux-ui/design-system.md).

Os controles de pesquisa e filtros precisam apresentar:

- Rótulos identificáveis.
- Estados visuais de seleção.
- Indicação de foco.
- Navegação por teclado.
- Ações claras de confirmação e limpeza.
- Mensagens compreensíveis.
- Tratamento dos estados de carregamento e erro.

As opções selecionadas devem ser identificáveis também por tecnologias assistivas, sem depender exclusivamente de cor.

As sobreposições devem possuir mecanismos de abertura e fechamento acessíveis. O foco precisa ser administrado de acordo com o tipo de componente utilizado.

### 7.1. Composição desktop

O protótipo utiliza frames de 1536 px como referência principal.

A implementação deve preservar a disposição dos controles de busca, filtros e resultados, permitindo sua utilização em janelas desktop menores.

A quantidade de colunas, as larguras dos controles e os espaçamentos devem acompanhar os padrões definidos para a interface.

### 7.2. Responsividade

A adaptação para tablet e dispositivos móveis será realizada em etapa posterior do desenvolvimento.

As versões responsivas deverão preservar:

- O campo de pesquisa.
- As três categorias de filtros.
- A seleção múltipla.
- As ações Aplicar e Limpar.
- A identificação dos critérios selecionados.
- A navegação e o acesso aos resultados.

Mudanças de composição visual não devem alterar a lógica funcional das consultas.

## 8. Cenários de aceitação

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| **CA-BF-01** | Abrir a Biblioteca sem pesquisa e sem filtros. | São apresentados os materiais publicados, conforme a ordenação e navegação definidas. |
| **CA-BF-02** | Pesquisar um termo presente no título. | O material pode ser localizado conforme a regra de correspondência textual. |
| **CA-BF-03** | Pesquisar um termo associado ao tema. | O material pode ser localizado conforme a representação de tema adotada. |
| **CA-BF-04** | Selecionar Plano de aula e Atividade no mesmo filtro. | Após aplicar, os resultados podem incluir materiais de qualquer um dos dois tipos. |
| **CA-BF-05** | Combinar tipo, etapa e eixo. | Cada resultado atende às categorias selecionadas, utilizando E entre elas. |
| **CA-BF-06** | Combinar pesquisa textual e filtros. | Cada resultado corresponde ao texto pesquisado e às categorias aplicadas. |
| **CA-BF-07** | Modificar seleções sem aplicar. | Os resultados continuam utilizando os filtros anteriormente aplicados. |
| **CA-BF-08** | Acionar Aplicar após modificar uma categoria. | A listagem é atualizada sem remover as demais categorias nem a pesquisa. |
| **CA-BF-09** | Reabrir uma categoria após aplicar. | As seleções confirmadas permanecem identificadas. |
| **CA-BF-10** | Alterar ou limpar a pesquisa com filtros ativos. | Os filtros permanecem aplicados. |
| **CA-BF-11** | Utilizar critérios sem correspondência. | É apresentado o estado sem resultados, preservando os critérios. |
| **CA-BF-12** | Consultar uma Biblioteca sem materiais publicados. | É apresentado um estado de acervo vazio, diferente de uma pesquisa sem correspondências. |
| **CA-BF-13** | Ocorrer falha no carregamento. | A interface informa a falha e permite nova tentativa quando aplicável. |
| **CA-BF-14** | Alterar critérios durante uma consulta em andamento. | Uma resposta anterior não substitui os resultados da consulta mais recente. |
| **CA-BF-15** | Abrir detalhes e retornar à Biblioteca. | A pesquisa e os filtros utilizados anteriormente permanecem disponíveis. |
| **CA-BF-16** | Alterar os critérios estando em uma página ou lote posterior. | A navegação retorna ao início dos resultados da nova consulta. |
| **CA-BF-17** | Carregar mais resultados e ocorrer uma falha. | Os materiais já apresentados são preservados e não são duplicados durante uma nova tentativa. |

Os cenários dependentes de definições pendentes deverão receber condições e dados de teste definitivos antes da execução.

A verificação deverá considerar não apenas a apresentação visual, mas também a correspondência entre os critérios enviados à consulta e os resultados recebidos.

## 9. Decisões pendentes

| Tema | Definição necessária | Referência |
| --- | --- | --- |
| Representação de tema | Estrutura, obrigatoriedade e possibilidade de múltiplos valores. | BK-006 |
| Pesquisa textual | Normalização, correspondências parciais e interpretação de múltiplas palavras. | BK-004 |
| Execução da pesquisa | Enter, botão Buscar, digitação ou combinação desses mecanismos. | BK-004 |
| Ordenação | Critério inicial, relevância e desempates. | BK-004 |
| Fechamento sem aplicar | Descarte ou preservação das seleções temporárias. | BK-005 |
| Ação Limpar | Alcance da limpeza e necessidade de confirmação. | BK-005 |
| Opções sem resultados | Manter, ocultar ou desabilitar opções sem correspondências. | BK-005 |
| Taxonomia | Classificações definitivas e possibilidade de múltiplos valores por material. | BK-006 |
| Navegação pelos resultados | Paginação ou carregamento progressivo e quantidade de itens. | BK-004 / BK-022 |
| Preservação da navegação | Estado após recarregamento e posição de rolagem. | BK-022 |
| Pesquisa em Salvos | Confirmar o alcance dos controles de busca e filtros na coleção pessoal. | BK-017 |
| Responsividade | Composição e interação dos filtros em telas menores. | BK-032 |

As decisões deverão ser incorporadas a esta especificação e refletidas nos requisitos, no backlog e na implementação correspondente.

A ausência dessas definições não impede a construção inicial dos componentes visuais da Biblioteca, mas precisa ser resolvida antes da conclusão funcional dos comportamentos afetados.

## 10. Rastreabilidade

| Artefato | Identificadores relacionados |
| --- | --- |
| Requisitos funcionais | RF-001, RF-002, RF-003, RF-004 e RF-005 |
| Histórias de usuário | US-001, US-002 e US-003 |
| Backlog — pesquisa | BK-004 |
| Backlog — filtros | BK-005 |
| Backlog — metadados | BK-006 |
| Backlog — implementação da Biblioteca | BK-022 |
| Backlog — responsividade | BK-032 |

Os requisitos não funcionais, especialmente os relacionados à usabilidade, acessibilidade, consistência visual e desempenho percebido, também se aplicam ao módulo.

## 11. Documentos relacionados

- [Product Brief](product-brief.md)
- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de metadados](especificacao-metadados.md)
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md)
- [User Flow](../ux-ui/user-flow.md)
- [Design System](../ux-ui/design-system.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)

---

Esta especificação deverá acompanhar as decisões funcionais tomadas durante a preparação e o desenvolvimento da Biblioteca.

Alterações na pesquisa, nos filtros ou nas classificações devem ser refletidas nos documentos relacionados, preservando a coerência entre o comportamento esperado, os dados cadastrados e a interface implementada.
