# EduComp — Design System

**Versão:** 1.1 · **Atualizado em:** 13/11/2026 · **Situação:** padrões implementados; validação responsiva em andamento.

## 1. Referências

Este documento registra a linguagem visual e os componentes recorrentes do EduComp. Para detalhes de composição e estados, consultar:

- [Identidade visual no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Protótipo desktop](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Handoff de UI/UX](handoff.md)

As interfaces devem ser construídas com componentes reutilizáveis e dados dinâmicos, não com cópias fixas dos frames.

## 2. Identidade visual

O EduComp usa o azul como cor principal, tipografia sóbria e superfícies claras. O resultado deve comunicar uma plataforma educacional confiável, sem excesso de recursos decorativos.

**Logotipo**

- Fundo do símbolo em **`#1761D8` sólido**, sem gradiente.
- Nome **EduComp** em **`#313E55`**.
- Subtítulo conforme aplicação da identidade visual no Figma.
- Respeitar proporção, espaçamento e versões previstas no arquivo da marca.
- No **cabeçalho**, a logo completa atua como botão de retorno ao **Início**. Deve ser implementada como link acessível, não apenas imagem decorativa.

Exportar ativos da marca preferencialmente em formato vetorial e manter nomes acessíveis para o conjunto símbolo/nome.

## 3. Cores

A coleção de referência no Figma é **`EduComp — Fundamentos`**, com modo **`Padrão`**. Os valores base documentados são:

| Token | Valor | Utilização |
| --- | --- | --- |
| `color/brand/primary` | `#1761D8` | Ações principais, estados ativos e destaques |
| `color/brand/deep` | `#102B5C` | Títulos e elementos de maior ênfase |
| `color/brand/logo-background` | `#1761D8` | Fundo do símbolo da marca |
| `color/brand/logo-name` | `#313E55` | Nome no logotipo |
| `color/text/primary` | `#102B5C` | Títulos e texto principal |
| `color/text/secondary` | `#526987` | Texto de apoio |
| `color/surface/canvas` | `#F8FAFF` | Fundo da página |
| `color/surface/default` | `#FFFFFF` | Cartões, painéis e formulários |
| `color/surface/soft` | `#D9E6FB` | Destaques leves |
| `color/border/subtle` | `#D9E6FB` | Bordas e divisórias |
| `color/status/danger` | `#C7333D` | Erros e validações negativas |

Cores de sucesso, aviso, foco e indisponibilidade exigem verificação de contraste no código. Estados como Pendente, Em análise, Aprovado, Recusado, Publicado e Ocultado não devem ser distinguíveis exclusivamente por cor.

## 4. Tipografia

A família principal é **Inter**, utilizando pesos e tamanhos coerentes com a hierarquia. A escala de referência da identidade é:

| Estilo | Tamanho | Entrelinhas | Peso |
| --- | --- | --- | --- |
| `Display/Hero` | 38 px | 48 px | 700 |
| `Heading/H1` | 32 px | 40 px | 700 |
| `Heading/H2` | 28 px | 36 px | 600 |
| `Heading/H3` | 20 px | 28 px | 600 |
| `Body/Regular` | 16 px | 24 px | 400 |
| `Body/Small` | 14 px | 20 px | 400 |
| `Label/Medium` | 13 px | 18 px | 600 |
| `Caption/Small` | 11 px | 16 px | 500 |

A hierarquia semântica deve acompanhar a apresentação visual, inclusive em modais, formulários e cartões. Tamanhos específicos presentes em frames isolados não precisam se tornar tokens globais.

## 5. Grid, superfícies e efeitos

Os frames desktop têm **1536 px de largura**. Essa largura serve de referência de composição, não de bloqueio para a aplicação. Conteúdos devem responder à janela disponível, com largura máxima apropriada, quebras de linha e rolagem vertical.

As páginas usam cabeçalho comum, planos de fundo claros e áreas principais organizadas em painéis ou cartões. Abas e menus mostram a área ativa com destaque visual discreto.

### Pop-ups e sobreposições

Ao abrir um pop-up, **somente a página de fundo deve ficar desfocada**. O conteúdo da janela permanece nítido.

| Propriedade | Valor de referência |
| --- | --- |
| Desfoque do fundo (*backdrop blur*) | **12 px** |
| Película sobre o fundo | Azul-escuro próximo de `#0D1C34`, com **16%** de opacidade |
| Conteúdo do diálogo | Superfície branca, nítida, acima da película |
| Sombra de modal (`Elevation/Modal`) | Deslocamento vertical 18 px, blur 48 px, cor aproximada `rgba(10,20,41,0.22)` |

A camada de desfoque não deve capturar indevidamente o foco nem impedir o funcionamento do modal. A implementação deve tratar Escape, foco inicial, foco retido no diálogo e retorno ao elemento acionador, conforme o tipo de janela.

**Exceção:** os filtros **Todos / Relatos de aplicação / Discussões** não abrem pop-up. São alternâncias de conteúdo **dentro da página do material** e não desfocam o fundo.

## 6. Componentes principais

| Componente | Padrão |
| --- | --- |
| Cabeçalho | Logo clicável para Início, links de áreas, notificações e menu do usuário; área Revisão exclusiva do papel autorizado. |
| Botões | Primário azul, secundário contornado e estados de hover, foco, pressionado, carregamento e desabilitado. |
| Campos | Rótulo visível, ajuda contextual, validação específica e indicação clara de obrigatoriedade. |
| Cartão de material | Tipo, título, resumo, etapa/ano ou série, abordagem por ícones, favorito e acesso ao detalhe. |
| Pesquisa | Campo textual e botão Buscar; resultado atualizado apenas na execução da consulta. |
| Filtros da Biblioteca | Quatro controles independentes: Tipo, Etapa, Eixo e Abordagem; sobreposição com Aplicar e Limpar. |
| Abas | Área ativa identificável em Envia​r material/Meus envios e Revisão/Denúncias. |
| Discussões | Cards de comentários, respostas de um nível e relatos, com alternância inline e ações contextuais. |
| Avisos | Notificações lidas/não lidas, mensagens de sucesso, erro e estados vazios. |
| Moderação | Filas restritas, motivos, status e confirmações para decisões definitivas. |

### 6.1. Cartões de materiais

Os cartões não são repetidos com conteúdo fictício único. Devem receber dados reais do recurso e manter consistência entre Biblioteca e Salvos.

- **Tipo:** selo textual na parte superior, incluindo **Jogo**, **Aula completa** e **Sequência de atividades**.
- **Etapa/ano:** mostrar `EI · idade`, `EF · ano` ou `EM · série`, conforme cadastro.
- **Abordagem:** indicar **Plugada** por ícone de monitor e **Desplugada** por monitor riscado; exibir os dois quando ambas se aplicarem. Não acrescentar tag textual de abordagem em cada cartão.
- **Favorito:** contorno azul quando inativo e ícone preenchido em azul quando salvo; confirmação apenas após retorno do servidor.
- **Leitura:** descrição limitada a duas linhas; título, resumo e ações mantêm altura e espaçamento consistentes mesmo com textos diferentes. O card não exibe uma faixa adicional de eixo nem um selo de PDF.

Os ícones de abordagem devem possuir texto acessível, porque a legenda visual localizada na Biblioteca não atende, sozinha, a todos os leitores.

### 6.2. Formulário de envio

O formulário contém tags livres, seleção múltipla de tipos, etapas, anos/séries, eixos e abordagens, além de autoria/fonte, objetivos opcionais, declaração de direitos e vários arquivos.

- Exibir os arquivos selecionados com nome, tamanho, formato e opção **Remover**.
- Informar formatos PDF, DOCX, PPTX, PNG e JPG e limite de 20 MB por arquivo.
- Validar erros próximos aos respectivos campos, preservando entradas válidas após falhas recuperáveis.
- Distinguir **Selecionar arquivos**, **Cancelar** e **Enviar para revisão**.

### 6.3. Comunidade e moderação

A área de discussões permanece na página de detalhes e usa as categorias **Todos**, **Relatos de aplicação** e **Discussões** como filtros de conteúdo. Comentários textuais têm até 1.000 caracteres e apenas um nível de resposta. Relatos incluem contexto de aplicação e adaptações opcionais.

Denunciar é uma ação distinta de excluir comentário próprio. A interface de denúncia informa que o material continuará público até decisão. A moderação restrita apresenta **Ocultar**, **Restaurar** e **Excluir definitivamente**, com confirmação explícita para exclusão.

### 6.4. Perfil e notificações

O perfil pessoal contém dados de conta, cargo/função, apresentação e ações de foto/senha. O fluxo de foto apresenta a escolha do arquivo, uma **prévia centralizada** com ilustração demonstrativa e as ações **Escolher outra imagem** e **Salvar foto**. Na implementação, a prévia deve utilizar o arquivo selecionado pelo usuário.

O perfil público mostra apenas dados autorizados e materiais publicados. A central de notificações possui indicador de novas mensagens, lista recente, marcar como lidas, lista completa e estado vazio.

### 6.5. Institucional

O formulário **Fale conosco** usa nome, e-mail, assunto e mensagem, com estados de confirmação e erro. O rodapé reúne Termos de uso, Privacidade e Fale conosco, sem botão de compartilhamento externo.

## 7. Estados e acessibilidade

Para controles aplicáveis, implementar padrão, hover, foco, selecionado, desabilitado, carregamento, sucesso, erro e vazio. Estados de negócio e resultados de operação devem usar textos claros e não depender apenas de cor.

A **WCAG 2.2 AA** é a referência para testes. Usar HTML semântico, nomes acessíveis para botões de ícone, rótulos associados, erros anunciáveis e navegação por teclado. Nos diálogos, o fundo visualmente desfocado não pode prejudicar o contraste ou o foco do conteúdo ativo.

## 8. Responsividade e implementação

Desktop orienta a primeira implementação; tablets e celulares exigirão reordenação de menus, grids, filtros, formulários e áreas de discussão. O conteúdo deve manter sua função, mesmo quando a composição visual mudar. A escolha de breakpoints e os limites precisos de espaçamento e raios de borda serão definidos na construção dos componentes e validados em telas intermediárias.

## 9. Documentos relacionados

- [Handoff de UI/UX](handoff.md)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [Especificação de metadados](../product/especificacao-metadados.md)
