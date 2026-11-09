import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "./globals.css";
export const metadata: Metadata = { title: "EduComp — Materiais para ensinar Computação", description: "Materiais pedagógicos de Computação" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="pt-BR"><body>{children}</body></html>;
}
