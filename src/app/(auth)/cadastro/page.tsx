import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = {title:"Crie sua conta | EduComp"};
export default async function Page({searchParams}:{searchParams:Promise<{next?:string;error?:string}>}) {
 const params = await searchParams;
 return <section className="auth-card auth-signup"><p className="auth-eyebrow">EDUCOMP / ÁREA DO PROFESSOR</p><h1>Crie sua conta</h1><p>Cadastre-se para acessar e compartilhar materiais.</p>
 {params.error && <p role="alert" className="auth-error">O link é inválido ou expirou. Solicite um novo link em Recuperar acesso.</p>}
 <p className="auth-hint">Use seu e-mail</p>
 <AuthForm mode="signup" next={params.next}/>
 <Link href="/entrar">Já possui uma conta? Fazer login</Link>
 <Link className="auth-back" href="/">Voltar ao início</Link></section>;
}
