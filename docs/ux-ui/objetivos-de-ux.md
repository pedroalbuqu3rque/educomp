# Objetivos de UX — EduComp

**Versão:** 0.5  
**Status:** Consolidado para orientar o design do MVP  
**Escopo:** MVP do EduComp

## 1. Objetivo do documento

Este documento define os objetivos de experiência do usuário (UX) para o MVP do EduComp, uma proposta de plataforma digital voltada a professores que procuram materiais didáticos para suas aulas.

Os objetivos orientam as decisões de arquitetura da informação, navegação, conteúdo e interface. A intenção é facilitar a descoberta de materiais, a compreensão das informações disponíveis e a identificação das opções de acesso.

Os objetivos representam resultados pretendidos. Não comprovam que a interface esteja implementada, que a experiência seja eficaz ou que as hipóteses tenham sido validadas com usuários reais.

## 2. Público prioritário

O público prioritário do EduComp é formado por professores que procuram materiais didáticos para utilizar em suas aulas.

A experiência deve considerar que esses usuários precisam:

- explorar materiais disponíveis;
- localizar recursos relacionados ao que procuram;
- compreender as características de cada material;
- identificar as opções de acesso;
- recuperar-se de pesquisas sem resultados ou de falhas de acesso.

Essas necessidades orientam o projeto, mas não devem ser apresentadas como conclusões de entrevistas, questionários ou testes com professores.

## 3. Contexto do problema

O EduComp parte da hipótese de que localizar e avaliar materiais didáticos pode exigir que professores consultem diferentes fontes e analisem os recursos encontrados antes de utilizá-los.

A proposta consiste em organizar informações sobre materiais em um catálogo que permita exploração, pesquisa textual, filtragem e consulta de detalhes.

O acesso deverá ser representado de acordo com as opções disponíveis para cada recurso:

1. somente link externo;
2. somente arquivo hospedado na plataforma;
3. link externo e arquivo hospedado;
4. nenhuma opção de acesso disponível.

A coleta de respostas por meio do Google Forms foi abandonada. Portanto, não há resultados desse questionário que possam ser usados como evidência empírica para confirmar a existência, a frequência ou a intensidade das dificuldades descritas.

## 4. Objetivos de experiência

### OUX-001 — Facilitar a descoberta de materiais

**Objetivo:** permitir que o professor explore o catálogo e identifique materiais potencialmente relevantes para suas aulas.

**Diretrizes de UX:**

- organizar os materiais de maneira consistente;
- destacar o título e as informações essenciais de cada recurso;
- manter uma hierarquia visual que facilite a exploração;
- permitir que o usuário abra os detalhes de um material;
- evitar que a apresentação dependa exclusivamente da existência de um link externo.

**Resultado esperado:** o professor compreende como o catálogo está organizado e como consultar os materiais.

**Avaliação futura:** propor tarefas nas quais participantes precisem localizar e abrir materiais específicos. Registrar a conclusão da tarefa, erros observados e dificuldades relatadas.

### OUX-002 — Tornar a pesquisa compreensível e útil

**Objetivo:** permitir que o professor pesquise materiais por termos relacionados ao recurso que procura.

**Diretrizes de UX:**

- apresentar um campo de pesquisa claramente identificado;
- tornar compreensível a finalidade do campo;
- apresentar os resultados de forma organizada;
- permitir a alteração dos termos pesquisados;
- informar quando não houver resultados;
- manter consistência entre o comportamento da pesquisa e as regras funcionais documentadas.

**Regras funcionais já definidas para a pesquisa:**

- ignorar diferenças entre letras maiúsculas e minúsculas e diferenças de acentuação;
- permitir correspondências parciais;
- exigir correspondência de todas as palavras da consulta (AND);
- ordenar por hierarquia fixa de campos (título, tipo de material, resumo e descrição), comparando a quantidade de correspondências por campo nessa ordem;
- priorizar correspondências exatas dentro do mesmo campo, sem superar a prioridade de um campo mais relevante;
- desempatar pelo título em ordem alfabética crescente, normalizando caixa e acentuação, e depois pelo identificador único em ordem crescente.

A sugestão automática de correção de consulta está fora do MVP; o usuário poderá alterar manualmente os termos ou filtros.

**Resultado esperado:** o professor compreende como realizar uma pesquisa e interpretar os resultados apresentados.

**Avaliação futura:** utilizar consultas representativas e observar se participantes conseguem localizar materiais e compreender os resultados. A avaliação deverá distinguir problemas de interface de limitações na própria lógica de pesquisa.

### OUX-003 — Facilitar o uso dos filtros

**Objetivo:** permitir que o professor refine a listagem por critérios relevantes para a seleção de materiais.

**Diretrizes de UX:**

- identificar claramente os filtros disponíveis;
- apresentar as opções com rótulos compreensíveis;
- indicar quais filtros estão ativos;
- permitir revisar e remover os critérios aplicados;
- comunicar quando a combinação de critérios não retornar materiais;
- manter a apresentação dos filtros compreensível em diferentes tamanhos de tela.

Os filtros do MVP são tipo de material e etapa de ensino. As opções iniciais, a seleção múltipla, a combinação OR dentro do mesmo filtro, a combinação AND entre filtros e busca e os comportamentos responsivos estão definidos na especificação funcional BK-004/BK-005.

**Resultado esperado:** o professor compreende como os filtros afetam os materiais apresentados e consegue ajustar os critérios utilizados.

**Avaliação futura:** propor tarefas de aplicação, combinação e remoção de filtros. Registrar se os participantes compreendem a seleção ativa e conseguem recuperar resultados relevantes.

### OUX-004 — Apoiar a avaliação inicial dos materiais

**Objetivo:** apresentar informações suficientes para que o professor compreenda as características conhecidas de um material antes de acessá-lo.

**Diretrizes de UX:**

- identificar claramente o material na página de detalhes;
- organizar título, metadados, resumo e descrição em uma hierarquia compreensível;
- apresentar orientações de uso quando disponíveis;
- apresentar autoria, fonte e condições de utilização quando esses dados estiverem disponíveis e forem aplicáveis;
- distinguir informações cadastradas de informações ausentes;
- não depender de uma pré-visualização integrada, pois ela não faz parte do MVP.

**Resultado esperado:** o professor consegue compreender as informações disponíveis e decidir se deseja acessar o recurso.

**Avaliação futura:** solicitar aos participantes que identifiquem informações específicas nos detalhes e expliquem quais dados usariam para decidir se o material é pertinente à sua necessidade.

### OUX-005 — Tornar as formas de acesso claras

**Objetivo:** permitir que o professor identifique as opções disponíveis para acessar cada material e compreenda quando não existe uma opção cadastrada.

**Diretrizes de UX:**

- identificar links externos como opções de acesso;
- identificar arquivos hospedados como opções distintas;
- apresentar ambas as opções quando estiverem disponíveis;
- informar quando não houver uma opção de acesso cadastrada;
- não exibir ações que prometam abrir recursos inexistentes;
- comunicar falhas de acesso de forma compreensível;
- oferecer uma alternativa de recuperação quando ela existir e for aplicável.

**Cenários que a interface deve representar:**

| Cenário | Resultado esperado |
|---|---|
| Somente link externo | O usuário identifica e pode selecionar o link disponível. |
| Somente arquivo hospedado | O usuário identifica e pode selecionar o arquivo disponível. |
| Link externo e arquivo hospedado | O usuário reconhece as duas opções e consegue distingui-las. |
| Nenhuma opção de acesso | O usuário compreende que não há uma opção disponível no cadastro. |

A disponibilidade de uma opção não garante que o destino externo esteja funcionando. Os mecanismos de detecção de falhas e as estratégias de recuperação ainda precisam ser especificados.

**Resultado esperado:** o professor reconhece corretamente as opções de acesso cadastradas e não confunde ausência de acesso com falha de carregamento da plataforma.

**Avaliação futura:** apresentar os quatro cenários aos participantes e verificar se identificam as opções disponíveis e interpretam corretamente as mensagens apresentadas.

### OUX-006 — Facilitar a recuperação após uma pesquisa sem resultados

**Objetivo:** ajudar o professor a compreender quando os critérios utilizados não retornam materiais e a identificar como tentar novamente.

**Diretrizes de UX:**

- informar claramente que nenhum material corresponde aos critérios atuais;
- permitir alterar os termos da pesquisa;
- permitir revisar ou remover filtros;
- evitar mensagens que atribuam a ausência de resultados a uma falha técnica sem evidências;
- distinguir ausência de resultados de catálogo vazio, carregamento e falha ao carregar dados.

**Resultado esperado:** o professor compreende o estado apresentado e consegue identificar uma ação para continuar a busca.

**Avaliação futura:** propor uma pesquisa sem resultados e observar se os participantes conseguem modificar a consulta ou os filtros sem confundir esse estado com uma falha do sistema.

### OUX-007 — Preservar a compreensão em diferentes telas

**Objetivo:** planejar uma experiência legível e utilizável em diferentes tamanhos de tela.

**Diretrizes de UX:**

- preservar a legibilidade de títulos, descrições e metadados;
- adaptar a apresentação do catálogo à largura disponível;
- manter campos, filtros e ações identificáveis;
- evitar que informações essenciais sejam ocultadas ou apresentadas de forma confusa;
- considerar navegação por teclado e interação por toque;
- manter os estados da interface compreensíveis independentemente do dispositivo.

**Resultado esperado:** as tarefas centrais do MVP continuam compreensíveis nos tamanhos de tela contemplados pelo projeto.

**Avaliação futura:** revisar os principais fluxos em diferentes resoluções e, caso exista uma implementação, verificar a funcionalidade dos controles e a legibilidade do conteúdo.

## 5. Princípios gerais de experiência

Os objetivos são orientados pelos seguintes princípios:

- **Clareza:** o usuário deve compreender as informações e as ações disponíveis.
- **Consistência:** componentes com funções equivalentes devem apresentar comportamentos semelhantes.
- **Orientação:** o usuário deve entender onde está e como retornar à listagem.
- **Transparência:** a interface deve comunicar as opções e limitações de acesso.
- **Recuperação:** estados sem resultados e falhas devem orientar o próximo passo quando possível.
- **Acessibilidade:** as informações e os controles devem considerar diferentes formas de interação.
- **Integridade:** hipóteses e resultados pretendidos não devem ser apresentados como conclusões comprovadas.
- **Fidelidade aos dados:** a interface não deve inventar informações ausentes sobre os materiais.

## 6. Relação com o escopo do MVP

| Funcionalidade | Objetivo relacionado |
|---|---|
| Catálogo de materiais | OUX-001 |
| Pesquisa textual | OUX-002 |
| Filtros | OUX-003 |
| Detalhes do material | OUX-004 |
| Acesso por link ou arquivo | OUX-005 |
| Estado sem resultados | OUX-006 |
| Apresentação em diferentes telas | OUX-007 |

A pré-visualização integrada, a edição ou adaptação de materiais e o envio de materiais pelos usuários não fazem parte do escopo atual do MVP.

## 7. Indicadores para avaliação futura

Os objetivos poderão orientar uma avaliação de usabilidade, desde que o projeto avance para uma etapa adequada de prototipação ou implementação.

Os seguintes indicadores são possibilidades de avaliação, não resultados já obtidos:

| Indicador | O que observar |
|---|---|
| Conclusão de tarefas | Se o participante consegue concluir uma tarefa definida |
| Erros de interação | Ações incorretas ou tentativas que não produzem o resultado esperado |
| Tempo de execução | Tempo necessário para concluir uma tarefa, quando a medição for pertinente |
| Compreensão dos estados | Se o participante distingue resultados vazios, carregamento e falhas |
| Identificação do acesso | Se reconhece corretamente as opções de acesso disponíveis |
| Percepção de clareza | Dificuldades e comentários relatados pelo participante |
| Uso em diferentes telas | Se as tarefas permanecem realizáveis nas resoluções avaliadas |

Antes da avaliação, devem ser definidos os participantes, as tarefas, o procedimento de coleta, os critérios de interpretação e a forma de registrar os resultados.

Não devem ser estabelecidas metas numéricas arbitrárias sem justificativa para o contexto e o método de avaliação.

## 8. Decisões, hipóteses e pendências

### 8.1. Decisões confirmadas

- O público prioritário do produto são professores.
- O MVP contempla catálogo, pesquisa, filtros, detalhes e acesso aos materiais.
- A pesquisa considera título, tipo de material, resumo e descrição.
- A pesquisa deve ignorar diferenças de caixa e acentuação e aceitar correspondências parciais.
- A ordenação deve priorizar título, tipo de material, resumo e descrição, nessa ordem.
- O acesso pode ocorrer por link externo, arquivo hospedado ou ambos. Se um registro preexistente/incompleto não tiver acesso direto, essa condição deve ser comunicada claramente; novos cadastros exigem pelo menos uma forma de acesso.
- A pré-visualização integrada não faz parte do MVP.
- O projeto está em fase de revisão documental.

### 8.2. Hipóteses

- Uma organização consistente pode facilitar a descoberta de materiais.
- Pesquisa e filtros podem ajudar professores a localizar recursos relevantes.
- Informações claras podem apoiar a avaliação inicial dos materiais.
- A identificação das formas de acesso pode reduzir dúvidas durante a navegação.
- Mensagens de recuperação podem ajudar os usuários a continuar após uma pesquisa sem resultados ou uma falha.

Essas hipóteses ainda não foram validadas por pesquisa com usuários reais.

### 8.3. Pendências

- Avaliar tecnicamente a sugestão de correção de consulta e definir se será implementada no MVP ou adiada.
- Criar os wireframes e definir visualmente os controles de filtro e os campos dos materiais.
- Aplicar no design os formatos de arquivo e os limites já definidos funcionalmente.
- Especificar os estados e as estratégias de recuperação de falhas.
- Definir os critérios verificáveis de acessibilidade.
- Planejar uma avaliação futura compatível com o protótipo ou sistema que vier a existir.

## 9. Relação com os demais documentos

Este documento deve permanecer alinhado com:

- `docs/product/product-brief.md` — visão e escopo do MVP;
- `docs/product/requisitos.md` — requisitos funcionais e não funcionais;
- `docs/product/historias-de-usuario.md` — necessidades e objetivos dos usuários;
- `docs/product/backlog.md` — prioridades e pendências;
- `docs/ux-ui/arquitetura-da-informacao.md` — organização das informações;
- `docs/ux-ui/user-flow.md` — percursos e estados da navegação;
- `docs/ux-ui/design-system.md` — princípios visuais e componentes.

Eventuais divergências devem ser registradas e resolvidas durante a revisão documental.

## 10. Status da documentação

Este documento estabelece objetivos pretendidos para a experiência do EduComp. Não comprova que a interface esteja implementada, que os objetivos tenham sido alcançados ou que as hipóteses tenham sido validadas.

A revisão atual é documental. Prototipação, implementação, testes de usabilidade e avaliação com professores são atividades futuras e devem ser registradas como realizadas somente quando houver evidências correspondentes.
