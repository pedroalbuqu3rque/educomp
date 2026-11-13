# Início e navegação

A página inicial do EduComp apresenta a proposta da plataforma, cinco cartões ilustrativos de tipos de materiais, três benefícios e uma chamada para a Biblioteca. A composição acompanha a identidade do protótipo, com azul `#1761D8`, tipografia Inter e fundo claro.

## Arquivos

- `src/app/page.tsx`: conteúdo, seções e navegação da página inicial.
- `src/components/hero-materials.tsx`: cartões ilustrativos do cabeçalho.
- `public/brand/hero-glow.svg`: fundo radial atrás dos cartões.
- `src/components/site-shell.tsx`: cabeçalho e rodapé da página inicial.
- `src/app/globals.css`: tokens, estilos globais e responsividade da página.

A marca leva ao Início. O botão principal abre `/biblioteca`; **Saiba mais** leva à seção de proposta. A Biblioteca tem cabeçalho próprio com acessos a Salvos, envio, conta e, para revisores autorizados, Revisão.

Os cartões da página inicial são uma composição editorial e não substituem os registros consultados no Supabase. A Biblioteca usa dados retornados pelas funções SQL, e cada card possui sua página de detalhes.

## Revisão visual

Manter o degradê atrás dos cartões, sem corte abrupto nas bordas. Priorizar espaçamento, contraste e leitura em vez de ilustrações genéricas. Em telas menores, o conteúdo deve passar para uma coluna, preservando ordem de leitura, foco por teclado e navegação.

Os fluxos completos de autenticação, Biblioteca e envio estão descritos nos guias técnicos específicos. O [plano de QA](../qa/plano-de-testes.md) cobre a validação integrada.
