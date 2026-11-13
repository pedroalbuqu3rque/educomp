# EduComp

O **EduComp** é uma plataforma para professores da Educação Básica encontrarem, utilizarem e compartilharem materiais de ensino de Computação. A Biblioteca reúne recursos organizados por etapa de ensino, tipo, eixo da BNCC Computação e abordagem plugada ou desplugada. Cada material tem uma página própria, com informações pedagógicas e espaço para discussão entre docentes.

Este repositório contém a aplicação web, as migrations do banco, os arquivos do acervo inicial, os testes e a documentação do produto.

## Aplicação

O código inclui:

- **Biblioteca e Salvos:** busca, quatro filtros independentes, paginação, fichas pedagógicas, prévias de arquivos e favoritos.
- **Materiais:** publicação controlada, autoria, downloads, informações pedagógicas e Comunidade vinculada a cada recurso.
- **Participação:** comentários, respostas, relatos de aplicação e denúncias, com moderação por revisores autorizados.
- **Conta:** cadastro, confirmação de e-mail, login, recuperação de senha, perfil pessoal, foto e perfil público.
- **Envios:** formulário de contribuição, acompanhamento do status, reenvio após solicitação de ajustes e revisão editorial.
- **Comunicação:** notificações, canal Fale conosco, Termos de uso e Política de privacidade.

A implementação está funcional no nível de código e testes automatizados. A conclusão do MVP depende de homologação dos fluxos com o Supabase real, acessibilidade e revisão dos textos jurídicos. **Build aprovado e testes automatizados não substituem esses procedimentos.**

## Tecnologias

Next.js 16, React 19, TypeScript, CSS, Supabase (Authentication, PostgreSQL com RLS e Storage), Vitest e PGlite. O projeto utiliza a fonte Inter e segue a identidade visual do EduComp.

## Executar localmente

Requisito: **Node.js 24** (arquivo `.nvmrc`).

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

Preencha o `.env.local` com os valores públicos do projeto Supabase antes de iniciar o servidor:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICA
APP_URL=http://localhost:3000
```

Acesse `http://localhost:3000`. Não inclua `.env.local`, segredos ou tokens em commits ou arquivos enviados para revisão.

### Verificações de código

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run test:checks
npm.cmd run build
```

Os testes de banco usam PGlite e não modificam o banco hospedado. As rotas que exigem autenticação, Storage ou funções SQL precisam ser verificadas também com contas de teste reais.

## Supabase

Os arquivos em [`supabase/migrations`](supabase/migrations) vão de **001 a 016**. Aplique somente as migrations que estiverem faltando, na ordem, após verificar o histórico e manter um backup. Não reaplique migrations já instaladas nem execute novamente scripts administrativos de cadastramento apenas para testar.

- `materials`: bucket privado para os arquivos enviados pelos professores.
- `avatars`: bucket público para fotos de perfil.
- Acesso a materiais, favoritos, perfis e funções de revisão protegido por políticas RLS e validações no servidor.
- `reviewer_roles`: permissões de revisão concedidas pelo administrador. Uma conta comum não se torna revisora por se cadastrar.
- O acervo editorial possui 24 fichas de materiais. Quatro têm PDFs próprios; as demais ainda usam um PDF provisório identificado na ficha. Os arquivos ficam em `public/biblioteca/arquivos`.

A lista de tabelas, as políticas e as funções já foram verificadas por consultas no projeto Supabase; **a aplicação das migrations 013–016 e os fluxos com usuários reais ainda precisam ser confirmados no ambiente utilizado para a publicação**.

## Organização

```text
src/
  app/          Páginas, layouts e rotas de API
  components/   Componentes por área de interface
  lib/          Consultas, validações e regras de negócio
  proxy.ts      Renovação de sessão
public/         Marca, ícones, capas e PDFs do acervo
supabase/
  migrations/   Evolução versionada do banco
  admin/        Scripts de administração (uso controlado)
tests/          Testes de regras de negócio, RLS e rotas
docs/
  product/      Escopo, requisitos e backlog
  ux-ui/        Padrões visuais e fluxos
  technical/    Guias de implementação e integração
  qa/           Plano de testes e registros de revisão
  archive/      Notas históricas de implementação
```

Os CSS permanecem junto às áreas que os utilizam. O código usa componentes reutilizáveis, sem duplicar políticas de autorização nos elementos de interface.

## Estado antes da homologação

A estrutura e as páginas estão implementadas. Antes de publicar, é necessário conferir as migrations mais recentes, conceder o papel de revisor a uma conta de teste, validar os envios e a moderação com duas contas, testar os acessos aos arquivos, revisar a responsividade e concluir a homologação de QA. Os textos de Termos e Privacidade exigem validação institucional/jurídica.

Consulte o [controle de implementação](docs/technical/controle-implementacao.md), o [backlog](docs/product/backlog.md) e o [plano de testes](docs/qa/plano-de-testes.md).

## Referências de design

- [Protótipo do EduComp no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Identidade visual](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Design System](docs/ux-ui/design-system.md)
- [Handoff de UI/UX](docs/ux-ui/handoff.md)

O projeto também compõe um portfólio pessoal, identificado discretamente no rodapé da página inicial.
