# EduComp — Histórias de usuário

**Versão:** 0.7  
**Data:** 07/11/2026  
**Situação:** critérios definidos para o MVP; desenvolvimento não iniciado.

## 1. Finalidade

As histórias descrevem o que as pessoas precisam fazer no EduComp e como verificar se cada entrega funciona. Os detalhes de comportamento ficam nos [Requisitos](requisitos.md) e nas especificações de [busca e filtros](especificacao-busca-filtros.md) e [metadados](especificacao-metadados.md).

Os códigos `US-001` a `US-018` foram preservados. São **17 histórias previstas para o MVP** e uma reservada para evolução futura (`US-005`). Os critérios abaixo ainda não foram testados.

O desenvolvimento começará pelo desktop, mas as histórias do MVP também deverão funcionar nas versões responsivas.

## 2. Acesso e conta

### US-018 — Conhecer a plataforma

**Como** visitante, **quero** conhecer o EduComp e acessar a Biblioteca, **para** explorar os materiais disponíveis.

**Critérios de aceitação**

- [ ] O Início apresenta a proposta da plataforma e caminhos para Biblioteca, Entrar e Criar conta.
- [ ] É possível consultar a Biblioteca e os detalhes dos materiais sem conta.
- [ ] Ações que exigem login informam essa condição antes de prosseguir.

**Requisito:** RF-020.

### US-014 — Criar conta

**Como** professor, **quero** me cadastrar, **para** utilizar as funcionalidades pessoais do EduComp.

**Critérios de aceitação**

- [ ] O cadastro solicita nome, e-mail e senha; aceita e-mails pessoais e institucionais.
- [ ] Dados inválidos e e-mails já cadastrados são tratados sem criar uma segunda conta.
- [ ] Após o cadastro, o usuário é orientado a entrar, respeitando eventual verificação de e-mail exigida pelo serviço de autenticação.
- [ ] O cadastro comum não concede acesso à revisão de materiais.

**Requisito:** RF-015.

### US-015 — Entrar e sair da plataforma

**Como** professor cadastrado, **quero** entrar e sair da minha conta, **para** acessar meus dados com segurança.

**Critérios de aceitação**

- [ ] Credenciais válidas iniciam a sessão; credenciais inválidas apresentam erro.
- [ ] Após entrar, o professor retoma a ação que exigiu login ou, se não houver uma, vai para a Biblioteca.
- [ ] Sair encerra a sessão e impede novas operações protegidas sem autenticação.
- [ ] Estar autenticado não permite executar ações reservadas ao revisor.

**Requisito:** RF-016.

### US-016 — Recuperar senha

**Como** professor que esqueceu sua senha, **quero** redefini-la por e-mail, **para** recuperar o acesso.

**Critérios de aceitação**

- [ ] O usuário pode solicitar instruções pelo e-mail informado, sem exposição indevida da existência da conta.
- [ ] Apenas links válidos e não expirados permitem redefinir a senha.
- [ ] Após a alteração, a interface confirma o resultado e oferece retorno ao login.

**Requisito:** RF-017.

### US-017 — Atualizar o perfil

**Como** professor autenticado, **quero** atualizar meu perfil, **para** manter meus dados corretos.

**Critérios de aceitação**

- [ ] O professor pode consultar seus dados e alterar nome, foto e senha.
- [ ] O e-mail é exibido, mas não pode ser editado no MVP.
- [ ] As alterações são validadas, persistidas e acompanhadas de confirmação ou erro.
- [ ] Uma conta não pode alterar os dados de outra.

**Requisito:** RF-018.

## 3. Biblioteca e descoberta

### US-001 — Explorar a Biblioteca

**Como** professor, **quero** visualizar os materiais da Biblioteca, **para** encontrar recursos para minhas aulas.

**Critérios de aceitação**

- [ ] A listagem pública mostra apenas materiais aprovados e publicados.
- [ ] Os resultados são apresentados em páginas de até 12 materiais, com total real e navegação entre páginas.
- [ ] A ordenação inicial é por mais recentes, com opção de ordem alfabética por título.
- [ ] É possível abrir os detalhes; estados de carregamento, acervo vazio e falha são identificáveis.

**Requisitos:** RF-001, RF-003 e RF-005.

### US-002 — Pesquisar materiais

**Como** professor, **quero** pesquisar por título ou palavras-chave, **para** localizar materiais sobre um assunto.

**Critérios de aceitação**

- [ ] A pesquisa é executada por Enter ou pelo botão Buscar, sem consulta automática a cada tecla.
- [ ] A busca ignora diferenças entre maiúsculas e minúsculas e entre letras com ou sem acento, aceitando trechos de palavras.
- [ ] Consultas com várias palavras exigem correspondência de todos os termos, sem exigir a mesma ordem.
- [ ] A pesquisa funciona junto aos filtros aplicados; uma resposta antiga não substitui resultados mais recentes.
- [ ] O texto pesquisado é preservado na URL e pode ser alterado ou removido.

**Requisitos:** RF-002 e RF-005.

### US-003 — Filtrar materiais

**Como** professor, **quero** combinar filtros pedagógicos, **para** restringir a Biblioteca aos recursos de interesse.

**Critérios de aceitação**

- [ ] Há filtros por tipo de material, etapa de ensino e eixo da Computação, com seleção múltipla.
- [ ] Opções da mesma categoria usam **OU**; categorias diferentes e pesquisa textual usam **E**.
- [ ] **Aplicar** confirma as seleções; **Limpar** desmarca apenas a categoria aberta e também exige Aplicar.
- [ ] Fechar sem aplicar descarta alterações temporárias; reabrir mostra as seleções confirmadas.
- [ ] Opções sem resultados continuam selecionáveis, com estado vazio quando necessário.
- [ ] Alterar critérios volta à primeira página e preserva os filtros aplicados na URL.

**Requisitos:** RF-004 e RF-005.

## 4. Detalhes e arquivos

### US-004 — Consultar detalhes do material

**Como** professor, **quero** consultar as informações de um material, **para** avaliar se ele é adequado à minha aula.

**Critérios de aceitação**

- [ ] Os detalhes são públicos e exibem título, descrição, palavras-chave, classificações e autoria ou fonte.
- [ ] Ano/série e objetivos de aprendizagem aparecem quando cadastrados, sem preenchimento fictício de campos opcionais.
- [ ] Os arquivos associados são identificados, com indicação de que o acesso exige login.
- [ ] É possível retornar à Biblioteca com a pesquisa e os filtros preservados.

**Requisito:** RF-006.

### US-006 — Acessar arquivos hospedados

**Como** professor, **quero** abrir os arquivos de um material, **para** consultar ou utilizar seu conteúdo.

**Critérios de aceitação**

- [ ] Cada arquivo disponível possui uma ação de acesso identificável.
- [ ] Ao tentar abrir um arquivo sem login, o visitante é encaminhado à autenticação e pode retomar a ação depois de entrar.
- [ ] A obtenção do arquivo exige autorização também no serviço que o disponibiliza.
- [ ] Arquivos ausentes ou indisponíveis não são apresentados como acessíveis.

**Requisito:** RF-008.

### US-007 — Identificar arquivos disponíveis

**Como** professor, **quero** saber quais arquivos acompanham um material, **para** escolher o que preciso acessar.

**Critérios de aceitação**

- [ ] Os detalhes identificam os arquivos associados ao material, quando disponíveis.
- [ ] A interface diferencia arquivo disponível de arquivo indisponível.
- [ ] Quando não houver arquivo acessível, a situação é informada sem oferecer um link inexistente.

**Requisito:** RF-009.

### US-008 — Entender falhas de acesso

**Como** professor, **quero** entender por que não consegui acessar um arquivo, **para** saber como continuar.

**Critérios de aceitação**

- [ ] A interface diferencia falta de login, ausência de permissão e indisponibilidade quando essas situações puderem ser identificadas.
- [ ] Um erro ao abrir o arquivo não remove automaticamente os dados do material.
- [ ] A mensagem apresenta orientação ou nova tentativa quando aplicável, sem revelar informações protegidas.

**Requisito:** RF-010.

## 5. Materiais salvos

### US-010 — Salvar e reencontrar materiais

**Como** professor autenticado, **quero** manter uma lista de favoritos, **para** retomar materiais de interesse.

**Critérios de aceitação**

- [ ] O professor pode salvar e remover materiais na Biblioteca ou nos detalhes, conforme os controles disponíveis.
- [ ] Salvos apresenta somente os favoritos da conta, sem duplicar um mesmo material.
- [ ] As alterações persistem entre sessões e são refletidas nas interfaces relacionadas.
- [ ] Uma coleção vazia apresenta mensagem apropriada; cada item permite abrir seus detalhes.

**Requisito:** RF-012.

A área Salvos não terá pesquisa nem filtros próprios no MVP.

## 6. Envio e revisão de materiais

### US-009 — Enviar material

**Como** professor autenticado, **quero** enviar um material, **para** submetê-lo à avaliação e possível publicação.

**Critérios de aceitação**

- [ ] O formulário exige título, descrição, ao menos uma palavra-chave, tipo, etapa, eixo, autoria ou fonte e declaração de direito de compartilhamento.
- [ ] É possível selecionar vários tipos, etapas e eixos. Ano/série é exigido quando houver Ensino Fundamental ou Médio; objetivos de aprendizagem são opcionais.
- [ ] O envio aceita vários arquivos PDF, DOCX, PPTX, PNG ou JPG, com até 20 MB por arquivo, respeitando os limites adicionais definidos na implementação.
- [ ] Dados e arquivos inválidos apresentam erro; um envio válido é registrado como **Pendente**, sem publicação automática.
- [ ] A confirmação oferece um caminho para **Meus envios**.

**Requisito:** RF-011.

### US-013 — Acompanhar meus envios

**Como** professor que enviou um material, **quero** acompanhar sua situação, **para** saber o resultado da avaliação.

**Critérios de aceitação**

- [ ] **Meus envios** é acessível por uma aba da área de envio e mostra apenas as submissões da conta.
- [ ] Cada material apresenta a situação atual: Pendente, Em análise, Aprovado ou Recusado.
- [ ] Uma recusa apresenta a justificativa registrada pelo revisor.
- [ ] Os dados são persistidos e atualizados após uma decisão; não é necessária uma central de notificações.
- [ ] O professor não pode editar uma submissão enviada. Para tentar novamente após uma recusa, deverá criar outra submissão.

**Requisito:** RF-019.

### US-012 — Revisar submissões

**Como** responsável autorizado, **quero** avaliar os materiais enviados, **para** controlar sua publicação na Biblioteca.

**Critérios de aceitação**

- [ ] A área restrita apresenta lista de submissões, detalhes e controles para iniciar análise, aprovar ou recusar.
- [ ] A situação muda de Pendente para **Em análise** por uma ação explícita do revisor.
- [ ] A decisão considera informações do material, classificações, segurança dos arquivos, autoria e condições de uso.
- [ ] Recusar exige justificativa visível ao autor; aprovar permite publicar o material.
- [ ] Apenas usuários autorizados podem revisar, editar materiais publicados ou retirá-los da Biblioteca.
- [ ] Despublicar retira o material da listagem sem alterar sua aprovação para Recusado; as operações confirmadas são persistidas.

**Requisito:** RF-014.

O papel de revisor é atribuído manualmente. A interface dessa área ainda será desenhada no Figma.

## 7. Compartilhamento

### US-011 — Copiar o link da plataforma

**Como** pessoa que deseja divulgar o EduComp, **quero** copiar o endereço da página inicial, **para** compartilhá-lo pelo canal que preferir.

**Critérios de aceitação**

- [ ] A ação copia o endereço da página inicial, e não o de um material específico.
- [ ] A interface confirma a cópia ou informa uma falha identificável.
- [ ] O texto do controle deixa claro o destino compartilhado.

**Requisito:** RF-013.

## 8. História reservada para versão futura

### US-005 — Acessar material por link externo

**Como** professor, **quero** abrir um recurso hospedado fora do EduComp, **para** consultar seu conteúdo na fonte original.

**Situação:** fora do MVP. A primeira versão utilizará apenas arquivos hospedados na plataforma. Os critérios de aceitação desta história serão definidos caso o acesso por links externos entre no escopo.

**Requisito reservado:** RF-007.

## 9. Aceite e documentos relacionados

Os critérios serão verificados durante o desenvolvimento, incluindo estados de erro, persistência e permissões. A conclusão do MVP também exige responsividade e acessibilidade, conforme os requisitos não funcionais. Nenhuma história deve ser marcada como concluída apenas por existir no Figma.

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Backlog](backlog.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [User Flow](../ux-ui/user-flow.md)
