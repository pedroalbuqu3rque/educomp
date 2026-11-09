# Configurar o acesso no Supabase

## 1. Perfil automático

Execute apenas `supabase/migrations/202611090003_auth_profiles.sql` no SQL Editor, após as migrations 001 e 002 já aplicadas. Ela cria perfis para novos usuários e preenche perfis ausentes das contas existentes. Não altera perfis já existentes e não concede permissões de revisão.

## 2. Endereço da plataforma

Em Authentication → URL Configuration:

- Site URL: `http://localhost:3000`
- Redirect URLs: adicione `http://localhost:3000/auth/callback` e `http://localhost:3000/auth/callback?next=/redefinir-senha`.

Em Authentication, nas configurações do provedor Email, mantenha a confirmação de e-mail habilitada. Configure o mínimo da senha para 12 caracteres para alinhar o servidor com a aplicação.

## 3. Modelos dos e-mails

Em Authentication → Email Templates (a localização pode variar), edite os modelos abaixo. Mantenha as chaves duplas exatamente como estão. Os links usam o token do próprio e-mail, permitindo confirmar em outro navegador.

### Confirm signup / confirmação de cadastro

```html
<h2>Confirme sua conta no EduComp</h2>
<p>Clique abaixo para confirmar seu e-mail.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup">Confirmar minha conta</a></p>
```

### Reset password / recuperação de senha

```html
<h2>Redefinir senha do EduComp</h2>
<p>Você solicitou uma nova senha. Se não fez essa solicitação, ignore este e-mail.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Criar uma nova senha</a></p>
```

Salve cada modelo. Solicite um novo e-mail após a alteração: mensagens antigas conservam o link antigo. Links são de uso único e podem expirar.

O servidor local precisa estar rodando para abrir o link. No celular, localhost aponta para o próprio celular: faça esse teste no computador onde executa o EduComp.

## 4. Testar

1. Abra `/cadastro`, informe nome, seu e-mail e senha com 12 ou mais caracteres.
2. Confira a mensagem e abra o link recebido (também verifique spam).
3. Na biblioteca, confira Minha conta. No Supabase, veja o usuário em Authentication → Users e o perfil em Table Editor → profiles.
4. Clique Minha conta → Sair da conta. Tente abrir `/conta`: deve voltar ao login.
5. Faça login com senha incorreta e depois correta.
6. Saia, clique Esqueceu a senha?, envie seu e-mail e abra o link recebido.
7. Digite duas senhas diferentes: deve haver erro. Digite a mesma senha nova nos dois campos e confirme.
8. Saia e entre com a nova senha. A anterior não deve funcionar.
9. Abra novamente o link já usado: deve aparecer orientação para solicitar outro.

Se o Supabase recusar o envio de e-mail, confira Authentication → Logs e as configurações de envio. O provedor de e-mail de desenvolvimento pode restringir destinatários e quantidade de envios. Para uso público, configure SMTP próprio e valide os limites do projeto. Nunca coloque uma chave secreta em variáveis NEXT_PUBLIC.

## Funcionamento técnico

Server Actions fazem validação e operações de senha. Cookies são geridos por @supabase/ssr; o proxy renova a sessão e páginas protegidas verificam o usuário com getUser. Os destinos de retorno são limitados a rotas conhecidas. O callback também aceita o fluxo PKCE padrão (mesmo navegador). Tokens e senhas não são registrados em logs da aplicação. A confirmação por token ocorre no GET do link; desative rastreamento de links no provedor SMTP para evitar consumo antecipado de links de uso único.

A aplicação não inclui limitador próprio; depende dos limites do Supabase Auth. Antes de abrir ao público, configure SMTP, proteção contra abuso, URLs de produção e publique os textos finais de termos e privacidade, que ainda são páginas provisórias.

## Quando publicar

Troque APP_URL em produção pela origem HTTPS real. Atualize Site URL, Redirect URLs e os modelos do Supabase. Não use o endereço recebido no cabeçalho Host para montar os links de e-mail.
