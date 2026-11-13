# Revisão geral — 13/11/2026

**Versão de referência:** EduComp 0.2
**Etapa:** consolidação do produto, código, interface e documentação; homologação de QA ainda pendente.

## Escopo

Revisão da cópia integral do projeto entregue nesta data, sem modificar os dados do Supabase e sem substituir a identidade visual aprovada no Figma. O objetivo foi melhorar a organização e a consistência de elementos que já existem, não ampliar o MVP.

## Alterações

### Interface

- Uniformizados estados de foco, bordas e transições de botões, campos e filtros, sem alterar a cor principal `#1761D8` nem a hierarquia dos conteúdos.
- Consolidadas regras de CSS repetidas da Biblioteca; mantidos cartões com descrição em até duas linhas e indicador de favorito preenchido quando salvo.
- Padronizada a apresentação da página completa de Notificações para acompanhar o cabeçalho e o fundo claro das demais páginas da aplicação.
- Refinados sombras e contornos de diálogos e elementos de apoio, preservando o contraste e os estados de carregamento e erro.
- Respeitada a preferência por um layout limpo, com menos ornamentação e sem rótulos de protótipo na interface.

### Código e arquivos

- Reorganizados componentes centrais do cabeçalho, rodapé, seção inicial e Notificações para facilitar leitura e manutenção, sem alterar seu contrato público.
- Folhas de estilo reformatadas em regras legíveis, permitindo identificar e reduzir duplicações.
- Removida uma imagem de ícone repetida, reutilizando o arquivo já existente na Biblioteca.
- Mantidas as rotas, funções do Supabase e migrations originais, para não introduzir mudanças de esquema silenciosas.
- Conservados todos os PDFs do acervo e suas fichas, inclusive os anexos provisórios.

### Documentação

- Atualizados README, escopo, requisitos, backlog, histórias de usuário, fluxos e documentação técnica.
- Corrigidas referências a funcionalidades antigas ou removidas, incluindo o compartilhamento no rodapé e a caracterização do acervo como mera demonstração do Figma.
- Separados claramente *implementado em código* e *homologado em ambiente real*.
- Movidas instruções manuais antigas de cadastro de material para `docs/archive`, evitando confundi-las com o procedimento de publicação vigente.

## Verificações efetuadas nesta revisão

| Verificação | Resultado |
| --- | --- |
| Leitura sintática dos arquivos TypeScript/TSX (90 arquivos) | Sem falhas de sintaxe no parser |
| Parse das folhas de estilo (10 arquivos) | Sem falhas no PostCSS |
| Imports locais dos arquivos TypeScript/TSX | Nenhum caminho faltante identificado |
| Consistência `package.json` / `package-lock.json` | Dependências declaradas coerentes |
| Links internos dos documentos Markdown (77 referências) | Nenhum caminho inexistente encontrado |
| Catálogo institucional | 24 fichas; 24 vínculos de arquivos encontrados |
| Anexos | 4 PDFs próprios, 20 fichas com PDF provisório |
| Prévia estática de Biblioteca e Notificações | Revisada em larguras desktop e celular, sem rolagem horizontal observada |

As prévias são composições estáticas com CSS real: não equivalem a uma execução completa do Next.js. A conferência de imports é estática e não equivale a compilação ou análise semântica completa do TypeScript.

### Limite da execução local

**Não foi possível reinstalar todas as dependências neste ambiente**: a instalação via npm não terminou, e não havia pacotes suficientes no cache local. Por isso, nesta entrega, **não foram concluídos** `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:checks` nem `npm run build`. Não há alegação de aprovação desses comandos nesta revisão. As verificações aprovadas em etapas anteriores se referem a uma versão anterior às mudanças desta entrega.

## Pendências deliberadas

- Verificar no Supabase real quais migrations `013`, `014` e `015` foram efetivamente aplicadas; não reexecutar migrations sem checar o histórico.
- Cadastrar uma conta com papel de revisor em ambiente autorizado e testar as ações com conta comum e revisor.
- Substituir os 20 anexos provisórios à medida que os materiais definitivos estiverem disponíveis.
- Revisar juridicamente Termos de uso e Política de privacidade.
- Realizar QA funcional, testes de navegação e acessibilidade com evidências, antes de publicação.
- Acompanhar alertas de segurança de dependências de desenvolvimento e reavaliar atualizações compatíveis.

## Validação no computador

Com Node.js 24 e o `.env.local` preservado fora do ZIP:

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run test:checks
npm.cmd run build
npm.cmd run dev
```

Se algum comando falhar, corrigir e executar novamente a sequência antes de publicar. Comparar visualmente Biblioteca, Início e Notificações em desktop e celular, e posteriormente seguir o roteiro de `docs/qa/plano-de-testes.md` para os fluxos do Supabase.

## Integridade do pacote

Esta entrega **não contém** `.git`, `.env.local`, `.next`, `node_modules` ou caches. Preserve `.git` e `.env.local` na pasta de trabalho original e faça backup antes de substituir arquivos. O pacote inclui o código-fonte completo, arquivos públicos, PDFs, testes, migrations e documentação.
