import type { Localized } from '../i18n/utils';

export interface Experience {
  company: string;
  role: Localized;
  /** ISO `YYYY-MM`. `end: null` = actual. */
  start: string;
  end: string | null;
  summary: Localized;
  note?: Localized;
  tags: string[];
}

export const experience: Experience[] = [
  {
    company: 'Blackbird Labs',
    role: { es: 'Desarrollador de IA', en: 'AI Developer' },
    start: '2025-12',
    end: null,
    summary: {
      es: 'Diseño e implemento sistemas inteligentes y flujos de automatización con modelos de lenguaje y agentes de IA para clientes. Conecto plataformas externas con APIs REST, protocolos MCP y herramientas de orquestación, y participo en el diseño de arquitecturas para productos basados en IA.',
      en: 'I design and build intelligent systems and automation workflows with language models and AI agents for clients. I connect external platforms through REST APIs, MCP and orchestration tools, and help design architectures for AI-based products.',
    },
    tags: ['AI Agents', 'LLMs', 'MCP', 'REST APIs'],
  },
  {
    company: 'Retycol',
    role: {
      es: 'Desarrollador de Automatización · Negocios y Proyectos',
      en: 'Automation Developer · Business & Projects',
    },
    start: '2025-12',
    end: '2026-06',
    summary: {
      es: 'Automaticé procesos operativos de las áreas de Negocios y Proyectos con n8n y la suite de Microsoft. Integré Azure, Microsoft 365 y el ERP Exact Synergy para centralizar la información crítica, y mantuve las bases de datos que soportan los flujos y reportes.',
      en: 'I automated operational processes for the Business and Projects areas with n8n and the Microsoft suite. I integrated Azure, Microsoft 365 and the Exact Synergy ERP to centralize critical data, and maintained the databases behind the workflows and reports.',
    },
    tags: ['n8n', 'Power Automate', 'Microsoft Graph', 'Exact Synergy', 'Gemini'],
  },
  {
    company: 'ICAS LTDA',
    role: { es: 'Desarrollador Web y Analista de Datos', en: 'Web Developer & Data Analyst' },
    start: '2023-01',
    end: '2024-03',
    summary: {
      es: 'Construí dashboards interactivos para el pipeline de I+D farmacéutico con Node.js, Microsoft Graph API y Chart.js. Procesé y visualicé datos operativos con Python e integré sistemas internos con SharePoint, OneDrive y ClickUp.',
      en: 'I built interactive dashboards for the pharmaceutical R&D pipeline with Node.js, Microsoft Graph API and Chart.js. I processed and visualized operational data with Python and integrated internal systems with SharePoint, OneDrive and ClickUp.',
    },
    note: { es: 'Con permiso de trabajo para menor de edad', en: 'Under a legal work permit for minors' },
    tags: ['Node.js', 'Graph API', 'Chart.js', 'Python', 'Pandas'],
  },
];

export interface Education {
  title: Localized;
  place: string;
  start: string;
  end: string | null;
}

export const education: Education[] = [
  { title: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' }, place: 'Corporación Universitaria Latinoamericana', start: '2023-01', end: null },
  { title: { es: 'Análisis Exploratorio de Datos en Python', en: 'Exploratory Data Analysis in Python' }, place: 'SENA', start: '2023-05', end: '2023-07' },
  { title: { es: 'Técnico en Programación de Software', en: 'Software Programming Technician' }, place: 'SENA', start: '2021-01', end: '2022-11' },
];
