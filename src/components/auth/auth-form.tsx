"use client";
import { useActionState } from "react";
import Link from "next/link";
import { authenticate } from "@/lib/auth/actions";
import type { AuthMode, AuthState } from "@/lib/auth/validation";
const labels = {login:"Entrar na plataforma",signup:"Criar minha conta",recover:"Enviar instruções",reset:"Redefinir senha"};
export function AuthForm({mode,next="/biblioteca"}:{mode:AuthMode;next?:string}) {
 const [state,action,pending] = useActionState(authenticate.bind(null,mode),{} as AuthState);
 if (state.success) return <><p className="auth-success" role="status">{state.success}</p><Link href={mode === "reset" ? "/biblioteca" : "/entrar"}>{mode === "reset" ? "Acessar biblioteca" : "Voltar para o login"}</Link></>;
 return <form action={action} className="auth-form" aria-busy={pending}>
  <input type="hidden" name="next" value={next}/>
  {mode === "signup" && <label>Nome completo<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" required maxLength={120} defaultValue={state.name}/></label>}
  {mode !== "reset" && <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="seu.email@escola.edu.br" required maxLength={254} defaultValue={state.email}/></label>}
  {mode !== "recover" && <label>{mode === "reset" ? "Nova senha" : "Senha"}<input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder={mode === "reset" ? "Pelo menos 12 caracteres" : "Digite sua senha"} required minLength={mode === "login" ? 1 : 12} maxLength={128} aria-describedby={mode === "signup" ? "password-hint" : undefined}/></label>}
  {mode === "reset" && <label>Confirmar nova senha<input name="confirmation" type="password" autoComplete="new-password" placeholder="Repita a nova senha" required minLength={12} maxLength={128}/></label>}
  {mode === "signup" && <p id="password-hint" className="auth-hint">Use pelo menos 12 caracteres. Você pode usar uma frase.</p>}
  {mode === "login" && <Link href="/recuperar-senha">Esqueceu a senha?</Link>}
  {state.error && <p role="alert" className="auth-error">{state.error}</p>}
  <button className="auth-submit" disabled={pending}>{pending ? "Aguarde…" : labels[mode]}</button>
 </form>;
}
