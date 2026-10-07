/* Dock de versiones para los prototipos.
   Uso: <script src="versions.js" data-proto="a" data-version="v2"></script>
   Agregar una versión nueva = sumar una entrada en VERSIONS. */
(() => {
  const VERSIONS = {
    a: {
      name: 'A · Letrero',
      pals: {
        pizarra: ['Pizarra', '#1A1E23', '#FF6B3D'],
        grafito: ['Grafito', '#161513', '#FF5A2B'],
        oliva: ['Oliva', '#191B16', '#E8B04B'],
        arena: ['Arena', '#D6D1C4', '#C83C17'],
        papel: ['Papel', '#F2F0EB', '#FF4D1C'],
      },
      list: [
        { v: 'v1', file: 'a-v1.html', date: '2026-09-30', title: 'Base',
          changes: [
            'Hero con nombre gigante de ancho variable que se deforma con el scroll',
            'Banda naranja tipo cinta de señalización',
            'Carril horizontal anclado para proyectos',
            'Proceso con líneas que se dibujan',
            'Formulario conversacional de B (4 pasos y sello "Recibido")',
            '5 paletas; Grafito por defecto',
          ] },
        { v: 'v2', file: 'a-v2.html', date: '2026-09-30', title: 'Avanzado',
          changes: [
            'Pantalla de carga con contador 000→100 y telón que sube',
            'Letras del nombre que se ensanchan al acercar el cursor (letrero vivo)',
            'Cursor propio con etiqueta contextual ("Ver", "Abrir")',
            'Scroll suave con inercia (Lenis)',
            'Dos cintas cruzadas que se mueven en sentidos opuestos',
            'Etiquetas que se "re-imprimen" con efecto de código al entrar en vista',
            'Métricas con contador animado',
            'Proyectos: contador 01/04 fijo, barra de avance e inclinación según la velocidad del scroll',
            'Servicios: lista con vista previa flotante que sigue al cursor',
            'Contacto: carta en vivo que se escribe mientras respondes; atajos 1–4',
            'Botones magnéticos, grano de película y reloj local en el footer',
          ] },
        { v: 'v3', file: 'a-v3.html', date: '2026-09-30', title: 'Final',
          changes: [
            'Paleta Pizarra por defecto (elegida)',
            'Fuera las métricas con contador: en su lugar, tablero "Ahora mismo" (construyendo, aprendiendo, fuera del código)',
            'Fuera el punto parpadeante de "Disponible": en su lugar, un letrero colgante de puerta "ABIERTO" que se balancea y gira a "ESCRÍBEME →"',
          ] },
      ],
    },
  };

  window.PROTO_VERSIONS = VERSIONS;
  const me = document.currentScript;
  const proto = VERSIONS[me.dataset.proto];
  const cur = me.dataset.version;
  const qp = new URLSearchParams(location.search);
  if (!proto) return;

  // --- Paleta: ?pal= > guardada > primera ---
  const key = `proto-${me.dataset.proto}-pal-v3`; // clave nueva: arranca en Pizarra
  const palIds = Object.keys(proto.pals);
  let saved = null; try { saved = localStorage.getItem(key); } catch (e) {}
  const setPal = p => {
    if (!proto.pals[p]) p = palIds[0];
    document.documentElement.dataset.pal = p;
    try { localStorage.setItem(key, p); } catch (e) {}
    dock && dock.querySelectorAll('[data-p]').forEach(b => b.classList.toggle('on', b.dataset.p === p));
    dock && (dock.querySelector('.vd-pname').textContent = proto.pals[p][0]);
  };
  let dock = null;
  setPal(qp.get('pal') || saved);
  window.setPal = setPal;

  // Embebido (miniaturas / comparador): sin dock
  if (qp.has('embed')) { document.documentElement.classList.add('embedded'); return; }

  const idx = proto.list.findIndex(x => x.v === cur);
  const ver = proto.list[idx];
  const prev = proto.list[idx - 1];

  const css = `
  .vd{position:fixed;left:50%;bottom:14px;translate:-50% 0;z-index:9999;font:500 12px/1.3 "Geist","Inter",system-ui,sans-serif;color:#EDEDED;
    -webkit-font-smoothing:antialiased;max-width:calc(100vw - 24px)}
  .vd *{box-sizing:border-box}
  .vd-bar{display:flex;align-items:center;gap:6px;padding:6px;border-radius:999px;background:rgba(14,14,15,.82);backdrop-filter:blur(14px) saturate(1.4);
    -webkit-backdrop-filter:blur(14px) saturate(1.4);border:1px solid rgba(255,255,255,.1);box-shadow:0 12px 40px -12px rgba(0,0,0,.6);overflow-x:auto;scrollbar-width:none}
  .vd-bar::-webkit-scrollbar{display:none}
  .vd-name{padding:0 10px 0 12px;white-space:nowrap;color:#9A9AA2;font-family:"Geist Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
  .vd-sep{width:1px;height:20px;background:rgba(255,255,255,.12);flex:none;margin:0 4px}
  .vd a,.vd button{font:inherit;color:inherit;text-decoration:none;border:1px solid transparent;background:transparent;cursor:pointer;border-radius:999px;padding:7px 12px;white-space:nowrap;transition:background .2s,color .2s}
  .vd a:hover,.vd button:hover{background:rgba(255,255,255,.08)}
  .vd .vd-v{border-color:rgba(255,255,255,.14);color:#9A9AA2}
  .vd .vd-v.on{background:#EDEDED;color:#0E0E0F;border-color:#EDEDED}
  .vd .vd-sw{width:22px;height:22px;padding:0;border:0;flex:none;background:linear-gradient(135deg,var(--b) 50%,var(--a) 50%)}
  .vd .vd-sw.on{outline:2px solid #EDEDED;outline-offset:2px}
  .vd .vd-sw:hover{background:linear-gradient(135deg,var(--b) 50%,var(--a) 50%);transform:scale(1.1)}
  .vd-pname{font-family:"Geist Mono",ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.06em;padding:0 8px;min-width:64px;color:#9A9AA2}
  .vd-panel{position:absolute;left:50%;bottom:calc(100% + 10px);translate:-50% 0;width:min(560px,calc(100vw - 24px));max-height:min(60vh,520px);overflow:auto;
    padding:20px;border-radius:18px;background:rgba(14,14,15,.94);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.1);box-shadow:0 20px 60px -20px rgba(0,0,0,.7);
    opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .25s,transform .25s}
  .vd.open .vd-panel{opacity:1;transform:none;pointer-events:auto}
  .vd-panel h4{font-size:15px;font-weight:600;margin:0 0 2px}
  .vd-panel .vd-meta{font-family:"Geist Mono",ui-monospace,monospace;font-size:11px;color:#9A9AA2;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
  .vd-panel ul{list-style:none;margin:0 0 18px;padding:0;display:grid;gap:7px}
  .vd-panel li{padding-left:18px;position:relative;color:#CFCFD4;font-size:13px;line-height:1.45}
  .vd-panel li::before{content:"+";position:absolute;left:0;color:#7CFF9B;font-family:"Geist Mono",monospace}
  .vd-panel .vd-old li{color:#7E7E86}.vd-panel .vd-old li::before{content:"·";color:#7E7E86}
  .vd-panel .vd-cmp{display:inline-block;margin-top:4px;border:1px solid rgba(255,255,255,.18)}
  @media (max-width:640px){.vd-name,.vd-pname{display:none}}
  @media print{.vd{display:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.append(st);

  dock = document.createElement('div');
  dock.className = 'vd';
  dock.setAttribute('role', 'region');
  dock.setAttribute('aria-label', 'Versiones del prototipo');
  const cmp = prev ? `comparar.html?p=${me.dataset.proto}&l=${prev.v}&r=${cur}` : `comparar.html?p=${me.dataset.proto}`;
  dock.innerHTML = `
    <div class="vd-panel" id="vd-panel">
      <h4>${proto.name} — ${ver.v} · ${ver.title}</h4>
      <div class="vd-meta">${ver.date}${prev ? ` · Cambios respecto a ${prev.v}` : ' · Primera versión'}</div>
      <ul>${ver.changes.map(c => `<li>${c}</li>`).join('')}</ul>
      ${proto.list.filter(x => x.v !== cur).map(o => `<h4 style="font-size:13px">${o.v} · ${o.title}</h4><ul class="vd-old">${o.changes.map(c => `<li>${c}</li>`).join('')}</ul>`).join('')}
      <a class="vd-cmp" href="${cmp}">Comparar lado a lado →</a>
    </div>
    <div class="vd-bar">
      <a class="vd-name" href="index.html" title="Volver a prototipos">${proto.name}</a>
      ${proto.list.map(x => `<a class="vd-v${x.v === cur ? ' on' : ''}" href="${x.file}" title="${x.title}">${x.v}</a>`).join('')}
      <span class="vd-sep"></span>
      <button class="vd-tog" aria-expanded="false" aria-controls="vd-panel">Cambios</button>
      <a href="${cmp}">Comparar</a>
      <span class="vd-sep"></span>
      ${palIds.map(p => `<button class="vd-sw" data-p="${p}" title="${proto.pals[p][0]}" style="--b:${proto.pals[p][1]};--a:${proto.pals[p][2]}"></button>`).join('')}
      <span class="vd-pname"></span>
    </div>`;
  document.body.append(dock);
  setPal(document.documentElement.dataset.pal);

  const tog = dock.querySelector('.vd-tog');
  tog.addEventListener('click', () => { const o = dock.classList.toggle('open'); tog.setAttribute('aria-expanded', o); });
  dock.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b) setPal(b.dataset.p); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { dock.classList.remove('open'); tog.setAttribute('aria-expanded', false); } });
  document.addEventListener('click', e => { if (!dock.contains(e.target)) { dock.classList.remove('open'); tog.setAttribute('aria-expanded', false); } });


})();
