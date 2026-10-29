# Especificação Funcional — BK-004 e BK-005

**Produto:** EduComp  
**Módulos:** Busca e filtros do catálogo pedagógico  
**Status:** Especificação consolidada a partir das decisões definidas para o MVP  
**Observação:** Decisões técnicas de implementação e pontos explicitamente pendentes estão sinalizados ao final.

## 1. Objetivo

Definir o comportamento funcional da busca textual e dos filtros do catálogo de materiais pedagógicos, garantindo resultados previsíveis, combinação consistente de critérios e preservação do contexto de navegação.

## 2. Princípios gerais

- A busca textual e os filtros devem funcionar em conjunto.
- A atualização dos resultados deve ocorrer automaticamente, sem botão para aplicar critérios.
- As seleções feitas pelo usuário não devem ser removidas automaticamente quando se tornarem incompatíveis com outros critérios.
- A interface deve informar claramente quando não houver resultados.
- O comportamento deve ser consistente entre telas grandes e dispositivos móveis.

## 3. BK-004 — Busca textual

### 3.1 Campos pesquisáveis

A busca deve considerar os seguintes campos de cada material:

1. Título;
2. Tipo de material;
3. Resumo;
4. Descrição.

### 3.2 Normalização da consulta

- A busca deve ignorar diferenças entre letras maiúsculas e minúsculas.
- A busca deve ignorar diferenças entre letras acentuadas e não acentuadas.
- Deve aceitar correspondências parciais, não exigindo que o usuário digite a palavra inteira.
- A normalização deve ser aplicada tanto à consulta quanto aos campos pesquisáveis.

### 3.3 Consultas com várias palavras

- Quando a consulta tiver mais de uma palavra, todas as palavras devem corresponder ao conteúdo pesquisável do material (lógica AND).
- As palavras podem corresponder a campos diferentes do mesmo material.
- A ordem das palavras digitadas não deve alterar a possibilidade de correspondência.

### 3.4 Ordenação por relevância

Os resultados devem ser ordenados pela seguinte prioridade de campos:

1. Título;
2. Tipo de material;
3. Resumo;
4. Descrição.

Dentro de um mesmo campo, uma correspondência exata deve ter prioridade sobre uma correspondência parcial.

A prioridade do campo prevalece sobre o grau de correspondência: uma correspondência parcial no título deve ficar antes de uma correspondência exata apenas na descrição.

Para consultas com várias palavras, materiais que correspondam a todos os termos em campos de maior prioridade devem aparecer antes de materiais cujos termos estejam distribuídos por campos de menor prioridade. Por exemplo, um material com todos os termos no título deve ficar acima de outro que tenha um termo no título e outro apenas na descrição.

### 3.5 Desempate

Quando dois ou mais materiais tiverem a mesma relevância:

1. Ordenar pelo título em ordem alfabética crescente;
2. A comparação do título deve ignorar maiúsculas/minúsculas e acentos;
3. Se os títulos forem equivalentes após normalização, ordenar pelo identificador único do material em ordem crescente.

### 3.6 Combinação com filtros

- A busca textual e os filtros ativos devem ser combinados com lógica AND.
- Limpar os filtros não deve apagar o texto digitado na busca.
- Alterar o texto da busca deve recalcular os resultados mantendo os filtros selecionados.

### 3.7 Atualização da busca

- Os resultados devem ser atualizados automaticamente após uma breve pausa na digitação (debounce).
- Não deve ser necessário pressionar Enter nem clicar em um botão de busca.
- Ao alterar a consulta, a lista deve voltar ao início.

O tempo exato do debounce é uma decisão de implementação e deve ser definido pela equipe técnica, considerando responsividade e desempenho.

### 3.8 Busca sem resultados

Quando não houver resultados, exibir a mensagem definida para o estado vazio: **“Não foram encontrados materiais para os critérios escolhidos”**.

A consulta original deve permanecer no campo de busca. O sistema não deve substituir automaticamente o texto digitado por uma sugestão.

A sugestão automática de correção da consulta está fora do escopo do MVP. O usuário pode alterar manualmente o texto da busca e os filtros.

## 4. BK-005 — Filtros

### 4.1 Filtros disponíveis

O catálogo deve oferecer filtros por:

- Tipo de material;
- Etapa de ensino.

As opções exibidas devem derivar dos valores existentes nos materiais do catálogo, em vez de depender de uma lista fixa que possa apresentar opções sem resultados.

### 4.2 Seleção múltipla

- Deve ser possível selecionar mais de um tipo de material.
- Deve ser possível selecionar mais de uma etapa de ensino.
- Dentro de um mesmo filtro, as opções selecionadas são combinadas com lógica OR. Exemplo: materiais do tipo “Plano de aula” OU “Atividade”.
- Entre filtros diferentes, os critérios são combinados com lógica AND. Exemplo: materiais que sejam “Plano de aula” OU “Atividade” E estejam associados à etapa selecionada.
- A busca textual também se combina com os filtros por lógica AND.

### 4.3 Atualização dinâmica das opções

As opções disponíveis em cada filtro devem ser recalculadas conforme os demais critérios ativos, para refletir as possibilidades do catálogo no contexto atual.

Se uma opção já selecionada se tornar incompatível com outros filtros:

- A seleção deve ser preservada;
- A opção deve continuar visível no controle, porém desabilitada para nova seleção;
- O usuário deve conseguir remover a seleção pelo marcador de filtro ativo;
- Quando aplicável, a interface deve indicar que a opção não possui resultados com os demais filtros ativos, por exemplo: **“Sem resultados com os outros filtros ativos”**.

O sistema não deve remover filtros automaticamente.

### 4.4 Ordenação das opções

As opções de tipo de material e etapa de ensino devem ser apresentadas em ordem alfabética crescente, ignorando diferenças entre maiúsculas/minúsculas e acentos.

Não devem ser exibidas contagens de materiais ao lado de cada opção individual.

### 4.5 Atualização dos resultados

- Os resultados devem atualizar imediatamente após selecionar ou remover um filtro.
- Não deve existir botão “Aplicar filtros”.
- Sempre que um filtro for adicionado ou removido, a lista de resultados deve voltar ao início.

### 4.6 Remoção individual e limpeza

Cada filtro selecionado deve poder ser removido individualmente, sem apagar a consulta textual nem os demais filtros.

O botão **“Limpar filtros”** deve remover apenas as seleções de tipo de material e etapa de ensino. O texto da busca deve ser preservado.

### 4.7 Marcadores de filtros ativos

- Exibir cada filtro ativo como um chip/marcador removível.
- Os marcadores devem aparecer acima dos resultados, abaixo da busca e dos controles de filtro.
- Em dispositivos móveis, os marcadores devem ficar fora do painel lateral de filtros.
- Em telas estreitas, os marcadores devem quebrar em múltiplas linhas; não usar rolagem horizontal como única forma de visualização.

### 4.8 Contagem de resultados

Exibir sempre o total de resultados correspondentes aos critérios atuais, acima da lista de materiais.

A contagem deve ser atualizada após qualquer alteração na consulta ou nos filtros. Ela é independente do contador exibido no botão móvel “Filtros (N)”. Não exibir contagem ao lado das opções individuais.

## 5. Comportamento responsivo

### 5.1 Telas grandes

- Os controles de tipo de material e etapa de ensino devem ficar diretamente visíveis.
- Cada opção deve usar caixa de seleção (checkbox), permitindo seleção múltipla.
- As listas de opções devem permanecer em ordem alfabética.

### 5.2 Dispositivos móveis

- Exibir o botão **“Filtros”** para abrir o painel de seleção de tipo de material e etapa de ensino.
- Quando houver seleções ativas, exibir o total dessas seleções no botão, por exemplo: **“Filtros (3)”**. O número representa a soma dos valores selecionados nos dois filtros, não o total de resultados.
- O painel deve ser um drawer lateral sobreposto ao catálogo.
- Não deve haver botão para aplicar filtros: as seleções atualizam os resultados imediatamente.
- Após selecionar ou desmarcar uma opção, o drawer deve permanecer aberto.
- As seções “Tipo de material” e “Etapa de ensino” devem ser expansíveis/recolhíveis de forma independente.
- Ambas as seções começam expandidas na primeira abertura.
- O estado expandido/recolhido de cada seção deve ser preservado ao fechar e reabrir o drawer.
- Não deve haver busca textual dentro das listas de opções de filtro.

### 5.3 Fechamento do drawer

O usuário deve conseguir fechar o drawer por meio de:

- Botão “X” ou “Fechar”;
- Toque fora do painel;
- Botão Voltar do dispositivo.

Fechar o drawer não deve alterar filtros selecionados nem o estado de expansão das seções. Se o drawer estiver aberto, o botão Voltar do dispositivo deve fechá-lo antes de navegar para fora da página.

## 6. Carregamento dos resultados

### 6.1 Carregamento inicial e incremental

- Carregar inicialmente até 12 materiais.
- Exibir o botão **“Carregar mais”** quando houver mais resultados disponíveis.
- Cada acionamento deve adicionar até 12 materiais à lista existente.
- Quando todos os resultados já tiverem sido carregados, ocultar o botão.
- Durante uma requisição, o botão deve ficar desabilitado e exibir **“Carregando...”**.
- Após o carregamento, se ainda houver resultados, restaurar o texto **“Carregar mais”**.

### 6.2 Falha ao carregar mais

Se houver falha ao buscar o próximo lote:

- Exibir **“Não foi possível carregar mais materiais”**;
- Exibir a ação **“Tentar novamente”**;
- Preservar os materiais já apresentados;
- Ao tentar novamente, repetir o lote que falhou, sem reiniciar a lista;
- Evitar materiais duplicados.

### 6.3 Mudança de critérios durante o carregamento

Se a consulta ou os filtros forem alterados enquanto um lote adicional estiver carregando:

- Invalidar a requisição associada aos critérios anteriores;
- Aplicar os novos critérios;
- Reiniciar a lista com os primeiros 12 resultados da nova consulta;
- Não adicionar à lista respostas tardias de requisições iniciadas com critérios antigos.

Se não for possível cancelar a requisição na camada de rede, a implementação deve invalidar logicamente a resposta antiga, por exemplo, usando identificador de consulta ou token de cancelamento.

## 7. Navegação e preservação de contexto

Ao abrir um material e retornar ao catálogo, preservar:

- Texto da busca;
- Filtros selecionados;
- Resultados exibidos para os critérios atuais;
- Posição de rolagem da lista;
- Estado expandido/recolhido das seções de filtros no drawer móvel.

Essa preservação é exigida durante a navegação na sessão atual. Uma atualização completa da página pode reiniciar o contexto, salvo decisão técnica posterior em contrário.

Ao retornar de um material sem alterar os critérios, preservar a posição anterior da lista. Quando a consulta textual ou qualquer filtro mudar, voltar ao início da lista.

## 8. Critérios de aceite

1. Dada uma consulta, o sistema pesquisa título, tipo, resumo e descrição.
2. A busca ignora maiúsculas/minúsculas e acentos e aceita correspondências parciais.
3. Em consultas com várias palavras, todas as palavras devem corresponder ao material, podendo estar em campos diferentes.
4. A ordenação respeita a prioridade título, tipo, resumo e descrição; a prioridade do campo prevalece sobre a exatidão da correspondência em campos inferiores.
5. Empates são resolvidos pelo título normalizado em ordem alfabética e, depois, pelo identificador único crescente.
6. Seleções múltiplas dentro do mesmo filtro usam OR; filtros diferentes e busca textual usam AND.
7. As opções de filtros refletem os valores existentes no catálogo e são ordenadas alfabeticamente.
8. Uma opção selecionada que se torne incompatível permanece selecionada, visível e desabilitada; pode ser removida pelo chip correspondente.
9. Selecionar ou remover filtros atualiza os resultados sem botão de aplicação e retorna a lista ao início.
10. “Limpar filtros” remove apenas os filtros de tipo e etapa, preservando o texto pesquisado.
11. O total de resultados é exibido e atualizado acima da lista.
12. No celular, o botão “Filtros (N)” conta somente as seleções de tipo e etapa.
13. O drawer móvel pode ser fechado pelos três mecanismos definidos e preserva seleções e estados das seções.
14. Ao voltar de um material, o catálogo preserva consulta, filtros, rolagem e estado das seções, desde que os critérios não tenham mudado.
15. A lista começa com até 12 materiais e “Carregar mais” adiciona lotes de até 12, sem duplicações.
16. Uma falha no carregamento incremental preserva os materiais existentes e permite repetir o lote com falha.
17. Alterações de consulta/filtros durante carregamento impedem que respostas antigas contaminem os novos resultados.
18. O estado vazio apresenta “Não foram encontrados materiais para os critérios escolhidos”.

## 9. Pontos técnicos a definir

- Valor exato do debounce da busca textual.
- Estratégia de implementação e desempenho para normalização de acentos e ranqueamento por relevância.
- Estratégia técnica para invalidar/cancelar requisições antigas durante mudanças de critérios.
- Forma de manter o contexto de navegação e a posição de rolagem no framework adotado.
- Viabilidade e prioridade de sugestões de correção para consultas sem resultados.
- Definição de como comparar identificadores únicos caso não sejam numéricos; a especificação atual pressupõe ordenação crescente consistente.

## 10. Fora do escopo específico da busca e dos filtros

Os itens abaixo estão fora do escopo da busca e filtros; isso não exclui as funcionalidades aprovadas de envio, favoritos e compartilhamento documentadas em `requisitos.md` e `historias-de-usuario.md`.

- Busca dentro das opções dos filtros.
- Contagem de materiais ao lado de cada opção individual de filtro.
- Paginação tradicional ou rolagem infinita; o padrão definido é o botão “Carregar mais”.
- Alteração automática ou remoção automática de filtros incompatíveis.
- Substituição automática da consulta original por uma sugestão de correção.

## 11. Observação sobre estados vazios

A mensagem geral de ausência de resultados e o botão “Limpar filtros” estão definidos. Como “Limpar filtros” preserva o texto da busca, recomenda-se avaliar uma ação separada de “Limpar busca” para o caso em que somente a consulta textual cause ausência de resultados. Essa ação ainda precisa ser validada antes de ser considerada requisito fechado do MVP.
