# EduComp — Especificação Funcional de Metadados dos Materiais

**Versão:** 0.2  
**Data:** 04/11/2026  
**Módulo:** Materiais pedagógicos — cadastro, Biblioteca, detalhes e revisão  
**Situação:** Especificação funcional em consolidação; decisões complementares pendentes.

## 1. Objetivo

Definir os dados utilizados para identificar, classificar, localizar, apresentar e disponibilizar materiais pedagógicos no EduComp, além das informações necessárias ao envio e à revisão das contribuições feitas pelos professores.

A especificação descreve as informações que a plataforma deve representar e as validações funcionais esperadas. A estrutura do banco de dados, as tecnologias de armazenamento e os contratos de API serão definidos na preparação técnica.

## 2. Abrangência

Os metadados dos materiais atendem a quatro situações principais:

- **Envio:** o professor informa os dados do recurso e associa um arquivo para submetê-lo à revisão.
- **Revisão:** um responsável autorizado consulta a submissão e registra uma decisão.
- **Biblioteca:** os materiais aprovados são encontrados por pesquisa e filtros.
- **Detalhes:** o usuário consulta a descrição, as classificações e as formas de acesso disponíveis.

O cadastro de uma submissão **não equivale à publicação** de um material. A plataforma deve manter essa distinção nos dados e nas consultas.

## 3. Informações do material

### 3.1. Campos centrais

| Campo | Finalidade | Condição funcional |
|---|---|---|
| **Identificador** | Distinguir cada registro de material. | Gerado pelo sistema e único. |
| **Título** | Identificar o recurso na Biblioteca, nos detalhes e na pesquisa. | Previsto no cadastro; validação de preenchimento a confirmar. |
| **Descrição** | Explicar o conteúdo e a finalidade do recurso. | Deve poder ser registrada e apresentada; obrigatoriedade e tamanho a definir. |
| **Tipo de material** | Classificar o recurso para apresentação e filtragem. | Deve utilizar a taxonomia definida na seção 4. |
| **Etapa de ensino** | Identificar o público educacional a que o recurso se destina. | Deve utilizar a taxonomia definida na seção 4. |
| **Eixo da Computação** | Relacionar o recurso à classificação temática de Computação. | Deve utilizar a taxonomia definida na seção 4. |
| **Tema** | Permitir a pesquisa por assunto, além do título. | Deve ter representação pesquisável; formato, cardinalidade e obrigatoriedade pendentes. |
| **Responsável pelo envio** | Relacionar a submissão à conta que a realizou. | Associado pelo sistema ao usuário autenticado que enviou o material. |
| **Data do envio** | Registrar quando a contribuição foi submetida. | Registrada pelo sistema após envio concluído. |
| **Situação de revisão** | Distinguir submissões em processamento, aprovadas e recusadas. | Controlada pelo fluxo de revisão; estados propostos na seção 7. |
| **Recurso associado** | Disponibilizar o conteúdo pedagógico enviado. | O fluxo de submissão prevê upload de arquivo; formatos e limites ainda serão definidos. |

A presença de um campo no modelo de informações **não define, por si só, que o professor deva preenchê-lo manualmente**. Identificadores, vínculo com a conta, data de envio e situação de revisão são informações controladas pelo sistema.

A lista definitiva de campos obrigatórios do formulário deverá ser confirmada antes da implementação do envio de materiais.

### 3.2. Autoria e fonte

É necessário distinguir:

- **Responsável pelo envio:** usuário da plataforma que realizou a submissão.
- **Autor ou fonte do conteúdo:** pessoa, organização ou origem a que o material é atribuído.

Essas informações podem coincidir, mas não devem ser presumidas como equivalentes. A forma de registrar autoria, fonte, créditos e condições de uso está pendente de definição.

### 3.3. Informações complementares

Os seguintes campos são possibilidades de enriquecimento dos materiais e deverão ser avaliados quanto à inclusão na primeira versão:

- Resumo breve, caso seja necessário diferenciá-lo da descrição.
- Orientações de uso e aplicação pedagógica.
- Componente ou componentes curriculares relacionados.
- Habilidades da BNCC.
- Ano, série ou subdivisão da etapa de ensino.
- Licença e condições de uso ou redistribuição.
- Referência de origem do material, quando diferente do arquivo disponibilizado.

Esses campos **não são declarados obrigatórios nesta versão**. Se habilidades da BNCC forem incluídas, deve-se decidir se serão registradas como texto livre ou por uma estrutura padronizada; nenhuma integração com catálogo externo está definida.

## 4. Taxonomias de classificação

Os valores abaixo correspondem às categorias de classificação utilizadas na Biblioteca e nos detalhes do material.

### 4.1. Tipo de material

1. Plano de aula
2. Slides
3. Material de apoio
4. Atividade
5. Sequência didática

### 4.2. Etapa de ensino

1. Educação Infantil
2. Ensino Fundamental — Anos iniciais
3. Ensino Fundamental — Anos finais
4. Ensino Médio

### 4.3. Eixo da Computação

1. Pensamento Computacional
2. Mundo Digital
3. Cultura Digital

### 4.4. Regras de classificação

- Os valores apresentados nos formulários, cartões, detalhes e filtros devem ser consistentes entre si.
- Um material classificado em determinada categoria deve ser recuperável pelo filtro correspondente quando estiver publicado e atender aos demais critérios da consulta.
- Nenhuma classificação ausente deve ser inventada pela interface; o comportamento de registros incompletos precisa ser tratado como exceção.
- A possibilidade de associar **mais de um tipo, etapa ou eixo ao mesmo material** permanece pendente. Se adotada, cada associação deve ser preservada individualmente para a aplicação correta dos filtros.
- As etapas acima não detalham automaticamente ano ou série. A inclusão de subdivisões, EJA ou outras modalidades requer decisão específica sobre cadastro e apresentação.

O funcionamento da seleção múltipla **pelo usuário da Biblioteca**, bem como a combinação lógica das opções, está definido na especificação de busca e filtros. Isso não deve ser confundido com a quantidade de classificações permitidas **por material**.

## 5. Tema e pesquisa textual

A Biblioteca deve permitir pesquisa por **título e tema**. Para isso:

- O título cadastrado deve estar disponível à funcionalidade de pesquisa.
- O assunto identificado como tema precisa possuir uma representação consistente nos dados do material.
- Os temas devem corresponder ao conteúdo informado no cadastro, sem serem deduzidos automaticamente pela interface.
- A ausência de tema não deve produzir informação fictícia nos detalhes.

**Pendente:** definir se tema será um campo textual, uma lista de termos ou outra estrutura; se aceitará vários valores; se será obrigatório; e como será preenchido no formulário. Normalização, correspondência textual e ordenação pertencem à especificação de busca e filtros.

## 6. Arquivos e formas de acesso

### 6.1. Arquivo enviado

O fluxo de contribuição prevê que o professor associe um arquivo à submissão. Cada arquivo aceito deverá manter informações suficientes para identificação, validação e acesso controlado, incluindo sua referência de armazenamento e características necessárias ao tratamento de upload.

A plataforma deve:

- Validar o arquivo antes de confirmar o envio.
- Informar progresso, sucesso ou falha da operação.
- Associar o arquivo à submissão correta.
- Impedir que o acesso a um recurso inexistente ou sem autorização seja apresentado como disponível.
- Evitar publicar automaticamente o material após o recebimento do arquivo.

**Pendente:** definir formatos aceitos, tamanho máximo, quantidade de arquivos por material, verificação do conteúdo, tratamento de arquivos inválidos e regras de armazenamento. Como parâmetros em avaliação, existem os formatos **PDF, DOCX, PPTX, PNG e JPG** e o limite de **50 MB por arquivo**; esses parâmetros não estão confirmados como regras definitivas da primeira versão.

### 6.2. Links externos

A possibilidade de cadastrar links externos como forma de acesso ainda precisa ser confirmada. Caso seja adotada:

- O endereço deve ser validado antes de ser disponibilizado.
- A interface deve distinguir acesso a arquivo hospedado de abertura de fonte externa.
- Links inexistentes ou não cadastrados não devem gerar controles de acesso.
- A existência de um link não deve ser tratada como comprovação automática de que o conteúdo externo está disponível.

Também depende de decisão se um material poderá conter **arquivo e link simultaneamente**, múltiplos arquivos ou múltiplos links. O envio de material apenas por link não está definido como alternativa ao upload previsto para a submissão.

### 6.3. Disponibilidade do recurso

A tela de detalhes deve apresentar somente as formas de acesso efetivamente cadastradas e permitidas. Quando não houver recurso acessível, deve informar a indisponibilidade, sem confundir essa situação com exclusão do material da Biblioteca.

As restrições de acesso devem ser respeitadas tanto na interface quanto no serviço que entrega o arquivo ou a referência do recurso.

## 7. Informações de submissão e revisão

Cada contribuição deve preservar a relação entre o material, o usuário que o enviou, a data de submissão e sua situação de revisão.

Os estados previstos para detalhamento são:

| Estado proposto | Significado funcional |
|---|---|
| **Pendente** | Submissão recebida e aguardando análise. |
| **Em análise** | Submissão em avaliação por responsável autorizado. |
| **Aprovado** | Submissão autorizada para publicação. |
| **Recusado** | Submissão não aprovada para publicação. |

**Regras:**

- Uma submissão não deve aparecer como material publicado antes da aprovação.
- Somente um responsável autorizado pode aprovar ou recusar materiais.
- O professor deve poder consultar a situação dos próprios envios.
- Uma alteração de situação deve persistir e refletir-se na consulta pertinente.
- Materiais não aprovados não devem aparecer entre os itens publicados da Biblioteca.

**Pendente:** confirmar a lista final de estados, situação inicial, transições permitidas, registro de justificativas, possibilidade de reenvio e informações de auditoria das decisões.

## 8. Validações funcionais

O cadastro, a submissão e a publicação devem considerar as seguintes condições:

1. **Identificação:** cada material deve possuir um identificador que permita diferenciá-lo dos demais.
2. **Consistência:** os valores de tipo, etapa e eixo devem pertencer às taxonomias adotadas.
3. **Vínculo do envio:** uma submissão concluída deve estar associada ao usuário responsável e à data correspondente.
4. **Arquivo:** o envio deve ser concluído somente depois das validações previstas para o arquivo.
5. **Publicação:** receber um arquivo ou salvar metadados não deve publicar o material.
6. **Permissões:** alterações de situação e operações protegidas devem exigir autorização apropriada.
7. **Apresentação:** campos opcionais ausentes não devem ser exibidos como dados inventados.
8. **Acesso:** apenas recursos existentes e permitidos devem produzir ações de acesso.
9. **Feedback:** campos inválidos, falhas no upload e operações malsucedidas devem gerar orientação compreensível.

A obrigatoriedade exata dos campos de entrada, os limites de texto e as validações condicionais serão estabelecidos antes da implementação do formulário.

## 9. Cenários de aceitação

| ID | Cenário | Resultado esperado |
|---|---|---|
| **CA-MD-01** | Registrar uma submissão concluída. | O material recebe identificação, vínculo com o responsável pelo envio, data e situação registrada. |
| **CA-MD-02** | Informar uma classificação prevista na taxonomia. | O valor pode ser representado de maneira consistente no cadastro e nos detalhes. |
| **CA-MD-03** | Consultar a Biblioteca usando um filtro de classificação. | Materiais publicados com a classificação correspondente são elegíveis ao resultado, respeitando os demais critérios. |
| **CA-MD-04** | Pesquisar pelo título de um material publicado. | O título é considerado pela pesquisa segundo as regras definidas. |
| **CA-MD-05** | Pesquisar por tema após sua estrutura ser definida. | O tema cadastrado participa da pesquisa segundo as regras definidas. |
| **CA-MD-06** | Consultar um material sem metadado complementar. | A ausência do campo não produz conteúdo inventado nem erro de apresentação. |
| **CA-MD-07** | Enviar um arquivo inválido para as regras adotadas. | O envio não é confirmado como concluído e apresenta feedback adequado. |
| **CA-MD-08** | Concluir o envio de um material válido. | A submissão é registrada, mas não aparece automaticamente na Biblioteca publicada. |
| **CA-MD-09** | Aprovar uma submissão com autorização adequada. | A situação é atualizada e a publicação segue as regras definidas. |
| **CA-MD-10** | Tentar aprovar ou recusar sem permissão. | A operação é impedida, sem alterar a situação registrada. |
| **CA-MD-11** | Consultar os envios de um professor. | O usuário visualiza a situação das próprias submissões, sem acesso indevido às de outra conta. |
| **CA-MD-12** | Consultar detalhes de material sem recurso disponível. | A interface informa a indisponibilidade e não apresenta uma ação de acesso inexistente. |

Os cenários condicionados a decisões abertas — especialmente tema, upload, classificações múltiplas e transições de revisão — deverão receber dados e condições definitivas antes da execução dos testes.

## 10. Decisões pendentes

| Tema | Definição necessária |
|---|---|
| **Campos obrigatórios** | Confirmar os campos exigidos no formulário e diferenciar descrição, resumo e tema. |
| **Tema** | Formato, obrigatoriedade, quantidade de valores e forma de preenchimento. |
| **Classificações** | Permitir uma ou várias opções por material em tipo, etapa e eixo. |
| **Etapas detalhadas** | Definir tratamento de ano/série, EJA e modalidades não representadas nos filtros iniciais. |
| **Dados complementares** | Confirmar autoria/fonte, componentes curriculares, BNCC, orientações e licença. |
| **Arquivos** | Formatos aceitos, tamanho máximo, quantidade de arquivos, validação e segurança. |
| **Links externos** | Confirmar inclusão na primeira versão, cardinalidade e coexistência com arquivos. |
| **Direitos de uso** | Definir informações e declarações necessárias para submissão e publicação. |
| **Revisão** | Definir papéis, estados finais, transições, justificativas e reenvio. |
| **Publicação e acesso** | Definir o que ocorre com recursos removidos, indisponíveis ou com acesso restrito. |

As definições devem ser incorporadas antes da implementação dos fluxos que delas dependam, sem apresentar hipóteses ou parâmetros preliminares como decisões já aprovadas.

## 11. Rastreabilidade e documentos relacionados

- **Requisitos:** RF-001, RF-002, RF-004, RF-006, RF-008, RF-009, RF-011, RF-014 e RF-019; RN-001, RN-004, RN-005 e RN-006, em [`requisitos.md`](requisitos.md).
- **Histórias de usuário:** US-001 a US-004, US-006, US-007, US-009, US-012 e US-013, em [`historias-de-usuario.md`](historias-de-usuario.md).
- **Backlog:** BK-006 (metadados), BK-007 (acesso), BK-016 (envio e revisão), BK-022 (Biblioteca), BK-023 (detalhes) e BK-025 (situação dos envios), em [`backlog.md`](backlog.md).
- **Pesquisa e filtros:** [`especificacao-busca-filtros.md`](especificacao-busca-filtros.md).
- **Escopo da primeira versão:** [`escopo-mvp.md`](escopo-mvp.md).
- **Fluxos de navegação:** [`../ux-ui/user-flow.md`](../ux-ui/user-flow.md).
