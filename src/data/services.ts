import type { Localized } from '../i18n/utils';

export interface Service {
  title: Localized;
  summary: Localized;
  tools: string[];
}

export const services: Service[] = [
  {
    title: { es: 'Automatización', en: 'Automation' },
    summary: {
      es: 'Flujos end-to-end que eliminan tareas manuales y conectan áreas del negocio.',
      en: 'End-to-end workflows that remove manual work and connect business areas.',
    },
    tools: ['n8n', 'Power Automate', 'Make', 'Microsoft Graph'],
  },
  {
    title: { es: 'IA aplicada', en: 'Applied AI' },
    summary: {
      es: 'Agentes, chatbots, OCR y NLP integrados a reglas de negocio reales.',
      en: 'Agents, chatbots, OCR and NLP wired into real business rules.',
    },
    tools: ['AI Agents', 'MCP', 'OCR', 'LLMs'],
  },
  {
    title: { es: 'Full-stack', en: 'Full-stack' },
    summary: {
      es: 'Aplicaciones web con backend robusto y frontend cuidado.',
      en: 'Web applications with a solid backend and a careful frontend.',
    },
    tools: ['Spring Boot', 'Angular', 'Node.js', 'TypeScript'],
  },
  {
    title: { es: 'Integraciones y datos', en: 'Integrations & data' },
    summary: {
      es: 'APIs, bases de datos y análisis para que la información fluya.',
      en: 'APIs, databases and analysis so information flows.',
    },
    tools: ['REST APIs', 'PostgreSQL', 'Python', 'Pandas'],
  },
];

/** Stack para las cintas en movimiento. */
export const stackTape: string[] = [
  'Java', 'Spring Boot', 'Angular', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker',
];
export const craftTape: Localized<string[]> = {
  es: ['Automatización', 'Agentes de IA', 'Integraciones', 'Full-stack', 'Datos'],
  en: ['Automation', 'AI agents', 'Integrations', 'Full-stack', 'Data'],
};
