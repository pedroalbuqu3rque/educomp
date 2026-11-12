
# EduComp

O **EduComp** é um projeto de plataforma para professores da Educação Básica encontrarem, utilizarem e compartilharem materiais pedagógicos de Computação. A proposta combina uma Biblioteca organizada por critérios de ensino, um espaço para troca de experiências entre docentes e um processo de revisão das contribuições publicadas.

O projeto reúne a documentação de produto, o protótipo no Figma e uma aplicação web em desenvolvimento. O código atual já permite navegar na Biblioteca, criar uma conta, consultar materiais publicados, salvar recursos, editar o perfil e enviar contribuições para revisão. Os principais fluxos do MVP já estão implementados no código, mas dependem de testes reais e revisão antes da publicação.

## O que a plataforma propõe

- **Biblioteca pública:** pesquisa por título ou tema, filtros por tipo, etapa de ensino, eixo da Computação e abordagem plugada/desplugada, além de paginação e informações pedagógicas nos cartões.
- **Materiais:** detalhes, objetivos de aprendizagem, autoria, arquivos para acesso e possibilidade de salvar recursos na conta.
- **Participação docente:** comentários, respostas, relatos de aplicação e perfis públicos com materiais compartilhados.
- **Contribuições ao acervo:** envio de materiais com metadados, múltiplos arquivos e acompanhamento em *Meus envios*.
- **Revisão e moderação:** aprovação editorial dos materiais, análise de denúncias e controle de conteúdo inadequado por revisores autorizados.
- **Conta e comunicação:** cadastro, login, recuperação de senha, perfil, notificações sobre materiais e novidades da plataforma, contato e compartilhamento do EduComp.

O público principal são professores. Revisores autorizados operam as filas de materiais e denúncias. A experiência deve permitir consultar a Biblioteca e os detalhes sem cadastro, reservando ações pessoais e publicação de contribuições a usuários autenticados.

## Estado do projeto

| Frente | Situação |
| --- | --- |
| Produto, requisitos e protótipo desktop | Documentados no Figma e no repositório |
| Aplicação Next.js, React e TypeScript | Em desenvolvimento |
| Autenticação e perfis (Supabase Auth) | Implementados no código |
| Biblioteca, filtros, detalhes e salvos | Implementados no código |
| Enviar material e Meus envios | Implementados no código; dependem da migration 006 |
| Revisão e publicação por moderadores | Painel e ações implementados no código; dependem da migration 007 |
| Denúncias e moderação de comentários | Integradas à Comunidade no código; dependem das migrations 007 e 008 |
| Comunidade (comentários, relatos, respostas, denúncia) | Implementada no código; depende da migration 008 e de teste real no Supabase |
| Notificações internas | Implementadas no código; dependem da migration 009 |
| Contato e páginas institucionais | Formulário, Termos e Privacidade implementados no código; dependem da migration 010 e de validação jurídica das políticas |
| Foto de perfil e reenvio de materiais | Implementados no código; dependem da migration 011 |
| Testes completos e implantação em produção | Ainda não concluídos |

### Executar a aplicação

Use Node.js 24, conforme `.nvmrc`.

```bash
npm ci
```

Crie `.env.local` na raiz com os dados do seu projeto Supabase:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICA
APP_URL=http://localhost:3000
```

Execute as migrations em `supabase/migrations/`, na ordem numérica, no SQL Editor do Supabase. Se as migrations 001 a 010 já foram aplicadas, execute `202611110011_profile_photo_resubmissions.sql` e, depois, `202611110012_library_showcase.sql` para ativar os cards de exemplo da Biblioteca. Caso alguma migration anterior esteja pendente, aplique apenas as faltantes, em ordem numérica (001 → 012); **não reaplique migrations já executadas**. A 012 é necessária para os exemplos de interface exibidos no Figma.

```bash
npm run dev
```

Acesse `http://localhost:3000`. Depois de entrar com uma conta, use **Enviar material** para submeter os dados e os arquivos. Os envios são registrados como **Aguardando revisão**; somente um revisor autorizado pode aprovar e publicar. O painel fica em `/revisao`. A autorização deve ser concedida pelo administrador no Supabase, conforme [Revisão e moderação](docs/technical/revisao-moderacao.md). O bucket `materials` é privado.

Para verificar o código em um ambiente com as dependências instaladas:

```bash
npm run typecheck
npm run lint
npm test
npm run test:checks
npm run build
```

O fluxo ainda precisa de um teste completo com uma conta real no Supabase, incluindo upload, consulta em **Meus envios**, revisão e acesso ao arquivo após a publicação. A Comunidade aparece no detalhe dos materiais publicados, com filtros e formulários de participação. A fila de denúncias recebe os relatos enviados por usuários autenticados e permanece vazia até receber dados reais. Veja [Comunidade](docs/technical/comunidade.md). Ao publicar em provedores com limite pequeno de tamanho do corpo HTTP, confirme que a rota `/api/materiais` permite o tamanho de upload previsto; o formulário aceita até 20 MB por arquivo e 50 MB por envio.

## Design

- [Protótipo do EduComp no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Identidade visual](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Referências de adaptação para telas menores](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-26978)

A referência principal de interface é a página **Protótipo**, organizada em dez seções: Início, Acesso, Biblioteca e Salvos, Filtros, Material e autor, Comunidade, Envio, Perfil e notificações, Contato e informações, Revisão e moderação.

A implementação prioriza o desktop, utilizando os frames de 1536 px como referência de composição. A adaptação para tablet e celular e a acessibilidade fazem parte dos critérios de conclusão do MVP.

## Documentação

```text
EduComp/
├── README.md
└── docs/
    ├── product/
    │   ├── product-brief.md
    │   ├── escopo-mvp.md
    │   ├── requisitos.md
    │   ├── historias-de-usuario.md
    │   ├── backlog.md
    │   ├── especificacao-busca-filtros.md
    │   └── especificacao-metadados.md
    └── ux-ui/
        ├── arquitetura-da-informacao.md
        ├── objetivos-de-ux.md
        ├── user-flow.md
        ├── design-system.md
        └── handoff.md
```

Para entender **por que** o produto existe, comece pelo [Product Brief](docs/product/product-brief.md). O [Escopo do MVP](docs/product/escopo-mvp.md) delimita a primeira entrega; os [Requisitos](docs/product/requisitos.md) e as especificações detalham o funcionamento. O [Backlog](docs/product/backlog.md) organiza o trabalho. A pasta `docs/ux-ui` trata da arquitetura da informação, da experiência, dos padrões visuais e do [handoff](docs/ux-ui/handoff.md). O [relatório de revisão técnica](docs/qa/revisao-tecnica-2026-11-12.md) registra as correções da versão 0.2, as verificações executadas e o que ainda precisa ser testado.

## Próximos passos

1. Validar o envio, a revisão e a publicação ponta a ponta no Supabase, com duas contas e as permissões corretas.
2. Validar a Comunidade ponta a ponta: comentar, relatar aplicação, responder, denunciar e moderar com contas reais.
3. Testar foto de perfil e reenvio de materiais com as permissões da migration 011.
4. Revisar os Termos e a Política de Privacidade juridicamente, definir o responsável pelos dados e o atendimento de mensagens antes do lançamento.
5. Refinar a responsividade e a acessibilidade, executar os testes e registrar os resultados.


### Notificações

O sininho do cabeçalho e `/notificacoes` exibem avisos de envios, revisão, novos materiais, respostas, moderação e comunicados institucionais. Os eventos são persistidos por conta, com leitura individual ou em lote e proteção por RLS. Instale a migration `supabase/migrations/202611110009_notifications.sql` **após a 008**. Veja `docs/technical/notificacoes.md` para detalhes de ativação e testes.


### Contato e documentos institucionais

`/contato` permite o registro de mensagens de visitantes no Supabase, sem acesso público à caixa de mensagens. As páginas `/termos` e `/privacidade` estão implementadas com conteúdo específico da aplicação, mas permanecem como textos para validação institucional e jurídica antes do lançamento. Para ativar o contato, execute a migration `supabase/migrations/202611110010_contact.sql` **após a 009**. Veja [Contato e páginas institucionais](docs/technical/contato-institucional.md) para consultas administrativas, limites e testes.


### Foto de perfil e reenvio

A conta permite selecionar uma foto JPG ou PNG de até 5 MB, conferir uma prévia e salvar ou remover. A imagem escolhida fica disponível no perfil público, na autoria dos materiais, na Comunidade e no cabeçalho da Biblioteca. Quem preferir pode manter as iniciais.

Ao solicitar ajustes, o revisor deve registrar uma justificativa. O professor a consulta em **Meus envios**, abre **Editar e reenviar** e prepara uma nova versão com os campos anteriores preenchidos. Uma recusa também permite preparar uma nova versão. Os arquivos precisam ser anexados novamente; o histórico original permanece guardado e o novo envio volta a **Aguardando revisão**.

Para ativar, execute `supabase/migrations/202611110011_profile_photo_resubmissions.sql` após a 010. Consulte [Foto de perfil e reenvio](docs/technical/foto-perfil-reenvio.md) para detalhes e casos de teste.

## Cards de demonstração na Biblioteca

A migration `supabase/migrations/202611110012_library_showcase.sql`, aplicada **após a 011**, cadastra 24 exemplos de materiais, conforme o Figma, para visualização na Biblioteca. Os exemplos possuem detalhes próprios e podem ser salvos, mas não contêm arquivos e não são publicações pedagógicas aprovadas. Materiais reais permanecem separados e têm prioridade. Veja [o guia da Biblioteca](docs/technical/exemplos-biblioteca.md).
