# EduComp — Escopo do MVP

**Versão:** 1.4 — proposta para validação  
**Data:** 06/11/2026  
**Situação:** escopo da primeira versão funcional em consolidação; desenvolvimento não iniciado.

## 1. Visão do MVP

O EduComp é uma plataforma para professores da Educação Básica descobrirem, consultarem, organizarem e compartilharem materiais pedagógicos relacionados à Computação.

O Produto Mínimo Viável (MVP) tem como foco disponibilizar uma experiência funcional de **descoberta e acesso a materiais**, complementada por **favoritos pessoais** e **contribuição de materiais submetidos à revisão**.

A primeira versão deve permitir percorrer esses fluxos com dados persistentes e operações reais, não apenas demonstrá-los em uma interface.

A proposta parte da hipótese de que uma biblioteca organizada, com pesquisa, filtros e informações claras, pode facilitar a localização de recursos pedagógicos. Essa hipótese ainda não foi validada com professores reais.

### 1.1. Estratégia de desenvolvimento

A implementação será iniciada pela **versão desktop**, utilizando o protótipo do Figma como referência de interface.

Essa escolha define a sequência de desenvolvimento e facilita a construção inicial dos componentes, fluxos e integrações.

A prioridade desktop não altera as funcionalidades previstas para o MVP nem elimina os requisitos de responsividade e acessibilidade. A adaptação para tablet e dispositivos móveis será realizada posteriormente, antes da conclusão da primeira versão funcional.

O [handoff de UI/UX](../ux-ui/handoff.md) orienta a implementação visual desktop. As regras de negócio permanecem definidas nos documentos de produto.

## 2. Público e necessidades atendidas

**Público prioritário:** professores da Educação Básica que procuram materiais para o ensino de Computação.

O MVP deve permitir que o professor:

- Encontre materiais relacionados a temas, etapas de ensino e eixos da Computação.
- Consulte informações suficientes para avaliar inicialmente a pertinência de um recurso.
- Acesse o material disponibilizado ou compreenda quando ele estiver indisponível.
- Guarde materiais de interesse em uma lista pessoal.
- Envie materiais para possível inclusão no acervo, acompanhando a situação da submissão.

A operação do acervo também exige um **responsável autorizado pela revisão dos envios**.

Essa função faz parte do MVP, embora a interface administrativa correspondente ainda precise ser especificada.

## 3. Funcionalidades incluídas

### 3.1. Acesso e conta

- Página inicial com apresentação da plataforma e acesso às principais áreas.
- Criação de conta com nome, e-mail e senha.
- Entrada com e-mail e senha, gerenciamento de sessão e saída segura.
- Recuperação de senha por fluxo seguro.
- Tratamento de campos inválidos, credenciais incorretas e falhas de autenticação.

A obrigatoriedade de e-mail institucional e as regras de acesso para visitantes ainda precisam ser definidas.

A integração de autenticação com Google, representada no protótipo, não faz parte desta primeira versão.

### 3.2. Biblioteca e descoberta

- Listagem dos materiais aprovados e disponíveis para consulta.
- Pesquisa textual por **título e tema**.
- Filtros combinados por **tipo de material**, **etapa de ensino** e **eixo da Computação**.
- Seleção múltipla nos filtros, com ações de aplicar e limpar.
- Preservação das opções aplicadas ao reabrir cada filtro.
- Atualização dos resultados conforme a pesquisa e os filtros.
- Paginação ou carregamento progressivo para navegação pelo acervo.
- Estados de carregamento, resultados vazios e falha de consulta.

As opções previstas para os filtros da primeira versão são:

| Categoria | Opções |
| --- | --- |
| Tipo de material | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| Etapa de ensino | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| Eixo da Computação | Pensamento Computacional; Mundo Digital; Cultura Digital |

Os filtros permitem múltiplas seleções. As opções de uma mesma categoria são combinadas por **OU**, enquanto categorias diferentes e pesquisa textual são combinadas por **E**.

O comportamento detalhado está documentado na [Especificação de busca e filtros](especificacao-busca-filtros.md).

A abrangência definitiva da taxonomia de cadastro e as regras para outras modalidades ou subdivisões educacionais ainda precisam ser confirmadas.

### 3.3. Detalhes e acesso ao material

- Página de detalhes com título, descrição e metadados do recurso.
- Identificação do tipo de material, da etapa de ensino e do eixo da Computação.
- Identificação de autoria e demais informações cadastradas pertinentes à consulta.
- Acesso ao arquivo ou recurso disponibilizado, respeitando as permissões aplicáveis.
- Orientação clara quando o conteúdo estiver indisponível ou não puder ser acessado.
- Possibilidade de favoritar ou desfavoritar o material.

A forma definitiva de disponibilização — arquivo hospedado, link externo ou ambos — será detalhada na especificação funcional.

O protótipo também apresenta comentários, relatos de aplicação, respostas e denúncias associados aos materiais.

Essas interações representam possibilidades de evolução do EduComp, mas **não integram os compromissos funcionais do MVP atual**.

A primeira versão deve priorizar a apresentação das informações pedagógicas, o acesso ao recurso e o gerenciamento de favoritos.

### 3.4. Materiais salvos

- Marcar e desmarcar materiais como favoritos.
- Consultar a lista pessoal de materiais salvos.
- Acessar os detalhes a partir dessa lista.
- Manter os favoritos associados à conta e disponíveis em sessões futuras.
- Exibir um estado vazio quando não houver materiais salvos.
- Refletir as alterações da coleção nas interfaces pertinentes.

A lista de Salvos é pessoal e não corresponde a um sistema de coleções personalizadas.

### 3.5. Envio e revisão de materiais

- Formulário de submissão de materiais com informações descritivas e envio de arquivo.
- Validação de campos obrigatórios e dos arquivos enviados.
- Feedback de progresso, sucesso e falha do envio.
- Registro da submissão para revisão, **sem publicação automática**.
- Consulta pelo autor à situação do material enviado.
- Ação de aprovar ou recusar restrita a um responsável autorizado.
- Publicação no acervo somente após aprovação.

Os estados previstos para detalhamento são:

| Estado | Significado |
| --- | --- |
| Pendente | Material recebido e aguardando avaliação |
| Em análise | Material em processo de revisão |
| Aprovado | Material autorizado para publicação |
| Recusado | Material não aprovado para publicação |

Os critérios de revisão, a definição final dos estados, os limites de arquivos e as transições permitidas ainda dependem de especificação.

**Interface de moderação**

O MVP exige uma interface mínima para que o responsável autorizado consulte as submissões e registre decisões de aprovação ou recusa.

Essa interface ainda não possui referência visual definitiva no Figma e deverá ser especificada antes da implementação.

O escopo inicial não exige um painel administrativo completo, com relatórios, métricas ou ferramentas avançadas de gestão.

### 3.6. Perfil do professor

- Consulta dos dados da conta.
- Atualização de informações pessoais e foto de perfil.
- Alteração de senha.
- Confirmação das alterações realizadas e tratamento de falhas.
- Persistência dos dados atualizados.

O tratamento de informações pessoais deve respeitar as regras de privacidade e segurança definidas para a aplicação.

A apresentação de dados em um perfil público, conforme explorada no protótipo, depende de definição específica e não amplia automaticamente os requisitos desta primeira versão.

### 3.7. Compartilhamento básico

- Ação para copiar um link compartilhável.
- Confirmação da cópia e tratamento de eventual falha.

O destino do link — página da plataforma ou detalhes de um material — precisa ser definido antes da implementação.

Integrações específicas com redes sociais não fazem parte do escopo inicial.

## 4. Regras de negócio essenciais

1. **Envio não é publicação:** materiais submetidos passam por revisão antes de aparecerem como itens publicados no acervo.
2. **Publicação controlada:** apenas usuários com permissão adequada podem aprovar ou recusar materiais.
3. **Favoritos pessoais:** cada favorito pertence a um usuário; o mesmo material não deve ser duplicado na lista dessa pessoa.
4. **Persistência:** contas, materiais, situações dos envios, favoritos e alterações de perfil devem permanecer armazenados de forma consistente.
5. **Pesquisa e filtros combináveis:** o professor pode refinar a Biblioteca utilizando mais de uma categoria e recuperar as seleções aplicadas.
6. **Acesso coerente:** um material deve apresentar somente as opções de acesso efetivamente disponíveis e permitidas.
7. **Feedback de interface:** ações relevantes devem informar carregamento, conclusão, ausência de dados ou erro, conforme o caso.
8. **Autorização efetiva:** a disponibilidade visual de uma ação não substitui a verificação das permissões necessárias para executá-la.
9. **Dados consistentes:** alterações confirmadas devem ser refletidas nas interfaces relacionadas, sem apresentar resultados fictícios ou antecipar a conclusão de operações.

## 5. Fora do escopo da primeira versão

Não fazem parte dos compromissos funcionais do MVP:

- Criar, editar ou adaptar conteúdos pedagógicos diretamente na plataforma.
- Pré-visualizar arquivos em um visualizador integrado.
- Criar coleções personalizadas além da lista de favoritos.
- Compartilhar coleções ou colaborar em tempo real.
- Recomendar materiais automaticamente por perfil ou comportamento.
- Integração de login com Google.
- Compartilhamento integrado por canais específicos, como WhatsApp, Facebook, LinkedIn ou Instagram.
- Central completa de notificações, contador de não lidas e histórico de notificações.
- Comentários, respostas, relatos de aplicação e denúncias na área de materiais.
- Funcionalidades administrativas avançadas além do necessário para revisar e publicar materiais.

O protótipo do Figma apresenta parte dessas funcionalidades para demonstrar possíveis evoluções da experiência.

A existência dessas referências visuais não determina sua implementação no MVP.

As páginas e recursos institucionais explorados no protótipo, como formulário de contato, termos de uso e política de privacidade, deverão ser tratados conforme as necessidades funcionais, legais e de disponibilização da plataforma. Não constituem, neste momento, fluxos centrais de validação da proposta de valor.

A exclusão de uma funcionalidade do MVP não impede sua inclusão em versões posteriores, mediante nova decisão de escopo.

## 6. Etapas de implementação

A execução será organizada de forma incremental, preservando o escopo funcional definido neste documento.

### 6.1. Primeira etapa — Desktop

A primeira etapa prioriza a construção e a integração das interfaces desktop.

As atividades previstas incluem:

- Preparação da arquitetura e da estrutura do projeto.
- Implementação dos fundamentos visuais e componentes compartilhados.
- Construção das páginas públicas e internas.
- Implementação dos fluxos previstos para o MVP.
- Integração com serviços e dados persistentes.
- Tratamento dos estados de carregamento, validação, sucesso e erro.
- Verificação funcional e visual dos fluxos desktop.

A sequência das funcionalidades e suas dependências serão organizadas no [Backlog](backlog.md).

**A conclusão da etapa desktop não equivale à conclusão do MVP.**

Ela representa um marco de desenvolvimento, sujeito a verificação própria, antes das adaptações e testes necessários para a primeira versão funcional completa.

### 6.2. Segunda etapa — Responsividade e consolidação

Após a implementação desktop, o trabalho deverá contemplar:

- Adaptação da navegação e dos componentes para tablet e dispositivos móveis.
- Ajustes de layout conforme as referências responsivas do Figma.
- Verificação da legibilidade e da utilização em diferentes tamanhos de tela.
- Testes de navegação por teclado e acessibilidade.
- Correção de falhas identificadas nas integrações e nos fluxos.
- Verificação final dos critérios de conclusão do MVP.

O desenvolvimento poderá antecipar ajustes responsivos quando forem necessários à estrutura dos componentes.

A divisão em etapas não impede testes e melhorias contínuas durante a implementação.

## 7. Critérios de conclusão do MVP

A primeira versão funcional poderá ser considerada pronta para verificação quando os seguintes cenários forem executáveis:

- [ ] O professor consegue criar uma conta, entrar, recuperar o acesso e encerrar sua sessão.
- [ ] A Biblioteca apresenta materiais aprovados e permite buscar e combinar os três grupos de filtros.
- [ ] O professor abre detalhes, consulta metadados e acessa um recurso disponível.
- [ ] O professor salva um material, encontra-o em Salvos e pode removê-lo; as alterações persistem entre sessões.
- [ ] O professor envia um material válido e recebe uma confirmação com situação consultável.
- [ ] Um responsável autorizado revisa a submissão; um material não aprovado não é publicado na Biblioteca.
- [ ] O professor consulta e atualiza seus dados de perfil.
- [ ] O compartilhamento básico fornece um link utilizável e informa o resultado da ação.
- [ ] As principais telas apresentam estados de carregamento, vazio e erro.
- [ ] Os fluxos funcionais são acessíveis por teclado e apresentam feedback adequado.
- [ ] A aplicação oferece funcionamento responsivo nos tamanhos de tela previstos.
- [ ] As funcionalidades incluídas operam com dados persistentes e serviços reais, conforme as necessidades de cada fluxo.

Esses critérios são **condições de entrega**, não resultados de testes já realizados.

A verificação deverá considerar os requisitos funcionais e não funcionais, os critérios de aceite das histórias de usuário e os cenários de teste definidos para o projeto.

A aprovação visual da versão desktop, isoladamente, não será suficiente para considerar o MVP concluído.

## 8. Decisões pendentes antes da implementação

| Tema | Decisão necessária |
| --- | --- |
| Acesso | Definir o que visitantes podem consultar, quando o login é obrigatório e a política de e-mail institucional. |
| Autenticação | Confirmar política de senha, sessões e recuperação de acesso. |
| Metadados | Determinar campos obrigatórios, multiplicidade de classificações e taxonomias definitivas de cadastro. |
| Pesquisa | Detalhar correspondência de termos, ordenação e comportamento de consultas com múltiplas palavras. |
| Resultados | Definir paginação ou carregamento progressivo. |
| Arquivos | Definir formatos aceitos, limites, armazenamento, validação e medidas de segurança. |
| Moderação | Definir papéis, permissões, critérios de aprovação e recusa, estados finais e interface mínima do responsável. |
| Acesso ao recurso | Confirmar regras para arquivos, links externos e indisponibilidade de conteúdo. |
| Compartilhamento | Definir qual URL será copiada e as condições de acesso por esse link. |
| Privacidade e conta | Definir regras de tratamento de dados pessoais, recuperação de senha e alteração de foto. |
| Responsividade | Consolidar critérios de adaptação e verificação conforme as referências do Figma. |
| Tecnologia | Definir stack, arquitetura, persistência, integrações e ambiente de disponibilização. |

As decisões deverão ser registradas nos documentos correspondentes antes de serem tratadas como regras fechadas de implementação.

Pendências específicas não devem impedir o avanço de componentes e funcionalidades que já possuem definições suficientes.

## 9. Limites desta versão

O MVP aqui descrito é um **escopo de produto planejado**, não um sistema já desenvolvido ou validado com usuários.

Os fluxos e as interfaces do Figma demonstram a experiência pretendida, mas não comprovam a existência de funcionalidades implementadas.

A escolha das funcionalidades deverá ser confirmada antes da abertura das tarefas correspondentes e poderá ser ajustada de forma explícita, preservando o histórico das decisões.

A prioridade de desenvolvimento desktop organiza o trabalho técnico sem modificar os compromissos da primeira versão funcional.

Mudanças de escopo deverão ser refletidas nos requisitos, nas histórias de usuário e no backlog, evitando diferenças entre o planejamento e a implementação.

## 10. Documentos relacionados

- [Product Brief](product-brief.md) — visão e proposta de valor.
- [Requisitos](requisitos.md) — requisitos funcionais e não funcionais.
- [Histórias de usuário](historias-de-usuario.md) — necessidades e critérios de aceitação.
- [Backlog](backlog.md) — organização das entregas e dependências.
- [Especificação de busca e filtros](especificacao-busca-filtros.md) — comportamento da pesquisa e dos filtros.
- [Especificação de metadados](especificacao-metadados.md) — classificação e informações dos recursos.
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md) — organização da navegação.
- [User Flow](../ux-ui/user-flow.md) — fluxos de uso.
- [Design System](../ux-ui/design-system.md) — padrões visuais e componentes.
- [Handoff de UI/UX](../ux-ui/handoff.md) — referência de implementação desktop.
