# EduComp — Handoff de UI/UX

**Versão:** 1.1  
**Data:** 06/11/2026  
**Situação:** referência de interface desktop para desenvolvimento; implementação não iniciada.

## 1. Objetivo

Este documento reúne as orientações necessárias para transformar o protótipo desktop do EduComp em uma interface funcional.

Seu foco está na composição das páginas, na navegação, nos componentes compartilhados, nos estados de interação e na correspondência entre o design e os comportamentos previstos para o MVP.

O handoff complementa o [Design System](design-system.md), a [Arquitetura da Informação](arquitetura-da-informacao.md) e o [User Flow](user-flow.md). As regras funcionais, os limites do produto e os critérios de negócio permanecem definidos na documentação de produto.

### 1.1. Referências

- [Protótipo desktop — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Identidade visual — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Protótipo mobile e referências para tablet](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-26978)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos do produto](../product/requisitos.md)

A página **Protótipo · Desktop** é a referência visual principal. A página **ID Visual** reúne os fundamentos da marca. A página **Backup** contém versões anteriores e não deve orientar a implementação.

### 1.2. Recorte de desenvolvimento

O desenvolvimento começará pelas interfaces desktop, utilizando os frames de **1536 px de largura** como referência de composição.

Essa decisão estabelece uma ordem de trabalho, não uma limitação permanente da plataforma. A versão funcional completa deverá atender aos requisitos de responsividade e acessibilidade definidos para o MVP.

As referências mobile e tablet serão utilizadas posteriormente, durante a adaptação dos fluxos implementados.

## 2. Relação entre o protótipo e o MVP

O protótipo apresenta uma visão mais ampla da experiência do EduComp do que o escopo definido para a primeira versão funcional.

Por isso, as telas devem ser interpretadas de acordo com três situações:

- **Incluído no MVP:** fluxo ou comportamento previsto nos documentos funcionais, cuja interface desktop deve ser implementada.
- **Referência complementar:** elemento visual disponível no Figma que depende de definição funcional, conteúdo definitivo ou decisão de implementação.
- **Evolução futura:** funcionalidade desenhada para demonstrar possibilidades do produto, mas que não integra os compromissos da primeira entrega.

A existência de uma tela, botão ou estado no Figma não torna sua funcionalidade automaticamente obrigatória no MVP.

### 2.1. Correspondência entre interfaces e escopo

| Área | Referência | Situação para o MVP |
| --- | --- | --- |
| Página inicial | D01 | Incluída |
| Cadastro e login por e-mail | D02 e D03 | Incluídos |
| Recuperação de senha | D04 | Incluída |
| Login com Google | D02 e D03 | Evolução futura |
| Biblioteca, busca e filtros | D05 e D13 | Incluídos |
| Detalhes e acesso ao material | D06 | Incluídos |
| Perfil público do autor | D06.P01 | Referência complementar |
| Comentários, relatos e denúncias | D06.S | Evolução possível, não prevista no MVP atual |
| Materiais salvos | D07 | Incluídos |
| Envio e acompanhamento | D08 | Incluídos |
| Perfil e configurações da conta | D09 | Incluídos |
| Central de notificações | D09.2 e variações | Evolução futura |
| Páginas institucionais | D10 a D12 | Referência complementar |
| Cópia de link | D14 | Incluída |
| Compartilhamento por redes sociais | Variações de D14 | Evolução futura |

A revisão e aprovação dos materiais por um responsável autorizado **integram o MVP**, mas a interface correspondente ainda precisa ser especificada. Essa ausência no protótipo não elimina a necessidade funcional.

A implementação deve preservar o escopo definido em [`escopo-mvp.md`](../product/escopo-mvp.md), sem antecipar funcionalidades adicionais apenas para reproduzir integralmente o Figma.

## 3. Fundamentos visuais

### 3.1. Identidade

A interface deve utilizar os fundamentos registrados no [Design System](design-system.md).

As referências principais são:

| Elemento | Definição |
| --- | --- |
| Fonte | Inter |
| Azul principal | `#1761D8` |
| Azul profundo | `#102B5C` |
| Texto secundário | `#526987` |
| Fundo geral | `#F8FAFF` |
| Superfícies | `#FFFFFF` |
| Azul suave | `#D9E6FB` |
| Erro | `#C7333D` |

O logotipo deve preservar a composição aprovada no Figma. O símbolo utiliza fundo sólido `#1761D8`, sem gradiente, e o nome EduComp utiliza `#313E55`.

A assinatura visual deve ser aplicada por meio dos ativos originais, evitando reconstruções aproximadas.

A escala tipográfica, as variáveis semânticas e os efeitos reutilizáveis estão documentados no Design System e não devem ser redefinidos de forma independente neste arquivo.

### 3.2. Composição desktop

As páginas devem respeitar a hierarquia e os alinhamentos estabelecidos nos frames de 1536 px.

A implementação deve considerar:

- Largura de referência sem fixar o conteúdo à resolução do protótipo.
- Margens e espaçamentos coerentes entre páginas.
- Altura de página determinada pelo conteúdo.
- Rolagem vertical natural.
- Comportamento adequado em janelas desktop menores.
- Ausência de cortes, sobreposições indevidas e rolagem horizontal desnecessária.
- Adaptação de textos e dados dinâmicos sem comprometer a estrutura.

Os frames do Figma representam composições de referência. Dimensões e posições não devem ser reproduzidas indiscriminadamente como valores absolutos no código.

### 3.3. Estruturas compartilhadas

O protótipo apresenta duas estruturas recorrentes.

**Páginas públicas**

Utilizam identidade visual, cabeçalho de navegação, conteúdo de apresentação ou acesso e rodapé quando aplicável.

**Área interna**

Compartilha cabeçalho, navegação principal, identificação de conta e região de conteúdo.

Biblioteca, Salvos, Detalhes, Envio de material e Meu perfil devem utilizar estruturas compartilhadas, evitando implementações independentes para elementos equivalentes.

A presença de notificações ou outras ações futuras no cabeçalho do protótipo não exige sua implementação funcional nesta primeira entrega.

## 4. Implementação dos fluxos desktop

Os identificadores utilizados no Figma facilitam a localização das referências visuais. Não representam nomes obrigatórios de rotas, componentes ou arquivos de código.

Os frames de estados e variações devem orientar o comportamento da interface, sem resultar necessariamente em páginas independentes.

### 4.1. Página inicial — D01

**Referência:** [D01 — Início](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34332)

A página inicial apresenta o EduComp, sua proposta e os principais caminhos de entrada na plataforma.

A composição contém:

- Cabeçalho com identidade visual e navegação.
- Seção principal de apresentação.
- Exemplos de materiais pedagógicos.
- Seções informativas sobre a proposta.
- Chamada para a Biblioteca.
- Rodapé.

As principais ações são **Entrar**, **Criar conta**, **Acessar a biblioteca** e **Saiba mais**.

**Orientações de implementação**

A ordem e a hierarquia das seções devem acompanhar o protótipo. Os elementos visuais utilizados para apresentar materiais não devem ser confundidos com registros obrigatórios do acervo.

As ações precisam possuir destinos definidos e coerentes com a navegação. O acesso de visitantes à Biblioteca ainda depende de decisão funcional.

A página deve manter sua composição em janelas desktop menores, sem depender de uma altura fixa.

### 4.2. Cadastro, login e recuperação — D02 a D04

**Referência:** [DESKTOP / 02 · Autenticação](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32521)

A autenticação contempla a criação de conta, o acesso por e-mail e senha e a recuperação de credenciais.

| Frame | Estado |
| --- | --- |
| D02 | Login |
| D02.1 | Credenciais inválidas |
| D02.3 | Formulário de login preenchido |
| D03 | Criar conta |
| D03.1 | Validação de cadastro |
| D03.2 | Formulário de cadastro preenchido |
| D04 | Recuperar senha |
| D04.1 | Confirmação de solicitação |
| D04.2 | Redefinir senha |
| D04.3 | Senha redefinida |
| D04.4 | Link expirado |

**Orientações de implementação**

Os formulários devem utilizar os componentes de campo e botão definidos no Design System.

A interface precisa distinguir estados iniciais, preenchidos, inválidos, de carregamento e de conclusão.

Erros de autenticação devem apresentar mensagens compreensíveis sem revelar informações sensíveis. A recuperação de senha deve contemplar o uso de link seguro, conforme os requisitos do produto.

A exigência de e-mail institucional e a política de senha ainda precisam ser confirmadas. Os valores apresentados no protótipo não devem ser assumidos como regras definitivas.

**Limite do MVP**

O login com Google aparece visualmente nas telas, mas não integra a primeira versão funcional.

O botão correspondente não deve oferecer uma ação simulada ou uma autenticação fictícia. Sua presença na implementação depende de uma decisão específica sobre a apresentação de funcionalidades futuras.

### 4.3. Biblioteca, pesquisa e filtros — D05 e D13

**Referências:**
- [D05 — Biblioteca](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32684)
- [DESKTOP / 04 · Filtros e sobreposições](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33638)

A Biblioteca é uma das áreas centrais do MVP.

Apresenta a listagem dos materiais disponíveis, com informações pedagógicas, pesquisa textual e filtros.

**Elementos principais**

- Campo de pesquisa.
- Botão Buscar.
- Filtros por tipo de material, etapa de ensino e eixo da Computação.
- Cartões de materiais.
- Identificação do tipo e das classificações.
- Acesso aos detalhes.
- Contagem de resultados.
- Navegação entre resultados.

**Estados de referência**

| Frame | Estado |
| --- | --- |
| D05 | Biblioteca com materiais |
| D05.1 | Pesquisa sem resultados |
| D05.F | Resultados com filtros aplicados |
| D13 | Filtro por tipo de material |
| D13.1 | Filtro por etapa de ensino |
| D13.2 | Filtro por eixo da Computação |

O protótipo também apresenta um estado de carregamento da Biblioteca.

**Orientações de implementação**

Os filtros permitem selecionar múltiplas opções. Conforme os requisitos atuais, opções dentro da mesma categoria são combinadas por **OU**, enquanto categorias diferentes e pesquisa textual são combinadas por **E**.

As seleções em edição devem ser diferenciadas dos filtros efetivamente aplicados. Ações como **Aplicar** e **Limpar** devem seguir as regras funcionais, inclusive nos casos de fechamento sem confirmação.

A alteração da pesquisa ou dos filtros deve atualizar a listagem, a contagem e a navegação pelos resultados.

Os dados e as quantidades apresentados no Figma são ilustrativos. A interface deve utilizar os registros disponibilizados pela aplicação.

A paginação representada visualmente deverá ser ajustada à decisão funcional entre paginação e carregamento progressivo.

**Referência funcional:** [Especificação de busca e filtros](../product/especificacao-busca-filtros.md).

### 4.4. Detalhes e acesso ao material — D06

**Referência:** [D06 — Material e discussão](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34035)

A página de detalhes apresenta as informações necessárias para que o professor conheça e avalie um recurso pedagógico.

**Elementos do MVP**

- Título e tipo de material.
- Descrição.
- Etapa de ensino e ano escolar, quando disponíveis.
- Eixo da Computação.
- Informações pedagógicas e objetivos cadastrados.
- Identificação de autoria.
- Ação de acesso ao recurso.
- Ação de salvar ou remover dos favoritos.
- Retorno à Biblioteca.

**Estados complementares**

| Referência | Comportamento |
| --- | --- |
| D06.A01 | Acesso ao arquivo |
| D06.A02 | Falha no download |
| D06.A03 | Material salvo |
| D06.A04 | Material removido dos salvos |
| D06.A05–A011 | Exemplos de acesso a diferentes materiais |

Os exemplos de download não devem ser implementados como páginas específicas para cada título. O componente de acesso deve utilizar o arquivo ou endereço associado ao material consultado.

Quando não houver recurso disponível ou autorizado, a interface deve apresentar uma orientação adequada, sem disponibilizar ações que não possam ser executadas.

**Referências além do MVP**

O protótipo contém uma seção de comunidade, com comentários, relatos de aplicação, respostas e denúncias.

Essas funcionalidades não estão previstas nos requisitos da primeira entrega. Portanto, **a implementação inicial da página de detalhes deve priorizar as informações pedagógicas, o acesso ao recurso e os favoritos**.

Os frames D06.S01–D06.S16 permanecem como referência para uma possível evolução da experiência.

O perfil público do autor, representado em D06.P01, também depende de definição funcional própria. Para o MVP, a identificação de autoria deve ser apresentada conforme os metadados efetivamente disponíveis.

### 4.5. Materiais salvos — D07

**Referência:** [D07 — Materiais salvos](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32921)

A área de Salvos reúne os recursos marcados como favoritos pelo professor autenticado.

**Elementos principais**

- Identificação da página.
- Quantidade de materiais salvos.
- Cartões de materiais.
- Acesso aos detalhes.
- Busca e filtros da coleção, conforme as regras aplicáveis.
- Ação de remoção dos favoritos.

**Estados de referência**

| Frame | Estado |
| --- | --- |
| D07 | Coleção com materiais |
| D07.1 | Coleção vazia |
| D07.2 | Busca sem resultados |
| D07.R1–R6 | Coleção atualizada |
| D07.F | Resultados filtrados em Salvos |
| D13.S | Menus de filtros em Salvos |

**Orientações de implementação**

O estado de favorito deve permanecer consistente entre Biblioteca, Detalhes e Salvos.

A inclusão ou remoção deve atualizar a interface e persistir na conta do professor, conforme os requisitos funcionais.

É necessário distinguir uma coleção realmente vazia de uma coleção que possui itens, mas não apresenta correspondências para a busca atual.

Não devem ser criadas páginas diferentes para representar cada atualização ilustrada no protótipo. As variações devem ser tratadas por estado e dados.

### 4.6. Envio e acompanhamento de materiais — D08

**Referência:** [DESKTOP / 07 · Envio e acompanhamento](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33078)

O envio permite que professores compartilhem materiais para avaliação e possível publicação no acervo.

A tela apresenta as abas **Enviar material** e **Meus envios**.

**Campos representados**

- Título do material.
- Descrição.
- Tipo de material.
- Etapa de ensino.
- Ano escolar, quando aplicável.
- Eixo da Computação.
- Arquivo do material.

O formulário também contém orientações e identificação dos campos obrigatórios.

**Estados de referência**

| Frame | Estado |
| --- | --- |
| D08 | Formulário inicial |
| D08.1 | Validação |
| D08.2 | Confirmação do envio |
| D08.3 | Acompanhamento em modal |
| D08.4 | Meus envios |
| D08.5 | Arquivo selecionado |
| D08.6 | Envio em andamento |
| D08.7 | Falha no envio |
| D08.8 | Formato inválido |
| D08.9 | Arquivo acima do limite |
| D08.10 | Ajustes solicitados |
| D08.11 | Material não aprovado |
| D08.12 | Formulário preenchido |

**Orientações de implementação**

O envio deve contemplar validação dos dados e do arquivo, indicação de progresso, confirmação de conclusão e tratamento de falhas.

O formulário precisa evitar o envio duplicado durante uma operação em andamento, quando aplicável.

As informações já preenchidas devem ser preservadas sempre que possível após uma falha.

O protótipo apresenta formatos PDF, PPTX, DOCX e imagens, com limite visual de 20 MB. Essas restrições ainda dependem de confirmação funcional e técnica e não devem ser implementadas como regras definitivas apenas por constarem no Figma.

**Revisão e publicação**

O envio de um material não equivale à sua publicação.

A primeira versão deve permitir que o autor acompanhe a situação da submissão e que um responsável autorizado realize sua avaliação.

Os estados previstos nos documentos de produto são **Pendente**, **Em análise**, **Aprovado** e **Recusado**.

Variações como *Ajustes solicitados*, apresentadas no protótipo, dependem de definição adicional sobre o processo de revisão.

**Lacuna de interface**

A área de revisão utilizada pelo responsável autorizado ainda não possui uma especificação visual definitiva.

Esse fluxo deverá ser detalhado antes de sua implementação, incluindo apresentação das submissões, acesso aos dados necessários para análise, ações permitidas e feedback das decisões.

A ausência dessa tela no protótipo não retira a revisão e a aprovação do escopo funcional do MVP.

### 4.7. Perfil do professor — D09

**Referência:** [D09 — Meu perfil](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33379)

O perfil reúne informações da conta e ações de atualização de dados pessoais.

**Elementos principais**

- Identificação do professor.
- Foto de perfil.
- Nome completo.
- E-mail.
- Instituição de ensino, quando aplicável.
- Informações complementares.
- Ação de salvar alterações.
- Ação de alterar senha.

**Estados de referência**

| Frame | Estado |
| --- | --- |
| D09 | Meu perfil |
| D09.1 | Menu do perfil |
| D09.3 | Perfil salvo |
| D09.4 | Alterar foto |
| D09.5 | Foto selecionada |
| D09.6 | Alterar senha |
| D09.7 | Falha ao salvar perfil |

**Orientações de implementação**

Os dados devem ser carregados a partir da conta autenticada e refletir as alterações confirmadas.

O formulário deve apresentar validação, feedback de sucesso e tratamento de erros.

A foto precisa possuir apresentação adequada quando não houver imagem cadastrada.

A descrição pessoal e seu limite de caracteres, ilustrados no Figma, devem ser confirmados antes de se tornarem regras definitivas.

**Notificações**

O protótipo também apresenta painel, lista, estados de leitura e contador de notificações.

A central completa de notificações não integra o MVP. Esses elementos permanecem como referência visual para uma etapa posterior.

Não devem ser exibidos indicadores fictícios de notificações não lidas em uma interface apresentada como funcional.

### 4.8. Compartilhamento básico — D14

**Referência:** [D14 — Compartilhar plataforma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33699)

A primeira versão contempla o compartilhamento básico por cópia de link.

**Comportamento esperado**

- Disponibilizar a ação de copiar um endereço válido.
- Confirmar quando a cópia for concluída.
- Informar falhas quando identificáveis.
- Respeitar as regras de acesso ao destino compartilhado.

O endereço a ser copiado — página da plataforma, detalhe do material ou ambos — ainda precisa de definição funcional.

O compartilhamento integrado com redes sociais não faz parte do MVP. As opções desse tipo presentes no Figma devem permanecer fora da implementação funcional inicial.

### 4.9. Páginas institucionais — D10 a D12

**Referência:** [DESKTOP / 09 · Institucional](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33488)

O protótipo contém:

- D10 — Fale conosco.
- D10.1 — Mensagem enviada.
- D10.2 — Contato com erro.
- D10.3 — Falha no contato.
- D11 — Termos de uso.
- D12 — Política de privacidade.

Essas telas são referências de composição e conteúdo institucional, mas não correspondem, por si só, a requisitos funcionais detalhados no MVP atual.

O formulário de contato dependerá de definição sobre recebimento, tratamento e destino das mensagens.

Os documentos de termos de uso e privacidade devem utilizar textos aprovados para a aplicação. O conteúdo ilustrativo não deve ser tratado como versão jurídica definitiva.

Sua implementação e os critérios específicos de aceite deverão ser definidos no planejamento funcional correspondente.

## 5. Componentes compartilhados

A implementação deve priorizar uma base de componentes reutilizáveis, separando estrutura visual, propriedades e comportamento.

| Componente | Aplicações principais |
| --- | --- |
| Cabeçalho público | Início e autenticação |
| Cabeçalho interno | Biblioteca, Salvos, Detalhes, Envio e Perfil |
| Navegação principal | Páginas internas |
| Botão | Formulários, ações e confirmações |
| Campo de entrada | Autenticação, busca e formulários |
| Seletor e checkbox | Filtros e classificação |
| Card de material | Biblioteca e Salvos |
| Tag ou indicador | Tipo de material e metadados |
| Modal | Confirmações e formulários auxiliares |
| Menu | Perfil, filtros e ações contextuais |
| Indicador de carregamento | Consultas e operações |
| Mensagem de feedback | Sucesso, validação e falha |
| Estado vazio | Biblioteca, busca e Salvos |
| Navegação de resultados | Biblioteca e listagens aplicáveis |

Os componentes não devem incorporar dados fixos dos exemplos do Figma.

Propriedades, variantes e estados devem acompanhar as necessidades reais de uso, evitando estruturas duplicadas para cada tela ou condição.

O [Design System](design-system.md) estabelece os fundamentos visuais e as diretrizes para padronização desses elementos.

## 6. Estados e comportamento da interface

Os estados apresentados no protótipo devem orientar a implementação das transições necessárias ao MVP.

| Estado | Comportamento esperado |
| --- | --- |
| Inicial | Interface disponível antes da interação |
| Preenchido | Dados e seleções apresentados corretamente |
| Foco | Destaque perceptível na navegação por teclado |
| Carregamento | Indicação de operação em andamento |
| Validação | Informação específica sobre dados incorretos |
| Sucesso | Confirmação de ação concluída |
| Falha | Mensagem compreensível e possibilidade de recuperação quando aplicável |
| Vazio | Ausência de conteúdo no contexto consultado |
| Sem resultados | Ausência de correspondência para os critérios utilizados |
| Indisponível | Restrição de uso ou acesso claramente comunicada |

### 6.1. Feedback

As mensagens devem ser específicas para a situação.

Uma falha de conexão não deve apresentar a mesma orientação de um formulário inválido. Da mesma forma, um arquivo indisponível não deve ser representado como uma Biblioteca sem materiais.

A interface não deve comunicar sucesso antes da confirmação da operação correspondente.

### 6.2. Consistência dos dados

O resultado de uma ação deve ser refletido nos pontos pertinentes da interface.

Exemplos:

- Salvar um material atualiza sua representação em Detalhes e Salvos.
- Remover um favorito atualiza a coleção pessoal.
- Alterar o perfil modifica os dados exibidos após confirmação.
- Enviar um material cria uma submissão consultável, sem publicação automática.
- Aplicar filtros atualiza os resultados e preserva o estado de seleção.

Esses comportamentos devem ser sustentados pelos dados e serviços da aplicação.

### 6.3. Menus e modais

Sobreposições devem possuir abertura e fechamento previsíveis.

É necessário garantir:

- Controle adequado do foco.
- Fechamento acessível.
- Identificação clara da janela ou painel.
- Hierarquia entre ações principais e secundárias.
- Retorno ao contexto anterior após o fechamento.
- Ausência de sobreposições que impeçam o uso da interface.

Os comportamentos devem ser verificados no navegador, e não apenas pela aparência dos frames.

## 7. Acessibilidade e adaptação desktop

A implementação inicial deve incorporar acessibilidade desde os componentes básicos.

**Requisitos de interface**

- Utilizar elementos HTML semanticamente adequados.
- Preservar navegação por teclado.
- Exibir foco visível.
- Associar rótulos e mensagens de validação aos campos.
- Garantir identificação acessível de botões com ícones.
- Utilizar contraste adequado.
- Evitar depender exclusivamente da cor para transmitir informações.
- Permitir leitura e navegação com ampliação de texto.
- Preservar acesso ao conteúdo em janelas desktop menores.
- Manter menus e modais utilizáveis sem mouse.

As verificações deverão considerar o comportamento real dos componentes.

A implementação desktop não encerra os critérios de responsividade do MVP. A adaptação para tablet e celular deverá ser realizada antes da conclusão da versão funcional, conforme o planejamento e os requisitos do produto.

## 8. Organização recomendada da implementação

A estrutura definitiva dos arquivos e módulos deverá seguir a arquitetura técnica escolhida para o EduComp.

Como orientação para o desenvolvimento da interface, recomenda-se trabalhar em camadas.

### 8.1. Fundação

Preparar:

- Fonte Inter.
- Variáveis de cor.
- Estilos globais.
- Ativos da identidade visual.
- Padrões de espaçamento e composição.
- Estruturas compartilhadas das páginas.

### 8.2. Componentes

Implementar os componentes de uso recorrente antes de reproduzir cada tela individualmente.

Os estados devem ser representados por propriedades e dados, não por componentes inteiramente novos para cada variação do Figma.

### 8.3. Páginas

A sequência sugerida para a interface desktop é:

1. Página inicial.
2. Cadastro, login e recuperação de senha.
3. Biblioteca, pesquisa e filtros.
4. Detalhes e acesso ao material.
5. Materiais salvos.
6. Envio e acompanhamento.
7. Perfil do professor.
8. Compartilhamento básico.
9. Interface mínima de revisão, após definição funcional e visual.

Essa sequência organiza a construção da interface. A implementação real dependerá da arquitetura, das integrações e das prioridades do backlog.

### 8.4. Integrações

Os componentes devem ser preparados para receber dados e estados provenientes dos serviços da aplicação.

A apresentação visual não deve ficar diretamente responsável por regras de autorização, persistência, validação de arquivos ou publicação de materiais.

O frontend deve refletir o resultado dessas operações e respeitar as restrições estabelecidas pelos serviços.

## 9. Critérios de aceite da implementação desktop

A interface desktop estará pronta para revisão quando:

- [ ] As páginas incluídas no MVP apresentarem correspondência visual com os frames aplicáveis do Figma.
- [ ] A identidade visual, as cores e a tipografia seguirem o Design System.
- [ ] Os componentes recorrentes estiverem padronizados e reutilizados.
- [ ] O layout funcionar na largura de referência de 1536 px e em janelas desktop menores.
- [ ] As páginas permitirem rolagem e adaptação de conteúdo sem cortes indevidos.
- [ ] Navegação, campos, botões, menus e modais apresentarem comportamento coerente.
- [ ] Cadastro, autenticação e recuperação exibirem os estados de interface necessários.
- [ ] Biblioteca, busca, filtros e navegação pelos resultados refletirem os dados da aplicação.
- [ ] Detalhes apresentarem os metadados cadastrados e somente ações de acesso válidas.
- [ ] Favoritos e alterações de perfil apresentarem atualização e persistência.
- [ ] Envio e acompanhamento distinguirem progresso, validação, falha e situação editorial.
- [ ] A revisão de materiais por responsável autorizado possuir interface e fluxo definidos para implementação.
- [ ] A cópia de link apresentar confirmação ou erro.
- [ ] Os componentes previstos no MVP forem acessíveis por teclado e apresentarem feedback adequado.
- [ ] Funcionalidades futuras não forem apresentadas como operacionais sem implementação real.
- [ ] Diferenças intencionais em relação ao protótipo estiverem registradas e justificadas.

Os itens acima orientam a **revisão da interface desktop**. Não substituem a verificação funcional completa do MVP, os testes de segurança, a avaliação de integração e a validação da responsividade em outras classes de dispositivo.

## 10. Decisões pendentes

Alguns comportamentos necessários à implementação ainda dependem de definições funcionais ou técnicas.

| Tema | Definição necessária |
| --- | --- |
| Acesso | Permissões de visitantes e exigência de autenticação |
| Cadastro | Política de e-mail institucional e senha |
| Pesquisa | Correspondência de termos e critérios de ordenação |
| Filtros | Fechamento sem aplicar, limpeza e opções sem resultados |
| Resultados | Paginação ou carregamento progressivo |
| Metadados | Campos obrigatórios, classificações e representação de temas |
| Arquivos | Formatos, tamanhos, armazenamento e disponibilidade |
| Revisão | Papéis, critérios, estados e interface do responsável autorizado |
| Compartilhamento | Destino do endereço copiado |
| Perfil | Limites de campos, foto e exposição de informações pessoais |
| Institucional | Conteúdo definitivo e necessidade funcional do formulário de contato |
| Responsividade | Pontos de quebra e adaptação dos componentes |
| Acessibilidade | Critérios técnicos de verificação e testes |

As decisões devem ser registradas nos documentos apropriados antes da implementação dos comportamentos diretamente afetados.

Uma pendência específica não precisa impedir o desenvolvimento de componentes e áreas que já possuam definições suficientes.

## 11. Documentação relacionada

- [Product Brief](../product/product-brief.md)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Histórias de usuário](../product/historias-de-usuario.md)
- [Backlog](../product/backlog.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [Especificação de metadados](../product/especificacao-metadados.md)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)

---

O handoff deve ser mantido em alinhamento com a implementação e com as decisões funcionais do EduComp.

Alterações de escopo devem ser registradas nos documentos de produto. Mudanças de padrões visuais devem ser refletidas no Design System. Este documento deve acompanhar as decisões que afetem diretamente a construção e a validação das interfaces desktop.
