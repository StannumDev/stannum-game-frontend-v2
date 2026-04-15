import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { STANNUMLogo, ToastLayout } from "@/components";
import { ToolsIcon } from "@/icons";
import "./globals.css";

const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

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
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID||''}>
      <html lang="es" className="bg-background">
        <body className={`${satoshi.className} ${satoshi.variable} antialiased w-full min-h-svh flex flex-col items-center bg-background lg:bg-gradient-to-br lg:from-background lg:to-background-sidebar`}>
          {MAINTENANCE_MODE ? (
            <main className="grow w-full flex flex-col items-center justify-center gap-8 p-8 text-center">
              <STANNUMLogo className="w-40 lg:w-52" gameColor="fill-stannum" stannumColor="fill-white" />
              <ToolsIcon className="text-stannum text-5xl lg:text-6xl" />
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-3xl lg:text-5xl font-black text-white uppercase">Estamos en mantenimiento</h1>
                <p className="text-card-lightest text-base lg:text-lg max-w-md">Estamos realizando mejoras en la plataforma. Volvemos en unos minutos.</p>
              </div>
              <div className="w-12 h-1 rounded-full bg-stannum animate-pulse" />
            </main>
          ) : (
            <>
              {children}
              <ToastLayout/>
            </>
          )}
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}