# EduComp

Plataforma para professores da Educação Básica encontrarem e compartilharem materiais de ensino de Computação.

A Biblioteca organiza os recursos por tipo, etapa de ensino, eixo da Computação e abordagem plugada ou desplugada. As fichas são públicas. É preciso entrar na conta para baixar arquivos, salvar materiais e participar da Comunidade. Os envios passam por revisão antes da publicação.

## Desenvolvimento

Use Node.js 24, conforme o arquivo `.nvmrc`.

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
```

Preencha `.env.local` com a URL e a chave pública do Supabase. `APP_URL` deve apontar para o endereço da aplicação, usado nos links de autenticação. No desenvolvimento, use `http://localhost:3000`.

```powershell
npm.cmd run dev
```

## Verificações

```powershell
npm.cmd run format:check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run test:checks
npm.cmd run build
```

`npm.cmd run format` aplica a formatação do projeto. O CI executa as verificações a cada push e pull request. Os testes de banco usam PGlite e não alteram o Supabase hospedado.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `src/app` | Páginas, layouts e rotas HTTP |
| `src/components` | Componentes organizados por funcionalidade |
| `src/lib` | Consultas, validações e regras compartilhadas |
| `public` | Marca, ícones e capas públicas |
| `private` | PDFs do acervo, servidos por rota autenticada |
| `supabase/migrations` | Histórico do banco, de 001 a 016 |
| `supabase/admin` | Scripts administrativos |
| `tests` | Testes automatizados e dados de teste em `fixtures` |
| `docs` | Produto, interface, implementação e QA |

Next.js, React e TypeScript compõem a aplicação. Supabase fornece autenticação, PostgreSQL e Storage. A interface usa CSS e a fonte Inter.

## Banco e arquivos

Aplique somente migrations ainda não instaladas, na ordem. Preserve o histórico de migrations já executadas. O papel de revisor é concedido por um administrador e não faz parte do cadastro comum.

O bucket `materials` é privado; `avatars` é público. Os PDFs institucionais ficam em `private/biblioteca/arquivos`. Não os copie para `public`: essa pasta é acessível sem autenticação.

O acervo tem 24 fichas. Quatro possuem PDFs próprios; as demais usam um arquivo de demonstração identificado na página do material.

Não inclua `.env.local`, credenciais, `node_modules` ou `.next` em commits ou pacotes compartilhados.

## Documentação

- [Revisão de código — 15/11/2026](docs/qa/revisao-2026-11-15.md)
- [Plano de testes](docs/qa/plano-de-testes.md)
- [Controle de implementação](docs/technical/controle-implementacao.md)
- [Escopo do produto](docs/product/escopo-mvp.md)
- [Design System](docs/ux-ui/design-system.md)
- [Protótipo no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)

Os fluxos com e-mail, contas de professor e revisor, Storage e notificações precisam de homologação no ambiente integrado. O plano de QA registra esses cenários.
