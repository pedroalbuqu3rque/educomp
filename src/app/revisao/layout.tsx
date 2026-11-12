import { LibraryHeader } from "@/components/library/library-header";
import "../biblioteca/library.css";
import "./review.css";
export const metadata={robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}) {
 return <div className="library-page review-page"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><LibraryHeader active="revisao"/>
  <main id="conteudo" className="review-container">{children}</main></div>;
}
