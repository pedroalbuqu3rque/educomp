/* SVGs exportados do componente mestre do Figma, preservados sem alteração. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
export function Brand({ footer = false }: { footer?: boolean }) {
 const prefix = footer ? "footer" : "header";
 return <Link className={`brand ${footer ? "brand-footer" : ""}`} href="/" aria-label="EduComp — Início">
  <img className="brand-symbol" src={`/brand/${prefix}-symbol.svg`} alt="" />
  <img className="brand-edu" src={`/brand/${prefix}-edu.svg`} alt="" />
  <img className="brand-comp" src={`/brand/${prefix}-comp.svg`} alt="" />
  <img className="brand-subtitle" src={`/brand/${prefix}-subtitle.svg`} alt="" />
 </Link>;
}
