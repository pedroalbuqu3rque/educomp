# EduComp — Histórias de usuário

**Versão:** 1.0 · **Data:** 10/11/2026 · **Situação:** histórias planejadas; critérios ainda não testados na aplicação.

## 1. Finalidade

As histórias descrevem necessidades de visitantes, professores e revisores. Os códigos existentes foram preservados para manter a rastreabilidade. A **US-005** permanece reservada a links externos de materiais, fora do MVP. Novos códigos cobrem comunidade, perfis públicos, moderação, notificações e contato.

## 2. Entrada, autenticação e perfil

### US-018 — Conhecer a plataforma

**Como** visitante, **quero** entender o EduComp e abrir a Biblioteca, **para** conhecer os materiais disponíveis.

- [ ] Início apresenta a proposta e caminhos para Biblioteca, Entrar e Criar conta.
- [ ] Visitantes consultam Biblioteca e detalhes sem criar conta.
- [ ] A logo do cabeçalho permite retornar ao Início.

**Requisito:** RF-020.

### US-014 — Criar conta

**Como** professor, **quero** criar uma conta, **para** utilizar as áreas pessoais.

- [ ] Nome, e-mail e senha são validados; contas duplicadas são tratadas.
- [ ] A interface orienta a conclusão e o caminho para login.
- [ ] O cadastro não concede papel de revisor.

**Requisito:** RF-015.

### US-015 — Entrar e sair

**Como** professor cadastrado, **quero** entrar e sair com segurança, **para** acessar meus dados.

- [ ] Credenciais corretas iniciam sessão; inválidas apresentam erro.
- [ ] Ação protegida pode ser retomada após o login, quando aplicável.
- [ ] Sair encerra a sessão; ações restritas são verificadas no servidor.

**Requisito:** RF-016.

### US-016 — Recuperar senha

**Como** professor, **quero** redefinir uma senha esquecida, **para** recuperar meu acesso.

- [ ] É possível solicitar instruções por e-mail sem revelar indevidamente se a conta existe.
- [ ] Links expirados ou inválidos são rejeitados e orientam nova solicitação.
- [ ] A redefinição confirmada oferece retorno ao login.

**Requisito:** RF-017.

### US-017 — Atualizar o perfil

**Como** professor autenticado, **quero** manter minhas informações corretas, **para** identificar minhas contribuições.

- [ ] Perfil apresenta nome, foto, cargo/função, e-mail e campo *Sobre mim*.
- [ ] É possível alterar os dados autorizados e a senha, com validação e persistência.
- [ ] A foto selecionada tem prévia e opção de escolher outra imagem antes de salvar.
- [ ] Dados privados não são expostos no perfil público.

**Requisitos:** RF-018, RF-024.

## 3. Biblioteca e descoberta

### US-001 — Explorar a Biblioteca

**Como** professor, **quero** consultar os materiais publicados, **para** escolher recursos para minhas aulas.

- [ ] A listagem pública exibe cartões com dados reais, 12 por página e total correto.
- [ ] Cards apresentam tipo, título, resumo, etapa/ano ou série, ícones de abordagem e favorito.
- [ ] É possível abrir detalhes e navegar entre páginas sem duplicação.

**Requisitos:** RF-001, RF-003, RF-005.

### US-002 — Pesquisar materiais

**Como** professor, **quero** buscar por título ou tema, **para** localizar um conteúdo específico.

- [ ] Enter e Buscar executam pesquisa em título e palavras-chave.
- [ ] Diferenças de caixa e acento não impedem a correspondência.
- [ ] A busca convive com os filtros e informa a ausência de resultados.

**Requisitos:** RF-002, RF-005.

### US-003 — Filtrar materiais

**Como** professor, **quero** combinar filtros, **para** encontrar atividades adequadas ao contexto da turma.

- [ ] Tipo inclui **Jogo**; há filtros separados para Tipo, Etapa, Eixo e Abordagem.
- [ ] A abordagem identifica Plugada e Desplugada, inclusive em materiais com ambas.
- [ ] Aplicar confirma a seleção; Limpar afeta apenas a categoria aberta; fechar sem aplicar não muda os resultados.
- [ ] Filtros distintos combinam-se com a pesquisa; uma consulta sem correspondências mantém os critérios para revisão.

**Requisitos:** RF-004, RF-005.

## 4. Detalhes, arquivos e autoria

### US-004 — Consultar detalhes

**Como** professor, **quero** ler as informações de um material, **para** decidir como utilizá-lo.

- [ ] A página pública mostra classificação, ano/série, abordagem, descrição, objetivos e autoria quando presentes.
- [ ] Campos opcionais ausentes não aparecem preenchidos artificialmente.
- [ ] O autor pode ser acessado pelo link para o perfil público.

**Requisito:** RF-006.

### US-006 — Acessar arquivos

**Como** professor, **quero** obter os arquivos associados, **para** preparar minhas aulas.

- [ ] Recursos disponíveis têm ação identificável.
- [ ] Autenticação e permissão são verificadas antes de liberar o arquivo.
- [ ] Um visitante encaminhado ao login pode retomar a tentativa de acesso quando viável.

**Requisito:** RF-008.

### US-007 — Identificar arquivos disponíveis

**Como** professor, **quero** conhecer os arquivos disponíveis, **para** selecionar o recurso correto.

- [ ] A interface mostra os arquivos vinculados e não inventa acessos inexistentes.
- [ ] Falha de um arquivo não elimina os demais dados do material.

**Requisito:** RF-009.

### US-008 — Entender falhas de acesso

**Como** professor, **quero** receber uma explicação quando não consigo abrir um arquivo, **para** saber como continuar.

- [ ] Falta de login, ausência de permissão e indisponibilidade são tratadas adequadamente.
- [ ] A interface não confirma download que não ocorreu e oferece continuidade quando possível.

**Requisito:** RF-010.

### US-024 — Conhecer o perfil do autor

**Como** visitante ou professor, **quero** abrir o perfil público do autor, **para** conhecer seus materiais publicados.

- [ ] O perfil apresenta nome, avatar, apresentação autorizada e materiais publicados.
- [ ] E-mail e dados pessoais restritos não são exibidos.
- [ ] É possível voltar ao material consultado.

**Requisito:** RF-024.

## 5. Materiais salvos

### US-010 — Salvar e reencontrar materiais

**Como** professor autenticado, **quero** guardar materiais, **para** consultá-los depois.

- [ ] Salvar/remover altera a coleção da conta e o estado visual do favorito.
- [ ] Salvos mostra a coleção sem duplicações, permite buscar por título/tema e abrir detalhes.
- [ ] A coleção vazia apresenta orientação para explorar a Biblioteca.

**Requisito:** RF-012.

## 6. Comunidade e moderação

### US-019 — Participar das discussões

**Como** professor autenticado, **quero** comentar e responder sobre um material, **para** trocar dúvidas e sugestões.

- [ ] Todos, Relatos de aplicação e Discussões filtram o conteúdo na mesma página.
- [ ] Comentários são textuais e têm até 1.000 caracteres; respostas têm um único nível.
- [ ] Publicar requer login e confirmação do sistema; campos inválidos geram feedback.

**Requisitos:** RF-021, RF-022.

### US-020 — Registrar aplicação em aula

**Como** professor, **quero** compartilhar como usei uma atividade, **para** ajudar outros docentes.

- [ ] O relato informa ano/série da turma, experiência e adaptações opcionais.
- [ ] A interface orienta a não incluir nomes, fotos ou dados pessoais de estudantes.
- [ ] O relato publicado aparece na seção correspondente do material.

**Requisito:** RF-022.

### US-021 — Gerenciar a própria contribuição

**Como** autor de um comentário, **quero** editá-lo ou excluí-lo, **para** corrigir ou retirar meu conteúdo.

- [ ] Apenas o autor autenticado dispõe das ações comuns de edição/exclusão.
- [ ] Excluir pede confirmação; sucesso e falha correspondem ao estado real.

**Requisito:** RF-023.

### US-022 — Denunciar conteúdo

**Como** professor autenticado, **quero** comunicar conteúdo inadequado, **para** preservar a utilidade e a segurança da comunidade.

- [ ] A denúncia solicita um motivo e é associada à conta autenticada.
- [ ] A denúncia é registrada para avaliação, sem ocultar automaticamente o conteúdo.
- [ ] A identidade de quem denunciou não aparece publicamente.

**Requisito:** RF-025.

### US-023 — Moderar uma denúncia

**Como** revisor autorizado, **quero** avaliar o contexto e decidir sobre um comentário denunciado, **para** aplicar regras de convivência.

- [ ] A fila mostra denúncia, motivo, comentário e material relacionado.
- [ ] O revisor pode ocultar, restaurar ou excluir definitivamente, com confirmação para exclusão.
- [ ] A decisão registra responsável, data e motivo e altera a visibilidade pública adequadamente.

**Requisito:** RF-026.

## 7. Envio e revisão de materiais

### US-009 — Enviar um material

**Como** professor autenticado, **quero** enviar meu recurso, **para** submetê-lo à avaliação.

- [ ] O formulário valida título, descrição, tags, tipos, etapas/anos, eixos, abordagem, autoria, arquivos e direitos.
- [ ] É possível informar classificações e arquivos múltiplos; cada arquivo respeita o limite de 20 MB.
- [ ] Erros são apresentados de forma recuperável; envio válido começa como Pendente.
- [ ] Após a confirmação, há acesso a Meus envios.

**Requisito:** RF-011.

### US-013 — Acompanhar meus envios

**Como** professor que contribuiu, **quero** consultar a situação dos materiais, **para** conhecer o resultado da revisão.

- [ ] Meus envios mostra apenas as contribuições da própria conta.
- [ ] Estados de revisão/publicação e justificativa de recusa são apresentados corretamente.
- [ ] Se houver solicitação de ajustes, o próximo passo é explicado sem confundir o material com um recurso publicado.

**Requisito:** RF-019.

### US-012 — Revisar submissões

**Como** revisor autorizado, **quero** decidir sobre os envios, **para** manter a qualidade e a segurança do acervo.

- [ ] Somente revisores acessam lista e detalhes restritos.
- [ ] Iniciar análise altera explicitamente Pendente para Em análise.
- [ ] Aprovação e recusa são registradas; recusa exige justificativa.
- [ ] Disponibilidade pública pode ser controlada sem reclassificar a aprovação.

**Requisito:** RF-014.

## 8. Comunicação e informações institucionais

### US-025 — Acompanhar notificações

**Como** professor autenticado, **quero** receber atualizações, **para** acompanhar meus materiais e as novidades do EduComp.

- [x] Notificações cobrem situação de materiais, novos conteúdos e notícias da plataforma.
- [x] A central apresenta lidas/não lidas, marcação de todas como lidas, lista completa e estado vazio.
- [x] Mensagens acionáveis levam ao contexto adequado, quando houver.

**Requisito:** RF-027.

### US-026 — Entrar em contato

**Como** pessoa que usa a plataforma, **quero** enviar uma mensagem, **para** esclarecer dúvidas ou comunicar problemas.

- [ ] Nome, e-mail, assunto e mensagem são validados.
- [ ] Sucesso ou falha é exibido somente após a operação correspondente.

**Requisito:** RF-028.

### US-011 — Compartilhar o EduComp

**Como** visitante, **quero** copiar ou compartilhar o endereço da plataforma, **para** apresentá-la a outros professores.

- [ ] Copiar link confirma o resultado e utiliza o endereço real da plataforma.
- [ ] Atalhos sociais não prometem integração que o serviço de destino não oferece.

**Requisito:** RF-013.

## 9. História reservada

### US-005 — Acessar material por URL externa

**Situação:** fora do MVP. O EduComp utilizará arquivos hospedados na plataforma. Os critérios serão definidos somente se essa modalidade for priorizada futuramente.

**Requisito reservado:** RF-007.

## 10. Aceite e documentos relacionados

Os critérios serão testados na aplicação funcional, com permissões de servidor, dados persistentes, tratamento de falhas e acessibilidade. A versão desktop é a primeira etapa, não a única forma de uso prevista.

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Backlog](backlog.md)
- [User Flow](../ux-ui/user-flow.md)
