import { AuthLayoutShell } from "@/components/auth/auth-layout-shell";
import "./auth.css";
export const metadata = {robots:{index:false,follow:false}};
export default function AuthLayout({children}:{children:React.ReactNode}) {
 return <AuthLayoutShell>{children}</AuthLayoutShell>;
}
