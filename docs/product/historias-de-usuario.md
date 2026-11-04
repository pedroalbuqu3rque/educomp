# EduComp — Histórias de Usuário

**Versão:** 0.5  
**Data:** 04/11/2026  
**Status:** Histórias da primeira versão funcional em consolidação; desenvolvimento não iniciado.

## 1. Objetivo

Este documento apresenta as histórias de usuário do EduComp e seus critérios de aceitação, descrevendo necessidades e comportamentos esperados na primeira versão funcional da plataforma.

As histórias orientam o detalhamento das funcionalidades, a organização do backlog e a elaboração de testes. Os critérios apresentados ainda não foram executados ou validados com professores reais.

## 2. Convenções

Cada história contém:

- **Identificador (US):** referência estável para rastreabilidade.
- **História:** necessidade apresentada na estrutura “Como [pessoa], quero [ação], para [benefício]”.
- **Critérios de aceitação:** comportamentos observáveis que permitem verificar a entrega.
- **Requisitos relacionados:** ligação com `requisitos.md`.

Os identificadores permitem relacionar cada história aos requisitos e às atividades de desenvolvimento. Decisões pendentes são registradas sem serem tratadas como comportamentos já definidos.

## 3. Histórias de usuário

### 3.1. Entrada e gestão da conta

#### US-018 — Conhecer a plataforma e acessar as áreas principais

**História**

Como pessoa interessada em materiais pedagógicos de Computação, quero conhecer a proposta do EduComp e encontrar os caminhos de acesso à plataforma, para decidir como começar a utilizá-la.

**Critérios de aceitação**

- [ ] A página inicial apresenta a finalidade do EduComp de maneira compreensível.
- [ ] A página inicial oferece caminhos identificáveis para Biblioteca, entrada e criação de conta.
- [ ] As ações de navegação conduzem às páginas correspondentes.
- [ ] Caso uma ação exija autenticação, o sistema informa essa condição e orienta o acesso.

**Requisito relacionado:** RF-020.

#### US-014 — Criar uma conta

**História**

Como professor interessado na plataforma, quero criar uma conta com meus dados, para utilizar funcionalidades associadas ao meu perfil.

**Critérios de aceitação**

- [ ] O formulário solicita nome completo, e-mail e senha.
- [ ] Campos obrigatórios, e-mail inválido e demais dados inconsistentes recebem mensagens de validação.
- [ ] Não é possível registrar duas contas com o mesmo e-mail.
- [ ] Um cadastro válido é concluído com confirmação identificável.
- [ ] Uma falha de cadastro é informada sem indicar sucesso indevidamente.

**Requisito relacionado:** RF-015.

**Pendente:** confirmar exigência de e-mail institucional e política de senha.

#### US-015 — Entrar e sair da plataforma

**História**

Como professor cadastrado, quero acessar minha conta e encerrar minha sessão, para utilizar minhas informações e funcionalidades pessoais com segurança.

**Critérios de aceitação**

- [ ] O professor pode informar e-mail e senha para entrar.
- [ ] Credenciais válidas iniciam uma sessão e permitem acessar áreas autorizadas.
- [ ] Credenciais incorretas apresentam mensagem clara, sem iniciar sessão.
- [ ] A operação de entrada apresenta feedback enquanto estiver em processamento.
- [ ] O professor pode sair pelo menu de perfil.
- [ ] Após sair, ações que dependam de autenticação exigem nova entrada.

**Requisito relacionado:** RF-016.

#### US-016 — Recuperar o acesso à conta

**História**

Como professor que esqueceu sua senha, quero solicitar a redefinição por e-mail, para recuperar o acesso à minha conta.

**Critérios de aceitação**

- [ ] A tela permite informar um e-mail e solicitar instruções de recuperação.
- [ ] O formato do e-mail é validado antes do envio da solicitação.
- [ ] O sistema informa o resultado da solicitação de maneira compreensível.
- [ ] Um link de recuperação válido permite cadastrar uma nova senha.
- [ ] Links inválidos ou expirados não permitem concluir a redefinição e apresentam orientação adequada.
- [ ] A tela oferece um caminho de volta para a entrada.

**Requisito relacionado:** RF-017.

**Pendente:** definir validade do link e comunicação para e-mails não cadastrados.

#### US-017 — Consultar e atualizar o perfil

**História**

Como professor autenticado, quero consultar e atualizar meus dados de perfil, para manter minhas informações corretas.

**Critérios de aceitação**

- [ ] O professor consegue visualizar seus dados de perfil cadastrados.
- [ ] Pode alterar os dados pessoais permitidos, a foto de perfil e a senha.
- [ ] Alterações inválidas são identificadas antes de serem salvas.
- [ ] A conclusão ou falha de uma atualização é comunicada claramente.
- [ ] Alterações concluídas persistem após nova entrada na plataforma.
- [ ] Um professor não pode modificar o perfil de outra pessoa sem autorização.

**Requisito relacionado:** RF-018.

### 3.2. Descoberta de materiais

#### US-001 — Visualizar a Biblioteca de materiais

**História**

Como professor que procura recursos pedagógicos, quero visualizar os materiais disponíveis na Biblioteca, para conhecer opções relacionadas às minhas aulas.

**Critérios de aceitação**

- [ ] A Biblioteca apresenta materiais publicados e disponíveis para consulta, sem exibir submissões não aprovadas como publicadas.
- [ ] Cada item apresenta título e informações resumidas disponíveis para sua identificação.
- [ ] É possível abrir os detalhes de um material a partir da listagem.
- [ ] A Biblioteca informa quando está carregando seus resultados.
- [ ] Se não houver materiais publicados, apresenta um estado vazio diferente daquele usado para uma pesquisa sem correspondências.
- [ ] A navegação entre resultados permite consultar materiais além do primeiro conjunto exibido, por paginação ou carregamento progressivo.

**Requisitos relacionados:** RF-001 e RF-005.

#### US-002 — Pesquisar materiais por palavras-chave

**História**

Como professor que procura um recurso para determinado assunto, quero pesquisar por título ou tema, para encontrar materiais relacionados ao que pretendo ensinar.

**Critérios de aceitação**

- [ ] A Biblioteca oferece um campo para informar uma palavra ou expressão de busca.
- [ ] O sistema consulta os dados de título e tema dos materiais publicados, de acordo com as regras de correspondência definidas.
- [ ] A pesquisa pode ser combinada com os filtros ativos.
- [ ] O professor pode alterar ou limpar a pesquisa e realizar outra consulta sem perder indevidamente os filtros já aplicados.
- [ ] Uma busca sem correspondências apresenta mensagem apropriada e permite revisar a consulta.
- [ ] Consultas equivalentes produzem resultados em uma ordem consistente, considerando os mesmos dados e critérios.
- [ ] Respostas antigas não substituem os resultados de uma pesquisa mais recente.

**Requisitos relacionados:** RF-002, RF-003, RF-005 e RNF-011.

**Pendente:** especificar o campo tema, as regras de correspondência, a relevância e os critérios de desempate.

#### US-003 — Filtrar materiais

**História**

Como professor que procura recursos adequados ao contexto da aula, quero combinar filtros por tipo de material, etapa de ensino e eixo da Computação, para refinar os resultados da Biblioteca.

**Critérios de aceitação**

- [ ] Existem filtros por **tipo de material**, **etapa de ensino** e **eixo da Computação**.
- [ ] As opções de tipo são: Plano de aula, Slides, Material de apoio, Atividade e Sequência didática.
- [ ] As etapas apresentadas são: Educação Infantil, Ensino Fundamental — Anos iniciais, Ensino Fundamental — Anos finais e Ensino Médio.
- [ ] Os eixos são: Pensamento Computacional, Mundo Digital e Cultura Digital.
- [ ] O professor pode selecionar múltiplas opções em cada categoria.
- [ ] Opções da mesma categoria combinam-se por **OU**; categorias diferentes e texto pesquisado combinam-se por **E**.
- [ ] As alterações podem ser realizadas no filtro antes de acionar **Aplicar**, que atualiza a listagem.
- [ ] A ação **Limpar** permite retirar seleções do filtro conforme a regra de confirmação definida.
- [ ] Ao reabrir um filtro, as seleções efetivamente aplicadas são preservadas e apresentadas.
- [ ] Se a combinação não encontrar materiais, a Biblioteca apresenta mensagem de ausência de correspondências, sem confundir essa situação com acervo vazio.

**Requisitos relacionados:** RF-004 e RF-005.

**Pendente:** definir o efeito de fechar sem aplicar, o alcance de Limpar e o tratamento das opções sem resultados.

### 3.3. Detalhes e acesso ao conteúdo

#### US-004 — Consultar detalhes de um material

**História**

Como professor interessado em um recurso, quero consultar seus detalhes, para avaliar inicialmente se ele atende à minha necessidade pedagógica.

**Critérios de aceitação**

- [ ] A tela de detalhes identifica o material por título e descrição.
- [ ] São apresentadas as classificações cadastradas de tipo de material, etapa de ensino e eixo da Computação.
- [ ] Autoria e outros metadados são exibidos quando existirem e forem pertinentes.
- [ ] A ausência de um campo opcional não é confundida com ausência do material.
- [ ] As ações de acesso e de favoritar refletem a disponibilidade do recurso e as permissões do usuário.

**Requisito relacionado:** RF-006.

**Pendente:** concluir a definição dos metadados obrigatórios e opcionais e de sua multiplicidade.

#### US-005 — Acessar um material por link externo

**História**

Como professor que encontrou um recurso com endereço externo cadastrado, quero abrir sua fonte de acesso, para consultar o conteúdo disponibilizado fora da plataforma.

**Critérios de aceitação**

- [ ] Quando a utilização de links externos estiver habilitada e houver endereço disponível, uma ação identificável permite abri-lo.
- [ ] A ação conduz ao endereço associado ao material.
- [ ] O acesso à fonte externa é distinguido da navegação pela página de detalhes.
- [ ] Um material sem link cadastrado não apresenta ação para um endereço inexistente.
- [ ] Falhas identificáveis recebem o tratamento previsto para acesso aos recursos.

**Requisitos relacionados:** RF-007, RF-009 e RF-010.

**Pendente:** confirmar se links externos integrarão as formas de acesso da primeira versão e se um material poderá conter mais de um link.

#### US-006 — Acessar arquivo hospedado na plataforma

**História**

Como professor que encontrou um material com arquivo disponível, quero acessá-lo, para consultar ou utilizar o recurso.

**Critérios de aceitação**

- [ ] Quando houver arquivo hospedado e permitido, o sistema apresenta uma ação clara para acessá-lo.
- [ ] A ação corresponde ao arquivo efetivamente associado ao material.
- [ ] Arquivos inexistentes ou sem autorização não são apresentados como acessíveis.
- [ ] Uma falha identificável é comunicada ao professor.

**Requisitos relacionados:** RF-008, RF-009 e RF-010.

**Pendente:** definir formatos, limites de tamanho e quantidade de arquivos por material.

#### US-007 — Identificar as formas de acesso disponíveis

**História**

Como professor que consulta um material, quero distinguir as formas de acesso realmente disponíveis, para escolher como chegar ao conteúdo.

**Critérios de aceitação**

- [ ] O sistema apresenta uma ação de acesso ao arquivo quando esse recurso existir e estiver permitido.
- [ ] Se links externos forem admitidos, apresenta a ação correspondente quando houver endereço cadastrado.
- [ ] Se ambas as formas forem admitidas e estiverem disponíveis, nenhuma é ocultada indevidamente.
- [ ] Quando não houver acesso permitido, a interface apresenta a indisponibilidade sem sugerir que o material desapareceu da Biblioteca.
- [ ] Não são mostradas ações para recursos inexistentes ou sem permissão.

**Requisito relacionado:** RF-009.

#### US-008 — Receber informações sobre falhas de acesso

**História**

Como professor que tenta acessar um recurso, quero receber uma explicação quando o acesso falhar, para compreender a situação e saber como proceder.

**Critérios de aceitação**

- [ ] Uma falha de acesso identificável produz mensagem compreensível.
- [ ] A interface diferencia, quando possível, recurso indisponível, inexistente e sem permissão.
- [ ] O sistema não declara que um endereço externo falhou quando não puder verificar essa condição.
- [ ] Uma falha de acesso não é confundida com remoção do material da Biblioteca.
- [ ] Há orientação ou nova tentativa quando isso for tecnicamente possível.

**Requisito relacionado:** RF-010.

### 3.4. Organização pessoal

#### US-010 — Favoritar e consultar materiais salvos

**História**

Como professor autenticado, quero salvar materiais de interesse e consultá-los posteriormente, para retomar recursos sem precisar procurá-los novamente.

**Critérios de aceitação**

- [ ] O professor consegue favoritar e desfavoritar um material a partir das áreas em que a ação estiver disponível.
- [ ] A lista de Salvos apresenta os materiais associados à sua conta.
- [ ] Cada material aparece no máximo uma vez na lista do mesmo professor.
- [ ] Ao remover um favorito, a lista é atualizada.
- [ ] É possível abrir os detalhes de um material salvo.
- [ ] A lista persiste entre sessões e apresenta um estado vazio quando não houver favoritos.
- [ ] Uma pessoa não pode alterar os favoritos de outra conta sem autorização.

**Requisito relacionado:** RF-012.

### 3.5. Envio e revisão de materiais

#### US-009 — Enviar material para revisão

**História**

Como professor autorizado a contribuir, quero preencher as informações de um material e enviar um arquivo, para submetê-lo à análise e possível inclusão na Biblioteca.

**Critérios de aceitação**

- [ ] O formulário permite informar os dados requeridos e selecionar um arquivo para envio.
- [ ] Os campos obrigatórios e o arquivo são validados antes de concluir a submissão.
- [ ] O envio apresenta feedback de progresso, sucesso ou falha.
- [ ] Um envio concluído gera um registro identificável, associado ao professor.
- [ ] O sistema confirma o recebimento e informa a situação inicial do envio.
- [ ] O material não aparece como publicado na Biblioteca antes de ser aprovado.

**Requisitos relacionados:** RF-011 e RN-001.

**Pendente:** definir campos obrigatórios, formatos e limites de upload, condições de direitos de uso e situação inicial definitiva.

#### US-013 — Acompanhar a situação dos materiais enviados

**História**

Como professor que enviou um material, quero consultar o andamento da submissão, para saber se ela está aguardando análise, foi aprovada ou foi recusada.

**Critérios de aceitação**

- [ ] O professor consegue identificar suas submissões e consultar a situação de cada uma.
- [ ] As situações registradas pelo processo de revisão são refletidas na consulta do autor.
- [ ] Um professor não consulta submissões privadas de outra pessoa sem autorização.
- [ ] A interface apresenta uma indicação clara caso ainda não existam envios realizados.
- [ ] Alterações de situação persistem e não provocam publicação automática de materiais não aprovados.

**Requisito relacionado:** RF-019.

**Pendente:** confirmar as transições e o detalhamento dos estados Pendente, Em análise, Aprovado e Recusado.

#### US-012 — Revisar e decidir sobre materiais enviados

**História**

Como responsável autorizado pela moderação, quero analisar materiais enviados e registrar sua aprovação ou recusa, para controlar o que passa a integrar o acervo publicado.

**Critérios de aceitação**

- [ ] O responsável autorizado consegue identificar os envios que aguardam decisão.
- [ ] É possível consultar os dados necessários para avaliar uma submissão.
- [ ] A decisão de aprovar ou recusar é registrada e associada ao material.
- [ ] Somente materiais aprovados passam a aparecer na Biblioteca como publicados.
- [ ] Materiais pendentes, em análise ou recusados não são apresentados como publicados.
- [ ] Usuários sem autorização não podem aprovar nem recusar materiais.
- [ ] O autor pode consultar a situação atualizada de sua submissão.

**Requisitos relacionados:** RF-014, RF-019 e RN-001.

**Pendente:** definir papéis, critérios de aprovação, justificativa de recusa, possibilidade de reenvio e interface mínima de revisão.

### 3.6. Compartilhamento básico

#### US-011 — Copiar link compartilhável

**História**

Como pessoa que deseja indicar um recurso ou a plataforma, quero copiar um link compartilhável, para enviá-lo por um canal de minha escolha.

**Critérios de aceitação**

- [ ] Há uma ação identificável para copiar o link no contexto definido para compartilhamento.
- [ ] O endereço copiado é válido para o destino especificado.
- [ ] O sistema confirma quando o link é copiado e informa eventuais falhas.
- [ ] O destinatário que abrir o link está sujeito às regras normais de acesso da plataforma.

**Requisito relacionado:** RF-013.

**Pendente:** definir se o link aponta para a plataforma, os detalhes de um material ou ambos.

## 4. Matriz de rastreabilidade

| História | Requisitos relacionados |
|---|---|
| US-001 — Visualizar Biblioteca | RF-001, RF-005 |
| US-002 — Pesquisar materiais | RF-002, RF-003, RF-005, RNF-011 |
| US-003 — Filtrar materiais | RF-004, RF-005 |
| US-004 — Consultar detalhes | RF-006 |
| US-005 — Acessar link externo | RF-007, RF-009, RF-010 |
| US-006 — Acessar arquivo hospedado | RF-008, RF-009, RF-010 |
| US-007 — Identificar formas de acesso | RF-009 |
| US-008 — Tratar falhas de acesso | RF-010 |
| US-009 — Enviar material | RF-011, RN-001 |
| US-010 — Favoritar e consultar Salvos | RF-012 |
| US-011 — Copiar link | RF-013 |
| US-012 — Revisar submissões | RF-014, RF-019, RN-001 |
| US-013 — Acompanhar submissões | RF-019 |
| US-014 — Criar conta | RF-015 |
| US-015 — Entrar e sair | RF-016 |
| US-016 — Recuperar senha | RF-017 |
| US-017 — Atualizar perfil | RF-018 |
| US-018 — Conhecer a plataforma | RF-020 |

## 5. Condições para preparação dos testes

Antes de transformar estas histórias em cenários definitivos de teste, devem ser detalhados os pontos que condicionam seus resultados, especialmente:

- Regras de acesso para visitantes e usuários autenticados, cadastro e recuperação de senha.
- Campos e classificações dos materiais, incluindo a representação de tema.
- Regras de correspondência, ordenação e desempate da busca.
- Comportamento de Aplicar, Limpar e fechamento dos filtros.
- Formas de acesso aceitas, limites e validações dos arquivos.
- Permissões, transições de status e critérios de moderação.
- Destino dos links compartilháveis.
- Critérios mensuráveis de acessibilidade, responsividade e desempenho.

Os critérios de aceitação não comprovam a implementação ou a qualidade da aplicação. A conclusão das histórias deverá ser registrada posteriormente com evidências de desenvolvimento e teste.

## 6. Documentos relacionados

- [`product-brief.md`](product-brief.md) — visão do produto e proposta de valor.
- [`escopo-mvp.md`](escopo-mvp.md) — limites e funcionalidades da primeira versão.
- [`requisitos.md`](requisitos.md) — requisitos funcionais, regras de negócio e requisitos não funcionais.
- [`backlog.md`](backlog.md) — organização e priorização do trabalho.
- [`../ux-ui/arquitetura-da-informacao.md`](../ux-ui/arquitetura-da-informacao.md) — estrutura de navegação.
- [`../ux-ui/user-flow.md`](../ux-ui/user-flow.md) — fluxos de interação.
