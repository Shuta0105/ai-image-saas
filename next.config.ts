import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // 例: 5MB に拡大（サイズはバイト単位）
      bodySizeLimit: 5 * 1024 * 1024,
    },
  },
};

export default nextConfig;
