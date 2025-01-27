/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configurazione per ignorare warning degli attributi del server
  transpilePackages: ['@next/font'],
  compiler: {
    // Sopprime i warning per gli attributi extra del server
    reactRemoveProperties: true,
    removeConsole: false,
    // Ignora gli attributi specifici che causano warning
    reactStrictMode: true,
  },
  // Configurazione per gestire le immagini esterne
  images: {
    domains: ['upload.wikimedia.org'],
  },
}

module.exports = nextConfig