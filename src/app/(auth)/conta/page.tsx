import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth/user";
import { signOut } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/profile/validation";
import { z } from "zod";
import { LibraryHeader } from "@/components/library/library-header";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfilePhotoControl } from "@/components/profile/profile-photo-control";
import "@/app/biblioteca/library.css";
import "@/components/profile/profile.css";
export const metadata = { title: "Meu perfil | EduComp" };
export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
 const user = await currentUser();
 if (!user) redirect("/entrar?next=/conta");
 const params = await searchParams;
 let profile = null;
 try {
  const client = await createClient();
  const { data, error } = await client.from("profiles").select("display_name,occupation,bio,avatar_path").eq("id", user.id).maybeSingle();
  const parsed = profileSchema.extend({avatar_path:z.string().nullable()}).safeParse(data);
  if (!error && parsed.success) profile = parsed.data;
 } catch { /* Keep the error state separate from an empty editable profile. */ }
 return <div className="profile-page"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><LibraryHeader active="conta" /><main className="profile-container" id="conteudo">
 <p className="profile-eyebrow">Minha conta</p><h1>Meu perfil</h1><p className="profile-intro">Visualize e atualize suas informações pessoais e de acesso.</p>
 {profile ? <><section className="profile-card profile-identity" aria-label="Sua conta"><ProfilePhotoControl name={profile.display_name} path={profile.avatar_path??null} /><div><h2>{profile.display_name}</h2><p>{user.email}</p><span className="profile-account-tag">Conta de professor</span></div></section><ProfileForm initial={{display_name:profile.display_name,occupation:profile.occupation,bio:profile.bio}} email={user.email ?? ""} /></> : <section className="profile-card" role="alert"><h2>Não foi possível carregar seu perfil</h2><p>Tente novamente antes de editar suas informações.</p><Link className="button button-outline" href="/conta">Tentar novamente</Link></section>}
 <section className="profile-card profile-security"><div><h2>Segurança e acesso</h2><p>Mantenha sua senha atualizada para proteger sua conta.</p></div><Link href="/redefinir-senha" className="button button-outline">Alterar senha</Link></section>
 <div className="profile-session"><Link href="/biblioteca">Voltar à Biblioteca</Link><form action={signOut}><button type="submit">Sair da conta</button></form></div>
 {params.error === "sair" && <p role="alert" className="profile-error">Não foi possível sair. Tente novamente.</p>}
 </main></div>;
}
