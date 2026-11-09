import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
const sections: Record<string, { title: string; description: string }> = {
 termos: { title: "Termos de uso", description: "Os termos de uso serão disponibilizados antes da abertura da plataforma." },
 privacidade: { title: "Privacidade", description: "A política de privacidade será disponibilizada antes da abertura do cadastro." },
 contato: { title: "Fale conosco", description: "O canal de contato ainda está em preparação." },
};
export function generateStaticParams() { return Object.keys(sections).map(section=>({section})); }
export async function generateMetadata({ params }: { params: Promise<{section:string}> }) {
 const {section}=await params; return { title: `${sections[section]?.title ?? "Página não encontrada"} | EduComp`, robots: { index: false } };
}
export default async function SectionPage({ params }: { params: Promise<{section:string}> }) {
 const {section}=await params;
 if (!Object.hasOwn(sections,section)) notFound();
 const content=sections[section];
 return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader /><main className="coming-soon content-width" id="conteudo"><p className="eyebrow">EM PREPARAÇÃO</p><h1>{content.title}</h1><p>{content.description}</p><Link href="/" className="button button-primary">Voltar ao início</Link></main><SiteFooter /></>;
}
