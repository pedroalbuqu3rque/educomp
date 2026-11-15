import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/biblioteca/arquivos/*": ["./private/biblioteca/arquivos/*.pdf"],
  },
};

export default nextConfig;
