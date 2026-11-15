import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";
import ts from "eslint-config-next/typescript";

export default defineConfig([
  ...next,
  ...ts,
  {
    files: [
      "src/components/brand.tsx",
      "src/components/hero-materials.tsx",
      "src/components/library/library-browser.tsx",
      "src/components/material/*access-panel.tsx",
      "src/components/profile/profile-avatar.tsx",
      "src/components/profile/profile-photo-control.tsx",
      "src/app/materiais/[[]id[]]/page.tsx",
    ],
    rules: { "@next/next/no-img-element": "off" },
  },
  { rules: { "no-empty": ["error", { allowEmptyCatch: true }] } },
  globalIgnores([".next/**", "next-env.d.ts"]),
]);
