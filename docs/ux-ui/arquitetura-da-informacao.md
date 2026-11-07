# EduComp — Arquitetura da Informação

**Versão:** 0.7  
**Data:** 07/11/2026  
**Situação:** arquitetura proposta para o MVP; desenvolvimento e validação com usuários não iniciados.

## 1. Objetivo

Este documento define a organização das áreas, dos conteúdos e dos caminhos de navegação do EduComp.

A arquitetura busca facilitar o acesso aos materiais pedagógicos de Computação, permitindo que professores encontrem recursos, consultem suas informações, organizem favoritos e contribuam com o acervo.

Também contempla a separação entre os materiais publicados e as submissões que dependem de revisão.

O foco está em **como as informações são agrupadas, onde podem ser encontradas e como as áreas da plataforma se relacionam**.

Os comportamentos detalhados pertencem ao [User Flow](user-flow.md), enquanto as regras funcionais, os metadados e as permissões são definidos na documentação de produto.

A arquitetura descrita ainda não foi validada com professores reais.

### 1.1. Referências

- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Histórias de usuário](../product/historias-de-usuario.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)
- [Handoff de UI/UX](handoff.md)
- [Protótipo desktop — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)

## 2. Princípios de organização

A arquitetura do EduComp considera os seguintes princípios:

- **Encontrabilidade:** a Biblioteca concentra a descoberta de materiais, mantendo pesquisa, filtros e resultados no mesmo contexto.
- **Clareza:** os nomes das áreas e das ações devem indicar seus destinos de maneira compreensível.
- **Organização por tarefas:** consultar, salvar, enviar e gerenciar a conta devem ser atividades facilmente reconhecíveis.
- **Continuidade:** a navegação deve permitir consultar detalhes e retornar ao contexto anterior sem perder desnecessariamente os critérios utilizados.
- **Consistência:** áreas relacionadas devem compartilhar padrões de navegação e apresentação.
- **Separação de responsabilidades:** a consulta ao acervo, a contribuição de materiais e a revisão de submissões possuem finalidades e permissões diferentes.
- **Acesso contextual:** conteúdos e ações restritos devem respeitar as condições de autenticação e autorização.
- **Correspondência com os dados:** as informações apresentadas devem refletir os materiais e registros existentes, sem depender de exemplos fixos do protótipo.

A estrutura deve favorecer a realização das tarefas centrais sem exigir que o professor conheça a organização interna do sistema.

## 3. Áreas da plataforma

### 3.1. Apresentação e acesso

**Início**

É a entrada de apresentação do EduComp. Reúne a proposta da plataforma, informações sobre o acervo e caminhos para as principais atividades.

Os destinos de destaque são:

- Biblioteca.
- Entrar.
- Criar conta.

**Autenticação**

A área de acesso contempla:

- **Entrar:** autenticação por e-mail e senha.
- **Criar conta:** cadastro do professor.
- **Recuperar senha:** solicitação de redefinição do acesso.
- **Redefinir senha:** definição de nova senha por meio do mecanismo de recuperação.

As etapas de confirmação, validação e erro pertencem aos respectivos fluxos, não constituindo necessariamente destinos independentes na navegação principal.

O acesso à Biblioteca e aos detalhes por visitantes ainda depende de decisão funcional.

### 3.2. Descoberta e consulta

**Biblioteca**

É a área central de consulta aos materiais pedagógicos.

Reúne:

- Pesquisa textual.
- Filtros de classificação.
- Lista de materiais publicados.
- Quantidade de resultados.
- Navegação pelos resultados.
- Acesso aos detalhes.

A Biblioteca apresenta somente materiais aprovados e disponibilizados conforme as regras de publicação e acesso.

**Detalhes do material**

Apresenta as informações de um recurso específico, incluindo sua identificação, descrição, classificações pedagógicas, autoria ou fonte e formas de acesso disponíveis.

Também concentra ações contextuais, como:

- Acessar o recurso.
- Salvar ou remover dos favoritos.
- Copiar link compartilhável.
- Retornar à origem da navegação.

A página de detalhes pode ser acessada a partir da Biblioteca ou de Salvos. Essas entradas devem conduzir à mesma representação do material, preservando a possibilidade de retorno ao contexto de origem.

### 3.3. Área do professor

Reúne as funcionalidades associadas à conta autenticada.

**Salvos**

Apresenta a coleção pessoal de materiais favoritados.

O professor pode consultar os recursos armazenados, abrir detalhes e remover favoritos.

A lista é vinculada à conta e não representa um sistema de coleções personalizadas.

**Enviar material**

Reúne a contribuição de recursos pedagógicos para avaliação.

O formulário apresenta os campos necessários ao cadastro e ao envio do arquivo.

A submissão deve ser registrada para revisão, sem publicação automática.

**Meus envios**

Permite acompanhar os materiais submetidos pelo professor e consultar suas situações de avaliação.

No protótipo desktop, **Enviar material** e **Meus envios** são apresentados como abas de uma mesma área.

Essa organização será utilizada como referência para a implementação inicial, sem determinar que os dois conteúdos precisem compartilhar a mesma rota técnica.

**Meu perfil**

Reúne informações da conta e ações de gerenciamento pessoal.

Inclui:

- Consulta dos dados cadastrados.
- Atualização de informações pessoais.
- Alteração de foto, quando aplicável.
- Alteração de senha.
- Saída da plataforma, acessível pelo menu de conta.

As opções disponíveis devem corresponder às permissões e regras definidas para o professor.

### 3.4. Área de revisão de materiais

A revisão é uma atividade distinta da contribuição.

Materiais enviados devem ser analisados por um responsável autorizado antes de sua publicação no acervo.

A área de revisão deverá permitir:

- Consultar submissões que aguardam avaliação.
- Selecionar um material enviado.
- Consultar seus dados e recursos.
- Registrar aprovação ou recusa.
- Visualizar a situação atualizada e o resultado da operação.

Essa área integra as necessidades funcionais do MVP, mas ainda não possui interface visual definitiva no Figma.

Seu ponto de entrada, a organização das informações e os controles específicos deverão ser estabelecidos antes da implementação.

A navegação de revisão deve ser disponibilizada apenas aos usuários autorizados. A proteção das operações precisa ser aplicada também pelos serviços da aplicação.

## 4. Mapa de navegação

O mapa apresenta a organização lógica das áreas e dos conteúdos.

Não estabelece URLs definitivas, nomes de componentes nem a necessidade de criar uma página independente para cada item.

```text
EduComp
│
├── Início
│   ├── Acessar Biblioteca
│   └── Acesso à conta
│       ├── Entrar
│       ├── Criar conta
│       └── Recuperar senha
│           └── Redefinir senha
│
├── Biblioteca
│   ├── Pesquisa textual
│   ├── Filtros
│   │   ├── Tipo de material
│   │   ├── Etapa de ensino
│   │   └── Eixo da Computação
│   ├── Resultados
│   └── Detalhes do material
│       ├── Informações pedagógicas
│       ├── Autoria e fonte
│       ├── Acesso ao recurso
│       ├── Salvar ou remover dos favoritos
│       └── Copiar link
│
├── Área do professor
│   ├── Salvos
│   │   └── Detalhes do material
│   ├── Enviar material
│   │   ├── Formulário de envio
│   │   └── Meus envios
│   │       └── Situação da submissão
│   └── Meu perfil
│       ├── Informações da conta
│       ├── Editar perfil
│       ├── Alterar foto
│       └── Alterar senha
│
└── Área de revisão (acesso autorizado)
    ├── Submissões para avaliação
    ├── Detalhes da submissão
    └── Decisão de revisão
        ├── Aprovar
        └── Recusar
```

A Biblioteca, os detalhes e as demais áreas poderão ter acessos diretos ou cruzados, conforme as permissões.

A hierarquia representa o agrupamento das informações, e não a obrigação de percorrer todos os níveis para alcançar um destino.

Por exemplo, um professor poderá abrir os detalhes diretamente a partir de Salvos, sem retornar primeiro à Biblioteca.

Da mesma forma, o responsável autorizado poderá acessar sua área de revisão por um caminho restrito, sem que ela precise aparecer na navegação principal de todos os professores.

## 5. Inventário de conteúdos e destinos

| Área ou destino | Conteúdo principal | Ações e destinos relacionados |
| --- | --- | --- |
| **Início** | Apresentação da plataforma | Biblioteca, Entrar, Criar conta |
| **Entrar** | Formulário de autenticação | Acessar conta, Criar conta, Recuperar senha |
| **Criar conta** | Formulário de cadastro | Concluir cadastro, Entrar |
| **Recuperar senha** | Solicitação de redefinição | Enviar instruções, voltar a Entrar |
| **Redefinir senha** | Formulário de nova senha | Confirmar alteração, retornar ao acesso |
| **Biblioteca** | Pesquisa, filtros e materiais publicados | Abrir detalhes, consultar resultados, acessar áreas permitidas |
| **Detalhes do material** | Descrição, classificações, autoria e recursos | Acessar arquivo, favoritar, copiar link, voltar |
| **Salvos** | Materiais favoritados pelo professor | Abrir detalhes, remover favorito |
| **Enviar material** | Formulário de submissão e arquivo | Validar, enviar, acompanhar confirmação |
| **Meus envios** | Submissões e situações de revisão | Consultar situação, retornar ao envio |
| **Meu perfil** | Informações da conta | Atualizar dados, foto e senha |
| **Revisão de materiais** | Submissões destinadas à avaliação | Consultar material, aprovar ou recusar |

O inventário identifica destinos e conteúdos, sem definir ainda os endereços técnicos da aplicação.

Mensagens de confirmação, estados de carregamento, formulários auxiliares e sobreposições podem ser apresentados no contexto da área correspondente, sem constituírem novos destinos de navegação.

## 6. Navegação principal

### 6.1. Organização

Os rótulos principais de referência são:

- **Início**
- **Biblioteca**
- **Salvos**
- **Enviar material**
- **Meu perfil**

A apresentação dessas opções poderá variar conforme o contexto de acesso.

Início e autenticação pertencem à experiência de entrada. Biblioteca, Salvos, Enviar material e Meu perfil compõem as áreas recorrentes de utilização.

A navegação deve manter nomes estáveis para tarefas equivalentes, evitando que um mesmo destino receba diferentes identificações em telas distintas.

### 6.2. Navegação autenticada

Na experiência do professor autenticado, a navegação deve oferecer caminhos reconhecíveis para Biblioteca, Salvos, Enviar material e Meu perfil.

A opção **Meus envios** poderá ser acessada pela área Enviar material, conforme representado no protótipo desktop.

A implementação deve preservar essa relação, independentemente de a navegação ocorrer por abas, rotas internas ou outra solução técnica.

A área de revisão não deve aparecer indiscriminadamente para todos os usuários. Seu acesso depende da autorização correspondente.

### 6.3. Menu do perfil

O menu de conta reúne o acesso às informações do usuário e às ações de gerenciamento.

No MVP, seus destinos essenciais são:

- Meu perfil.
- Sair da plataforma.

A saída deve encerrar a sessão antes de apresentar o destino público correspondente.

O menu deve permitir fechamento sem executar ações involuntárias.

### 6.4. Navegação entre áreas

As páginas não precisam oferecer apenas caminhos hierárquicos.

São esperadas relações como:

- Biblioteca → Detalhes → Biblioteca.
- Biblioteca → Salvar material → Salvos.
- Salvos → Detalhes → Salvos.
- Enviar material → Meus envios.
- Meus envios → Enviar material.
- Área de revisão → Detalhes da submissão → Área de revisão.

Essas conexões devem preservar o contexto da tarefa sempre que aplicável.

## 7. Conteúdos, controles e estados

Para manter a arquitetura organizada, é necessário diferenciar destinos de navegação, controles contextuais e estados da interface.

### 7.1. Destinos

São áreas ou conteúdos que o usuário precisa localizar e acessar, como Biblioteca, Detalhes do material, Salvos e Meu perfil.

Esses conteúdos podem corresponder a rotas próprias ou composições internas, conforme a arquitetura técnica.

### 7.2. Controles contextuais

São elementos utilizados para executar ações dentro de um destino.

Exemplos:

- Campo de pesquisa.
- Menus de filtros.
- Seletores e checkboxes.
- Ação de favoritar.
- Compartilhamento por cópia de link.
- Menus de conta.
- Confirmações de envio.
- Controles de revisão.

Esses elementos não devem ser representados automaticamente como novas páginas da arquitetura.

### 7.3. Estados

Estados representam condições dos conteúdos ou das operações.

Exemplos:

- Biblioteca carregando.
- Pesquisa sem resultados.
- Coleção de favoritos vazia.
- Material indisponível.
- Formulário inválido.
- Upload em andamento.
- Submissão aprovada ou recusada.
- Falha ao salvar informações.

Os estados pertencem às áreas correspondentes e devem ser tratados pelos componentes e fluxos de interação.

Sua documentação visual é complementada pelo [Handoff de UI/UX](handoff.md).

## 8. Organização dos materiais

### 8.1. Biblioteca

A Biblioteca utiliza uma lista de materiais publicados como principal estrutura de descoberta.

Cada item deve apresentar informações suficientes para reconhecer o recurso e permitir a abertura dos detalhes.

O conteúdo do cartão deve ser derivado dos metadados cadastrados, respeitando os padrões definidos no Design System.

Não devem aparecer como materiais publicados os registros que estejam pendentes, em análise ou recusados.

### 8.2. Detalhes do material

Os conteúdos devem ser organizados em grupos reconhecíveis.

| Grupo | Informações |
| --- | --- |
| **Identificação** | Título, descrição e tipo do recurso |
| **Classificação pedagógica** | Etapa de ensino, eixo da Computação, tema e ano escolar, conforme os dados |
| **Informações complementares** | Objetivos e demais informações disponíveis |
| **Autoria e fonte** | Autor, responsável pelo envio ou fonte, conforme os dados e regras de apresentação |
| **Acesso** | Arquivo ou endereço externo, quando disponível e permitido |
| **Ações contextuais** | Salvar, remover dos favoritos e copiar link |

Os campos apresentados devem corresponder às informações realmente associadas ao material.

A definição final da obrigatoriedade, multiplicidade e forma de apresentação dos dados pertence à [Especificação de metadados](../product/especificacao-metadados.md).

### 8.3. Pesquisa e filtros

A Biblioteca utiliza pesquisa textual por **título e tema** e três grupos de filtros:

| Categoria | Opções |
| --- | --- |
| **Tipo de material** | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| **Etapa de ensino** | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| **Eixo da Computação** | Pensamento Computacional; Mundo Digital; Cultura Digital |

A seleção e a aplicação dos filtros pertencem ao contexto da Biblioteca.

Os resultados e seus estados de carregamento ou ausência de correspondência não constituem áreas separadas.

O comportamento de combinação e confirmação dos critérios está registrado na [Especificação de busca e filtros](../product/especificacao-busca-filtros.md).

### 8.4. Materiais salvos

Salvos apresenta uma coleção pessoal, vinculada ao professor autenticado.

Os cartões devem preservar uma estrutura compatível com a Biblioteca, permitindo reconhecer os materiais e acessar seus detalhes.

A coleção não exige uma nova estrutura de conteúdo para os materiais: os favoritos apontam para recursos já cadastrados na plataforma.

### 8.5. Submissões

O conjunto de dados de uma submissão deve permitir reconhecer o material enviado e compreender sua situação de revisão.

Na área do professor, a prioridade é a identificação do envio e o acompanhamento do seu andamento.

Na área de revisão, a prioridade é apresentar as informações necessárias à avaliação e as ações permitidas ao responsável autorizado.

As duas áreas podem consultar informações relacionadas, mas não devem compartilhar indiscriminadamente as mesmas permissões.

## 9. Acesso e visibilidade

A arquitetura deve distinguir conteúdos de apresentação, operações pessoais e ações restritas.

| Conteúdo ou ação | Condição de acesso |
| --- | --- |
| Início | Acesso sem autenticação |
| Entrar, Criar conta e Recuperar senha | Acesso para quem precisa utilizar ou recuperar uma conta |
| Biblioteca | Acesso de visitantes ainda depende de definição |
| Detalhes do material | Acesso de visitantes e restrições específicas ainda dependem de definição |
| Salvar e remover favoritos | Professor autenticado, conforme permissões |
| Consultar Salvos | Conta correspondente |
| Enviar material | Professor autenticado e autorizado |
| Consultar Meus envios | Autor da submissão, conforme permissões |
| Consultar e editar Meu perfil | Titular da conta, conforme regras aplicáveis |
| Revisar, aprovar ou recusar submissões | Responsável autorizado |

O controle de acesso deve ser aplicado nas operações da aplicação, e não somente na navegação visual.

A ocultação de uma opção de menu não substitui a verificação de permissão.

### 9.1. Situações de acesso restrito

Quando o usuário tentar acessar uma área que exige autenticação, a interface deverá apresentar o caminho apropriado para entrar.

Quando a conta não tiver permissão para a operação, a aplicação deverá impedir o acesso e oferecer orientação compatível com o contexto.

O destino após a autenticação, incluindo o eventual retorno à tarefa original, ainda precisa ser definido.

## 10. Continuidade e retorno

A navegação deve preservar informações relevantes para que o usuário não precise reiniciar uma tarefa desnecessariamente.

### 10.1. Retorno à Biblioteca

Ao abrir os detalhes de um material a partir da Biblioteca, o usuário deve conseguir retornar com os critérios de pesquisa e filtros aplicados preservados durante a mesma navegação.

A preservação da posição de rolagem e do estado após recarregar a página depende de decisão complementar.

### 10.2. Retorno a Salvos

Quando o material for aberto a partir de Salvos, o usuário deverá conseguir retornar à coleção pessoal.

A remoção de um favorito deve atualizar a coleção sem criar inconsistência entre o conteúdo da página e o estado armazenado.

### 10.3. Envio e acompanhamento

Após um envio concluído, o professor deve receber confirmação e possuir um caminho identificável para acompanhar sua submissão.

A organização em abas **Enviar material** e **Meus envios** é a referência atual do protótipo desktop.

O comportamento exato após a confirmação do envio ainda precisa ser definido, incluindo a possibilidade de abrir diretamente o acompanhamento.

### 10.4. Revisão

O responsável autorizado deve conseguir abrir os detalhes de uma submissão, registrar uma decisão e retornar ao contexto de revisão.

O sistema deverá manter visível a situação atual, sem apresentar ações concluídas quando houver falha no registro da decisão.

### 10.5. Autenticação

O comportamento de retorno após login, cadastro e recuperação de senha precisa ser definido de acordo com a navegação e as permissões previstas.

A arquitetura não deve depender de redirecionamentos diferentes para cada tela apenas por causa de uma variação visual do protótipo.

## 11. Estados de conteúdo e feedback

Cada área deve contemplar as situações relevantes para seu funcionamento.

| Área | Estados previstos |
| --- | --- |
| **Autenticação** | Inicial, preenchido, validação, carregamento, sucesso e erro |
| **Biblioteca** | Carregamento, resultados disponíveis, acervo vazio, pesquisa sem resultados e falha |
| **Detalhes** | Recurso disponível, recurso indisponível, acesso restrito e falha identificável |
| **Salvos** | Coleção com materiais, coleção vazia e falha de consulta ou alteração |
| **Envio** | Formulário inicial, inválido, arquivo selecionado, progresso, sucesso e falha |
| **Meus envios** | Submissões disponíveis, ausência de envios e situações de revisão |
| **Revisão** | Submissões para análise, decisão confirmada, recusa, aprovação e falha |
| **Meu perfil** | Dados disponíveis, edição, salvamento e erro |
| **Compartilhamento** | Cópia concluída ou falha |

Esses estados não ampliam a quantidade de áreas do produto.

Devem ser representados por alterações de conteúdo, componentes de feedback e controles pertinentes ao contexto.

## 12. Conteúdos complementares e evolução

O Figma apresenta telas e funcionalidades além dos fluxos centrais do MVP.

Entre elas estão:

- Login com Google.
- Central de notificações.
- Comentários e respostas.
- Relatos de aplicação.
- Denúncias na comunidade.
- Perfil público ampliado.
- Compartilhamento integrado com redes sociais.
- Conteúdo institucional e formulário de contato.

Essas referências não devem ser incorporadas automaticamente à navegação funcional da primeira versão.

### 12.1. Funcionalidades futuras

Os recursos de comunidade, notificações e autenticação externa deverão receber definição própria de conteúdo, navegação e permissões antes de serem implementados.

Sua integração futura poderá exigir novos destinos ou ajustes nos existentes.

### 12.2. Conteúdo institucional

O protótipo apresenta **Fale conosco**, **Termos de uso** e **Política de privacidade**.

Esses conteúdos poderão ocupar áreas institucionais próprias, acessíveis por links de navegação ou rodapé, conforme as necessidades de disponibilização da plataforma.

Os textos definitivos, os requisitos legais e o funcionamento do formulário de contato devem ser estabelecidos antes de sua publicação.

As telas existentes servem como referência visual, mas não comprovam que seu conteúdo esteja aprovado.

## 13. Responsividade

O desenvolvimento será iniciado pelo desktop, utilizando os frames de 1536 px como referência de composição.

Essa prioridade não altera a arquitetura lógica das informações.

As versões para tablet e dispositivos móveis deverão preservar os destinos e as tarefas essenciais, mesmo quando os elementos de navegação forem reorganizados.

Entre os pontos de adaptação estão:

- Apresentação da navegação principal.
- Acesso aos menus e opções de conta.
- Organização dos filtros.
- Disposição dos cartões da Biblioteca e de Salvos.
- Estrutura dos formulários.
- Acesso a Meus envios.
- Navegação de retorno.
- Apresentação de modais e sobreposições.

Os padrões responsivos serão definidos a partir das referências do Figma e dos critérios funcionais do MVP.

## 14. Decisões pendentes

| Tema | Definição necessária |
| --- | --- |
| **Acesso de visitantes** | Quais conteúdos da Biblioteca e dos detalhes podem ser consultados sem login. |
| **Autenticação** | Destino após login, cadastro e recuperação, incluindo retorno à tarefa original. |
| **Navegação dos resultados** | Paginação ou carregamento progressivo e comportamento de retorno. |
| **Meus envios** | Confirmar a organização em abas como solução definitiva e definir o destino após a submissão. |
| **Moderação** | Ponto de entrada, organização visual e navegação da área restrita. |
| **Metadados** | Campos exibidos em cartões e detalhes, especialmente tema e autoria. |
| **Acesso ao recurso** | Arquivos hospedados, links externos ou ambas as formas de acesso. |
| **Compartilhamento** | Destino do link copiado. |
| **Continuidade** | Persistência de filtros, pesquisa e posição de rolagem após retorno ou recarregamento. |
| **Navegação responsiva** | Disposição e comportamento dos menus e controles em telas menores. |
| **Conteúdo institucional** | Estrutura definitiva das páginas, textos e necessidade do formulário de contato. |

Essas decisões deverão ser registradas nos documentos correspondentes antes da conclusão dos fluxos afetados.

A arquitetura poderá ser refinada durante o desenvolvimento, especialmente quando forem implementadas as integrações e realizados os testes de navegação.

## 15. Critérios de verificação

A organização das informações deverá ser conferida durante a implementação, considerando:

- [ ] As áreas principais são identificáveis e possuem nomes consistentes.
- [ ] A Biblioteca concentra a pesquisa, os filtros e os resultados.
- [ ] Os detalhes apresentam informações e ações relacionadas ao material consultado.
- [ ] Salvos e Meus envios são reconhecíveis como conteúdos pessoais do professor.
- [ ] O envio e o acompanhamento permanecem conectados na navegação.
- [ ] A revisão possui acesso restrito aos responsáveis autorizados.
- [ ] O usuário consegue retornar ao contexto de origem dos detalhes.
- [ ] Estados de carregamento, erro e ausência de dados não são tratados como páginas desnecessárias.
- [ ] Ações contextuais e sobreposições possuem fechamento e continuidade adequados.
- [ ] A navegação permite utilizar os principais fluxos por teclado.
- [ ] A adaptação responsiva preserva as tarefas e os destinos essenciais.
- [ ] Funcionalidades futuras não são apresentadas como operacionais sem implementação.

A verificação deve ocorrer na aplicação funcional e poderá ser complementada por avaliações de navegação com professores.

## 16. Documentos relacionados

- [Product Brief](../product/product-brief.md)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Histórias de usuário](../product/historias-de-usuario.md)
- [Backlog](../product/backlog.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [Especificação de metadados](../product/especificacao-metadados.md)
- [Objetivos de UX](objetivos-de-ux.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)
- [Handoff de UI/UX](handoff.md)

---

A arquitetura da informação deve acompanhar a evolução da navegação e da organização dos conteúdos, mantendo coerência com as decisões de produto.

Alterações de escopo devem ser registradas nos documentos funcionais. Mudanças nos percursos de interação devem ser refletidas no User Flow. Este documento deve permanecer como referência para a estrutura e a localização das informações na plataforma.
