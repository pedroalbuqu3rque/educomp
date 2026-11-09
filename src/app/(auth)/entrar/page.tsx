import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = {title:"Boas-vindas de volta | EduComp"};
export default async function Page({searchParams}:{searchParams:Promise<{next?:string;error?:string}>}) {
 const params = await searchParams;
 return <section className="auth-card auth-login"><p className="auth-eyebrow">EDUCOMP / ÁREA DO PROFESSOR</p><h1>Boas-vindas de volta</h1><p>Acesse sua conta para continuar.</p>
 {params.error && <p role="alert" className="auth-error">O link é inválido ou expirou. Solicite um novo link em Recuperar acesso.</p>}
 <p className="auth-hint">Use seu e-mail</p>
 <AuthForm mode="login" next={params.next}/>
 <Link href="/cadastro">Ainda não tem uma conta? Criar cadastro</Link>
 <Link className="auth-back" href="/">Voltar ao início</Link></section>;
}
