# EduComp — Requisitos do produto

**Versão:** 0.7  
**Data:** 07/11/2026  
**Situação:** regras do MVP consolidadas; detalhes técnicos pendentes.

## 1. Finalidade

Este documento reúne os requisitos funcionais, as regras de negócio e os requisitos não funcionais do EduComp. Ele define o que a primeira versão precisa oferecer; os comportamentos mais detalhados estão nas especificações de [busca e filtros](especificacao-busca-filtros.md) e de [metadados](especificacao-metadados.md).

Os identificadores `RF`, `RN` e `RNF` foram mantidos para preservar as referências nas histórias de usuário e no backlog. Os requisitos ainda não foram implementados ou testados.

## 2. Requisitos funcionais

### 2.1. Início, acesso e conta

**RF-020 — Apresentar a plataforma.** A página Início deve explicar a proposta do EduComp e oferecer acesso à Biblioteca, ao cadastro e ao login. Visitantes podem consultar Início, Biblioteca e detalhes dos materiais sem criar uma conta.

**RF-015 — Permitir cadastro.** O usuário deve conseguir criar uma conta com nome, e-mail e senha. São aceitos e-mails pessoais e institucionais, com validação dos campos e impedimento de contas duplicadas. Depois do cadastro, o usuário é encaminhado ao login, respeitando eventual verificação de e-mail exigida pela solução de autenticação.

**RF-016 — Autenticar e encerrar sessões.** O acesso à conta deve ocorrer por e-mail e senha. O sistema precisa tratar credenciais inválidas, manter a sessão de forma segura e permitir a saída. Depois do login, o usuário retoma a tarefa que exigiu autenticação; quando não houver tarefa anterior, segue para a Biblioteca.

**RF-017 — Recuperar senha.** O usuário deve poder solicitar a redefinição por e-mail, utilizar um link válido e retornar ao login após alterar a senha. Links inválidos ou expirados não podem permitir a operação. As regras de prazo e sessão seguirão a solução de autenticação escolhida.

**RF-018 — Consultar e atualizar o perfil.** O usuário autenticado pode consultar seus dados e alterar nome, foto e senha. O e-mail permanece fixo no MVP. As alterações devem ser validadas, confirmadas e persistidas; uma conta não pode modificar dados de outra.

O login com Google e a edição do endereço de e-mail ficam fora do MVP. As ações pessoais exigem autenticação, e o papel de revisor será concedido manualmente pelo responsável técnico ou administrador.

### 2.2. Biblioteca, pesquisa e filtros

**RF-001 — Listar materiais.** A Biblioteca deve apresentar somente materiais aprovados e publicados, com acesso público à listagem e aos detalhes. A consulta terá paginação de **12 materiais**, indicação do total real de resultados e navegação entre páginas.

**RF-002 — Pesquisar materiais.** A busca deve considerar título e palavras-chave cadastradas, mediante Enter ou botão **Buscar**. A comparação ignora diferenças de maiúsculas/minúsculas e acentos, aceita trechos de palavras e exige correspondência de todos os termos informados, sem depender da ordem. A pesquisa pode ser combinada com os filtros.

**RF-003 — Ordenar os resultados.** A ordenação inicial será por materiais mais recentes. O usuário poderá alternar entre **Mais recentes** e **Título (ordem alfabética)**. A sequência deve permanecer estável durante a paginação. Alterar a ordenação retorna à primeira página, mantendo pesquisa e filtros.

**RF-004 — Filtrar materiais.** A Biblioteca deve permitir seleção múltipla por tipo de material, etapa de ensino e eixo da Computação. Opções da mesma categoria são combinadas por **OU**; categorias diferentes e pesquisa textual, por **E**. As seleções só são confirmadas ao acionar **Aplicar**. **Limpar** desmarca apenas a categoria aberta e também exige Aplicar. Fechar sem aplicar descarta as alterações em edição. Opções sem correspondências continuam visíveis e selecionáveis.

**RF-005 — Informar estados da consulta.** A Biblioteca deve distinguir carregamento, acervo vazio, pesquisa sem resultados e falha de consulta, oferecendo orientação ou nova tentativa quando possível. Uma resposta antiga não pode substituir o resultado de uma consulta mais recente.

Pesquisa, filtros, ordenação e página atual devem constar na URL, permitindo retornar dos detalhes sem perder os critérios. A posição de rolagem deverá ser restaurada quando tecnicamente viável. A área **Salvos** não terá pesquisa nem filtros próprios nesta versão.

As opções de classificação e as demais regras da Biblioteca estão detalhadas nas especificações funcionais.

### 2.3. Detalhes e acesso aos recursos

**RF-006 — Exibir detalhes do material.** A página deve apresentar título, descrição, palavras-chave, classificações pedagógicas e autoria ou fonte. Ano/série e objetivos de aprendizagem aparecem conforme os dados cadastrados. Campos opcionais sem valor não devem gerar informações fictícias. A consulta aos detalhes é pública.

**RF-007 — Acesso por link externo (fora do MVP).** O identificador fica reservado para uma possível versão futura. Nesta primeira entrega, o cadastro e o acesso aos recursos serão feitos por arquivos hospedados na plataforma, sem links externos.

**RF-008 — Disponibilizar arquivos hospedados.** O material pode conter vários arquivos nos formatos **PDF, DOCX, PPTX, PNG e JPG**, com até **20 MB por arquivo**. A obtenção dos arquivos exige login, mesmo quando os detalhes são públicos. Após autenticar-se, o usuário deve poder retomar a tentativa de acesso.

**RF-009 — Apresentar as opções de acesso.** Os detalhes devem identificar cada arquivo disponível. Quando não houver recurso acessível, a interface deve informar a situação sem oferecer uma ação inexistente. Arquivos indisponíveis não exigem a remoção automática dos metadados do material.

**RF-010 — Tratar falhas de acesso.** Arquivos inexistentes, indisponíveis ou não autorizados devem receber tratamento apropriado. As verificações de permissão também precisam ocorrer no serviço que entrega o arquivo, não apenas na interface.

### 2.4. Materiais salvos e compartilhamento

**RF-012 — Gerenciar favoritos.** O professor autenticado pode salvar e remover materiais e consultar sua lista pessoal em **Salvos**. Não pode haver duplicação do mesmo material na coleção de uma conta. As alterações devem persistir entre sessões e ser refletidas nas páginas relacionadas. A lista deve ter um estado vazio quando necessário.

**RF-013 — Copiar link.** A ação de compartilhamento do MVP deve copiar o endereço da **página inicial do EduComp** e informar se a cópia foi concluída. A interface não deve sugerir que está copiando o link de um material específico. Integrações com redes sociais não estão previstas.

### 2.5. Envio, acompanhamento e revisão

**RF-011 — Enviar materiais.** O professor autenticado deve poder submeter um material com título, descrição, uma ou mais palavras-chave, tipos, etapas e eixos, autoria ou fonte, declaração de direito de compartilhamento e pelo menos um arquivo. São permitidos vários arquivos, respeitando os formatos e o limite de 20 MB por arquivo. A validação deve ocorrer também no servidor. Um envio concluído é registrado como **Pendente**, sem publicação automática.

O ano/série é obrigatório quando forem selecionadas etapas do Ensino Fundamental ou do Ensino Médio. Objetivos de aprendizagem são opcionais. O autor não poderá editar uma submissão após enviá-la; em caso de recusa, será necessário criar outra submissão.

**RF-019 — Acompanhar envios.** O professor deve consultar suas submissões em **Meus envios**, com a situação atual de cada uma: Pendente, Em análise, Aprovado ou Recusado. Em caso de recusa, a justificativa deverá estar visível. A consulta é restrita ao responsável pelo envio e não depende de notificações por e-mail ou de uma central de notificações.

**RF-014 — Revisar e publicar materiais.** Uma área restrita deve apresentar a lista de submissões, seus detalhes e as ações de revisão. O revisor autorizado inicia explicitamente a análise, passando o material para **Em análise**, e pode aprovar ou recusar a submissão. A recusa exige uma justificativa breve visível ao autor. A avaliação considera preenchimento, classificações, segurança dos arquivos, autoria e condições de uso.

Somente responsáveis autorizados podem editar materiais já publicados ou retirá-los da Biblioteca. **Aprovação e publicação são condições diferentes:** um material aprovado pode ser despublicado sem mudar para Recusado. O MVP não exige histórico completo das transições; devem ser preservados o estado atual e a justificativa de uma eventual recusa.

## 3. Regras de negócio

**RN-001 — Publicação após revisão.** Uma submissão não é publicada automaticamente. Materiais pendentes, em análise ou recusados não aparecem na Biblioteca. Materiais aprovados só aparecem quando estiverem publicados.

**RN-002 — Permissões.** Visitantes podem consultar Início, Biblioteca e detalhes. Favoritos, acesso aos arquivos, envio e perfil exigem login. A revisão, a edição de materiais publicados e a despublicação são restritas a responsáveis autorizados. Essas permissões devem ser verificadas no servidor.

**RN-003 — Favoritos pessoais.** Cada par usuário–material deve ser único. Um professor não pode acessar ou alterar os favoritos de outra conta sem autorização.

**RN-004 — Integridade das submissões.** Cada envio deve manter vínculo com o professor, seus dados, arquivos e situação editorial. Uma recusa deve preservar a justificativa. A disponibilidade pública deve ser controlada separadamente da aprovação.

**RN-005 — Consistência das classificações.** Um material pode ter vários tipos, etapas e eixos da Computação. As opções usadas no cadastro devem corresponder às disponíveis nos filtros. A relação entre anos/séries e etapas selecionadas ainda precisa ser detalhada.

**RN-006 — Controle de arquivos.** Os arquivos devem permanecer associados ao material correto e só podem ser obtidos por usuários autenticados e autorizados. A interface não substitui as verificações do serviço de armazenamento.

## 4. Requisitos não funcionais

| ID | Requisito |
| --- | --- |
| **RNF-001 — Usabilidade** | As principais tarefas devem ter navegação compreensível, rótulos claros e feedback adequado. |
| **RNF-002 — Responsividade** | Os fluxos do MVP devem funcionar em desktop, tablet e celular. O desenvolvimento começa pelo desktop; a adaptação responsiva é necessária para concluir o MVP. |
| **RNF-003 — Consistência visual** | Cores, tipografia, componentes e estados devem seguir o Design System. |
| **RNF-004 — Clareza do acesso** | A interface deve diferenciar detalhes públicos, arquivos que exigem login e recursos indisponíveis. |
| **RNF-005 — Fidelidade aos dados** | Autoria, classificações e condições de acesso devem refletir os dados cadastrados, sem informações fictícias. |
| **RNF-006 — Acessibilidade** | Adotar a **WCAG 2.2 nível AA** como referência de aceite, com verificação manual de navegação por teclado, foco, semântica, rótulos, contraste e mensagens. |
| **RNF-007 — Segurança da autenticação** | Utilizar solução consolidada para autenticação e recuperação de senha, com proteção de credenciais, sessões e operações restritas. |
| **RNF-008 — Proteção de dados** | Restringir acesso a informações pessoais e submissões privadas. Definir retenção, exclusão e documentos de privacidade antes da demonstração pública com usuários reais. |
| **RNF-009 — Persistência e integridade** | Cadastro, favoritos, alterações de perfil, envios e decisões de revisão devem ser persistidos sem duplicações ou estados contraditórios. |
| **RNF-010 — Feedback e falhas** | Carregamento, sucesso, erro e ausência de dados devem ser comunicados de acordo com a operação realizada, sem antecipar confirmações. |
| **RNF-011 — Desempenho percebido** | Busca e navegação devem responder de forma adequada, evitando resultados desatualizados. Serão usadas métricas de experiência web com limites definidos no plano de testes. |

Os testes deverão incluir os fluxos críticos, a responsividade e os navegadores atuais previstos no plano de qualidade.

## 5. Fora do MVP

Não estão previstos nesta versão: login com Google, links externos para materiais, pesquisa e filtros em Salvos, comentários, relatos de aplicação, denúncias da comunidade, notificações, coleções personalizadas, visualização integrada de arquivos e compartilhamento direto por redes sociais.

As ações correspondentes a essas funcionalidades não devem aparecer como operacionais nas interfaces implementadas.

## 6. Detalhes ainda necessários

As decisões centrais de produto estão registradas. Antes de implementar os fluxos correspondentes, ainda será preciso:

- [ ] Escolher a solução de autenticação e confirmar verificação de e-mail, regras de sessão e recuperação.
- [ ] Definir limites dos campos, quantidade de palavras-chave e relação entre ano/série e etapas selecionadas.
- [ ] Definir quantidade máxima de arquivos, limite total por envio e validações de segurança do upload múltiplo.
- [ ] Fechar os critérios de desempate e a correspondência de termos entre título e palavras-chave.
- [ ] Especificar a interface de revisão, as permissões de edição/despublicação e a apresentação das justificativas.
- [ ] Confirmar o texto e a posição da ação **Copiar link**, para que o destino da página inicial fique claro.
- [ ] Definir parâmetros de URL, detalhes de responsividade e metas mensuráveis de desempenho no planejamento técnico.

## 7. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [User Flow](../ux-ui/user-flow.md)
- [Design System](../ux-ui/design-system.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
