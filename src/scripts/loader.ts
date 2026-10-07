import { $ } from './env';

const root = document.documentElement;

/** Pantalla de carga breve (solo 1ª visita por sesión). Al terminar marca `.ready`. */
export function initLoader(): void {
  if (!root.classList.contains('has-loader')) {
    root.classList.add('ready');
    return;
  }
  const count = $('[data-loader-count]');
  const bar = $('[data-loader-bar]');
  const t0 = performance.now();
  const DURATION = 900;

  const step = (t: number): void => {
    const p = Math.min(1, (t - t0) / DURATION);
    const e = 1 - Math.pow(1 - p, 3);
    if (count) count.textContent = String(Math.round(e * 100)).padStart(3, '0');
    if (bar) bar.style.transform = `scaleX(${e})`;
    if (p < 1) return void requestAnimationFrame(step);

    root.classList.add('loader-out');
    try {
      sessionStorage.setItem('lo-intro', '1');
    } catch {
      /* almacenamiento bloqueado: se ignora */
    }
    setTimeout(() => root.classList.add('ready'), 350);
    setTimeout(() => root.classList.remove('has-loader', 'loader-out'), 1000);
  };
  requestAnimationFrame(step);
}
