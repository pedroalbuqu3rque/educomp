# EduComp — Escopo do MVP

**Versão:** 1.5  
**Data:** 07/11/2026  
**Situação:** escopo definido para desenvolvimento; implementação não iniciada.

## 1. Proposta

O EduComp é uma plataforma para professores da Educação Básica encontrarem, consultarem, salvarem e compartilharem materiais pedagógicos relacionados à Computação.

O MVP será uma biblioteca funcional, com pesquisa, filtros, informações dos materiais e acesso aos arquivos. Professores cadastrados também poderão manter favoritos e enviar contribuições para o acervo. Os envios passarão por revisão antes da publicação.

A proposta parte da hipótese de que reunir esses recursos em um só lugar facilita sua descoberta e avaliação. Essa hipótese ainda precisa ser investigada com professores reais.

## 2. O que entra no MVP

### 2.1. Acesso e conta

- **Consulta pública:** visitantes poderão acessar Início, Biblioteca e detalhes dos materiais sem criar conta.
- **Conta:** cadastro com nome, e-mail e senha, aceitando endereços pessoais ou institucionais; login, recuperação de senha e saída segura.
- **Ações autenticadas:** acessar arquivos, salvar favoritos, enviar materiais e gerenciar o perfil exigirá login. Após entrar, o usuário poderá retomar a ação que iniciou o acesso.
- **Perfil:** consulta dos dados e alteração de nome, foto e senha. O e-mail não poderá ser alterado nesta versão.

A autenticação utilizará uma solução consolidada. A verificação de e-mail e as regras de sessão seguirão a configuração do serviço escolhido.

### 2.2. Biblioteca e descoberta

- Listagem pública apenas de materiais aprovados e publicados.
- Pesquisa por **título e palavras-chave**, executada pelo botão Buscar ou pela tecla Enter.
- Filtros combináveis por **tipo de material**, **etapa de ensino** e **eixo da Computação**, com seleção múltipla.
- Ordenação por **mais recentes** (padrão) ou **título em ordem alfabética**.
- Paginação de **12 materiais por página**, com indicação do total de resultados.
- Preservação da pesquisa, dos filtros, da ordenação e da página atual na URL.
- Estados de carregamento, ausência de resultados e falha de consulta.

As opções de classificação e o funcionamento dos filtros estão na [Especificação de busca e filtros](especificacao-busca-filtros.md).

### 2.3. Detalhes e arquivos

- Página pública com título, descrição, palavras-chave, classificações, autoria ou fonte e demais informações cadastradas.
- Um material poderá conter **vários arquivos**, nos formatos PDF, DOCX, PPTX, PNG ou JPG, com limite de **20 MB por arquivo**.
- Os arquivos ficarão hospedados na plataforma e só poderão ser acessados por usuários autenticados.
- A interface deverá informar quando um arquivo estiver indisponível ou não puder ser acessado.

O acesso por links externos não fará parte da primeira versão.

### 2.4. Materiais salvos

O professor autenticado poderá salvar e remover favoritos, consultar a lista pessoal em **Salvos** e abrir os detalhes dos materiais guardados. Os favoritos serão persistidos entre sessões, sem duplicar um mesmo material na coleção.

A área Salvos não terá pesquisa nem filtros próprios no MVP.

### 2.5. Envio e acompanhamento

O professor autenticado poderá enviar materiais para possível inclusão no acervo. O formulário terá:

- Título, descrição, uma ou mais palavras-chave e identificação da autoria ou fonte.
- Seleção de **um ou mais tipos, etapas de ensino e eixos da Computação**.
- Ano/série obrigatório quando houver seleção de Ensino Fundamental ou Ensino Médio.
- Objetivos de aprendizagem opcionais.
- Upload de um ou mais arquivos nos formatos e limites definidos para o MVP.
- Declaração de que possui direito de compartilhar o conteúdo.

O envio concluído será registrado como **Pendente** e não publicará o material automaticamente. Em **Meus envios**, o professor poderá consultar a situação atual e, em caso de recusa, a justificativa apresentada pelo revisor.

Nesta versão, uma submissão enviada não poderá ser editada pelo autor. Para tentar novamente após uma recusa, será necessário realizar outro envio.

### 2.6. Revisão e publicação

Uma área restrita permitirá ao responsável autorizado consultar submissões, iniciar a análise e registrar aprovação ou recusa. A atribuição do papel de revisor será feita manualmente.

Os estados de revisão serão **Pendente**, **Em análise**, **Aprovado** e **Recusado**. O início da análise exigirá uma ação explícita. A recusa deverá conter uma justificativa visível ao autor.

A revisão considerará o preenchimento dos dados, as classificações, a segurança dos arquivos, a autoria e as condições de uso. Apenas responsáveis autorizados poderão editar materiais publicados ou retirá-los da Biblioteca.

**Aprovação e publicação são condições distintas:** um material aprovado poderá ser despublicado sem passar para Recusado. O MVP não exigirá histórico completo de alterações da revisão.

### 2.7. Compartilhamento e páginas institucionais

O compartilhamento básico permitirá **copiar o endereço da página inicial do EduComp**, com confirmação da operação. A interface deverá deixar claro que não está copiando o link de um material específico.

Para a demonstração pública, estão previstas páginas de **Termos de uso** e **Política de privacidade**, além de um contato simples por e-mail, sem formulário próprio.

## 3. Fora do MVP

- Login com Google.
- Acesso a materiais por links externos e visualizador de arquivos integrado.
- Pesquisa e filtros na área Salvos; coleções personalizadas ou compartilhadas.
- Comentários, relatos de aplicação, respostas e denúncias da comunidade.
- Central de notificações ou avisos por e-mail sobre a revisão.
- Compartilhamento integrado com redes sociais ou links individuais dos materiais.
- Edição de submissões pelo autor, solicitação de ajustes e reenvio da mesma submissão.
- Ferramentas administrativas avançadas, recomendações automáticas e criação de conteúdos pedagógicos na plataforma.

As ações que pertencem a essas funcionalidades não deverão aparecer como operacionais na implementação do MVP, mesmo quando estiverem representadas no Figma.

## 4. Ordem de desenvolvimento

A implementação começará pelo **desktop**, tomando o protótipo do Figma como referência. Essa etapa inclui os componentes, as páginas e as integrações necessárias aos fluxos previstos.

Depois serão feitas as adaptações para **tablet e celular**, seguidas pela verificação dos critérios funcionais, de acessibilidade e de qualidade. A versão desktop, sozinha, não será considerada o MVP concluído.

As entregas e suas dependências serão acompanhadas no [Backlog](backlog.md).

## 5. Critérios de conclusão

O MVP poderá ser considerado concluído quando for possível verificar que:

- [ ] Visitantes consultam a Biblioteca e os detalhes; o acesso aos arquivos exige login.
- [ ] O usuário cria uma conta, entra, recupera a senha, sai e atualiza os dados permitidos do perfil.
- [ ] A Biblioteca pesquisa, filtra, ordena e pagina materiais publicados conforme as regras definidas.
- [ ] Os detalhes apresentam dados reais e permitem acessar os arquivos disponíveis com a autorização necessária.
- [ ] Favoritos podem ser adicionados, consultados e removidos, com persistência entre sessões.
- [ ] O professor envia um material válido e acompanha a situação em Meus envios.
- [ ] O revisor autorizado aprova, recusa com justificativa e pode retirar materiais publicados de circulação.
- [ ] A cópia do link da página inicial funciona e informa o resultado.
- [ ] Os fluxos tratam erros e estados vazios, funcionam em desktop, tablet e celular e são verificados quanto à acessibilidade.
- [ ] As operações utilizam serviços e dados persistentes, com testes realizados e resultados registrados.

A acessibilidade terá como referência as **WCAG 2.2, nível AA**. A conclusão depende de implementação e testes, não apenas das telas do protótipo.

## 6. Detalhes que ainda serão fechados

As decisões principais de escopo já foram tomadas. Restam definições para a implementação, como:

- Quantidade máxima de arquivos por material, limite total do envio e validações de segurança.
- Limites de campos e palavras-chave, além da relação entre anos/séries e etapas de ensino selecionadas.
- Desempate da ordenação, detalhes da busca e formato dos parâmetros na URL.
- Interface de moderação, regras de edição e despublicação e apresentação dos estados.
- Framework específico baseado em React, serviço de autenticação, fornecedor de armazenamento de objetos, hospedagem gerenciada e políticas de tratamento de dados.

Esses pontos serão detalhados nos documentos funcionais e técnicos correspondentes, sem ampliar o escopo automaticamente.

## 7. Documentos relacionados

- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
