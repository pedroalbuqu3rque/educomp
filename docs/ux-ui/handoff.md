# Handoff de UI/UX — EduComp

**Referência para implementação da interface desktop**

**Protótipo:** [EduComp — Protótipo · Desktop](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)  
**Identidade visual:** [EduComp — ID Visual](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)  
**Base da revisão:** 5 de novembro de 2026  
**Status:** especificação de interface a implementar.

## 1. Objetivo e escopo

Este documento orienta a construção da **versão desktop do EduComp**, descrevendo a composição das páginas, os componentes compartilhados, os fluxos de navegação e os estados necessários para reproduzir a experiência definida no Figma. Deve servir de apoio direto ao trabalho de front-end e à conferência da interface implementada.

A referência visual principal é a página **Protótipo · Desktop**. A página **ID Visual** complementa as definições de marca, cores e tipografia. A página **Backup** preserva versões anteriores e não deve ser utilizada como base para desenvolvimento.

### 1.1. Limites desta entrega

- **Incluído:** páginas e fluxos desktop, navegação, formulários, biblioteca, material e comunidade, salvos, envio, perfil, notificações, conteúdo institucional, sobreposições e estados de feedback.
- **Referência principal de layout:** frames com **1536 px de largura**. A altura varia conforme o conteúdo; páginas longas devem rolar naturalmente.
- **Também necessário:** funcionamento adequado em janelas desktop menores, sem conteúdo cortado nem rolagem horizontal indevida. Os limites e breakpoints serão definidos no front-end conforme o layout real.
- **Fora do aceite desta etapa:** reprodução integral das telas mobile de 390 px e tablet de 768/1024 px. Essas versões continuam disponíveis no Figma para a etapa responsiva posterior; não são um segundo escopo de implementação neste handoff.
- **Fora do documento:** definição de regras de negócio, contratos de API, arquitetura de serviços, permissões e critérios de produto. Consultar a documentação funcional do repositório para essas decisões.

Se houver diferença visual, o Figma ativo é a referência. Se houver conflito de comportamento, segurança ou escopo, o assunto deve ser resolvido com a documentação funcional, sem transformar um elemento ilustrativo do protótipo em regra de negócio.

## 2. Organização das referências

O Figma agrupa os frames desktop por assunto. Os identificadores **D01, D02, D05** etc. ajudam a localizar telas; não representam rotas obrigatórias, nomes de componentes ou ordem de implementação. Os sufixos (`.1`, `.2`, `S`, `A`, `F`, `R`) indicam, em geral, estados ou variações da mesma experiência.

| Área | Referência direta | O que documenta |
| --- | --- | --- |
| Início | [D01 — Início](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34332) | Apresentação da plataforma, chamadas e acesso à biblioteca |
| Autenticação | [DESKTOP / 02](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32521) | Entrar, cadastro, recuperação e erros |
| Biblioteca e salvos | [DESKTOP / 03](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32683) | Listagem, pesquisa, coleção e estados vazios |
| Filtros e compartilhamento | [DESKTOP / 04](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33638) | Filtros, menus e ação de compartilhar |
| Material e perfil público | [DESKTOP / 05](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34034) | Detalhes do recurso, conteúdo pedagógico e autoria |
| Comunidade | [DESKTOP / 06](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33729) | Comentários, relatos, respostas e denúncias |
| Envio e acompanhamento | [DESKTOP / 07](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33078) | Formulário, revisão e histórico |
| Perfil e notificações | [DESKTOP / 08](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33378) | Conta, menu e notificações |
| Institucional | [DESKTOP / 09](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33488) | Contato, termos e privacidade |
| Estados adicionais | [DESKTOP / 10](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4449-440) | Sucesso, falhas, estados de dados |

## 3. Fundação visual

### 3.1. Cores

As cores abaixo constam do guia **ID Visual**. Os nomes de variáveis são sugestões para o código, não uma afirmação de que já estejam presentes no repositório.

| Token sugerido | Valor | Aplicação de referência |
| --- | --- | --- |
| `--color-primary` | `#1761D8` | Ações principais e ícone da marca |
| `--color-brand-name` | `#313E55` | Nome EduComp no logotipo |
| `--color-heading` | `#102B5C` | Títulos e texto principal |
| `--color-text-secondary` | `#526987` | Textos de apoio |
| `--color-surface` | `#FFFFFF` | Cartões e superfícies |
| `--color-page` | `#F8FAFF` | Fundo de página |
| `--color-primary-soft` | `#D9E6FB` | Destaques suaves |
| `--color-error` | `#C7333D` | Erro e validação |

O fundo do ícone da marca deve ser **sólido em `#1761D8`**, sem gradiente. O nome **EduComp** deve usar **`#313E55`**; preservar a assinatura e o subtítulo conforme o ativo aprovado. Não reconstruir o logotipo apenas com texto e formas aproximadas quando o ativo exportável estiver disponível.

### 3.2. Tipografia

Família principal: **Inter**.

| Estilo do guia | Fonte / entrelinha | Peso |
| --- | --- | --- |
| Display/Hero | 38 / 48 px | 700 |
| Heading/H1 | 32 / 40 px | 700 |
| Heading/H2 | 28 / 36 px | 600 |
| Heading/H3 | 20 / 28 px | 600 |
| Body/Regular | 16 / 24 px | 400 |
| Body/Small | 14 / 20 px | 400 |
| Label/Medium | 13 / 18 px | 600 |
| Caption/Small | 11 / 16 px | 500 |

Esses valores formam a escala-base. Para diferenças pontuais, conferir o frame desktop correspondente antes de alterar tokens globais. Manter a hierarquia sem criar tamanhos ou pesos novos a cada tela.

### 3.3. Layout e componentes

O protótipo contém duas estruturas recorrentes:

- **Páginas públicas:** cabeçalho com identidade, chamadas de navegação, conteúdo institucional e rodapé; entrada com destaque para biblioteca, login e cadastro.
- **Área interna:** navegação do EduComp, cabeçalho com identificação de conta/notificações, conteúdo principal e ações contextuais. As páginas de biblioteca, salvos, envio, detalhes e perfil devem compartilhar a estrutura, em vez de replicá-la independentemente.

## 4. Implementação dos fluxos desktop

### 4.1. Início — D01

**Frame:** [D01 — Início](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34332).

A tela apresenta cabeçalho, hero, exemplos de materiais, proposta do produto, chamada para a biblioteca e rodapé. As ações de destaque são **Entrar**, **Criar conta**, **Acessar a biblioteca** e **Saiba mais**. Preservar a ordem e a hierarquia das seções, incluindo a apresentação dos recursos didáticos e a citação editorial.

**Conferir na implementação:** âncoras ou destinos de navegação, comportamento dos botões, dimensões e alinhamentos do hero, cartões ilustrativos e continuidade visual entre as seções. Os destinos efetivos devem ser definidos de acordo com a navegação do projeto.

### 4.2. Autenticação — D02 a D04

**Frames principais:** [D02 — Entrar](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32522), [D03 — Criar conta](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32551) e [D04 — Recuperar senha](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32584).

| Tela/estado | Identificador | Comportamento esperado na interface |
| --- | --- | --- |
| Entrar | D02, D02.3 | Formulário de e-mail e senha; opção **Continuar com Google**; acesso a cadastro e recuperação |
| Credenciais inválidas | D02.1 | Erro legível, associado à tentativa de login, sem apagar dados desnecessariamente |
| Falha no acesso Google | D02.2 | Mensagem de falha e alternativa para nova tentativa |
| Criar conta | D03, D03.2 | Nome, e-mail, senha, alternativa Google e feedback de preenchimento |
| Cadastro inválido | D03.1 | Validação de campos com mensagem específica |
| Recuperação | D04, D04.1 | Solicitação por e-mail e confirmação das instruções enviadas |
| Redefinir senha | D04.2–D04.4 | Nova senha, confirmação de sucesso e tratamento de link expirado |

O protótipo orienta usar **pelo menos 12 caracteres** na senha. A regra definitiva, bem como o login Google e a recuperação por e-mail, precisa concordar com o serviço e a documentação de autenticação. Não implementar fluxo OAuth fictício apenas para corresponder ao botão do Figma.

### 4.3. Biblioteca, busca e filtros — D05 e D13

**Frame principal:** [D05 — Biblioteca](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32684).

A biblioteca reúne lista de materiais, miniaturas, tipo, título, descrição, etapa/ano escolar e acesso aos detalhes. Inclui **campo de busca**, ação **Buscar**, filtros de **tipo de material**, **etapa de ensino** e **eixo da BNCC**, além de indicação de quantidade e paginação.

| Referência | Estado a construir |
| --- | --- |
| D05 | Listagem inicial, controles de busca/filtro e paginação |
| D05.1 | Busca sem resultados, com retorno claro para alterar ou limpar os critérios |
| D05.F | Exemplos de listagem filtrada: plano de aula, Pensamento Computacional e anos iniciais |
| D13, D13.1, D13.2 | Sobreposições de filtro por tipo, etapa e eixo |
| Estado de carregamento em D05 | Mensagem de carregamento enquanto os materiais são obtidos |

A alteração de busca, filtros e página deve atualizar o estado visível da listagem. Não codificar uma página diferente para cada exemplo de filtro. Os valores dos cards, a contagem e a paginação devem vir do estado dos dados; o conteúdo ilustrativo do Figma serve para conferência visual.

### 4.4. Salvos — D07

**Frame principal:** [D07 — Materiais salvos](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32921).

A tela apresenta a coleção pessoal, contagem de itens, cartões de materiais e controles de busca/filtro. O protótipo inclui uma grade desktop de referência e estados após alterações na coleção.

| Referência | Estado a construir |
| --- | --- |
| D07 | Coleção com materiais salvos |
| D07.1 | Coleção vazia |
| D07.2 | Busca sem resultados dentro de salvos |
| D07.R1–R6 | Coleção atualizada após ações de salvar/remover |
| D07.F e D13.S | Filtros aplicados à coleção e seus menus |

Salvar ou remover um material deve refletir na biblioteca, no detalhe do material e na coleção, conforme a persistência disponível. Não confundir **nenhum material salvo** com **nenhum resultado para a busca atual**.

### 4.5. Detalhes do material e perfil público — D06

**Frames:** [D06 — Material e discussão](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34035) e [D06.P01 — Perfil público](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34291).

A página reúne informações pedagógicas (tipo, etapa, ano, eixo da Computação, descrição e objetivos), autoria, acesso ao arquivo e ações como **Adicionar aos salvos**. A seção de participação possui as visualizações **Todos**, **Relatos de aplicação** e **Discussões**, com comentários e respostas.

**Comportamentos que devem compartilhar a mesma página de detalhe:**

- **D06.A01–A011:** acesso ao arquivo, falha no download, material salvo/removido e exemplos de download de diferentes materiais. O arquivo e seu nome variam conforme os dados; não criar telas exclusivas por título de recurso.
- **D06.P01:** acesso ao perfil público do autor ou colaborador, respeitando o conjunto de dados públicos definido pelo produto.
- **D06.S01–S12:** comentar, relatar aplicação, responder, editar comentário, denunciar, confirmar publicação/denúncia, filtrar contribuições e apresentar estado sem comentários.
- **D06.S13–S16:** resposta publicada, comentário atualizado, relato publicado e falha ao contribuir.

Exibir ações conforme o estado de autenticação e as permissões definidas funcionalmente. Uma ação de denúncia, edição ou remoção não deve depender apenas da exibição de um botão; sua autorização precisa ser confirmada pela aplicação.

### 4.6. Envio e acompanhamento de materiais — D08

**Frame principal:** [D08 — Enviar material](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33079).

A tela possui abas **Enviar material** e **Meus envios**, orientações de revisão, dados do recurso e seleção de arquivo. Campos visíveis: título, descrição, tipo de material, etapa de ensino, ano escolar opcional e eixo da Computação. As ações finais incluem **Cancelar** e **Enviar para revisão**.

| Referência | Estado a construir |
| --- | --- |
| D08 e D08.12 | Formulário inicial e preenchido |
| D08.1 | Validação de campos |
| D08.5 | Arquivo selecionado |
| D08.6 | Envio em andamento |
| D08.7–D08.9 | Falha de envio, formato inválido e arquivo acima do limite |
| D08.2 | Confirmação de envio |
| D08.3 | Acompanhamento em modal |
| D08.4 | Meus envios, com situação de cada contribuição |
| D08.10–D08.11 | Ajustes solicitados e material não aprovado |

O protótipo exibe **PDF, PPTX, DOCX ou imagens, até 20 MB**. Tratar esses valores como referência visual até serem confirmados pelos requisitos e pelo serviço de upload. Distinguir **erro de formulário**, **erro técnico no upload** e **situação editorial do envio**: cada caso tem significado e mensagem próprios. Impedir reenvio acidental durante a operação quando aplicável.

### 4.7. Meu perfil e notificações — D09

**Frames:** [D09 — Meu perfil](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33379), **D09.1 — Menu do perfil** e **D09.2 — Notificações**.

O perfil contempla identificação do professor, foto, nome, e-mail, instituição opcional, descrição pública (*Sobre mim*), salvamento de alterações e troca de senha. O texto de apoio do protótipo aponta limite de **300 caracteres** para a apresentação pessoal; conferir essa regra com a validação funcional.

**Estados adicionais:** D09.3 (perfil salvo), D09.4–D09.5 (alterar foto/foto selecionada), D09.6 (alterar senha), D09.7 (falha ao salvar), D09.8 (sem notificações), D09.9 (lidas) e D09.10 (lista completa).

O painel de notificações apresenta quantidade de novas mensagens, ações como **Marcar todas como lidas** e **Ver todas as notificações**, além de variações lidas/não lidas. Manter coerência entre indicador no cabeçalho, painel e listagem, com estado derivado dos dados.

### 4.8. Institucional e compartilhamento — D10 a D14

| Referência | Interface e comportamento |
| --- | --- |
| D10 | Formulário **Fale conosco** |
| D10.1–D10.3 | Mensagem enviada, erro de validação e falha de envio |
| D11 | **Termos de uso**, com leitura confortável e rolagem natural |
| D12 | **Política de privacidade**, com estrutura textual legível |
| D14, D14.2 | Compartilhamento da plataforma |
| D14.1 | Confirmação de link copiado |

Usar o conteúdo jurídico aprovado para o produto, sem presumir que o texto ilustrativo seja versão legal definitiva. A cópia e o compartilhamento devem executar a ação real e retornar confirmação acessível.

## 5. Interação, estados e acessibilidade

Os frames de estados complementares são uma **matriz de comportamento**, não uma lista de novas páginas. Implementar as transições com componentes e estados reaproveitáveis.

| Situação | Exigência de interface |
| --- | --- |
| Inicial e preenchido | Rótulos, valores, seleções e indicadores consistentes com a operação |
| Validação | Mensagem específica vinculada ao campo, sem depender apenas da cor |
| Carregamento ou envio | Feedback de progresso, preservação de contexto e prevenção de duplicidade quando necessária |
| Sucesso | Confirmação visível e contextual, sem bloquear permanentemente a navegação |
| Falha | Explicação compreensível, opção de recuperação e retenção de dados sempre que possível |
| Vazio e sem resultados | Mensagens distintas para ausência de dados e critérios que não retornaram itens |
| Modal, pop-up e menu | Fechamento previsível, controle de foco e sem sobreposição indevida |
| Notificação lida/não lida | Diferenciação visual e semântica, com atualização consistente do indicador |

Na implementação desktop, validar especialmente **teclado**, foco visível, ordem de tabulação, nomes acessíveis de botões de ícone, associação entre campos e erros, contraste e comportamento de modais (foco de entrada, retorno e fechamento). As telas não substituem uma verificação de acessibilidade no navegador.

## 6. Orientações para o front-end

A organização concreta deve seguir o framework e as convenções existentes no repositório. Como divisão de responsabilidades, recomenda-se:

1. **Fundação:** Inter, tokens, estilos globais e assets aprovados.
2. **Layout compartilhado:** páginas públicas e área interna com navegação, cabeçalho, identificação de conta e notificações.
3. **Componentes:** botão, campo, seletor, checkbox, busca, filtro, card de material, tag, abas, modal, menu, aviso, paginação e feedback.
4. **Páginas e fluxos:** início, autenticação, biblioteca, salvos, material/comunidade, envio, perfil e institucional.
5. **Estado e integrações:** dados de materiais, filtros, usuário, autenticação, uploads, downloads e notificações separados da apresentação visual.

Não duplicar componentes para cada frame de estado, nem construir páginas específicas para materiais de exemplo. Usar as variações do Figma como referência para **estados de componentes** e **cenários de teste**.

**Ordem de implementação sugerida:** primeiro a fundação visual e o layout; depois início/autenticação; biblioteca e salvos; detalhe/comunidade; envio; perfil/notificações; por fim institucional e revisão transversal dos estados. Essa sequência orienta o desenvolvimento da UI, mas não altera a priorização funcional definida no planejamento do projeto.

## 7. Validação e critérios de aceite desktop

A interface desktop estará pronta para revisão visual quando:

- [ ] O resultado for comparado com os frames pertinentes do Figma **na largura de referência de 1536 px**.
- [ ] O layout também se mantiver utilizável em **janelas desktop menores**, sem depender de altura fixa, cortar conteúdo ou gerar rolagem horizontal desnecessária.
- [ ] O logotipo, as cores, a Inter, a hierarquia, os espaçamentos, os ícones e os estados visuais estiverem coerentes com o design.
- [ ] Cabeçalho, navegação, cartões, campos, botões, filtros, menus e modais apresentarem consistência entre páginas.
- [ ] Busca, filtros, paginação, salvar/remover e estados da biblioteca exibirem respostas coerentes às ações.
- [ ] Formulários distinguirem preenchimento, validação, carregamento, sucesso e falha.
- [ ] Detalhe de material, downloads, contribuições e histórico de envios apresentarem os estados pertinentes, sem telas duplicadas por conteúdo fictício.
- [ ] Notificações, perfil e ações de conta atualizarem suas representações na interface.
- [ ] Navegação por teclado, foco, rótulos, textos de erro e fechamento de sobreposições forem verificados no navegador.
- [ ] Conteúdo dinâmico, textos extensos e ausência de imagens forem tratados sem quebrar a composição.
- [ ] Diferenças intencionais em relação ao Figma estiverem registradas e justificadas.

**Este aceite é de UI desktop.** Ele não substitui testes de integração, segurança, regras de negócio nem o aceite específico de mobile/tablet em etapa posterior.

## 8. Pontos de integração a confirmar

O protótipo não define sozinho os itens abaixo. Conferir com os documentos de requisitos, decisões de produto e implementação:

- Rotas e regras de acesso a páginas públicas/autenticadas.
- Contrato de autenticação, login Google, recuperação de senha e política de credenciais.
- Modelos de material, busca, paginação, filtros e persistência da coleção salva.
- Autorização para comentários, respostas, edições, denúncias e ações sobre materiais.
- Formatos aceitos, tamanho máximo, processamento do arquivo e situações de revisão editorial.
- Endpoints, modelos e atualização das notificações.
- Edição de foto/perfil, limites de texto e exposição de dados no perfil público.
- Conteúdo definitivo de termos de uso, privacidade e contato.
- Estratégia de exportação e versionamento dos assets do Figma.

O objetivo é manter este handoff **centrado na implementação da interface desktop**, sem repetir especificações que pertencem a outros documentos do projeto.

---

**Manutenção:** atualizar este documento quando houver uma decisão de interface desktop que altere sua implementação ou seus critérios de aceite. Ajustes de regras de negócio, arquitetura e escopo devem ser registrados primeiro nos documentos correspondentes.
