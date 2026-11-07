# EduComp — Especificação de busca e filtros

**Versão:** 1.0 · **Data:** 07/11/2026 · **Situação:** regras de produto definidas; detalhes técnicos pendentes.

## 1. Finalidade

Esta especificação descreve a consulta da Biblioteca e a pesquisa da coleção Salvos. A Biblioteca é pública e exibe apenas materiais aprovados **e publicados**. Busca, filtros e paginação devem operar sobre o acervo real; os materiais dos cartões do protótipo são dados de exemplo.

## 2. Pesquisa textual

A pesquisa da Biblioteca considera **título** e **tema/palavras-chave**. A descrição não será pesquisada nesta versão.

- A consulta é enviada ao pressionar **Enter** ou selecionar **Buscar**, sem disparar uma requisição a cada tecla digitada.
- Maiúsculas, minúsculas e diferenças de acentuação não alteram a correspondência. A pesquisa poderá aceitar trechos de palavras.
- Consultas com vários termos exigem correspondência de todos eles, sem depender da ordem digitada. A estratégia de correspondência entre campos distintos ainda será detalhada.
- Pesquisar com o campo vazio devolve os materiais publicados que atendam aos filtros ativos.
- Editar o texto sem executar uma nova consulta não altera imediatamente os resultados.
- Uma consulta recente não pode ser sobrescrita por uma resposta antiga que terminou depois.

A pesquisa pode ser combinada com os quatro filtros. O estado sem resultados deve manter os critérios digitados e oferecer **Limpar filtros** e **Ver todos os materiais**.

## 3. Filtros da Biblioteca

Os quatro filtros aparecem como **botões independentes** ao lado do campo de pesquisa.

| Filtro | Opções |
| --- | --- |
| **Tipo** | Plano de aula; Slides; Material de apoio; Atividade; Sequência didática; **Jogo** |
| **Etapa** | Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio |
| **Eixo** | Pensamento Computacional; Mundo Digital; Cultura Digital |
| **Abordagem** | Plugada; Desplugada |

Um material pode ter vários tipos, etapas, eixos e abordagens. Quando tiver **ambas as abordagens**, deverá corresponder tanto ao filtro Plugada quanto ao Desplugada, se cada uma for aplicada isoladamente.

### Regras de combinação

| Operação | Regra |
| --- | --- |
| Duas ou mais opções dentro de um filtro | **OU:** o material corresponde a pelo menos uma das seleções. |
| Filtros diferentes | **E:** o material precisa atender a todos os grupos com seleção. |
| Texto de pesquisa + filtros | **E:** todos os critérios ativos precisam corresponder. |
| Filtro sem seleção | Não restringe os resultados. |

Exemplo: Tipo **Atividade** ou **Jogo**, Etapa **Ensino Fundamental — Anos iniciais** e Abordagem **Desplugada** traz recursos publicados que pertençam a pelo menos um dos dois tipos e satisfaçam simultaneamente a etapa e a abordagem escolhidas.

Opções sem correspondências devem continuar visíveis e selecionáveis. Uma combinação sem materiais utiliza o estado **Nenhum material encontrado**; não equivale a acervo vazio.

## 4. Aplicar, limpar e fechar

| Ação | Resultado funcional |
| --- | --- |
| **Abrir** | Mostrar as opções da categoria e marcar as seleções já aplicadas. |
| **Marcar/desmarcar** | Alterar uma seleção temporária, sem afetar os resultados antes da confirmação. |
| **Aplicar** | Confirmar somente a categoria aberta e atualizar a listagem. |
| **Limpar** | Desmarcar a categoria aberta; a atualização depende de Aplicar. |
| **Fechar sem Aplicar** | Descartar alterações temporárias e manter os filtros anteriores. |
| **Reabrir** | Mostrar o conjunto efetivamente aplicado. |

Uma categoria não pode apagar inadvertidamente as escolhas de outra. O protótipo ilustra a abertura e o fechamento das sobreposições; o comportamento sobre dados e a seleção efetiva devem ser implementados na aplicação.

Os filtros abertos usam um fundo desfocado. O diálogo permanece nítido; fechamento por Escape e retorno do foco ao acionador devem ser tratados na implementação.

## 5. Cartões e identificação da abordagem

Os cartões exibem o **tipo**, o título, uma descrição curta e a informação adequada à etapa: idade na Educação Infantil, ano no Ensino Fundamental ou série no Ensino Médio. Exemplos: `EI · 5 anos`, `EF · 4º ano` e `EM · 1ª série`.

A abordagem é sinalizada por **ícones**, sem uma etiqueta textual adicional em cada cartão:

- monitor: atividade **plugada**;
- monitor riscado: atividade **desplugada**;
- ambos os ícones: recurso aplicável às duas abordagens.

Os ícones precisam de nome acessível (`aria-label`, texto de apoio ou equivalente), pois o significado não deve depender apenas da imagem. A legenda na Biblioteca pode ajudar na compreensão visual, mas não substitui esse nome acessível.

O tipo de material permanece identificado pelo texto na parte superior do cartão. Os metadados devem determinar as informações exibidas, sem repetir artificialmente os exemplos do protótipo.

## 6. Paginação e ordem dos resultados

A Biblioteca apresenta **12 materiais por página** e o total efetivo da consulta. O protótipo ilustra duas páginas e os controles anterior/próximo.

- Nova pesquisa ou nova aplicação de filtros retorna à primeira página.
- A sequência deve ser determinística entre páginas, sem materiais repetidos ou omitidos.
- O formato dos parâmetros de busca, filtros e página na URL será definido durante a implementação.
- Ao voltar dos detalhes, a aplicação deve recuperar a consulta e, quando possível, a posição da rolagem.

Não há seletor de ordenação visível no fluxo atual do Figma. Uma opção de escolha entre **Mais recentes** e **Ordem alfabética** não integra o escopo deste protótipo; é necessário apenas definir uma ordenação padrão estável para o serviço.

## 7. Pesquisa em Salvos

A página **Materiais salvos** apresenta uma busca por título ou tema e um botão **Buscar**. Essa pesquisa deve atuar somente sobre os materiais da conta autenticada, preservando o estado da coleção.

A tela **Salvos · coleção vazia** é distinta de uma pesquisa sem correspondências: a coleção vazia significa que a conta ainda não guardou materiais. Nesse estado, o CTA **Explorar biblioteca** direciona à Biblioteca.

O arquivo de design contém telas isoladas de filtros de Salvos (tipo, etapa e eixo), mas os respectivos controles **não estão disponíveis no fluxo visual atual** da página. São referências de variação, não filtros ativos previstos para a implementação desta tela sem uma decisão adicional.

## 8. Estados e falhas

| Estado | Tratamento |
| --- | --- |
| Consulta em andamento | Indicar carregamento e evitar resultados obsoletos. |
| Resultados disponíveis | Exibir lista, total e paginação quando necessária. |
| Nenhum resultado | Manter critérios e apresentar ações para ajustar a busca. |
| Acervo vazio | Informar que não existem materiais publicados. |
| Falha de consulta | Comunicar a falha e permitir tentar novamente quando aplicável. |
| Salvos vazio | Mostrar orientação para explorar e salvar materiais. |

A consulta deve ter rótulos, feedback e foco adequados, funcionar com teclado e adaptar-se à largura disponível sem ocultar ações essenciais.

## 9. Critérios de aceitação

| ID | Verificação |
| --- | --- |
| CA-BF-01 | Biblioteca carrega materiais publicados sem exigir pesquisa. |
| CA-BF-02 | Busca por título encontra correspondências válidas. |
| CA-BF-03 | Busca por tema/palavras-chave encontra correspondências válidas. |
| CA-BF-04 | Duas opções no mesmo filtro usam OU. |
| CA-BF-05 | Categorias diferentes usam E. |
| CA-BF-06 | A pesquisa textual é combinada com os filtros. |
| CA-BF-07 | Fechar sem Aplicar não altera a consulta. |
| CA-BF-08 | Aplicar atualiza resultados sem apagar as demais categorias. |
| CA-BF-09 | Reabrir exibe as seleções confirmadas. |
| CA-BF-10 | Uma nova busca preserva filtros válidos. |
| CA-BF-11 | Ausência de correspondências mostra orientação e ações de recuperação. |
| CA-BF-12 | Acervo vazio e pesquisa sem resultados possuem mensagens diferentes. |
| CA-BF-13 | Falha de consulta recebe mensagem e nova tentativa quando possível. |
| CA-BF-14 | Uma resposta antiga não substitui a consulta atual. |
| CA-BF-15 | Retornar dos detalhes recupera o estado da pesquisa, quando viável. |
| CA-BF-16 | Alterar critérios reinicia a paginação. |
| CA-BF-17 | A paginação não duplica nem omite materiais. |
| CA-BF-18 | A ordem padrão permanece estável entre páginas. |
| CA-BF-19 | A lista Tipo inclui Jogo como sexta opção. |
| CA-BF-20 | Abordagem filtra Plugada, Desplugada e materiais com ambas. |
| CA-BF-21 | Os cartões apresentam ícones de abordagem e ano/série adequado à etapa. |
| CA-BF-22 | Salvos pesquisa apenas a coleção da conta e distingue coleção vazia de busca sem resultado. |

## 10. Definições técnicas pendentes

- [ ] Fixar o critério de ordenação padrão e o desempate entre materiais.
- [ ] Definir a estratégia de múltiplos termos em título e tags, os índices e a normalização.
- [ ] Estabelecer parâmetros da URL e restauração da rolagem.
- [ ] Verificar a navegação, o foco e o anúncio dos filtros e resultados em leitores de tela.

## 11. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Especificação de metadados](especificacao-metadados.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
