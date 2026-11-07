# EduComp — Requisitos do produto

**Versão:** 1.0 · **Data:** 07/11/2026 · **Situação:** requisitos planejados, não implementados nem testados.

## 1. Finalidade

Este documento estabelece os comportamentos e as regras do MVP do EduComp. Os identificadores anteriores (`RF-001` a `RF-020`) foram mantidos; os novos requisitos complementam os fluxos de comunidade, moderação, notificações e comunicação. Regras de busca, cadastro de materiais e apresentação das telas estão detalhadas nos documentos específicos.

## 2. Requisitos funcionais

### 2.1. Início, acesso e perfil

**RF-020 — Apresentar a plataforma.** Início deve explicar a proposta do EduComp e oferecer caminhos claros para Biblioteca, cadastro e login. A logo do cabeçalho deve levar ao Início nas páginas em que estiver presente.

**RF-015 — Criar conta.** O cadastro deve solicitar nome, e-mail e senha, aceitar endereços pessoais e institucionais e validar entradas e contas duplicadas. O protótipo orienta o uso de senha com pelo menos 12 caracteres. Uma conta comum não recebe autorização de revisão automaticamente.

**RF-016 — Entrar e sair.** O acesso será por e-mail e senha. Erros de autenticação não podem iniciar uma sessão. Sair deve encerrá-la. Após login motivado por uma ação protegida, a aplicação deve retomar a tarefa quando viável.

**RF-017 — Recuperar senha.** O usuário poderá solicitar redefinição por e-mail. Links expirados ou inválidos não permitirão alterar a senha; o sistema deverá oferecer continuidade segura.

**RF-018 — Gerenciar perfil.** O professor autenticado poderá consultar e atualizar os dados exibidos em seu perfil, incluindo nome, foto, cargo/função, apresentação *Sobre mim* (até 300 caracteres no protótipo) e senha. O e-mail será apresentado na conta; eventual mudança requer as verificações do serviço de autenticação escolhido. A seleção de foto terá prévia antes de salvar, com imagem demonstrativa substituída pelo arquivo real na implementação.

### 2.2. Biblioteca e descoberta

**RF-001 — Listar materiais.** A Biblioteca pública deve listar apenas recursos aprovados e publicados. A listagem apresenta cartões e paginação de **12 materiais por página**, com indicação do total de resultados.

**RF-002 — Pesquisar.** A consulta deve considerar título e palavras-chave/tema, executada por Enter ou **Buscar**. A comparação deverá ignorar diferenças de caixa e acentos e poderá aceitar trechos de palavras. Pesquisa vazia retorna os materiais compatíveis com os filtros ativos.

**RF-003 — Manter ordem e paginação consistentes.** A sequência dos resultados precisa ser estável entre páginas, sem duplicações ou omissões. O protótipo não apresenta seletor de ordenação; a regra de ordenação padrão e o desempate serão definidos tecnicamente, sem introduzir um controle novo no MVP.

**RF-004 — Filtrar materiais.** A Biblioteca terá quatro filtros independentes: Tipo, Etapa, Eixo e Abordagem. Uma categoria aceita seleção múltipla; opções da mesma categoria usam **OU**, entre categorias e texto da pesquisa usa-se **E**. **Aplicar** confirma uma seleção, **Limpar** remove as opções da categoria e fechar sem aplicar não deve confirmar alterações em edição. A abordagem admite Plugada, Desplugada e materiais classificados com ambas.

**RF-005 — Tratar estados da consulta.** A interface deve diferenciar lista disponível, busca sem resultados, acervo vazio, carregamento e falha. Respostas de consultas antigas não poderão substituir resultados mais recentes. A navegação de volta deve preservar, quando possível, texto, filtros, página e rolagem.

### 2.3. Detalhes e arquivos

**RF-006 — Consultar detalhes.** Os detalhes públicos devem exibir título, descrição, classificações, ano/série, abordagem, objetivos quando cadastrados e autoria/fonte. Campos opcionais vazios não geram valores fictícios. A página deve oferecer acesso ao perfil público do autor e às discussões do material.

**RF-007 — Links externos de materiais (reservado).** O cadastro de URL externa não faz parte do MVP; este identificador permanece reservado para evolução futura.

**RF-008 — Disponibilizar arquivos.** O material poderá ter vários arquivos **PDF, DOCX, PPTX, PNG e JPG**, até **20 MB por arquivo**. Obter os arquivos exige autenticação e verificação de permissão no serviço de entrega.

**RF-009 — Identificar recursos disponíveis.** A interface deve indicar os arquivos vinculados e suas condições de acesso. Não deve apresentar ação de download quando não existir arquivo acessível.

**RF-010 — Tratar falhas de arquivo.** Ausência de autorização, falha de transferência ou indisponibilidade devem gerar retorno específico sem retirar automaticamente os demais metadados do material.

### 2.4. Salvos e compartilhamento

**RF-012 — Gerenciar Salvos.** O usuário autenticado pode adicionar e remover materiais da coleção, sem duplicidade. O estado deve persistir e refletir-se nos cartões e nos detalhes. Salvos deve permitir consulta da coleção, busca textual por título/tema e estado vazio.

**RF-013 — Compartilhar o EduComp.** A plataforma deve oferecer **Copiar link** com confirmação da operação e atalhos de compartilhamento social mostrados no protótipo, conforme os recursos permitidos por cada serviço. O link compartilhado é o da plataforma; o endereço exibido no protótipo não pressupõe domínio registrado.

### 2.5. Envio e acompanhamento

**RF-011 — Enviar materiais.** O formulário exige título, descrição, uma ou mais palavras-chave, pelo menos um tipo, etapa e eixo, abordagem plugada/desplugada, autoria ou fonte, anos/séries quando aplicáveis, declaração de direitos e pelo menos um arquivo válido. Permite múltiplas seleções, múltiplos arquivos e objetivos opcionais. Campos e arquivos devem ser validados no servidor. Uma submissão válida inicia como **Pendente**.

**RF-019 — Acompanhar envios.** A área **Meus envios** apresenta as submissões da conta e os estados pertinentes: aguardando revisão, em análise, aprovado/recusado e publicado, conforme andamento e disponibilidade. Uma recusa deve apresentar sua justificativa; pedidos de ajuste devem orientar o autor sobre os próximos passos quando usados no fluxo.

### 2.6. Revisão editorial e publicação

**RF-014 — Revisar materiais.** Somente o revisor autorizado pode consultar a fila restrita, iniciar explicitamente a análise, aprovar, recusar e administrar a disponibilidade pública. A recusa exige justificativa registrada e visível ao autor. Os dados do material, arquivos, autoria, direito de uso e segurança devem estar disponíveis para a avaliação. Aprovação editorial e publicação são condições diferentes.

### 2.7. Comunidade, autor e moderação

**RF-021 — Exibir discussões.** A página de material deve apresentar as contribuições vinculadas a ele, com filtros **Todos**, **Relatos de aplicação** e **Discussões**. A alternância ocorre na própria página, não em pop-up. É permitido ler conteúdos públicos sem login.

**RF-022 — Publicar e responder.** Professores autenticados podem criar comentários textuais de até **1.000 caracteres**, responder em apenas um nível e registrar relatos de aplicação. Relatos incluem ano/série, descrição e adaptações opcionais. Não são aceitos anexos ou dados pessoais de estudantes nas contribuições.

**RF-023 — Editar e excluir contribuição própria.** O autor autenticado pode editar ou excluir os comentários e respostas de sua autoria. Exclusões exigem confirmação e o resultado só é exibido após a conclusão da operação.

**RF-024 — Exibir perfil público.** O perfil público do professor poderá apresentar nome, foto/avatar, cargo/função, apresentação autorizada e seus materiais publicados. E-mail, credenciais, denúncias e dados internos da conta não podem ser exibidos.

**RF-025 — Receber denúncias.** Um usuário autenticado pode denunciar conteúdo por exposição de dados pessoais, ofensa/assédio ou spam e desvio de assunto. Uma denúncia não gera ocultação automática nem identifica publicamente quem denunciou.

**RF-026 — Moderar discussões.** Revisores autorizados podem examinar as denúncias com seu contexto, ocultar, restaurar ou excluir definitivamente comentários, com confirmação para exclusão. A decisão deve guardar motivo, data e responsável, e ser aplicada também nas consultas públicas.

### 2.8. Notificações e páginas institucionais

**RF-027 — Notificar usuários.** A central de notificações deve apresentar novos materiais na Biblioteca, eventos relativos aos envios e novidades do EduComp. Deve diferenciar mensagens lidas e não lidas, permitir marcar todas como lidas e ter lista completa e estado vazio. Uma notificação sobre revisão não substitui a consulta detalhada em Meus envios.

**RF-028 — Receber contato.** A área *Fale conosco* terá formulário com nome, e-mail, assunto e mensagem, validação dos campos, confirmação de envio e feedback de falha.

**RF-029 — Apresentar informações institucionais.** Termos de uso e Política de privacidade devem estar acessíveis publicamente. Seu conteúdo definitivo precisa corresponder aos dados, serviços e responsabilidades reais da aplicação.

## 3. Regras de negócio

**RN-001 — Acervo publicado.** Envio e aprovação não causam publicação automática. Materiais pendentes, em análise, recusados ou retirados da circulação não entram na Biblioteca.

**RN-002 — Permissões.** Visitantes consultam recursos públicos. Salvos, arquivos, participação, envio e perfil exigem sessão. Revisão e moderação são restritas a contas autorizadas. O backend valida todas essas permissões.

**RN-003 — Favoritos pessoais.** O par usuário–material deve ser único e não pode ser consultado ou alterado por outra conta sem permissão.

**RN-004 — Integridade dos envios.** A submissão mantém vínculo com responsável, arquivos, classificações, situação de revisão e disponibilidade pública. Uma recusa exige justificativa; mudanças editoriais são rastreáveis.

**RN-005 — Classificações consistentes.** Tipos, etapas, eixos e abordagens usados na submissão alimentam os filtros e o conteúdo público. Um material pode estar associado a várias opções. Anos/séries devem corresponder às etapas escolhidas.

**RN-006 — Proteção de arquivos.** Tipos, tamanhos e permissões são validados no servidor; URL de arquivo não pode contornar a autenticação.

**RN-007 — Privacidade da comunidade.** Publicações não devem expor dados pessoais de estudantes. Conteúdo denunciado permanece disponível até decisão, exceto quando uma intervenção autorizada determinar o contrário.

**RN-008 — Autoria de contribuição.** Edição e exclusão normais são restritas ao autor; ações de moderação são exclusivas de revisores autorizados. O autor de um material pode diferir de quem fez o envio.

**RN-009 — Rastreabilidade editorial.** As decisões de material e as decisões de moderação devem conservar responsável, data, resultado e motivo quando cabível. Disponibilidade pública não se confunde com aprovação editorial.

**RN-010 — Notificações e dados públicos.** A central é pessoal. Os perfis públicos não divulgam e-mail, informações de segurança, denúncias ou registros internos de revisão.

## 4. Requisitos não funcionais

| ID | Requisito |
| --- | --- |
| **RNF-001 — Usabilidade** | Ações e resultados claros, com estados de carregamento, sucesso, falha e vazio. |
| **RNF-002 — Responsividade** | Fluxos utilizáveis em desktop, tablet e celular; desktop é a primeira etapa de construção. |
| **RNF-003 — Consistência visual** | Interface conforme identidade, componentes e estados definidos no Design System. |
| **RNF-004 — Acessibilidade** | WCAG 2.2 AA como referência; teclado, foco, semântica, contraste, mensagens e recursos que não dependam só de cor. |
| **RNF-005 — Segurança** | Senhas e sessões protegidas; permissões verificadas no servidor; controle de upload e de acesso aos arquivos. |
| **RNF-006 — Privacidade** | Coleta mínima, visibilidade adequada, proteção de dados pessoais e política compatível com o serviço real. |
| **RNF-007 — Persistência** | Contas, favoritos, submissões, decisões, contribuições, denúncias e notificações persistidas com integridade. |
| **RNF-008 — Desempenho** | Paginação e consultas estáveis; tratamento de respostas obsoletas e metas definidas no plano de qualidade. |
| **RNF-009 — Segurança da comunidade** | Rate limits e medidas contra spam, abuso e publicação indevida; critérios de retenção das denúncias. |
| **RNF-010 — Qualidade** | Testes de fluxos críticos, validações de servidor, CI e verificação dos navegadores previstos. |

## 5. Fora do MVP

Login social, importação de arquivos por URL, editor de conteúdo pedagógico, recomendações personalizadas, conversas privadas, anexos em discussões, múltiplos níveis de resposta, curtidas, denúncia anônima e ferramentas avançadas de análise editorial.

## 6. Definições de implementação ainda necessárias

- [ ] Definir autenticação, sessão, confirmação de e-mail e regras de eventual alteração do endereço cadastrado.
- [ ] Fechar limites de texto, palavras-chave, arquivos por envio, upload parcial e validação de conteúdo.
- [ ] Modelar anos/séries por etapa, índices de busca, ordenação padrão e parâmetros de URL.
- [ ] Definir estados de pedidos de ajustes e regras de reenvio/edição autorizada.
- [ ] Detalhar proteção contra abuso, retenção de denúncias e envio de notificações.
- [ ] Estabelecer metas de desempenho, testes de acessibilidade e adaptação responsiva.

## 7. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [User Flow](../ux-ui/user-flow.md)
