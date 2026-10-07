import Lenis from 'lenis';
import { $$, reduceMotion } from './env';

type ScrollListener = (y: number, velocity: number) => void;
const listeners = new Set<ScrollListener>();
let lenis: Lenis | null = null;

export function onScroll(fn: ScrollListener): void {
  listeners.add(fn);
}

export function scrollToTarget(target: HTMLElement | number): void {
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' });
  else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

export function initScroll(): void {
  if (!reduceMotion) {
    lenis = new Lenis({ lerp: 0.1, anchors: false });
    const raf = (t: number): void => {
      lenis?.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    lenis.on('scroll', (l: Lenis) => listeners.forEach((fn) => fn(l.scroll, l.velocity)));
  } else {
    let last = scrollY;
    addEventListener(
      'scroll',
      () => {
        listeners.forEach((fn) => fn(scrollY, scrollY - last));
        last = scrollY;
      },
      { passive: true },
    );
  }

  // Anclas internas con scroll suave y foco accesible en el destino.
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, '', id);
    }),
  );
  $$('[data-totop]').forEach((b) => b.addEventListener('click', () => scrollToTarget(0)));
}
