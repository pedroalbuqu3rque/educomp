import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { HeroMaterials } from "@/components/hero-materials";
const benefits = [
 ["01", "Materiais para suas aulas", "Consulte planos de aula, atividades e apresentações para trabalhar diferentes conteúdos de Computação."],
 ["02", "Busca por tema e etapa", "Encontre materiais por tipo, etapa de ensino e eixo da BNCC Computação."],
 ["03", "Troca entre professores", "Compartilhe seus materiais, tire dúvidas e conte como as atividades funcionaram com sua turma."],
];
export default function Home() {
 return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader />
 <main id="conteudo">
  <section className="hero" aria-labelledby="hero-title"><div className="hero-copy">
   <h1 id="hero-title">Materiais para <span>ensinar Computação</span> na Educação Básica.</h1>
   <p className="hero-description">Explore planos de aula, atividades e outros recursos organizados por etapa de ensino, tema e eixos da BNCC Computação.</p>
   <div className="hero-actions"><Link href="/biblioteca" className="button button-primary">Acessar a biblioteca <span aria-hidden="true">→</span></Link><a href="#proposta" className="button button-outline">Saiba mais</a></div>
   <figure className="educator-quote"><blockquote>“Me movo como educador, porque, primeiro,<br className="desktop-break" /> me movo como gente.”</blockquote><figcaption>PAULO FREIRE</figcaption></figure>
  </div><HeroMaterials /></section>
  <section className="benefits content-width" aria-labelledby="benefits-title">
   <div className="eyebrow with-line">PARA O DIA A DIA DO PROFESSOR</div>
   <h2 id="benefits-title">O que você encontra no EduComp.</h2>
   <div className="benefit-grid">{benefits.map(([number,title,description])=><article key={number}><span className="benefit-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
  </section>
  <section id="proposta" className="proposal content-width" aria-labelledby="proposal-title"><div className="proposal-heading">
   <div className="eyebrow with-line">A PROPOSTA DO EDUCOMP</div>
   <h2 id="proposal-title">Um acervo construído com a participação de <span>professores</span>.</h2>
  </div><div className="proposal-copy"><p>O EduComp reúne materiais compartilhados por professores para apoiar o ensino de Computação. Cada recurso apresenta sua descrição, informações pedagógicas e identificação de quem o compartilhou.</p><p>Além de consultar os materiais, você pode participar das discussões, sugerir adaptações e conhecer experiências de quem já aplicou as atividades em sala de aula.</p></div></section>
  <section className="library-callout content-width" aria-labelledby="library-title"><div><h2 id="library-title">Explore a biblioteca.</h2><p>Encontre um material para sua próxima aula.</p></div><Link className="button button-primary" href="/biblioteca">Acessar a biblioteca <span aria-hidden="true">→</span></Link></section>
 </main><SiteFooter /></>;
}
