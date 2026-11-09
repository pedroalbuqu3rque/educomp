import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = {title:"Recuperar acesso | EduComp"};
export default async function Page({searchParams}:{searchParams:Promise<{next?:string;error?:string}>}) {
 const params = await searchParams;
 return <section className="auth-card auth-recover"><p className="auth-eyebrow">EDUCOMP / ÁREA DO PROFESSOR</p><h1>Recuperar acesso</h1><p>Informe seu e-mail e enviaremos as instruções para redefinir sua senha.</p>
 {params.error && <p role="alert" className="auth-error">O link é inválido ou expirou. Solicite um novo link em Recuperar acesso.</p>}
 <Link className="auth-close" href="/entrar" aria-label="Fechar recuperação">×</Link>
 <AuthForm mode="recover" next={params.next}/>
 <Link href="/entrar">Voltar para o login</Link>
 <Link className="auth-back" href="/">Voltar ao início</Link></section>;
}
