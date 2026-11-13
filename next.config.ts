import type { NextConfig } from "next";

// Include private institutional PDFs in the server runtime on Vercel.
// They must not be placed in public/ or exposed as static assets.
const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/biblioteca/arquivos/*": ["./private/biblioteca/arquivos/*.pdf"],
  },
};

export default nextConfig;
