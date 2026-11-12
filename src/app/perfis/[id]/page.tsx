import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { LibraryHeader } from "@/components/library/library-header";
import {ProfileAvatar} from "@/components/profile/profile-avatar";
import { loadPublicProfile, labels } from "@/lib/materials/load";
import "@/app/biblioteca/library.css";
import "@/components/material/material.css";
export const metadata = { title: "Perfil público | EduComp" };
export default async function ProfilePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string; material?: string }> }) {
 const { id } = await params;
 const query = await searchParams;
 const requested = Number(query.page ?? 1);
 const page = Number.isSafeInteger(requested) && requested > 0 && requested <= 100000 ? requested : 1;
 const data = await loadPublicProfile(id, page);
 if (!data.profile && !data.error) notFound();
 const profile = data.profile;
 const returnId = z.uuid().safeParse(query.material);
 const href = (next: number) => `/perfis/${id}?page=${next}${returnId.success ? `&material=${returnId.data}` : ""}`;
 if (data.profile && !data.error && page > Math.max(1, Math.ceil(data.total / 12)))
  redirect(href(Math.max(1, Math.ceil(data.total / 12))));
 return <div className="material-page"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><LibraryHeader /><main className="material-container public-profile" id="conteudo">
 <Link className="material-back" href={returnId.success ? `/materiais/${returnId.data}` : "/biblioteca"}>‹ {returnId.success ? "Voltar ao material" : "Voltar à Biblioteca"}</Link>
 <p className="eyebrow">Perfil público do professor</p>
 {data.error && <div className="material-content" role="alert"><p>{data.error}</p><Link href={href(page)} className="button button-outline">Tentar novamente</Link></div>}
 {profile && <><section className="public-profile-card"><div className="public-profile-heading"><ProfileAvatar name={profile.display_name} path={profile.avatar_path} className="profile-initials"/><div><h1>{profile.display_name}</h1>{profile.occupation && <p>{profile.occupation}</p>}</div></div><p className="public-profile-bio">{profile.bio || "Este professor ainda não adicionou uma apresentação."}</p></section>
 <section className="public-materials"><h2>Materiais compartilhados</h2><p>Materiais aprovados e publicados deste professor no EduComp.</p>{!data.error && (data.materials.length ? data.materials.map(material => <article key={material.id}><div><div className="material-tags">{labels(material, "type").map(type => <span key={type}>{type}</span>)}</div><h3><Link href={`/materiais/${material.id}`}>{material.title}</Link></h3><p>{[...labels(material, "stage"), ...labels(material, "grade")].join(" · ")}</p></div><Link className="button button-outline" href={`/materiais/${material.id}`}>Ver material</Link></article>) : <p className="public-profile-card">{page > 1 ? "Não há materiais nesta página." : "Este professor ainda não possui materiais publicados."}</p>)}
 {(data.total > 12 || page > 1) && <nav className="profile-pagination" aria-label="Paginação dos materiais">{page > 1 && <Link href={href(page - 1)}>Anterior</Link>}<span>Página {page}</span>{page * 12 < data.total && <Link href={href(page + 1)}>Próxima</Link>}</nav>}</section>
 <p className="public-profile-note">Este perfil exibe nome, apresentação e materiais publicados. E-mail e dados privados não são exibidos.</p></>}
 </main></div>;
}
