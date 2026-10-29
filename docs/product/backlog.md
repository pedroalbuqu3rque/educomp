# Backlog do EduComp

**Versão:** 0.6  
**Status:** Documentação funcional consolidada; próxima etapa: design no Figma  
**Última atualização:** 28 de outubro de 2026

## 1. Objetivo

Este documento organiza as tarefas necessárias para o desenvolvimento do EduComp, estabelecendo prioridades, entregáveis, dependências e critérios de conclusão.

O backlog acompanha a evolução do projeto desde a consolidação da documentação até as futuras etapas de prototipação, avaliação, implementação e verificação de qualidade.

As prioridades representam uma proposta de organização do trabalho e poderão ser ajustadas conforme as decisões do projeto.

## 2. Escopo atual

A documentação funcional do MVP foi consolidada nesta revisão. A próxima etapa é criar no Figma os wireframes e o protótipo da experiência de catálogo, busca, filtros, detalhes e acesso aos materiais.

O backlog continua vivo para acompanhar a execução, mas não é necessário resolver antecipadamente todas as decisões técnicas. Questões sem impacto no design ou na compreensão funcional podem ser detalhadas durante a implementação.

Não fazem parte da etapa atual:

- Implementação do sistema.
- Execução de testes de qualidade sobre uma aplicação implementada.
- Realização de pesquisas com usuários.
- Validação empírica das hipóteses com professores.
- Desenvolvimento de funcionalidades em produção.

Essas atividades poderão ser planejadas para etapas futuras. Sua inclusão no backlog não significa que tenham sido iniciadas ou concluídas.

## 3. Critérios de prioridade

| Prioridade | Significado |
|---|---|
| P0 | Necessário para consolidar a documentação e permitir o avanço organizado do projeto. |
| P1 | Necessário para esclarecer decisões e especificar o comportamento do produto. |
| P2 | Relacionado à organização da informação e à preparação da experiência de uso. |
| P3 | Atividades futuras de prototipação e avaliação. |
| P4 | Atividades futuras de implementação e verificação de qualidade. |

## 4. Backlog de tarefas

### P0 — Consolidação documental

#### BK-001 — Organizar e padronizar os documentos do projeto

**Status:** Concluído

**Descrição:** Revisar os documentos de produto e UX/UI, padronizando estrutura, terminologia, escopo e identificação de decisões.

**Entregáveis:**

- `README.md`
- `docs/product/product-brief.md`
- `docs/product/requisitos.md`
- `docs/product/historias-de-usuario.md`
- `docs/product/backlog.md`
- `docs/product/especificacao-funcional-bk-004-bk-005.md`
- `docs/ux-ui/arquitetura-da-informacao.md`
- `docs/ux-ui/design-system.md`
- `docs/ux-ui/objetivos-de-ux.md`
- `docs/ux-ui/user-flow.md`

**Critérios de conclusão:**

- Todos os documentos previstos estão presentes no repositório.
- Os nomes e caminhos dos arquivos estão corretos.
- A versão e o status dos documentos estão atualizados.
- As informações são consistentes entre os documentos.
- O escopo do MVP está descrito de maneira uniforme.
- As decisões confirmadas e as pendências estão diferenciadas.
- As mudanças revisadas foram efetivamente aplicadas ao repositório.
- A revisão final confirma que os documentos não apresentam contradições relevantes.

#### BK-002 — Verificar referências e links internos

**Status:** Concluído

**Descrição:** Conferir se os caminhos e as referências entre os documentos correspondem à estrutura real do repositório.

**Critérios de conclusão:**

- Os links internos apontam para arquivos existentes.
- Os caminhos documentados correspondem à estrutura do projeto.
- Não há referências a documentos inexistentes como se já estivessem disponíveis.
- O README e os documentos relacionados refletem a organização atual do repositório.
- As referências entre requisitos, histórias de usuário, arquitetura, fluxo e backlog estão corretas.
- A verificação é realizada sobre a versão efetivamente publicada no repositório.

#### BK-003 — Consolidar decisões, hipóteses e pendências

**Status:** Concluído

**Descrição:** Garantir que decisões confirmadas, hipóteses de trabalho e questões pendentes estejam claramente diferenciadas.

**Critérios de conclusão:**

- As funcionalidades previstas no MVP estão identificadas.
- As decisões confirmadas estão refletidas nos documentos pertinentes.
- As hipóteses não são apresentadas como fatos comprovados.
- As questões ainda não resolvidas estão registradas.
- Dados simulados não são apresentados como resultados de pesquisas reais.
- As pendências do backlog correspondem a questões que realmente continuam abertas.
- As tarefas não são consideradas concluídas apenas por terem sido documentadas.

### P1 — Especificação funcional do MVP

#### BK-004 — Consolidar a especificação da busca

**Status:** Concluído — sugestão automática de correção adiada para fora do MVP.

**Descrição:** Consolidar as regras da busca de materiais educacionais, alinhá-las aos requisitos e às histórias de usuário e avaliar a viabilidade técnica da sugestão de correção quando não houver resultados.

**Decisões já estabelecidas:**

- Campos pesquisáveis: título, tipo de material, resumo e descrição.
- A busca ignora diferenças entre letras maiúsculas e minúsculas e diferenças de acentuação.
- A busca aceita correspondências parciais.
- Em consultas com várias palavras, todas as palavras devem corresponder ao conteúdo pesquisável (AND), podendo aparecer em campos diferentes.
- A relevância segue uma hierarquia fixa de campos: título, tipo de material, resumo e descrição.
- Para várias palavras, materiais que concentram mais palavras em campos de maior prioridade devem aparecer antes dos que dependem de campos de menor prioridade. Exemplo: para `frações atividades`, ambas as palavras no título precedem `frações` no título e `atividades` na descrição.
- Dentro do mesmo campo e em condições equivalentes, correspondências exatas precedem correspondências parciais.
- A hierarquia do campo prevalece sobre a exatidão da correspondência.
- Em empate de relevância, ordenar pelo título em ordem alfabética crescente, normalizando caixa e acentuação; se os títulos forem equivalentes, ordenar pelo identificador único em ordem crescente.
- A busca textual e todos os filtros ativos devem ser atendidos (AND).
- Limpar o texto da busca mantém os filtros ativos.
- Quando não houver resultados, sugerir uma consulta corrigida sem alterar automaticamente a consulta original, condicionado à avaliação técnica.
- A ausência de resultados deve ser informada ao usuário, permitindo revisar a consulta ou os filtros.

**Pendências restantes:**

- A sugestão automática de correção de consulta foi adiada para fora do MVP.
- Os documentos relacionados foram alinhados e a regra de recuperação permite alteração manual da consulta e dos filtros.

**Critérios de conclusão:**

- As regras confirmadas estão registradas nos requisitos, histórias de usuário e documentos de UX/UI relacionados.
- A regra de comparação entre materiais com palavras distribuídas em campos diferentes está documentada com exemplos.
- A sugestão de correção foi avaliada tecnicamente e seu escopo foi definido, ou explicitamente adiada para uma etapa posterior.
- A interação entre busca e filtros está alinhada à BK-005.
- Os documentos relacionados não apresentam regras contraditórias.
- A ausência de resultados distingue-se do estado de catálogo vazio.

#### BK-005 — Especificar os filtros

**Status:** Concluído

**Descrição:** Especificar o comportamento dos filtros de tipo de material e etapa de ensino, incluindo combinação com a busca textual, estados sem resultados, comportamento responsivo, preservação do estado e carregamento progressivo dos resultados.

**Decisões já estabelecidas:**

- Os filtros do MVP são tipo de material e etapa de ensino.
- As opções de tipo de material são derivadas dos tipos existentes no catálogo.
- As opções de etapa de ensino são derivadas das etapas existentes no catálogo.
- É possível selecionar várias opções em cada filtro. Opções selecionadas dentro do mesmo filtro combinam-se por OR.
- Filtros diferentes e busca textual combinam-se por AND.
- As opções de cada filtro são atualizadas dinamicamente conforme os demais filtros ativos.
- Se uma opção selecionada se tornar incompatível com os demais critérios, a seleção é preservada e a opção fica desabilitada no controle, permitindo sua remoção pelo marcador de filtro ativo.
- Quando não houver resultados, exibir “Não foram encontrados materiais para os critérios escolhidos” e a ação “Limpar filtros”.
- “Limpar filtros” remove apenas os filtros de tipo e etapa de ensino; não apaga o texto da busca.
- Cada filtro ativo pode ser removido individualmente, sem alterar os demais critérios.
- As opções são ordenadas alfabeticamente, sem distinção de maiúsculas, minúsculas ou acentuação, e não exibem contagens individuais.
- Em telas maiores, os controles são listas diretamente visíveis com caixas de seleção.
- Em telas pequenas, o botão “Filtros (N)” abre um painel lateral sobre o catálogo. N representa o total de valores selecionados nos filtros de tipo e etapa, não a quantidade de resultados.
- O painel móvel possui seções independentes e expansíveis para “Tipo de material” e “Etapa de ensino”; ambas começam expandidas. O estado de expansão/recolhimento é preservado ao fechar e reabrir o painel.
- O painel móvel pode ser fechado pelo botão X/Fechar, ao tocar fora dele ou pelo botão Voltar do dispositivo. Quando o painel estiver aberto, o botão Voltar fecha o painel em vez de sair da página. Fechar e reabrir preserva as seleções.
- Não há busca interna nas listas de opções dos filtros.
- Ao selecionar ou remover filtros no painel móvel, ele permanece aberto e os resultados são atualizados imediatamente, sem botão “Aplicar”.
- Cada filtro ativo é mostrado como marcador removível acima dos resultados, abaixo da busca e dos controles. No celular, os marcadores quebram em várias linhas e permanecem fora do painel lateral.
- A contagem total de resultados é exibida acima da lista e atualizada após alterações na busca ou nos filtros. Essa contagem é distinta do contador “Filtros (N)”.
- Busca textual e filtros atualizam os resultados automaticamente; a busca textual utiliza uma breve pausa após a digitação, sem exigir Enter ou botão. O tempo exato de espera é detalhe de implementação.
- Ao alterar a busca ou os filtros, a lista retorna ao topo. Ao abrir um material e voltar sem alterar os critérios, a posição anterior da lista é preservada.
- Ao abrir um material e retornar ao catálogo, preservar durante a navegação atual o texto de busca, filtros selecionados, posição de rolagem e estado de expansão das seções. Uma atualização da página pode reiniciar esse estado.
- Os resultados são carregados progressivamente por meio de “Carregar mais”: mostrar inicialmente até 12 materiais e acrescentar até 12 por acionamento. Ocultar o botão quando todos os resultados tiverem sido carregados.
- Durante o carregamento, substituir temporariamente o botão por “Carregando...” desabilitado. Se ainda houver resultados após a conclusão, voltar a exibir “Carregar mais”.
- Se o carregamento de mais resultados falhar, exibir “Não foi possível carregar mais materiais” e “Tentar novamente”, preservando os materiais já apresentados. A nova tentativa deve repetir o lote que falhou, sem reiniciar a lista nem duplicar materiais.
- Se a busca ou os filtros mudarem durante o carregamento, invalidar a solicitação anterior, aplicar os novos critérios e reiniciar a lista com os primeiros 12 resultados. Respostas tardias de solicitações antigas não podem ser adicionadas à lista atual.

**Critérios de conclusão:**

- As regras de combinação, seleção, remoção e atualização dinâmica dos filtros estão documentadas.
- O comportamento responsivo, incluindo painel móvel e seus mecanismos de fechamento, está especificado.
- Os estados sem resultados e os marcadores de filtros ativos estão definidos.
- A interação entre busca, filtros, ordenação, contagem de resultados e carregamento progressivo está descrita.
- As regras de preservação de estado e de invalidação de solicitações antigas estão documentadas.
- Os requisitos, as histórias de usuário, a arquitetura da informação e os fluxos estão alinhados à especificação funcional.
- A especificação funcional está registrada em `docs/product/especificacao-funcional-bk-004-bk-005.md`.
- Os critérios de aceitação correspondentes são verificáveis e não apresentam contradições entre documentos.

#### BK-006 — Definir os metadados dos materiais

**Status:** Concluído no nível funcional; limites adicionais e validações técnicas serão tratados durante a implementação.

**Descrição:** Determinar quais informações serão necessárias para descrever, organizar, localizar e disponibilizar cada material educacional.

**Campos já previstos:**

- Título.
- Tipo de material.
- Etapa de ensino.
- Resumo.
- Descrição.
- Link externo, quando disponível.
- Arquivo hospedado na plataforma, quando disponível.

**Decisão confirmada — tipos de material do catálogo inicial:**

1. Plano de aula.
2. Slides.
3. Material de apoio.
4. Atividade.
5. Avaliação.
6. Projeto pedagógico.

A lista representa os tipos previstos para o catálogo inicial do MVP. 
**Decisão confirmada — campos obrigatórios:**

Todo material cadastrado deverá informar:

- **Título**.
- **Tipo de material**.
- **Etapa de ensino**.
- **Resumo**.
- **Arquivo ou link de acesso:** pelo menos uma das duas formas de acesso deverá estar disponível. Poderão ser aceitos arquivo e link simultaneamente; a regra de validação deve impedir o cadastro sem nenhum dos dois.

**Decisão confirmada — campos opcionais disponíveis no modelo de dados:**

- **Descrição detalhada:** explica o conteúdo, os objetivos e a finalidade do material.
- **Autor ou fonte:** identifica quem produziu o material ou sua origem.
- **Orientações de uso:** sugere como o professor pode utilizar ou adaptar o recurso.
- **Componente curricular:** identifica o componente curricular relacionado, quando aplicável.
- **Habilidades da BNCC:** relaciona o material às habilidades curriculares correspondentes, quando aplicável.
- **Licença e condições de uso:** registra permissões, restrições e atribuição de autoria.

Esses campos devem existir no modelo de dados, mas não são obrigatórios para o cadastro. A ausência de um campo opcional não deve impedir o cadastro nem ser tratada como erro.

**Decisão confirmada — cardinalidade dos metadados:**

- **Componente curricular:** um material pode estar associado a múltiplos componentes curriculares.
- **Habilidades da BNCC:** um material pode estar associado a múltiplas habilidades da BNCC.

Essa cardinalidade permite representar materiais interdisciplinares e materiais relacionados a mais de uma habilidade.
- **Etapa de ensino e ano escolar:** o cadastro deverá permitir associar um material a múltiplas etapas de ensino e registrar os anos escolares específicos atendidos. A estrutura deve representar a relação entre etapa e ano escolar, e os dados devem ser considerados na busca e nos filtros conforme o escopo de filtragem definido.

**Decisão confirmada — preenchimento das habilidades da BNCC:** as habilidades serão informadas por texto livre, digitado ou colado manualmente. Não será exigido um catálogo estruturado ou seletor de habilidades oficiais no escopo definido até aqui. A validação técnica do formato do texto e eventuais melhorias futuras permanecem pendentes.

**Decisão confirmada — etapas de ensino do catálogo inicial:**

- Educação Infantil.
- Ensino Fundamental — Anos Iniciais.
- Ensino Fundamental — Anos Finais.
- Ensino Médio.
- Educação de Jovens e Adultos (EJA).

Não faz parte da lista inicial confirmada, por enquanto, a Educação Profissional e Técnica como etapa/categoria independente.

**Decisão confirmada — anos e subdivisões do catálogo inicial:**

- **Educação Infantil:** grupos da BNCC — Bebês, Crianças bem pequenas e Crianças pequenas.
- **Ensino Fundamental — Anos Iniciais:** 1º, 2º, 3º, 4º e 5º anos.
- **Ensino Fundamental — Anos Finais:** 6º, 7º, 8º e 9º anos.
- **Ensino Médio:** 1ª, 2ª e 3ª séries.
- **EJA — Ensino Fundamental:** 1º e 2º segmentos.
- **EJA — Ensino Médio:** modalidade sem exigir seleção de série específica.

O modelo de dados e a interface devem preservar a relação entre etapa e subdivisão, permitir múltiplas seleções por material e não exigir série para EJA — Ensino Médio. Permanecem pendentes os detalhes técnicos de representação e validação e as regras de preenchimento condicional.

**Critérios de conclusão:**

- Os campos obrigatórios e opcionais confirmados estão registrados.
- O cadastro permite associar múltiplas etapas de ensino e especificar as subdivisões correspondentes, mantendo a relação entre cada etapa e suas subdivisões.
- As opções do catálogo inicial correspondem às subdivisões educacionais confirmadas.
- Para EJA — Ensino Médio, não é exigida a seleção de série específica.
- As regras para materiais com informações incompletas estão documentadas.
- As informações de autoria, origem e condições de uso foram consideradas.
- Os metadados estão alinhados à arquitetura da informação.
- Os campos utilizados pela busca correspondem às definições funcionais.
- Os requisitos e as histórias de usuário refletem os campos definidos.
- Os formatos aceitos e o limite individual por arquivo estão documentados.
- A especificação funcional do BK-006 está registrada em `docs/product/especificacao-funcional-bk-006-metadados.md` e alinhada aos documentos relacionados.

**Decisão confirmada — cardinalidade das formas de acesso:** cada material poderá ter múltiplos arquivos hospedados e múltiplos links externos, podendo combinar as duas formas no mesmo cadastro. A regra de cadastro continua exigindo pelo menos uma forma de acesso: um ou mais arquivos ou um ou mais links.

**Decisão confirmada — formatos de arquivo aceitos no MVP:** PDF, DOCX, PPTX, PNG e JPG. Essa lista se aplica aos arquivos enviados/hospedados na plataforma; links externos podem apontar para recursos em outros formatos.

**Decisão confirmada — tamanho máximo por arquivo:** cada arquivo hospedado poderá ter até **50 MB**. Esse limite é aplicado individualmente a cada arquivo, não à soma de todos os arquivos de um material. O limite total por cadastro, a quantidade máxima de arquivos por material e as regras técnicas de validação, verificação de conteúdo e política de segurança permanecem pendentes.

**Referência de especificação:** as definições funcionais consolidadas deste item estão detalhadas em `docs/product/especificacao-funcional-bk-006-metadados.md`. A documentação define o comportamento esperado, sem pressupor implementação concluída.

#### BK-007 — Consolidar as regras de acesso aos materiais

**Status:** Concluído no nível funcional; tratamento técnico de falhas será detalhado durante a implementação.

**Descrição:** Especificar como a plataforma apresentará as formas de acesso aos materiais e como tratará situações em que o acesso não esteja disponível.

**Cenários estabelecidos:**

1. Material disponível por link externo, sem arquivo hospedado.
2. Material disponível por arquivo hospedado, sem link externo.
3. Material disponível por link externo e arquivo hospedado.
4. Material sem link externo ou arquivo hospedado disponível.

**Pendências técnicas para implementação:**

- Definir limite total combinado de armazenamento por material/cadastro e quantidade máxima de arquivos.
- Definir como serão apresentados arquivos indisponíveis ou inválidos.
- Como serão tratadas falhas ao abrir um link externo?
- Como serão detectadas as falhas de acesso que a plataforma conseguir identificar?
- Quais informações de autoria, origem e uso deverão acompanhar cada material?

**Critérios de conclusão:**

- Os quatro cenários estão especificados.
- As ações disponíveis em cada cenário estão descritas.
- As mensagens de ausência de acesso e de falha estão documentadas.
- A diferença entre ausência de acesso direto e ausência do material no catálogo está explícita.
- Os requisitos, as histórias de usuário, a arquitetura e os fluxos representam os cenários corretamente.
- A interface não apresenta ações de acesso que não estejam disponíveis.

### P2 — Preparação da experiência de uso

#### BK-008 — Revisar a arquitetura da informação

**Status:** Concluído

**Descrição:** Conferir a organização das páginas, os elementos de navegação e as informações apresentadas em cada etapa da experiência.

**Critérios de conclusão:**

- A estrutura contempla catálogo, resultados e detalhes do material.
- A busca e os filtros estão representados.
- Os estados sem resultados e sem materiais cadastrados estão previstos separadamente.
- Os quatro cenários de acesso estão representados.
- As informações dos materiais estão alinhadas aos metadados definidos.
- As falhas de acesso estão diferenciadas da ausência de acesso direto.
- A arquitetura está consistente com os requisitos e as histórias de usuário.

#### BK-009 — Revisar o fluxo principal do usuário

**Status:** Concluído

**Descrição:** Consolidar o fluxo desde a entrada na plataforma até a localização, consulta e tentativa de acesso a um material.

**Critérios de conclusão:**

- O fluxo contempla catálogo, busca e filtros.
- Os caminhos com resultados e sem resultados estão representados.
- A consulta aos detalhes do material está prevista.
- Os cenários de link externo, arquivo hospedado, ambos e ausência de acesso estão contemplados.
- As situações de falha de acesso estão documentadas.
- As decisões pendentes estão identificadas.
- O fluxo está alinhado aos requisitos e às histórias de usuário.

#### BK-010 — Consolidar as diretrizes visuais

**Status:** Próxima etapa — revisar e aplicar no Figma

**Descrição:** Organizar as diretrizes iniciais do design system e identificar os elementos visuais que ainda precisam ser definidos ou validados.

**Critérios de conclusão:**

- A proposta visual está documentada.
- Cores, tipografia, espaçamentos e componentes estão organizados.
- Os valores ainda não confirmados estão identificados como provisórios.
- Os estados de interface relevantes estão previstos.
- As diretrizes de acessibilidade e responsividade estão registradas.
- A documentação visual é consistente com os objetivos de UX.

### P3 — Prototipação e avaliação futura

As tarefas desta seção estão previstas para etapas posteriores à consolidação documental.

#### BK-011 — Criar wireframes do MVP

**Status:** Próxima etapa

**Descrição:** Elaborar representações estruturais das principais telas, sem exigir a implementação do sistema.

**Telas previstas:**

- Catálogo inicial.
- Resultados da busca.
- Resultados com filtros aplicados.
- Detalhes do material.
- Estado sem resultados.
- Estado sem materiais cadastrados.
- Estado sem acesso direto disponível.
- Situação de falha de acesso.

**Critérios de conclusão:**

- As telas principais estão representadas.
- Os wireframes correspondem aos requisitos e fluxos documentados.
- Os estados alternativos relevantes estão contemplados.
- A navegação entre as telas está representada.
- As decisões ainda pendentes não são tratadas como definitivas.

#### BK-012 — Desenvolver o protótipo visual

**Status:** Após a revisão dos wireframes

**Descrição:** Aplicar as diretrizes visuais aos wireframes e elaborar um protótipo navegável para representar a experiência planejada.

**Critérios de conclusão:**

- O protótipo representa o fluxo principal do MVP.
- Os componentes seguem as diretrizes visuais definidas.
- Os estados alternativos relevantes estão representados.
- A navegação entre as telas pode ser demonstrada.
- As decisões visuais ainda provisórias estão identificadas.

#### BK-013 — Planejar uma avaliação com professores

**Status:** Planejado para etapa futura

**Descrição:** Planejar uma avaliação da experiência de uso com professores, público prioritário do EduComp.

**Critérios de conclusão:**

- Os objetivos da avaliação estão definidos.
- As tarefas a serem realizadas pelos participantes estão descritas.
- Os critérios de observação e análise estão documentados.
- O método de recrutamento e os cuidados com os dados estão considerados.
- As limitações da avaliação estão previstas.
- Os resultados serão registrados somente após a coleta e análise de dados reais.

O planejamento desta tarefa não significa que uma avaliação já tenha sido realizada.

### P4 — Implementação e qualidade futuras

#### BK-014 — Planejar a implementação do MVP

**Status:** Planejado para etapa futura

**Descrição:** Transformar os requisitos aprovados em tarefas técnicas de implementação.

**Critérios de conclusão:**

- As funcionalidades do MVP estão suficientemente especificadas.
- As decisões técnicas necessárias estão registradas.
- As tarefas de implementação possuem escopo e critérios de aceitação.
- As dependências técnicas estão identificadas.
- As limitações conhecidas estão documentadas.

#### BK-015 — Planejar a verificação de qualidade

**Status:** Planejado para etapa futura

**Descrição:** Definir como será verificado o funcionamento das funcionalidades após sua implementação.

**Aspectos a considerar:**

- Busca e ordenação por relevância.
- Tratamento de maiúsculas, minúsculas, acentuação e correspondências parciais.
- Combinação entre busca e filtros.
- Navegação entre catálogo, resultados e detalhes.
- Acesso por links externos.
- Acesso a arquivos hospedados.
- Estados vazios e mensagens de erro.
- Responsividade e acessibilidade.

**Critérios de conclusão:**

- Os cenários de verificação estão documentados.
- Cada cenário possui um resultado esperado.
- Os critérios de aceitação são verificáveis.
- As verificações de software serão executadas somente quando houver uma implementação disponível.

## 5. Ordem recomendada de execução

A sequência proposta para orientar o andamento do projeto é:

1. Criar os wireframes do catálogo, busca, filtros, detalhes e estados alternativos no Figma.
2. Revisar os wireframes e aplicar as diretrizes visuais para formar um protótipo navegável.
3. Validar a coerência do protótipo com os requisitos e histórias de usuário.
4. Planejar uma avaliação com professores, se houver condições para realizá-la.
5. Planejar a implementação e a verificação de qualidade após a validação do design.

A ordem poderá ser ajustada quando uma atividade depender de decisões ou recursos ainda indisponíveis.

## 6. Controle de andamento

O backlog deverá ser atualizado conforme as tarefas forem iniciadas, concluídas, bloqueadas ou replanejadas.

Os status utilizados são:

- **Pendente:** tarefa identificada, mas ainda não iniciada.
- **Em andamento:** tarefa em execução.
- **Concluído:** tarefa finalizada, com os critérios de conclusão atendidos.
- **Bloqueado:** tarefa que depende de uma decisão, recurso ou atividade anterior.
- **Planejado para etapa futura:** atividade reconhecida, mas que não pertence à fase atual.

Uma tarefa não deverá ser marcada como concluída apenas por ter sido descrita ou revisada documentalmente. A conclusão exige que os critérios correspondentes tenham sido efetivamente atendidos.

Os status deste documento são referências de organização e devem ser conferidos com o andamento real do trabalho antes de cada atualização.

## 7. Considerações metodológicas

O EduComp encontra-se em uma etapa de organização e revisão documental. A documentação define o comportamento pretendido do produto, mas não comprova que as funcionalidades foram implementadas ou que as hipóteses de produto foram validadas.

Um formulário de pesquisa foi considerado anteriormente, mas sua aplicação foi abandonada. Portanto, dados simulados não devem ser tratados como respostas reais, evidências empíricas ou validação das necessidades dos professores.

As futuras atividades de avaliação deverão distinguir claramente o planejamento metodológico, a coleta de dados e os resultados efetivamente obtidos.

## 8. Documentos relacionados

- `README.md`
- `docs/product/product-brief.md`
- `docs/product/requisitos.md`
- `docs/product/historias-de-usuario.md`
- `docs/product/backlog.md`
- `docs/product/especificacao-funcional-bk-004-bk-005.md`
- `docs/ux-ui/arquitetura-da-informacao.md`
- `docs/ux-ui/design-system.md`
- `docs/ux-ui/objetivos-de-ux.md`
- `docs/ux-ui/user-flow.md`

As mudanças de escopo ou de comportamento do produto devem ser refletidas nos documentos relacionados, evitando contradições e mantendo a rastreabilidade das decisões.


### P2 — Funcionalidades de contribuição e retenção aprovadas

#### BK-007 — Implementar envio e moderação de materiais
**Status:** A fazer  
**Descrição:** Permitir que professores submetam materiais por formulário e upload, com validação e estado pendente de revisão.
**Critérios de aceite:**
- Validar metadados obrigatórios, tipos e tamanho dos arquivos.
- Registrar submissões como pendentes.
- Disponibilizar fluxo de aprovação/rejeição para responsável autorizado.
- Publicar no catálogo somente após aprovação.
- Tratar erros e apresentar confirmação de envio.

#### BK-008 — Implementar favoritos persistentes
**Status:** A fazer  
**Descrição:** Permitir favoritar/desfavoritar materiais e consultar a lista pessoal associada à conta.
**Critérios de aceite:**
- A lista persiste entre sessões.
- A interface contempla estados com e sem favoritos.
- A ação funciona nos cartões e/ou detalhes do material.

#### BK-009 — Implementar compartilhamento por link
**Status:** A fazer  
**Descrição:** Permitir copiar o link direto para os detalhes de um material.
**Critérios de aceite:**
- O link direciona para o material correto.
- A interface confirma a cópia.
- O acesso segue as regras normais da plataforma.

#### BK-010 — Definir autenticação e permissões mínimas
**Status:** A fazer  
**Descrição:** Definir os perfis e controles de acesso necessários para envio, moderação e persistência de favoritos.
**Critérios de aceite:**
- Usuário identificado pode enviar e gerir os próprios favoritos.
- Apenas responsável autorizado pode aprovar/rejeitar materiais.
- A solução e suas implicações de privacidade estão documentadas.
