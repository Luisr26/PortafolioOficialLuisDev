// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portafolio-oficial-luis-dev.vercel.app',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO', en: 'en-US' } },
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
});
