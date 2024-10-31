import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "../assets/fonts/Satoshi.ttf",
  variable: "--satoshi",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:{
    template: '%s | STANNUM Game',
    default: 'STANNUM Game',
  },
  description: "En STANNUM Game nos dedicamos a entrenar emprendedores fusionando la metodología deportiva, la enseñanza en negocios y la inteligencia artificial, con el fin de desarrollar emprendedores de alto rendimiento.",
  generator: 'STANNUM',
  applicationName: 'STANNUM Game',
  referrer: 'origin-when-cross-origin',
  keywords: ['emprendedores', 'STANNUM', 'STANNUM Game'],
  authors: [{ name: 'STANNUM', url: 'https://stannum.com.ar' }],
  creator: 'STANNUM',
  publisher: 'STANNUM',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://stannumgame.com'),
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'STANNUM Game',
    description: 'Somos un Centro de Alto Rendimiento para emprendedores avanzados. Te ayudamos a convertirte en Emprendedor Profesional con una metodología basada en el deporte con gamificación e inteligencia artificial.',
    url: 'https://stannumgame.com',
    siteName: 'STANNUM Game',
    locale: 'es_AR',
    type: 'website',
  },
  robots: { 
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: 'https://stannumgame.com/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    site: 'https://stannumgame.com',
    creator: 'STANNUM',
    title: 'STANNUM',
    description: 'Somos un Centro de Alto Rendimiento para emprendedores avanzados. Te ayudamos a convertirte en Emprendedor Profesional con una metodología basada en el deporte con gamificación e inteligencia artificial.',
    images: {
      url: 'https://stannumgame.com/assets/logo.png',
      alt: 'STANNUM Game Logo',
    },
  },
  appleWebApp: {
    title: 'STANNUM Game',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/src/app/apple-icon.png',
      {
        url: '/src/app/apple-icon.jpg',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  category: 'entrepreneurship',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
  width: 'device-width',
  viewportFit: "cover",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  interactiveWidget: 'resizes-visual',
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${satoshi.className} antialiased w-full min-h-svh flex flex-col items-center bg-gradient-to-br from-background to-background-sidebar`}>
        {children}
      </body>
    </html>
  );
}
