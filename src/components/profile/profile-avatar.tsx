/* eslint-disable @next/next/no-img-element -- Avatar público em tamanhos definidos pelo CSS. */
import {publicAvatarUrl} from "@/lib/profile/avatar";
export function ProfileAvatar({name,path,className=""}:{name:string;path?:string|null;className?:string}) {
 const initials=name.trim().split(/\s+/).slice(0,2).map(word=>word[0]).join("").toLocaleUpperCase("pt-BR")||"?";
 const src=publicAvatarUrl(path);
 return <span className={className} aria-hidden="true">
  {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : initials}
 </span>;
}
