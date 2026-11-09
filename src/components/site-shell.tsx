import Link from "next/link";
import { Brand } from "./brand";
import { ShareButton } from "./share-button";
import { currentUser } from "@/lib/auth/user";
export async function SiteHeader() {
 const user = await currentUser();
 return <header className="site-header"><div className="header-inner"><Brand />
  <nav aria-label="Acesso à conta" className="account-nav">
   <Link href={user ? "/conta" : "/entrar"} className="button button-outline">{user ? "Minha conta" : "Entrar"}</Link>
   <Link href={user ? "/biblioteca" : "/cadastro"} className="button button-primary">{user ? "Biblioteca" : "Criar conta"}</Link>
  </nav>
 </div></header>;
}
export function SiteFooter() {
 return <footer className="site-footer"><div className="footer-inner">
  <div className="footer-brand"><Brand footer /><p>Projeto de portfólio · Pedro Albuquerque</p></div>
  <nav aria-label="Links de rodapé"><Link href="/termos">Termos de uso</Link><Link href="/privacidade">Privacidade</Link><Link href="/contato">Fale conosco</Link><ShareButton /></nav>
 </div></footer>;
}
