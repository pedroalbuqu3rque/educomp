# Controle de implementação

**Referência:** EduComp 0.2 · 13/11/2026
**Uso:** acompanhamento das entregas no repositório. A validação de QA acontece em etapa separada.

## Estado das áreas

| Área | Código | O que precisa ser validado |
| --- | --- | --- |
| Início e páginas institucionais | Implementado | Responsividade, acessibilidade e revisão jurídica de Termos/Privacidade |
| Biblioteca e acervo inicial | Implementado | Pesquisa, filtros, paginação, PDFs definitivos e fichas com anexos provisórios |
| Salvos | Implementado | Salvar, remover e consultar com usuário autenticado |
| Autenticação e perfis | Implementado | Cadastro/confirmação, recuperação de senha, foto e dados públicos |
| Envio e reenvio | Implementado | Storage privado, validação de arquivos, estados e retornos após login |
| Revisão e moderação | Implementado | Papel de revisor, aprovar, solicitar ajustes, recusar e resolver denúncias |
| Comunidade | Implementado | Comentários, relatos, respostas, edição, exclusão e denúncias por material |
| Notificações | Implementado | Eventos do banco, boas-vindas, leitura individual e em lote |
| Fale conosco | Implementado | Recebimento e limites de envio com o banco real |

## Banco e arquivos

Migrations disponíveis: `001`–`016` em `supabase/migrations`. Não as reexecute sem verificar se já foram aplicadas. O banco do projeto já foi consultado e apresentou 16 tabelas com RLS habilitado, os buckets `materials` (privado) e `avatars` (público), além das funções principais de envio, revisão, Comunidade e notificações.

O acervo editorial contém 24 registros. Quatro PDFs são materiais completos; os outros têm arquivos provisórios, identificados na ficha. A migration `013` mantém metadados da Biblioteca coerentes com os PDFs; a `014` permite participação da Comunidade nos registros do acervo; a `015` cria a notificação de boas-vindas. A aplicação efetiva dessas três migrations deve ser confirmada na homologação.

## Pendências para fechamento

1. Criar ou conferir uma conta com papel de revisor, sem ampliar permissões de usuários comuns.
2. Validar as migrations `013`–`016` e os fluxos ponta a ponta no Supabase hospedado.
3. Executar revisão visual em desktop, tablet e celular, incluindo foco por teclado e estados de erro.
4. Realizar homologação funcional e registrar evidências no plano de QA.
5. Revisar Termos, Privacidade e configuração de produção antes de colocar a plataforma no ar.

## Regras de manutenção

- O protótipo no Figma orienta a identidade visual; o código do repositório é a referência de comportamento implementado.
- Alterações visuais não devem ampliar permissões, alterar políticas RLS ou substituir arquivos publicados.
- Migrations são históricas e sequenciais. Corrija esquemas com uma nova migration, nunca editando uma já executada.
- Testes automatizados ajudam a identificar regressões, mas não comprovam integração real ou ausência de bugs.
- Documentação desatualizada deve ser revisada na mesma entrega que muda o comportamento descrito.
