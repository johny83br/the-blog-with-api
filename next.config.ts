import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    useCache: true,
    cacheLife: {
      stale: {
        stale: 1,
      },
      seconds: {
        stale: 0,
        revalidate: 300,
        expire: 300,
      },
    },
  },
  /* Descomentar essa linha para exportar para HTML: */
  /* Para exportar HTML: */
  // output: 'export',
  // basePath: '/blog-ssg-nextjs',
  // assetPrefix: '/blog-ssg-nextjs',
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;
