import type { Localized } from '../i18n/utils';

export interface Project {
  slug: string;
  title: string;
  kind: Localized;
  summary: Localized;
  stack: string[];
  repo: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'coopcredit',
    title: 'CoopCredit',
    kind: { es: 'Backend · Fintech', en: 'Backend · Fintech' },
    summary: {
      es: 'Sistema de solicitud de créditos para cooperativas con arquitectura hexagonal, evaluación automática de riesgo, roles RBAC y 109 tests.',
      en: 'Credit application system for cooperatives with hexagonal architecture, automated risk scoring, RBAC roles and 109 tests.',
    },
    stack: ['Java 21', 'Spring Boot 3.4', 'PostgreSQL 16', 'Docker', 'Spring Security'],
    repo: 'https://github.com/Luisr26/CoopCredit',
    featured: true,
  },
  {
    slug: 'hexagonal-api',
    title: 'API Hexagonal',
    kind: { es: 'Full-stack', en: 'Full-stack' },
    summary: {
      es: 'API REST de usuarios con puertos y adaptadores, Spring Data JPA, documentación Swagger y frontend en Angular.',
      en: 'Users REST API with ports and adapters, Spring Data JPA, Swagger docs and an Angular frontend.',
    },
    stack: ['Java 17', 'Spring Boot 3.5', 'MySQL', 'Angular', 'Swagger'],
    repo: 'https://github.com/Luisr26/JavaSpringM6',
  },
  {
    slug: 'microservicios',
    title: 'Microservicios',
    kind: { es: 'Arquitectura distribuida', en: 'Distributed architecture' },
    summary: {
      es: 'Servicios Java que se comunican entre sí, con orquestación y despliegue automatizado mediante scripts de shell.',
      en: 'Java services that talk to each other, with orchestration and automated deployment through shell scripts.',
    },
    stack: ['Java', 'Spring Boot', 'Microservicios', 'Shell'],
    repo: 'https://github.com/Luisr26/ArquitecturaMicroservicios',
  },
  {
    slug: 'novabook',
    title: 'NovaBook',
    kind: { es: 'App de escritorio', en: 'Desktop app' },
    summary: {
      es: 'Gestión de bibliotecas con interfaz JavaFX, roles de administrador y bibliotecario, préstamos e importación/exportación CSV.',
      en: 'Library management with a JavaFX interface, admin and librarian roles, loans and CSV import/export.',
    },
    stack: ['Java', 'JavaFX', 'MySQL', 'MVC + DAO'],
    repo: 'https://github.com/Luisr26/NovaBook',
  },
  {
    slug: 'login-angular',
    title: 'Auth Angular',
    kind: { es: 'Full-stack', en: 'Full-stack' },
    summary: {
      es: 'Autenticación full-stack: Angular y Tailwind en el frontend, Spring Boot en el backend, rutas protegidas y diseño responsive.',
      en: 'Full-stack authentication: Angular and Tailwind on the frontend, Spring Boot on the backend, protected routes and responsive design.',
    },
    stack: ['Angular', 'TypeScript', 'Tailwind', 'Spring Boot'],
    repo: 'https://github.com/Luisr26/LoginAngular',
  },
  {
    slug: 'nearme',
    title: 'NearMe',
    kind: { es: 'Landing', en: 'Landing' },
    summary: {
      es: 'Plataforma que conecta personas con negocios locales: landing responsive con animaciones y registro de comercios.',
      en: 'Platform that connects people with local businesses: responsive landing with animations and business sign-up.',
    },
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    repo: 'https://github.com/Luisr26/NearMe',
  },
];
