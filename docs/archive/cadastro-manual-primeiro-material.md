# Histórico — cadastro manual do primeiro material

> Registro de implantação inicial. Não faz parte do fluxo atual de envio pela plataforma e não deve ser executado novamente em banco com dados existentes.

Use um arquivo seu ou que você tenha autorização para distribuir. O cadastro desta etapa é feito por você, administrador do projeto, no Supabase. O formulário de envio pelos professores será implementado depois.

## 1. Enviar o arquivo

1. No painel do Supabase, abra Storage.
2. Entre no bucket `materials`, criado pela migration 002. Mantenha o bucket privado.
3. Envie um arquivo PDF, DOCX, PPTX, PNG ou JPG de até 20 MB.
4. Para o primeiro teste, use um nome simples, por exemplo `minha-aula.pdf`, e envie na raiz do bucket.
5. Anote o caminho exato: `minha-aula.pdf`. Se usar uma pasta, inclua-a: `aulas/minha-aula.pdf`.

Enviar o arquivo ao Storage não publica o material por si só.

## 2. Preencher o cadastro

No VS Code, abra `supabase/admin/cadastrar-primeiro-material.sql`.

Preencha apenas os valores da seção inicial, entre `declare` e `administrador_id uuid`. Mantenha as aspas simples e o ponto e vírgula.

| Campo | O que preencher |
|---|---|
| administrador_email | E-mail da conta que você criou e confirmou no EduComp |
| titulo | Título real do material |
| descricao | Explicação do conteúdo e de como usar |
| autoria | Nome de quem criou o conteúdo |
| palavras_chave | Termos entre aspas, separados por vírgulas: `array['algoritmos','lógica']` |
| objetivos | O que o estudante deverá aprender |
| tipo | Uma opção da lista abaixo |
| etapa | Uma opção da lista abaixo |
| eixo | Uma opção da lista abaixo |
| ano | O ano escolar correspondente |
| abordagem | `plugged`, `unplugged` ou `both` |
| caminho_arquivo | Caminho anotado no Storage, sem URL e sem o prefixo materials/ |
| direitos_confirmados | Troque `false` por `true` se tem autorização de distribuição |
| revisado_e_aprovado | Troque `false` por `true` após conferir o arquivo e os dados |

Se um texto contiver apóstrofo, escreva-o duas vezes dentro da string SQL: `'Texto d''exemplo'`. Nunca cole senhas ou chaves no script.

Tipos: Plano de aula; Slides; Material de apoio; Atividade; Sequência didática; Jogo.

Etapas: Educação Infantil; Ensino Fundamental — Anos iniciais; Ensino Fundamental — Anos finais; Ensino Médio.

Eixos: Pensamento Computacional; Mundo Digital; Cultura Digital.

Anos: Educação Infantil; 1º ano até 9º ano; 1ª série do Ensino Médio; 2ª série do Ensino Médio; 3ª série do Ensino Médio.

Escolha etapa e ano coerentes. Para o primeiro cadastro, o roteiro aceita uma opção de cada categoria; o banco e a biblioteca aceitam várias classificações por material.

## 3. Publicar

1. Copie o script preenchido inteiro.
2. Abra SQL Editor no Supabase e crie uma nova consulta.
3. Cole e execute com Run.
4. Se aparecer erro, nenhuma parte do cadastro será gravada: corrija o campo indicado e tente novamente. O arquivo enviado ao Storage permanece lá.
5. Atualize http://localhost:3000/biblioteca.

O script é uma operação administrativa: registra sua conta como responsável, associa o arquivo e as classificações, publica o material e registra a aprovação/publicação no histórico. Não concede papel de revisor à sua conta. Executar novamente com o mesmo caminho de arquivo é bloqueado para evitar duplicação.

A aplicação não recebe uma chave administrativa. O cadastro via script utiliza as permissões do próprio SQL Editor; não exponha esse acesso a visitantes ou professores.

## 4. Conferir

- Veja o título e abra a prévia: os dados devem ser os que você preencheu.
- Pesquise uma palavra do título sem acento; depois teste Tipo, Etapa, Eixo e Abordagem.
- Entre na conta e baixe o arquivo. Confira se corresponde ao que enviou.
- Saia da conta: a prévia continua acessível, mas o download pede login.

Se os arquivos não carregarem, confira o caminho, o bucket privado e se a migration 002 foi aplicada. O script verifica os metadados do Storage; a revisão do conteúdo e dos direitos é responsabilidade do administrador. Ele não executa antivírus.
