import Link from "next/link";
import { notFound } from "next/navigation";
import { LibraryHeader } from "@/components/library/library-header";
import { loadCatalogExample } from "@/lib/library/example-detail";
import { getCatalogEditorial } from "@/lib/library/catalog-resources";
import { ExampleAccessPanel } from "./example-access-panel";
import { CommunityPanel } from "@/components/community/community-panel";
import { loadCommunity } from "@/lib/community/load";
import type { CommunityFilter } from "@/lib/community/types";

export async function ExampleMaterialPage({
  id, filter, page,
}: {
  id: string;
  filter: CommunityFilter;
  page: number;
}) {
  const data = await loadCatalogExample(id);
  if (!data.example && !data.error) notFound();
  const material = data.example;
  const editorial = material ? getCatalogEditorial(material.id) : null;
  const community = material ? await loadCommunity(id, filter, page, "catalog") : null;

  return (
    <div className="material-page catalog-detail">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <LibraryHeader />
      <main id="conteudo" className="material-container">
        <nav aria-label="Navegação de retorno" className="catalog-breadcrumb">
          <Link href="/biblioteca">Biblioteca</Link>
          <span aria-hidden="true">/</span>
          <span>Detalhes do material</span>
        </nav>

        {data.error ? (
          <section className="material-content" role="alert">
            <h1>Não foi possível abrir o material</h1>
            <p>{data.error}</p>
            <Link className="button button-primary" href="/biblioteca">Voltar à Biblioteca</Link>
          </section>
        ) : material && editorial && (
          <div className="material-columns">
            <article className="material-content">
              <header className="catalog-hero">
                <p className="catalog-eyebrow">Acervo EduComp</p>
                <div className="material-tags">
                  {material.type.map(type => <span key={type}>{type}</span>)}
                </div>
                <h1>{material.title}</h1>
                <p className="catalog-summary">{material.description}</p>
                <div className="catalog-contributor">
                  <span className="catalog-contributor-avatar" aria-hidden="true">PA</span>
                  <div><span>Enviado por</span><strong>Pedro Albuquerque</strong></div>
                </div>
              </header>

              <section className="catalog-section" aria-labelledby="catalog-information">
                <h2 id="catalog-information">Informações pedagógicas</h2>
                <dl className="catalog-facts">
                  <div><dt>Etapa de ensino</dt><dd>{material.stage.join(" · ")}</dd></div>
                  <div><dt>Ano escolar</dt><dd>{material.year}</dd></div>
                  <div><dt>Eixo da Computação</dt><dd>{material.axis.join(" · ")}</dd></div>
                  <div><dt>Abordagem</dt><dd>{material.approach.join(" e ")}</dd></div>
                  {editorial.duration && <div><dt>Tempo sugerido</dt><dd>{editorial.duration}</dd></div>}
                  <div><dt>Organização</dt><dd>EduComp</dd></div>
                </dl>
              </section>

              <section className="catalog-section" aria-labelledby="catalog-objectives">
                <h2 id="catalog-objectives">Objetivo de aprendizagem</h2>
                <p>{material.objectives}</p>
              </section>

              {editorial.contents && (
                <section className="catalog-section" aria-labelledby="catalog-contents">
                  <h2 id="catalog-contents">O que você encontra no arquivo</h2>
                  <ul className="catalog-contents-list">
                    {editorial.contents.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}

              {editorial.application && (
                <section className="catalog-section" aria-labelledby="catalog-application">
                  <h2 id="catalog-application">Orientações para aplicação</h2>
                  <p>{editorial.application}</p>
                </section>
              )}

              <section className="catalog-section" aria-labelledby="catalog-subjects">
                <h2 id="catalog-subjects">Temas relacionados</h2>
                <div className="material-tags catalog-keywords">
                  {material.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}
                </div>
              </section>

              {community && <CommunityPanel materialId={id} source="catalog" data={community} filter={filter} />}
            </article>
            <ExampleAccessPanel
              id={material.id}
              title={material.title}
              signedIn={data.signedIn}
              saved={data.saved}
              savedError={data.savedError}
            />
          </div>
        )}
      </main>
    </div>
  );
}
