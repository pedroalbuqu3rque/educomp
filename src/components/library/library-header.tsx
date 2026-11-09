import Link from "next/link";
import { Brand } from "@/components/brand";
import { currentUser } from "@/lib/auth/user";
export async function LibraryHeader({active="biblioteca"}:{active?:"biblioteca"|"salvos"}) {
 const user = await currentUser();
 return <header className="library-header"><div className="library-header-inner"><Brand footer />
  <nav aria-label="Menu principal"><Link href="/biblioteca" aria-current={active==="biblioteca"?"page":undefined}>Biblioteca</Link><Link href="/salvos" aria-current={active==="salvos"?"page":undefined}>Salvos</Link><Link href="/enviar">Enviar material</Link></nav>
  <Link className="button button-outline guest-login" href={user ? "/conta" : "/entrar"}>{user ? "Minha conta" : "Entrar"}</Link>
 </div></header>;
}
