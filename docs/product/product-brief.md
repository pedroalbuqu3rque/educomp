
# EduComp — Product Brief

**Versão:** 1.0 · **Atualizado em:** 07/11/2026 · **Situação:** proposta e escopo do MVP definidos; desenvolvimento não iniciado.

## 1. Visão geral

O EduComp é uma plataforma para professores da Educação Básica encontrarem materiais de Computação, avaliarem sua adequação às aulas e compartilharem práticas. O acervo reúne recursos classificados pedagogicamente, enquanto as discussões permitem registrar dúvidas, sugestões e experiências de aplicação.

Professores podem contribuir com novos materiais. Essas submissões passam por revisão antes de entrar na Biblioteca; as discussões também estão sujeitas à moderação. O EduComp não substitui o julgamento pedagógico do professor nem garante, por si só, a qualidade de uma aula.

## 2. Problema e hipótese

Encontrar recursos adequados ao ensino de Computação pode exigir consultar fontes dispersas, comparar classificações e descobrir, por tentativa, como uma atividade funciona em sala. A proposta é aproximar **descoberta, contexto pedagógico e experiência de outros docentes** em um mesmo ambiente.

A hipótese é que pesquisa orientada por metadados, distinção entre atividades plugadas e desplugadas e relatos de aplicação reduzam o esforço de seleção dos recursos. **A hipótese ainda não foi validada com professores**; não há dados de uso ou resultados de pesquisa que sustentem ganhos mensuráveis neste momento.

## 3. Pessoas envolvidas

- **Visitante:** conhece a plataforma e consulta a Biblioteca, os detalhes dos materiais e as informações públicas dos autores.
- **Professor autenticado:** acessa arquivos, salva materiais, atualiza o perfil, participa das discussões e envia contribuições para revisão.
- **Revisor autorizado:** avalia submissões e denúncias, aprova ou recusa materiais e modera conteúdos da comunidade.

O público central é o professor da Educação Básica. O papel de revisor atende à operação segura do acervo e não é atribuído automaticamente a quem se cadastra.

## 4. Proposta de valor

O produto se apoia em quatro frentes:

1. **Encontrar:** Biblioteca pública com busca, filtros pedagógicos e cartões que informam tipo, etapa, ano/série e abordagem plugada/desplugada.
2. **Compreender:** páginas de detalhes com descrição, eixo da Computação, objetivos, autoria e arquivos vinculados.
3. **Trocar:** perfis públicos, comentários, respostas e relatos de aplicação ligados aos materiais, com denúncia e moderação.
4. **Compartilhar com responsabilidade:** envio de materiais, declaração de direitos, revisão editorial e acompanhamento do resultado.

A experiência é complementada por favoritos, notificações sobre materiais e novidades, perfil do professor, canal de contato e compartilhamento da plataforma.

## 5. Experiência do MVP

A primeira versão contempla cadastro, login e recuperação de senha; Biblioteca com **seis tipos de material** e filtros por tipo, etapa, eixo e abordagem; detalhes e acesso autorizado a arquivos; Salvos; envio, acompanhamento e revisão; comunidade básica; perfis públicos; moderação de denúncias; notificações; formulário de contato; páginas institucionais e compartilhamento do EduComp.

A comunidade ficará limitada a publicações textuais, respostas em um nível e relatos de aplicação, sem anexos nas conversas ou mensagens privadas. As denúncias exigem identificação da conta e análise de um responsável; não removem conteúdo automaticamente.

A implementação começará pelo desktop e deverá ser adaptada para tablet e celular. **O MVP só estará concluído com fluxos funcionais, dados persistentes, permissões verificadas e testes**, não com a reprodução visual das telas.

## 6. Limites

Não fazem parte da primeira entrega login por provedores externos, importação de materiais por URL, editor de materiais dentro da plataforma, curtidas, conversas privadas, respostas em múltiplos níveis, denúncias anônimas ou recomendações automatizadas. Evoluções devem ser justificadas por necessidades observadas, não pela quantidade de recursos possíveis.

As regras de armazenamento, validade da autenticação, limites de campos e detalhes operacionais ainda serão fechados durante a preparação técnica. O [Escopo do MVP](escopo-mvp.md) diferencia essas definições de novas funcionalidades.

## 7. Princípios da experiência

- **Utilidade pedagógica:** tornar visíveis as informações que ajudam o professor a decidir.
- **Clareza e previsibilidade:** explicar filtros, acesso, status e resultados das ações.
- **Confiança:** preservar autoria, direitos, privacidade e rastreabilidade das decisões de revisão e moderação.
- **Participação respeitosa:** incentivar trocas úteis sem expor estudantes ou permitir conteúdo abusivo.
- **Acessibilidade:** manter navegação por teclado, foco, contraste e leitura apropriados em diferentes telas.

## 8. Validação e situação

Estão previstos testes moderados de tarefas com professores, observando busca e filtros, compreensão dos detalhes, uso de Salvos, participação na comunidade e envio de materiais. A segurança e as permissões exigem testes técnicos específicos.

A identidade visual e o protótipo desktop estão consolidados. **A aplicação não foi desenvolvida e não ocorreram testes com usuários reais.** Os resultados serão documentados somente após a execução dos testes.

## 9. Documentos relacionados

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Objetivos de UX](../ux-ui/objetivos-de-ux.md)
