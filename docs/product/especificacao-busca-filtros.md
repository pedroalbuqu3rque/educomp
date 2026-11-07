# EduComp — Especificação de busca e filtros

**Versão:** 0.4  
**Data:** 07/11/2026  
**Situação:** regras de produto definidas; detalhes de implementação ainda pendentes.

## 1. Finalidade

Este documento define a pesquisa, os filtros, a ordenação e a paginação da Biblioteca do EduComp.

A Biblioteca pode ser consultada sem login. Ela apresenta apenas materiais aprovados e publicados. Materiais pendentes, em análise, recusados ou retirados de circulação não aparecem nos resultados.

## 2. Pesquisa textual

A pesquisa considera o **título** e as **palavras-chave (tags)** cadastradas nos materiais. A descrição e os demais metadados não serão pesquisados nesta versão.

As regras são:

- A consulta é executada ao pressionar **Enter** ou selecionar **Buscar**. Não haverá pesquisa automática durante a digitação.
- Letras maiúsculas e minúsculas são tratadas da mesma forma, assim como palavras com ou sem acento.
- Uma palavra pode corresponder a um trecho do título ou de uma palavra-chave, sem exigir correspondência exata.
- Quando a consulta tiver várias palavras, **todas deverão corresponder** aos dados pesquisáveis, independentemente da ordem em que foram digitadas.
- A pesquisa pode ser combinada com os filtros aplicados.
- Executar uma consulta com o campo vazio mostra os materiais publicados que atendam aos filtros ativos.

Alterar o texto digitado não remove filtros e não modifica a listagem até a execução de uma nova pesquisa.

O campo Tema / palavras-chave será incluído no formulário de envio, conforme a [Especificação de metadados](especificacao-metadados.md).

**Detalhe a definir:** se, em uma pesquisa com várias palavras, cada termo poderá ser encontrado em campos diferentes — por exemplo, um no título e outro nas tags. A regra de exigir todos os termos já está aprovada.

## 3. Ordenação

A ordenação inicial será por **mais recentes primeiro**. O usuário também poderá escolher a **ordem alfabética por título**.

Não haverá ordenação por relevância textual no MVP.

A sequência dos materiais precisa ser estável, inclusive ao navegar entre páginas. Alterar a ordenação reinicia a navegação na primeira página, preservando a pesquisa e os filtros.

Antes da implementação, é necessário definir qual data representa a novidade do material (por exemplo, a data de publicação), o sentido da ordenação alfabética e o critério de desempate.

## 4. Filtros

A Biblioteca terá três categorias:

| Categoria | Opções |
| --- | --- |
| **Tipo de material** | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática |
| **Etapa de ensino** | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| **Eixo da Computação** | Pensamento Computacional; Mundo Digital; Cultura Digital |

Cada categoria permite selecionar várias opções. Um mesmo material também pode ter **múltiplos tipos, etapas e eixos**, conforme as regras de cadastro.

A combinação funciona assim:

| Critérios | Regra |
| --- | --- |
| Opções da mesma categoria | **OU**: o material corresponde a pelo menos uma das opções selecionadas. |
| Categorias diferentes | **E**: o material deve atender a todas as categorias com seleção. |
| Pesquisa textual e filtros | **E**: o material deve corresponder ao texto pesquisado e aos filtros aplicados. |
| Categoria sem seleção | Não restringe os resultados. |

**Exemplo:** selecionar Plano de aula e Atividade, Ensino Fundamental — Anos iniciais e Pensamento Computacional retorna materiais publicados que pertençam a pelo menos um dos dois tipos e, ao mesmo tempo, correspondam à etapa e ao eixo escolhidos.

Opções que não tenham materiais correspondentes continuarão **visíveis e selecionáveis**. Caso a combinação não produza resultados, a Biblioteca apresentará o estado vazio da consulta.

## 5. Aplicação dos filtros

As seleções feitas dentro de um filtro só afetam a Biblioteca depois da confirmação.

| Ação | Comportamento |
| --- | --- |
| **Abrir filtro** | Apresentar as opções e marcar as seleções já aplicadas. |
| **Marcar ou desmarcar** | Alterar apenas a seleção em edição, sem atualizar os resultados. |
| **Aplicar** | Confirmar as opções da categoria e atualizar os resultados. |
| **Limpar** | Desmarcar somente as opções da categoria aberta, ainda sem atualizar os resultados. |
| **Aplicar após Limpar** | Confirmar a limpeza e atualizar a Biblioteca. |
| **Fechar sem Aplicar** | Descartar as mudanças em edição e manter os filtros aplicados anteriormente. |
| **Reabrir filtro** | Exibir novamente as seleções efetivamente aplicadas. |

Aplicar ou limpar uma categoria não remove as seleções das outras categorias nem o texto da pesquisa.

Os filtros devem permitir fechamento por controles visuais e por **Escape**, com comportamento de foco adequado. Fechar uma sobreposição não pode aplicar alterações de maneira implícita.

## 6. Resultados e paginação

A Biblioteca utilizará **paginação de 12 materiais por página**, conforme a referência visual do protótipo desktop.

- A interface apresentará o **total real de materiais encontrados** para a consulta atual.
- A paginação permitirá navegar entre as páginas disponíveis, sem repetir ou omitir materiais por causa da ordenação.
- Uma nova pesquisa, uma mudança de filtros ou uma alteração de ordenação retornará à **primeira página**.
- Ao mudar de página, a pesquisa, os filtros e a ordenação serão preservados.
- Se uma página falhar ao carregar, a interface informará o problema e permitirá tentar novamente, sem apresentar resultados incorretos como se fossem válidos.

Os resultados devem corresponder sempre à consulta mais recente. Se o usuário executar outra pesquisa antes de a anterior terminar, a resposta antiga não poderá substituir a listagem atual.

### 6.1. Estados da Biblioteca

| Estado | Apresentação esperada |
| --- | --- |
| **Carregamento** | Indicar que os materiais estão sendo consultados. |
| **Resultados disponíveis** | Exibir cartões, total de resultados e paginação quando necessária. |
| **Acervo vazio** | Informar que não há materiais publicados disponíveis. |
| **Sem resultados** | Informar que a pesquisa ou os filtros não encontraram correspondências e permitir revisar os critérios. |
| **Falha de consulta** | Explicar o problema e oferecer nova tentativa quando possível. |

A ausência de resultados para uma pesquisa não deve ser confundida com a ausência de materiais no acervo.

## 7. Preservação da navegação

O estado da Biblioteca será representado no **endereço da página (URL)**, incluindo pesquisa, filtros, ordenação e página atual.

Isso permitirá retornar dos detalhes do material ou recarregar a página sem perder os critérios utilizados.

Ao voltar dos detalhes, a aplicação deverá tentar restaurar também a posição de rolagem, quando tecnicamente viável.

O formato dos parâmetros da URL e a estratégia de restauração da rolagem serão definidos na implementação.

A área **Salvos** não terá pesquisa nem filtros próprios no MVP: apresentará apenas a lista pessoal e as ações de favoritos.

## 8. Interface e acessibilidade

A implementação seguirá o [Design System](../ux-ui/design-system.md) e o [Handoff de UI/UX](../ux-ui/handoff.md).

Os controles precisam ter rótulos claros, foco visível e utilização por teclado. A seleção dos filtros não pode depender apenas de cor. Mensagens de carregamento, erro e ausência de resultados devem ser compreensíveis.

O desenvolvimento começará pelo desktop. Na adaptação para tablet e celular, a disposição dos controles poderá mudar, mas a pesquisa, os filtros, a ordenação e a paginação deverão continuar funcionais.

## 9. Critérios de aceitação

Os identificadores existentes foram preservados. O CA-BF-17 foi adaptado à paginação escolhida, e o CA-BF-18 foi acrescentado para verificar a ordenação.

| ID | Verificação |
| --- | --- |
| CA-BF-01 | A Biblioteca apresenta os materiais publicados sem exigir pesquisa ou filtros. |
| CA-BF-02 | Uma pesquisa encontra correspondências no título, conforme as regras de texto definidas. |
| CA-BF-03 | Uma pesquisa encontra correspondências nas palavras-chave cadastradas. |
| CA-BF-04 | Selecionar dois tipos na mesma categoria utiliza a lógica OU. |
| CA-BF-05 | Combinar tipo, etapa e eixo utiliza a lógica E entre categorias. |
| CA-BF-06 | A pesquisa textual funciona em conjunto com os filtros aplicados. |
| CA-BF-07 | Alterar opções sem aplicar não modifica os resultados; fechar descarta essas alterações. |
| CA-BF-08 | Aplicar um filtro atualiza os resultados sem remover os demais critérios. |
| CA-BF-09 | Reabrir um filtro mostra as opções efetivamente aplicadas. |
| CA-BF-10 | Executar outra pesquisa não remove os filtros ativos. |
| CA-BF-11 | Uma consulta sem correspondências preserva os critérios e apresenta orientação adequada. |
| CA-BF-12 | A Biblioteca vazia apresenta mensagem diferente da pesquisa sem resultados. |
| CA-BF-13 | Uma falha de consulta é comunicada e permite nova tentativa quando aplicável. |
| CA-BF-14 | Uma resposta antiga não substitui os resultados da pesquisa mais recente. |
| CA-BF-15 | Retornar dos detalhes preserva pesquisa, filtros e demais critérios na URL. |
| CA-BF-16 | Alterar pesquisa, filtros ou ordenação reinicia a paginação na primeira página. |
| CA-BF-17 | Uma falha ao carregar outra página não gera duplicação nem apresenta resultados incorretos. |
| CA-BF-18 | O usuário consegue alternar entre ordenação por recentes e alfabética, mantendo resultados estáveis entre páginas. |

## 10. Detalhes pendentes

- [ ] Definir qual data será usada para ordenar por mais recentes, o sentido da ordem alfabética e o desempate entre materiais.
- [ ] Definir se os termos de uma mesma pesquisa podem corresponder a campos diferentes (título e tags).
- [ ] Estabelecer os parâmetros da URL e a forma de restaurar a posição de rolagem.

## 11. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de metadados](especificacao-metadados.md)
- [User Flow](../ux-ui/user-flow.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
