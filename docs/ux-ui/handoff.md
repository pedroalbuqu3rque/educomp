# EduComp — Handoff de UI/UX

**Versão:** 2.0 · **Atualizado em:** 08/11/2026  
**Situação:** protótipo desktop consolidado; desenvolvimento não iniciado.

## 1. Objetivo

Este documento orienta a implementação da interface do EduComp a partir das decisões de produto e design consolidadas no Figma.

O objetivo não é reproduzir cada frame de maneira isolada, mas construir uma aplicação consistente, acessível e integrada a dados reais, preservando a experiência definida no protótipo.

O handoff reúne referências visuais, organização das telas, comportamentos esperados, estados de interface e dependências que precisam ser resolvidas durante o desenvolvimento.

Os requisitos de produto, as regras de negócio e as especificações complementares permanecem documentados em seus respectivos arquivos.

## 2. Referências de design

O arquivo principal do projeto é o [EduComp no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp).

As referências estão organizadas em três frentes:

- **Identidade visual:** logotipo, cores, tipografia e fundamentos gráficos.
- **Protótipo:** telas desktop, estados, diálogos e fluxos de interação.
- **Referências responsivas:** orientações visuais para adaptação a larguras menores.

A página [EduComp · Protótipo](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520) é a referência principal para composição e apresentação dos fluxos.

### 2.1. Organização do protótipo

O protótipo está organizado em **dez seções**, totalizando **90 telas principais**.

| Seção | Telas | Conteúdo |
| --- | ---: | --- |
| 1 · Início | 1 | Apresentação do EduComp. |
| 2 · Acesso | 9 | Cadastro, login e recuperação de senha. |
| 3 · Biblioteca e salvos | 4 | Listagem, pesquisa e coleção pessoal. |
| 4 · Filtros | 7 | Estados dos filtros da Biblioteca. |
| 5 · Material e autor | 7 | Detalhes, arquivos e perfis públicos. |
| 6 · Comunidade | 16 | Comentários, relatos, respostas e denúncias. |
| 7 · Envio de materiais | 11 | Formulário, validações e acompanhamento. |
| 8 · Perfil e notificações | 11 | Conta, fotografia, senha e avisos. |
| 9 · Contato e informações | 9 | Contato, compartilhamento e páginas institucionais. |
| 10 · Revisão e moderação | 15 | Avaliação de materiais e denúncias. |

As seções agrupam telas por finalidade e não determinam, necessariamente, a estrutura de rotas da aplicação.

Frames que representam sucesso, erro, seleção, confirmação ou ausência de conteúdo devem ser implementados como **estados de uma mesma experiência**, sempre que adequado.

## 3. Premissas de implementação

A interface deverá seguir estes princípios:

1. **Fidelidade ao design:** respeitar identidade, hierarquia visual, componentes, espaçamentos e estados previstos.
2. **Reutilização:** construir componentes compartilhados, evitando implementar cada tela de forma independente.
3. **Dados reais:** substituir o conteúdo demonstrativo dos frames por dados provenientes da aplicação.
4. **Comportamento consistente:** ações visuais devem corresponder a operações verificáveis, com feedback adequado.
5. **Acessibilidade:** utilizar elementos semânticos e garantir navegação, leitura e operação por diferentes meios.
6. **Responsividade:** partir da composição desktop sem limitar a experiência a uma resolução fixa.
7. **Segurança:** aplicar autenticação e autorização nas operações e nos serviços, não apenas nos controles visuais.

O protótipo contém estados ilustrativos. Ele não define a tecnologia de frontend, backend, banco de dados ou infraestrutura.

## 4. Identidade e fundamentos visuais

### 4.1. Marca

A identidade do EduComp utiliza uma linguagem institucional contemporânea, com predominância de azul, fundos claros e elementos gráficos discretos.

As decisões consolidadas para o logotipo são:

- Fundo do símbolo em **`#1761D8`**, sólido e sem gradiente.
- Nome **EduComp** em **`#313E55`**.
- Subtítulo preservado conforme a identidade visual.
- Proporções e espaçamentos conforme o Figma.

A marca apresentada no cabeçalho deve funcionar como link para a página **Início**.

### 4.2. Cores de referência

| Uso | Valor |
| --- | --- |
| Azul principal | `#1761D8` |
| Azul profundo | `#102B5C` |
| Texto do logotipo | `#313E55` |
| Texto secundário | `#526987` |
| Fundo principal | `#F8FAFF` |
| Superfície dos cartões | `#FFFFFF` |
| Superfície suave e bordas | `#D9E6FB` |
| Erros | `#C7333D` |

Esses valores devem ser organizados em tokens semânticos. Componentes não devem depender de valores de cor duplicados em diferentes arquivos.

As cores utilizadas para estados editoriais, alertas e mensagens precisam manter contraste suficiente e contar com identificação textual.

### 4.3. Tipografia

A família tipográfica principal é **Inter**.

Utilizar os estilos e pesos definidos na identidade visual, mantendo distinção clara entre:

- Título principal da página.
- Títulos de seção.
- Títulos de cartões.
- Texto de leitura.
- Rótulos e controles.
- Legendas e informações auxiliares.

A hierarquia semântica do HTML deve acompanhar a hierarquia visual. Tamanhos específicos de determinados frames não precisam gerar novos tokens se não forem recorrentes.

### 4.4. Layout

O protótipo desktop utiliza frames de **1536 px de largura**.

Essa medida é uma referência visual, não uma largura fixa de renderização. A implementação deve estabelecer um contêiner de conteúdo apropriado, preservar os alinhamentos e permitir adaptação a diferentes janelas.

O cabeçalho, os cartões, os formulários e os diálogos devem seguir regras compartilhadas de espaçamento, bordas e elevação.

### 4.5. Sobreposições

Os pop-ups utilizam fundo escurecido e desfocado.

| Propriedade | Referência |
| --- | --- |
| Desfoque do fundo | `backdrop-filter: blur(12px)` |
| Película | Azul-escuro `#0D1C34`, aproximadamente 16% de opacidade |
| Janela ativa | Superfície clara, sem desfoque |
| Elevação | Sombra de modal conforme o Design System |

O desfoque deve ser aplicado à região de fundo, mantendo o diálogo legível e nítido.

Na implementação, cada diálogo precisa de identificação acessível, comportamento de foco adequado e fechamento consistente com sua finalidade.

## 5. Navegação e permissões

### 5.1. Navegação pública

Visitantes podem acessar:

- Início.
- Biblioteca e detalhes de materiais publicados.
- Discussões públicas de materiais.
- Perfis públicos de autores.
- Cadastro e login.
- Fale conosco.
- Termos de uso e Política de privacidade.
- Compartilhamento da plataforma.

Não é necessário cadastro para explorar o acervo público.

### 5.2. Navegação autenticada

Professores autenticados têm acesso adicional a:

- Salvos.
- Envio de materiais.
- Meus envios.
- Acesso autorizado aos arquivos.
- Publicação de comentários, respostas e relatos.
- Denúncia de contribuições.
- Meu perfil.
- Notificações.
- Encerramento da sessão.

### 5.3. Navegação de revisão

O acesso à área **Revisão** depende de autorização específica.

A área reúne:

- Fila de submissões de materiais.
- Detalhes e decisões editoriais.
- Fila de denúncias.
- Ações de moderação.

O menu e as ações de revisão não devem ser exibidos a contas comuns. O backend também deve impedir o acesso por requisições diretas não autorizadas.

## 6. Componentes compartilhados

A implementação deve priorizar uma biblioteca de componentes reutilizáveis.

| Componente | Responsabilidade |
| --- | --- |
| Cabeçalho | Marca, navegação, notificações e menu da conta. |
| Botão | Ações primárias, secundárias e destrutivas, com estados próprios. |
| Campo de formulário | Rótulo, ajuda, validação e mensagem de erro. |
| Campo de pesquisa | Entrada textual e execução explícita da consulta. |
| Filtro | Seleções temporárias, Aplicar, Limpar e fechar. |
| Cartão de material | Metadados pedagógicos, favorito e navegação. |
| Indicador de abordagem | Ícones de atividade plugada/desplugada. |
| Abas | Alternância de seções sem navegação desnecessária. |
| Modal | Confirmações, decisões e ações contextualizadas. |
| Lista de arquivos | Nome, formato, tamanho, acesso e remoção quando aplicável. |
| Aviso de estado | Sucesso, erro, informação, carregamento ou vazio. |
| Cartão de contribuição | Comentário, resposta ou relato com ações permitidas. |
| Indicador de situação | Estado editorial, de publicação ou moderação. |
| Paginação | Navegação entre conjuntos de resultados. |

Todos os componentes interativos precisam contemplar estados de foco, hover, seleção, desabilitação e processamento quando aplicáveis.

## 7. Biblioteca e filtros

### 7.1. Listagem

A Biblioteca apresenta exclusivamente materiais **aprovados e publicados**.

Cada página possui até **12 materiais**, com total de resultados e controles de paginação.

Os cartões devem utilizar os dados reais de cada recurso. Títulos, resumos, etapas e abordagens não podem ser repetidos artificialmente a partir dos exemplos do protótipo.

### 7.2. Cartões de materiais

Cada cartão apresenta:

- Tipo de material.
- Título.
- Resumo.
- Etapa de ensino e ano/série correspondente.
- Indicação visual de abordagem.
- Controle de favorito.
- Acesso aos detalhes.

A apresentação de etapa e ano/série deve ser coerente com a classificação:

- **EI:** Educação Infantil e idade.
- **EF:** Ensino Fundamental e ano.
- **EM:** Ensino Médio e série.

A interface deve escolher uma representação adequada quando o material estiver associado a diferentes anos ou etapas, sem apresentar uma combinação pedagogicamente incorreta.

### 7.3. Ícones de abordagem

A abordagem deve ser identificada nos cartões por ícones:

- **Monitor:** atividade plugada.
- **Monitor riscado:** atividade desplugada.
- **Ambos:** recurso classificado nas duas abordagens.

Não adicionar etiquetas textuais redundantes de abordagem aos cartões.

Os ícones devem ter nome acessível e significado compreensível sem depender exclusivamente da aparência visual.

### 7.4. Busca

A pesquisa considera título e tema/palavras-chave.

A consulta é executada ao selecionar **Buscar** ou pressionar Enter. Digitar no campo não deve, por si só, atualizar os resultados.

A busca deve funcionar em conjunto com os filtros e preservar os critérios em situações sem resultados.

### 7.5. Filtros

A Biblioteca utiliza quatro controles visuais separados:

1. **Tipo**
2. **Etapa**
3. **Eixo**
4. **Abordagem**

O filtro Tipo contém:

- Plano de aula.
- Slides.
- Material de apoio.
- Atividade.
- Sequência didática.
- Jogo.

O filtro Abordagem contém **Plugada** e **Desplugada**.

Cada filtro deve permitir selecionar uma ou mais opções. Seleções da mesma categoria são combinadas por **OU**; categorias diferentes são combinadas por **E**.

**Aplicar** confirma a alteração. **Limpar** remove as seleções da categoria aberta. Fechar sem aplicar preserva a seleção anteriormente confirmada.

Ao alterar os critérios, retornar à primeira página de resultados.

### 7.6. Estados

Prever:

- Listagem com materiais.
- Carregamento.
- Pesquisa sem resultados.
- Acervo sem materiais publicados.
- Falha ao consultar.
- Filtros com opções selecionadas.
- Favorito ativo ou inativo.

A interface deve explicar a diferença entre ausência de correspondências e indisponibilidade técnica.

## 8. Materiais salvos

A área **Salvos** apresenta a coleção pessoal do professor e uma busca por título ou tema.

São previstos:

- Lista de materiais salvos.
- Remoção de favoritos.
- Pesquisa na coleção.
- Coleção vazia.
- Pesquisa sem correspondências.
- Retorno à Biblioteca.

O arquivo de design possui variações isoladas de filtros de Salvos, mas esses controles não fazem parte do fluxo visível atual da página. A implementação inicial deve seguir a busca apresentada na tela principal, sem introduzir novos botões de filtros.

A coleção deve ser persistida por usuário e manter o estado dos favoritos sincronizado com a Biblioteca e os detalhes.

## 9. Detalhes do material e autoria

A página de detalhes apresenta as informações necessárias para o professor avaliar o recurso.

O conteúdo inclui:

- Título e descrição.
- Tipos de material.
- Etapas e anos/séries.
- Eixos da Computação.
- Abordagem plugada/desplugada.
- Objetivos de aprendizagem, quando disponíveis.
- Autoria ou fonte.
- Arquivos vinculados.
- Acesso ao perfil público do autor.
- Discussões e relatos do material.

Os campos opcionais devem ser omitidos ou tratados adequadamente quando não houver informação, sem preencher lacunas com textos fictícios.

### 9.1. Arquivos

Os formatos aceitos no MVP são **PDF, DOCX, PPTX, PNG e JPG**, com limite de **20 MB por arquivo**.

A página de detalhes é pública, mas a obtenção dos arquivos exige autenticação e verificação de autorização.

A interface deve tratar arquivo indisponível, falha de acesso e necessidade de login. O sistema não deve apresentar confirmação de download antes de uma operação válida.

### 9.2. Perfil público

O perfil público do autor apresenta apenas informações autorizadas:

- Nome.
- Foto ou avatar.
- Cargo/função, quando informado.
- Apresentação pública.
- Materiais publicados.

E-mail, credenciais, denúncias e informações internas da conta não devem ser divulgados.

A autoria declarada de um recurso pode ser diferente da conta responsável por submetê-lo.

## 10. Comunidade

A comunidade está integrada à página de detalhes de cada material.

### 10.1. Organização

A área utiliza três opções de filtragem:

- **Todos**
- **Relatos de aplicação**
- **Discussões**

Essas opções são apresentadas **diretamente na página**, sem abrir um pop-up ou desfocar o conteúdo.

A alternância deve atualizar as contribuições exibidas, preservando o contexto do material.

### 10.2. Comentários e respostas

Professores autenticados podem publicar comentários textuais de até **1.000 caracteres**.

As respostas possuem apenas **um nível de encadeamento**. Não estão previstos anexos, curtidas ou mensagens privadas.

O usuário pode editar e excluir suas próprias contribuições. A exclusão deve solicitar confirmação antes de executar a operação.

### 10.3. Relatos de aplicação

Os relatos permitem registrar:

- Ano/série da turma.
- Descrição da experiência.
- Adaptações realizadas, quando houver.

A interface deve orientar o professor a não incluir dados pessoais de estudantes.

### 10.4. Denúncias

A denúncia exige autenticação e indicação de um motivo.

Após o envio, o sistema apresenta confirmação e encaminha o registro para análise. **Denunciar não remove nem oculta o comentário automaticamente.**

A identidade de quem denunciou não deve ser apresentada publicamente.

## 11. Envio de materiais

O formulário permite que professores autenticados contribuam com o acervo.

### 11.1. Dados do formulário

O envio contempla:

- Título.
- Descrição.
- Tema/palavras-chave.
- Um ou mais tipos.
- Uma ou mais etapas.
- Anos/séries compatíveis.
- Um ou mais eixos da Computação.
- Abordagem plugada, desplugada ou ambas.
- Autor ou fonte.
- Objetivos de aprendizagem opcionais.
- Um ou mais arquivos.
- Declaração obrigatória de direitos de compartilhamento.

Os campos devem possuir rótulos, orientações e validações adequadas.

### 11.2. Arquivos e validação

O componente de upload permite selecionar, visualizar e remover arquivos antes do envio.

Validar formato, tamanho e segurança no servidor. Arquivos inválidos e arquivos acima de 20 MB devem gerar mensagens específicas.

Falhas recuperáveis não devem apagar desnecessariamente os demais campos preenchidos.

### 11.3. Conclusão do envio

Após uma submissão válida:

1. O sistema registra o material.
2. Define a situação inicial como **Pendente**.
3. Apresenta confirmação.
4. Oferece acesso a **Meus envios**.

O material não deve aparecer automaticamente na Biblioteca.

## 12. Meus envios e revisão editorial

### 12.1. Meus envios

A área pessoal apresenta as submissões da conta, seus dados e suas situações.

Os estados editoriais principais são:

| Estado | Significado |
| --- | --- |
| Pendente | Submissão aguardando avaliação. |
| Em análise | Avaliação iniciada por um revisor. |
| Aprovado | Material aceito editorialmente. |
| Recusado | Material não aceito, com justificativa. |

A condição **Publicado** representa a disponibilidade do material no acervo público.

Aprovação editorial e publicação devem ser tratadas como informações distintas. Um material aprovado pode ainda não estar publicado; retirar sua disponibilidade pública não exige alterar sua decisão editorial para Recusado.

### 12.2. Revisão de materiais

A área restrita permite:

- Consultar a fila.
- Abrir detalhes da submissão.
- Visualizar metadados e arquivos.
- Iniciar análise.
- Aprovar.
- Recusar.
- Administrar disponibilidade pública conforme as permissões.

A recusa exige justificativa registrada e acessível ao responsável pelo envio.

As decisões precisam conservar responsável, data e resultado. A aplicação deve lidar com alterações concorrentes e falhas de persistência, sem apresentar sucesso indevidamente.

## 13. Moderação de conteúdo

A seção **Revisão e moderação** também reúne as denúncias feitas sobre conteúdos da comunidade.

O revisor autorizado consulta:

- Motivo da denúncia.
- Comentário denunciado.
- Material relacionado.
- Contexto necessário à decisão.
- Situação de tratamento.

As ações previstas são:

| Ação | Comportamento |
| --- | --- |
| Ocultar | Retirar o comentário da visualização pública. |
| Restaurar | Tornar visível um comentário ocultado. |
| Excluir definitivamente | Executar a remoção após confirmação. |

Cada decisão deve registrar responsável, data e motivo, conforme a regra de negócio correspondente.

A implementação deve confirmar operações destrutivas e tratar comentários já removidos, denúncias já analisadas e ausência de permissão.

## 14. Perfil e notificações

### 14.1. Perfil pessoal

O professor pode consultar e alterar os dados autorizados de sua conta, incluindo nome, foto, cargo/função, apresentação e senha.

O campo **Sobre mim** tem referência de até **300 caracteres** no protótipo.

### 14.2. Foto de perfil

O fluxo contempla seleção de arquivo, prévia e confirmação.

A implementação deve:

- Aceitar JPG e PNG.
- Respeitar o limite de 5 MB.
- Mostrar a foto realmente selecionada.
- Permitir escolher outra imagem.
- Salvar somente após validação.
- Apresentar mensagens de sucesso ou erro.

A ilustração de demonstração no Figma não representa uma foto padrão obrigatória para todas as contas.

### 14.3. Notificações

A central comunica:

- Atualizações sobre materiais enviados.
- Novos materiais na Biblioteca.
- Novidades da plataforma.

A interface apresenta indicador de notificações não lidas, lista recente, acesso à lista completa, ação para marcar todas como lidas e estado vazio.

A marcação como lida deve persistir, sem excluir o registro.

## 15. Contato, informações e compartilhamento

### 15.1. Fale conosco

O formulário possui:

- Nome.
- E-mail.
- Assunto.
- Mensagem.

Deve validar entradas, registrar a solicitação e comunicar sucesso ou falha conforme o resultado real.

### 15.2. Páginas institucionais

Termos de uso e Política de privacidade devem ser públicos e acessíveis.

Os conteúdos definitivos precisam refletir a aplicação funcional, suas práticas de tratamento de dados e as responsabilidades das pessoas envolvidas.

### 15.3. Compartilhamento

A interface prevê opções sociais e a ação **Copiar link**.

A cópia deve utilizar o endereço público real da plataforma e comunicar o resultado da operação. Endereços demonstrativos dos frames não devem ser incorporados como URLs definitivas.

## 16. Estados de interface

Os seguintes estados precisam ser contemplados nos componentes e fluxos aplicáveis:

| Estado | Tratamento esperado |
| --- | --- |
| Padrão | Conteúdo e controles disponíveis. |
| Hover | Feedback discreto e coerente com o componente. |
| Foco | Indicação visível para navegação por teclado. |
| Selecionado | Estado ativo identificável visualmente e semanticamente. |
| Desabilitado | Ação indisponível com tratamento compreensível. |
| Carregamento | Operação em andamento sem confirmação antecipada. |
| Sucesso | Mensagem após conclusão real da operação. |
| Erro de validação | Orientação específica junto ao campo. |
| Erro de serviço | Explicação e possibilidade de nova tentativa quando aplicável. |
| Vazio | Mensagem própria para ausência de conteúdo. |
| Confirmação | Revisão das consequências antes de ações destrutivas. |

Os estados não devem depender apenas da cor e precisam manter a navegação acessível.

O desenvolvimento deve utilizar os estados visuais do protótipo como referência, complementando o comportamento necessário para que os fluxos funcionem com dados reais.

## 17. Responsividade

A composição desktop será implementada primeiro.

A adaptação para tablet e celular deve preservar as funcionalidades do MVP, reorganizando o layout quando necessário.

Pontos prioritários:

- Cabeçalho e navegação.
- Grade de cartões.
- Busca e filtros independentes.
- Detalhes e acesso aos arquivos.
- Abas e contribuições da comunidade.
- Formulários extensos e seleção múltipla.
- Filas e decisões de revisão.
- Diálogos e confirmações.

Não reduzir elementos proporcionalmente de forma indiscriminada. A organização deve considerar legibilidade, áreas de toque, fluxo de leitura e disponibilidade de espaço.

Os breakpoints e os detalhes de composição responsiva serão definidos e verificados durante a implementação, utilizando as referências do Figma.

## 18. Acessibilidade

A implementação deverá adotar a **WCAG 2.2 AA** como referência.

Aspectos prioritários:

- Estrutura semântica de títulos, listas, formulários e regiões.
- Navegação completa por teclado.
- Foco visível e ordem lógica de navegação.
- Contraste adequado.
- Rótulos associados a campos.
- Mensagens de erro compreensíveis e anunciáveis.
- Nomes acessíveis para controles representados apenas por ícones.
- Estados que não dependam exclusivamente de cor.
- Diálogos com gerenciamento apropriado de foco.
- Controles utilizáveis em dispositivos móveis.
- Compatibilidade com tecnologias assistivas.

Os ícones de abordagem plugada e desplugada merecem atenção específica: seu significado precisa estar disponível também para leitores de tela.

## 19. Integração com dados e serviços

O design não determina uma arquitetura técnica específica, mas exige que as interfaces sejam conectadas a serviços capazes de executar suas operações.

As principais entidades funcionais são:

| Entidade | Responsabilidade |
| --- | --- |
| Usuário | Autenticação, dados pessoais e permissões. |
| Perfil público | Informações autorizadas de apresentação. |
| Material | Conteúdo pedagógico e metadados. |
| Arquivo | Documento vinculado, armazenamento e autorização. |
| Favorito | Relação entre usuário e material salvo. |
| Submissão | Envio e acompanhamento do material. |
| Decisão editorial | Resultado e rastreabilidade da avaliação. |
| Comentário | Contribuição textual vinculada ao material. |
| Resposta | Contribuição associada a comentário. |
| Relato de aplicação | Experiência pedagógica compartilhada. |
| Denúncia | Registro de conteúdo reportado. |
| Decisão de moderação | Medida aplicada e seu responsável. |
| Notificação | Aviso pessoal e situação de leitura. |
| Mensagem de contato | Solicitação recebida pela plataforma. |

A modelagem física e os contratos de API deverão ser definidos na etapa técnica, respeitando as regras de negócio documentadas.

As telas devem reagir às respostas reais desses serviços. Dados simulados podem ser utilizados durante o desenvolvimento, mas não devem permanecer como fonte definitiva de conteúdo ou estado.

## 20. Verificações antes da entrega

### Identidade e interface

- [ ] Marca, cores e tipografia seguem os fundamentos do Figma.
- [ ] Cabeçalho e componentes compartilhados mantêm consistência entre telas.
- [ ] Cartões apresentam conteúdos e classificações próprios de cada material.
- [ ] Ícones de abordagem e indicação de etapa/ano estão corretos.
- [ ] Diálogos utilizam os efeitos visuais e estados previstos.

### Navegação e comportamento

- [ ] A logo direciona ao Início.
- [ ] Busca e filtros funcionam com resultados reais.
- [ ] Biblioteca e Salvos preservam seus respectivos contextos.
- [ ] Acesso aos arquivos verifica autenticação.
- [ ] Discussões alternam conteúdo na própria página.
- [ ] Comentários, respostas, relatos e denúncias persistem corretamente.
- [ ] Formulário de envio valida dados e arquivos.
- [ ] Revisão e moderação respeitam permissões e registram decisões.
- [ ] Perfil, notificações, contato e compartilhamento executam suas operações.

### Qualidade

- [ ] Estados de carregamento, vazio, sucesso e erro foram implementados.
- [ ] Operações destrutivas possuem confirmação adequada.
- [ ] Não existem ações visuais sem tratamento funcional previsto.
- [ ] Informações privadas não aparecem em áreas públicas.
- [ ] Fluxos foram verificados em desktop, tablet e celular.
- [ ] Navegação por teclado e acessibilidade foram avaliadas.
- [ ] Testes funcionais, de integração e de segurança foram executados.

Os itens só deverão ser marcados como concluídos após verificação na aplicação, não apenas pela existência dos respectivos frames.

## 21. Decisões técnicas pendentes

Antes e durante a implementação, deverão ser definidos:

- Framework, arquitetura, autenticação e serviços.
- Estrutura de dados e contratos de API.
- Estratégia de armazenamento e proteção dos arquivos.
- Limites adicionais e validações dos formulários.
- Ordenação padrão da Biblioteca e parâmetros de navegação.
- Modelagem de ajustes, reenvios e publicação de materiais.
- Proteção contra spam e política de retenção de denúncias.
- Serviço e política de entrega de notificações.
- Breakpoints responsivos e metas de desempenho.
- Estratégia de testes e implantação.

Essas definições deverão complementar os documentos existentes sem introduzir funcionalidades fora do escopo aprovado.

## 22. Documentação relacionada

**Produto**

- [Product Brief](../product/product-brief.md)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Histórias de usuário](../product/historias-de-usuario.md)
- [Backlog](../product/backlog.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [Especificação de metadados](../product/especificacao-metadados.md)

**UX/UI**

- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [Fluxos de usuário](user-flow.md)
- [Design System](design-system.md)
