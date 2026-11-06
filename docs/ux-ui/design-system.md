# EduComp — Design System

**Versão:** 0.6  
**Data:** 06/11/2026  
**Situação:** fundamentos visuais definidos no Figma; padrões de interface documentados para desenvolvimento desktop.

## 1. Objetivo

O Design System do EduComp reúne os fundamentos de identidade visual e os padrões de interface que orientam a construção da plataforma.

Seu objetivo é manter a consistência entre páginas, componentes e estados de interação, além de facilitar a manutenção e a evolução da aplicação.

Este documento estabelece cores, tipografia, diretrizes de composição, componentes e comportamentos visuais. O [handoff de UI/UX](handoff.md) complementa essas definições com as referências de telas e orientações para implementação.

As regras de negócio, permissões e funcionalidades previstas para a primeira versão são tratadas na documentação de produto.

### 1.1. Referências

- [Identidade visual — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Protótipo desktop — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Handoff de UI/UX](handoff.md)

O desktop é a referência principal desta etapa de desenvolvimento. As versões mobile e tablet permanecem disponíveis no Figma para orientar a adaptação responsiva posterior.

## 2. Direção visual

A identidade do EduComp combina uma linguagem institucional com uma interface simples e acolhedora, adequada a uma plataforma de recursos educacionais.

O azul é a principal cor de identificação. Fundos claros, áreas de respiro e uma hierarquia tipográfica definida ajudam a manter o conteúdo em evidência.

As decisões visuais seguem cinco princípios:

- **Clareza:** apresentar informações e ações sem elementos desnecessários.
- **Consistência:** utilizar os mesmos padrões para funções equivalentes.
- **Hierarquia:** diferenciar títulos, conteúdo, metadados e ações.
- **Legibilidade:** favorecer a leitura de materiais, formulários e informações pedagógicas.
- **Acessibilidade:** garantir que a interface possa ser compreendida e utilizada por diferentes pessoas e formas de interação.

A aparência deve apoiar as atividades centrais da plataforma: encontrar, consultar, salvar, acessar e compartilhar materiais pedagógicos.

## 3. Identidade visual

### 3.1. Logotipo

O EduComp possui uma assinatura visual composta por símbolo, nome e subtítulo.

A aplicação principal deve preservar as proporções, o alinhamento e as cores definidos no guia de identidade visual.

Regras de aplicação:

- O fundo do símbolo utiliza a cor sólida `#1761D8`, sem gradiente.
- O nome **EduComp** utiliza `#313E55`.
- O subtítulo mantém a composição e as cores definidas no arquivo original.
- A assinatura deve preservar sua área de respiro e não sofrer distorções.
- As versões monocromática e inversa devem seguir as aplicações previstas no guia.

O Figma contém as referências de assinatura principal, monocromática, inversa, ícone e área de respiro.

Na implementação, devem ser utilizados os ativos exportados do design, preferencialmente em formato vetorial quando adequado.

### 3.2. Uso da marca

A identidade aparece no cabeçalho das páginas públicas, nas áreas internas da plataforma e nos elementos institucionais.

A aplicação deve considerar o contraste entre a marca e a superfície em que está inserida. Variações de tamanho ou disposição não devem modificar a composição original de forma arbitrária.

## 4. Sistema de cores

### 4.1. Variáveis existentes

O Figma possui a coleção **`EduComp — Fundamentos`**, com o modo **`Padrão`**.

As seguintes variáveis de cor estão cadastradas:

| Variável | Valor | Aplicação |
| --- | --- | --- |
| `color/brand/primary` | `#1761D8` | Cor principal e ações de destaque |
| `color/brand/deep` | `#102B5C` | Azul profundo da identidade |
| `color/brand/logo-background` | `#1761D8` | Fundo do símbolo da marca |
| `color/brand/logo-name` | `#313E55` | Nome EduComp no logotipo |
| `color/text/primary` | `#102B5C` | Texto principal |
| `color/text/secondary` | `#526987` | Texto secundário e informações de apoio |
| `color/surface/canvas` | `#F8FAFF` | Fundo geral das páginas |
| `color/surface/default` | `#FFFFFF` | Superfícies de conteúdo |
| `color/surface/soft` | `#D9E6FB` | Áreas de destaque suave |
| `color/border/subtle` | `#D9E6FB` | Bordas e divisórias discretas |
| `color/status/danger` | `#C7333D` | Erros e validações negativas |

A existência de uma variável no Figma não significa que ela esteja vinculada a todos os elementos correspondentes. Durante a implementação, deve-se priorizar seu uso semântico, evitando a repetição de valores isolados.

### 4.2. Regras de aplicação

**Cor principal**

O azul `#1761D8` identifica ações prioritárias, elementos ativos e destaques relacionados à marca.

Seu uso deve respeitar a hierarquia da página. Quando várias ações estiverem disponíveis, somente a ação prioritária deve receber o maior destaque visual.

**Cores de texto**

O azul profundo `#102B5C` é utilizado como referência para títulos e textos principais. O tom `#526987` atende às informações secundárias, descrições e metadados.

**Superfícies**

O branco e o fundo `#F8FAFF` estabelecem a separação entre áreas de conteúdo e fundo da página. O azul suave `#D9E6FB` pode ser utilizado para destacar informações sem competir com ações principais.

**Erros**

A cor `#C7333D` identifica situações de erro. Deve ser acompanhada de uma mensagem compreensível e, quando necessário, de um indicador adicional.

### 4.3. Cores complementares

A coleção atual ainda não contempla todos os estados necessários à aplicação, como sucesso, aviso, foco e indisponibilidade.

Essas cores devem ser definidas durante a implementação dos respectivos componentes, considerando contraste, consistência e acessibilidade.

Não devem ser introduzidas novas cores apenas para reproduzir diferenças pontuais entre telas.

## 5. Tipografia

### 5.1. Família tipográfica

A família principal do EduComp é **Inter**.

Sua aplicação abrange títulos, descrições, formulários, navegação, cartões e informações complementares.

A tipografia utiliza diferentes pesos para estabelecer hierarquia sem depender exclusivamente de tamanho ou cor.

### 5.2. Escala tipográfica

O guia de identidade visual estabelece os seguintes estilos de referência:

| Estilo | Tamanho | Altura de linha | Peso |
| --- | --- | --- | --- |
| `Display/Hero` | 38 px | 48 px | Bold — 700 |
| `Heading/H1` | 32 px | 40 px | Bold — 700 |
| `Heading/H2` | 28 px | 36 px | Semi Bold — 600 |
| `Heading/H3` | 20 px | 28 px | Semi Bold — 600 |
| `Body/Regular` | 16 px | 24 px | Regular — 400 |
| `Body/Small` | 14 px | 20 px | Regular — 400 |
| `Label/Medium` | 13 px | 18 px | Semi Bold — 600 |
| `Caption/Small` | 11 px | 16 px | Medium — 500 |

Esses oito estilos formam a escala semântica principal. O arquivo também contém estilos adicionais utilizados em composições específicas do protótipo, especialmente nas telas desktop.

Na implementação, a escala principal deve orientar a criação dos estilos reutilizáveis. Variações necessárias devem ser avaliadas conforme sua função, evitando a reprodução indiscriminada de todas as medidas presentes no Figma.

### 5.3. Hierarquia e uso

- **Display/Hero:** mensagens principais de apresentação.
- **Heading/H1:** título principal da página.
- **Heading/H2:** títulos de seções.
- **Heading/H3:** subtítulos e agrupamentos de informações.
- **Body/Regular:** conteúdo textual e descrições.
- **Body/Small:** informações secundárias, apoio e metadados.
- **Label/Medium:** rótulos, categorias e controles.
- **Caption/Small:** legendas e informações auxiliares.

A hierarquia tipográfica deve corresponder à estrutura semântica da página. O tamanho visual de um texto não substitui a utilização correta dos elementos de título, parágrafo ou rótulo na aplicação.

## 6. Layout e composição

### 6.1. Referência desktop

As telas desktop utilizam frames de **1536 px de largura** como referência principal.

Essa largura representa o ambiente de composição do protótipo, não um tamanho obrigatório para a janela do navegador.

A implementação deve preservar os alinhamentos e a distribuição dos elementos, permitindo que o conteúdo se adapte a larguras desktop menores sem cortes ou sobreposições.

As páginas com conteúdo extenso devem manter rolagem vertical natural, sem depender de alturas fixas que limitem a leitura.

### 6.2. Estruturas de página

O protótipo apresenta dois padrões principais de organização.

**Páginas públicas**

Utilizam cabeçalho institucional, áreas de apresentação ou formulários de acesso e navegação correspondente ao contexto. A página inicial também inclui seções informativas e rodapé.

**Área interna**

Compartilha navegação principal, cabeçalho de identificação e uma região de conteúdo que varia conforme a funcionalidade.

Biblioteca, Salvos, Detalhes, Enviar material e Meu perfil devem manter consistência entre essas estruturas.

Elementos compartilhados devem ser implementados como componentes reutilizáveis, evitando diferenças de posicionamento e comportamento entre páginas equivalentes.

### 6.3. Espaçamento e alinhamento

Os espaçamentos devem estabelecer relações claras entre elementos:

- Itens de um mesmo grupo devem permanecer visualmente próximos.
- Seções diferentes precisam de separação perceptível.
- Formulários devem manter alinhamento consistente entre rótulos, campos, mensagens e botões.
- Cartões devem seguir uma distribuição uniforme, preservando a leitura do conteúdo.
- Margens e áreas de respiro devem acompanhar a hierarquia da página.

A escala definitiva de espaçamento, os raios de borda, as dimensões de componentes e as larguras máximas ainda precisam ser consolidados como tokens de implementação.

Esses valores devem ser extraídos dos padrões recorrentes do desktop, sem transformar medidas excepcionais em regras globais.

## 7. Elevação e efeitos

O Figma possui o estilo de efeito **`Elevation/Modal`**, utilizado como referência de elevação para janelas e sobreposições.

Suas propriedades são:

| Propriedade | Valor |
| --- | --- |
| Tipo | Drop shadow |
| Deslocamento horizontal | 0 px |
| Deslocamento vertical | 18 px |
| Desfoque | 48 px |
| Expansão | 0 px |
| Cor aproximada | `rgba(10, 20, 41, 0.22)` |

O efeito deve reforçar a separação entre a sobreposição e o conteúdo de fundo, sem prejudicar a leitura.

Quando houver escurecimento ou desfoque da página, esses recursos devem ser combinados com moderação e utilizados de maneira consistente.

Outras sombras ou efeitos não devem ser introduzidos como padrões globais sem necessidade identificada.

## 8. Componentes de interface

O protótipo apresenta padrões recorrentes em diferentes telas e estados. Esses padrões orientam a construção de uma biblioteca de componentes no código, mesmo quando suas representações no Figma ainda não estão formalizadas como componentes mestres.

### 8.1. Botões e links

Os botões devem apresentar hierarquia visual compatível com a importância da ação.

Padrões necessários:

- **Primário:** ação principal do contexto.
- **Secundário:** ação complementar.
- **Textual:** navegação ou ação de menor destaque.
- **Com ícone:** ação identificada por símbolo, com rótulo acessível.

Estados a prever: padrão, hover, foco, pressionado, desabilitado e carregamento, conforme a função.

Textos de botões devem indicar a ação realizada, como **Buscar**, **Salvar alterações**, **Enviar para revisão** ou **Acessar material**.

### 8.2. Campos e formulários

Campos de texto, senha, pesquisa, seleção e entrada de arquivos devem compartilhar padrões de rótulo, preenchimento, borda, foco e validação.

Os estados necessários incluem:

- Padrão.
- Foco.
- Preenchido.
- Inválido.
- Desabilitado, quando aplicável.

Mensagens de erro devem aparecer próximas ao campo correspondente e explicar o que precisa ser corrigido.

Os formulários de autenticação, envio de materiais, contato e perfil devem utilizar os mesmos princípios, ainda que apresentem composições diferentes.

### 8.3. Cartão de material

O cartão reúne as informações necessárias para reconhecer um recurso antes de acessar seus detalhes.

Sua composição deve considerar:

- Identificação visual ou miniatura.
- Tipo de material.
- Título.
- Descrição resumida.
- Informações pedagógicas, como etapa ou ano escolar.
- Ação para acessar os detalhes.
- Ação de salvar, quando disponível no contexto.

O conteúdo é variável e não deve ser incorporado permanentemente ao componente.

Cartões utilizados na Biblioteca e em Salvos devem compartilhar uma estrutura visual coerente, incluindo tratamento de textos longos e ausência de imagens.

### 8.4. Pesquisa e filtros

A pesquisa e os filtros são elementos centrais da Biblioteca.

As categorias previstas são:

| Filtro | Opções |
| --- | --- |
| **Tipo de material** | Plano de aula, Slides, Material de apoio, Atividade, Sequência didática |
| **Etapa de ensino** | Educação Infantil, Ensino Fundamental — Anos iniciais, Ensino Fundamental — Anos finais, Ensino Médio |
| **Eixo da Computação** | Pensamento Computacional, Mundo Digital, Cultura Digital |

Os controles devem distinguir seleção, aplicação e limpeza dos filtros.

As opções em edição não devem ser confundidas com os filtros efetivamente aplicados aos resultados.

Os detalhes de combinação dos filtros e pesquisa são definidos na [especificação de busca e filtros](../product/especificacao-busca-filtros.md).

### 8.5. Menus e navegação

Menus de navegação, perfil e ações contextuais devem manter consistência visual e comportamental.

Devem apresentar:

- Indicação da opção ativa, quando aplicável.
- Estados de foco e hover.
- Abertura e fechamento previsíveis.
- Rótulos claros para cada ação.
- Posicionamento que não oculte conteúdo essencial.

A navegação principal deve apresentar uma estrutura reconhecível entre as páginas internas.

### 8.6. Modais e sobreposições

Modais e painéis de sobreposição são utilizados em situações como recuperação de senha, confirmação de envio, filtros, compartilhamento e ações de perfil.

Devem preservar:

- Identificação clara do conteúdo.
- Ação de fechamento.
- Hierarquia entre ações principais e secundárias.
- Separação visual em relação à página de origem.
- Controle adequado do foco durante a interação.
- Retorno ao contexto anterior após o fechamento.

O tamanho e a composição devem variar conforme o conteúdo, preservando um padrão visual comum.

### 8.7. Favoritos

O controle de favoritos deve comunicar claramente os estados **salvo** e **não salvo**.

Sua representação precisa permanecer consistente nos cartões, nos detalhes e na página de materiais salvos.

Quando houver atualização em andamento ou falha, o estado da interface deve refletir a operação sem apresentar uma confirmação antecipada.

### 8.8. Upload de arquivos

A interface de upload deve diferenciar:

- Área disponível para seleção.
- Arquivo selecionado.
- Validação de formato ou tamanho.
- Envio em andamento.
- Envio concluído.
- Falha de envio.

O formulário deve preservar as informações já preenchidas sempre que possível.

As restrições de formato e tamanho devem seguir a especificação funcional aprovada, ainda que o protótipo apresente valores ilustrativos.

### 8.9. Mensagens e estados vazios

Mensagens de feedback devem informar o resultado de ações sem interromper desnecessariamente a navegação.

Os estados vazios precisam ser específicos para cada contexto.

Uma coleção sem favoritos, uma pesquisa sem resultados e uma falha de carregamento representam situações diferentes e não devem compartilhar mensagens genéricas.

## 9. Estados de interação

Os componentes devem contemplar os estados pertinentes à sua função.

| Estado | Comportamento esperado |
| --- | --- |
| Padrão | Apresentação habitual do componente |
| Hover | Resposta visual à aproximação do ponteiro |
| Foco | Indicação perceptível para navegação por teclado |
| Pressionado | Retorno visual à ativação |
| Selecionado | Indicação clara da opção escolhida |
| Desabilitado | Comunicação de indisponibilidade |
| Carregamento | Indicação de operação em andamento |
| Sucesso | Confirmação de ação concluída |
| Erro | Explicação da falha e orientação de recuperação |
| Vazio | Informação contextual sobre a ausência de conteúdo |

Estados de sucesso e erro devem ser expressos por texto e outros indicadores além da cor.

O protótipo desktop contém exemplos desses comportamentos em autenticação, biblioteca, envio, perfil, comunidade e notificações.

A implementação deve reutilizar os padrões de feedback, evitando criar soluções independentes para cada tela.

## 10. Iconografia e imagens

Os ícones devem apresentar consistência de proporção, espessura de traço e alinhamento.

Quando representarem ações, precisam possuir identificação acessível. Ícones exclusivamente decorativos não devem introduzir informações redundantes para tecnologias assistivas.

As imagens de materiais devem respeitar o espaço previsto nos cartões, sem distorcer ou comprometer a leitura dos demais elementos.

Avatares devem possuir tratamento consistente para fotos disponíveis e situações sem imagem cadastrada.

Os ativos aprovados no Figma devem orientar as escolhas de implementação. A biblioteca técnica de ícones e o tratamento definitivo das imagens serão estabelecidos durante a preparação do front-end.

## 11. Acessibilidade

A acessibilidade faz parte da construção dos componentes e não deve ser tratada apenas como uma verificação visual ao final.

Diretrizes:

- Manter contraste adequado entre textos, controles e superfícies.
- Utilizar rótulos associados aos respectivos campos.
- Preservar foco visível e navegação por teclado.
- Utilizar elementos semânticos apropriados para títulos, botões, links e formulários.
- Não comunicar estados exclusivamente por cor.
- Associar erros aos campos correspondentes.
- Garantir que menus e modais possam ser utilizados sem mouse.
- Evitar perda de conteúdo com ampliação de texto.
- Fornecer alternativas textuais para imagens informativas.

A verificação deve ocorrer no navegador, considerando as interações reais e os critérios de acessibilidade estabelecidos para o projeto.

## 12. Responsividade

O desenvolvimento começa pelo desktop, tomando como referência os frames de 1536 px.

Essa prioridade não elimina a necessidade de uma interface adaptável. As páginas desktop devem se ajustar a janelas menores, preservando os elementos essenciais e evitando rolagem horizontal desnecessária.

As referências mobile e tablet serão utilizadas na etapa de adaptação responsiva da aplicação.

Os pontos de quebra, a reorganização dos menus, a quantidade de colunas dos cartões e o comportamento das sobreposições deverão ser definidos a partir da implementação e das referências do Figma.

A versão funcional completa deverá atender aos critérios responsivos estabelecidos no escopo do MVP.

## 13. Organização para desenvolvimento

O Design System deve orientar a criação de componentes reutilizáveis, evitando a duplicação de estruturas e estilos.

Na implementação, recomenda-se separar:

1. **Fundamentos:** cores, tipografia, espaçamento, bordas e efeitos.
2. **Componentes básicos:** botões, campos, seletores, ícones e indicadores.
3. **Componentes compostos:** cartões, filtros, menus, modais e formulários.
4. **Estruturas compartilhadas:** cabeçalhos, navegação, áreas de conteúdo e rodapés.
5. **Estados e feedback:** carregamento, erro, sucesso, vazio e indisponibilidade.

A organização definitiva deve acompanhar a arquitetura e as tecnologias escolhidas para o projeto.

Os nomes utilizados no código podem seguir convenções próprias, desde que preservem a correspondência com as funções e os fundamentos definidos no design.

## 14. Pontos a consolidar na implementação

Os fundamentos principais de identidade visual já estão definidos. Permanecem os seguintes trabalhos de consolidação:

| Área | Trabalho necessário |
| --- | --- |
| Cores complementares | Definir estados de sucesso, aviso, foco e indisponibilidade, com verificação de contraste |
| Espaçamentos | Consolidar escala, dimensões e raios a partir dos padrões recorrentes |
| Componentes | Implementar estrutura reutilizável e documentar propriedades e variantes |
| Iconografia | Definir conjunto técnico e padrões de tamanho e alinhamento |
| Formulários | Padronizar validação, mensagens e estados de carregamento |
| Sobreposições | Conferir foco, fechamento, dimensões e comportamento de interação |
| Responsividade | Estabelecer breakpoints e adaptação de layout |
| Acessibilidade | Executar verificações com teclado, ampliação de texto e ferramentas de avaliação |

Esses trabalhos fazem parte da evolução natural do Design System durante o desenvolvimento. Não impedem a implementação inicial dos fundamentos visuais e dos componentes que já possuem referência definida.

## 15. Documentos relacionados

- [Arquitetura da informação](arquitetura-da-informacao.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [User Flow](user-flow.md)
- [Handoff de UI/UX](handoff.md)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [Especificação de metadados](../product/especificacao-metadados.md)

---

O Design System deve evoluir junto à implementação, mantendo a identidade visual do EduComp e a consistência entre os componentes.

Novos padrões devem ser incorporados quando houver necessidade real de reutilização, preservando as referências do Figma e registrando decisões que afetem a interface.
