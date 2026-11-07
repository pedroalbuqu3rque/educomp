# EduComp — Objetivos de UX

**Versão:** 1.0 · **Atualizado em:** 07/11/2026 · **Situação:** objetivos definidos; testes com professores ainda não realizados.

## 1. Propósito

Estes objetivos orientam a experiência de quem procura, utiliza e compartilha materiais de Computação no EduComp. Servem para avaliar as decisões de interface e a versão funcional, mas não são resultados de pesquisa já obtidos.

## 2. Descoberta e compreensão

**OUX-001 — Encontrar materiais com autonomia.** A Biblioteca deve permitir começar sem pesquisa, reconhecer rapidamente os cartões e abrir detalhes sem perder o contexto.

**OUX-002 — Tornar a busca previsível.** O usuário deve identificar o campo de pesquisa, saber quando a consulta foi enviada e entender a ausência de resultados. O botão Buscar e a tecla Enter são acionadores reconhecíveis.

**OUX-003 — Facilitar o uso dos filtros.** Tipo, Etapa, Eixo e Abordagem aparecem como controles distintos. Seleção, Aplicar e Limpar devem comunicar efeitos previsíveis, inclusive quando há mais de um filtro ativo.

**OUX-004 — Apoiar a escolha pedagógica.** Título, resumo, ano/série, eixo e abordagem devem estar visíveis no nível adequado. Os ícones de atividades plugadas e desplugadas devem ser compreensíveis e ter texto acessível, sem poluir os cartões com tags redundantes.

**OUX-005 — Explicar o acesso aos arquivos.** É preciso distinguir consulta pública de detalhes, obtenção autenticada de arquivos e indisponibilidade de um recurso.

**OUX-006 — Recuperar falhas e estados vazios.** Não confundir busca sem correspondências com acervo vazio, coleção sem favoritos ou falha técnica. As mensagens devem indicar uma ação possível quando existir.

## 3. Conta e organização pessoal

**OUX-008 — Orientar autenticação e recuperação.** Cadastro, login, recuperação de senha e links expirados precisam ter caminhos claros, feedback específico e proteção de informações sensíveis.

**OUX-009 — Tornar os favoritos úteis.** O usuário deve reconhecer quando salvou um material e reencontrá-lo na coleção, inclusive pela busca de Salvos. Uma coleção vazia deve convidar à descoberta, não parecer erro.

**OUX-011 — Facilitar o perfil.** Nome, foto, cargo/função, apresentação e configurações de acesso devem ser organizados por finalidade. A prévia de foto precisa mostrar o resultado esperado antes de salvar, sem sugerir um editor de recorte inexistente.

**OUX-012 — Dar clareza ao compartilhamento.** A interface deve indicar que copia ou compartilha o endereço do EduComp e informar o resultado real da operação.

## 4. Participação, confiança e segurança

**OUX-014 — Aproximar professores.** Comentários, dúvidas, respostas e relatos de aplicação devem ser apresentados no contexto do material. Alternar entre Todos, Relatos e Discussões deve ocorrer **na própria página**, sem interromper a leitura com modal.

**OUX-015 — Valorizar autoria sem expor dados privados.** Perfis públicos ajudam a reconhecer a trajetória do autor e seus materiais. E-mail e informações pessoais restritas não participam da apresentação pública.

**OUX-016 — Tornar a denúncia responsável.** O professor precisa entender os motivos disponíveis, que a denúncia será analisada e que o conteúdo não será ocultado automaticamente.

**OUX-017 — Dar segurança à moderação.** O revisor deve compreender contexto, consequências e confirmação de ações como ocultar, restaurar ou excluir. Ações definitivas merecem confirmação explícita.

## 5. Contribuição e acompanhamento

**OUX-010 — Tornar o envio compreensível.** Campos obrigatórios, classificações múltiplas, anos/séries, abordagem plugada/desplugada e arquivos devem ser preenchidos sem ambiguidades. O sistema deve permitir corrigir erros e acompanhar o envio.

**OUX-013 — Dar clareza à avaliação editorial.** A interface de revisão distingue Pendente, Em análise, Aprovado e Recusado. A recusa requer justificativa; aprovação e publicação não são sinônimos.

**OUX-018 — Tornar notificações úteis.** Avisos sobre os próprios materiais, novos conteúdos e notícias da plataforma precisam ter linguagem específica, estado de leitura e acesso ao contexto quando disponível.

**OUX-019 — Facilitar o contato.** O formulário institucional deve deixar claros os campos obrigatórios e comunicar tanto o envio concluído quanto a falha.

## 6. Acessibilidade e consistência

**OUX-007 — Preservar legibilidade e controle.** A experiência deve ter rótulos claros, foco visível, navegação por teclado, semântica adequada e contrastes suficientes. Ícones não podem transmitir informação exclusivamente visual. Diálogos e filtros devem respeitar a ordem do foco; o fundo desfocado não deve competir com o conteúdo ativo.

A implementação inicia pelo desktop, mas os fluxos devem adaptar-se a tablet e celular. A referência de avaliação de acessibilidade será a **WCAG 2.2 AA**.

## 7. Avaliação prevista

Os testes moderados serão realizados com um grupo de professores quando houver um ambiente adequado. Não existem medidas atuais de sucesso, satisfação ou ganho de tempo.

| Tarefa | O que observar |
| --- | --- |
| Encontrar um material | Compreensão da busca, dos cartões e da classificação pedagógica. |
| Combinar filtros | Interpretação de Tipo, Etapa, Eixo e Abordagem; resultado de Aplicar e Limpar. |
| Consultar detalhes e arquivos | Identificação de autoria, objetivo, acesso e restrições. |
| Salvar e recuperar um recurso | Mudança de estado e localização do material em Salvos. |
| Participar da discussão | Distinção entre comentário e relato; resposta, edição e denúncia. |
| Enviar um material | Compreensão dos campos, arquivos, validação e acompanhamento. |
| Revisar um envio ou denúncia | Entendimento de permissões, decisões e consequências. |
| Gerenciar perfil ou notificações | Clareza de dados públicos/privados, prévia de foto e leitura de avisos. |
| Enviar mensagem de contato | Reconhecimento dos campos e do resultado. |

Durante os testes deverão ser registrados conclusão de tarefas, erros, dúvidas, necessidade de ajuda e comentários. As verificações de teclado, leitores de tela e responsividade complementam os testes com participantes.

## 8. Documentos relacionados

- [Product Brief](../product/product-brief.md)
- [Requisitos](../product/requisitos.md)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)
