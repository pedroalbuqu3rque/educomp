# Plano de Testes de Software — EduComp

| Campo | Informação |
|---|---|
| Identificação | PTS-EDUCOMP-001 |
| Versão | 0.1 |
| Data | 09/11/2026 |
| Status | Versão inicial para revisão |
| Projeto | EduComp |
| Escopo | Produto web — MVP |
| Ferramentas previstas | GitHub, Qase, Vitest, Playwright e GitHub Actions |

## 1. Objetivo

Estabelecer a estratégia de verificação da qualidade do MVP do EduComp, definindo o escopo dos testes, os ambientes, as responsabilidades, os critérios de execução, o registro de evidências e o tratamento de defeitos.

O plano orienta os testes manuais e automatizados realizados ao longo do desenvolvimento. Sua existência não significa que todos os módulos estejam implementados, testados ou aprovados.

## 2. Referências e contexto

O EduComp é uma plataforma web de descoberta, organização e compartilhamento de materiais para o ensino de Computação na Educação Básica. O protótipo no Figma e a documentação de requisitos e escopo do repositório são as referências funcionais para os testes.

Tecnologias adotadas: Next.js (App Router), TypeScript, Tailwind CSS e Supabase (PostgreSQL, Authentication e Storage). A estratégia de automação utiliza Vitest, Playwright e GitHub Actions.

Em caso de divergência entre o sistema implementado e o comportamento especificado, registrar o problema e confirmar a regra de negócio antes de alterar o resultado esperado do teste.

## 3. Escopo dos testes

| ID | Módulo | Cobertura prevista | Prioridade |
|---|---|---|---|
| AUT | Autenticação | Cadastro, entrada, saída, recuperação de senha, validação de formulários e proteção de rotas | Alta |
| BIB | Biblioteca | Listagem pública, detalhes, busca, filtros combinados, paginação e acesso autenticado a arquivos | Alta |
| PUB | Envio e publicação | Validação de campos e anexos, envio, estados de revisão, aprovação, recusa e publicação | Crítica |
| SEG | Autorização e segurança | Controle de acesso por papel, isolamento de dados, políticas do Supabase e regras de acesso a arquivos | Crítica |
| COM | Comunidade e perfis | Perfis públicos, discussões, respostas, denúncias, salvos e notificações conforme a implementação do MVP | Média |
| UI | Interface e acessibilidade | Navegação, estados de erro, adaptação a telas, teclado, foco, contraste e legibilidade | Média |

### 3.1 Regras de negócio críticas

- Visitantes podem consultar biblioteca, detalhes, perfis e discussões públicas, mas ações como acessar arquivos, salvar materiais, comentar, denunciar e enviar contribuições exigem autenticação.
- Um material enviado inicia como **Pendente**. A revisão permite iniciar análise, aprovar ou recusar com justificativa.
- **Aprovado** e **Publicado** são estados distintos. Somente materiais publicados devem aparecer na biblioteca pública.
- Revisão e moderação dependem de autorização específica. Um usuário comum não pode obter permissões de revisor por manipulação de interface, URL ou requisição.
- A classificação de atividades como **Plugada** e/ou **Desplugada** deve funcionar em conjunto com os demais filtros, inclusive para materiais com ambas as abordagens.

Essas regras deverão ser confrontadas com a versão vigente dos requisitos antes da execução de cada ciclo.

### 3.2 Fora do escopo nesta versão

Não são objetivos deste plano testes de carga em escala de produção, auditoria independente de segurança, homologação com usuários reais ou verificação de impacto pedagógico. Essas atividades poderão ter planos específicos quando houver ambiente e critérios definidos.

## 4. Estratégia de testes

| Nível/tipo | Abordagem | Evidência principal |
|---|---|---|
| Unidade e integração | Testes automatizados com Vitest para regras de negócio, validações e componentes quando aplicável | Resultado da execução no repositório/CI |
| Ponta a ponta | Fluxos prioritários automatizados com Playwright conforme forem implementados | Relatório, rastreio e captura em caso de falha |
| Funcional manual | Casos de teste no Qase, com passos e resultados esperados | Resultado da execução e anexos |
| Negativo e autorização | Tentativas de acesso indevido, dados inválidos e operações por papéis não autorizados | Resultado, resposta observada e logs sem dados sensíveis |
| Regressão | Reexecução dos fluxos afetados por correções e das jornadas críticas | Nova execução vinculada à alteração |
| Usabilidade e acessibilidade | Inspeção por checklist, navegação por teclado e verificações complementares | Checklist, capturas e defeitos registrados |

A automação oferece cobertura contínua, mas não substitui os testes exploratórios, a avaliação visual e as verificações manuais de comportamento.

## 5. Ambientes e dados de teste

**Ambiente inicial:** aplicação executada localmente com o projeto Supabase configurado para desenvolvimento. Cada execução deverá registrar data, ambiente, navegador, versão ou commit testado e eventuais limitações.

**Perfis mínimos:** visitante sem autenticação; usuário autenticado comum/autor; revisor autorizado. As contas de teste devem ser específicas para QA, sem senhas, tokens ou chaves no repositório.

**Dados mínimos:** materiais publicados e não publicados; material com arquivo PDF válido; material com abordagem plugada; material com abordagem desplugada; material com ambas; registros pertencentes a autores diferentes; entradas válidas e inválidas para formulários.

Os materiais pedagógicos já produzidos poderão ser utilizados quando adequados. As operações destrutivas devem ocorrer apenas em dados preparados para teste.

## 6. Organização e rastreabilidade

- **GitHub (`docs/qa/`)**: plano, diretrizes, matriz de rastreabilidade e relatórios consolidados.
- **Qase**: suítes, casos de teste, execuções, responsáveis, resultados e evidências.
- **GitHub Issues**: defeitos, ações corretivas, prioridade e vínculo com o código.
- **GitHub Actions**: verificações automatizadas vinculadas a commits e pull requests.

Padrão sugerido para identificação de casos: `CT-AUT-001`, `CT-BIB-001`, `CT-PUB-001`, `CT-SEG-001`, `CT-COM-001` e `CT-UI-001`. O ID nativo do Qase também deverá ser preservado. Cada caso deve indicar a referência ao requisito, pré-condições, passos, resultado esperado e classificação de prioridade.

Padrão de execução: `MVP | Ciclo 01 | AAAA-MM-DD`. Regressões devem ser identificadas separadamente.

## 7. Critérios de entrada

Um caso poderá ser executado quando a funcionalidade correspondente estiver disponível, houver ambiente acessível e dados adequados, a regra de negócio estiver identificada e o resultado esperado puder ser verificado.

Um ciclo mais amplo exige uma versão identificável da aplicação, contas com os papéis necessários, migrations aplicadas, casos revisados e registro de impedimentos conhecidos.

Funcionalidades ainda não implementadas devem permanecer **Não executadas** ou **Bloqueadas**, conforme o motivo, e nunca ser marcadas como aprovadas por antecipação.

## 8. Status e critérios de saída

**Status de execução:** Não executado, Aprovado, Reprovado, Bloqueado e Não aplicável.

**Critérios propostos para recomendar a conclusão de um ciclo de validação do MVP:**

1. Todos os testes críticos e de alta prioridade aplicáveis ao ciclo foram executados.
2. Não há defeitos bloqueadores ou críticos em aberto; defeitos altos devem ser corrigidos ou formalmente avaliados antes da liberação.
3. Os fluxos críticos afetados pelas correções passaram por regressão.
4. Resultados, impedimentos, evidências e riscos residuais foram registrados.
5. O relatório identifica a versão testada e apresenta uma recomendação de liberação ou não liberação, com justificativa.

Esses critérios são metas de qualidade, não declaração de que o MVP já está apto para produção.

## 9. Registro e tratamento de defeitos

Defeitos reproduzíveis serão registrados em **GitHub Issues** com: título objetivo, ambiente e versão, pré-condições, passos para reproduzir, resultado esperado, resultado observado, evidências, gravidade, prioridade e referência ao caso de teste do Qase.

**Gravidade:** Bloqueadora (impede operação essencial sem contorno), Crítica (falha grave de segurança ou função central), Alta (função importante comprometida), Média (problema com contorno) e Baixa (impacto limitado ou visual). A **prioridade de correção** será avaliada separadamente, segundo risco e impacto.

Fluxo sugerido: **Aberto → Em análise → Em correção → Pronto para reteste → Validado/Fechado**. Caso persista, o defeito volta à correção. Melhorias de produto devem ser registradas separadamente de defeitos.

## 10. Segurança, privacidade e evidências

Os testes de autorização devem verificar o comportamento real do servidor e das políticas de acesso do Supabase, não apenas a visibilidade de botões na interface. Incluem tentativas de consultar registros de terceiros, acessar arquivos restritos e executar ações reservadas ao revisor.

Nenhum relatório deve conter senhas, tokens, chaves de API, links de acesso temporários válidos ou dados pessoais desnecessários. As evidências devem ser recortadas ou anonimizadas quando necessário.

Testes destrutivos, de estresse ou de segurança invasiva não serão executados em produção sem planejamento e autorização específicos.

## 11. Riscos e limitações

| Risco | Mitigação |
|---|---|
| Funcionalidades ainda em construção | Separar casos planejados de casos executáveis |
| Regras de negócio em evolução | Versionar casos e relacioná-los à documentação vigente |
| Dependência de autenticação por e-mail | Preparar contas e condições de teste antes do ciclo |
| Falhas de permissões que não aparecem na interface | Verificar políticas de banco e respostas do servidor |
| Execução por uma única pessoa | Documentar evidências, aplicar checklist e repetir cenários críticos |
| Dados de teste inconsistentes | Preparar conjunto controlado e restaurável antes de cada ciclo |

## 12. Papéis e responsabilidades

Por se tratar de um projeto autoral, as responsabilidades podem ser exercidas pela mesma pessoa, mas serão **registradas por função**, sem simular a existência de uma equipe que não existe:

- **Produto:** valida o requisito e decide a aceitação de riscos de produto.
- **Desenvolvimento:** analisa e corrige defeitos, mantém os testes automatizados e a integração contínua.
- **QA:** define os casos, executa verificações, coleta evidências, registra defeitos e recomenda a conclusão do ciclo.

## 13. Entregáveis e manutenção

Os entregáveis são este plano, catálogo de casos no Qase, registros de execução, issues de defeitos e relatórios de teste por ciclo. O plano será revisto quando houver mudança relevante de escopo, tecnologia, regras de acesso ou estratégia de publicação.

**Próxima atividade:** estruturar as suítes no Qase, cadastrar os casos prioritários de autenticação e biblioteca e realizar o primeiro ciclo manual sobre as funcionalidades efetivamente disponíveis.
