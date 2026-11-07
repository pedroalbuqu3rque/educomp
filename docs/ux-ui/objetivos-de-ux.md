# EduComp — Objetivos de UX

**Versão:** 0.8  
**Atualizado em:** 07/11/2026  
**Situação:** objetivos definidos para o MVP; validação com professores ainda não realizada.

## 1. Propósito

Este documento reúne os objetivos que orientam a experiência de uso do EduComp. O foco é ajudar professores da Educação Básica a encontrar, avaliar, guardar e enviar materiais pedagógicos de Computação com clareza e autonomia.

Os objetivos orientam o desenho das interfaces e os testes de usabilidade. Não substituem as regras funcionais dos [Requisitos](../product/requisitos.md) nem descrevem resultados já alcançados. O projeto ainda não foi testado com professores.

## 2. Objetivos de experiência

### Descoberta e consulta

**OUX-001 — Facilitar a descoberta de materiais**

A Biblioteca deve permitir reconhecer rapidamente o conteúdo dos cartões e abrir os detalhes de um material sem perder o contexto da navegação. A organização da página precisa funcionar tanto para quem chega sem uma busca definida quanto para quem procura algo específico.

**OUX-002 — Tornar a pesquisa clara e previsível**

O campo de busca deve ser fácil de identificar, e a pessoa precisa entender quando uma pesquisa foi executada e quais resultados ela produziu. A busca será feita por título e palavras-chave, mediante Enter ou o botão Buscar. Também deve ser simples ajustar a consulta quando não houver correspondências.

**OUX-003 — Tornar os filtros compreensíveis e controláveis**

Os filtros por tipo de material, etapa de ensino e eixo da Computação devem deixar claro o que está selecionado e o que foi aplicado. As ações Aplicar e Limpar precisam ter resultados previsíveis: Limpar afeta apenas a categoria aberta, e fechar sem aplicar descarta alterações temporárias.

**OUX-004 — Apoiar a avaliação inicial dos materiais**

Os detalhes devem apresentar título, descrição, classificações, palavras-chave e autoria ou fonte de maneira legível. O professor precisa conseguir avaliar a pertinência de um recurso antes de abrir seus arquivos, sem depender de informações inventadas ou de uma pré-visualização integrada.

**OUX-005 — Tornar o acesso aos recursos transparente**

A consulta à Biblioteca e aos detalhes é pública, mas abrir arquivos exige login. Essa diferença deve aparecer de forma clara na interface. Quando um material tiver vários arquivos, a pessoa precisa identificar o que está disponível e entender eventuais restrições ou falhas de acesso.

**OUX-006 — Ajudar na recuperação de erros e estados vazios**

A interface deve diferenciar acervo vazio, pesquisa sem resultados e erro de carregamento. Falhas em login, favoritos, perfil ou envio precisam trazer mensagens específicas e, sempre que possível, indicar como continuar. Nenhuma operação deve ser apresentada como concluída antes da confirmação do sistema.

### Conta e organização pessoal

**OUX-008 — Orientar o acesso e o gerenciamento da conta**

Entrar, Criar conta e Recuperar senha devem ser caminhos fáceis de distinguir. Quando o professor precisar entrar para executar uma ação, a interface deve explicar essa exigência e permitir a retomada da tarefa após o login. Os formulários precisam identificar erros sem expor informações sensíveis.

**OUX-009 — Facilitar a organização dos materiais salvos**

Salvar e remover um favorito deve produzir uma mudança visível e coerente entre Biblioteca, Detalhes e Salvos. O professor precisa reconhecer quais materiais guardou e conseguir retomá-los depois. A coleção pessoal terá lista e ações de favoritos, sem pesquisa ou filtros próprios no MVP.

**OUX-011 — Facilitar a atualização do perfil**

O professor deve identificar quais informações pode alterar — nome, foto e senha — e quais são apenas de consulta, como o e-mail. Mensagens de confirmação e erro precisam informar o resultado real das alterações.

**OUX-012 — Tornar o compartilhamento básico previsível**

A ação de copiar link deve indicar explicitamente que compartilha o endereço da página inicial do EduComp, e não o de um material. O resultado da cópia precisa ser informado. Seu rótulo e sua posição no Figma ainda devem ser revistos para evitar interpretações equivocadas.

### Contribuição e revisão

**OUX-010 — Tornar o envio e o acompanhamento compreensíveis**

O formulário deve orientar o preenchimento de palavras-chave, classificações pedagógicas e arquivos, permitindo corrigir problemas antes do envio. Depois da submissão, o professor precisa entender que o material está pendente de revisão e encontrar facilmente sua situação na aba Meus envios. Em caso de recusa, a justificativa deve ser compreensível.

**OUX-013 — Facilitar a revisão de materiais**

O responsável autorizado deve conseguir localizar submissões, examinar suas informações e decidir com segurança. A interface precisa distinguir iniciar análise, aprovar e recusar, informar as consequências da decisão e exigir justificativa para a recusa. Também deve deixar clara a diferença entre aprovação e disponibilidade pública do material.

### Acessibilidade e consistência

**OUX-007 — Preservar acessibilidade, legibilidade e consistência**

Os fluxos devem manter rótulos compreensíveis, foco visível, navegação por teclado, contraste adequado e estados identificáveis sem depender apenas de cores. Componentes semelhantes devem ter comportamentos semelhantes. O desenvolvimento começa pelo desktop, mas a experiência em tablet e celular também integra o MVP. A WCAG 2.2 AA será a referência de acessibilidade para a avaliação.

## 3. Como avaliar a experiência

Estão previstos **testes moderados de tarefas com um pequeno grupo de professores**. Eles poderão ser feitos no protótipo ou em uma versão funcional, desde que os caminhos necessários estejam disponíveis para avaliação.

| Tarefa | O que observar |
| --- | --- |
| Explorar e pesquisar materiais | Se a pessoa encontra a Biblioteca, entende a busca e localiza um recurso. |
| Aplicar e remover filtros | Se compreende as seleções, o botão Aplicar e a ação Limpar. |
| Consultar detalhes e tentar abrir um arquivo | Se identifica informações do material e entende a exigência de login. |
| Salvar e recuperar um favorito | Se reconhece a mudança de estado e encontra o material em Salvos. |
| Enviar um material | Se entende os campos, corrige erros e reconhece que o envio ainda depende de revisão. |
| Acompanhar ou revisar uma submissão | Se interpreta as situações e, no caso do revisor, compreende as ações disponíveis. |
| Atualizar o perfil ou copiar o link | Se identifica o que pode alterar e qual endereço será compartilhado. |

Durante os testes, serão registrados a conclusão das tarefas, as dúvidas, as tentativas malsucedidas, a necessidade de ajuda e os comentários dos participantes. Também serão feitas verificações de acessibilidade, navegação por teclado e adaptação para diferentes tamanhos de tela.

Os cenários, os participantes e a forma de registro serão definidos antes da avaliação. Ainda não há dados que permitam afirmar taxas de sucesso, níveis de satisfação ou ganhos de tempo.

## 4. Ajustes de interface ainda necessários

- [ ] Adicionar ao envio as palavras-chave, as classificações múltiplas, a seleção de anos/séries e o upload de vários arquivos.
- [ ] Desenhar a área restrita de revisão e seus estados de decisão.
- [ ] Revisar o rótulo e a localização da ação que copia o link da página inicial.
- [ ] Conferir os estados de erro, o comportamento por teclado e a adaptação dos fluxos para tablet e celular.

Os detalhes de funcionamento que ainda faltam serão definidos nas especificações correspondentes, sem criar novos objetivos de UX desnecessariamente.

## 5. Documentos relacionados

- [Product Brief](../product/product-brief.md)
- [Escopo do MVP](../product/escopo-mvp.md)
- [Requisitos](../product/requisitos.md)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [User Flow](user-flow.md)
- [Design System](design-system.md)
- [Handoff de UI/UX](handoff.md)
