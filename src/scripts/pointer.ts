import { $, $$, clamp, finePointer, lerp, reduceMotion, trackVisibility } from './env';
import { wake } from './ticker';

/** Posición del puntero compartida por cursor, vista previa y letrero vivo. */
export const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
const root = document.documentElement;
const enabled = finePointer && !reduceMotion;

export function initCursor(): void {
  if (!enabled) return;
  const dot = $('.cur');
  const ring = $('.cur-ring');
  const label = ring?.querySelector('span');
  if (!dot || !ring || !label) return;
  const r = { ...pointer };

  const task = (): boolean => {
    r.x = lerp(r.x, pointer.x, 0.2);
    r.y = lerp(r.y, pointer.y, 0.2);
    dot.style.transform = `translate3d(${pointer.x}px,${pointer.y}px,0)`;
    ring.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
    return Math.abs(r.x - pointer.x) + Math.abs(r.y - pointer.y) > 0.3;
  };

  addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      root.classList.add('cursor-on');
      wake(task);
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => root.classList.remove('cursor-on'));
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-cursor]');
    root.classList.toggle('cursor-big', !!t);
    label.textContent = t?.dataset.cursor ?? '';
  });
}

/** Letrero vivo: las letras de [data-prox] se ensanchan cerca del cursor. */
export function initProximity(): void {
  if (!enabled) return;
  const groups = $$('[data-prox]').map((g) => ({ g, chs: $$('.ch', g), vis: trackVisibility(g) }));
  let queued = false;

  const apply = (): boolean => {
    queued = false;
    for (const { g, chs, vis } of groups) {
      if (!vis.visible) continue;
      const gr = g.getBoundingClientRect();
      const near = pointer.y > gr.top - 200 && pointer.y < gr.bottom + 200;
      for (const c of chs) {
        if (!near) {
          c.style.fontVariationSettings = '';
          continue;
        }
        const b = c.getBoundingClientRect();
        const d = Math.hypot(pointer.x - (b.left + b.width / 2), pointer.y - (b.top + b.height / 2));
        const k = clamp(1 - d / 360, 0, 1);
        c.style.fontVariationSettings = k ? `"wdth" ${62 + 48 * k}, "wght" ${900 - 400 * k}` : '';
      }
    }
    return false;
  };

  addEventListener(
    'pointermove',
    () => {
      if (queued) return;
      queued = true;
      wake(apply);
    },
    { passive: true },
  );
}

/** Botones que se dejan atraer por el cursor. */
export function initMagnetic(): void {
  if (!enabled) return;
  $$('.mag').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
    });
    b.addEventListener('pointerleave', () => {
      b.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      b.style.transform = '';
      setTimeout(() => (b.style.transition = ''), 500);
    });
  });
}

/** Vista previa flotante de servicios que sigue al cursor. */
export function initPreview(): void {
  if (!enabled) return;
  const pv = $('[data-pv]');
  const list = $('[data-svc]');
  const num = $('[data-pv-n]');
  const tools = $('[data-pv-list]');
  if (!pv || !list || !num || !tools) return;
  const p = { ...pointer };
  let active = false;

  const task = (): boolean => {
    p.x = lerp(p.x, pointer.x, 0.14);
    p.y = lerp(p.y, pointer.y, 0.14);
    pv.style.transform = `translate3d(${p.x}px,${p.y}px,0) rotate(${clamp((pointer.x - p.x) * 0.08, -10, 10)}deg)`;
    return active || Math.abs(p.x - pointer.x) > 0.5;
  };

  $$<HTMLAnchorElement>('a', list).forEach((a) => {
    a.addEventListener('pointerenter', () => {
      num.textContent = a.dataset.pvNum ?? '';
      tools.replaceChildren(
        ...(a.dataset.pvTools ?? '').split('|').map((t) => Object.assign(document.createElement('li'), { textContent: t })),
      );
      if (!active) Object.assign(p, pointer);
      active = true;
      pv.classList.add('on');
      list.classList.add('dim');
      wake(task);
    });
    a.addEventListener('pointerleave', () => {
      active = false;
      pv.classList.remove('on');
      list.classList.remove('dim');
    });
  });
}
