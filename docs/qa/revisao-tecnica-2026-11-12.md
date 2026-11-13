# Revisão técnica — EduComp 0.2

> Registro histórico de 12/11/2026. Consulte o `README.md` e `docs/technical/controle-implementacao.md` para o estado atualizado do projeto.

**Data:** 12 de novembro de 2026
**Base:** código recebido como `EduComp 0.2.rar`
**Escopo:** estabilidade, consistência, segurança básica das rotas, testes e manutenção. A interface existente não foi redesenhada.

## Visão geral

A aplicação está organizada em `src/app` (páginas e rotas), `src/components` (interface), `src/lib` (regras e acesso a dados), `supabase/migrations` (estrutura e regras de banco), `tests` e `docs`. Foram mantidos os recursos do MVP: Biblioteca, detalhes, salvos, envios, revisão e moderação, Comunidade, notificações, perfis e contato.

**Importante:** a revisão reduziu erros identificados, mas não comprova ausência de bugs. A validação ponta a ponta com o Supabase real, os testes de navegador e o build de produção ainda precisam ser concluídos no ambiente de desenvolvimento.

## Correções desta revisão

- **TypeScript e ESLint:** corrigidos erros de inferência em relações PostgREST, tipagem de identificadores e avisos de componentes. Tipos e lint agora terminam sem erros.
- **Classificações pedagógicas:** normalização dos relacionamentos retornados como objeto, lista ou `null`. Aplicada em envios, reenvios, revisão e detalhes dos materiais, sem alterar filtros ou conteúdo exibido.
- **Retorno do login:** a URL validada `/enviar?revisao=UUID` preserva a edição do material após autenticar; redirecionamentos externos continuam bloqueados.
- **Paginação:** "Meus envios" recupera a página válida quando o parâmetro excede o total. Perfis públicos, filas de revisão e denúncias redirecionam para a última página disponível.
- **Foto de perfil:** excluir a foto agora verifica o retorno do Storage antes de confirmar o sucesso; também bloqueia requisições cross-site identificadas pelo navegador.
- **Revisão e moderação:** requisições JSON passam a ter limite de 4 KiB, validação do corpo e proteção adicional de origem.
- **Envio de materiais:** acrescentada a verificação `Sec-Fetch-Site` contra requisições cross-site.
- **Navegação e erros:** ajustados links internos e a renderização de mensagem de indisponibilidade de notificações.
- **Testes e documentação:** adicionados casos de regressão de taxonomias, redirecionamento e paginação; atualizado o teste de perfil para `avatar_path`; alinhadas instruções das migrations 011 e 012 e a versão do pacote para 0.2.0.

## Resultado das verificações disponíveis

| Verificação | Resultado | Observação |
| --- | --- | --- |
| TypeScript (`tsc --noEmit`) | **Aprovado** | Sem erros de tipos. |
| ESLint (`eslint .`) | **Aprovado** | Sem erros e sem avisos. |
| Testes locais Node (`node --test tests/*.check.mjs`) | **21/21 aprovados** | Perfil, materiais, sessão e paginação. |
| Testes de banco PGlite | **31/31 aprovados** | Migrations executadas em banco efêmero; RLS, envios, comunidade, contato, revisões, notificações e exemplos da Biblioteca. Os testes Vitest de banco foram executados com um adaptador temporário para `node:test`, sem alterar o código de teste nem o SQL. |
| Referências estáticas de assets | **Sem arquivos ausentes encontrados** | Verificação dos caminhos literais detectáveis. |
| Vitest padrão (`npm test`) | **Não executado neste ambiente** | O pacote fornecido tinha executáveis nativos Windows; o Linux exigiu o módulo nativo Rolldown indisponível, e o ambiente não conseguia baixá-lo. |
| Build Next.js (`npm run build`) | **Não concluído neste ambiente** | O módulo Linux de `@next/swc` não estava instalado; download bloqueado por conectividade. O projeto solicita Node.js 24, enquanto a execução de auditoria tinha Node.js 22. |
| Testes de navegação no navegador | **Pendentes** | Exigem servidor Next.js funcionando com dependências nativas e configuração real do Supabase. |

Os testes de banco cobrem um banco local de testes, mas **não demonstram** que todas as migrations estão aplicadas no seu Supabase hospedado.

## Ao receber a pasta revisada

1. Substitua os arquivos do projeto com cuidado ou aplique as alterações em uma branch Git, preservando suas configurações locais. Não sobrescreva nem publique o arquivo `.env.local`.
2. Utilize Node.js 24 (arquivo `.nvmrc`) e execute `npm ci` para reinstalar as dependências adequadas ao seu sistema operacional. Não copie `node_modules` de outro computador.
3. Execute, nesta ordem: `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:checks` e `npm run build`. Verifique o resultado de cada comando.
4. Inicie `npm run dev` e faça uma conferência visual e de navegação em desktop e telas menores.

## Integração final com Supabase — pendente por decisão do projeto

- Confirmar a aplicação das migrations **001 a 012**, em ordem, sem reaplicar scripts concluídos. A migration 011 habilita foto/reenvio; a 012 cadastra os 24 exemplos da Biblioteca.
- Conferir `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, chave pública e `APP_URL`) e a configuração de URLs de autenticação/redirecionamento no Supabase. Não colocar a service-role no frontend.
- Testar cadastro, confirmação de e-mail, login, redefinição de senha e criação de perfil com contas reais.
- Testar upload, arquivos privados, solicitação de ajustes, reenvio, aprovação, publicação, retirada de publicação e downloads, com **pelo menos duas contas** (professor e revisor autorizado).
- Conferir a pasta/bucket `materials` (privado) e o bucket `avatars` (público), incluindo criação, alteração e remoção da foto.
- Testar busca, filtros, paginação, salvos, material de demonstração e material publicado. Os 24 cards da migration 012 são exemplos de interface **sem anexos**.
- Testar comentários, relatos, respostas, denúncias e moderação; notificações e mensagens de contato com dados reais.
- Revisar textos de Termos e Privacidade com o responsável pela plataforma antes da publicação e fazer uma rodada de acessibilidade e responsividade.

### O que não foi alterado

Não foram redesenhadas telas, não foram removidas funcionalidades do MVP e **não houve conexão nem modificação do seu projeto Supabase hospedado**. Os diretórios gerados (`node_modules`, `.next`) e credenciais locais não fazem parte do pacote revisado.
