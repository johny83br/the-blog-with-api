import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /* Descomentar essa linha para exportar para HTML: */
  /* Para exportar HTML: */
  // output: 'export',
  basePath: '/theblog',
  assetPrefix: '/theblog',
  images: {
    //   unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
        search: '',
      },
    ],
  },
  turbopack: {
    // We set the root to the directory where next.config.ts is located
    root: path.join(__dirname),
  },
};

export default nextConfig;
