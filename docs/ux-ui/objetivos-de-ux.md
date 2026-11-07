# EduComp — Objetivos de UX

**Versão:** 0.7  
**Data:** 07/11/2026  
**Situação:** objetivos de experiência definidos para orientar o MVP; validação com usuários ainda não realizada.

## 1. Objetivo do documento

Este documento estabelece os objetivos de experiência do usuário para o EduComp, uma plataforma voltada a professores da Educação Básica que procuram, consultam, organizam e compartilham materiais pedagógicos de Computação.

Os objetivos orientam as decisões de arquitetura da informação, navegação, conteúdo, interface e avaliação de usabilidade. Descrevem **o que a experiência deve proporcionar às pessoas**, sem determinar como cada funcionalidade será implementada.

As regras de negócio, os campos obrigatórios e os comportamentos funcionais são tratados nos documentos de produto.

O EduComp já possui protótipos visuais, mas ainda não foram realizados testes de usabilidade ou pesquisas com professores reais. Portanto, os resultados esperados neste documento representam **metas de projeto, não resultados comprovados**.

### 1.1. Referências

- [Protótipo desktop — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Histórias de usuário](../product/historias-de-usuario.md)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [User Flow](user-flow.md)
- [Handoff de UI/UX](handoff.md)

## 2. Público e contexto de uso

O público prioritário do EduComp é formado por **professores da Educação Básica interessados em materiais para o ensino de Computação**.

A experiência considera situações como:

- Encontrar um recurso relacionado a determinado tema.
- Identificar materiais adequados a uma etapa de ensino.
- Consultar informações pedagógicas antes de acessar o conteúdo.
- Guardar materiais de interesse para utilização posterior.
- Contribuir com recursos para o acervo e acompanhar sua avaliação.

A proposta parte da hipótese de que a dispersão de recursos pode tornar a localização e a avaliação inicial de materiais mais trabalhosas. Essa hipótese ainda precisa ser investigada com professores, sem pressupor a frequência ou a gravidade do problema.

O MVP também contempla um segundo contexto de uso: **a revisão de materiais submetidos por professores**. Essa atividade será realizada por responsáveis autorizados, com necessidades específicas de consulta, avaliação e decisão.

A experiência desse papel ainda precisa de detalhamento visual e funcional.

### 2.1. Contexto de desenvolvimento

O desenvolvimento começará pelas interfaces desktop, utilizando o protótipo de 1536 px como referência visual.

A prioridade desktop estabelece uma sequência de implementação, mas não restringe a experiência final a computadores. A adaptação para tablet e dispositivos móveis integra os objetivos do MVP completo.

A avaliação deverá respeitar essa evolução: primeiro serão verificados os fluxos disponíveis no desktop e, posteriormente, as adaptações responsivas.

## 3. Objetivo geral de experiência

**Permitir que o professor compreenda o que o EduComp oferece, encontre e avalie materiais de interesse e conclua suas ações com clareza, autonomia e feedback adequado.**

A experiência deve favorecer a descoberta de recursos pedagógicos e reduzir dúvidas durante a navegação, a consulta e a contribuição de materiais.

Também deve comunicar de maneira transparente as informações disponíveis, as permissões necessárias e os resultados das operações realizadas.

## 4. Objetivos específicos de UX

### OUX-001 — Facilitar a descoberta de materiais

**Objetivo:** tornar a Biblioteca compreensível e permitir que o professor identifique recursos de interesse para suas aulas.

**Diretrizes de experiência:**

- Apresentar os materiais de forma organizada, destacando títulos e informações essenciais.
- Diferenciar a exploração da Biblioteca da consulta aos detalhes de um material.
- Permitir continuar a exploração sem perder desnecessariamente o contexto da navegação.
- Manter consistência visual entre os cartões e suas ações.

**Resultado esperado:** o professor compreende como explorar a Biblioteca e consegue abrir um material que deseja conhecer melhor.

**Avaliação futura:** observar a exploração inicial, a identificação dos recursos e a conclusão de tarefas de localização e abertura de detalhes.

### OUX-002 — Tornar a pesquisa clara e previsível

**Objetivo:** permitir que o professor procure materiais por palavras-chave e compreenda a relação entre sua pesquisa e os resultados apresentados.

**Diretrizes de experiência:**

- Identificar claramente o campo de pesquisa.
- Permitir consultar e modificar o termo informado.
- Comunicar quando os resultados estiverem sendo atualizados.
- Manter os critérios utilizados visíveis ou facilmente recuperáveis.
- Diferenciar consultas sem correspondência de falhas técnicas.
- Evitar que resultados de consultas anteriores substituam indevidamente os mais recentes.

A pesquisa do MVP considera **título e tema**. As regras de correspondência, ordenação e execução serão definidas na especificação funcional.

**Resultado esperado:** o professor sabe como pesquisar, reconhece as alterações nos resultados e compreende como reformular a consulta quando necessário.

**Avaliação futura:** propor buscas representativas e observar a compreensão do campo, dos resultados e das opções de reformulação.

### OUX-003 — Tornar os filtros compreensíveis e controláveis

**Objetivo:** ajudar o professor a refinar a Biblioteca por tipo de material, etapa de ensino e eixo da Computação, mantendo clareza sobre os critérios utilizados.

**Diretrizes de experiência:**

- Utilizar nomes e opções de filtro compreensíveis e consistentes.
- Diferenciar seleções em edição dos critérios efetivamente aplicados.
- Tornar as ações **Aplicar** e **Limpar** fáceis de reconhecer.
- Permitir reabrir os filtros e identificar as opções selecionadas.
- Informar quando uma combinação de critérios não retornar materiais.
- Preservar os demais critérios ao modificar uma categoria.

O comportamento de fechamento sem aplicar e o alcance da ação Limpar ainda precisam de definição.

**Resultado esperado:** o professor consegue combinar, revisar e remover filtros e entende por que os resultados foram alterados.

**Avaliação futura:** observar tarefas de seleção múltipla, combinação de categorias e limpeza de critérios, verificando possíveis dúvidas entre seleção e aplicação.

### OUX-004 — Apoiar a avaliação inicial dos materiais

**Objetivo:** oferecer informações suficientes para que o professor avalie se determinado recurso pode atender às suas necessidades.

**Diretrizes de experiência:**

- Destacar o título e a descrição do material.
- Organizar classificações pedagógicas e demais metadados de maneira legível.
- Apresentar autoria ou fonte quando esses dados estiverem disponíveis.
- Evitar informações fictícias para campos não preenchidos.
- Distinguir os dados descritivos das ações de acesso ao recurso.
- Preservar uma hierarquia clara entre as informações essenciais e complementares.

**Resultado esperado:** o professor identifica as características conhecidas do material e consegue tomar uma decisão inicial de acesso sem depender de uma pré-visualização integrada.

**Avaliação futura:** solicitar que participantes encontrem informações específicas e expliquem quais dados utilizam para avaliar a pertinência de um recurso.

### OUX-005 — Tornar o acesso aos recursos transparente

**Objetivo:** permitir que o professor identifique as opções de acesso disponíveis e compreenda eventuais restrições.

**Diretrizes de experiência:**

- Diferenciar a página de detalhes da ação que abre o recurso pedagógico.
- Exibir somente opções de acesso existentes e autorizadas.
- Distinguir arquivos hospedados de links externos, caso ambos sejam admitidos.
- Informar quando um recurso estiver indisponível.
- Não confundir indisponibilidade, falta de permissão e erro técnico.
- Oferecer orientação ou nova tentativa quando houver uma ação possível.

**Resultado esperado:** o professor compreende qual recurso será acessado e reconhece as limitações quando a operação não puder ser concluída.

**Avaliação futura:** apresentar cenários com recursos disponíveis, indisponíveis e restritos, observando a interpretação dos controles e das mensagens.

As formas definitivas de disponibilização ainda dependem de decisão funcional.

### OUX-006 — Ajudar na recuperação de erros e estados vazios

**Objetivo:** evitar que o usuário fique sem orientação diante de resultados vazios ou operações malsucedidas.

**Diretrizes de experiência:**

- Distinguir uma Biblioteca vazia de uma pesquisa sem correspondências.
- Diferenciar falhas de carregamento de ausência de conteúdo.
- Oferecer caminhos para revisar a pesquisa e os filtros.
- Apresentar mensagens específicas para erros de autenticação, atualização de perfil e envio de arquivos.
- Utilizar estados vazios informativos em Salvos e Meus envios.
- Indicar possibilidades de recuperação sem prometer ações indisponíveis.

**Resultado esperado:** o usuário compreende a situação encontrada e identifica uma próxima ação possível, quando houver.

**Avaliação futura:** observar como participantes interpretam as mensagens e se conseguem continuar suas tarefas após situações simuladas de falha ou ausência de dados.

### OUX-007 — Preservar acessibilidade, legibilidade e consistência

**Objetivo:** manter os fluxos principais compreensíveis e utilizáveis em diferentes tamanhos de tela e formas de interação.

**Diretrizes de experiência:**

- Preservar legibilidade, hierarquia visual e contraste adequado.
- Manter os controles essenciais disponíveis em diferentes larguras de tela.
- Oferecer navegação por teclado e foco perceptível.
- Utilizar rótulos acessíveis e estruturas semânticas adequadas.
- Diferenciar estados de foco, seleção, carregamento e indisponibilidade.
- Não depender exclusivamente de cores para comunicar informações.
- Utilizar componentes consistentes entre as áreas do produto.
- Evitar perda de conteúdo ou funcionalidade durante a adaptação responsiva.

**Resultado esperado:** as tarefas principais permanecem compreensíveis e operáveis nos contextos de utilização previstos para a plataforma.

**Avaliação futura:** verificar os fluxos em diferentes larguras de tela, realizar inspeções de acessibilidade e executar tarefas com teclado.

A implementação desktop será verificada primeiro. A experiência responsiva deverá ser avaliada antes da conclusão do MVP.

### OUX-008 — Orientar o acesso e o gerenciamento da conta

**Objetivo:** facilitar o acesso à plataforma e às funções pessoais, tornando compreensíveis as condições de autenticação.

**Diretrizes de experiência:**

- Diferenciar claramente **Entrar**, **Criar conta** e **Recuperar senha**.
- Informar os dados necessários nos formulários.
- Apresentar erros próximos aos campos correspondentes.
- Comunicar processamento, sucesso e falha sem expor informações sensíveis.
- Permitir identificar as opções de perfil e saída da conta.
- Explicar quando uma ação exige autenticação.
- Preservar o contexto da tarefa quando o fluxo permitir.

**Resultado esperado:** o professor reconhece o caminho adequado para acessar sua conta, recuperar credenciais e compreender tentativas malsucedidas.

**Avaliação futura:** observar tarefas de entrada, cadastro e recuperação utilizando contas e dados de teste.

Os redirecionamentos após autenticação e as permissões de visitantes ainda precisam ser confirmados.

### OUX-009 — Facilitar a organização dos materiais salvos

**Objetivo:** permitir que o professor guarde recursos de interesse e consiga retomá-los sem repetir a busca.

**Diretrizes de experiência:**

- Tornar reconhecível a ação de salvar ou remover dos favoritos.
- Comunicar o estado de favorito e o resultado das alterações.
- Apresentar Salvos como uma coleção pessoal de materiais.
- Permitir abrir os detalhes dos itens armazenados.
- Informar quando a coleção estiver vazia.
- Manter consistência entre Biblioteca, Detalhes e Salvos.

**Resultado esperado:** o professor reconhece quais materiais estão salvos, consegue encontrá-los novamente e pode removê-los sem dúvidas sobre o resultado.

**Avaliação futura:** propor tarefas de salvar, localizar e remover materiais, observando se os participantes compreendem as mudanças de estado.

### OUX-010 — Tornar o envio e o acompanhamento compreensíveis

**Objetivo:** permitir que o professor envie materiais com segurança e compreenda que a submissão depende de revisão antes da publicação.

**Diretrizes de experiência:**

- Organizar o formulário com rótulos e instruções claras.
- Identificar campos obrigatórios.
- Comunicar erros de preenchimento e problemas com arquivos.
- Informar o andamento e o resultado do envio.
- Diferenciar claramente **material enviado** de **material publicado**.
- Oferecer acesso identificável ao acompanhamento das submissões.
- Apresentar as situações de revisão com linguagem compreensível.
- Evitar confirmações de sucesso antes da conclusão real da operação.

No protótipo desktop, **Enviar material** e **Meus envios** aparecem como abas da mesma área. Essa relação orienta a implementação inicial.

**Resultado esperado:** o professor consegue concluir uma submissão válida, entende que o material será avaliado e sabe onde consultar sua situação.

**Avaliação futura:** observar tarefas de envio, interpretação das mensagens e localização do acompanhamento.

### OUX-011 — Facilitar a atualização do perfil

**Objetivo:** permitir que o professor consulte e atualize suas informações pessoais com confiança.

**Diretrizes de experiência:**

- Apresentar os dados da conta de maneira organizada.
- Diferenciar informações editáveis e não editáveis.
- Tornar reconhecíveis os controles de edição e salvamento.
- Comunicar erros ao alterar dados, foto ou senha.
- Informar se uma alteração foi efetivamente concluída.
- Proteger informações e operações restritas ao titular da conta.

**Resultado esperado:** o professor compreende quais dados pode modificar e reconhece se as alterações foram salvas.

**Avaliação futura:** observar tarefas de atualização utilizando contas de teste e verificar a compreensão das mensagens e confirmações.

### OUX-012 — Tornar o compartilhamento básico previsível

**Objetivo:** oferecer uma maneira simples de copiar um endereço compartilhável, com clareza sobre o resultado da ação.

**Diretrizes de experiência:**

- Identificar claramente a ação de copiar o link.
- Indicar qual conteúdo ou página será compartilhado.
- Confirmar quando a cópia for concluída.
- Informar falhas quando identificáveis.
- Não sugerir que um endereço restrito possa ser acessado publicamente sem autorização.

**Resultado esperado:** o professor sabe o que está compartilhando e compreende se a cópia foi realizada.

**Avaliação futura:** solicitar que participantes copiem um link e identifiquem seu destino.

O endereço definitivo — página inicial, detalhes do material ou ambos — ainda precisa ser definido.

### OUX-013 — Facilitar a revisão de materiais

**Objetivo:** permitir que o responsável autorizado consulte submissões e registre decisões de aprovação ou recusa de maneira clara e segura.

**Diretrizes de experiência:**

- Apresentar os materiais que necessitam de avaliação de forma organizada.
- Permitir identificar o recurso, o responsável pelo envio e sua situação atual.
- Disponibilizar as informações pedagógicas necessárias à análise.
- Diferenciar as ações de aprovação e recusa.
- Comunicar claramente as consequências da decisão.
- Confirmar alterações de situação somente após seu registro efetivo.
- Informar falhas sem gerar dúvidas sobre o resultado da operação.
- Manter o acesso restrito aos responsáveis autorizados.

**Resultado esperado:** o responsável pela revisão consegue reconhecer os materiais pendentes, consultar suas informações e registrar uma decisão, compreendendo o resultado da operação.

**Avaliação futura:** observar tarefas de análise com submissões de teste, verificando a identificação das informações, a compreensão das ações e a interpretação dos estados.

A interface de moderação ainda precisa ser especificada. Sua avaliação dependerá dessa definição e da disponibilidade de um fluxo executável.

## 5. Princípios transversais de experiência

Os objetivos anteriores compartilham princípios que devem orientar a experiência em toda a plataforma.

| Princípio | Aplicação esperada |
| --- | --- |
| **Clareza** | Informações e ações possuem significados reconhecíveis. |
| **Consistência** | Componentes e ações equivalentes apresentam comportamentos semelhantes. |
| **Orientação** | A navegação permite compreender o contexto e identificar caminhos de continuidade. |
| **Feedback** | Operações informam andamento, conclusão, falha ou indisponibilidade. |
| **Autonomia** | O professor mantém o controle sobre os materiais que consulta, salva e utiliza. |
| **Transparência** | A interface não apresenta como disponíveis ações ou recursos que não estejam acessíveis. |
| **Acessibilidade** | As tarefas essenciais consideram diferentes dispositivos e formas de interação. |
| **Fidelidade aos dados** | As informações apresentadas correspondem aos registros da aplicação. |
| **Segurança e confiança** | Operações pessoais e decisões restritas respeitam permissões e apresentam resultados confiáveis. |

Esses princípios devem orientar a construção dos componentes, a organização das páginas e a redação das mensagens.

## 6. Relação entre objetivos e jornadas

| Jornada | Objetivos relacionados |
| --- | --- |
| Conhecer a plataforma e acessar a conta | OUX-008, OUX-006, OUX-007 |
| Explorar a Biblioteca | OUX-001, OUX-006, OUX-007 |
| Pesquisar e combinar filtros | OUX-002, OUX-003, OUX-006 |
| Consultar detalhes e acessar recursos | OUX-004, OUX-005 |
| Salvar e consultar favoritos | OUX-009, OUX-006 |
| Enviar material e acompanhar a submissão | OUX-010, OUX-006 |
| Consultar e atualizar o perfil | OUX-011, OUX-008 |
| Compartilhar um link | OUX-012 |
| Revisar e decidir sobre submissões | OUX-013, OUX-006, OUX-007 |

As jornadas correspondem às necessidades previstas para o MVP.

Funcionalidades como login com Google, notificações, comentários, relatos de aplicação e compartilhamento por redes sociais permanecem fora do escopo funcional da primeira versão, ainda que estejam representadas no Figma.

## 7. Avaliação dos objetivos de UX

A avaliação deverá verificar se as pessoas conseguem compreender e utilizar os fluxos propostos, indo além da correspondência visual entre as interfaces e o protótipo.

Os métodos poderão incluir:

- Inspeção heurística.
- Revisão de acessibilidade.
- Testes de navegação e interação no protótipo.
- Testes de usabilidade na aplicação funcional.
- Observação de tarefas realizadas por professores.
- Avaliação das operações de revisão com participantes que representem esse papel.

A escolha dos métodos dependerá do estado de desenvolvimento e da disponibilidade das interações necessárias.

### 7.1. Aspectos a observar

| Aspecto | Evidência esperada |
| --- | --- |
| **Conclusão de tarefas** | Se a pessoa consegue alcançar o objetivo proposto. |
| **Dificuldades** | Dúvidas, desvios, tentativas malsucedidas e necessidade de ajuda. |
| **Compreensão das informações** | Interpretação de filtros, classificações, ações e estados. |
| **Clareza do feedback** | Compreensão de progresso, sucesso, erro e ausência de dados. |
| **Continuidade** | Capacidade de retornar e retomar tarefas preservando o contexto esperado. |
| **Acessibilidade** | Utilização dos fluxos com diferentes formas de interação. |
| **Adaptação responsiva** | Manutenção das tarefas essenciais em diferentes tamanhos de tela. |
| **Utilidade percebida** | Relatos dos participantes sobre a relevância das funcionalidades para suas necessidades. |

### 7.2. Condições de avaliação

Antes de executar testes com usuários, deverão ser definidos:

- Perfil e critérios de seleção dos participantes.
- Objetivos da avaliação.
- Cenários e tarefas.
- Ambiente e condições de execução.
- Critérios de observação.
- Forma de registrar resultados e dificuldades.
- Tratamento dos dados coletados.

A definição de metas quantitativas deverá considerar o método utilizado e as condições reais dos testes.

Não devem ser apresentados índices de sucesso, satisfação ou desempenho sem medições correspondentes.

### 7.3. Etapas de verificação

**Durante o desenvolvimento desktop**

A avaliação poderá verificar a consistência visual, a clareza dos componentes e a continuidade dos fluxos já implementados.

**Durante a adaptação responsiva**

Deverá ser observado se a reorganização dos elementos preserva a navegação, a compreensão e a realização das tarefas.

**Na validação do MVP**

Os fluxos funcionais poderão ser avaliados com tarefas representativas, considerando integração, dados reais ou de teste e comportamento das operações.

O resultado de uma inspeção técnica não deve ser apresentado como equivalente à validação com usuários.

## 8. Hipóteses e pontos a validar

### 8.1. Hipóteses de experiência

- Uma Biblioteca organizada pode tornar a descoberta de materiais mais clara.
- Pesquisa e filtros podem facilitar a localização de recursos adequados ao contexto de ensino.
- Metadados claros podem apoiar a avaliação inicial dos materiais.
- Favoritos podem facilitar a retomada de recursos de interesse.
- Feedback contextual pode reduzir dúvidas durante o uso da plataforma.
- Um acompanhamento compreensível pode ajudar o professor a entender o processo de contribuição.
- Uma interface de revisão organizada pode apoiar decisões mais claras e consistentes sobre as submissões.

Essas hipóteses orientam o projeto, mas ainda não foram confirmadas por pesquisa.

### 8.2. Pontos de UX ainda pendentes

| Tema | Questão a definir |
| --- | --- |
| Navegação e autenticação | Destinos após entrada, cadastro, recuperação e tentativa de ação protegida. |
| Pesquisa | Forma de execução e apresentação dos critérios ativos. |
| Filtros | Fechamento sem aplicar e comportamento da ação Limpar. |
| Resultados | Continuidade da navegação, retorno aos detalhes e preservação do contexto. |
| Acesso aos materiais | Apresentação de arquivos, links externos e indisponibilidade. |
| Salvos | Comportamento dos controles de busca e filtros na coleção pessoal. |
| Envio | Orientação para metadados, arquivos e estados de submissão. |
| Acompanhamento | Apresentação das situações de avaliação e possíveis próximas ações. |
| Moderação | Organização da interface restrita e clareza das decisões de revisão. |
| Perfil | Apresentação de campos editáveis, foto e mensagens de alteração. |
| Compartilhamento | Identificação do destino do link copiado. |
| Responsividade | Adaptação de navegação, filtros, formulários e sobreposições para telas menores. |

Esses pontos deverão ser resolvidos conforme o avanço do desenvolvimento e registrados nos artefatos correspondentes.

A presença de uma solução no protótipo não significa que seu comportamento tenha sido validado com usuários.

## 9. Documentos relacionados

- [Product Brief](../product/product-brief.md) — visão e proposta de valor.
- [Escopo do MVP](../product/escopo-mvp.md) — funcionalidades e limites da primeira versão.
- [Requisitos](../product/requisitos.md) — comportamentos funcionais e requisitos não funcionais.
- [Histórias de usuário](../product/historias-de-usuario.md) — necessidades e critérios de aceitação.
- [Backlog](../product/backlog.md) — planejamento das entregas.
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md) — comportamento de pesquisa e filtragem.
- [Especificação de metadados](../product/especificacao-metadados.md) — classificação e informações dos materiais.
- [Arquitetura da Informação](arquitetura-da-informacao.md) — organização das áreas e conteúdos.
- [User Flow](user-flow.md) — percursos e decisões de navegação.
- [Design System](design-system.md) — identidade visual e padrões da interface.
- [Handoff de UI/UX](handoff.md) — referência para a implementação desktop.

---

Este documento deverá acompanhar as decisões que alterem os objetivos da experiência ou a forma de avaliá-los.

Sua função é orientar o design e a avaliação da usabilidade. A efetividade dos objetivos dependerá de verificações futuras com fluxos executáveis e, quando possível, com professores reais.
