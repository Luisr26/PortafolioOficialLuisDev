import { $$, reduceMotion, supportsSDA } from './env';

/** Etiquetas que se "re-imprimen" al entrar en vista. */
export function initScramble(): void {
  if (reduceMotion) return;
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/—';
  const run = (el: HTMLElement): void => {
    const final = el.textContent ?? '';
    el.setAttribute('aria-label', final); // los lectores de pantalla no oyen el efecto
    let f = 0;
    const id = setInterval(() => {
      el.textContent = [...final]
        .map((c, i) => (c === ' ' || i < f / 2 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join('');
      if (++f > final.length * 2) {
        el.textContent = final;
        clearInterval(id);
      }
    }, 28);
  };
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        run(e.target as HTMLElement);
      }),
    { threshold: 1 },
  );
  $$('[data-scramble]').forEach((el) => io.observe(el));
}

/** Subrayado de la sección activa en la navegación. */
export function initNavSpy(): void {
  const links = $$<HTMLAnchorElement>('[data-nav]');
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.dataset.nav === e.target.id)));
      }),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  links.forEach((a) => {
    const s = a.dataset.nav && document.getElementById(a.dataset.nav);
    if (s) io.observe(s);
  });
}

/** Reloj local en el footer. */
export function initClock(): void {
  $$<HTMLTimeElement>('[data-clock]').forEach((el) => {
    const fmt = new Intl.DateTimeFormat(el.dataset.locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: el.dataset.tz,
    });
    const tick = (): void => {
      const d = new Date();
      el.textContent = fmt.format(d);
      el.dateTime = d.toISOString();
    };
    tick();
    setInterval(tick, 30_000);
  });
}

/** Respaldo para navegadores sin animation-timeline (Firefox): revelado por IntersectionObserver. */
export function initFallback(): void {
  if (supportsSDA) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }),
    { threshold: 0.15 },
  );
  $$('.rv, .job').forEach((el) => io.observe(el));

  const bar = document.querySelector<HTMLElement>('.progress');
  if (bar) {
    const tick = (): void => {
      const h = document.documentElement;
      bar.style.transform = `scaleX(${scrollY / Math.max(1, h.scrollHeight - innerHeight)})`;
    };
    addEventListener('scroll', tick, { passive: true });
    tick();
  }
}
