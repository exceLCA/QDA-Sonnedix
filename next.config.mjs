/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // mammoth (DOCX extraction) can't be bundled cleanly by webpack; require() it at runtime.
    serverComponentsExternalPackages: ["mammoth"],
  },
};

export default nextConfig;
