# EduComp — Backlog

**Versão:** 1.0 · **Atualizado em:** 07/11/2026 · **Situação:** protótipo consolidado; implementação não iniciada.

## 1. Como usar

Este backlog organiza entregas, dependências e o estado do trabalho. Os códigos `BK` existentes foram preservados. Uma tarefa de **design ou documentação concluída** não significa que a funcionalidade correspondente tenha sido implementada. O desenvolvimento só poderá ser concluído após integração e verificação.

| Prioridade | Critério |
| --- | --- |
| **P0** | Decisão ou preparação que bloqueia uma frente de implementação. |
| **P1** | Funcionalidade ou qualidade necessária ao MVP. |
| **P2** | Complemento previsto que pode ser desenvolvido após os fluxos-base, mas antes da entrega. |
| **P3** | Evolução fora do MVP. |

Estados: **Concluído (design/documentação)**, **A fazer**, **Em andamento**, **A verificar** e **Futuro**. Os estados abaixo não representam conclusão técnica da plataforma.

## 2. Produto, documentação e design

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| BK-001 | Atualizar documentos de produto conforme o escopo atual. | P0 | Concluído (documentação) |
| BK-002 | Revisar terminologia, códigos e ligações entre documentos. | P0 | Concluído (documentação) |
| BK-003 | Registrar papéis, permissões e regras editoriais. | P0 | Concluído (documentação) |
| BK-004 | Especificar pesquisa, paginação, combinação e persistência dos filtros. | P0 | Concluído (documentação) |
| BK-005 | Consolidar os quatro filtros e ações Aplicar, Limpar e Fechar. | P0 | Concluído (design/documentação) |
| BK-006 | Consolidar metadados, seis tipos, abordagens, anos/séries e múltiplos arquivos. | P0 | Concluído (design/documentação) |
| BK-007 | Documentar acesso autenticado e falhas dos arquivos. | P0 | Concluído (documentação) |
| BK-008 | Revisar arquitetura da informação e permissões por área. | P1 | Concluído (documentação) |
| BK-009 | Atualizar fluxos de acesso, comunidade, envio e revisão. | P1 | Concluído (documentação) |
| BK-010 | Alinhar identidade, componentes e estados de interface. | P1 | Concluído (design/documentação) |
| BK-011 | Auditar as telas e os estados do protótipo. | P1 | Concluído (design) |
| BK-012 | Consolidar o protótipo desktop nos fluxos definidos. | P1 | Concluído (design) |
| BK-031 | Desenhar área restrita de revisão e moderação de discussões. | P1 | Concluído (design) |

A página do Figma **Protótipo** contém dez seções numeradas de 01 a 10. As situações condicionais de erro e estados vazios servem de referência para testes de implementação; a fidelidade visual não comprova comportamento real.

## 3. Preparação técnica

| ID | Entrega | Prioridade | Situação |
| --- | --- | --- | --- |
| BK-014 | Escolher framework, organização do backend e serviços de hospedagem. | P0 | A fazer |
| BK-015 | Preparar CI, testes, lint, checagem de tipos e critérios de qualidade. | P0 | A fazer |
| BK-019 | Escolher autenticação e implementar papéis, sessões e permissões. | P0 | A fazer |
| BK-020 | Preparar banco de dados, armazenamento de arquivos, migrações e dados de demonstração. | P1 | A fazer |
| BK-030 | Implementar a base visual desktop e componentes reutilizáveis. | P1 | A fazer |

As tecnologias anteriores — por exemplo, TypeScript, React, PostgreSQL e armazenamento de objetos — são alternativas de planejamento, **não uma arquitetura implementada**. As escolhas serão confirmadas antes de iniciar as dependências técnicas.

## 4. Entregas funcionais do MVP

| ID | Entrega | Prioridade | Estado | Dependências |
| --- | --- | --- | --- | --- |
| BK-021 | Implementar Início, cadastro, login, recuperação de senha e logout. | P1 | A fazer | BK-019, BK-020, BK-030 |
| BK-022 | Implementar Biblioteca com busca, quatro filtros e paginação. | P1 | A fazer | BK-004, BK-006, BK-020, BK-030 |
| BK-023 | Implementar detalhes, autoria e acesso autorizado aos arquivos. | P1 | A fazer | BK-006, BK-007, BK-019, BK-020 |
| BK-017 | Implementar favoritos, Salvos e busca na coleção. | P1 | A fazer | BK-021, BK-022, BK-023 |
| BK-024 | Implementar perfil pessoal, foto, senha, cargo/função e apresentação. | P1 | A fazer | BK-021 |
| BK-034 | Implementar perfis públicos dos autores e materiais publicados. | P1 | A fazer | BK-023, BK-024 |
| BK-016 | Implementar formulário de envio, validação e revisão editorial. | P1 | A fazer | BK-019, BK-020, BK-031 |
| BK-025 | Implementar Meus envios, situação editorial e orientações de recusa/ajuste. | P1 | A fazer | BK-016 |
| BK-033 | Implementar comentários, respostas, relatos e filtragem inline das contribuições. | P1 | A fazer | BK-021, BK-023 |
| BK-035 | Implementar denúncias e moderação restrita da comunidade. | P1 | A fazer | BK-019, BK-031, BK-033 |
| BK-036 | Implementar notificações de materiais, revisão e novidades, com leitura/não leitura. | P1 | Implementado no código; validação pendente | BK-019, BK-020, BK-016 |
| BK-018 | Implementar cópia do link e opções de compartilhamento da plataforma. | P2 | A fazer | BK-030 |
| BK-037 | Implementar formulário Fale conosco, estados de sucesso/erro e páginas institucionais. | P1 | Implementado no código; validação Supabase e revisão jurídica pendentes | BK-020, BK-030 |
| BK-026 | Tratar erros, estados vazios, carregamento, foco e acessibilidade nos fluxos. | P1 | A fazer | Todas as entregas funcionais |

### Regras relevantes à implementação

**Biblioteca (BK-022).** Seis tipos de material, inclusive **Jogo**; quatro filtros separados, incluindo **Abordagem**; uso de ícones de monitor/monitor riscado nos cartões; indicação coerente de EI, EF, EM e anos/séries; 12 materiais por página.

**Arquivos e envios (BK-023/BK-016).** Arquivos PDF, DOCX, PPTX, PNG ou JPG, até 20 MB por arquivo; classificação múltipla; confirmação de direitos; revisão antes da publicação.

**Comunidade (BK-033/BK-035).** Comentários textuais de até 1.000 caracteres, respostas em um nível, relatos de aplicação, denúncias autenticadas e moderação com registro de decisão. Denunciar não oculta automaticamente um comentário.

**Notificações (BK-036).** Eventos dos próprios materiais, novos recursos da Biblioteca e novidades da plataforma. Marcar como lida não deve apagar notificações.

**Salvos (BK-017).** Busca visível na página. As telas isoladas de filtros de Salvos não implicam implementação de controles atualmente ausentes do fluxo principal.

## 5. Verificação, responsividade e entrega

| ID | Entrega | Prioridade | Situação | Dependências |
| --- | --- | --- | --- | --- |
| BK-032 | Adaptar os fluxos para tablet e celular. | P1 | A fazer | BK-030 e telas funcionais |
| BK-027 | Executar testes funcionais, segurança, integração e acessibilidade. | P1 | A fazer | BK-015 e entregas implementadas |
| BK-013 | Realizar testes moderados de tarefas com professores e registrar achados. | P2 | A fazer | Protótipo ou versão funcional adequada |
| BK-028 | Preparar demonstração, dados permitidos e registro das entregas de portfólio. | P1 | A fazer | BK-027, BK-032 |

A avaliação de acessibilidade terá a **WCAG 2.2 AA** como referência. O plano de qualidade deve incluir fluxos protegidos, estados da comunidade, revisão editorial, moderação, falhas de upload e compatibilidade com navegadores atuais.

## 6. Evoluções fora do MVP

| ID | Tema | Prioridade | Situação |
| --- | --- | --- | --- |
| BK-029 | Avaliar melhorias com base no uso e nos testes. | P3 | Futuro |

Possibilidades: login social, importação por URL, editor de recursos, recomendações, coleções colaborativas ou recursos avançados de comunidade. Não há compromisso de desenvolvimento dessas ideias.

## 7. Ordem sugerida

1. **Fundação:** BK-014, BK-015, BK-019, BK-020 e BK-030.
2. **Acervo e conta:** BK-021, BK-022, BK-023, BK-017 e BK-024.
3. **Contribuição e participação:** BK-016, BK-025, BK-034 e BK-033.
4. **Governança e comunicação:** BK-035, BK-036, BK-037 e BK-018.
5. **Qualidade e entrega:** BK-026, BK-032, BK-027, BK-013 e BK-028.

A ordem é indicativa. O desenvolvimento das camadas de segurança e dos estados de erro deve ocorrer junto aos fluxos, não apenas no encerramento do projeto.

## 8. Pendências técnicas para destravar tarefas

- [ ] Definir autenticação, backend, papéis, armazenamento e regras de sessão.
- [ ] Fechar limites adicionais de campos, tags e upload múltiplo.
- [ ] Especificar ordenação padrão, busca e parâmetros da URL.
- [ ] Modelar estados de ajustes/reenvio, publicação/despublicação e justificativas.
- [ ] Definir defesa contra spam, retenção de denúncias e política de notificações.
- [ ] Estabelecer plano de testes, breakpoints e metas de desempenho.

## 9. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Especificação de metadados](especificacao-metadados.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
