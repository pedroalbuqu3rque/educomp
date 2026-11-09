import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { signOut } from "@/lib/auth/actions";
export const metadata = {title:"Minha conta | EduComp"};
export default async function Page({searchParams}:{searchParams:Promise<{error?:string}>}) {
 const user = await currentUser();
 if (!user) redirect("/entrar?next=/conta");
 const params = await searchParams;
 return <section className="auth-card"><p className="auth-eyebrow">EDUCOMP / ÁREA DO PROFESSOR</p><h1>Minha conta</h1><p>{user.email}</p>{params.error && <p role="alert" className="auth-error">Não foi possível sair. Tente novamente.</p>}<Link href="/biblioteca">Acessar biblioteca</Link><Link href="/redefinir-senha">Alterar minha senha</Link><form action={signOut}><button className="auth-submit">Sair da conta</button></form></section>;
}
