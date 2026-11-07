# EduComp — Handoff de UI/UX

**Versão:** 1.2  
**Atualizado em:** 07/11/2026  
**Situação:** referência para implementação; ajustes no Figma ainda necessários.

## 1. Referências

Este documento orienta a implementação das interfaces do EduComp a partir do Figma. Reúne as telas de referência, os comportamentos que precisam ser respeitados e as diferenças entre o protótipo e o MVP.

- [Protótipo desktop](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32520)
- [Identidade visual](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4418-15618)
- [Referências mobile e tablet](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-26978)
- [Design System](design-system.md)
- [Requisitos](../product/requisitos.md)
- [Escopo do MVP](../product/escopo-mvp.md)

O desenvolvimento começa pelas telas desktop de **1536 px**, sem fixar a aplicação nessa largura. Tablet e celular serão adaptados antes da conclusão do MVP.

Os códigos D01, D02 etc. identificam referências do Figma, **não** rotas ou componentes obrigatórios. As telas de estados representam variações de uma mesma interface, não páginas que precisam ser criadas separadamente.

## 2. O que implementar

A primeira versão terá acesso público ao **Início**, à **Biblioteca** e aos **detalhes dos materiais**. Para abrir arquivos, salvar favoritos, enviar materiais e acessar o perfil, será necessário entrar na conta. A revisão de submissões ficará em uma área restrita.

O Figma contém funcionalidades que não entram no MVP. A implementação não deve exibir ações sem funcionamento real, como login com Google, comentários, relatos de aplicação, denúncias, notificações ou compartilhamento por redes sociais.

Também ficam fora da primeira versão a busca e os filtros em **Salvos**, os links externos para materiais e a edição de submissões pelo próprio autor após o envio.

## 3. Estrutura visual

A interface deve seguir os estilos e ativos do [Design System](design-system.md), sem recriar valores diferentes em cada tela.

- **Fonte:** Inter.
- **Azul principal:** `#1761D8`.
- **Nome do logotipo:** `#313E55`.
- **Fundo do símbolo:** `#1761D8` sólido, sem gradiente.
- **Largura desktop de referência:** 1536 px.

Cabeçalho, navegação, rodapé, cartões, campos, botões e mensagens devem ser reutilizados onde tiverem a mesma função. O conteúdo deve crescer naturalmente, com rolagem vertical e adaptação a janelas menores. Textos, quantidades e imagens do Figma são exemplos visuais, não dados reais da aplicação.

## 4. Telas e comportamentos

### 4.1. Início — D01

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34332)

Preservar a hierarquia da apresentação, as chamadas para a Biblioteca e os caminhos para cadastro e login. Os exemplos de materiais usados na composição não precisam corresponder a registros reais, mas não devem ser apresentados como dados carregados do acervo quando forem apenas ilustrativos.

Visitantes podem abrir a Biblioteca sem autenticação. Os botões precisam ter destinos válidos.

### 4.2. Cadastro, login e recuperação — D02 a D04

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32521)

Usar os estados já desenhados para orientar campos, mensagens e confirmações: D02.1 (login inválido), D03.1 (validação de cadastro), D04.1 (solicitação de recuperação), D04.3 (senha redefinida) e D04.4 (link expirado).

O cadastro aceita e-mails pessoais ou institucionais. Após criar conta ou redefinir a senha, o usuário segue para o login. Se tiver chegado ao login por uma ação protegida, deve retomar essa ação; caso contrário, vai para a Biblioteca.

A verificação de e-mail, o prazo dos links e as regras de sessão seguirão a solução de autenticação escolhida. **O botão de login com Google não será implementado nem exibido como ação funcional.**

### 4.3. Biblioteca e filtros — D05 e D13

- [Biblioteca — D05](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32684)
- [Filtros — D13](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33638)

A Biblioteca lista apenas materiais aprovados **e publicados**. Deve funcionar para visitantes, com cartões alimentados pelos dados reais do acervo.

| Elemento | Comportamento para o MVP |
| --- | --- |
| Pesquisa | Buscar por título e palavras-chave ao pressionar Enter ou clicar em **Buscar**. |
| Filtros | Tipo de material, etapa de ensino e eixo da Computação; seleção múltipla. |
| Aplicar | Confirma as seleções da categoria e atualiza a consulta. |
| Limpar | Desmarca apenas a categoria aberta; os resultados mudam após **Aplicar**. |
| Fechar sem aplicar | Descarta as seleções temporárias. |
| Ordenação | Mais recentes por padrão, com alternativa alfabética por título. |
| Paginação | 12 materiais por página, com total de resultados. |
| Retorno dos detalhes | Preservar pesquisa, filtros, ordenação e página na URL. |

Dentro de uma categoria de filtro, as opções são combinadas por **OU**. Entre categorias, e entre filtros e texto pesquisado, vale **E**. Opções sem resultados continuam visíveis e selecionáveis.

Usar D05.1 para orientar a ausência de resultados, D05.F para a listagem filtrada e D13/D13.1/D13.2 para os filtros abertos. Prever também carregamento, erro e acervo vazio. Não confundir esses estados entre si.

As regras completas estão na [Especificação de busca e filtros](../product/especificacao-busca-filtros.md).

### 4.4. Detalhes do material — D06

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34035)

A página é pública e mostra título, descrição, palavras-chave, classificações, autoria ou fonte e outras informações cadastradas. Um material pode ter **vários tipos, etapas, eixos e arquivos**. Campos opcionais vazios não devem gerar textos de preenchimento.

Os arquivos devem aparecer individualmente. Ao tentar acessá-los sem login, o visitante é encaminhado à autenticação e depois retoma a ação. A autorização também precisa ser verificada pelo serviço responsável pelo arquivo.

Os estados D06.A01 e D06.A02 servem de referência para acesso e falha; D06.A03 e D06.A04, para salvar e remover favoritos. O estado de favorito deve ser consistente com a área Salvos.

Comentários, discussão, denúncias e relatos de aplicação (D06.S) e perfil público de autor (D06.P01) não integram o MVP. A identificação de autoria continua visível nos detalhes.

### 4.5. Salvos — D07

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32921)

A área mostra os favoritos da conta autenticada, permite removê-los e abrir seus detalhes. Usar D07 como referência da coleção e D07.1 para o estado vazio.

As variações de busca e filtros em Salvos (D07.2, D07.F e D13.S) **não serão implementadas no MVP**. Também não é necessário criar uma tela para cada variação de coleção representada no protótipo.

### 4.6. Enviar material e Meus envios — D08

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33078)

As duas áreas permanecem como **abas da mesma página**. O formulário precisa ser ajustado no Figma antes da implementação:

- Adicionar o campo obrigatório **Tema / palavras-chave**, com várias tags livres.
- Permitir selecionar **vários tipos de material, etapas e eixos**.
- Relacionar anos/séries às etapas selecionadas, exigindo o preenchimento para Ensino Fundamental ou Médio.
- Aceitar **vários arquivos** PDF, DOCX, PPTX, PNG ou JPG, de até **20 MB cada**.
- Identificar autoria ou fonte, pedir a declaração de direito de compartilhamento e oferecer objetivos de aprendizagem como campo opcional.

Os estados D08.1 (validação), D08.2 (confirmação), D08.4 (Meus envios), D08.6 (envio em andamento), D08.7 (falha), D08.8 (formato inválido) e D08.9 (arquivo acima do limite) continuam úteis. Precisam ser adaptados ao upload múltiplo, sem perder informações preenchidas após uma falha recuperável.

Depois de um envio concluído, mostrar a confirmação com atalho para **Meus envios**. A submissão começa como **Pendente**; não é publicada automaticamente. Em Meus envios, mostrar Pendente, Em análise, Aprovado ou Recusado, com justificativa quando houver recusa.

A variação **Ajustes solicitados** (D08.10) não será utilizada. Uma submissão enviada não pode ser editada pelo autor nesta versão; após uma recusa, será necessário um novo envio.

### 4.7. Revisão de materiais — interface a criar

A revisão faz parte do MVP, mas ainda **não possui telas definitivas no Figma**. A área restrita precisa de uma lista de submissões e uma visualização dos detalhes com as ações:

1. **Iniciar análise**, alterando explicitamente Pendente para Em análise.
2. **Aprovar**, permitindo a publicação do material.
3. **Recusar**, exigindo justificativa visível ao autor.

A interface deve permitir consultar os arquivos e as informações necessárias à avaliação. Somente contas autorizadas podem revisar; o papel será concedido manualmente.

Também é necessário prever como o responsável autorizado edita ou despublica materiais já aprovados. **Despublicar não altera a decisão editorial para Recusado.** Não é preciso criar um painel administrativo completo nem um histórico visual de todas as transições.

### 4.8. Meu perfil — D09

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33379)

Manter os estados de consulta, alteração de foto, troca de senha, confirmação e erro. O professor pode editar **nome, foto e senha**; o e-mail fica visível, mas não pode ser alterado no MVP.

Biografia, instituição e outros campos complementares do protótipo não devem ser apresentados como editáveis sem previsão funcional. A central e o contador de notificações também ficam fora da primeira versão.

### 4.9. Copiar link — D14

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33699)

A ação copia **o endereço da página inicial do EduComp**, não o link individual de um material. O rótulo precisa deixar isso claro, principalmente se a ação estiver próxima dos detalhes de um recurso. A interface deve informar sucesso ou falha na cópia.

Não implementar opções de compartilhamento direto por redes sociais.

### 4.10. Institucional — D10 a D12

[Referência no Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33488)

A demonstração pública terá **Termos de uso**, **Política de privacidade** e um meio simples de contato por e-mail. O formulário de contato e seus estados de envio (D10 a D10.3) não são necessários no MVP.

Os textos institucionais devem ser preparados para o funcionamento real da plataforma. O conteúdo ilustrativo do Figma não deve ser publicado como política definitiva.

## 5. Componentes e estados

Os componentes devem ser reutilizáveis, sem dados fixos retirados das telas de exemplo. A base inicial inclui:

- Cabeçalho, navegação e rodapé.
- Botões, links, campos, seletores e caixas de seleção.
- Cartões de material, tags e ícones de classificação.
- Pesquisa, filtros, paginação e abas.
- Modais, menus, mensagens de feedback e estados vazios.
- Seleção de vários arquivos, indicação de progresso e erros por arquivo.

Para os componentes aplicáveis, prever os estados **padrão, foco, carregamento, selecionado, erro, sucesso e desabilitado**. A interface só deve confirmar operações depois da resposta do sistema.

Menus, diálogos e filtros devem permitir fechamento por **Escape** quando aplicável, preservar a navegação por teclado e devolver o foco ao acionador. No caso dos filtros, fechar sem Aplicar não muda a consulta.

Se o material não tiver miniatura, o cartão deverá usar um ícone de seu tipo. Ainda falta definir a apresentação quando o mesmo material possuir vários tipos.

## 6. Acessibilidade e responsividade

O desenvolvimento deverá usar HTML semântico, rótulos de campos, foco visível, mensagens compreensíveis e contraste adequado. A **WCAG 2.2 AA** é a referência para os testes de acessibilidade, incluindo verificações manuais por teclado.

Os frames de 1536 px são o ponto de partida, não medidas fixas. Conferir a interface em larguras intermediárias, evitando sobreposição, corte de texto e rolagem horizontal desnecessária. Menus, cartões, filtros, formulários e abas precisarão ser adaptados às versões tablet e celular.

## 7. Antes de implementar as telas afetadas

- [ ] Atualizar D08 com palavras-chave, classificações múltiplas, anos/séries e upload de vários arquivos.
- [ ] Desenhar a área restrita de revisão e seus estados de aprovação, recusa e despublicação.
- [ ] Revisar D06 e os cartões para exibir múltiplos arquivos e classificações sem perder legibilidade.
- [ ] Retirar da interface funcional os controles fora do MVP, incluindo busca em Salvos, login com Google e notificações.
- [ ] Rever o rótulo e a posição da ação de copiar o link da página inicial.
- [ ] Definir o ícone de cartões com múltiplos tipos e conferir os estados de erro e carregamento.
- [ ] Adaptar e conferir os fluxos em tablet e celular.

As regras ainda pendentes — como quantidade máxima de arquivos, vínculo entre anos e etapas e detalhes de autenticação — devem ser fechadas nas especificações correspondentes antes da implementação de cada fluxo.

## 8. Verificação da interface

A versão desktop estará pronta para revisão quando as páginas do MVP respeitarem a identidade visual, usarem componentes consistentes e apresentarem os estados necessários. Também será preciso conferir navegação, formulários, filtros, favoritos, acesso a arquivos, envio e revisão com dados reais ou de teste apropriados.

A revisão visual do desktop **não equivale à conclusão do MVP**. Ainda serão necessários integrações, testes funcionais, acessibilidade, segurança e adaptação responsiva.

## 9. Documentos relacionados

- [Design System](design-system.md)
- [Arquitetura da Informação](arquitetura-da-informacao.md)
- [User Flow](user-flow.md)
- [Especificação de busca e filtros](../product/especificacao-busca-filtros.md)
- [Especificação de metadados](../product/especificacao-metadados.md)
- [Backlog](../product/backlog.md)
