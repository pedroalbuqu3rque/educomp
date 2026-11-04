# EduComp — Escopo do MVP

**Versão:** 1.3 — proposta para validação  
**Data:** 04/11/2026  
**Situação:** escopo da primeira versão funcional em consolidação; desenvolvimento não iniciado.

## 1. Visão do MVP

O EduComp é uma plataforma para professores da Educação Básica descobrirem, consultarem, organizarem e compartilharem materiais pedagógicos relacionados à Computação.

O Produto Mínimo Viável (MVP) tem como foco disponibilizar uma experiência funcional de **descoberta e acesso a materiais**, complementada por **favoritos pessoais** e **contribuição de materiais submetidos à revisão**. A primeira versão deve permitir percorrer esses fluxos com dados persistentes, e não apenas demonstrá-los em uma interface.

A proposta parte da hipótese de que uma biblioteca organizada, com pesquisa, filtros e informações claras, pode facilitar a localização de recursos pedagógicos. Essa hipótese ainda não foi validada com professores reais.

## 2. Público e necessidades atendidas

**Público prioritário:** professores da Educação Básica que procuram materiais para o ensino de Computação.

O MVP deve permitir que o professor:

- Encontre materiais relacionados a temas, etapas de ensino e eixos da Computação.
- Consulte informações suficientes para avaliar inicialmente a pertinência de um recurso.
- Acesse o material disponibilizado ou compreenda quando ele estiver indisponível.
- Guarde materiais de interesse em uma lista pessoal.
- Envie materiais para possível inclusão no acervo, acompanhando a situação da submissão.

A operação do acervo também exige um **responsável autorizado pela revisão dos envios**. O formato da interface e os critérios dessa revisão ainda precisam ser definidos.

## 3. Funcionalidades incluídas

### 3.1. Acesso e conta

- Página inicial com apresentação da plataforma e acesso às principais áreas.
- Criação de conta com nome, e-mail e senha.
- Entrada com e-mail e senha, gerenciamento de sessão e saída segura.
- Recuperação de senha por fluxo seguro.
- Tratamento de campos inválidos, credenciais incorretas e falhas de autenticação.

A obrigatoriedade de e-mail institucional e as regras de acesso para visitantes ainda precisam ser definidas.

### 3.2. Biblioteca e descoberta

- Listagem dos materiais disponíveis para consulta.
- Pesquisa textual por **título e tema**.
- Filtros combinados por **tipo de material**, **etapa de ensino** e **eixo da Computação**.
- Seleção múltipla nos filtros, com ações de aplicar e limpar e preservação das opções aplicadas ao reabrir cada filtro.
- Atualização dos resultados conforme a pesquisa e os filtros.
- Paginação ou carregamento progressivo para navegação pelo acervo.
- Estados de carregamento, resultados vazios e falha de consulta.

As opções previstas para os filtros da primeira versão são:

| Categoria | Opções |
|---|---|
| Tipo de material | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| Etapa de ensino | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| Eixo da Computação | Pensamento Computacional; Mundo Digital; Cultura Digital |

Essas opções definem a experiência de filtragem prevista para a primeira entrega. A abrangência definitiva da taxonomia de cadastro e as regras para outras modalidades ou subdivisões educacionais precisam ser confirmadas.

### 3.3. Detalhes e acesso ao material

- Página de detalhes com título, descrição e metadados do recurso.
- Identificação do tipo de material, da etapa de ensino e do eixo da Computação.
- Identificação de autoria e demais informações cadastradas que forem pertinentes à consulta.
- Acesso ao arquivo ou recurso disponibilizado, respeitando as permissões aplicáveis.
- Orientação clara quando o conteúdo estiver indisponível ou não puder ser acessado.
- Possibilidade de favoritar ou desfavoritar o material.

A forma definitiva de disponibilização — arquivo hospedado, link externo ou ambos — será detalhada na especificação funcional.

### 3.4. Materiais salvos

- Marcar e desmarcar materiais como favoritos.
- Consultar a lista pessoal de materiais salvos.
- Acessar os detalhes a partir dessa lista.
- Manter os favoritos associados à conta e disponíveis em sessões futuras.
- Exibir um estado vazio quando não houver materiais salvos.

### 3.5. Envio e revisão de materiais

- Formulário de submissão de materiais com informações descritivas e envio de arquivo.
- Validação de campos obrigatórios e dos arquivos enviados.
- Feedback de progresso, sucesso e falha do envio.
- Registro da submissão para revisão, **sem publicação automática**.
- Consulta pelo autor à situação do material enviado.
- Ação de aprovar ou recusar restrita a um responsável autorizado.
- Publicação no acervo somente após aprovação.

Os estados previstos para detalhamento são **Pendente**, **Em análise**, **Aprovado** e **Recusado**. Os critérios de revisão, a definição final dos estados, os limites de arquivos e a experiência de moderação ainda dependem de especificação.

### 3.6. Perfil do professor

- Consulta dos dados da conta.
- Atualização de informações pessoais e foto de perfil.
- Alteração de senha.
- Confirmação das alterações realizadas e tratamento de falhas.
- Persistência dos dados atualizados.

### 3.7. Compartilhamento básico

- Ação para copiar um link compartilhável.
- Confirmação ao copiar e tratamento de eventual falha.

O destino do link — página da plataforma ou detalhes de um material — precisa ser definido antes da implementação. Integrações específicas com redes sociais não fazem parte deste escopo inicial.

## 4. Regras de negócio essenciais

1. **Envio não é publicação:** materiais submetidos passam por revisão antes de aparecerem como itens publicados no acervo.
2. **Publicação controlada:** apenas usuários com permissão adequada podem aprovar ou recusar materiais.
3. **Favoritos pessoais:** cada favorito pertence a um usuário; o mesmo material não deve ser duplicado na lista dessa pessoa.
4. **Persistência:** contas, materiais, situação dos envios, favoritos e alterações de perfil devem permanecer armazenados de forma consistente.
5. **Pesquisa e filtros combináveis:** o professor pode refinar a Biblioteca utilizando mais de uma categoria e recuperar as seleções aplicadas.
6. **Acesso coerente:** um material deve apresentar somente as opções de acesso efetivamente disponíveis e permitidas.
7. **Feedback de interface:** ações relevantes devem informar carregamento, conclusão, ausência de dados ou erro, conforme o caso.

## 5. Fora do escopo da primeira versão

- Criar, editar ou adaptar conteúdos pedagógicos diretamente na plataforma.
- Pré-visualizar arquivos em um visualizador integrado.
- Criar coleções personalizadas além da lista de favoritos.
- Compartilhar coleções ou colaborar em tempo real.
- Recomendar materiais automaticamente por perfil ou comportamento.
- Integração de login com Google.
- Compartilhamento integrado por canais específicos, como WhatsApp, Facebook, LinkedIn ou Instagram.
- Central completa de notificações, contador de não lidas e histórico de notificações.
- Funcionalidades administrativas avançadas além do necessário para revisar e publicar materiais.

A exclusão desses itens do MVP não impede sua inclusão em versões posteriores.

## 6. Critérios de conclusão do MVP

A primeira versão funcional poderá ser considerada pronta para verificação quando os seguintes cenários forem executáveis:

- [ ] O professor consegue criar uma conta, entrar, recuperar o acesso e encerrar sua sessão.
- [ ] A Biblioteca apresenta materiais aprovados e permite buscar e combinar os três grupos de filtros.
- [ ] O professor abre detalhes, consulta metadados e acessa um recurso disponível.
- [ ] O professor salva um material, encontra-o em Salvos e pode removê-lo; as alterações persistem entre sessões.
- [ ] O professor envia um material válido e recebe uma confirmação com situação consultável.
- [ ] Um responsável autorizado revisa a submissão; um material não aprovado não é publicado na Biblioteca.
- [ ] O professor consulta e atualiza seus dados de perfil.
- [ ] O compartilhamento básico fornece um link utilizável e informa o resultado da ação.
- [ ] As principais telas apresentam estados de carregamento, vazio e erro, além de funcionamento responsivo e navegação acessível por teclado.

Esses critérios são **condições funcionais de entrega**, não resultados de testes já realizados. A verificação e o registro de evidências ocorrerão durante o desenvolvimento e o QA.

## 7. Decisões pendentes antes da implementação

| Tema | Decisão necessária |
|---|---|
| Acesso | Definir o que visitantes podem consultar e quando o login é obrigatório; decidir a política de e-mail institucional. |
| Metadados | Determinar campos obrigatórios, multiplicidade de classificações e taxonomias definitivas de cadastro. |
| Pesquisa | Detalhar correspondência de termos, ordenação e combinação de valores dentro de cada filtro. |
| Arquivos | Definir formatos aceitos, limites, armazenamento, validação e medidas de segurança. |
| Moderação | Definir papéis, permissões, critérios de aprovação e recusa, estados finais e interface mínima do responsável. |
| Acesso ao recurso | Confirmar regras para arquivos, links externos e indisponibilidade de conteúdo. |
| Compartilhamento | Definir qual URL será copiada e as condições de acesso por esse link. |
| Privacidade e conta | Definir regras de tratamento de dados pessoais, recuperação de senha e alteração de foto. |

As decisões acima devem ser resolvidas nos documentos de requisitos e especificação funcional antes de serem tratadas como regras fechadas de implementação.

## 8. Limites desta versão

O MVP aqui descrito é um **escopo de produto planejado**, não um sistema já desenvolvido ou validado com usuários. A escolha das funcionalidades deverá ser confirmada antes da abertura das tarefas de implementação e poderá ser ajustada de forma explícita, preservando o histórico das decisões.
