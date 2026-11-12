# Contato e páginas institucionais

Esta entrega substitui as páginas provisórias `/contato`, `/termos` e `/privacidade` por telas com conteúdo real, seguindo a seção **9 · Contato e informações** do protótipo no Figma.

## Fale conosco

O formulário em `/contato` está disponível para visitantes e usuários autenticados. Inclui **nome**, **e-mail**, **assunto** e **mensagem**, com campos obrigatórios, validações no navegador e na API, limite de 4.000 caracteres na mensagem e estados de erro, carregamento e confirmação. O conteúdo digitado permanece no formulário quando há falha. O sistema só confirma o envio depois que o banco aceita a gravação.

A API `POST /api/contato` recebe JSON e chama a função `submit_contact_message` no Supabase usando a chave publicável já configurada. Não usa `service_role`, não envia e-mail e não disponibiliza mensagens na Biblioteca ou no perfil do usuário. A tabela privada `public.contact_messages` guarda os campos enviados, o momento do envio e o identificador da conta quando disponível.

### Ativação

1. Use os arquivos desta versão do projeto.
2. Confirme se as migrations anteriores (**001 a 009**) estão aplicadas. No SQL Editor do Supabase, execute **somente** `supabase/migrations/202611110010_contact.sql`.
3. Configure `.env.local` conforme `.env.example` e execute `npm ci` e `npm run dev`.
4. Abra `http://localhost:3000/contato` em uma janela anônima e envie uma mensagem de teste válida.
5. No **SQL Editor do Supabase, com acesso administrativo**, consulte:

```sql
select id, name, email, subject, message, created_at
from public.contact_messages
order by created_at desc
limit 50;
```

A tabela **não tem políticas de leitura ou escrita** para `anon` e `authenticated`. A leitura acima exige SQL Editor administrativo. Um envio não é uma garantia de leitura ou resposta humana; na fase atual, alguém precisa acompanhar a caixa manualmente. Antes de abrir o MVP ao público, é recomendável designar quem recebe e responde às mensagens e configurar uma rotina de atendimento.

### Cuidados de segurança e anti-spam

- A API verifica origem (quando informada), tipo e tamanho do corpo e usa validação estrita dos campos.
- Há um campo oculto para reduzir envios automatizados simples.
- O banco limita a **3 mensagens por e-mail normalizado em 24 horas**, com bloqueio transacional para evitar envios simultâneos que contornem o limite.
- Usuários comuns não têm `SELECT`, `INSERT`, `UPDATE` ou `DELETE` direto na tabela. A função RPC executa somente um `INSERT` com validações.
- **Essa proteção é básica**, pois uma pessoa mal-intencionada pode alternar endereços de e-mail. Antes de disponibilizar publicamente, configure também limite de requisições na borda (WAF/CDN) e considere CAPTCHA/Turnstile conforme a necessidade.
- Não registre o conteúdo das mensagens nos logs da API nem compartilhe cópias fora do canal administrativo.

## Termos de uso e Privacidade

As páginas têm navegação por seções, descrição dos recursos existentes e links para contato. A política de privacidade menciona Supabase (Auth, Postgres e Storage), conta, arquivos, interações na Comunidade, notificações e mensagens de contato; os Termos abordam autoria, publicação, revisão e convivência no EduComp.

**Não são textos jurídicos finalizados.** Mantivemos um aviso visível porque ainda é necessário confirmar, antes do lançamento:

1. Identidade e contato formal do responsável/controlador e, quando aplicável, do encarregado de dados.
2. Finalidades e bases legais específicas de cada tratamento; serviços integrados e eventual transferência internacional de dados.
3. Política de retenção, eliminação, cópia e resposta a solicitações dos titulares.
4. Regras de licenciamento e uso de materiais compartilhados, atualizações das políticas e procedimento de remoção de conteúdos.
5. Revisão jurídica e aceitação dos termos no momento apropriado da experiência de cadastro.

As descrições atuais não afirmam prazos ou garantias não comprovados. O formulário de contato serve como canal provisório para dúvidas e solicitações de privacidade, não como prova de estrutura de atendimento já definida.

Referências legais: [Lei 13.709/2018, texto atualizado da Câmara](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) e [ANPD — direitos dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares).

## Checklist de teste manual

1. Abra `/contato`, `/termos` e `/privacidade` como visitante e teste os links do cabeçalho e rodapé.
2. Envie o formulário vazio, com e-mail inválido e com mensagem curta: o envio deve ser bloqueado sem criar registro.
3. Envie uma mensagem válida; confirme o diálogo de sucesso e a linha no SQL Editor.
4. Desconecte o Supabase ou teste sem a migration 010: a interface deve apresentar erro e **preservar os campos**; não deve mostrar confirmação falsa.
5. Envie quatro mensagens no mesmo dia com o mesmo e-mail: a quarta deve receber a resposta `429` (limite diário).
6. Tente consultar `public.contact_messages` com papéis `anon` e `authenticated`: ambos devem ter acesso negado.
7. Teste navegação por teclado, foco do diálogo, Escape, 375 px e 768 px de largura.
8. Execute `npm run typecheck`, `npm run lint`, `npm test` e `npm run build` em ambiente com dependências completas.

Testes adicionados em `tests/contact-validation.test.ts` e `tests/contact-database.test.ts`.
