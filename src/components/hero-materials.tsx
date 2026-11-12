/* eslint-disable @next/next/no-img-element */
const examples = [
 { kind: "JOGO", title: <>Desafio<br />dos algoritmos</>, year: "Ensino Fundamental · 5º ano", className: "game" },
 { kind: "SLIDES", title: <>Internet das<br />Coisas (IoT)</>, year: "Ensino Fundamental · 9º ano", className: "slides" },
 { kind: "ATIVIDADE", title: <>O que fazer para se proteger dos perigos na internet?</>, year: "Ensino Fundamental · 8º ano", className: "activity" },
 { kind: "PLANO DE AULA", title: <>Como os algoritmos são usados no nosso dia a dia?</>, year: "Ensino Fundamental · 4º ano", className: "lesson" },
 { kind: "SEQUÊNCIA DIDÁTICA", title: <>Criação de jogos<br />digitais</>, year: "Ensino Médio · 2º ano", className: "sequence" },
];
export function HeroMaterials() {
 return <div className="hero-visual" aria-label="Exemplos ilustrativos de materiais pedagógicos" role="img"><div className="visual-stage" aria-hidden="true">
  <img className="hero-geometry" src="/brand/hero-glow.svg" alt="" />
  {examples.map(item=><div key={item.className} className={`example-card ${item.className}`}>
   <span className="material-kind">{item.kind}</span><p className="material-title">{item.title}</p><p className="material-year">{item.year}</p>
  </div>)}
 </div></div>;
}
