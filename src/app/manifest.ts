import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'STANNUM Game',
    short_name: 'STANNUM Game',
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
            src: "/assets/android-chrome-36x36.png",
            sizes: "36x36",
            type: "image/png"
        },
        {
            src: "/assets/android-chrome-48x48.png",
            sizes: "48x48",
            type: "image/png"
        },
        {
            src: "/assets/android-chrome-72x72.png",
            sizes: "72x72",
            type: "image/png"
        },
        {
            src: "/assets/android-chrome-96x96.png",
            sizes: "96x96",
            type: "image/png"
        },
        {
            src: "/assets/android-chrome-144x144.png",
            sizes: "144x144",
            type: "image/png"
        },
        {
            src: "/assets/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
        }
    ],
  }
}