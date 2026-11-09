import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { AuthForm } from "@/components/auth/auth-form";
export const metadata = {title:"Redefinir senha | EduComp"};
export default async function Page() {
 if (!await currentUser()) redirect("/recuperar-senha?error=link");
 return <section className="auth-card auth-reset"><h1>Crie uma nova senha</h1><p>Use pelo menos 12 caracteres. Você pode usar uma frase longa e fácil de lembrar.</p><AuthForm mode="reset"/></section>;
}
