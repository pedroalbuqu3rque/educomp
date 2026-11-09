# Base técnica do EduComp

Esta entrega inclui a tela inicial baseada no frame 4437:34332 do Figma, com marca vetorial original, fonte Inter local, cartões ilustrativos, adaptação responsiva, salto de conteúdo e compartilhamento. A Biblioteca funciona com exemplos locais, busca, filtros e paginação; login e links institucionais levam a páginas em preparação. Cadastro/login, envio e download ainda não estão implementados.

## Executar no Windows / PowerShell

Instale Node.js 24. Extraia o ZIP e abra a pasta educomp-main no VS Code.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abra http://localhost:3000. A tela inicial funciona sem Supabase.

## Conectar Supabase

Crie um projeto separado para desenvolvimento. Preencha `.env.local` com a URL e a chave pública publishable do painel. Nunca coloque chave secret ou service_role em variável NEXT_PUBLIC.

Execute no SQL Editor, em ordem, os arquivos de `supabase/migrations/`. São migrations para um projeto novo e não devem ser executadas repetidamente. O banco remoto não foi criado nem alterado nesta entrega.

Depois de cadastrar uma conta pelo futuro fluxo de autenticação, um administrador poderá promover o usuário a revisor pelo SQL Editor:

```sql
insert into public.reviewer_roles(user_id) values ('UUID-DA-CONTA');
```

Não existe promoção de papel pelo cadastro ou edição de perfil.

## Modelo inicial

- `profiles`: apenas informações públicas. E-mail e credenciais ficam em Auth.
- `reviewer_roles`: concessões de revisão geridas pelo administrador.
- `materials`: responsável pelo envio, dados pedagógicos, revisão e publicação separadas.
- `taxonomies` e `material_taxonomies`: classificações múltiplas.
- `material_files`: metadados de objetos em bucket privado.
- `saved_materials`: vínculo único por conta/material.
- `review_events`: histórico editorial, sem escrita direta do cliente.

`review_material` bloqueia transições inválidas, exige justificativa de recusa e registra a decisão na mesma transação. Aprovar não publica. Publicar exige arquivo registrado.

As tabelas usam RLS. Visitantes só leem materiais publicados; autores leem seus próprios envios; revisores leem a fila. Downloads exigem autenticação e visibilidade do material. URLs assinadas são credenciais temporárias compartilháveis: preferir download autenticado para a regra atual.

## Limites e próximas migrations

Escrita de materiais, classificações e arquivos e upload estão intencionalmente bloqueados aos clientes até implementar o fluxo de submissão validado. Não usar service_role no navegador para contornar esse bloqueio.

Ainda devem ser implementados: finalização transacional do envio, validação real dos bytes de arquivos, limites por envio, relação etapa/ano, vocabulários oficiais, busca sem acentos e índices, comunidade, denúncias, notificações e contato. O schema é a primeira modelagem, não o banco completo do MVP.

A função de publicação verifica o registro de arquivo; a futura finalização do upload deverá garantir a existência e validação do objeto antes de gravar esse registro.

## Verificações

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Os testes usam PostgreSQL embarcado (PGlite), simulando os papéis e `auth.uid()` para testar RLS e revisão. Não substituem testes de integração com Supabase Auth e Storage. Playwright será introduzido com os primeiros fluxos de interface.
