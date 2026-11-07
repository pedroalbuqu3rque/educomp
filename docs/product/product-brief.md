# EduComp — Product Brief

**Versão:** 0.8  
**Atualizado em:** 07/11/2026  
**Situação:** planejamento do MVP; desenvolvimento não iniciado.

## 1. Visão geral

O EduComp é um projeto de plataforma para professores da Educação Básica que trabalham com conteúdos de Computação. A ideia é reunir materiais pedagógicos em uma Biblioteca na qual seja possível encontrar recursos, conhecer suas características e salvá-los para consultas futuras.

Professores também poderão contribuir com o acervo. Antes de ser publicado, cada material enviado passará por revisão.

A plataforma pretende apoiar o planejamento docente, sem substituir a avaliação do professor sobre a adequação de cada recurso à sua turma.

## 2. Problema e hipótese

Professores podem precisar buscar materiais em diferentes fontes, nem sempre organizadas por etapa de ensino ou pelos eixos da Computação. Isso pode dificultar a localização e a comparação de recursos para as aulas.

O projeto parte da hipótese de que uma Biblioteca organizada, com pesquisa, filtros e informações claras, pode facilitar essa tarefa.

**A hipótese ainda não foi validada com professores.** O problema e a utilidade da solução serão avaliados em testes com o público, sem tratar suposições como resultados já comprovados.

## 3. Público

O público principal são **professores da Educação Básica** que procuram materiais para planejar e desenvolver atividades relacionadas à Computação.

A plataforma considera tanto quem deseja consultar e guardar recursos quanto quem pretende compartilhar materiais de sua autoria ou de fontes que tenha autorização para divulgar.

O funcionamento do acervo também depende de **revisores autorizados**, responsáveis por avaliar as contribuições antes da publicação. Esse é um papel de operação da plataforma, não um público separado para o qual o produto está sendo desenvolvido.

## 4. Proposta de valor

O EduComp busca oferecer um lugar organizado para descobrir e consultar materiais de Computação, com quatro possibilidades centrais:

- **Encontrar materiais:** pesquisar por título e palavras-chave e filtrar por tipo, etapa de ensino e eixo da Computação.
- **Avaliar antes de acessar:** consultar descrição, autoria, classificações e outras informações do recurso.
- **Retomar o que interessa:** guardar materiais em uma lista pessoal de favoritos.
- **Contribuir com o acervo:** enviar materiais e acompanhar o resultado da revisão.

A proposta está na organização, na consulta e na circulação responsável dos recursos. Criar ou adaptar conteúdos pedagógicos dentro da plataforma não faz parte da primeira versão.

## 5. Experiência prevista para o MVP

O visitante poderá conhecer a plataforma, explorar a Biblioteca e abrir os detalhes de um material **sem criar uma conta**. Para acessar os arquivos, salvar favoritos ou enviar uma contribuição, será necessário entrar.

A Biblioteca terá pesquisa, filtros combináveis, ordenação e paginação. Os detalhes mostrarão as informações necessárias para que o professor decida se vale a pena consultar o recurso. Os arquivos ficarão hospedados na plataforma; links para materiais externos não serão aceitos nesta versão.

O professor autenticado poderá manter seus favoritos e enviar materiais para avaliação. Cada envio terá uma situação acompanhável em **Meus envios**. Um revisor autorizado poderá iniciar a análise, aprovar ou recusar o material, com justificativa obrigatória em caso de recusa.

A primeira implementação será feita para **desktop**, seguida pelas adaptações para tablet e celular. A responsividade faz parte da conclusão do MVP, não de uma etapa opcional.

Funcionalidades como comentários, notificações, login com Google e interações de comunidade ficam para possíveis versões posteriores. O conteúdo exato da primeira entrega está definido no [Escopo do MVP](escopo-mvp.md).

## 6. Princípios da experiência

- **Foco no professor:** a plataforma deve ajudar a encontrar e avaliar recursos, respeitando a autonomia docente.
- **Clareza:** pesquisa, filtros, informações e ações devem ser compreensíveis, inclusive quando não houver resultados ou um arquivo estiver indisponível.
- **Confiança no acervo:** autoria, classificações e condições de acesso devem ser apresentadas corretamente, com revisão antes da publicação.
- **Acesso e consistência:** os fluxos devem funcionar em diferentes tamanhos de tela e considerar navegação por teclado, contraste, rótulos e feedback adequado.

## 7. Como a proposta será avaliada

Estão previstos **testes moderados de tarefas com um pequeno grupo de professores**, inicialmente com o protótipo ou com uma versão funcional apropriada para avaliação.

Os testes deverão observar se os participantes conseguem localizar materiais, compreender os filtros e os detalhes, identificar as condições de acesso e utilizar as funções de favoritos e envio. Também será importante ouvir se a organização do acervo faz sentido para suas necessidades reais.

As dificuldades observadas orientarão ajustes na interface e, quando necessário, nas regras do produto. Ainda não existem resultados desses testes nem métricas de uso da plataforma.

## 8. Situação do projeto

O EduComp já possui documentação de produto e UX/UI, identidade visual e protótipos no Figma. As decisões centrais do MVP foram registradas, mas ainda há ajustes nas telas de envio e a interface restrita de revisão precisa ser desenhada.

**A aplicação ainda não foi desenvolvida ou testada.** As próximas etapas são concluir o alinhamento entre documentação e protótipo, definir os serviços e ferramentas de implementação e começar a construção da versão desktop.

## 9. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md) — funcionalidades incluídas e critérios de conclusão.
- [Requisitos](requisitos.md) — comportamentos e regras do sistema.
- [Histórias de usuário](historias-de-usuario.md) — necessidades e critérios de aceitação.
- [Backlog](backlog.md) — entregas e acompanhamento do trabalho.
- [Objetivos de UX](../ux-ui/objetivos-de-ux.md) — objetivos da experiência.
- [User Flow](../ux-ui/user-flow.md) — jornadas previstas para os usuários.
