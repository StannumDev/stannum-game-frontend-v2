import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STANNUM Game',
    short_name: 'STANNUM',
    description: 'STANNUM Game',
    categories: ["business", "education", "entertainment", "games", "productivity", "social"],
    lang: "es",
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    start_url: '/',
    id: "/v1",
    display: 'standalone',
    orientation: 'any',
    prefer_related_applications: false,
    scope: "/",
    icons: [
        {
            src: '/assets/favicon/favicon.ico',
            sizes: 'any',
            type: 'image/x-icon'
        },
        {
            src: "/assets/favicon/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
        },
        {
            src: "/assets/favicon/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
        }
    ],
  }
}