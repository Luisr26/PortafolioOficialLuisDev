/** Capacidades del entorno y utilidades DOM compartidas. */
export const reduceMotion: boolean = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer: boolean = matchMedia('(pointer: fine)').matches;
export const supportsSDA: boolean = CSS.supports('animation-timeline: view()');

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T | null =>
  root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  [...root.querySelectorAll<T>(sel)];

export const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;

/** Observa visibilidad y mantiene un flag actualizado. */
export function trackVisibility(el: Element, rootMargin = '0px'): { readonly visible: boolean } {
  const state = { visible: false };
  new IntersectionObserver(([e]) => (state.visible = e.isIntersecting), { rootMargin }).observe(el);
  return state;
}
