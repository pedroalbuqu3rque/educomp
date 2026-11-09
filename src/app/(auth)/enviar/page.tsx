import Link from "next/link";
import { currentUser } from "@/lib/auth/user";
import { redirect } from "next/navigation";
export default async function Page(){
 if(!await currentUser()) redirect("/entrar");
 return <section className="auth-card"><p className="auth-eyebrow">EM PREPARAÇÃO</p><h1>Enviar material</h1><p>Sua conta está pronta. O formulário de envio e a revisão dos materiais serão disponibilizados na próxima etapa.</p><Link href="/biblioteca">Voltar à biblioteca</Link><Link href="/conta">Minha conta</Link></section>;
}
