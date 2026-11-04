# EduComp — Design System

**Versão:** 0.5  
**Data:** 04/11/2026  
**Situação:** Fundamentos visuais identificados; componentes e comportamentos em consolidação; desenvolvimento não iniciado.

## 1. Objetivo

Estabelecer os fundamentos visuais e os padrões de interface do EduComp, assegurando consistência entre as áreas de acesso, descoberta, consulta, organização e contribuição de materiais pedagógicos de Computação.

O Design System organiza **cores, tipografia, efeitos, componentes, estados e diretrizes de uso**. Diferencia os recursos já identificados no arquivo de design dos padrões que ainda precisam ser formalizados. As regras de negócio e os fluxos funcionais pertencem aos respectivos documentos de produto e UX/UI.

## 2. Direção visual

A identidade do EduComp segue uma abordagem **clean, institucional e contemporânea**, com predominância do azul, superfícies claras, hierarquia visual objetiva e componentes de baixa complexidade.

Princípios de aplicação:

- **Clareza:** destacar conteúdo e ações sem excesso de elementos decorativos.
- **Consistência:** manter aparência e comportamento equivalentes para funções equivalentes.
- **Hierarquia:** diferenciar títulos, descrições, metadados, ações e mensagens.
- **Legibilidade:** favorecer a leitura de materiais e formulários em diferentes telas.
- **Acessibilidade:** não depender apenas de cor, ícones ou posição para comunicar informações.
- **Feedback:** indicar mudanças de estado e resultados de ações de maneira compreensível.

Os padrões visuais devem servir à atividade do professor: localizar, avaliar, salvar, acessar e enviar materiais.

## 3. Cores

### 3.1. Variáveis identificadas

O arquivo de design possui a coleção **`EduMaterial — Fundamentos`**, com as seguintes variáveis:

| Variável | Valor | Função semântica indicada pelo nome |
|---|---|---|
| `color/brand/primary` | `#1761D8` | Cor principal da marca e de ações de destaque. |
| `color/brand/deep` | `#102D5C` | Tom profundo da identidade visual. |
| `color/text/primary` | `#102D5C` | Texto principal em superfícies compatíveis. |
| `color/text/secondary` | `#637DA3` | Texto secundário e informações de apoio. |
| `color/surface/canvas` | `#F8FAFF` | Fundo geral de áreas claras. |
| `color/surface/soft` | `#D9E6FB` | Superfícies suaves ou de apoio. |
| `color/surface/default` | `#FFFFFF` | Superfície principal de conteúdo. |
| `color/border/subtle` | `#D9E6FB` | Bordas e divisórias discretas. |
| `color/status/danger` | `#C7333D` | Indicação de erro ou situação crítica. |

Os valores acima são **variáveis existentes**. A coluna de função descreve a intenção semântica sugerida pelos nomes; a aplicação efetiva em todas as telas ainda precisa ser conferida.

### 3.2. Regras de uso

- Preferir as variáveis semânticas em vez de inserir valores hexadecimais isolados nos componentes.
- Usar a cor principal da marca para destacar ações prioritárias, respeitando a hierarquia de cada tela.
- Utilizar `color/text/primary` e `color/text/secondary` apenas em combinações de fundo com legibilidade e contraste adequados.
- Empregar `color/status/danger` em situações de erro, acompanhado de texto e, quando útil, de ícone; a cor isolada não deve transmitir a mensagem.
- Não presumir que os tokens de texto definidos para superfícies claras funcionem sobre fundos azuis ou escuros.
- Não criar cores definitivas para sucesso, aviso, foco, desabilitado ou superfícies escuras sem verificar a necessidade e o contraste da combinação.

**Pendente:** verificar as combinações reais de primeiro plano e fundo, definir as cores de estados ainda não cobertos e atualizar o nome da coleção para a identidade EduComp após conferir suas dependências. A coleção não deve ser tratada como já renomeada.

## 4. Tipografia

### 4.1. Estilos identificados

Os seguintes estilos tipográficos estão cadastrados no design:

| Estilo | Uso recomendado na hierarquia |
|---|---|
| `Display/Hero` | Mensagem principal de apresentação ou destaque. |
| `Heading/H1` | Título principal de página. |
| `Heading/H2` | Título de seção de primeiro nível. |
| `Heading/H3` | Subtítulo ou agrupamento de conteúdo. |
| `Body/Regular` | Descrições e textos corridos. |
| `Body/Small` | Textos de apoio de menor extensão. |
| `Label/Medium` | Rótulos de campos, botões e controles. |
| `Caption/Small` | Legendas e informações auxiliares. |

Os usos descritos orientam a padronização. **A existência dos estilos não comprova que estejam aplicados corretamente em todas as telas.**

### 4.2. Diretrizes tipográficas

- Adotar uma ordem visual consistente para títulos, subtítulos, descrições e metadados.
- Evitar criar estilos específicos para telas isoladas quando um estilo existente atender à mesma função.
- Preservar a legibilidade de rótulos, mensagens de erro e informações complementares.
- Garantir que mudanças de tamanho de tela ou ampliação de texto não ocultem conteúdos e ações essenciais.
- Identificar títulos e rótulos semanticamente também na implementação, sem depender apenas da aparência visual.

**Pendente:** documentar família tipográfica, pesos, tamanhos, alturas de linha, espaçamentos entre letras e aplicação real de cada estilo no protótipo. Não há valores suficientes para fixar uma escala numérica neste documento.

## 5. Layout, espaçamento e efeitos

### 5.1. Composição

- Manter alinhamentos previsíveis entre cabeçalho, áreas de conteúdo, filtros e cartões.
- Utilizar espaçamentos consistentes entre elementos relacionados e separação perceptível entre seções.
- Priorizar a leitura dos títulos dos materiais e das informações necessárias à escolha de um recurso.
- Evitar sobreposição ou truncamento de ações em telas menores.

Uma escala baseada em múltiplos de **4 px** pode ser avaliada como proposta de padronização, mas **não está confirmada como conjunto de tokens existente no Figma**. Margens, larguras máximas, grade, raios de borda e alturas dos componentes precisam de levantamento específico.

### 5.2. Elevação

Há um estilo de efeito identificado:

- **`Elevation/Modal`** — referência para a elevação de janelas ou sobreposições.

O nome do estilo está documentado, mas seus valores de sombra e sua aplicação uniforme ainda precisam ser verificados. Não devem ser inventados valores definitivos de desfoque, deslocamento ou opacidade.

### 5.3. Ícones e imagens

Ícones devem ter significado reconhecível, consistência de traço e rótulos acessíveis quando acionáveis. Imagens e avatares não devem substituir o nome ou o contexto necessário para compreender uma ação.

**Pendente:** definir biblioteca de ícones, dimensões, tratamento de imagens ausentes e especificações de avatar, quando aplicáveis.

## 6. Componentes e padrões de interface

### 6.1. Componentes principais identificados

A seção de componentes do arquivo de design inclui dois componentes principais catalogados:

| Componente | Responsabilidade visual |
|---|---|
| `Ação flutuante / Botão de acesso` | Apresentar um ponto de acesso a ações ou navegação contextual. |
| `Cabeçalho / Marca institucional` | Exibir a identificação visual institucional do EduComp. |

Essa identificação **não significa que apenas dois elementos sejam reutilizados nas telas**, nem confirma que todos os demais controles já estejam organizados como componentes mestres. A conferência de instâncias, variantes e propriedades ainda precisa ser realizada.

### 6.2. Padrões a sistematizar

Além dos componentes catalogados, a interface demanda a padronização dos seguintes padrões:

| Padrão | Aplicações principais | Estados ou variações a prever |
|---|---|---|
| **Botões e links** | Entrar, criar conta, aplicar filtros, enviar, salvar, copiar link | Primário, secundário, foco, pressionado, desabilitado, carregamento |
| **Campos de formulário** | E-mail, senha, nome, pesquisa, dados de perfil e material | Padrão, foco, preenchido, inválido, desabilitado |
| **Cartão de material** | Biblioteca e Salvos | Conteúdo disponível, favorito marcado, carregamento quando aplicável |
| **Controles de filtro** | Tipo, etapa de ensino e eixo da Computação | Não selecionado, selecionado em edição, selecionado aplicado |
| **Menus contextuais** | Biblioteca, Salvos e perfil | Aberto, fechado, item em foco, item ativo quando aplicável |
| **Sobreposição ou janela** | Filtros, perfil, compartilhar e outras ações contextuais | Aberta, fechamento, foco e retorno ao contexto de origem |
| **Favorito** | Cartões, detalhes e Salvos | Salvo, não salvo, operação em andamento, falha |
| **Upload** | Enviar material | Arquivo selecionado, validação, progresso, sucesso, erro |
| **Identificação de status** | Acompanhamento e revisão de materiais | Pendente, Em análise, Aprovado, Recusado — a confirmar |
| **Mensagens e estados vazios** | Biblioteca, Salvos, formulários e envios | Informação, sucesso, erro, ausência de dados |

A tabela reúne **padrões necessários à experiência**, não uma declaração de que todos já existem como componentes reutilizáveis no Figma ou no código.

## 7. Aplicação por área da interface

### 7.1. Acesso e autenticação

As telas **Entrar**, **Criar conta** e **Recuperar senha** devem compartilhar padrões de campos, rótulos, mensagens, botões e fechamento. E-mail e senha devem ser identificados por rótulos claros; dados inválidos exigem mensagens associadas à ação ou ao campo correspondente.

A opção visual de autenticação com Google não integra a primeira versão funcional. Sua presença no protótipo não deve ser confundida com integração implementada.

### 7.2. Biblioteca e filtros

A Biblioteca deve manter uma hierarquia reconhecível entre **pesquisa**, **filtros**, **resultados** e **acesso aos detalhes**. Os três grupos de filtro são:

| Categoria | Opções apresentadas |
|---|---|
| **Tipo de material** | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| **Etapa de ensino** | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| **Eixo da Computação** | Pensamento Computacional; Mundo Digital; Cultura Digital |

Os filtros devem indicar seleção múltipla e disponibilizar **Aplicar** e **Limpar**. A aparência precisa diferenciar seleções em edição das já aplicadas. O efeito de fechar sem aplicar e o alcance de Limpar ainda serão especificados.

O cartão de material deve priorizar identificação e leitura, sem apresentar metadados inexistentes ou acessos indisponíveis como ações funcionais.

### 7.3. Detalhes, acesso e favoritos

Os detalhes devem organizar título, descrição, classificações, autoria ou fonte quando disponível e ações de acesso. O usuário precisa distinguir a página de detalhes da abertura de arquivo ou link externo, caso esse tipo de acesso seja adotado.

O controle de favorito deve expressar os estados **salvo** e **não salvo**, confirmar a operação e permanecer consistente entre Biblioteca, Detalhes e Salvos. A lista vazia de Salvos deve possuir mensagem própria.

### 7.4. Envio, revisão e status

O formulário de envio deve agrupar campos relacionados, indicar erros de preenchimento e fornecer feedback do upload. Arquivos inválidos e falhas não devem ser apresentados como envio concluído.

Os estados propostos para a submissão são **Pendente**, **Em análise**, **Aprovado** e **Recusado**. As identificações visuais desses estados devem usar texto e não apenas cor. As regras finais e a interface de revisão ainda precisam de definição; portanto, não se presume a existência de um painel administrativo desenhado.

### 7.5. Perfil e compartilhamento

A área de perfil deve empregar padrões consistentes para exibição, edição, confirmação e erro nas alterações de dados, foto e senha.

O compartilhamento básico deve identificar a ação **Copiar link** e apresentar feedback da cópia. As opções de redes sociais e a central de notificações fazem parte da experiência visual projetada, mas não integram o MVP funcional atualmente delimitado.

## 8. Estados de interação e feedback

Cada componente interativo deve receber os estados pertinentes à sua função, sem que todos sejam obrigatórios em todos os contextos.

| Estado | Expressão esperada |
|---|---|
| **Padrão** | Identificação e aparência habituais. |
| **Hover** | Resposta visual ao ponteiro, quando aplicável. |
| **Foco** | Indicador visível para navegação por teclado. |
| **Pressionado** | Resposta à ativação do controle. |
| **Selecionado** | Seleção perceptível por mais de um sinal visual. |
| **Desabilitado** | Indicação clara de indisponibilidade, com contraste suficiente. |
| **Carregamento** | Comunicação de operação em andamento, sem declarar sucesso antecipadamente. |
| **Sucesso** | Confirmação objetiva de uma operação concluída. |
| **Erro** | Mensagem compreensível e possibilidade de correção ou nova tentativa quando cabível. |
| **Vazio** | Explicação para ausência de conteúdo ou correspondências. |

Situações que devem ser diferenciadas na interface:

- Biblioteca sem materiais publicados **versus** pesquisa ou filtros sem resultados.
- Falha ao carregar a listagem **versus** recurso indisponível nos detalhes.
- Material enviado para revisão **versus** material publicado após aprovação.
- Favorito salvo **versus** ação de favoritar ainda em processamento.
- Erro de validação de campo **versus** falha de serviço.

As mensagens finais, os tokens de estado ainda ausentes e as respostas visuais devem ser consolidados antes da implementação.

## 9. Menus e sobreposições

Menus e sobreposições devem preservar o contexto da tela que os originou. Para cada um, é necessário definir:

- Ação ou controle que abre o elemento.
- Título ou identificação do conteúdo, quando pertinente.
- Controle explícito de fechamento.
- Comportamento do foco ao abrir e ao fechar.
- Possibilidade de fechar por teclado e por interação fora da área, quando apropriado.
- Tratamento de alterações temporárias ainda não confirmadas.

Os filtros exigem cuidado especial: **editar uma seleção** não deve ser confundido visualmente com **aplicá-la aos resultados**. Menus de Salvos nas variações compacta e completa devem possuir fechamento consistente.

O uso de fundo desfocado, sombra ou escurecimento deve ser padronizado, evitando camadas redundantes de sobreposição.

## 10. Acessibilidade e responsividade

### 10.1. Acessibilidade

- Assegurar leitura e contraste adequados nas combinações de cores realmente utilizadas.
- Fornecer rótulos para campos, botões, ícones acionáveis e controles de filtro.
- Manter foco visível e ordem coerente de navegação por teclado.
- Garantir que seleção, sucesso, erro e indisponibilidade não dependam exclusivamente de cor.
- Relacionar mensagens de erro aos respectivos campos e informar o resultado das ações.
- Utilizar títulos, botões, links e campos com semântica apropriada durante a implementação.
- Considerar ampliação de texto e interação por toque sem perda de conteúdo essencial.

A verificação de conformidade e os critérios mensuráveis de contraste, foco e áreas de toque devem ser formalizados no plano de QA.

### 10.2. Responsividade

As telas principais foram desenhadas para uma largura de referência de **1536 px**, mas esse valor **não define o comportamento em tablets ou celulares**. O layout deve ser adaptado sem perder navegação, leitura, pesquisa, filtros, formulários ou ações essenciais.

A documentação responsiva ainda deve especificar:

- Pontos de quebra e largura máxima das áreas de conteúdo.
- Reorganização do cabeçalho e dos menus.
- Quantidade de colunas ou disposição dos cartões da Biblioteca.
- Apresentação das sobreposições e dos filtros em telas menores.
- Dimensionamento de formulários, botões, campos e áreas de toque.
- Comportamento de textos longos, títulos e mensagens.

## 11. Organização e evolução do sistema

- Preservar nomes semânticos para variáveis e estilos, evitando referências específicas a uma tela ou posição.
- Reutilizar componentes para comportamentos equivalentes e documentar suas variantes e estados.
- Ao criar um novo padrão, registrar seu uso, propriedades, estados e restrições antes de replicá-lo em várias telas.
- Manter coerência entre a biblioteca de design e a implementação, sem considerar os componentes como implementados apenas por estarem desenhados.
- Registrar alterações relevantes de cor, tipografia, componentes e padrões responsivos conforme forem confirmadas.

A biblioteca deverá evoluir com as necessidades do produto, preservando a distinção entre **recurso já identificado**, **regra de uso proposta** e **decisão pendente**.

## 12. Pendências de definição

| Tema | Definição necessária |
|---|---|
| **Biblioteca de variáveis** | Verificar dependências e renomear a coleção `EduMaterial — Fundamentos` para a identidade definitiva EduComp. |
| **Aplicação das cores** | Conferir pares de contraste, superfícies escuras e estados sem token definido. |
| **Tipografia** | Registrar métricas dos oito estilos e conferir seu uso nas telas. |
| **Espaçamento e geometria** | Validar escala, grade, margens, dimensões, bordas e raios. |
| **Efeitos** | Conferir valores e usos do estilo `Elevation/Modal`. |
| **Componentes** | Auditar instâncias, propriedades e variantes; transformar padrões recorrentes em componentes reutilizáveis. |
| **Filtros e sobreposições** | Definir fechamento, Aplicar, Limpar, foco e comportamento em telas menores. |
| **Feedback** | Definir mensagens, tokens de sucesso, aviso, foco e desabilitado. |
| **Responsividade** | Especificar layouts para outras larguras de tela. |
| **Acessibilidade** | Estabelecer critérios verificáveis e procedimento de avaliação. |

## 13. Documentos relacionados

- [`arquitetura-da-informacao.md`](arquitetura-da-informacao.md) — organização de áreas e conteúdos.
- [`objetivos-de-ux.md`](objetivos-de-ux.md) — resultados de experiência pretendidos.
- [`user-flow.md`](user-flow.md) — jornadas e interações.
- [`../product/escopo-mvp.md`](../product/escopo-mvp.md) — delimitação da primeira versão.
- [`../product/requisitos.md`](../product/requisitos.md) — requisitos e regras de negócio.
- [`../product/especificacao-busca-filtros.md`](../product/especificacao-busca-filtros.md) — pesquisa e filtros.
- [`../product/especificacao-metadados.md`](../product/especificacao-metadados.md) — dados e classificações dos materiais.

Este documento registra os fundamentos visuais existentes e as diretrizes necessárias à padronização da interface. A conferência final das propriedades, das interações e dos comportamentos responsivos precederá a implementação correspondente.
