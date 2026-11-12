import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ContactForm } from "@/components/institutional/contact-form";
import { LegalContent } from "@/components/institutional/legal-content";
import "@/components/institutional/institutional.css";

const sections = {
  termos: { title: "Termos de uso", description: "Condições para o compartilhamento de recursos pedagógicos." },
  privacidade: { title: "Privacidade", description: "Informações sobre o tratamento de dados no EduComp." },
  contato: { title: "Fale conosco", description: "Envie dúvidas, sugestões e solicitações." },
} as const;
type SectionKey = keyof typeof sections;
const isSectionKey = (section: string): section is SectionKey => Object.hasOwn(sections, section);

export function generateStaticParams() { return Object.keys(sections).map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSectionKey(section)) return { title: "Página não encontrada | EduComp" };
  return { title: `${sections[section].title} | EduComp`, description: sections[section].description };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSectionKey(section)) notFound();
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader />
    {section === "contato" ? <main className="institutional-main institutional-contact" id="conteudo">
      <div className="institutional-heading institutional-heading-center"><p className="institutional-eyebrow">CONTATO</p><h1>Fale conosco</h1><p>Dúvidas, sugestões ou problemas com a plataforma? Conte para a gente.</p></div>
      <ContactForm /><p className="contact-extra-link">Quer conhecer os materiais? <Link href="/biblioteca">Explore a Biblioteca</Link>.</p>
    </main> : <LegalContent kind={section}/>}
    <SiteFooter />
  </>;
}
