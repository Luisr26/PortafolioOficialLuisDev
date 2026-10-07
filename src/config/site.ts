/** Datos globales del sitio: identidad, contacto y SEO. */
export const SITE = {
  url: 'https://portafolio-oficial-luis-dev.vercel.app',
  name: 'Luis Orozco',
  fullName: 'Luis Alfredo Orozco Sánchez',
  initials: 'LO',
  email: 'luisoro009@gmail.com',
  location: { city: 'Barranquilla', country: 'Colombia', countryCode: 'CO' },
  timeZone: 'America/Bogota',
  themeColor: '#1A1E23',
  social: {
    github: 'https://github.com/Luisr26',
    linkedin: 'https://www.linkedin.com/in/luis-orozco-07ab5b208/',
    whatsapp: 'https://wa.me/573045233125',
  },
  worksFor: { name: 'Blackbird Labs', url: 'https://bblabs.io' },
  alumniOf: ['Corporación Universitaria Latinoamericana (CUL)', 'SENA'],
} as const;

export type SocialKey = keyof typeof SITE.social;
