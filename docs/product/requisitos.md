# EduComp — Requisitos do Produto

**Versão:** 0.4  
**Status:** Consolidado para orientar o design do MVP  
**Referência:** `product-brief.md`

## 1. Objetivo

Este documento define os requisitos funcionais e não funcionais do EduComp, com foco na descoberta, consulta e acesso a materiais educacionais.

O público prioritário são professores que procuram recursos para utilizar em suas aulas.

Os requisitos representam o comportamento previsto para o Produto Mínimo Viável (MVP). A implementação e a avaliação com usuários reais estão previstas para etapas futuras.

## 2. Requisitos funcionais

### RF-001 — Exibir catálogo de materiais

O sistema deve apresentar um catálogo de materiais educacionais previamente cadastrados.

**Critérios:**
- Cada material deve apresentar informações que permitam identificá-lo.
- O catálogo deve permitir que o usuário selecione um material para consultar seus detalhes.
- Quando não houver materiais cadastrados, o sistema deve apresentar um estado vazio informativo.

### RF-002 — Pesquisar materiais por palavras-chave

O sistema deve permitir que o usuário pesquise materiais educacionais por meio de palavras-chave.

A busca deve consultar os seguintes campos:
- Título.
- Tipo de material.
- Resumo.
- Descrição.

**Regras funcionais confirmadas:**

1. A busca não deve diferenciar letras maiúsculas de minúsculas. Por exemplo, `Geografia` e `geografia` devem produzir correspondências equivalentes.
2. A busca deve ignorar diferenças de acentuação. Por exemplo, pesquisar `historia` deve permitir encontrar materiais que contenham `história`, e vice-versa.
3. A busca deve permitir correspondências parciais. Por exemplo, pesquisar `geog` deve permitir encontrar materiais que contenham `geografia` em um dos campos pesquisáveis.
4. Em consultas com várias palavras, todas as palavras devem corresponder ao conteúdo pesquisável (AND). As palavras podem aparecer em campos diferentes do mesmo material.
5. Os resultados devem ser ordenados conforme as regras determinísticas do RF-003.
6. A busca deve considerar os dados disponíveis nos campos pesquisáveis de cada material.

Essas regras representam a especificação prevista para o MVP e não significam que a busca já esteja implementada.

### RF-003 — Ordenar resultados por relevância

O sistema deve ordenar os materiais encontrados conforme uma hierarquia fixa de relevância, sem pontuação numérica ponderada.

A prioridade dos campos deve seguir esta ordem:

1. **Título:** maior prioridade.
2. **Tipo de material:** segunda prioridade.
3. **Resumo:** terceira prioridade.
4. **Descrição:** quarta prioridade.

A ordenação deve obedecer às seguintes regras:

1. Primeiro, comparar a prioridade do campo em que as palavras pesquisadas correspondem. Correspondências no título prevalecem sobre correspondências no tipo de material, que prevalecem sobre resumo e descrição.
2. Para consultas com várias palavras, comparar a quantidade de palavras correspondentes em cada campo na ordem de prioridade, como uma sequência lexicográfica: primeiro comparar quantas palavras correspondem no título; em caso de empate, comparar o tipo de material; depois o resumo e, por último, a descrição. Exemplo: para `frações atividades`, um material com ambas as palavras no título deve preceder um material com `frações` no título e `atividades` apenas na descrição.
3. Dentro do mesmo campo e em condições equivalentes de correspondência, uma correspondência exata do termo tem prioridade sobre uma correspondência parcial.
4. Se os resultados continuarem equivalentes em relevância, ordenar pelo título em ordem alfabética crescente, ignorando diferenças de caixa e acentuação.
5. Se os títulos forem equivalentes após a normalização, ordenar pelo identificador único do material em ordem crescente.

A hierarquia do campo prevalece sobre a exatidão: uma correspondência parcial no título não é superada por uma correspondência exata encontrada apenas na descrição. A comparação da distribuição das palavras deve seguir a hierarquia dos campos e não usar pesos numéricos arbitrários.

### RF-004 — Filtrar materiais

O sistema deve permitir a aplicação de filtros para refinar os materiais apresentados no catálogo.

Os filtros previstos para o MVP são:
- Tipo de material.
- Etapa de ensino.

**Tipos de material definidos para o catálogo inicial:**
- Plano de aula.
- Slides.
- Material de apoio.
- Atividade.
- Avaliação.
- Projeto pedagógico.

As opções exibidas no filtro de tipo de material devem refletir os tipos existentes no catálogo. 
**Regras funcionais confirmadas para a interação com a busca e os filtros:**
- A busca textual e todos os filtros ativos devem ser atendidos simultaneamente (AND).
- Ao limpar o texto da busca, os filtros selecionados devem permanecer ativos; a listagem deve ser atualizada para refletir somente esses filtros.
- É possível selecionar várias opções dentro de cada filtro; opções do mesmo filtro combinam-se por OR.
- As opções disponíveis são derivadas dos valores existentes no catálogo e atualizadas dinamicamente conforme os demais critérios ativos.
- O usuário consegue remover filtros individualmente ou limpar os filtros de tipo e etapa de ensino sem apagar o texto da busca.

### RF-005 — Informar ausência de resultados

Quando uma busca ou combinação de filtros não encontrar materiais correspondentes, o sistema deve apresentar uma mensagem informativa e permitir que o usuário revise manualmente os termos pesquisados ou altere os filtros. A sugestão automática de correção de consulta não faz parte do MVP.

A ausência de resultados não deve ser confundida com um catálogo vazio: o catálogo vazio ocorre quando não existem materiais cadastrados, enquanto a ausência de resultados ocorre quando existem materiais, mas nenhum corresponde aos critérios da consulta.

### RF-006 — Exibir detalhes do material

O sistema deve apresentar informações que permitam ao usuário identificar e avaliar um material educacional.

Conforme os dados disponíveis, os detalhes poderão incluir:
- Título.
- Tipo de material.
- Etapa de ensino.
- Resumo.
- Descrição.
- Instruções de utilização.
- Autor ou fonte.
- Informações de autoria e licença, quando aplicáveis.
- Link externo para acesso.
- Arquivo hospedado na própria plataforma.

**Campos obrigatórios confirmados para o cadastro:** título, tipo de material, etapa de ensino, resumo e arquivo ou link de acesso. Para o acesso, é obrigatório informar pelo menos um entre arquivo hospedado e link externo; os dois podem estar presentes. Cada material pode ter múltiplos arquivos hospedados e múltiplos links externos, em qualquer combinação, desde que exista pelo menos uma forma de acesso.

**Cardinalidade e granularidade confirmadas:** cada material pode estar associado a múltiplas etapas de ensino e a anos escolares específicos. O cadastro deve permitir selecionar etapas e indicar os anos escolares correspondentes, mantendo a relação entre cada ano e sua etapa. A implementação deve considerar essa estrutura na representação dos dados; o uso dos anos como filtro ainda depende da definição do escopo de filtros do MVP. Cada material também pode ter múltiplos componentes curriculares e múltiplas habilidades da BNCC.
As etapas e subdivisões disponíveis no catálogo inicial são: Educação Infantil (grupos da BNCC: Bebês, Crianças bem pequenas e Crianças pequenas); Ensino Fundamental — Anos Iniciais (1º ao 5º ano); Ensino Fundamental — Anos Finais (6º ao 9º ano); Ensino Médio (1ª à 3ª série); EJA — Ensino Fundamental (1º e 2º segmentos); e EJA — Ensino Médio (modalidade sem exigir série específica). O cadastro deve preservar a relação entre cada etapa e suas subdivisões e permitir múltiplas combinações por material.

Os campos opcionais confirmados são descrição detalhada, autor ou fonte, orientações de uso, componente curricular, habilidades da BNCC e licença e condições de uso. Componente curricular e habilidades da BNCC aceitam múltiplos valores. As habilidades da BNCC são registradas por texto livre, sem catálogo estruturado no MVP. Os formatos aceitos para arquivos hospedados são PDF, DOCX, PPTX, PNG e JPG, com limite individual de 50 MB por arquivo. Permanecem pendentes o limite total combinado por cadastro, a quantidade máxima de arquivos por material e os detalhes técnicos de validação.

A ausência de informações opcionais não deve ser apresentada como se o material não existisse.

### RF-007 — Permitir acesso por link externo

Quando um material possuir um ou mais links externos, o sistema deve apresentar opções claras para acessar cada recurso na fonte correspondente. Um material pode ter múltiplos links e múltiplos arquivos hospedados simultaneamente.

O acesso deverá direcionar o usuário ao endereço associado ao material.

A plataforma deve distinguir o acesso ao recurso externo das informações apresentadas na página de detalhes.

Quando não houver link externo disponível, o sistema não deve apresentar uma opção de acesso a um endereço inexistente.

### RF-008 — Permitir acesso a arquivos hospedados na plataforma

Quando um material possuir um ou mais arquivos hospedados na própria plataforma, o sistema deve disponibilizar opções claras de acesso a cada arquivo associado. Um material pode ter múltiplos arquivos e múltiplos links externos simultaneamente.

Quando não houver arquivo disponível, o sistema não deve apresentar uma opção de acesso a um arquivo inexistente.

No MVP, os arquivos hospedados devem aceitar PDF, DOCX, PPTX, PNG e JPG, com limite máximo de 50 MB por arquivo. O limite total combinado por cadastro, a quantidade máxima de arquivos e as regras técnicas de validação e segurança serão definidos durante a implementação. Os formatos aceitos e o limite individual de 50 MB já estão definidos.

### RF-009 — Tratar as diferentes formas de acesso

O sistema deve representar corretamente os seguintes cenários:

- **Somente link externo:** apresentar a opção de acesso ao link.
- **Somente arquivo hospedado:** apresentar a opção de acesso ao arquivo.
- **Link e arquivo:** disponibilizar as duas opções de acesso.
- **Sem link e sem arquivo:** informar que não há acesso direto disponível para o material.

A ausência de um link ou arquivo não deve ser interpretada automaticamente como ausência do material no catálogo.

### RF-010 — Informar falhas de acesso

Quando um link externo ou arquivo não puder ser acessado e essa condição puder ser identificada, o sistema deve apresentar uma mensagem compreensível sobre a indisponibilidade.

A mensagem deve distinguir, quando possível, uma falha de acesso da ausência de um recurso no cadastro.

O sistema não deve afirmar que um recurso está indisponível sem que essa condição possa ser identificada.

O comportamento específico para detectar e tratar falhas de acesso, incluindo a possibilidade de tentar novamente, deverá ser definido antes da implementação.

## 3. Requisitos não funcionais

### RNF-001 — Usabilidade

A interface deve apresentar informações, mensagens e controles compreensíveis para professores que procuram materiais educacionais.

### RNF-002 — Responsividade

A interface deve se adaptar a diferentes tamanhos de tela, incluindo computadores, tablets e celulares.

### RNF-003 — Consistência

As informações e os estados apresentados devem ser coerentes com os dados disponíveis e com as ações realizadas pelo usuário.

### RNF-004 — Clareza de acesso

A interface deve distinguir claramente entre:
- Consultar os detalhes de um material.
- Acessar um link externo.
- Acessar um arquivo hospedado.
- Consultar um material sem acesso direto disponível.

### RNF-005 — Transparência das informações

Quando disponíveis, as informações de autoria, fonte e condições de uso devem ser apresentadas de forma clara, respeitando os dados cadastrados para cada material.

### RNF-006 — Acessibilidade

A interface deverá considerar práticas de acessibilidade, incluindo legibilidade dos textos, identificação clara dos controles, contraste adequado e navegação compreensível.

Os critérios técnicos de acessibilidade serão detalhados em etapa posterior.

## 4. Escopo do MVP

### Incluído no MVP

- Visualização do catálogo de materiais previamente cadastrados.
- Busca por palavras-chave nos campos definidos no RF-002.
- Busca sem distinção entre maiúsculas e minúsculas.
- Busca sem distinção de acentuação.
- Correspondência parcial de termos.
- Ordenação dos resultados conforme a prioridade dos campos definida no RF-003.
- Filtros por tipo de material e etapa de ensino.
- Visualização dos detalhes dos materiais.
- Acesso por link externo, quando disponível.
- Acesso a arquivos hospedados na plataforma, quando disponíveis.
- Representação dos quatro cenários de acesso definidos no RF-009.
- Tratamento dos estados de catálogo vazio, ausência de resultados e falha de acesso.

### Funcionalidades adicionais aprovadas para o MVP

- **RF-011 — Envio de material para revisão:** o usuário poderá preencher os metadados exigidos e enviar arquivos dentro dos limites definidos. O envio cria um registro pendente; não publica automaticamente o material.
- **RF-012 — Favoritos:** o usuário identificado poderá favoritar/desfavoritar materiais e consultar sua lista persistente de favoritos.
- **RF-013 — Compartilhamento por link:** o usuário poderá copiar/compartilhar o link direto de um material. O acesso respeita as regras normais da plataforma.
- **RF-014 — Revisão e publicação:** um responsável autorizado poderá revisar materiais enviados e aprová-los para publicação ou rejeitá-los.

### Fora do escopo do MVP

- Criação, edição ou adaptação do conteúdo pedagógico dentro da plataforma.
- Pré-visualização integrada dos arquivos.
- Coleções personalizadas além da lista básica de favoritos.
- Compartilhamento de coleções, colaboração em tempo real ou permissões avançadas.
- Recomendação automática de materiais.

A autenticação e os perfis mínimos necessários para envio, moderação e favoritos precisam ser definidos na arquitetura técnica; isso não exclui as funcionalidades aprovadas.

## 5. Prioridades e dependências

A busca, os filtros, o catálogo, os detalhes e as opções de acesso constituem o escopo funcional previsto para o MVP.

As regras funcionais de busca e filtros estão documentadas. Antes da implementação, permanecem pendentes:
- A avaliação técnica e o escopo da sugestão de correção de consulta.
- Definição dos detalhes técnicos de representação e validação dos metadados e dos casos de preenchimento condicional.
- Limite total combinado de arquivos por cadastro, quantidade máxima de arquivos por material e detalhes técnicos de validação.
- O tratamento de falhas de acesso.
- Os critérios técnicos de acessibilidade.
- A definição visual final dos componentes e dos estados responsivos.

Essas pendências devem ser acompanhadas no documento `backlog.md`. Uma regra já confirmada não deve voltar a ser registrada como uma decisão em aberto, embora seus detalhes de implementação ainda possam precisar de especificação.

## 6. Rastreabilidade

Os requisitos devem ser mantidos em alinhamento com os documentos relacionados:

| Requisito | Documentos relacionados |
|---|---|
| RF-001 — Catálogo | `historias-de-usuario.md`, `arquitetura-da-informacao.md`, `user-flow.md` |
| RF-002 — Busca | `historias-de-usuario.md`, `objetivos-de-ux.md`, `arquitetura-da-informacao.md`, `user-flow.md` |
| RF-003 — Relevância | `historias-de-usuario.md`, `backlog.md`, `user-flow.md` |
| RF-004 — Filtros | `historias-de-usuario.md`, `backlog.md`, `arquitetura-da-informacao.md`, `user-flow.md` |
| RF-005 — Ausência de resultados | `historias-de-usuario.md`, `arquitetura-da-informacao.md`, `user-flow.md` |
| RF-006 — Detalhes | `historias-de-usuario.md`, `arquitetura-da-informacao.md`, `user-flow.md` |
| RF-007 — Link externo | `historias-de-usuario.md`, `user-flow.md` |
| RF-008 — Arquivo hospedado | `historias-de-usuario.md`, `user-flow.md` |
| RF-009 — Formas de acesso | `historias-de-usuario.md`, `arquitetura-da-informacao.md`, `user-flow.md` |
| RF-010 — Falhas de acesso | `historias-de-usuario.md`, `arquitetura-da-informacao.md`, `user-flow.md`, `backlog.md` |

## 7. Decisões confirmadas, hipóteses e pendências

### Decisões confirmadas

- Os campos opcionais “Componente curricular” e “Habilidades da BNCC” aceitam múltiplos valores por material.
- As habilidades da BNCC são registradas por texto livre, digitado ou colado manualmente; o MVP não exige catálogo estruturado nem seletor de códigos oficiais.

- O público prioritário são professores.
- O MVP inclui catálogo, busca, filtros, detalhes e acesso aos materiais disponíveis.
- A busca consulta título, tipo de material, resumo e descrição.
- A busca ignora diferenças entre maiúsculas e minúsculas.
- A busca ignora diferenças de acentuação.
- A busca permite correspondências parciais e exige correspondência de todas as palavras da consulta (AND).
- A relevância segue hierarquia fixa de campos (título, tipo de material, resumo e descrição), exatidão dentro do mesmo campo e desempate alfabético normalizado pelo título, seguido do identificador único.
- Os filtros previstos são tipo de material e etapa de ensino; as opções dentro de cada filtro combinam-se por OR, enquanto filtros diferentes e busca textual combinam-se por AND.
- As opções dos filtros derivam dos valores existentes no catálogo e são atualizadas dinamicamente conforme os demais critérios ativos.
- Os filtros ativos são removíveis individualmente; “Limpar filtros” remove apenas os filtros de tipo e etapa de ensino e preserva o texto da busca.
- A busca textual é atualizada após breve pausa na digitação; a lista retorna ao topo quando os critérios mudam.
- Os resultados são carregados em lotes de até 12, com tratamento de falhas e invalidação de solicitações antigas quando os critérios mudam durante o carregamento.
- Ao retornar de um material durante a navegação atual, são preservados a busca, os filtros, a posição da lista e o estado de expansão das seções do painel móvel.
- O cadastro de um novo material exige pelo menos uma forma de acesso (um ou mais arquivos hospedados e/ou um ou mais links externos); registros previamente existentes ou incompletos podem ser apresentados sem acesso direto, com indicação clara dessa condição.
- A ausência de acesso direto não significa que o material esteja ausente do catálogo.
- A pré-visualização, a edição e a adaptação de materiais não fazem parte do MVP.
- O projeto está em fase de revisão documental; a implementação e a avaliação com usuários reais pertencem a etapas futuras.

### Hipóteses a avaliar futuramente

- A busca e os filtros facilitarão a localização de materiais adequados às necessidades dos professores.
- A apresentação clara das opções de acesso reduzirá a incerteza sobre como utilizar os materiais.

Essas hipóteses ainda não devem ser tratadas como resultados validados por pesquisa com usuários.

### Questões pendentes

- Avaliação técnica e escopo da sugestão de correção de consulta.
- Definição dos detalhes técnicos de representação e validação dos metadados e dos casos de preenchimento condicional.
- Limite total combinado por cadastro, quantidade máxima de arquivos por material e regras técnicas de validação dos arquivos.
- Detecção e tratamento de falhas de acesso.
- Critérios técnicos de acessibilidade.

## 8. Considerações metodológicas

O projeto está em fase de revisão documental. A implementação e a avaliação das funcionalidades ocorrerão em etapas futuras.

Um formulário de pesquisa foi considerado anteriormente, mas sua aplicação foi abandonada. Portanto, dados simulados não devem ser apresentados como respostas reais, evidências empíricas ou validação das necessidades dos professores.

As decisões registradas neste documento representam a especificação atual do produto, não resultados de testes, pesquisa empírica ou implementação concluída.

## 9. Documentos relacionados

- `README.md`
- `product-brief.md`
- `historias-de-usuario.md`
- `backlog.md`
- `arquitetura-da-informacao.md`
- `objetivos-de-ux.md`
- `user-flow.md`
- `design-system.md`
