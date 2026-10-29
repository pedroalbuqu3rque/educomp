# Arquitetura da Informação — EduComp

**Status:** Consolidado para orientar o design do MVP  
**Versão:** 0.5  
**Escopo:** MVP do EduComp

## 1. Objetivo

Definir como os materiais educacionais são organizados, apresentados, encontrados e acessados no EduComp.

A arquitetura da informação deve ajudar professores a localizar materiais relevantes para suas aulas, compreender as características de cada recurso e identificar claramente as possibilidades de acesso disponíveis.

Este documento descreve a estrutura proposta para o MVP. Não representa funcionalidades já implementadas ou validadas com usuários.

## 2. Princípios de organização

A arquitetura da informação segue os seguintes princípios:

- **Encontrabilidade:** facilitar a localização de materiais por pesquisa e filtros.
- **Clareza:** apresentar informações que ajudem o professor a entender o conteúdo e a finalidade do recurso.
- **Consistência:** utilizar uma estrutura coerente entre catálogo, resultados e detalhes.
- **Transparência de acesso:** informar se o material possui link externo, arquivo hospedado na plataforma ou ambos; registros preexistentes/incompletos sem acesso direto devem ser identificados claramente.
- **Representação fiel dos dados:** não apresentar informações, formatos ou ações que não correspondam ao material cadastrado.
- **Simplicidade:** manter a navegação compatível com o escopo do MVP.

## 3. Estrutura geral

O MVP é organizado em três áreas principais:

1. **Catálogo:** apresenta os materiais disponíveis e permite explorar, pesquisar e filtrar os recursos.
2. **Resultados da pesquisa:** apresenta os materiais que correspondem aos termos pesquisados e aos filtros ativos.
3. **Detalhes do material:** reúne as informações de um recurso específico e apresenta as opções de acesso disponíveis.

Os resultados da pesquisa podem ser apresentados no próprio catálogo. A separação entre catálogo e resultados representa uma diferença de estado da interface, não necessariamente páginas distintas.

## 4. Hierarquia de navegação

```text
EduComp
│
└── Catálogo
    ├── Pesquisa
    ├── Filtros
    ├── Lista de materiais
    │   └── Selecionar material
    │       └── Detalhes do material
    │           ├── Título
    │           ├── Tipo de material
    │           ├── Etapa de ensino
    │           ├── Resumo
    │           ├── Descrição
    │           ├── Orientações de uso, quando disponíveis
    │           └── Opções de acesso
    │               ├── Um ou mais links externos
    │               ├── Um ou mais arquivos hospedados
    │               ├── Múltiplos links e arquivos combinados
    │               └── Nenhuma opção de acesso disponível
    │
    └── Estados da interface
        ├── Catálogo inicial
        ├── Resultados encontrados
        ├── Nenhum resultado
        ├── Carregamento
        ├── Falha ao carregar dados
        └── Falha ao acessar um material
```

Os estados de carregamento e falha são estados da interface, não áreas permanentes da navegação.

## 5. Organização e apresentação dos materiais

Cada material deve possuir um conjunto de metadados que permita identificá-lo, compreendê-lo e avaliar sua pertinência para uma aula.

| Informação | Finalidade | Situação |
|---|---|---|
| Título | Identificar o material | Campo central para identificação e pesquisa |
| Tipo de material | Indicar a categoria do recurso | Obrigatório |
| Resumo | Apresentar brevemente a proposta do material | Obrigatório |
| Descrição detalhada | Explicar o conteúdo, os objetivos e a finalidade do recurso | Opcional |
| Etapa de ensino | Indicar a etapa educacional à qual o recurso se destina | Obrigatório |
| Autor ou fonte | Identificar quem produziu o material ou sua origem | Opcional |
| Orientações de uso | Apoiar a compreensão de como utilizar ou adaptar o recurso | Opcional |
| Componente curricular | Indicar o componente curricular relacionado | Opcional |
| Habilidades da BNCC | Relacionar o material às habilidades curriculares correspondentes | Opcional |
| Licença e condições de uso | Informar permissões, restrições e atribuição de autoria | Opcional |
| Links externos | Permitir acessar recursos em outros endereços | Um material pode ter vários links; deve existir pelo menos uma forma de acesso |
| Arquivos hospedados | Permitir acessar arquivos disponibilizados pela plataforma | Um material pode ter vários arquivos e combiná-los com links externos |

As etapas e subdivisões confirmadas para o catálogo inicial são: Educação Infantil — grupos da BNCC Bebês, Crianças bem pequenas e Crianças pequenas; Ensino Fundamental — Anos Iniciais — 1º ao 5º ano; Ensino Fundamental — Anos Finais — 6º ao 9º ano; Ensino Médio — 1ª à 3ª série; EJA — Ensino Fundamental — 1º e 2º segmentos; EJA — Ensino Médio — modalidade sem exigir série específica. Os campos obrigatórios confirmados são título, tipo de material, resumo e etapa de ensino. Além disso, cada material deve ter pelo menos uma forma de acesso: arquivo hospedado ou link externo; os dois podem coexistir. Os campos opcionais disponíveis no modelo são descrição detalhada, autor ou fonte, orientações de uso, componente curricular, habilidades da BNCC e licença e condições de uso. A ausência de um campo opcional não impede o cadastro. Um material pode estar associado a múltiplos componentes curriculares e a múltiplas habilidades da BNCC. Também pode estar associado a múltiplas etapas de ensino, com especificação dos anos escolares correspondentes a cada etapa. A interface deve manter clara a relação entre etapa e ano e permitir selecionar mais de uma combinação. As habilidades da BNCC são registradas por texto livre, digitado ou colado manualmente; o MVP não exige catálogo estruturado nem seletor de códigos oficiais. A representação e validação técnica dos metadados será detalhada durante a implementação. Permanecem pendentes a quantidade máxima de arquivos por material e o limite total combinado por cadastro. Os formatos aceitos para arquivos hospedados no MVP são PDF, DOCX, PPTX, PNG e JPG, com limite de 50 MB por arquivo.

### 5.1. Catálogo e resultados

Cada item apresentado no catálogo deve oferecer informações suficientes para que o professor reconheça o material e decida se deseja consultar seus detalhes.

A composição visual definitiva dos cartões será definida no Figma. A seleção de informações precisa equilibrar identificação, legibilidade e espaço disponível, especialmente em dispositivos móveis.

A lista não deve depender exclusivamente da presença de um link externo: a disponibilidade de acesso deve ser representada de acordo com os dados cadastrados para cada material.

#### Pesquisa, ordenação e filtros

A pesquisa consulta título, tipo de material, resumo e descrição, ignorando caixa e acentuação e aceitando correspondências parciais. Em consultas com várias palavras, todas devem corresponder ao material (AND), mesmo que apareçam em campos diferentes.

Os resultados seguem uma hierarquia fixa: título, tipo de material, resumo e descrição. Para várias palavras, comparar a quantidade de palavras correspondentes em cada campo nessa ordem, como uma sequência lexicográfica. Dentro do mesmo campo e em condições equivalentes, correspondências exatas precedem parciais. Em empate de relevância, usa-se o título em ordem alfabética crescente, normalizando caixa e acentuação; se os títulos forem equivalentes, usa-se o identificador único em ordem crescente.

A busca textual e todos os filtros ativos devem ser atendidos simultaneamente (AND). Dentro de um mesmo filtro, as opções selecionadas combinam-se por OR. As opções disponíveis são derivadas dos valores existentes no catálogo e atualizadas conforme os demais critérios ativos. Limpar o texto da busca mantém os filtros selecionados. Os marcadores de filtros ativos permitem remover critérios individualmente. A ação “Limpar filtros” remove apenas tipo de material e etapa de ensino, preservando o texto da busca. O eixo da Computação pode ser exibido como metadado; sua adoção como filtro depende da consolidação do modelo de dados. Se a busca não retornar resultados, a interface informa a situação e permite revisar manualmente a consulta; a sugestão automática de correção está fora do escopo do MVP.

### 5.2. Detalhes do material

A área de detalhes deve reunir as informações disponíveis sobre o recurso em uma estrutura clara e consistente.

A interface deve distinguir:

- informações descritivas do material;
- metadados usados para organização e pesquisa;
- orientações de uso, quando cadastradas;
- opções de acesso efetivamente disponíveis.

Informações ausentes não devem ser substituídas por conteúdo inventado. A regra de exibição para cada campo opcional deverá ser definida durante o refinamento do modelo de dados e da interface.

## 6. Pesquisa e filtros

### 6.1. Pesquisa textual

A pesquisa deve considerar os seguintes campos:

1. Título;
2. Tipo de material;
3. Resumo;
4. Descrição.

As regras funcionais já estabelecidas são:

- ignorar diferenças entre letras maiúsculas e minúsculas;
- ignorar diferenças de acentuação;
- permitir correspondência parcial de termos;
- exigir correspondência de todas as palavras da consulta (AND), ainda que apareçam em campos diferentes;
- ordenar os resultados por hierarquia fixa: título, tipo de material, resumo e descrição;
- para várias palavras, comparar a quantidade de correspondências por campo nessa ordem, como uma sequência lexicográfica;
- dentro do mesmo campo e em condições equivalentes, priorizar correspondências exatas sobre parciais;
- desempatar pela ordem alfabética crescente do título, normalizando caixa e acentuação, e depois pelo identificador único em ordem crescente.

Quando não houver resultados, a interface deve informar a situação e permitir revisar a consulta. Uma sugestão de correção pode ser apresentada sem substituir automaticamente o texto original, após avaliação técnica.

### 6.2. Filtros

Os filtros devem restringir os materiais apresentados conforme os critérios disponibilizados pelo MVP. Tipo de material e etapa de ensino são os filtros previstos.

Os filtros são tipo de material e etapa de ensino. As opções de cada filtro são derivadas dos valores existentes no catálogo e atualizadas dinamicamente conforme os outros critérios ativos. É possível selecionar múltiplas opções em cada filtro; as opções do mesmo filtro combinam-se por OR, enquanto filtros diferentes e a busca textual combinam-se por AND.

Em telas maiores, os filtros aparecem como listas visíveis com caixas de seleção. Em telas pequenas, o botão “Filtros (N)” abre um painel lateral com seções independentes para tipo de material e etapa de ensino. N representa a quantidade total de valores selecionados. As seções começam expandidas e preservam seu estado ao fechar e reabrir o painel. O painel pode ser fechado pelo botão de fechar, ao tocar fora ou pelo botão Voltar do dispositivo; quando aberto, Voltar fecha o painel.

As opções são ordenadas alfabeticamente, sem distinção de caixa ou acentuação, e não exibem contagens individuais. Não há busca interna nas opções. A seleção ou remoção de um filtro atualiza os resultados imediatamente, sem botão “Aplicar”, e mantém o painel móvel aberto. Os filtros ativos aparecem como marcadores removíveis acima dos resultados; no celular, os marcadores quebram em várias linhas e ficam fora do painel. A contagem total de resultados é exibida acima da lista.

### 6.3. Estados dos resultados

A interface deve distinguir claramente:

- **Catálogo inicial:** não há pesquisa ativa nem filtros aplicados.
- **Resultados encontrados:** há materiais correspondentes à pesquisa e aos filtros.
- **Nenhum resultado:** a combinação atual de termos e filtros não retorna materiais.

No estado sem resultados, a interface deve orientar o professor a revisar os termos pesquisados ou ajustar os filtros.

A ausência de resultados não deve ser confundida com falha de carregamento ou indisponibilidade de acesso a um material.

## 7. Organização das opções de acesso

O acesso deve ser representado conforme a disponibilidade real de cada material. Existem quatro cenários previstos:

| Cenário | Comportamento esperado |
|---|---|
| Somente link externo | Apresentar a ação para abrir o endereço externo. |
| Somente arquivo hospedado | Apresentar a ação para acessar o arquivo disponibilizado na plataforma. |
| Link externo e arquivo hospedado | Apresentar as duas opções de acesso, identificando-as claramente. |
| Nenhuma opção de acesso | Informar que não há uma opção de acesso disponível no momento, sem exibir uma ação que prometa abrir um recurso inexistente. |

As ações de acesso devem ser identificadas de acordo com seu destino. Quando houver duas opções, a interface não deve induzir o usuário a acreditar que elas levam necessariamente ao mesmo conteúdo ou formato.

Os formatos aceitos para arquivos hospedados no MVP são PDF, DOCX, PPTX, PNG e JPG, com limite de 50 MB por arquivo. Os detalhes técnicos de abertura/download, permissões e tratamento de erros serão tratados durante a implementação.

## 8. Navegação e retorno

O usuário deve conseguir:

- explorar o catálogo;
- realizar uma pesquisa;
- aplicar e ajustar filtros;
- abrir os detalhes de um material a partir da listagem;
- identificar as opções de acesso disponíveis;
- retornar à listagem;
- corrigir a pesquisa ou os filtros quando não encontrar resultados.

A navegação entre a listagem e os detalhes deve manter uma relação clara entre o material selecionado e suas informações.

Ao abrir um material e retornar ao catálogo durante a navegação atual, devem ser preservados o texto de busca, os filtros selecionados, a posição de rolagem e o estado de expansão das seções do painel móvel. Se os critérios forem alterados, a lista retorna ao topo. Uma atualização da página pode reiniciar o estado.

## 9. Estados de carregamento e falha

A arquitetura deve prever estados distintos para problemas diferentes:

- **Carregamento:** os dados ainda estão sendo obtidos ou processados.
- **Falha ao carregar dados:** não foi possível apresentar o catálogo ou as informações solicitadas.
- **Falha de acesso:** o usuário selecionou uma opção de acesso, mas não conseguiu abrir ou obter o recurso.
- **Nenhum resultado:** a consulta foi processada, mas não encontrou correspondências.

Quando ocorrer uma falha, a mensagem deve explicar o problema em linguagem compreensível e, quando aplicável, indicar uma ação possível, como tentar novamente ou retornar à listagem.

Os mecanismos de detecção de falhas, as mensagens definitivas e as estratégias de recuperação ainda precisam ser detalhados. Não se deve presumir que a plataforma consiga detectar automaticamente todos os problemas ocorridos em sites externos.

## 10. Responsividade e acessibilidade

A organização das informações deve permanecer compreensível em diferentes tamanhos de tela.

Como critérios a detalhar durante o projeto da interface, devem ser considerados:

- hierarquia visual clara entre título, metadados, descrição e ações;
- identificação textual das opções de acesso;
- navegação por teclado;
- foco visível nos elementos interativos;
- rótulos claros para pesquisa e filtros;
- mensagens de estado compreensíveis;
- contraste adequado e uso de informações que não dependam exclusivamente de cores.

Os critérios verificáveis de acessibilidade e os requisitos de conformidade deverão ser definidos em documentação própria e conferidos durante a implementação e a validação.

## 11. Limites do MVP

A arquitetura descrita contempla catálogo, pesquisa, filtros, detalhes dos materiais, opções de acesso e estados necessários para orientar a navegação.

Não fazem parte do escopo atual:

- pré-visualização integrada dos materiais;
- edição ou adaptação de materiais na plataforma;
- criação ou envio de materiais pelos usuários.

Essas funcionalidades não devem aparecer como recursos disponíveis no MVP. Uma eventual inclusão futura exige revisão de escopo, requisitos e arquitetura.

## 12. Decisões pendentes

Antes de considerar a arquitetura pronta para implementação, devem ser resolvidos ou documentados:

- os detalhes técnicos de representação e validação dos metadados e eventuais condições de preenchimento;
- as regras de exibição de metadados ausentes;
- a composição definitiva dos itens do catálogo;
- a implementação visual das regras de filtros e busca já especificadas;
- os formatos de arquivo aceitos e o comportamento de acesso;
- as mensagens e estratégias de recuperação para falhas;
- os critérios verificáveis de acessibilidade.

Esses pontos devem ser tratados como pendências, e não como decisões já aprovadas.

## 13. Relação com os demais documentos

Este documento deve permanecer alinhado com:

- `docs/product/product-brief.md` — visão, escopo e limites do MVP;
- `docs/product/requisitos.md` — requisitos funcionais e não funcionais;
- `docs/product/historias-de-usuario.md` — necessidades e objetivos dos usuários;
- `docs/product/backlog.md` — tarefas, prioridades e decisões pendentes;
- `docs/ux-ui/objetivos-de-ux.md` — objetivos de experiência;
- `docs/ux-ui/user-flow.md` — percursos e transições entre estados;
- `docs/ux-ui/design-system.md` — padrões visuais e componentes.

Se houver divergência entre documentos, ela deve ser registrada e resolvida durante a revisão documental, evitando que uma hipótese seja tratada como requisito confirmado.

## 14. Validação e evolução

A versão atual descreve uma proposta documental para a arquitetura da informação. Ela ainda precisa ser comparada com o conjunto de requisitos, o modelo de dados e os fluxos de navegação.

A revisão documental não equivale à implementação, à avaliação de usabilidade ou à validação com professores. Essas atividades pertencem a etapas posteriores do projeto.

**Próximo passo:** resolver as pendências registradas, manter os documentos consistentes e, quando o projeto avançar, validar a arquitetura com protótipos e testes apropriados.


**Cardinalidade das formas de acesso:** cada material pode ter múltiplos arquivos hospedados e múltiplos links externos simultaneamente. O cadastro exige pelo menos uma forma de acesso.


### Regra de upload definida no BK-006

Os formatos aceitos no MVP são PDF, DOCX, PPTX, PNG e JPG. Cada arquivo hospedado poderá ter no máximo 50 MB. Um material pode reunir múltiplos arquivos e links externos; a quantidade máxima de arquivos por material e o limite total combinado por cadastro permanecem pendentes.


## Áreas adicionais do MVP

- **Enviar material:** formulário com metadados e anexos; ao concluir, o envio fica pendente de revisão e não entra imediatamente no catálogo.
- **Favoritos:** lista pessoal persistente de materiais favoritados, associada a usuário identificado.
- **Compartilhar:** ação contextual nos detalhes do material para copiar o link direto.
- **Revisão:** área restrita a responsáveis autorizados para aprovar ou rejeitar submissões. O acesso administrativo deve ser definido na arquitetura técnica.
