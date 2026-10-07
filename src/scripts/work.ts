import { $, $$, clamp, reduceMotion, supportsSDA, trackVisibility } from './env';
import { onScroll } from './scroll';
import { wake } from './ticker';

/** Carril horizontal de proyectos: contador, barra de avance e inclinación por velocidad. */
export function initWork(): void {
  const section = $('[data-work]');
  const track = $('[data-work-track]');
  const now = $('[data-work-now]');
  const bar = $('[data-work-bar]');
  if (!section || !track || !now || !bar || reduceMotion) return;
  const cards = $$('[data-work-card]', section);
  const vis = trackVisibility(section);
  let skew = 0;
  let target = 0;

  const progress = (): number => {
    const r = section.getBoundingClientRect();
    return clamp(-r.top / (r.height - innerHeight), 0, 1);
  };

  const update = (): void => {
    const p = progress();
    bar.style.transform = `scaleX(${p})`;
    now.textContent = String(Math.min(cards.length, Math.floor(p * cards.length) + 1)).padStart(2, '0');
    // Sin animation-timeline, el desplazamiento horizontal lo hace JS.
    if (!supportsSDA) track.style.transform = `translate3d(${-p * (track.scrollWidth - innerWidth)}px,0,0)`;
  };

  const skewTask = (): boolean => {
    skew += (target - skew) * 0.12;
    target *= 0.9;
    const s = Math.abs(skew) < 0.02 ? 0 : skew;
    for (const c of cards) c.style.transform = s ? `skewX(${s}deg)` : '';
    return s !== 0;
  };

  onScroll((_, velocity) => {
    if (!vis.visible) return;
    update();
    target = clamp(-velocity * 0.4, -7, 7);
    wake(skewTask);
  });
  update();
}
