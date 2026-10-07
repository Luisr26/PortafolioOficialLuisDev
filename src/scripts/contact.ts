import { $, $$ } from './env';

interface Strings {
  q2: string;
  done: string;
  doneMailto: string;
  next: string;
  send: string;
  sending: string;
  draft: string;
  sent: string;
  fromPh: string;
  msgPh: string;
  topic: string;
  mail: string;
  error: string;
  email: string;
  subject: string;
}
type Field = 'name' | 'topic' | 'email' | 'message';

const WEB3FORMS_KEY: string | undefined = import.meta.env.PUBLIC_WEB3FORMS_KEY;

const esc = (s: string): string =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
const emph = (s: string): string => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
const fill = (s: string, name: string): string => s.replaceAll('{name}', name);

/** Formulario conversacional de 4 pasos con carta en vivo. */
export function initContact(): void {
  const form = $<HTMLFormElement>('[data-contact]');
  if (!form) return;
  const section = form.closest('section') as HTMLElement;
  const S = JSON.parse(form.dataset.strings ?? '{}') as Strings;
  const steps = $$('.q', form);
  const bars = $$('.bar i', form);
  const back = $<HTMLButtonElement>('[data-c-back]', form)!;
  const next = $<HTMLButtonElement>('[data-c-next]', form)!;
  const label = $('[data-c-label]', form)!;
  const stepN = $('[data-c-stepn]', section);
  const q2 = $('[data-c-q2]', form)!;
  const letterState = $('[data-l-state]', section);
  const L = Object.fromEntries($$('[data-l]', section).map((el) => [el.dataset.l, el])) as Record<Field | 'sig', HTMLElement>;
  const PH: Record<Field, string> = { name: S.fromPh, topic: '—', email: 'tu@correo.com', message: S.msgPh };
  const data: Record<Field, string> = { name: '', topic: '', email: '', message: '' };
  let step = 0;

  const firstName = (): string => data.name.split(/\s+/)[0] || '—';
  const paint = (k: Field, v: string): void => {
    L[k].textContent = v || PH[k];
    L[k].classList.toggle('ph', !v);
    if (k === 'name') L.sig.textContent = v ? v.split(/\s+/)[0] : '—';
  };

  // Carta en vivo
  (['name', 'email', 'message'] as const).forEach((k) =>
    form.elements.namedItem(k) && (form.elements.namedItem(k) as HTMLInputElement).addEventListener('input', (e) => {
      data[k] = (e.target as HTMLInputElement).value.trim();
      paint(k, data[k]);
    }),
  );

  const go = (to: number): void => {
    const prev = steps[step];
    prev.classList.remove('active');
    prev.classList.add('leave');
    setTimeout(() => prev.classList.remove('leave'), 500);
    step = to;
    const cur = steps[step];
    cur.classList.add('active');
    q2.innerHTML = emph(fill(S.q2, firstName()));
    bars.forEach((b, i) => b.classList.toggle('done', i < step));
    if (stepN) stepN.textContent = String(Math.min(step + 1, 4));
    back.hidden = step === 0 || step === 4;
    next.hidden = step === 4;
    label.textContent = step === 3 ? S.send : S.next;
    const f = cur.querySelector<HTMLElement>('input:not([type=radio]), textarea') ?? cur.querySelector<HTMLElement>('input[type=radio]');
    if (f) setTimeout(() => f.focus({ preventScroll: true }), 350);
  };

  const validate = (): boolean => {
    const k = steps[step].dataset.k as Field;
    if (k === 'topic') return !!data.topic;
    if (k === 'message') return true;
    const f = form.elements.namedItem(k) as HTMLInputElement;
    const ok = !!f.value.trim() && f.checkValidity();
    f.classList.remove('err');
    if (!ok) {
      void f.offsetWidth;
      f.classList.add('err');
      f.focus();
    }
    return ok;
  };

  const finish = (mode: 'sent' | 'mailto' | 'error'): void => {
    const done = $('[data-c-done]', form)!;
    const summary = $('[data-c-summary]', form)!;
    if (mode === 'error') {
      done.innerHTML = emph(S.error);
      summary.innerHTML = `<a href="mailto:${S.email}">${S.email}</a>`;
    } else {
      done.innerHTML = emph(fill(mode === 'sent' ? S.done : S.doneMailto, firstName()));
      summary.innerHTML = `<span>${S.topic}: <b>${esc(data.topic)}</b></span><span>${S.mail}: <b>${esc(data.email)}</b></span>`;
      section.classList.add('sent');
      if (letterState) letterState.textContent = S.sent;
    }
    go(4);
  };

  const submit = async (): Promise<void> => {
    if ((form.elements.namedItem('botcheck') as HTMLInputElement).checked) return; // bot
    if (!WEB3FORMS_KEY) {
      const body = `${data.message}\n\n— ${data.name} · ${data.email}\n${S.topic}: ${data.topic}`;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent(`${S.subject}: ${data.topic}`)}&body=${encodeURIComponent(body)}`;
      return finish('mailto');
    }
    next.disabled = true;
    label.textContent = S.sending;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${S.subject}: ${data.topic}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          topic: data.topic,
          message: data.message || '—',
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      finish(json.success ? 'sent' : 'error');
    } catch {
      finish('error');
    } finally {
      next.disabled = false;
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (step === 3) void submit();
    else go(step + 1);
  });
  back.addEventListener('click', () => go(step - 1));

  const radios = $$<HTMLInputElement>('input[name=topic]', form);
  radios.forEach((r) =>
    r.addEventListener('change', () => {
      data.topic = r.value;
      paint('topic', r.value);
      setTimeout(() => step === 1 && go(2), 280);
    }),
  );
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'TEXTAREA' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      form.requestSubmit();
    }
    if (step === 1 && /^[1-4]$/.test(e.key)) {
      const r = radios[Number(e.key) - 1];
      r.checked = true;
      r.dispatchEvent(new Event('change'));
    }
  });
  // El paso 2 no tiene campo de texto: Enter sobre un radio también avanza.
}
