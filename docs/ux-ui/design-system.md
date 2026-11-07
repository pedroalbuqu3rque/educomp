# EduComp — Design System

**Versão:** 0.7  
**Atualizado em:** 07/11/2026  
**Situação:** identidade visual definida; componentes e adaptações responsivas em preparação.

## 1. Referências

Este documento reúne as definições visuais do EduComp e os padrões que serão usados na interface. Os valores já estabelecidos no Figma são mantidos aqui; o que ainda não foi definido aparece na seção final.

- [Identidade visual no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Protótipo desktop no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Handoff de UI/UX](handoff.md)

O protótipo desktop é a referência inicial. As telas de tablet e celular orientarão a adaptação responsiva antes da conclusão do MVP.

## 2. Identidade visual

O EduComp utiliza o azul como cor principal, tipografia simples e superfícies claras para dar destaque aos materiais e às ações da plataforma.

O logotipo é composto por símbolo, nome e subtítulo. Suas aplicações devem seguir o guia de identidade do Figma:

- O fundo do símbolo é **sólido**, em `#1761D8`, sem gradiente.
- O nome **EduComp** utiliza `#313E55`.
- O subtítulo mantém as cores e a composição originais.
- Proporções, alinhamento e área de respiro devem ser preservados.
- Versões monocromática e inversa devem utilizar as aplicações previstas no arquivo de identidade.

Os arquivos da marca devem ser exportados a partir do Figma. Sempre que adequado, utilizar a versão vetorial.

## 3. Cores

O Figma possui a coleção de variáveis **`EduComp — Fundamentos`**, no modo **`Padrão`**.

| Variável | Valor | Uso |
| --- | --- | --- |
| `color/brand/primary` | `#1761D8` | Cor principal e ações em destaque |
| `color/brand/deep` | `#102B5C` | Azul profundo da identidade |
| `color/brand/logo-background` | `#1761D8` | Fundo do símbolo |
| `color/brand/logo-name` | `#313E55` | Nome no logotipo |
| `color/text/primary` | `#102B5C` | Títulos e texto principal |
| `color/text/secondary` | `#526987` | Informações secundárias |
| `color/surface/canvas` | `#F8FAFF` | Fundo geral |
| `color/surface/default` | `#FFFFFF` | Cartões, formulários e outras superfícies |
| `color/surface/soft` | `#D9E6FB` | Destaques suaves |
| `color/border/subtle` | `#D9E6FB` | Bordas e divisórias |
| `color/status/danger` | `#C7333D` | Erros e validações negativas |

As cores devem ser usadas conforme sua função, evitando valores soltos repetidos no código. O azul principal identifica a ação de maior destaque, sem competir com vários botões primários na mesma área.

**Ainda não há valores consolidados** para sucesso, aviso, foco e indisponibilidade. Eles serão definidos conforme os componentes forem implementados, com verificação de contraste.

## 4. Tipografia

A família tipográfica principal é **Inter**. A escala de referência do guia de identidade é:

| Estilo | Tamanho | Altura de linha | Peso |
| --- | --- | --- | --- |
| `Display/Hero` | 38 px | 48 px | 700 |
| `Heading/H1` | 32 px | 40 px | 700 |
| `Heading/H2` | 28 px | 36 px | 600 |
| `Heading/H3` | 20 px | 28 px | 600 |
| `Body/Regular` | 16 px | 24 px | 400 |
| `Body/Small` | 14 px | 20 px | 400 |
| `Label/Medium` | 13 px | 18 px | 600 |
| `Caption/Small` | 11 px | 16 px | 500 |

Essa escala orienta títulos, textos, rótulos e informações auxiliares. O protótipo também possui tamanhos usados em situações específicas; eles não precisam se tornar estilos globais apenas por aparecerem em uma tela.

Na implementação, a hierarquia visual deve acompanhar a estrutura semântica da página: títulos como títulos, rótulos associados aos campos e ações identificadas corretamente.

## 5. Layout e efeitos

Os frames desktop têm **1536 px de largura**. Essa é uma referência de composição, não uma largura fixa para a aplicação. O conteúdo precisa se adaptar a janelas menores sem cortes ou sobreposições.

Cabeçalhos, navegação, rodapés e áreas de conteúdo devem ser reutilizados entre páginas equivalentes. Espaçamentos e alinhamentos devem seguir os padrões recorrentes no Figma, sem transformar medidas isoladas em regras para toda a plataforma.

O Figma possui o efeito **`Elevation/Modal`**, com os seguintes valores:

| Propriedade | Valor |
| --- | --- |
| Deslocamento | `0 px` na horizontal; `18 px` na vertical |
| Desfoque | `48 px` |
| Expansão | `0 px` |
| Cor aproximada | `rgba(10, 20, 41, 0.22)` |

O efeito serve como referência para modais e sobreposições. A escala de espaçamentos, os raios de borda, as dimensões recorrentes e as larguras máximas ainda precisam ser consolidados.

## 6. Componentes

Os elementos recorrentes do Figma devem orientar componentes reutilizáveis na aplicação. A existência de um padrão visual no protótipo não significa, necessariamente, que ele já esteja organizado como componente mestre.

| Componente | Padrão esperado |
| --- | --- |
| **Botões e links** | Distinguir ação principal, ação secundária e navegação. Usar rótulos que indiquem o resultado da ação. |
| **Campos e formulários** | Manter rótulos, mensagens, bordas e estados consistentes entre cadastro, login, perfil e envio. |
| **Cartão de material** | Apresentar informações essenciais, acesso aos detalhes e favorito quando aplicável. Tratar textos longos e ausência de imagem. |
| **Pesquisa e filtros** | Diferenciar opções em edição dos filtros aplicados. Manter claros os controles Buscar, Aplicar e Limpar. |
| **Menus e abas** | Identificar a área ativa e preservar comportamentos equivalentes entre páginas. |
| **Modais e sobreposições** | Oferecer fechamento explícito, controle de foco e retorno ao elemento que abriu a interface. |
| **Favoritos** | Diferenciar material salvo e não salvo, sem antecipar a confirmação da operação. |
| **Mensagens e estados vazios** | Informar cada situação no seu contexto, com orientação quando houver uma ação possível. |

### 6.1. Formulário de envio

O formulário deverá incorporar os campos definidos para o MVP:

- **Tema / palavras-chave:** entrada de várias tags livres.
- **Tipo, etapa e eixo:** seleção múltipla.
- **Ano/série:** seleção relacionada às etapas de Ensino Fundamental e Médio.
- **Arquivos:** seleção de vários arquivos, com identificação individual e mensagens de validação. O limite aprovado é de **20 MB por arquivo**.

A interface precisa mostrar quais arquivos foram selecionados e comunicar erros sem apagar desnecessariamente os demais dados preenchidos. A quantidade máxima de arquivos e a apresentação dos anos por etapa ainda serão detalhadas.

### 6.2. Cartões de materiais

Quando não houver miniatura, o cartão usará um ícone relacionado ao tipo de material. Ainda será definido qual ícone representar quando o recurso tiver **mais de um tipo**.

Os cartões da Biblioteca e de Salvos devem manter a mesma linguagem visual, adaptando somente as ações disponíveis em cada contexto.

### 6.3. Área de revisão

A interface restrita de revisão ainda precisa ser desenhada. Ela deverá seguir os mesmos padrões de botões, campos, listagens, estados e mensagens utilizados no restante da plataforma.

O desenho deve distinguir as ações **Iniciar análise**, **Aprovar**, **Recusar** e **Despublicar**. A recusa exige um campo de justificativa. A existência desses controles não altera as regras de permissão definidas nos requisitos.

## 7. Interações e feedback

Os componentes devem apresentar os estados que fizerem sentido para sua função: padrão, hover, foco, pressionado, selecionado, desabilitado, carregamento, sucesso e erro.

- **Foco:** precisa ser visível na navegação por teclado.
- **Erro:** deve explicar o problema, preferencialmente próximo ao campo ou à ação afetada.
- **Carregamento:** indica uma operação em andamento, sem sinalizar conclusão antecipada.
- **Sucesso:** confirma uma operação efetivamente concluída.
- **Estado vazio:** diferencia, por exemplo, uma coleção sem favoritos de uma pesquisa sem resultados.

Modais, menus e filtros devem permitir fechamento por **Escape** quando aplicável, com controle adequado do foco. Fechar um filtro sem selecionar **Aplicar** descarta as alterações temporárias.

A ação de copiar link deve identificar que o endereço copiado é o da **página inicial do EduComp**. O rótulo não deve sugerir compartilhamento de um material específico.

## 8. Ícones e imagens

Os ícones devem manter proporções, espessura de traço e tamanhos consistentes. Quando representam uma ação, precisam de nome acessível; ícones decorativos não devem gerar leitura redundante.

A escolha da biblioteca de ícones será feita na preparação do front-end. Imagens e avatares devem ter tratamento consistente para ausência de arquivo e não podem ser distorcidos para preencher o espaço disponível.

## 9. Acessibilidade e responsividade

A implementação terá como referência as **WCAG 2.2, nível AA**. Na construção dos componentes, isso envolve contraste adequado, navegação por teclado, foco visível, rótulos associados aos campos, mensagens compreensíveis e estados que não dependam apenas de cor.

O desenvolvimento começará pelo desktop, seguido pelas adaptações para tablet e celular. Os pontos de quebra e a reorganização de menus, cartões, formulários e filtros serão definidos a partir das telas do Figma e de testes em larguras intermediárias. A versão responsiva faz parte da entrega do MVP.

## 10. Definições para a implementação

- [ ] Consolidar cores de sucesso, aviso, foco e indisponibilidade, verificando o contraste.
- [ ] Padronizar escala de espaçamento, raios de borda e dimensões recorrentes.
- [ ] Escolher uma biblioteca de ícones e estabelecer seus tamanhos e usos.
- [ ] Ajustar os componentes de tags, classificações múltiplas, anos/séries e upload de vários arquivos.
- [ ] Definir o ícone dos cartões quando houver múltiplos tipos de material.
- [ ] Desenhar a área de revisão e seus estados no Figma.
- [ ] Definir breakpoints e conferir os componentes nas versões responsivas.
- [ ] Validar foco, contraste, navegação por teclado e mensagens nos componentes implementados.

## 11. Documentos relacionados

- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [User Flow](user-flow.md)
- [Handoff de UI/UX](handoff.md)
- [Requisitos](../product/requisitos.md)
- [Especificação de metadados](../product/especificacao-metadados.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
