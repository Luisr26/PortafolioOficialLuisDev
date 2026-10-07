/**
 * Genera los assets estáticos derivados: imagen OG (PNG 1200×630), apple-touch-icon y retrato WebP para JSON-LD.
 * Uso: npm run assets
 */
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const C = { bg: '#1A1E23', surface: '#22272E', line: '#353C46', ink: '#E4E8ED', ink2: '#97A0AC', accent: '#FF6B3D' };
const out = new URL('../public/', import.meta.url);
const file = (rel) => fileURLToPath(new URL(rel, out));
await mkdir(new URL('og/', out), { recursive: true });

// Fuente de letrero condensada disponible en el sistema (fallback genérico si no existe).
const SIGN = "Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif";
const MONO = "Consolas, 'Courier New', monospace";

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.bg}"/>
  <g opacity=".06" stroke="${C.ink}">
    ${Array.from({ length: 40 }, (_, i) => `<line x1="${i * 40 - 400}" y1="630" x2="${i * 40 + 230}" y2="0"/>`).join('')}
  </g>
  <text x="64" y="86" font-family="${MONO}" font-size="22" letter-spacing="3" fill="${C.ink2}">PORTAFOLIO — BARRANQUILLA, CO</text>
  <text x="56" y="330" font-family="${SIGN}" font-size="230" fill="${C.ink}" letter-spacing="-2">LUIS</text>
  <text x="56" y="520" font-family="${SIGN}" font-size="230" fill="${C.ink}" letter-spacing="-2">OROZCO<tspan fill="${C.accent}">.</tspan></text>
  <line x1="64" y1="560" x2="1136" y2="560" stroke="${C.line}" stroke-width="2"/>
  <text x="64" y="598" font-family="${MONO}" font-size="22" letter-spacing="2" fill="${C.ink}">IA · AUTOMATIZACIÓN · FULL-STACK</text>
  <g transform="translate(905 120) rotate(-6)">
    <rect width="230" height="70" rx="6" fill="${C.accent}"/>
    <text x="115" y="50" text-anchor="middle" font-family="${SIGN}" font-size="44" letter-spacing="4" fill="${C.bg}">ABIERTO</text>
  </g>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(file('og/og-default.png'));

const icon = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${C.bg}"/>
  <path fill="${C.ink}" d="M14 14h9v28h13v8H14z"/>
  <rect x="38" y="42" width="8" height="8" fill="${C.accent}"/>
</svg>`;
await sharp(Buffer.from(icon(180))).png().toFile(file('apple-touch-icon.png'));
await sharp(Buffer.from(icon(192))).png().toFile(file('icon-192.png'));
await sharp(Buffer.from(icon(512))).png().toFile(file('icon-512.png'));

const portrait = await readFile(new URL('../src/assets/images/luis-orozco.webp', import.meta.url));
await sharp(portrait).resize(344, 344).webp({ quality: 82 }).toFile(file('og/luis-orozco.webp'));

console.log('Assets generados en /public');
