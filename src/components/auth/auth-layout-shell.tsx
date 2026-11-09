"use client";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand";
export function AuthLayoutShell({children}:{children:React.ReactNode}) {
 const pathname=usePathname();
 if(pathname==="/salvos") return <>{children}</>;
 return <div className="auth-page"><header className="auth-header"><Brand /></header><main id="conteudo" className="auth-main">{children}</main></div>;
}
