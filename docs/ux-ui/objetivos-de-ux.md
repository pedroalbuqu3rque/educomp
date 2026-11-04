# EduComp — Objetivos de UX

**Versão:** 0.6  
**Data:** 04/11/2026  
**Situação:** Objetivos de experiência definidos para orientar a primeira versão funcional; validação com usuários ainda não realizada.

## 1. Objetivo do documento

Estabelecer os resultados de experiência pretendidos para o EduComp, uma plataforma voltada a professores da Educação Básica que procuram, consultam, organizam e compartilham materiais pedagógicos de Computação.

Os objetivos orientam decisões de arquitetura da informação, navegação, conteúdo, interface e avaliação de usabilidade. Eles descrevem **o que a experiência deve facilitar para as pessoas**, não as soluções técnicas a implementar. Regras de negócio, campos obrigatórios e critérios funcionais são detalhados nos documentos de produto.

O protótipo visual foi elaborado, mas suas interações ainda não estão integralmente validadas. Não foram realizados testes de usabilidade ou pesquisas com professores reais; portanto, os resultados esperados neste documento são **metas de projeto, não resultados comprovados**.

## 2. Público e contexto de uso

O público prioritário é formado por **professores da Educação Básica que procuram materiais para o ensino de Computação**. A proposta considera situações como encontrar um recurso para determinado tema, verificar sua adequação à etapa de ensino, guardá-lo para uso posterior e contribuir com materiais para o acervo.

A experiência é guiada pela hipótese de que a dispersão dos recursos pode tornar a busca e a avaliação inicial mais trabalhosas. Essa hipótese ainda precisa ser investigada com professores, sem pressupor frequência, gravidade ou comportamento de uso.

Também existe uma necessidade operacional de **revisão de materiais submetidos**, a ser atendida por pessoas autorizadas. A experiência desse papel requer definição própria antes de ser considerada resolvida.

## 3. Objetivo geral de experiência

**Permitir que o professor compreenda rapidamente o que o EduComp oferece, encontre e avalie materiais de interesse e conclua suas ações com orientação e feedback adequados.**

A experiência deve preservar a autonomia do professor na escolha dos materiais e comunicar com clareza os limites do conteúdo disponível, das permissões e das operações realizadas.

## 4. Objetivos específicos de UX

### OUX-001 — Facilitar a descoberta de materiais

**Objetivo:** tornar a Biblioteca compreensível e permitir que o professor identifique recursos de interesse para suas aulas.

**Diretrizes de experiência:**

- Apresentar os materiais de forma organizada, com títulos e informações de identificação em destaque.
- Tornar evidente a diferença entre explorar a Biblioteca e abrir os detalhes de um material.
- Permitir continuar a exploração sem perder o contexto da navegação.
- Manter coerência visual entre os itens e as ações disponíveis.

**Resultado esperado:** o professor entende como explorar a Biblioteca e consegue abrir um material que deseja conhecer melhor.

**Avaliação futura:** observar a exploração inicial, a identificação de itens e a conclusão de tarefas de localização e abertura de detalhes.

### OUX-002 — Tornar a pesquisa clara e previsível

**Objetivo:** permitir que o professor procure materiais por palavras-chave e compreenda a relação entre a pesquisa realizada e os resultados apresentados.

**Diretrizes de experiência:**

- Identificar claramente o campo de pesquisa e permitir revisar o termo informado.
- Utilizar mensagens e estados que indiquem quando os resultados estão sendo atualizados.
- Manter visíveis ou recuperáveis os critérios ativos, sem substituir resultados recentes por respostas antigas.
- Comunicar consultas sem correspondência de modo distinto de erros técnicos.

A pesquisa prevista considera **título e tema**. O disparo da consulta, as regras de correspondência e a ordenação serão definidos na especificação funcional, sem transformar este objetivo de UX em uma regra de algoritmo.

**Resultado esperado:** o professor sabe como pesquisar, percebe quando os resultados mudam e compreende o que pode fazer se não encontrar materiais.

**Avaliação futura:** propor buscas representativas e observar a compreensão do campo, dos resultados e das possibilidades de reformulação da pesquisa.

### OUX-003 — Tornar os filtros compreensíveis e controláveis

**Objetivo:** ajudar o professor a refinar resultados por **tipo de material, etapa de ensino e eixo da Computação**, mantendo clareza sobre as escolhas feitas.

**Diretrizes de experiência:**

- Apresentar nomes e opções de filtro com rótulos legíveis e consistentes.
- Diferenciar opções selecionadas daquelas que estão efetivamente aplicadas à Biblioteca.
- Tornar as ações **Aplicar** e **Limpar** fáceis de identificar e compreender.
- Permitir reabrir um filtro e reconhecer as seleções já aplicadas.
- Oferecer orientação quando a combinação de critérios não retornar materiais.

O comportamento de fechar uma sobreposição sem aplicar e o alcance de **Limpar** ainda precisam ser definidos para evitar ambiguidades.

**Resultado esperado:** o professor consegue combinar, revisar e remover filtros e entende por que o conjunto de resultados foi alterado.

**Avaliação futura:** observar tarefas de seleção múltipla, combinação de categorias, aplicação e limpeza de critérios, verificando possíveis confusões entre seleção e aplicação.

### OUX-004 — Apoiar a avaliação inicial dos materiais

**Objetivo:** oferecer informações claras para que o professor decida se vale a pena acessar determinado recurso.

**Diretrizes de experiência:**

- Dar destaque ao título e à descrição do material.
- Organizar as classificações e demais metadados disponíveis de maneira fácil de consultar.
- Identificar autoria ou fonte quando esses dados estiverem cadastrados.
- Não exibir campos ausentes como se fossem informações conhecidas.
- Distinguir informações sobre o material das ações para acessar o conteúdo.

**Resultado esperado:** o professor consegue identificar as características conhecidas do material e tomar uma decisão inicial de acesso sem depender de pré-visualização integrada.

**Avaliação futura:** solicitar que participantes encontrem informações específicas e expliquem quais dados usam para avaliar a pertinência de um recurso.

### OUX-005 — Tornar o acesso aos recursos transparente

**Objetivo:** permitir que o professor identifique o que pode acessar e compreenda eventuais restrições ou indisponibilidades.

**Diretrizes de experiência:**

- Distinguir a página de detalhes da ação que abre o recurso pedagógico.
- Exibir apenas opções de acesso existentes e autorizadas.
- Diferenciar arquivo hospedado e link externo, caso ambos sejam aceitos na solução.
- Comunicar a ausência de acesso sem sugerir que o material necessariamente deixou de existir.
- Oferecer orientação ou nova tentativa quando houver uma ação possível após uma falha.

**Resultado esperado:** o professor compreende qual recurso será aberto e não confunde falta de permissão, indisponibilidade de conteúdo e erro de carregamento da plataforma.

**Avaliação futura:** apresentar cenários com recurso disponível, sem permissão e indisponível; observar a interpretação dos controles e das mensagens. As formas definitivas de acesso ainda dependem de decisão funcional.

### OUX-006 — Ajudar na recuperação de erros e estados vazios

**Objetivo:** evitar que o professor fique sem orientação diante de consultas sem resultados, listas vazias ou falhas nas ações da plataforma.

**Diretrizes de experiência:**

- Distinguir acervo vazio de pesquisa sem correspondências.
- Diferenciar erros de carregamento de ausência de conteúdo.
- Oferecer meios de revisar a pesquisa, ajustar filtros ou tentar novamente quando pertinente.
- Utilizar mensagens claras para falhas de autenticação, atualização de perfil e envio de arquivos.
- Apresentar estados vazios informativos em Salvos e no acompanhamento de envios.

**Resultado esperado:** o usuário entende a situação e reconhece uma próxima ação possível, quando houver.

**Avaliação futura:** observar como participantes interpretam mensagens e se conseguem se recuperar de situações simuladas de erro ou ausência de dados.

### OUX-007 — Preservar acessibilidade, legibilidade e consistência

**Objetivo:** tornar os fluxos principais utilizáveis em diferentes tamanhos de tela e formas de interação.

**Diretrizes de experiência:**

- Preservar legibilidade, hierarquia visual e contraste adequado.
- Manter navegação e controles disponíveis em telas menores, inclusive filtros e ações de conta.
- Prever foco perceptível, navegação por teclado e rótulos acessíveis.
- Tornar reconhecíveis os estados de hover, foco, pressionado, carregamento e desabilitado.
- Não depender apenas de cor para transmitir seleção, erro ou sucesso.
- Manter componentes semelhantes consistentes entre as áreas do produto.

**Resultado esperado:** as tarefas principais continuam compreensíveis e operáveis nos contextos de uso definidos para o projeto.

**Avaliação futura:** verificar fluxos em diferentes larguras de tela, realizar inspeções de acessibilidade e executar tarefas com teclado. Os critérios técnicos e resoluções de referência devem ser definidos antes da verificação final.

### OUX-008 — Orientar o acesso e o gerenciamento da conta

**Objetivo:** facilitar a entrada na plataforma e a utilização das funções pessoais, com compreensão dos requisitos de autenticação.

**Diretrizes de experiência:**

- Oferecer caminhos distinguíveis para **Entrar**, **Criar conta** e **Recuperar senha**.
- Informar os dados necessários e apresentar erros de preenchimento em contexto.
- Indicar processamento, sucesso e falha sem revelar dados sensíveis.
- Permitir identificar as opções de perfil e saída da conta.
- Explicar quando uma ação exige autenticação, preservando o contexto do usuário quando o fluxo permitir.

**Resultado esperado:** o professor consegue reconhecer o caminho adequado para acessar sua conta, recuperar o acesso e entender a situação de uma tentativa malsucedida.

**Avaliação futura:** observar tarefas de entrada, cadastro e recuperação com dados de teste, sem coletar senhas reais dos participantes. Os redirecionamentos e o acesso de visitantes ainda precisam ser confirmados.

### OUX-009 — Facilitar o uso dos materiais salvos

**Objetivo:** permitir que o professor guarde referências de interesse e as encontre novamente sem repetir a pesquisa.

**Diretrizes de experiência:**

- Tornar reconhecível a ação de favoritar ou desfavoritar.
- Comunicar o estado salvo de um material e o resultado da alteração.
- Apresentar a área de **Salvos** como uma lista pessoal, com acesso aos detalhes.
- Informar claramente quando a lista estiver vazia.
- Manter coerência entre o estado apresentado na Biblioteca, nos detalhes e em Salvos.

**Resultado esperado:** o professor entende quais materiais estão salvos, consegue retomá-los e pode removê-los sem dúvidas sobre o resultado.

**Avaliação futura:** propor tarefas de salvar, localizar e remover um material e observar se a mudança de estado é reconhecida.

### OUX-010 — Tornar a contribuição e o acompanhamento de materiais compreensíveis

**Objetivo:** permitir que o professor envie um recurso com segurança e compreenda que a submissão depende de revisão antes da publicação.

**Diretrizes de experiência:**

- Organizar o formulário de envio com rótulos e instruções compreensíveis.
- Sinalizar erros de preenchimento e problemas com o arquivo antes de declarar o envio concluído.
- Apresentar feedback de progresso, sucesso e falha no upload.
- Diferenciar claramente **material enviado** de **material publicado**.
- Permitir reconhecer a situação de submissões anteriores, conforme o fluxo de acompanhamento que será definido.
- Para responsáveis pela revisão, prever uma experiência restrita que permita compreender os dados submetidos e registrar decisões sem ambiguidades.

**Resultado esperado:** o professor conclui uma submissão válida e compreende o que acontecerá depois; um responsável autorizado entende quais materiais aguardam decisão.

**Avaliação futura:** observar tarefas de envio e interpretação de status. A experiência de revisão deve ser avaliada somente depois de sua estrutura e seus papéis serem especificados.

### OUX-011 — Facilitar a atualização do perfil

**Objetivo:** permitir que o professor reconheça e atualize suas informações de conta com confiança.

**Diretrizes de experiência:**

- Apresentar os dados de perfil de forma organizada.
- Diferenciar consulta, edição e confirmação de alterações.
- Comunicar requisitos e erros ao alterar foto, dados pessoais ou senha.
- Informar claramente se as alterações foram salvas.
- Proteger ações e informações que pertençam exclusivamente à conta do usuário.

**Resultado esperado:** o professor sabe quais dados pode editar e reconhece se uma alteração foi concluída.

**Avaliação futura:** observar tarefas de atualização com contas de teste e verificar a compreensão de erros e confirmações.

### OUX-012 — Tornar o compartilhamento básico previsível

**Objetivo:** oferecer uma forma simples e compreensível de copiar um endereço compartilhável.

**Diretrizes de experiência:**

- Identificar claramente a ação de copiar o link.
- Comunicar quando a cópia tiver sido concluída ou falhado.
- Deixar compreensível qual conteúdo ou página será compartilhado.
- Não sugerir acesso público irrestrito a um endereço que possua regras de permissão.

**Resultado esperado:** o professor sabe o que está compartilhando e reconhece o resultado da ação.

**Avaliação futura:** pedir que participantes copiem e identifiquem o destino de um link. O destino definitivo — página da plataforma, detalhes de material ou ambos — permanece pendente.

## 5. Princípios transversais de experiência

| Princípio | Aplicação esperada |
|---|---|
| **Clareza** | Rótulos, informações e ações devem ter significados reconhecíveis. |
| **Consistência** | Componentes e ações equivalentes devem se comportar de forma semelhante. |
| **Orientação** | A navegação deve permitir compreender onde o usuário está e como continuar ou retornar. |
| **Feedback** | Operações devem informar andamento, conclusão, erro ou indisponibilidade. |
| **Autonomia** | O professor decide quais recursos consultar, salvar e utilizar. |
| **Transparência** | A interface não deve prometer acesso ou publicação que não esteja disponível. |
| **Acessibilidade** | As funções essenciais devem considerar diferentes dispositivos e formas de interação. |
| **Fidelidade aos dados** | A interface deve refletir os dados cadastrados e não inventar informações ausentes. |

## 6. Relação entre objetivos e jornadas

| Jornada | Objetivos de UX |
|---|---|
| Conhecer a plataforma, entrar e recuperar acesso | OUX-008, OUX-006, OUX-007 |
| Explorar a Biblioteca | OUX-001, OUX-006, OUX-007 |
| Pesquisar e combinar filtros | OUX-002, OUX-003, OUX-006 |
| Consultar detalhes e acessar recursos | OUX-004, OUX-005 |
| Favoritar e consultar Salvos | OUX-009, OUX-006 |
| Enviar material e acompanhar análise | OUX-010, OUX-006 |
| Consultar e atualizar o perfil | OUX-011, OUX-008 |
| Copiar link compartilhável | OUX-012 |

Os objetivos se aplicam à experiência planejada para a primeira versão. Notificações completas, autenticação com Google e integrações diretas com redes sociais são possibilidades de evolução e não devem ser tratadas como fluxos funcionais já entregues.

## 7. Avaliação futura dos objetivos

A avaliação deve verificar se a experiência projetada permite realizar tarefas relevantes, e não apenas se as telas são visualmente coerentes.

**Abordagens possíveis:** inspeção heurística, revisão de acessibilidade, testes de navegação no protótipo e, posteriormente, testes de usabilidade na aplicação. A escolha do método depende de quais interações estarão realmente disponíveis em cada etapa.

| Aspecto | Evidência a observar |
|---|---|
| **Conclusão de tarefas** | Se o participante consegue alcançar o objetivo proposto. |
| **Dificuldades e erros** | Tentativas malsucedidas, desvios, dúvidas e necessidade de ajuda. |
| **Compreensão das informações** | Se entende filtros, classificações, estados e possibilidades de acesso. |
| **Clareza do feedback** | Se distingue progresso, sucesso, ausência de resultados e falha. |
| **Continuidade da navegação** | Se consegue retornar e retomar tarefas sem perder o contexto esperado. |
| **Acessibilidade e adaptação** | Se controles e informações permanecem operáveis nas condições avaliadas. |
| **Percepção de utilidade** | Comentários dos participantes sobre a pertinência da solução para suas tarefas. |

Antes de uma avaliação com usuários, deverão ser definidos participantes, cenários, tarefas, condições de teste, critérios de observação e registro de evidências. Metas numéricas não devem ser inventadas sem método ou justificativa.

## 8. Hipóteses e pontos a validar

**Hipóteses de experiência:**

- Uma Biblioteca organizada pode tornar a descoberta de materiais mais clara.
- Pesquisa e filtros podem ajudar professores a localizar recursos adequados aos seus contextos.
- Detalhes e classificações podem apoiar a avaliação inicial de um recurso.
- Favoritos podem facilitar a retomada de materiais de interesse.
- Feedback claro pode reduzir dúvidas durante a autenticação, o envio e a consulta aos recursos.

**Pontos de definição de UX:**

- Comportamento responsivo dos menus, filtros, formulários e sobreposições.
- Fechamento de filtros sem **Aplicar** e alcance da ação **Limpar**.
- Orientação e destino após autenticação, cadastro, recuperação de senha e ações protegidas.
- Posição do acompanhamento dos envios na navegação do professor.
- Organização da interface restrita de revisão e comunicação das decisões.
- Destino e apresentação do link compartilhável.
- Mensagens e tratamentos de erros e estados vazios nos fluxos principais.

Esses pontos devem ser definidos e avaliados conforme o desenvolvimento das interações. Não existem resultados de pesquisa com usuários que permitam considerá-los validados neste momento.

## 9. Documentos relacionados

- [`../product/product-brief.md`](../product/product-brief.md) — visão, problema e proposta de valor.
- [`../product/escopo-mvp.md`](../product/escopo-mvp.md) — funcionalidades e limites da primeira versão.
- [`../product/requisitos.md`](../product/requisitos.md) — requisitos funcionais e não funcionais.
- [`../product/historias-de-usuario.md`](../product/historias-de-usuario.md) — necessidades e critérios de aceitação.
- [`arquitetura-da-informacao.md`](arquitetura-da-informacao.md) — organização das áreas e informações.
- [`user-flow.md`](user-flow.md) — percursos e decisões de navegação.
- [`design-system.md`](design-system.md) — padrões visuais, componentes e estados.

Este documento orienta o desenho e a avaliação da experiência. A efetividade dos objetivos dependerá de verificação futura com fluxos executáveis e, quando possível, com professores reais.
