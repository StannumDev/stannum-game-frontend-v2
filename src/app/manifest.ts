import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STANNUM Game',
    short_name: 'STANNUM',
    description: 'STANNUM Game',
    start_url: 'https://stannumgame.com/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
        {
            src: '/assets/favicon.ico',
            sizes: 'any',
            type: 'image/x-icon',
        },
        {
            src: "/assets/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
        },
        {
            src: "/assets/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
        }
    ],
  }
}