/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Prevent webpack from bundling these packages (they can't be bundled cleanly).
    // They're require()'d at runtime instead — but Vercel's file tracer needs to
    // know to include them in the Lambda bundle, which is what outputFileTracingIncludes does.
    serverComponentsExternalPackages: ["pdf-parse", "pdfjs-dist", "mammoth"],
    outputFileTracingIncludes: {
      "/api/analyze": [
        "./node_modules/pdf-parse/**/*",
        "./node_modules/pdfjs-dist/**/*",
        "./node_modules/mammoth/**/*",
      ],
    },
  },
};

export default nextConfig;
