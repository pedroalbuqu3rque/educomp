
# EduComp — Escopo do MVP

**Versão:** 2.0 · **Data:** 07/11/2026 · **Situação:** escopo definido para implementação; desenvolvimento não iniciado.

## 1. Objetivo

A primeira versão do EduComp reunirá **descoberta de materiais, participação docente e contribuição responsável ao acervo**. O professor poderá encontrar recursos, consultar informações pedagógicas, salvar materiais, trocar experiências e enviar novas contribuições. Revisores autorizados avaliarão tanto os materiais quanto as denúncias da comunidade.

A interface desktop está definida. O produto ainda precisa ser construído com autenticação, dados persistentes, armazenamento, serviços e testes. A existência de um estado no protótipo não significa que sua integração já esteja pronta.

## 2. Funcionalidades incluídas

### 2.1. Acesso e conta

- Início público, com caminhos para Biblioteca, cadastro e login.
- Cadastro com nome, e-mail e senha; login, saída e recuperação de senha por e-mail, incluindo link inválido ou expirado.
- Sessões e permissões verificadas também no servidor.
- Perfil pessoal com nome, foto, cargo/função, apresentação *Sobre mim* e configuração de senha. O e-mail integra os dados da conta; sua eventual alteração depende das regras do serviço de autenticação escolhido.
- Ações protegidas devem orientar o login e, quando possível, retomar a tarefa iniciada.
- A logo do cabeçalho conduz à página inicial.

### 2.2. Biblioteca e descoberta

- Consulta pública de materiais **aprovados e publicados**.
- Pesquisa por título ou tema/palavras-chave, executada por **Buscar** ou Enter.
- Quatro filtros independentes: **Tipo**, **Etapa**, **Eixo** e **Abordagem** (Plugada, Desplugada ou ambas).
- Seis tipos: Plano de aula, Slides, Material de apoio, Atividade, Sequência didática e **Jogo**.
- Etapas: Educação Infantil, Ensino Fundamental — Anos iniciais e finais, Ensino Médio; eixos: Pensamento Computacional, Mundo Digital e Cultura Digital.
- Múltiplas seleções de filtro e estado sem resultados, com possibilidade de revisar os critérios.
- Paginação de **12 materiais por página**, com total encontrado. A tela desktop apresenta a navegação entre páginas; não há seletor de ordenação no fluxo atual.
- Cartões com título, resumo, tipo, etapa/ano ou série, controle de favorito e ícones de abordagem plugada/desplugada, sem etiquetas textuais redundantes para essa informação.

### 2.3. Detalhes, arquivos e autoria

- Página pública do material com informações pedagógicas, objetivos de aprendizagem quando disponíveis, descrição, abordagem e identificação de autoria.
- Materiais com um ou mais arquivos PDF, DOCX, PPTX, PNG ou JPG, até **20 MB por arquivo**.
- Acesso aos arquivos mediante autenticação e autorização; mensagens de indisponibilidade ou falha quando necessário.
- Link para **perfil público do autor**, com nome, foto ou avatar, apresentação autorizada e materiais publicados. E-mail e dados privados não são exibidos.

### 2.4. Salvos

- Adicionar e remover favoritos associados à conta, sem duplicação e com persistência.
- Consultar uma coleção pessoal, pesquisar por título ou tema e abrir os detalhes dos materiais.
- Exibir o estado de coleção vazia com orientação para explorar a Biblioteca.

A página atual de Salvos mostra a busca textual. Existem variações de filtros de Salvos no arquivo de design, mas não estão integradas ao percurso visível da página; portanto, a ativação desses filtros não é exigência desta entrega.

### 2.5. Comunidade e perfis públicos

- Ler discussões vinculadas a cada material e alternar, **na própria página**, entre Todos, Relatos de aplicação e Discussões.
- Professor autenticado pode publicar comentário, responder uma vez em nível de encadeamento, editar ou excluir sua própria contribuição, além de relatar a aplicação de uma atividade.
- Comentários e respostas com até **1.000 caracteres**, apenas texto. Relatos informam ano/série da turma, descrição e adaptações opcionais.
- Denúncia autenticada, com motivo, enviada à moderação; o envio da denúncia **não oculta** o conteúdo automaticamente.
- Perfis públicos apresentam os materiais publicados do autor, sem divulgar dados privados da conta.

### 2.6. Envio e acompanhamento de materiais

- Formulário com título, descrição, tema/palavras-chave, tipos, etapas, anos/séries, eixos, **abordagem da atividade**, autoria/fonte, objetivos opcionais, arquivos e declaração de direitos.
- Possibilidade de selecionar múltiplos tipos, etapas, anos/séries compatíveis, eixos, abordagens e arquivos.
- Validação de campos e arquivos antes da conclusão; estados de envio, falha, formato não aceito e arquivo acima do limite.
- Confirmação de submissão e acompanhamento em **Meus envios**. O envio inicia como **Pendente**, sem publicação automática.
- Situações de revisão e publicação apresentadas ao autor, incluindo recusa justificada e orientação de ajustes/reenvio quando aplicável.

### 2.7. Revisão editorial e moderação

- Área restrita para revisores autorizados, com fila de submissões, detalhes do material e ações **Iniciar análise**, **Aprovar** e **Recusar**.
- Transição explícita de Pendente para Em análise. A recusa deve registrar justificativa acessível ao professor; decisões de revisão registram responsável e data.
- Aprovação editorial separada da publicação: material aprovado somente aparece na Biblioteca quando estiver publicado; a despublicação não transforma o material em Recusado.
- Fila de denúncias com contexto do comentário, motivo da denúncia e ações para **ocultar, restaurar ou excluir definitivamente**. Exclusão definitiva exige confirmação.
- Registro de motivo, responsável e data das decisões de moderação.

### 2.8. Notificações, contato e compartilhamento

- Notificações para o usuário sobre andamento de materiais, **novos materiais na Biblioteca** e **novidades da plataforma**, com indicador de não lidas, opção de marcar todas como lidas, lista completa e estado vazio.
- Formulário **Fale conosco** com nome, e-mail, assunto e mensagem; validação, confirmação e tratamento de erro.
- Termos de uso e Política de privacidade, com textos adequados ao serviço efetivamente oferecido antes da publicação.
- Compartilhamento da plataforma com opções sociais previstas no protótipo e ação **Copiar link**, com confirmação. Endereços exibidos no Figma são ilustrativos até que haja domínio real.

## 3. Fora do MVP

- Login com Google ou outros provedores sociais.
- Cadastro de recursos por URL externa, editor de materiais no navegador e visualização avançada de documentos.
- Coleções compartilhadas, recomendações automáticas e personalização algorítmica do acervo.
- Anexos, áudio, vídeo, curtidas, respostas em vários níveis ou mensagens privadas na comunidade.
- Denúncias anônimas ou remoção automática de conteúdo denunciado.
- Painel de análise avançada e histórico completo de versões de um mesmo material.
- Controle de ordenação manual da Biblioteca, não representado no fluxo atual.

## 4. Ordem de implementação

O desenvolvimento começará pela base técnica, autenticação e componentes compartilhados, seguirá pela Biblioteca e materiais e depois incorporará Salvos, perfil, envio, comunidade, revisão, notificações e recursos institucionais. A ordem detalhada e as dependências constam do [Backlog](backlog.md).

A experiência desktop deve ser adaptada para tablet e celular. Essa adaptação, os testes de acessibilidade e a integração dos fluxos com dados reais fazem parte da conclusão do MVP.

## 5. Critérios de conclusão

- [ ] Cadastro, login, recuperação de senha, perfil e permissões funcionam com persistência.
- [ ] Biblioteca e busca apresentam resultados coerentes com os quatro filtros, as classificações e a paginação.
- [ ] Detalhes exibem dados verdadeiros, autoria e arquivos acessíveis apenas com autorização.
- [ ] Favoritos e pesquisa em Salvos funcionam e refletem a coleção da conta.
- [ ] Professores podem publicar, responder, editar/excluir suas contribuições e relatar aplicações conforme os limites definidos.
- [ ] Perfis públicos preservam a privacidade; denúncias são encaminhadas à fila de moderação.
- [ ] Submissões são validadas, persistidas e acompanhadas; aprovação não publica automaticamente sem a condição de disponibilidade pública.
- [ ] Revisores conseguem registrar decisões editoriais e moderar denúncias, com justificativa e rastreabilidade.
- [ ] Notificações, formulário de contato, compartilhamento e páginas institucionais funcionam nos limites definidos.
- [ ] Erros e estados vazios foram tratados; os fluxos funcionam em desktop, tablet e celular.
- [ ] Acessibilidade é avaliada tendo como referência a **WCAG 2.2 AA**, além dos testes funcionais, de segurança e de integração.

O MVP só estará concluído após a implementação e a verificação desses critérios. O protótipo não substitui os testes.

## 6. Definições técnicas pendentes

- [ ] Escolher framework, serviços, autenticação, armazenamento, hospedagem e estratégia de envio de notificações.
- [ ] Fechar limites de campos e tags, número máximo de arquivos e tratamento de upload parcial.
- [ ] Especificar vínculo entre etapas e anos/séries, metadados das abordagens e normalização de busca.
- [ ] Definir esquema de estados para ajustes/reenvios e regras de publicação/despublicação.
- [ ] Detalhar proteção contra spam, retenção de denúncias e tratamento de dados pessoais.
- [ ] Estabelecer URLs, recuperação da navegação, breakpoints e metas técnicas de qualidade.

## 7. Documentos relacionados

- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
