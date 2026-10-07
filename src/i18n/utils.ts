import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

export type Localized<T = string> = Record<Lang, T>;

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey, vars: Record<string, string> = {}): string =>
    Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), ui[lang][key]);
}

/** Ruta de la home en cada idioma: `/` (es) y `/en/` (en). */
export function homePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

/** Convierte `*texto*` en `<em>texto</em>` escapando el resto (para títulos con acento). */
export function emphasize(text: string): string {
  const esc = text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
  return esc.replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
