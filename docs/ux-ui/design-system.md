# Design System — EduComp

**Status:** Base inicial; aplicar e validar no Figma  
**Versão:** 0.4  
**Escopo:** MVP do EduComp

## 1. Objetivo

Documentar os princípios visuais, os tokens de interface e os comportamentos esperados dos componentes do EduComp.

O Design System deve contribuir para uma experiência consistente, legível e acessível, facilitando a identificação de materiais educacionais, a pesquisa, a aplicação de filtros e o acesso aos recursos.

Este documento descreve uma referência inicial. Os valores visuais propostos não devem ser considerados definitivos sem conferência com os arquivos de design existentes no Figma.

## 2. Direção visual

A direção visual do EduComp é institucional e minimalista, com predominância de azul-marinho, azuis de destaque e textos claros nas áreas escuras. Superfícies de formulários e conteúdo podem usar branco ou azul muito claro, conforme a tela definida no Figma.

Os princípios são:

- **Clareza:** facilitar a leitura e a compreensão das informações.
- **Hierarquia visual:** diferenciar títulos, descrições, metadados e ações.
- **Consistência:** manter padrões comuns entre componentes que desempenham funções semelhantes.
- **Funcionalidade:** evitar elementos decorativos que prejudiquem a compreensão ou a navegação.
- **Acessibilidade:** considerar contraste, legibilidade, foco e interação por teclado.
- **Responsividade:** preservar a organização e a legibilidade em diferentes tamanhos de tela.

A identidade visual do MVP não deve depender de cores decorativas para comunicar informações importantes. Estados e ações precisam ser compreensíveis também por meio de texto, forma, ícones adequados ou outros sinais visuais.

## 3. Tokens de cor

A tabela apresenta valores iniciais propostos para orientar a documentação. Eles devem ser conferidos no Figma antes da implementação.

| Token | Valor proposto | Aplicação |
|---|---|---|
| `color-background` | `#10264A` | Fundo principal das telas institucionais escuras |
| `color-surface` | `#234A85` | Cartões nas telas de apresentação em fundo azul |
| `color-surface-muted` | `#F5F8FE` | Fundo de formulários e áreas claras |
| `color-text-primary` | `#FFFFFF` em superfícies escuras; `#102B5C` em superfícies claras | Títulos e textos principais |
| `color-text-secondary` | `#C9DDFC` em superfícies escuras; `#6F8FC4` em superfícies claras | Descrições e informações auxiliares |
| `color-border` | `#315587` em superfícies escuras; `#D9E6FB` em superfícies claras | Bordas e divisórias |
| `color-action` | `#1761D8` | Fundo das ações principais |
| `color-action-text` | `#FFFFFF` | Texto sobre ações principais |
| `color-focus` | A definir | Indicador de foco |
| `color-error` | A definir | Mensagens e estados de erro |
| `color-disabled` | A definir | Elementos desabilitados |

### 3.1. Regras de uso

- Utilizar o texto principal para informações prioritárias.
- Utilizar o texto secundário apenas quando a hierarquia visual deixar clara a importância da informação.
- Reservar fundos secundários para separar áreas sem criar ruído visual.
- Manter bordas discretas, mas perceptíveis quando necessárias para identificar limites de componentes.
- Definir cores específicas para foco, erro e desabilitação após verificar o contraste e a consistência com o Figma.
- Não usar apenas a cor para comunicar que um campo contém erro, que um filtro está selecionado ou que uma ação está indisponível.

Os valores de cor foram alinhados à direção visual atual do EduComp no Figma e devem ser conferidos novamente antes da implementação.

## 4. Tipografia

A tipografia deve estabelecer uma hierarquia clara e favorecer a leitura de títulos, descrições e metadados.

| Estilo | Aplicação |
|---|---|
| Título principal | Nome da página ou mensagem principal |
| Título de seção | Organização dos grupos de conteúdo |
| Título de material | Identificação do recurso no catálogo e nos detalhes |
| Texto de corpo | Resumos, descrições e informações gerais |
| Texto auxiliar | Categorias, metadados e orientações complementares |
| Texto de ação | Rótulos de botões e links |

A família tipográfica, os tamanhos, os pesos, a altura de linha e os demais parâmetros devem ser conferidos nos estilos do Figma.

Não estabelecer valores tipográficos definitivos apenas com base nesta documentação.

## 5. Espaçamento, alinhamento e estrutura

Recomenda-se uma escala de espaçamento baseada em múltiplos de 4 px como ponto de partida.

Essa escala deve orientar a consistência dos intervalos entre:

- ícones e rótulos;
- conteúdo interno de botões e campos;
- informações dentro dos cartões;
- cartões e elementos da listagem;
- seções de uma página;
- conteúdo principal e limites da área de visualização.

Os valores efetivos de espaçamento, margens, largura de conteúdo, altura dos componentes e alinhamentos devem seguir o Figma quando houver especificações existentes.

A organização deve evitar tanto a compactação excessiva quanto o uso de espaços que prejudiquem a leitura e a comparação entre materiais.

## 6. Componentes da interface

### 6.1. Cabeçalho

Responsável pela identificação do EduComp e pela navegação principal, conforme a estrutura definida para o MVP.

Requisitos esperados:

- apresentar a identificação do produto de forma consistente;
- manter alinhamento e espaçamento coerentes;
- preservar a legibilidade em telas menores;
- não competir visualmente com o conteúdo principal.

Os itens definitivos de navegação e o comportamento responsivo do cabeçalho ainda devem ser conferidos no protótipo.

### 6.2. Campo de pesquisa

Permite informar termos para localizar materiais educacionais.

Requisitos esperados:

- apresentar um rótulo ou indicação compreensível;
- tornar clara a finalidade do campo;
- exibir um estado de foco perceptível;
- permitir correção do texto informado;
- manter o texto digitado legível em diferentes tamanhos de tela.

A pesquisa considera título, tipo de material, resumo e descrição. As regras funcionais detalhadas estão documentadas em `docs/product/requisitos.md`.

O comportamento definitivo para envio da consulta, atualização dos resultados e limpeza do campo deve permanecer alinhado aos requisitos e ao fluxo de navegação.

### 6.3. Filtros

Permitem restringir os materiais por critérios disponibilizados no MVP.

Tipo de material e etapa de ensino são critérios previstos para avaliação, mas as opções definitivas e as regras de combinação ainda precisam ser formalizadas.

Requisitos visuais esperados:

- diferenciar filtros selecionados e não selecionados;
- tornar a seleção perceptível sem depender apenas da cor;
- apresentar rótulos compreensíveis;
- facilitar a revisão e a remoção de critérios ativos;
- preservar a legibilidade em dispositivos móveis.

A apresentação final dos filtros — por exemplo, controles de seleção, listas ou outro padrão — depende da solução definida no Figma.

### 6.4. Item ou cartão de material

Apresenta uma síntese do recurso na listagem.

Deve priorizar:

- título;
- informações que ajudem a identificar o material;
- metadados relevantes quando disponíveis;
- indicação clara de que o item pode ser selecionado, se esse for seu comportamento.

O cartão não deve depender da existência de um link externo para representar um material. A disponibilidade de acesso deve ser tratada de acordo com os dados do recurso e apresentada de forma consistente nos detalhes.

A composição final, a ordem dos metadados e o uso de imagens ou ícones ainda precisam ser conferidos no Figma.

### 6.5. Botões e ações

Os botões devem distinguir ações principais e secundárias de acordo com sua importância no contexto.

O rótulo deve descrever a ação de forma direta, evitando expressões vagas quando uma descrição mais específica estiver disponível.

As ações podem incluir, conforme o contexto:

- pesquisar;
- limpar ou ajustar filtros;
- abrir os detalhes de um material;
- acessar um link externo;
- acessar um arquivo hospedado;
- tentar novamente após uma falha, quando essa opção for aplicável.

Os rótulos e a hierarquia das ações devem ser consistentes. A aparência de um botão não deve prometer uma funcionalidade que não está disponível.

### 6.6. Links de acesso

Os detalhes de um material devem representar as opções de acesso efetivamente disponíveis.

O MVP considera quatro cenários:

1. somente link externo;
2. somente arquivo hospedado;
3. link externo e arquivo hospedado;
4. nenhuma opção de acesso disponível.

Quando houver duas opções, cada uma deve possuir identificação clara. Quando não houver opção disponível, a interface deve comunicar essa condição sem apresentar uma ação inexistente.

O comportamento visual e funcional de cada opção precisa ser consistente com os requisitos de produto.

### 6.7. Página de detalhes

Organiza as informações de um material selecionado.

A hierarquia visual deve distinguir:

- título;
- metadados;
- resumo e descrição;
- orientações de uso, quando disponíveis;
- opções de acesso.

Informações ausentes não devem gerar espaços ou rótulos confusos. A regra definitiva de exibição dos campos opcionais depende do modelo de dados e dos requisitos.

### 6.8. Estado sem resultados

Informa que a pesquisa e os filtros atuais não encontraram materiais correspondentes.

Deve apresentar:

- uma mensagem objetiva;
- orientação para revisar os termos ou ajustar os filtros;
- uma ação de recuperação, quando aplicável.

O estado sem resultados deve ser visualmente distinto de carregamento, falha ao carregar dados e falha ao acessar um material.

### 6.9. Estados de carregamento e erro

A interface deve distinguir situações diferentes:

- carregamento dos dados;
- falha ao carregar o catálogo ou os detalhes;
- falha ao acessar um recurso;
- ausência de resultados.

Quando houver uma ação de recuperação, como tentar novamente, seu rótulo deve descrever o comportamento esperado.

As mensagens definitivas, os indicadores visuais e os mecanismos de recuperação ainda precisam ser especificados.

## 7. Estados dos componentes

Os componentes interativos devem considerar os estados relevantes para sua função.

| Estado | Comportamento esperado |
|---|---|
| Padrão | Apresentação normal do componente |
| Hover | Feedback visual ao passar o ponteiro, quando aplicável |
| Foco | Indicador perceptível ao navegar por teclado |
| Selecionado | Indicação clara de seleção em filtros e controles |
| Desabilitado | Indicação de que a interação não está disponível |
| Carregamento | Feedback de que uma operação está em andamento |
| Erro | Indicação compreensível de uma falha, quando aplicável |

Nem todo componente precisa de todos esses estados. A especificação deve considerar a função do componente e o contexto de uso.

Os estados definidos no design devem corresponder ao comportamento real da interface durante a implementação.

## 8. Acessibilidade

O projeto da interface deve considerar os seguintes critérios:

- contraste suficiente entre texto, fundo e elementos interativos;
- hierarquia consistente de títulos;
- rótulos claros para campos e controles;
- foco visível durante a navegação por teclado;
- identificação textual das ações;
- informações que não dependam exclusivamente de cores;
- mensagens de erro compreensíveis;
- organização que favoreça a leitura em telas menores;
- áreas de interação adequadas ao dispositivo utilizado.

Esses critérios são diretrizes iniciais. Os requisitos verificáveis, as referências normativas e os procedimentos de validação ainda precisam ser definidos em documentação própria.

## 9. Responsividade

A interface deve preservar sua funcionalidade e legibilidade em computadores e dispositivos móveis.

Durante o detalhamento do layout, devem ser considerados:

- reorganização da listagem de materiais;
- adaptação do campo de pesquisa e dos filtros;
- leitura dos metadados e descrições;
- acesso às ações principais;
- prevenção de rolagem horizontal desnecessária;
- identificação dos elementos interativos;
- adequação das áreas de interação a telas sensíveis ao toque.

Os pontos de quebra, as dimensões dos componentes e as regras específicas de reorganização dependem do layout definido no Figma.

## 10. Relação com a arquitetura e os requisitos

O Design System deve permanecer alinhado com:

- `docs/ux-ui/arquitetura-da-informacao.md`;
- `docs/ux-ui/objetivos-de-ux.md`;
- `docs/ux-ui/user-flow.md`;
- `docs/product/requisitos.md`;
- `docs/product/historias-de-usuario.md`;
- `docs/product/backlog.md`.

A arquitetura define a organização das informações; os requisitos definem os comportamentos esperados; os fluxos descrevem os percursos; e o Design System orienta a apresentação visual e os estados dos componentes.

Em caso de divergência, a decisão deve ser registrada e resolvida durante a revisão documental.

## 11. Decisões pendentes

Antes de considerar o Design System pronto para implementação, devem ser confirmados:

- os tokens de cor efetivamente utilizados no Figma;
- a família tipográfica e a escala de tamanhos;
- a escala definitiva de espaçamento;
- as dimensões e os pontos de quebra responsivos;
- a composição final do cartão de material;
- a apresentação e o comportamento dos filtros;
- os estilos de botões e links de acesso;
- os indicadores de foco, erro, carregamento e desabilitação;
- os critérios verificáveis de acessibilidade.

Esses itens são pendências documentais, não decisões já aprovadas.

## 12. Evolução do documento

Esta versão consolida os princípios visuais, os componentes previstos e os estados necessários para o MVP. Não representa uma implementação concluída nem uma validação visual com usuários.

Após a conferência com o Figma, os tokens e componentes deverão ser atualizados para refletir as decisões efetivas de design. Durante a implementação, a interface deverá ser verificada quanto à consistência, à responsividade e à acessibilidade.

A documentação deve evoluir junto com o produto, mantendo explícita a diferença entre propostas, decisões confirmadas e itens pendentes.


## Componentes para funcionalidades aprovadas do MVP

- **Upload de arquivo:** área de seleção/arrastar e soltar, lista de arquivos selecionados, indicação de formato e limite, estado de progresso e mensagens de erro.
- **Status de revisão:** etiquetas para “Pendente de revisão”, “Aprovado” e “Rejeitado”; não depender apenas da cor para comunicar o estado.
- **Favoritos:** controle de alternância com estados selecionado/não selecionado, nome acessível e feedback após a ação.
- **Compartilhamento:** ação “Copiar link” com confirmação acessível.
- **Formulários:** validação junto ao campo e preservação dos valores já preenchidos quando houver erros.
