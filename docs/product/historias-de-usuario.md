# EduComp — Histórias de Usuário

**Versão:** 0.4  
**Status:** Consolidado para orientar o design do MVP  
**Referência:** `requisitos.md`

## 1. Objetivo

Este documento descreve as histórias de usuário do EduComp e seus respectivos critérios de aceitação.

As histórias representam os comportamentos esperados do Produto Mínimo Viável (MVP), considerando professores que procuram materiais educacionais para utilizar em suas aulas.

Os critérios de aceitação devem orientar a futura implementação e verificação das funcionalidades. Eles não representam evidências de que as funcionalidades já foram implementadas ou validadas com usuários reais.

## 2. Histórias de usuário

### US-001 — Visualizar catálogo de materiais

**História**

Como professor que procura materiais educacionais, quero visualizar o catálogo de materiais disponíveis para conhecer minhas opções de recursos para as aulas.

**Critérios de aceitação**

- [ ] O sistema apresenta os materiais cadastrados e disponíveis para consulta.
- [ ] Cada item do catálogo apresenta um título que permita identificar o material.
- [ ] Os itens apresentam as informações resumidas disponíveis para orientar a escolha do usuário.
- [ ] O usuário consegue selecionar um material para consultar seus detalhes.
- [ ] Quando não houver materiais cadastrados, o sistema apresenta uma mensagem informativa sobre o catálogo vazio.
- [ ] O catálogo vazio não é confundido com uma pesquisa que não encontrou correspondências.

**Requisito relacionado:** RF-001.

### US-002 — Pesquisar materiais por palavras-chave

**História**

Como professor que procura materiais educacionais, quero pesquisar por palavras-chave para encontrar recursos relacionados ao assunto que pretendo trabalhar em aula.

**Critérios de aceitação**

- [ ] O sistema permite informar uma palavra ou expressão para pesquisar materiais.
- [ ] A busca consulta os campos título, tipo de material, resumo e descrição.
- [ ] A busca não diferencia letras maiúsculas de minúsculas.
- [ ] A busca ignora diferenças de acentuação.
- [ ] A busca permite correspondências parciais. Por exemplo, pesquisar `geog` deve permitir encontrar materiais que contenham `geografia` em um dos campos pesquisáveis.
- [ ] Em uma consulta com várias palavras, todas as palavras devem corresponder aos campos pesquisáveis do material (AND), ainda que estejam em campos diferentes.
- [ ] Os resultados seguem a hierarquia fixa de campos: título, tipo de material, resumo e descrição.
- [ ] Em consultas com várias palavras, materiais que concentram mais palavras em campos de maior prioridade precedem materiais cuja correspondência depende de campos de menor prioridade. Por exemplo, para `frações atividades`, ambas as palavras no título precedem `frações` no título e `atividades` na descrição.
- [ ] Dentro do mesmo campo e em condições equivalentes, correspondências exatas precedem correspondências parciais; a prioridade do campo prevalece sobre a exatidão.
- [ ] Em empate de relevância, os resultados são ordenados pelo título em ordem alfabética crescente, ignorando caixa e acentuação; se os títulos forem equivalentes após a normalização, o identificador único em ordem crescente determina a ordem.
- [ ] Quando a pesquisa não encontra correspondências, o sistema apresenta uma mensagem informativa.
- [ ] Quando não houver resultados, o sistema informa a situação e permite que o usuário altere manualmente a consulta ou os filtros. (A sugestão automática de correção está fora do MVP.)
- [ ] Após visualizar os resultados, o usuário consegue modificar a consulta e realizar uma nova pesquisa.

**Requisitos relacionados:** RF-002, RF-003 e RF-005.

### US-003 — Filtrar materiais

**História**

Como professor que procura materiais educacionais, quero filtrar os materiais por características relevantes para localizar recursos mais adequados à minha necessidade.

**Critérios de aceitação**

- [ ] O sistema disponibiliza filtros por tipo de material e etapa de ensino.
- [ ] O filtro de tipo de material considera os tipos definidos para o catálogo inicial: Plano de aula, Slides, Material de apoio, Atividade, Avaliação e Projeto pedagógico.
- [ ] A aplicação de um filtro atualiza os materiais apresentados de acordo com o critério selecionado.
- [ ] O usuário consegue identificar quais filtros estão aplicados.
- [ ] O usuário consegue remover os filtros aplicados.
- [ ] Quando a combinação de filtros não encontra materiais, o sistema apresenta uma mensagem informativa.
- [ ] A ausência de resultados não é apresentada como se o catálogo estivesse vazio.
- [ ] As opções de tipo de material e etapa de ensino são derivadas dos valores existentes no catálogo.
- [ ] É possível selecionar várias opções dentro de cada filtro; as opções selecionadas no mesmo filtro combinam-se por OR.
- [ ] Tipo de material, etapa de ensino e busca textual combinam-se entre si por AND.
- [ ] As opções de cada filtro são atualizadas dinamicamente conforme os demais critérios ativos.
- [ ] Se uma opção selecionada se tornar incompatível com os demais critérios, a seleção é preservada e a opção fica desabilitada no controle, podendo ser removida pelo marcador de filtro ativo.
- [ ] Os filtros ativos são apresentados como marcadores removíveis, e cada marcador pode ser removido sem limpar os demais critérios.
- [ ] A ação “Limpar filtros” remove apenas os filtros de tipo e etapa de ensino e preserva o texto da busca.
- [ ] As opções são ordenadas alfabeticamente, sem distinção de caixa ou acentuação, e não exibem contagens individuais.
- [ ] Em telas maiores, os filtros são apresentados como listas visíveis com caixas de seleção.
- [ ] Em telas pequenas, “Filtros (N)” abre um painel lateral; N representa o total de valores selecionados nos filtros.
- [ ] O painel móvel contém seções independentes para tipo de material e etapa de ensino, ambas expandidas inicialmente, preservando a expansão e as seleções ao fechar e reabrir.
- [ ] O painel móvel pode ser fechado pelo controle de fechar, ao tocar fora ou pelo botão Voltar do dispositivo; com o painel aberto, Voltar fecha o painel.
- [ ] Não há busca interna nas opções dos filtros.
- [ ] Selecionar ou remover um filtro no painel móvel atualiza os resultados imediatamente e mantém o painel aberto.
- [ ] A contagem total de resultados aparece acima da lista e é atualizada quando a consulta muda; ela é distinta do contador de filtros selecionados.
- [ ] Ao alterar a busca ou os filtros, a lista retorna ao topo; ao voltar de um detalhe sem mudar os critérios, preserva a posição anterior.
- [ ] Durante a navegação atual, ao voltar de um material, são preservados texto de busca, filtros, posição da lista e estado de expansão das seções. Uma atualização da página pode reiniciar esse estado.
- [ ] Os resultados são carregados em lotes: inicialmente até 12 materiais e mais até 12 por acionamento de “Carregar mais”.
- [ ] Durante o carregamento, o controle exibe “Carregando...” desabilitado; quando houver mais resultados, volta a exibir “Carregar mais”.
- [ ] Se o carregamento falhar, a interface exibe “Não foi possível carregar mais materiais” e “Tentar novamente”, preservando os resultados já exibidos e tentando novamente o lote com falha, sem duplicações.
- [ ] Se busca ou filtros mudarem durante o carregamento, a solicitação anterior é invalidada e respostas tardias não são adicionadas à nova lista.

**Requisito relacionado:** RF-004.

**Pendências de especificação:** não há pendências funcionais conhecidas sobre seleção múltipla e combinação dos filtros. Permanecem pendentes a implementação futura e a validação dos critérios após a construção da interface.

### US-004 — Consultar detalhes de um material

**História**

Como professor que encontrou um material de interesse, quero consultar seus detalhes para avaliar se o recurso é adequado ao conteúdo e à etapa de ensino que pretendo trabalhar.

**Critérios de aceitação**

- [ ] O sistema apresenta o título do material consultado.
- [ ] O sistema apresenta as informações disponíveis e pertinentes ao material.
- [ ] Quando disponíveis, os detalhes incluem tipo de material, etapa de ensino, resumo e descrição.
- [ ] As informações de autoria, fonte e condições de uso são apresentadas quando estiverem disponíveis no cadastro.
- [ ] O usuário consegue identificar claramente qual material está consultando.
- [ ] A ausência de um campo opcional não é apresentada como se o material não existisse.
- [ ] As opções de acesso são apresentadas de acordo com os recursos efetivamente cadastrados.

**Requisito relacionado:** RF-006.

**Campos de cadastro definidos**

Obrigatórios: título, tipo de material, etapa de ensino, resumo e pelo menos uma forma de acesso (arquivo ou link). Um material pode conter múltiplos arquivos e múltiplos links externos, que podem coexistir no mesmo cadastro.

Opcionais disponíveis no modelo de dados: descrição detalhada, autor ou fonte, orientações de uso, componente curricular, habilidades da BNCC e licença e condições de uso. A ausência desses campos não impede o cadastro.

**Decisões confirmadas:** um material pode estar associado a múltiplos componentes curriculares e a múltiplas habilidades da BNCC. As habilidades da BNCC serão registradas em texto livre, digitado ou colado manualmente; não será exigido catálogo estruturado no MVP. Um material também pode estar associado a múltiplas etapas de ensino e a anos escolares específicos; o cadastro deve permitir selecionar múltiplas etapas e indicar os anos correspondentes, mantendo a associação entre ano e etapa.

**Pendências de especificação:** definir os detalhes de representação e validação técnica desses valores e quais campos podem ter preenchimento condicional.

### US-005 — Acessar um material por link externo

**História**

Como professor que encontrou um material disponibilizado em uma fonte externa, quero acessar o link correspondente para consultar ou utilizar o recurso na sua origem.

**Critérios de aceitação**

- [ ] Quando houver um ou mais links externos cadastrados, o sistema apresenta uma opção clara para acessar cada link.
- [ ] A opção direciona ao endereço associado ao material.
- [ ] O acesso externo é distinguido da consulta aos detalhes do material na plataforma.
- [ ] Quando não houver link externo, o sistema não apresenta um controle de acesso a um endereço inexistente.
- [ ] Quando uma falha de acesso puder ser identificada, o sistema apresenta o tratamento previsto para essa situação.

**Requisitos relacionados:** RF-007, RF-009 e RF-010.

### US-006 — Acessar um arquivo hospedado na plataforma

**História**

Como professor que encontrou um material disponibilizado em um arquivo hospedado na plataforma, quero acessar esse arquivo para consultar ou utilizar o recurso.

**Critérios de aceitação**

- [ ] Quando houver um arquivo hospedado e disponível, o sistema apresenta uma opção clara para acessá-lo.
- [ ] Cada arquivo associado ao material possui uma opção clara de acesso, sem substituir ou ocultar os demais arquivos.
- [ ] Quando não houver arquivo hospedado, o sistema não apresenta um controle de acesso a um arquivo inexistente.
- [ ] Quando uma falha de acesso puder ser identificada, o sistema apresenta o tratamento previsto para essa situação.

**Requisitos relacionados:** RF-008, RF-009 e RF-010.

**Pendência de especificação**

No MVP, são aceitos arquivos PDF, DOCX, PPTX, PNG e JPG, com limite máximo de 50 MB por arquivo. Permanecem pendentes o limite total combinado por cadastro, a quantidade máxima de arquivos por material e os detalhes técnicos de validação de cada formato.

### US-007 — Identificar as opções de acesso disponíveis

**História**

Como professor que consulta os detalhes de um material, quero identificar quais formas de acesso estão disponíveis para saber como posso chegar ao recurso.

**Critérios de aceitação**

- [ ] Quando houver somente um link externo, o sistema apresenta a opção de acesso ao link.
- [ ] Quando houver somente um arquivo hospedado, o sistema apresenta a opção de acesso ao arquivo.
- [ ] Quando houver link externo e arquivo hospedado, o sistema apresenta as duas opções.
- [ ] Se um registro preexistente ou incompleto não tiver link externo nem arquivo hospedado, o sistema informa que não há acesso direto disponível. O fluxo de cadastro de novos materiais deve impedir essa condição.
- [ ] A ausência de acesso direto não impede que o material seja apresentado no catálogo ou tenha seus detalhes consultados.
- [ ] O sistema não apresenta opções de acesso que não correspondam a recursos cadastrados.

**Requisito relacionado:** RF-009.

### US-008 — Receber informações sobre falhas de acesso

**História**

Como professor que tenta acessar um material, quero receber uma informação clara quando o acesso falhar para compreender a situação e saber como proceder.

**Critérios de aceitação**

- [ ] Quando uma falha de acesso puder ser identificada, o sistema apresenta uma mensagem compreensível.
- [ ] A mensagem distingue, quando possível, uma falha de acesso da ausência de um link ou arquivo no cadastro.
- [ ] O sistema não afirma que um recurso está indisponível sem que essa condição possa ser identificada.
- [ ] Uma falha de acesso não é apresentada como se o material tivesse sido removido do catálogo.
- [ ] A mensagem não deve indicar que o acesso foi bem-sucedido quando ocorrer uma falha identificada.

**Requisito relacionado:** RF-010.

**Pendência de especificação**

Ainda precisam ser definidos os mecanismos de detecção de falhas e o comportamento posterior, incluindo a possibilidade de tentar novamente.

## 3. Rastreabilidade entre histórias e requisitos

| História | Requisitos relacionados |
|---|---|
| US-001 — Visualizar catálogo | RF-001 |
| US-002 — Pesquisar materiais | RF-002, RF-003, RF-005 |
| US-003 — Filtrar materiais | RF-004 |
| US-004 — Consultar detalhes | RF-006 |
| US-005 — Acessar por link externo | RF-007, RF-009, RF-010 |
| US-006 — Acessar arquivo hospedado | RF-008, RF-009, RF-010 |
| US-007 — Identificar opções de acesso | RF-009 |
| US-008 — Tratar falhas de acesso | RF-010 |

A rastreabilidade deve ser mantida alinhada com `requisitos.md`, `backlog.md`, `arquitetura-da-informacao.md` e `user-flow.md`.

## 4. Relação com o MVP

As oito histórias deste documento fazem parte do escopo funcional previsto para o MVP:

- Visualização do catálogo.
- Pesquisa por palavras-chave.
- Ordenação dos resultados por relevância.
- Aplicação de filtros.
- Consulta aos detalhes dos materiais.
- Acesso por link externo.
- Acesso a arquivos hospedados.
- Identificação das opções de acesso e tratamento de falhas.

A inclusão dessas histórias no escopo não significa que as funcionalidades estejam implementadas. O projeto permanece em fase de revisão documental.

O envio de materiais, favoritos e compartilhamento por link também integram o MVP, conforme as histórias adicionais abaixo. Criação/edição/adaptação de conteúdo e pré-visualização integrada de arquivos permanecem fora do escopo.

## 5. Decisões confirmadas e pendências

### Decisões confirmadas

- O público prioritário são professores que procuram materiais para suas aulas.
- A busca consulta título, tipo de material, resumo e descrição.
- A busca ignora diferenças entre maiúsculas e minúsculas e entre palavras acentuadas e não acentuadas.
- A busca permite correspondências parciais e exige correspondência de todas as palavras da consulta (AND).
- A relevância segue hierarquia fixa de campos (título, tipo de material, resumo e descrição), exatidão dentro do mesmo campo e desempate alfabético normalizado pelo título, seguido do identificador único.
- Os filtros previstos são tipo de material e etapa de ensino; opções dentro de um mesmo filtro combinam-se por OR, enquanto filtros diferentes e busca textual combinam-se por AND.
- Limpar o texto da busca preserva os filtros. “Limpar filtros” remove os filtros de tipo e etapa de ensino, preservando o texto pesquisado.
- Os resultados são atualizados dinamicamente; os filtros ativos são identificáveis e removíveis individualmente.
- Um novo cadastro exige ao menos um arquivo hospedado e/ou um link externo; registros preexistentes ou incompletos podem não ter acesso direto, e essa condição deve ser informada claramente.
- A ausência de acesso direto não significa que o material esteja ausente do catálogo.
- O escopo atual não inclui pré-visualização, edição, adaptação ou envio de materiais pelos usuários.

### Pendências

- Avaliação técnica e escopo da sugestão de correção de consulta.
- Definição dos detalhes técnicos de representação e validação dos metadados, dos casos de preenchimento condicional e dos limites e validações dos arquivos.
- Limite total combinado por cadastro, quantidade máxima de arquivos por material e regras técnicas de validação dos arquivos.
- Detecção e tratamento de falhas de acesso.

As pendências devem ser acompanhadas no `backlog.md`. Uma decisão já confirmada não deve ser reaberta sem uma justificativa explícita.

## 6. Considerações metodológicas

As histórias e os critérios de aceitação descrevem comportamentos esperados para orientar etapas futuras do projeto.

O formulário de pesquisa inicialmente considerado foi abandonado. Dados simulados não devem ser apresentados como respostas reais, evidências empíricas ou validação das necessidades dos professores.

A implementação, os testes de qualidade e a avaliação com usuários reais pertencem a etapas futuras. Nenhuma história deve ser considerada validada apenas por estar documentada.

## 7. Documentos relacionados

- `README.md`
- `product-brief.md`
- `requisitos.md`
- `backlog.md`
- `arquitetura-da-informacao.md`
- `objetivos-de-ux.md`
- `user-flow.md`
- `design-system.md`


### Critérios de aceite — metadados educacionais (BK-006)
- [ ] O cadastro apresenta as subdivisões educacionais definidas para cada etapa do catálogo inicial.
- [ ] É possível associar mais de uma etapa/subdivisão ao mesmo material.
- [ ] A interface preserva a associação entre cada subdivisão e sua etapa de ensino.
- [ ] Para EJA — Ensino Médio, não é obrigatório selecionar uma série específica.


### Histórias adicionais aprovadas para o MVP

**US-009 — Enviar material para revisão**  
Como professor, quero preencher as informações de um material e anexar arquivos para submetê-lo à avaliação e possível inclusão no acervo.  
**Critérios de aceite:**
- O formulário valida os campos obrigatórios e os limites de arquivo definidos.
- O sistema confirma o recebimento do envio.
- O material fica com status “Pendente de revisão” e não aparece como publicado no catálogo antes da aprovação.
- O usuário recebe uma mensagem clara em caso de erro de validação ou falha no envio.

**US-010 — Favoritar material**  
Como usuário identificado, quero favoritar e desfavoritar um material para encontrá-lo novamente.  
**Critérios de aceite:**
- A ação de favoritar/desfavoritar é visível nos cartões e/ou detalhes.
- A lista de favoritos fica associada à conta do usuário e persiste entre sessões.
- A tela de favoritos apresenta estado vazio quando ainda não houver itens.

**US-011 — Compartilhar material por link**  
Como usuário, quero copiar o link direto de um material para compartilhá-lo com outras pessoas.  
**Critérios de aceite:**
- Existe uma ação para copiar o link direto.
- O sistema apresenta confirmação após copiar o link.
- O link abre os detalhes do material e respeita as regras normais de acesso.

**US-012 — Revisar material enviado**  
Como responsável pela moderação, quero aprovar ou rejeitar materiais enviados para garantir que somente materiais revisados sejam publicados.  
**Critérios de aceite:**
- A fila de revisão identifica materiais pendentes.
- O responsável pode aprovar ou rejeitar um envio.
- Somente materiais aprovados são publicados no catálogo.
- O status do envio é atualizado de forma rastreável.
