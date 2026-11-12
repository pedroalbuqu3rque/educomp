# Meu perfil

A rota `/conta` agora apresenta o cabeçalho da plataforma, identificação da conta, formulário de informações pessoais, acesso ao perfil público e ações de senha e encerramento de sessão.

O formulário permite editar nome (obrigatório, até 120 caracteres), cargo ou função (opcional, até 120 caracteres) e apresentação (opcional, até 300 caracteres). O e-mail vem da sessão autenticada e é somente leitura. Nome, cargo e apresentação aparecem no perfil público. A fotografia ainda não faz parte desta entrega; o avatar utiliza iniciais.

A ação de salvamento verifica novamente a sessão no servidor, seleciona apenas os três campos permitidos e atualiza exclusivamente `profiles.id = usuário autenticado`. IDs ou campos extras enviados pelo cliente não são gravados. As políticas de segurança existentes do Supabase continuam aplicáveis. Não há migração nova.

A confirmação depende do retorno do registro atualizado. Erros de validação, falhas do banco, ausência de perfil e sessão expirada não exibem sucesso. O formulário mantém os valores após falha. Uma falha ao carregar o perfil apresenta uma opção de tentar novamente, em vez de abrir campos vazios que possam sobrescrever dados.

## Validação realizada

- `npm.cmd run typecheck`: aprovado.
- `node --test tests/profile.check.mjs`: oito testes aprovados com cliente de banco simulado.
- Revisão visual da renderização dos componentes com dados de teste.
- A suíte completa e o build não foram repetidos nesta etapa. A limitação anterior das dependências nativas de Windows no ambiente Linux continua registrada em `material-e-perfil.md`.
- A revisão visual é estática: não valida hidratação, persistência real ou fluxo de sessão no navegador.

## Conferência local

1. Entrar e abrir Minha conta.
2. Alterar nome, cargo e apresentação. Conferir contador e aviso de alterações não salvas.
3. Salvar, recarregar e verificar os dados.
4. Abrir Ver perfil público e conferir as informações; o e-mail não deve aparecer.
5. Tentar salvar nome apenas com espaços e conferir a rejeição.
6. Testar falha de conexão e confirmar que o formulário conserva os valores.
7. Abrir `/conta` sem sessão e confirmar redirecionamento para login.
8. Conferir navegação por teclado, foco dos campos e disposição em janela estreita.
