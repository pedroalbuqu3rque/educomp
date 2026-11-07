# EduComp — Especificação Funcional de Metadados dos Materiais

**Versão:** 0.3  
**Data:** 07/11/2026  
**Módulo:** Materiais pedagógicos — cadastro, Biblioteca, detalhes e revisão  
**Situação:** especificação funcional em consolidação; decisões complementares pendentes.

## 1. Objetivo

Este documento define as informações utilizadas para identificar, classificar, pesquisar, apresentar e disponibilizar materiais pedagógicos no EduComp.

Também estabelece os dados necessários ao envio de contribuições, ao acompanhamento das submissões e à revisão realizada por um responsável autorizado.

A especificação orienta o comportamento esperado da aplicação, as validações e os critérios de aceitação relacionados aos materiais.

A estrutura definitiva do banco de dados, os contratos de API e os mecanismos de armazenamento serão definidos na preparação técnica do projeto.

### 1.1. Referências

- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)
- [Biblioteca desktop — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-32684)
- [Detalhes do material — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-34035)
- [Envio de material — Figma](https://www.figma.com/design/r8Lo2AKMd0UglgA8RRDl1y/EduComp?node-id=4437-33079)

## 2. Abrangência

Os metadados dos materiais são utilizados em quatro momentos principais.

| Contexto | Finalidade |
| --- | --- |
| **Envio** | Identificar o material, registrar suas informações pedagógicas e associar o recurso submetido. |
| **Revisão** | Disponibilizar informações para avaliação e registrar a situação da submissão. |
| **Biblioteca** | Permitir localizar e identificar materiais publicados por pesquisa e filtros. |
| **Detalhes** | Apresentar informações pedagógicas, autoria e formas de acesso ao recurso. |

Esses contextos compartilham informações, mas possuem necessidades e permissões diferentes.

O cadastro de uma submissão **não equivale à publicação** de um material. Somente recursos autorizados após a revisão podem integrar o acervo publicado.

### 2.1. Distinção entre material e submissão

Para fins funcionais, devem ser diferenciados:

- **Material pedagógico:** recurso educacional identificado por título, descrição, classificações e informações de acesso.
- **Submissão:** registro do envio realizado por um professor, associado a uma situação de revisão.
- **Recurso associado:** arquivo ou, caso admitido, endereço externo pelo qual o conteúdo pode ser acessado.

Essa separação é conceitual e não determina a criação de tabelas ou entidades independentes no banco de dados.

A estrutura técnica poderá representar essas informações de outra maneira, desde que preserve suas relações, permissões e regras de publicação.

### 2.2. Limites do MVP

A primeira versão contempla o envio de materiais para revisão, a publicação controlada dos recursos aprovados e a consulta aos metadados na Biblioteca e na página de detalhes.

Não estão incluídos como compromissos funcionais:

- Edição colaborativa de materiais.
- Versionamento avançado dos recursos.
- Avaliações e comentários da comunidade.
- Relatos de aplicação associados aos materiais.
- Recomendações automáticas.
- Criação ou adaptação de conteúdos diretamente na plataforma.

A existência de referências visuais para essas funcionalidades no Figma não altera o escopo do MVP.

## 3. Informações do material

### 3.1. Campos centrais

| Campo | Finalidade | Origem e condição funcional |
| --- | --- | --- |
| **Identificador** | Distinguir o registro dos demais materiais. | Gerado pelo sistema; deve ser único. |
| **Título** | Identificar o recurso na Biblioteca, na pesquisa e nos detalhes. | Informado no cadastro; validação de preenchimento a confirmar. |
| **Descrição** | Explicar o conteúdo e a finalidade pedagógica do recurso. | Informada no cadastro; obrigatoriedade e limite a confirmar. |
| **Tipo de material** | Classificar o recurso para apresentação e filtragem. | Seleção conforme a taxonomia definida. |
| **Etapa de ensino** | Indicar o público educacional ao qual o recurso se destina. | Seleção conforme a taxonomia definida. |
| **Eixo da Computação** | Relacionar o conteúdo à classificação de Computação. | Seleção conforme a taxonomia definida. |
| **Tema** | Permitir pesquisa por assunto, além do título. | Representação pesquisável obrigatória para a funcionalidade; formato de cadastro pendente. |
| **Ano escolar** | Complementar a identificação do público educacional. | Campo apresentado como opcional no protótipo; regras a confirmar. |
| **Responsável pelo envio** | Identificar a conta que realizou a submissão. | Associado pelo sistema ao usuário autenticado. |
| **Data de envio** | Registrar o momento da submissão. | Gerada pelo sistema após conclusão do envio. |
| **Situação de revisão** | Indicar o estágio de avaliação do material. | Controlada pelo fluxo de revisão. |
| **Recurso associado** | Permitir acesso ao conteúdo pedagógico. | O fluxo inicial prevê upload de arquivo; regras de acesso a definir. |

Nem todos esses campos devem ser preenchidos manualmente pelo professor.

Identificadores, vínculo com a conta, datas operacionais e situações de revisão são informações controladas pela aplicação.

A obrigatoriedade definitiva dos campos editáveis deverá ser registrada antes da implementação do formulário de envio.

### 3.2. Metadados complementares

As informações abaixo poderão enriquecer a descrição pedagógica dos materiais:

| Campo | Aplicação possível | Situação |
| --- | --- | --- |
| Resumo breve | Apresentação condensada em cartões. | Avaliar necessidade em relação à descrição. |
| Objetivos de aprendizagem | Explicar os resultados pedagógicos esperados. | Aparece no protótipo; estrutura a confirmar. |
| Orientações de uso | Apoiar a aplicação do material em sala de aula. | Opcional, sujeito a definição. |
| Componente curricular | Relacionar o material a disciplinas ou áreas. | Não definido para o MVP. |
| Habilidades da BNCC | Identificar habilidades relacionadas ao recurso. | Representação e obrigatoriedade pendentes. |
| Ano ou série | Detalhar a etapa de ensino. | Referência visual existente; regras a confirmar. |
| Autor ou fonte | Identificar a origem do conteúdo. | Forma de registro pendente. |
| Licença ou condições de uso | Informar permissões de utilização e redistribuição. | Regras pendentes. |
| Referência de origem | Registrar endereço ou fonte original do material. | Inclusão a confirmar. |

Esses campos não devem ser considerados obrigatórios apenas por constarem desta tabela.

A adoção de habilidades da BNCC também não implica integração automática com um catálogo externo. Caso sejam incluídas, deverá ser definida sua representação: texto livre, códigos padronizados ou outra estrutura.

### 3.3. Obrigatoriedade dos dados

O formulário precisa identificar quais informações são indispensáveis para registrar uma submissão válida.

A definição deverá considerar:

- Os campos necessários para identificar e apresentar o recurso.
- As classificações utilizadas nos filtros.
- O conteúdo necessário à pesquisa textual.
- As informações exigidas para a revisão.
- A identificação do arquivo submetido.
- As informações necessárias ao uso e à disponibilização do material.

A obrigatoriedade não deve ser estabelecida exclusivamente pela presença visual de um campo no Figma.

Campos opcionais ausentes não devem ser substituídos por valores fictícios durante a apresentação.

## 4. Taxonomias de classificação

As taxonomias definem os valores utilizados para classificar os materiais, compor os filtros e apresentar informações consistentes ao usuário.

### 4.1. Tipo de material

| Valor | Identificação |
| --- | --- |
| Plano de aula | Material de planejamento de uma atividade ou aula. |
| Slides | Apresentação utilizada como recurso didático. |
| Material de apoio | Conteúdo complementar para ensino ou aprendizagem. |
| Atividade | Proposta de exercício ou prática pedagógica. |
| Sequência didática | Conjunto articulado de atividades ou aulas. |

### 4.2. Etapa de ensino

- Educação Infantil.
- Ensino Fundamental — Anos iniciais.
- Ensino Fundamental — Anos finais.
- Ensino Médio.

Essas categorias representam a taxonomia inicial da Biblioteca.

Elas não determinam automaticamente a classificação por ano ou série, nem contemplam todas as modalidades educacionais.

A inclusão de EJA, modalidades adicionais ou subdivisões deverá ser objeto de decisão específica.

### 4.3. Eixo da Computação

- Pensamento Computacional.
- Mundo Digital.
- Cultura Digital.

Esses valores devem ser utilizados de forma consistente no formulário, na Biblioteca, nos detalhes e nos filtros.

### 4.4. Regras de classificação

1. As classificações devem utilizar os valores definidos para a categoria correspondente.
2. O cadastro e a consulta devem compartilhar a mesma interpretação dos valores.
3. Um material publicado deve ser recuperável pelo filtro correspondente às suas classificações, respeitando os demais critérios aplicados.
4. Alterações na taxonomia não devem deixar registros existentes sem tratamento definido.
5. A interface não deve inventar classificações quando os dados estiverem ausentes.
6. Materiais incompletos devem ser tratados conforme as regras de validação e revisão.

### 4.5. Cardinalidade das classificações

Ainda é necessário definir se cada material poderá possuir:

- Um ou vários tipos.
- Uma ou várias etapas.
- Um ou vários eixos da Computação.

Essa decisão interfere na estrutura de cadastro, na apresentação das informações e no funcionamento dos filtros.

A **seleção múltipla realizada pelo usuário da Biblioteca** não determina, por si só, que cada material tenha múltiplas classificações.

As duas situações devem ser especificadas separadamente.

O comportamento dos filtros permanece definido na [Especificação de busca e filtros](especificacao-busca-filtros.md).

## 5. Tema e pesquisa textual

O MVP prevê pesquisa por **título e tema**.

O título já possui representação clara no formulário e nas telas de consulta. O tema, entretanto, ainda precisa de uma definição que permita seu cadastro e sua utilização efetiva nas consultas.

### 5.1. Requisitos do campo tema

A solução adotada deverá permitir:

- Associar um ou mais assuntos ao material, conforme a cardinalidade definida.
- Recuperar os assuntos cadastrados durante a pesquisa.
- Preservar a associação entre tema e material.
- Utilizar o tema em conjunto com o título na busca textual.
- Evitar que conteúdos sem tema recebam informações presumidas ou fictícias.

### 5.2. Representação

As alternativas a avaliar são:

- Um campo textual único.
- Uma lista de palavras-chave ou assuntos.
- Uma estrutura de temas padronizados.
- Outra representação adequada à taxonomia do projeto.

A escolha deverá considerar a facilidade de preenchimento pelo professor, a consistência das informações e a necessidade de pesquisa.

**Pendente:** confirmar formato, obrigatoriedade, cardinalidade, validação e possibilidade de edição.

### 5.3. Correspondência com o protótipo

O formulário desktop de envio apresenta título, descrição, tipo, etapa, ano escolar, eixo e arquivo, mas não identifica claramente um campo próprio para tema.

Como a pesquisa por tema integra o MVP, essa diferença precisa ser resolvida antes da conclusão do fluxo de cadastro.

As alternativas são ajustar o formulário para receber o tema ou definir outra origem explícita e verificável para essa informação.

O tema não deve ser gerado automaticamente a partir da descrição ou do eixo da Computação sem uma regra funcional aprovada.

### 5.4. Integração com a Biblioteca

Os temas cadastrados deverão ser considerados pela pesquisa de acordo com as regras de correspondência estabelecidas.

O tratamento de acentos, palavras parciais, múltiplos termos, relevância e ordenação pertence à [Especificação de busca e filtros](especificacao-busca-filtros.md).

Somente materiais publicados e permitidos devem participar dos resultados da Biblioteca.

## 6. Autoria, fonte e direitos de uso

### 6.1. Responsável pelo envio

O responsável pelo envio é o usuário autenticado que registrou a submissão.

Essa informação deve ser vinculada pelo sistema e utilizada para:

- Identificar a origem da contribuição.
- Disponibilizar o acompanhamento ao autor da submissão.
- Aplicar as permissões de consulta e alteração.
- Apoiar o processo de revisão.

O vínculo não deve depender de um identificador informado manualmente pelo professor.

### 6.2. Autor ou fonte do conteúdo

O autor do conteúdo pedagógico pode não ser a mesma pessoa que realizou o envio.

É necessário distinguir:

- **Responsável pelo envio:** usuário que submeteu o recurso.
- **Autor:** pessoa ou organização a quem o conteúdo é atribuído.
- **Fonte:** origem de onde o material foi obtido ou disponibilizado.

Essas informações podem coincidir, mas não devem ser presumidas como equivalentes.

**Pendente:** definir os campos utilizados para autoria, fonte e créditos, incluindo sua obrigatoriedade e apresentação pública.

### 6.3. Licença e condições de uso

A plataforma deverá estabelecer quais informações ou declarações são necessárias para receber e publicar materiais.

Entre os pontos a definir estão:

- Declaração de autorização para envio.
- Identificação de autoria e créditos.
- Condições de uso e redistribuição.
- Tratamento de materiais pertencentes a terceiros.
- Responsabilidade pela verificação dessas informações durante a revisão.

A existência de um arquivo enviado não comprova automaticamente a autorização para sua publicação.

Essas regras devem ser estabelecidas antes da disponibilização pública dos materiais.

## 7. Arquivos e formas de acesso

### 7.1. Arquivo enviado

O envio de materiais previsto para o MVP contempla a associação de um arquivo à submissão.

Cada arquivo aceito deverá manter informações suficientes para permitir sua identificação, validação, armazenamento e acesso controlado.

Os dados técnicos poderão incluir:

- Nome original do arquivo.
- Formato e tipo de conteúdo.
- Tamanho.
- Referência interna de armazenamento.
- Identificador da submissão ou material associado.
- Informações necessárias à verificação e disponibilização.

A estrutura exata desses dados será definida na arquitetura técnica.

### 7.2. Validação do arquivo

Antes de confirmar uma submissão, a aplicação deve verificar as condições estabelecidas para o upload.

As validações deverão contemplar, conforme as regras aprovadas:

- Presença do arquivo exigido.
- Formato permitido.
- Tamanho máximo.
- Quantidade de arquivos.
- Integridade da transferência.
- Verificações de segurança necessárias.
- Associação ao registro correto.

A validação apresentada na interface não substitui a verificação realizada pelos serviços da aplicação.

Uma falha de upload não deve resultar em uma submissão apresentada como concluída.

### 7.3. Formatos e limites em avaliação

Existem referências diferentes na documentação e no protótipo.

| Referência | Formatos mencionados | Limite apresentado |
| --- | --- | --- |
| Especificação funcional anterior | PDF, DOCX, PPTX, PNG e JPG | 50 MB por arquivo, em avaliação |
| Protótipo desktop | PDF, PPTX, DOCX e imagens | 20 MB |

**Nenhum desses limites está confirmado como regra definitiva do MVP.**

Antes da implementação do upload, será necessário decidir:

- Formatos efetivamente aceitos.
- Tamanho máximo por arquivo.
- Quantidade de arquivos por material.
- Tratamento de arquivos inválidos ou corrompidos.
- Requisitos de armazenamento e segurança.

Depois da decisão, a mesma regra deverá ser aplicada ao frontend, aos serviços e à documentação.

### 7.4. Links externos

A possibilidade de associar um endereço externo ao material ainda depende de decisão funcional.

Caso seja adotada, o sistema deverá:

- Validar o formato do endereço cadastrado.
- Associar o link ao material correspondente.
- Identificar claramente a abertura de um recurso externo.
- Não apresentar links inexistentes como formas de acesso.
- Respeitar as permissões necessárias para disponibilizar a referência.

Também é necessário definir se um material poderá possuir:

- Apenas arquivo.
- Apenas link.
- Arquivo e link simultaneamente.
- Múltiplos arquivos ou endereços.

O envio exclusivamente por link não está definido como alternativa ao upload previsto para a submissão inicial.

A presença de um endereço válido não garante que o conteúdo externo esteja disponível no momento do acesso.

### 7.5. Disponibilidade e acesso

A página de detalhes deve apresentar somente as formas de acesso efetivamente associadas ao material e permitidas ao usuário.

Quando um recurso estiver indisponível, a interface deve informar a situação sem apresentar uma ação que não possa ser executada.

A indisponibilidade de um arquivo não equivale automaticamente à exclusão do registro do material.

As regras para recursos removidos, links indisponíveis e materiais com acesso restrito ainda precisam ser definidas.

As permissões devem ser aplicadas também no serviço responsável pela entrega do arquivo, e não apenas na interface.

## 8. Submissão e revisão

### 8.1. Dados da submissão

Cada contribuição deve preservar informações suficientes para identificar:

- O material submetido.
- O usuário responsável pelo envio.
- A data de submissão.
- O arquivo associado.
- Os metadados apresentados para avaliação.
- A situação atual da revisão.

Outras informações, como data de decisão, responsável pela análise e justificativa, poderão ser necessárias conforme o processo de moderação definido.

### 8.2. Situações de revisão

Os estados previstos para detalhamento são:

| Estado | Significado |
| --- | --- |
| **Pendente** | Submissão recebida e aguardando avaliação. |
| **Em análise** | Material em processo de revisão por responsável autorizado. |
| **Aprovado** | Material autorizado para publicação. |
| **Recusado** | Material não aprovado para publicação. |

Esses estados são a referência atual, mas ainda precisam de confirmação quanto às transições e aos comportamentos associados.

O protótipo também apresenta situações como **Ajustes solicitados**. Essa condição não deve ser incorporada ao processo funcional sem decisão específica sobre reenvio e revisão.

### 8.3. Regras de revisão

1. Toda submissão deve possuir uma situação identificável após o envio concluído.
2. A criação da submissão não deve publicar automaticamente o material.
3. Somente um responsável autorizado pode aprovar ou recusar materiais.
4. A situação registrada deve ser persistida.
5. O autor deve conseguir consultar a situação dos próprios envios.
6. Materiais pendentes, em análise ou recusados não devem aparecer como recursos publicados.
7. A aprovação deve respeitar as validações necessárias para a disponibilização do material.
8. Falhas durante uma decisão de revisão não devem ser apresentadas como operações concluídas.

### 8.4. Publicação

A aprovação deve permitir a disponibilização do material na Biblioteca, conforme as regras de publicação definidas.

Os metadados publicados precisam corresponder aos dados aprovados, incluindo classificações, autoria e formas de acesso.

A alteração posterior desses dados, assim como a eventual retirada de publicação, depende de regras específicas.

**Pendente:** definir quem poderá editar materiais aprovados, se alterações exigirão nova revisão e como serão tratados recursos retirados do acervo.

### 8.5. Interface de moderação

O fluxo de revisão faz parte do MVP, mas a interface utilizada pelo responsável autorizado ainda precisa ser especificada.

A interface mínima deverá permitir:

- Consultar submissões que necessitam de avaliação.
- Identificar o material e seu responsável pelo envio.
- Consultar os metadados necessários à análise.
- Acessar o recurso submetido, conforme as permissões.
- Registrar aprovação ou recusa.
- Visualizar o resultado da decisão ou uma falha de operação.

A forma de registrar justificativas, solicitar ajustes e realizar novas avaliações permanece pendente.

Não é necessário prever um painel administrativo avançado para atender a esse fluxo inicial.

## 9. Utilização dos metadados na interface

As mesmas informações devem ser apresentadas de maneira apropriada a cada contexto.

### 9.1. Biblioteca

Os cartões devem apresentar os dados necessários para identificar o material antes da abertura dos detalhes.

A composição do protótipo utiliza principalmente título, descrição resumida, tipo e classificações pedagógicas.

Esses campos devem refletir os dados cadastrados, sem fixar conteúdos ilustrativos no componente.

A presença de miniaturas ou imagens deve seguir a disponibilidade real dos recursos e o padrão visual definido.

### 9.2. Detalhes do material

A página de detalhes reúne informações mais completas.

Deve permitir identificar:

- O material consultado.
- Sua descrição e finalidade.
- As classificações pedagógicas.
- Objetivos e informações complementares, quando disponíveis.
- A autoria ou fonte cadastrada.
- As opções de acesso permitidas.

Campos opcionais ausentes devem receber tratamento adequado, sem apresentar informações inventadas.

### 9.3. Envio de material

O formulário deve utilizar as mesmas classificações adotadas na Biblioteca.

As informações informadas pelo professor deverão ser preservadas até a conclusão do envio, conforme as condições de validação.

O cadastro precisa fornecer os dados indispensáveis à pesquisa e à revisão, incluindo uma solução definida para o campo tema.

### 9.4. Meus envios

O acompanhamento deve exibir os dados necessários para que o professor reconheça sua submissão e compreenda a situação registrada.

A apresentação não deve confundir material enviado com material aprovado ou publicado.

O conteúdo e as ações disponíveis dependerão das permissões e do estado da submissão.

## 10. Validações funcionais

O cadastro e o tratamento dos materiais deverão atender às seguintes condições.

| Área | Validação esperada |
| --- | --- |
| Identificação | Cada registro deve possuir identificador único. |
| Dados informados | Campos definidos como obrigatórios devem ser validados. |
| Classificações | Valores devem pertencer às taxonomias aprovadas. |
| Tema | O dado pesquisável deve ser registrado conforme sua estrutura definida. |
| Responsável | A submissão deve estar vinculada ao usuário que realizou o envio. |
| Arquivo | Upload deve respeitar formato, tamanho, quantidade e verificações de segurança adotadas. |
| Consistência | O recurso deve permanecer associado ao material ou à submissão correspondente. |
| Revisão | Alterações de situação devem respeitar permissões e transições autorizadas. |
| Publicação | Materiais não aprovados não devem aparecer como publicados. |
| Acesso | Apenas recursos existentes e autorizados devem ser disponibilizados. |
| Apresentação | Dados opcionais ausentes não devem gerar conteúdo fictício. |
| Feedback | Falhas de validação, upload e revisão devem ser informadas sem confirmar operações malsucedidas. |

A validação dos dados deve ocorrer nos serviços responsáveis pelas operações.

As mensagens e os estados da interface devem seguir o Design System e o handoff, refletindo o resultado real das validações.

### 10.1. Integridade dos dados

A implementação precisa preservar a consistência entre material, submissão, arquivo e situação editorial.

Uma operação concluída não deve resultar em registros contraditórios, como:

- Material publicado sem aprovação.
- Submissão atribuída ao usuário incorreto.
- Arquivo associado ao material errado.
- Classificação fora da taxonomia adotada.
- Situação alterada por usuário sem permissão.

A solução técnica para garantir essa integridade será definida na arquitetura do sistema.

## 11. Cenários de aceitação

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| **CA-MD-01** | Concluir uma submissão válida. | O registro possui identificação, responsável pelo envio, data e situação registrada. |
| **CA-MD-02** | Informar uma classificação prevista na taxonomia. | O valor pode ser armazenado e apresentado de forma consistente. |
| **CA-MD-03** | Filtrar a Biblioteca por uma classificação. | Materiais publicados correspondentes são elegíveis aos resultados, respeitando os demais critérios. |
| **CA-MD-04** | Pesquisar pelo título de um material publicado. | O campo título participa da pesquisa conforme as regras estabelecidas. |
| **CA-MD-05** | Pesquisar por tema. | O tema cadastrado participa da consulta conforme sua representação e as regras definidas. |
| **CA-MD-06** | Consultar material sem metadado complementar. | A interface não apresenta dados fictícios nem falha por ausência do campo opcional. |
| **CA-MD-07** | Enviar arquivo inválido. | A submissão não é confirmada e apresenta orientação adequada. |
| **CA-MD-08** | Concluir o envio de material válido. | A submissão é registrada sem publicação automática. |
| **CA-MD-09** | Aprovar submissão com permissão adequada. | A situação é atualizada e a publicação segue as regras definidas. |
| **CA-MD-10** | Tentar aprovar ou recusar sem autorização. | A operação é impedida sem alterar a situação do registro. |
| **CA-MD-11** | Consultar os envios de um professor. | O usuário visualiza suas submissões sem acesso indevido às de outras contas. |
| **CA-MD-12** | Consultar material sem recurso acessível. | A interface informa a indisponibilidade e não apresenta ação de acesso inexistente. |
| **CA-MD-13** | Consultar autoria de um material enviado por terceiro. | O sistema diferencia o responsável pela submissão da autoria cadastrada, quando houver. |
| **CA-MD-14** | Recusar uma submissão. | O material não aparece na Biblioteca publicada e sua situação permanece registrada. |
| **CA-MD-15** | Tentar acessar diretamente um arquivo sem permissão. | O serviço impede o acesso, independentemente da apresentação da interface. |

Os cenários condicionados a decisões pendentes deverão receber dados e condições definitivas antes da execução dos testes.

A aceitação depende da verificação do comportamento funcional e da integridade dos dados, não apenas da correspondência visual com o protótipo.

## 12. Decisões pendentes

| Tema | Definição necessária | Backlog |
| --- | --- | --- |
| Campos obrigatórios | Confirmar informações exigidas no cadastro e diferenciar descrição, resumo e tema. | BK-006 |
| Tema | Definir representação, obrigatoriedade, cardinalidade e forma de preenchimento. | BK-006 |
| Classificações | Permitir um ou múltiplos valores por material em cada categoria. | BK-006 |
| Ano e modalidades | Definir tratamento de ano/série, EJA e modalidades adicionais. | BK-006 |
| Informações complementares | Confirmar objetivos, componentes curriculares, habilidades da BNCC e orientações de uso. | BK-006 |
| Autoria e direitos | Definir campos de autor, fonte, licença e autorização de publicação. | BK-006 / BK-016 |
| Upload | Confirmar formatos, tamanho máximo, quantidade de arquivos e verificações de segurança. | BK-006 / BK-016 |
| Links externos | Definir sua inclusão, validação, cardinalidade e coexistência com arquivos. | BK-007 |
| Disponibilidade | Definir tratamento de arquivos removidos, links indisponíveis e materiais restritos. | BK-007 / BK-023 |
| Moderação | Definir papéis, critérios, estados, transições, justificativas e reenvio. | BK-016 / BK-031 |
| Publicação | Definir edição posterior, nova revisão e retirada de materiais publicados. | BK-016 / BK-031 |
| Estrutura técnica | Definir modelos de dados, relacionamentos, armazenamento e contratos de API. | BK-014 / BK-020 |

Essas decisões deverão ser refletidas nos requisitos, nas especificações relacionadas e na implementação.

Os valores preliminares apresentados no Figma ou em documentos anteriores não devem ser tratados como regras aprovadas sem registro explícito.

## 13. Rastreabilidade e documentos relacionados

| Artefato | Referências |
| --- | --- |
| Requisitos funcionais | RF-001, RF-002, RF-004, RF-006, RF-008, RF-009, RF-011, RF-014 e RF-019 |
| Regras de negócio | RN-001, RN-004, RN-005 e RN-006 |
| Histórias de usuário | US-001 a US-004, US-006, US-007, US-009, US-012 e US-013 |
| Backlog — metadados | BK-006 |
| Backlog — acesso aos recursos | BK-007 |
| Backlog — envio e revisão | BK-016 e BK-031 |
| Backlog — Biblioteca | BK-022 |
| Backlog — detalhes | BK-023 |
| Backlog — acompanhamento | BK-025 |

**Documentos relacionados**

- [Product Brief](product-brief.md)
- [Escopo do MVP](escopo-mvp.md)
- [Requisitos](requisitos.md)
- [Histórias de usuário](historias-de-usuario.md)
- [Backlog](backlog.md)
- [Especificação de busca e filtros](especificacao-busca-filtros.md)
- [Arquitetura da Informação](../ux-ui/arquitetura-da-informacao.md)
- [User Flow](../ux-ui/user-flow.md)
- [Design System](../ux-ui/design-system.md)
- [Handoff de UI/UX](../ux-ui/handoff.md)

---

Esta especificação deverá ser atualizada quando forem definidas as regras de cadastro, classificação, arquivos e publicação.

As decisões devem manter a consistência entre as informações fornecidas pelos professores, os dados utilizados na pesquisa, os conteúdos apresentados na Biblioteca e as condições de revisão e acesso aos materiais.
