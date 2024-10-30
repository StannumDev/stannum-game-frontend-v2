import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['*', 'Googlebot', 'Applebot', 'Bingbot', 'Baiduspider', 'Yandex', 'DuckDuckBot', 'Facebot', 'AdsBot-Google', 'CompSpyBot', 'Curious George', 'CybEye.com', 'DoCoMo', 'ExB Language Crawler', 'Ezooms', 'Flamingo_SearchEngine', 'Genieo', 'Genio', 'LWNutch', 'LexxeBot', 'OpenWebIndex', 'RediffNewsBot', 'SEOENGWorldBot', 'Scanmine', 'ShopWiki', 'ShowyouBot', 'Sosospider', 'WocBot', 'Yeti', 'YoudaoBot', 'daumoa', 'gsa-crawler', 'libcrawl', 'linkdex', 'magpie-crawler', 'repparser', 'rogerbot', 'sindice-site-manager', 'sogou spider', 'sogou', 'woriobot', 'yacybot', 'yolinkBot', 'Screaming Frog SEO Spider'],
        allow: ['/'],
      },
    ],
    sitemap: 'https://stannumgame.com/sitemap.xml',
  }
}