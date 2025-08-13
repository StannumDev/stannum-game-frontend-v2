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
    // shortcuts: [
    //   {
    //     name: "Entrenar en TRENNO Mark Digital",
    //     short_name: "Ir a TMD",
    //     description: "Entrena ahora mismo en TRENNO Mark Digital",
    //     url: "/dashboard/library/tmd",
    //     icons: [
    //       {
    //         src: "/assets/favicon.ico",
    //         sizes: "any",
    //         type: 'image/x-icon'
    //       }
    //     ]
    //   }
    // ],
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