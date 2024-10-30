import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STANNUM Game',
    short_name: 'STANNUM',
    description: 'STANNUM Game',
    start_url: 'https://stannumgame.com/',
    display: 'standalone',
    background_color: '#1f1f1f',
    theme_color: '#1f1f1f',
    icons: [
        {
            src: '/assets/favicon.ico',
            sizes: 'any',
            type: 'image/x-icon',
        },
        {
            src: "/assets/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png"
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