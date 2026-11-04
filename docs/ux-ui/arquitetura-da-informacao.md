# EduComp — Arquitetura da Informação

**Versão:** 0.6  
**Data:** 04/11/2026  
**Situação:** Arquitetura proposta para a primeira versão funcional; desenvolvimento não iniciado.

## 1. Objetivo

Definir a organização das áreas, dos conteúdos e dos caminhos de navegação do EduComp, de modo que professores da Educação Básica consigam descobrir materiais pedagógicos de Computação, consultar seus detalhes, acessar recursos disponíveis, salvar referências e contribuir com o acervo.

Este documento descreve **onde as informações e ações devem estar disponíveis e como se relacionam**. As regras detalhadas de pesquisa, campos, validações e permissões são tratadas nas especificações funcionais. A arquitetura ainda não foi validada com professores reais.

## 2. Princípios de organização

- **Encontrabilidade:** a Biblioteca é o principal ponto de descoberta de materiais; pesquisa, filtros e resultados devem permanecer próximos no contexto de uso.
- **Clareza de destino:** cada opção de navegação deve identificar o conteúdo ou a ação que será aberta.
- **Organização por tarefa:** explorar, salvar, enviar e gerenciar a conta devem ser atividades reconhecíveis, sem exigir que o usuário conheça a estrutura interna do sistema.
- **Continuidade:** ao consultar detalhes e retornar à Biblioteca, os critérios de busca e filtros aplicados devem ser preservados durante a navegação.
- **Separação entre consulta e contribuição:** materiais publicados fazem parte da Biblioteca; materiais enviados para revisão pertencem ao fluxo de submissão até serem aprovados.
- **Acesso contextual:** ações dependentes de conta ou permissão devem ser identificadas e protegidas, sem apresentar conteúdo restrito como público.
- **Representação fiel:** informações e possibilidades de acesso devem corresponder aos dados efetivamente cadastrados.

## 3. Áreas da plataforma

### 3.1. Apresentação e acesso

**Início** é a entrada institucional do EduComp. Apresenta a finalidade da plataforma e oferece caminhos para explorar a Biblioteca e acessar as funcionalidades de conta.

O conjunto de acesso compreende:

- **Entrar:** autenticação com e-mail e senha.
- **Criar conta:** cadastro de professor.
- **Recuperar senha:** solicitação de redefinição do acesso.

A página inicial e as telas de autenticação não são conteúdos do acervo. O que visitantes poderão consultar sem entrar na plataforma permanece pendente de definição.

### 3.2. Descoberta e consulta

**Biblioteca** é a área central para encontrar materiais publicados. Reúne pesquisa, filtros, resultados e acesso aos detalhes.

**Detalhes do material** apresenta as informações de um recurso específico, suas classificações, autoria ou fonte quando cadastrada e opções de acesso permitidas. Também pode oferecer a ação de salvar o material.

Resultados de pesquisa, filtros aplicados e ausência de correspondências são **estados da Biblioteca**, e não páginas independentes.

### 3.3. Área do professor

A área associada à conta contempla:

- **Salvos:** materiais favoritados, com acesso aos respectivos detalhes e opção de removê-los da lista.
- **Enviar material:** formulário de contribuição de recursos para revisão.
- **Acompanhamento dos envios:** consulta à situação das submissões realizadas pelo professor; sua posição definitiva na navegação ainda deve ser definida.
- **Meu perfil:** consulta e edição de informações da conta, foto e senha.

Essas funcionalidades dependem de identificação do usuário e de permissões compatíveis com a ação realizada.

### 3.4. Revisão do acervo

A publicação de materiais enviados exige uma **área de revisão**, restrita a responsáveis autorizados, para consultar submissões e registrar aprovação ou recusa.

Essa área é uma necessidade funcional da primeira versão, mas sua organização visual, os pontos de entrada e os papéis de acesso ainda não foram definidos. Ela não deve ser apresentada como uma tela já concluída.

## 4. Mapa de navegação

O mapa abaixo representa a **hierarquia lógica de conteúdos e tarefas**. Ele não determina URLs, componentes nem se cada destino será implementado como página, painel ou sobreposição.

```text
EduComp
├── Início
│   ├── Acessar Biblioteca
│   └── Acesso à conta
│       ├── Entrar
│       ├── Criar conta
│       └── Recuperar senha
│
├── Biblioteca
│   ├── Pesquisa textual
│   ├── Filtros
│   │   ├── Tipo de material
│   │   ├── Etapa de ensino
│   │   └── Eixo da Computação
│   ├── Lista de materiais publicados
│   └── Detalhes do material
│       ├── Informações e classificações
│       ├── Acesso ao recurso disponível
│       ├── Salvar ou remover dos favoritos
│       └── Compartilhar link
│
└── Área do professor (acesso autenticado)
    ├── Salvos
    │   └── Detalhes do material
    ├── Enviar material
    ├── Acompanhar envios (posição a definir)
    └── Meu perfil

Operação do acervo (acesso autorizado; estrutura a definir)
└── Revisar submissões
    ├── Consultar material enviado
    └── Aprovar ou recusar
```

A navegação pode oferecer acessos diretos entre áreas, sem obrigar o usuário a percorrer toda a hierarquia a cada tarefa. Os menus da Biblioteca, de Salvos e do perfil são mecanismos de acesso a esses destinos, não novos níveis de conteúdo.

## 5. Inventário de conteúdos e destinos

| Área ou destino | Conteúdo principal | Ações ou saídas |
|---|---|---|
| **Início** | Apresentação da plataforma | Abrir Biblioteca, Entrar, Criar conta |
| **Entrar** | E-mail, senha e orientação de acesso | Autenticar, Criar conta, Recuperar senha, fechar ou retornar |
| **Criar conta** | Dados básicos de cadastro | Criar conta, Entrar, fechar ou retornar |
| **Recuperar senha** | Solicitação de redefinição por e-mail | Enviar instruções, voltar a Entrar |
| **Biblioteca** | Pesquisa, filtros e lista de materiais publicados | Consultar detalhes, favoritar quando permitido, acessar Salvos e outras áreas |
| **Detalhes do material** | Descrição, classificações, informações complementares e recursos disponíveis | Acessar recurso, favoritar, compartilhar link, voltar |
| **Salvos** | Lista pessoal de materiais favoritados | Consultar detalhes, desfavoritar, navegar para outras áreas |
| **Enviar material** | Campos de submissão e seleção de arquivo | Validar, enviar e consultar confirmação |
| **Acompanhar envios** | Submissões do usuário e suas situações | Consultar status; localização e ações adicionais a definir |
| **Meu perfil** | Dados pessoais e opções de conta | Editar informações, foto e senha; salvar alterações |
| **Revisão de materiais** | Envios que exigem análise | Consultar submissões, aprovar ou recusar; estrutura a definir |

O formulário de redefinição efetiva de senha por link seguro também deverá ser contemplado na implementação, embora sua apresentação e seu destino de navegação ainda necessitem de especificação.

## 6. Navegação e elementos auxiliares

### 6.1. Navegação principal

Os rótulos de referência para as áreas são **Início**, **Biblioteca**, **Salvos**, **Enviar material** e **Meu perfil**. As formas de acesso podem variar conforme o contexto e a largura de tela, mas não devem mudar o significado desses destinos.

A Biblioteca funciona como ponto de retorno para a descoberta de novos materiais. Os links entre Salvos e Detalhes permitem retomar recursos sem refazer a pesquisa.

### 6.2. Menus contextuais

- **Menu da Biblioteca:** disponibiliza caminhos para as áreas pertinentes do produto.
- **Menu de Salvos:** reúne opções de navegação relacionadas à área; suas apresentações compacta e completa representam variações de interface, não conteúdos diferentes.
- **Menu do perfil:** reúne acesso a Meu perfil e ação de sair da plataforma.

Os destinos e a forma de fechamento de cada menu devem ser consistentes. Sair deve encerrar a sessão antes de redirecionar o usuário para a área pública definida.

### 6.3. Sobreposições

Os filtros por tipo, etapa e eixo, o menu do perfil e a interface de compartilhamento podem ser apresentados como sobreposições. Esses elementos devem manter relação clara com a página que os originou e oferecer fechamento compreensível.

As opções de filtros são controles da Biblioteca. A janela de **Compartilhar** é uma ação contextual: no MVP, a função prevista é copiar um link e apresentar o resultado da ação. O destino exato desse link ainda precisa ser definido.

### 6.4. Contexto e retorno

- Ao abrir os detalhes a partir da Biblioteca e retornar, devem continuar disponíveis o termo de pesquisa e os filtros aplicados.
- Ao abrir os detalhes a partir de Salvos e retornar, o usuário deve conseguir voltar à sua lista pessoal.
- Ações protegidas devem informar a necessidade de autenticação, sem executar operações em nome de visitantes.
- O comportamento após cadastro, login, recuperação de senha e submissão deve indicar claramente o próximo destino, ainda que os redirecionamentos finais precisem ser confirmados.

A preservação da posição exata de rolagem e do estado após recarregar a página depende de definição específica.

## 7. Organização dos materiais na Biblioteca

### 7.1. Lista de materiais

Cada item da Biblioteca deve oferecer informações suficientes para reconhecer o recurso e decidir pela abertura dos detalhes. O conjunto visual de informações do cartão será definido no design system e nas telas de interface, utilizando apenas dados existentes.

A listagem não deve incluir submissões pendentes, em análise ou recusadas como materiais publicados.

### 7.2. Detalhes do material

As informações são organizadas em grupos:

1. **Identificação:** título e descrição.
2. **Classificação:** tipo de material, etapa de ensino, eixo da Computação e tema, conforme os dados cadastrados.
3. **Autoria e informações complementares:** autoria ou fonte e outros metadados disponíveis.
4. **Acesso:** arquivo ou outra forma de acesso efetivamente permitida.
5. **Ações contextuais:** favoritar/desfavoritar e compartilhar, conforme disponibilidade e permissões.

A interface não deve inventar informações ausentes nem oferecer controles para recursos inexistentes. A lista definitiva de campos, sua obrigatoriedade e as formas de acesso serão estabelecidas na especificação de metadados.

### 7.3. Organização da pesquisa e dos filtros

A pesquisa textual consulta **título e tema**. A Biblioteca oferece três grupos de filtros:

| Grupo | Opções disponíveis |
|---|---|
| **Tipo de material** | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| **Etapa de ensino** | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| **Eixo da Computação** | Pensamento Computacional; Mundo Digital; Cultura Digital |

As categorias oferecem seleção múltipla. O usuário pode editar as opções e confirmar a aplicação; ao reabrir um filtro, as seleções aplicadas devem permanecer reconhecíveis. O comportamento detalhado de **Aplicar**, **Limpar**, fechamento sem aplicar e combinação de critérios pertence à especificação de busca e filtros.

As classificações disponíveis na interface de pesquisa não devem ser confundidas com a definição completa dos metadados permitidos no cadastro, cuja abrangência ainda será confirmada.

## 8. Acesso e visibilidade das informações

| Conteúdo ou ação | Regra de acesso prevista |
|---|---|
| Apresentação inicial | Disponível sem autenticação |
| Biblioteca e detalhes | Definir o alcance da consulta por visitantes |
| Criação de conta, entrada e recuperação de senha | Disponíveis a pessoas que precisam acessar a conta |
| Favoritar e consultar Salvos | Dependem da conta do professor |
| Enviar material e acompanhar os próprios envios | Dependem de autenticação e permissão adequada |
| Consultar e editar Meu perfil | Restrito ao titular da conta, conforme autorizações aplicáveis |
| Revisar, aprovar ou recusar submissões | Restrito aos responsáveis autorizados |

O sistema deve distinguir **material publicado**, **submissão privada** e **dados pessoais**. A definição dos papéis, das operações autorizadas e do acesso a recursos protegidos será detalhada nos requisitos e na preparação técnica.

## 9. Estados de conteúdo e feedback

Estados não constituem novos destinos da arquitetura, mas precisam estar previstos em cada contexto.

| Contexto | Estados a contemplar |
|---|---|
| **Biblioteca** | Carregando, materiais disponíveis, acervo vazio, consulta sem resultados, falha ao carregar |
| **Detalhes e acesso** | Material disponível, recurso indisponível, acesso sem permissão, falha identificável |
| **Salvos** | Lista com favoritos, lista vazia, falha ao carregar ou alterar |
| **Autenticação e conta** | Validação, processamento, sucesso, erro de credenciais ou atualização |
| **Envio de material** | Formulário incompleto, validação, progresso, envio concluído, falha |
| **Acompanhamento e revisão** | Situação registrada, ausência de envios, atualização de estado ou falha |
| **Compartilhamento** | Link copiado ou falha na cópia |

As mensagens devem explicar o estado sem confundir ausência de resultados, falha de carregamento e indisponibilidade de um arquivo. Cada estado deve oferecer uma saída ou orientação quando aplicável.

## 10. Funcionalidades previstas para evolução

A interface projetada também contempla referências a **notificações**, **entrada com Google** e **compartilhamento por redes sociais**. Esses recursos não integram a primeira versão funcional definida para implementação.

- **Notificações:** sua futura posição na arquitetura, histórico e estados de leitura dependerão de especificação própria.
- **Google:** eventual autenticação externa não altera as áreas fundamentais de conteúdo, mas exigirá revisão dos fluxos de entrada e cadastro.
- **Canais sociais:** podem ampliar a ação de compartilhar após a definição do destino do link e das integrações previstas.

Esses elementos não devem ser apresentados como serviços funcionais na primeira entrega apenas por existirem visualmente no protótipo.

## 11. Decisões pendentes de arquitetura

| Tema | Decisão necessária |
|---|---|
| **Acesso de visitantes** | Quais conteúdos da Biblioteca e dos detalhes podem ser consultados sem entrar. |
| **Navegação após autenticação** | Destinos após login, cadastro e recuperação, inclusive retorno a ações protegidas. |
| **Acompanhamento de envios** | Se será uma área própria, seção do perfil ou parte de Enviar material. |
| **Moderação** | Ponto de entrada e organização da área restrita aos responsáveis pela revisão. |
| **Compartilhamento** | Se o link copiado aponta para a plataforma, para um material ou para ambos os contextos. |
| **Detalhes** | Quais metadados aparecem em cada bloco e como representar campos opcionais ausentes. |
| **Acesso aos recursos** | Arquivos hospedados, links externos ou ambos, conforme definição de produto. |
| **Navegação responsiva** | Distribuição dos menus, filtros e ações em telas menores, sem perda de destinos. |
| **Continuidade de contexto** | Preservação de rolagem, filtros e pesquisa após retorno, recarregamento ou autenticação. |

Essas decisões devem ser resolvidas antes de encerrar a especificação dos fluxos correspondentes. A arquitetura proposta poderá ser refinada durante testes de navegação e usabilidade com professores.

## 12. Documentos relacionados

- [`../product/product-brief.md`](../product/product-brief.md) — visão e proposta de valor do produto.
- [`../product/escopo-mvp.md`](../product/escopo-mvp.md) — funcionalidades e limites da primeira versão.
- [`../product/requisitos.md`](../product/requisitos.md) — requisitos e regras de negócio.
- [`../product/historias-de-usuario.md`](../product/historias-de-usuario.md) — necessidades e critérios de aceitação.
- [`../product/especificacao-busca-filtros.md`](../product/especificacao-busca-filtros.md) — comportamento da descoberta.
- [`../product/especificacao-metadados.md`](../product/especificacao-metadados.md) — informações e classificações dos materiais.
- [`objetivos-de-ux.md`](objetivos-de-ux.md) — objetivos de experiência.
- [`user-flow.md`](user-flow.md) — percursos de navegação e estados de interação.
- [`design-system.md`](design-system.md) — componentes e padrões visuais.

A arquitetura descreve a organização da experiência planejada. Seu registro não equivale a implementação nem a validação de usabilidade já realizada.
