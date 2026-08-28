/* =========================================================
   art.js — Generación procedural de arte (SVG puro)
   ---------------------------------------------------------
   SUJOM no incluye ningún asset binario. Todos los retratos,
   chibis, fotografías y cámaras se dibujan como SVG a partir
   de los datos del personaje. Así el arte reacciona a la
   expresión, a la ruta y al nivel de corrupción.
   ========================================================= */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------------------------------------------------
   Paletas de piel y utilidades de color
   --------------------------------------------------------- */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/* ---------------------------------------------------------
   OJOS — cada expresión cambia forma, brillo y ceja
   --------------------------------------------------------- */
function eyes(expr, color) {
  const dark = shade(color, -60);
  const lid = '#2a2233';

  // Ojo abierto estándar (parametrizable en altura)
  const open = (cx, h = 8.5, tilt = 0) => `
    <g transform="translate(${cx},52) rotate(${tilt})">
      <ellipse cx="0" cy="0" rx="5.4" ry="${h}" fill="#fdfbff"/>
      <ellipse cx="0" cy="${h * 0.06}" rx="4.1" ry="${h * 0.82}" fill="${color}"/>
      <ellipse cx="0" cy="${h * 0.12}" rx="2.2" ry="${h * 0.45}" fill="${dark}"/>
      <circle cx="-1.5" cy="${-h * 0.34}" r="1.7" fill="#fff" opacity=".95"/>
      <circle cx="1.4" cy="${h * 0.34}" r=".8" fill="#fff" opacity=".55"/>
      <path d="M-6 ${-h * 0.75} Q0 ${-h * 1.25} 6 ${-h * 0.75}" stroke="${lid}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>`;

  const closedHappy = (cx, dir = 1) => `
    <path d="M${cx - 6} 53 Q${cx} ${53 - 6 * dir} ${cx + 6} 53"
      stroke="${lid}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;

  const closedFlat = (cx) => `
    <path d="M${cx - 6} 52 L${cx + 6} 52" stroke="${lid}" stroke-width="2.4" stroke-linecap="round"/>`;

  const brow = (cx, y, rot, w = 9) => `
    <path d="M${cx - w / 2} ${y} Q${cx} ${y - 1.6} ${cx + w / 2} ${y - 0.4}"
      stroke="${lid}" stroke-width="2" fill="none" stroke-linecap="round"
      transform="rotate(${rot} ${cx} ${y})" opacity=".9"/>`;

  const L = 37, R = 63;

  switch (expr) {
    case 'happy':
      return closedHappy(L) + closedHappy(R) + brow(L, 41, -4) + brow(R, 41, 4);
    case 'shy':
    case 'embarrassed':
      return open(L, 7.6) + open(R, 7.6) + brow(L, 40, 10) + brow(R, 40, -10);
    case 'angry':
      return open(L, 7.2) + open(R, 7.2) + brow(L, 42, 22, 10) + brow(R, 42, -22, 10);
    case 'sad':
      return open(L, 8.8) + open(R, 8.8) + brow(L, 41, -20) + brow(R, 41, 20);
    case 'worried':
      return open(L, 8) + open(R, 8) + brow(L, 41, -14) + brow(R, 41, 14);
    case 'vulnerable':
      return open(L, 9.4) + open(R, 9.4) + brow(L, 40.5, -17) + brow(R, 40.5, 17) +
        `<circle cx="${L - 5.5}" cy="59" r="1.5" fill="#a8d8ff" opacity=".8"/>`;
    case 'shocked':
      return open(L, 10.5) + open(R, 10.5) + brow(L, 38, -6) + brow(R, 38, 6);
    case 'smug':
      return closedFlat(L) + open(R, 7) + brow(L, 41, -12) + brow(R, 41, 12);
    case 'tired':
      return open(L, 6.2) + open(R, 6.2) + brow(L, 42, -6) + brow(R, 42, 6) +
        `<path d="M31 60 L43 60 M57 60 L69 60" stroke="#6a5a72" stroke-width="1.2" opacity=".5" stroke-linecap="round"/>`;
    case 'sleep':
      return closedFlat(L) + closedFlat(R) + brow(L, 42, 0) + brow(R, 42, 0);
    default:
      return open(L) + open(R) + brow(L, 41, -6) + brow(R, 41, 6);
  }
}

/* ---------------------------------------------------------
   BOCA
   --------------------------------------------------------- */
function mouth(expr) {
  const c = '#8a3f52';
  switch (expr) {
    case 'happy': return `<path d="M45 69 Q50 74.5 55 69" stroke="${c}" stroke-width="2" fill="#5e2233" stroke-linecap="round"/>`;
    case 'angry': return `<path d="M45 71 Q50 67.5 55 71" stroke="${c}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    case 'sad':
    case 'vulnerable': return `<path d="M46 71 Q50 68.6 54 71" stroke="${c}" stroke-width="1.9" fill="none" stroke-linecap="round"/>`;
    case 'shocked': return `<ellipse cx="50" cy="70.5" rx="3.4" ry="4.4" fill="#5e2233"/>`;
    case 'smug': return `<path d="M45 69.5 Q49 72.5 55 68.6" stroke="${c}" stroke-width="1.9" fill="none" stroke-linecap="round"/>`;
    case 'shy':
    case 'embarrassed': return `<path d="M46.5 70 Q50 72 53.5 70" stroke="${c}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    case 'worried': return `<path d="M46 70.5 Q48 69 50 70.5 Q52 72 54 70.5" stroke="${c}" stroke-width="1.7" fill="none" stroke-linecap="round"/>`;
    case 'tired':
    case 'sleep': return `<path d="M46.5 70.5 L53.5 70.5" stroke="${c}" stroke-width="1.7" stroke-linecap="round"/>`;
    default: return `<path d="M46.5 70 Q50 71.8 53.5 70" stroke="${c}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  }
}

function blush(expr, tone) {
  const strong = ['shy', 'embarrassed', 'vulnerable', 'happy'].includes(expr);
  if (!strong && expr !== 'angry') return '';
  const o = expr === 'angry' ? 0.3 : strong ? 0.55 : 0.3;
  return `
    <ellipse cx="33" cy="63" rx="6.5" ry="3.6" fill="${tone}" opacity="${o}"/>
    <ellipse cx="67" cy="63" rx="6.5" ry="3.6" fill="${tone}" opacity="${o}"/>`;
}

/* ---------------------------------------------------------
   PELO — una función por estilo (trasero + delantero)
   --------------------------------------------------------- */
const HAIR = {
  // Ryu: negro, medio, mechones cayendo sobre la frente
  ryu(c) {
    const hi = shade(c, 46);
    return {
      back: `<path d="M22 52 Q19 22 50 19 Q81 22 78 52 L79 74 Q74 60 72 44 L28 44 Q26 60 21 74 Z" fill="${shade(c, -14)}"/>`,
      front: `
        <path d="M23 48 Q22 20 50 18 Q78 20 77 48 Q74 33 66 30 Q58 40 47 33 Q36 42 28 34 Q25 39 23 48 Z" fill="${c}"/>
        <path d="M31 30 Q38 42 33 52 L28 47 Z" fill="${c}"/>
        <path d="M57 27 Q60 41 66 48 L69 40 Q67 31 62 27 Z" fill="${c}"/>
        <path d="M44 24 Q50 34 45 44" stroke="${hi}" stroke-width="1.6" fill="none" opacity=".45" stroke-linecap="round"/>
        <path d="M60 25 Q66 32 68 40" stroke="${hi}" stroke-width="1.4" fill="none" opacity=".35" stroke-linecap="round"/>`
    };
  },
  // Kenta: puntas hacia arriba, mechón decolorado
  kenta(c, streak = '#f5d98a') {
    return {
      back: `<path d="M24 52 Q22 26 50 22 Q78 26 76 52 L77 66 Q72 54 70 44 L30 44 Q28 54 23 66 Z" fill="${shade(c, -46)}"/>`,
      front: `
        <path d="M24 47 Q23 22 50 19 Q77 22 76 47
                 Q73 36 68 34 L71 24 L62 32 L58 21 L52 31 L45 20 L41 32 L33 23 L34 34 Q26 37 24 47 Z"
              fill="${c}" stroke="${shade(c, -62)}" stroke-width="1.3" stroke-linejoin="round"/>
        <!-- mechón decolorado cayendo sobre la frente, no una corona -->
        <path d="M56 24 Q62 32 60 46 Q57 49 54 46 Q56 34 52 27 Z" fill="${streak}"/>
        <path d="M56 24 Q60 30 59 40" stroke="${shade(streak, 30)}" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/>`
    };
  },
  // Lara: rosa, largo con flequillo y dos mechones al frente
  lara(c) {
    const hi = shade(c, 40);
    return {
      back: `<path d="M18 56 Q14 24 50 19 Q86 24 82 56 L84 88 Q70 76 72 50 L28 50 Q30 76 16 88 Z" fill="${shade(c, -18)}"/>`,
      front: `
        <path d="M22 48 Q21 20 50 17 Q79 20 78 48 Q76 32 68 28 Q59 36 50 30 Q41 36 32 28 Q24 32 22 48 Z"
              fill="${c}" stroke="${shade(c, -58)}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M24 42 Q20 62 23 82 L31 78 Q27 60 30 44 Z" fill="${c}"/>
        <path d="M76 42 Q80 62 77 82 L69 78 Q73 60 70 44 Z" fill="${c}"/>
        <path d="M40 22 Q34 32 32 44" stroke="${hi}" stroke-width="1.8" fill="none" opacity=".5" stroke-linecap="round"/>
        <path d="M60 22 Q66 32 68 44" stroke="${hi}" stroke-width="1.8" fill="none" opacity=".5" stroke-linecap="round"/>
        <circle cx="72" cy="30" r="3.6" fill="#fff" opacity=".85"/>
        <circle cx="72" cy="30" r="1.8" fill="${shade(c, 30)}"/>`
    };
  },
  // Reiko: blanco, liso, raya al centro, muy largo
  reiko(c) {
    const hi = shade(c, -22);
    return {
      back: `<path d="M17 56 Q13 22 50 18 Q87 22 83 56 L86 92 Q72 84 74 52 L26 52 Q28 84 14 92 Z" fill="${shade(c, -14)}"/>`,
      front: `
        <path d="M21 50 Q20 19 50 16 Q80 19 79 50 Q76 30 68 26 L50 22 L32 26 Q24 30 21 50 Z"
              fill="${c}" stroke="${shade(c, -52)}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M50 22 L44 46 L38 42 Q40 30 50 22 Z" fill="${shade(c, -8)}"/>
        <path d="M50 22 L56 46 L62 42 Q60 30 50 22 Z" fill="${shade(c, -8)}"/>
        <path d="M22 44 Q18 66 20 86 L28 82 Q24 62 27 46 Z" fill="${c}"/>
        <path d="M78 44 Q82 66 80 86 L72 82 Q76 62 73 46 Z" fill="${c}"/>
        <path d="M35 26 Q30 40 29 54" stroke="${hi}" stroke-width="1.5" fill="none" opacity=".4" stroke-linecap="round"/>`
    };
  },
  // Jugador / genérico
  neutral(c) {
    return {
      back: `<path d="M23 52 Q21 24 50 20 Q79 24 77 52 L78 70 Q73 56 71 44 L29 44 Q27 56 22 70 Z" fill="${shade(c, -16)}"/>`,
      front: `<path d="M23 48 Q22 21 50 18 Q78 21 77 48 Q73 32 62 30 Q50 38 38 30 Q27 32 23 48 Z" fill="${c}"/>`
    };
  }
};

/* ---------------------------------------------------------
   ACCESORIOS
   --------------------------------------------------------- */
const ACC = {
  cross: `<g opacity=".95">
      <path d="M38 96 Q50 102 62 96" stroke="#c9c4d8" stroke-width="1.1" fill="none"/>
      <rect x="48.7" y="96" width="2.6" height="9" rx=".8" fill="#e8c87a"/>
      <rect x="45.6" y="98.6" width="8.8" height="2.5" rx=".8" fill="#e8c87a"/>
    </g>`,
  earrings: `<g>
      <circle cx="24.5" cy="66" r="1.9" fill="#e8dcff"/><circle cx="75.5" cy="66" r="1.9" fill="#e8dcff"/>
      <path d="M24.5 68 L24.5 74" stroke="#e8dcff" stroke-width="1"/><path d="M75.5 68 L75.5 74" stroke="#e8dcff" stroke-width="1"/>
      <circle cx="24.5" cy="75.5" r="2.4" fill="#b28cff"/><circle cx="75.5" cy="75.5" r="2.4" fill="#b28cff"/>
    </g>`,
  studs: `<circle cx="25" cy="66" r="2.2" fill="#ff9d6e"/><circle cx="25" cy="71" r="1.6" fill="#ffd4b8"/>`,
  clip: `<g transform="translate(70,34) rotate(14)">
      <rect x="-6" y="-2.5" width="12" height="5" rx="2.5" fill="#fff" opacity=".9"/>
      <circle cx="0" cy="0" r="1.8" fill="#ff5f9e"/></g>`,
  /* Lazo azul de Lara */
  bow: `<g transform="translate(69,27) rotate(12)">
      <path d="M0 0 L-11 -6 L-11 6 Z" fill="#6db3f2"/>
      <path d="M0 0 L11 -6 L11 6 Z" fill="#8ec7f7"/>
      <path d="M-2 1 L-6 12" stroke="#6db3f2" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M2 1 L7 11" stroke="#8ec7f7" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="3.1" fill="#bcdcff"/></g>`,
  /* Gargantilla de Kenta */
  choker: `<g>
      <path d="M38 92 Q50 99 62 92" stroke="#17131f" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M38 92 Q50 99 62 92" stroke="#3a3348" stroke-width="1.2" fill="none"/>
      <rect x="47.4" y="95.5" width="5.2" height="5.2" rx="1.2" fill="#c9c4d8" transform="rotate(45 50 98)"/>
    </g>`
};

/* ---------------------------------------------------------
   ROPA (hombros) — sugerida, recortada por el marco
   --------------------------------------------------------- */
function shoulders(spec) {
  const a = spec.clothes || '#2b2740';
  const b = shade(a, -22);
  return `
    <path d="M50 88 C30 88 16 96 12 112 L88 112 C84 96 70 88 50 88 Z" fill="${a}"/>
    <path d="M50 88 L44 100 L50 112 L56 100 Z" fill="${b}"/>
    <path d="M50 88 C42 88 36 91 33 95 L38 112 L26 112 C26 100 34 90 50 88 Z" fill="${shade(a, 14)}" opacity=".55"/>`;
}

/* ---------------------------------------------------------
   RETRATO PRINCIPAL
   --------------------------------------------------------- */
export function portrait(spec, expr = 'neutral', opts = {}) {
  const s = spec || {};
  const skin = s.skin || '#f6d9c2';
  const hairC = s.hair || '#2a2733';
  const eyeC = s.eyes || '#4fd1c5';
  const styleFn = HAIR[s.hairStyle] || HAIR.neutral;
  const h = styleFn(hairC, s.streak);
  const glitch = opts.glitch || 0;
  const uid = 'p' + Math.random().toString(36).slice(2, 8);

  const bg = s.accent || '#4fd1c5';

  return `<svg viewBox="0 0 100 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(s.name || '')}">
    <defs>
      <linearGradient id="bg${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${shade(bg, -110)}"/>
        <stop offset="100%" stop-color="#131024"/>
      </linearGradient>
      <radialGradient id="gl${uid}" cx="50%" cy="26%" r="62%">
        <stop offset="0%" stop-color="${bg}" stop-opacity=".3"/>
        <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="cp${uid}"><rect width="100" height="112"/></clipPath>
    </defs>
    <g clip-path="url(#cp${uid})">
      <rect width="100" height="112" fill="url(#bg${uid})"/>
      <rect width="100" height="112" fill="url(#gl${uid})"/>
      ${h.back}
      ${shoulders(s)}
      <!-- cuello -->
      <path d="M42 76 L42 90 Q50 95 58 90 L58 76 Z" fill="${shade(skin, -22)}"/>
      <!-- cara -->
      <path d="M50 26 C67 26 74 39 74 52 C74 68 64 82 50 82 C36 82 26 68 26 52 C26 39 33 26 50 26 Z" fill="${skin}"/>
      <!-- orejas -->
      <ellipse cx="25.6" cy="57" rx="3.2" ry="5" fill="${skin}"/>
      <ellipse cx="74.4" cy="57" rx="3.2" ry="5" fill="${skin}"/>
      <!-- sombra del flequillo -->
      <path d="M26 46 Q50 56 74 46 L74 40 Q50 46 26 40 Z" fill="${shade(skin, -26)}" opacity=".35"/>
      ${blush(expr, s.blush || '#ff8fa8')}
      ${eyes(expr, eyeC)}
      <!-- nariz -->
      <path d="M50 60 L48.4 64 L51.2 64" stroke="${shade(skin, -48)}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".7"/>
      ${mouth(expr)}
      ${h.front}
      ${s.acc ? (ACC[s.acc] || '') : ''}
      ${s.acc2 ? (ACC[s.acc2] || '') : ''}
      ${glitch >= 3 ? `<rect y="${34 + (glitch * 5) % 40}" width="100" height="4" fill="${bg}" opacity=".35" style="mix-blend-mode:screen"/>` : ''}
      ${glitch >= 4 ? `<rect y="62" width="100" height="2.5" fill="#ff5a6e" opacity=".45"/>` : ''}
    </g>
  </svg>`;
}

/* ---------------------------------------------------------
   CHIBI — cabeza grande, cuerpo mínimo. Se usa en el hub,
   listas, notificaciones y tarjetas.
   --------------------------------------------------------- */
export function chibi(spec, expr = 'neutral', opts = {}) {
  const s = spec || {};
  const skin = s.skin || '#f6d9c2';
  const hairC = s.hair || '#2a2733';
  const eyeC = s.eyes || '#4fd1c5';
  const cloth = s.clothes || '#2b2740';
  const styleFn = HAIR[s.hairStyle] || HAIR.neutral;
  const h = styleFn(hairC, s.streak);
  const uid = 'c' + Math.random().toString(36).slice(2, 8);
  const bg = s.accent || '#4fd1c5';
  const g = opts.glitch || 0;

  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(s.name || '')}">
    <defs>
      <linearGradient id="cb${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${shade(bg, -104)}"/>
        <stop offset="100%" stop-color="#100e1e"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#cb${uid})"/>
    <circle cx="50" cy="34" r="46" fill="${bg}" opacity=".1"/>
    <!-- cuerpo diminuto -->
    <g transform="translate(0,4)">
      <path d="M50 74 C38 74 31 80 29 92 L71 92 C69 80 62 74 50 74 Z" fill="${cloth}"/>
      <circle cx="28" cy="84" r="4.6" fill="${skin}"/>
      <circle cx="72" cy="84" r="4.6" fill="${skin}"/>
    </g>
    <!-- cabeza escalada -->
    <g transform="translate(50,44) scale(1.16) translate(-50,-52)">
      ${h.back}
      <path d="M43 74 L43 84 Q50 88 57 84 L57 74 Z" fill="${shade(skin, -22)}"/>
      <path d="M50 26 C67 26 74 39 74 52 C74 68 64 80 50 80 C36 80 26 68 26 52 C26 39 33 26 50 26 Z" fill="${skin}"/>
      <ellipse cx="25.6" cy="57" rx="3" ry="4.6" fill="${skin}"/>
      <ellipse cx="74.4" cy="57" rx="3" ry="4.6" fill="${skin}"/>
      ${blush(expr === 'neutral' ? 'happy' : expr, s.blush || '#ff8fa8')}
      ${eyes(expr, eyeC)}
      ${mouth(expr)}
      ${h.front}
      ${s.acc === 'clip' ? ACC.clip : ''}
    </g>
    ${g >= 2 ? `<rect y="${20 + (g * 11) % 60}" width="100" height="3" fill="#5fe3ff" opacity=".3" style="mix-blend-mode:screen"/>` : ''}
    ${g >= 4 ? `<rect width="100" height="100" fill="#ff5a6e" opacity=".07"/>` : ''}
  </svg>`;
}

/* ---------------------------------------------------------
   RETRATO "REAL" — para la videollamada.
   Mismo personaje, pero agotado: sin brillo, con ojeras,
   pelo revuelto, ropa de hospital, luz cruda.
   --------------------------------------------------------- */
export function realPortrait(spec, mood = 'tired') {
  const s = spec || {};
  const skin = shade(s.skin || '#f6d9c2', -26);
  const hairC = shade(s.hair || '#2a2733', -18);
  const styleFn = HAIR[s.hairStyle] || HAIR.neutral;
  const h = styleFn(hairC, s.streak ? shade(s.streak, -40) : undefined);
  const uid = 'r' + Math.random().toString(36).slice(2, 8);

  return `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lamp${uid}" cx="50%" cy="18%" r="70%">
        <stop offset="0%" stop-color="#5a6a72" stop-opacity=".5"/>
        <stop offset="100%" stop-color="#05070a" stop-opacity="1"/>
      </radialGradient>
      <filter id="gr${uid}"><feTurbulence baseFrequency=".9" numOctaves="2"/><feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width="100" height="130" fill="#070a0d"/>
    <rect width="100" height="130" fill="url(#lamp${uid})"/>
    <!-- pasillo de fondo -->
    <path d="M0 74 L34 62 L66 62 L100 74 L100 130 L0 130 Z" fill="#0c1116"/>
    <rect x="34" y="40" width="32" height="24" fill="#0a0e12"/>
    <rect x="44" y="30" width="12" height="3" fill="#8fb4c0" opacity=".28"/>
    <g transform="translate(0,16)">
      ${h.back}
      <path d="M50 88 C30 88 18 96 14 116 L86 116 C82 96 70 88 50 88 Z" fill="#c9cdd2"/>
      <path d="M50 88 L44 102 L50 116 L56 102 Z" fill="#a8adb4"/>
      <path d="M42 76 L42 90 Q50 95 58 90 L58 76 Z" fill="${shade(skin, -22)}"/>
      <path d="M50 26 C67 26 74 39 74 52 C74 68 64 82 50 82 C36 82 26 68 26 52 C26 39 33 26 50 26 Z" fill="${skin}"/>
      <ellipse cx="25.6" cy="57" rx="3.2" ry="5" fill="${skin}"/>
      <ellipse cx="74.4" cy="57" rx="3.2" ry="5" fill="${skin}"/>
      <!-- ojeras -->
      <path d="M31 59 Q37 63 43 59" stroke="#6a5560" stroke-width="1.6" fill="none" opacity=".6"/>
      <path d="M57 59 Q63 63 69 59" stroke="#6a5560" stroke-width="1.6" fill="none" opacity=".6"/>
      ${eyes(mood === 'scared' ? 'shocked' : mood === 'relief' ? 'vulnerable' : 'tired', shade(s.eyes || '#4fd1c5', -30))}
      <path d="M50 60 L48.4 64 L51.2 64" stroke="${shade(skin, -48)}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".7"/>
      ${mouth(mood === 'scared' ? 'shocked' : mood === 'relief' ? 'sad' : 'tired')}
      ${h.front}
      <!-- suciedad / marcas -->
      <path d="M62 66 L70 72" stroke="#8a4a52" stroke-width="1.4" opacity=".55" stroke-linecap="round"/>
      <ellipse cx="36" cy="72" rx="4" ry="2" fill="#6b5a52" opacity=".28"/>
      <!-- electrodo en la sien -->
      <circle cx="30" cy="45" r="2.6" fill="#d8d8dc" opacity=".85"/>
      <path d="M28 45 L14 38" stroke="#7a7a86" stroke-width="1.1" opacity=".7"/>
    </g>
    <rect width="100" height="130" filter="url(#gr${uid})" opacity=".07"/>
  </svg>`;
}

/* ---------------------------------------------------------
   FOTOGRAFÍAS — escenas procedurales.
   `corrupt` inyecta la anomalía que convierte la foto
   romántica en prueba.
   --------------------------------------------------------- */
const SCENES = {
  fireworks(u) {
    const burst = (x, y, c, r) => {
      let p = '';
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        p += `<line x1="${x}" y1="${y}" x2="${x + Math.cos(a) * r}" y2="${y + Math.sin(a) * r}" stroke="${c}" stroke-width="1.1" opacity=".85" stroke-linecap="round"/>`;
        p += `<circle cx="${x + Math.cos(a) * r}" cy="${y + Math.sin(a) * r}" r="1.3" fill="${c}"/>`;
      }
      return p;
    };
    return `<rect width="160" height="160" fill="#080a1e"/>
      <rect width="160" height="160" fill="url(#sky${u})"/>
      ${burst(52, 46, '#ffd36e', 24)}${burst(108, 34, '#ff7fb6', 18)}${burst(88, 74, '#7fe3ff', 13)}
      <path d="M0 128 L26 118 L48 126 L74 112 L102 124 L130 114 L160 126 L160 160 L0 160 Z" fill="#04050e"/>
      <rect x="18" y="130" width="5" height="14" fill="#0d1020"/><rect x="19" y="132" width="1.6" height="2" fill="#ffd36e"/>
      <rect x="118" y="126" width="6" height="18" fill="#0d1020"/><rect x="119.5" y="129" width="1.6" height="2" fill="#ffd36e"/>
      <ellipse cx="80" cy="152" rx="70" ry="7" fill="#151a34" opacity=".7"/>`;
  },
  dog(u) {
    return `<rect width="160" height="160" fill="#f3ead9"/>
      <ellipse cx="80" cy="140" rx="66" ry="14" fill="#e2d3ba"/>
      <ellipse cx="80" cy="96" rx="40" ry="32" fill="#e8b877"/>
      <ellipse cx="80" cy="60" rx="27" ry="24" fill="#efc488"/>
      <ellipse cx="59" cy="52" rx="9" ry="16" fill="#c99154" transform="rotate(-18 59 52)"/>
      <ellipse cx="101" cy="52" rx="9" ry="16" fill="#c99154" transform="rotate(18 101 52)"/>
      <circle cx="71" cy="58" r="3.4" fill="#3a2617"/><circle cx="89" cy="58" r="3.4" fill="#3a2617"/>
      <circle cx="72.2" cy="56.8" r="1.2" fill="#fff"/><circle cx="90.2" cy="56.8" r="1.2" fill="#fff"/>
      <ellipse cx="80" cy="69" rx="5" ry="3.6" fill="#2f1f14"/>
      <path d="M80 72.5 L80 76 M80 76 Q73 80 70 74 M80 76 Q87 80 90 74" stroke="#2f1f14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M74 78 Q80 86 86 78" fill="#ff8fa8" opacity=".85"/>
      <ellipse cx="58" cy="124" rx="9" ry="6" fill="#e8b877"/><ellipse cx="102" cy="124" rx="9" ry="6" fill="#e8b877"/>
      <path d="M118 100 Q134 88 128 74" stroke="#e8b877" stroke-width="9" fill="none" stroke-linecap="round"/>
      <rect x="62" y="86" width="36" height="8" rx="4" fill="#ff5f9e"/>
      <circle cx="80" cy="97" r="4.5" fill="#ffd36e"/>`;
  },
  ramen(u) {
    return `<rect width="160" height="160" fill="#2a2018"/>
      <ellipse cx="80" cy="86" rx="58" ry="48" fill="#3a2c20"/>
      <ellipse cx="80" cy="82" rx="52" ry="42" fill="#f2ede4"/>
      <ellipse cx="80" cy="84" rx="44" ry="34" fill="#c98b3f"/>
      <ellipse cx="80" cy="84" rx="40" ry="30" fill="#d9a05a"/>
      <g stroke="#f7e6c0" stroke-width="2.4" fill="none" stroke-linecap="round">
        <path d="M52 82 Q66 74 82 82"/><path d="M58 90 Q74 82 92 90"/><path d="M66 74 Q80 68 96 76"/>
      </g>
      <ellipse cx="60" cy="78" rx="12" ry="9" fill="#f6f0e2"/><ellipse cx="60" cy="78" rx="6" ry="5" fill="#f2b338"/>
      <rect x="88" y="70" width="22" height="16" rx="3" fill="#c66b4e" transform="rotate(-12 99 78)"/>
      <path d="M100 96 L118 92" stroke="#4c8f3a" stroke-width="4" stroke-linecap="round"/>
      <path d="M118 44 L142 30" stroke="#8a6a44" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M122 50 L146 36" stroke="#8a6a44" stroke-width="3.5" stroke-linecap="round"/>
      <g opacity=".3" fill="#fff"><ellipse cx="70" cy="46" rx="7" ry="12"/><ellipse cx="92" cy="38" rx="5" ry="9"/></g>`;
  },
  city(u) {
    return `<rect width="160" height="160" fill="url(#sky${u})"/>
      <g fill="#151a30">
        <rect x="4" y="70" width="26" height="90"/><rect x="34" y="52" width="20" height="108"/>
        <rect x="58" y="86" width="30" height="74"/><rect x="92" y="40" width="24" height="120"/>
        <rect x="120" y="76" width="18" height="84"/><rect x="142" y="60" width="18" height="100"/>
      </g>
      <g fill="#ffd36e" opacity=".8">
        <rect x="9" y="78" width="4" height="5"/><rect x="17" y="90" width="4" height="5"/><rect x="9" y="102" width="4" height="5"/>
        <rect x="39" y="60" width="4" height="5"/><rect x="47" y="72" width="4" height="5"/><rect x="39" y="96" width="4" height="5"/>
        <rect x="64" y="94" width="4" height="5"/><rect x="76" y="106" width="4" height="5"/>
        <rect x="97" y="50" width="4" height="5"/><rect x="106" y="64" width="4" height="5"/><rect x="97" y="88" width="4" height="5"/>
        <rect x="125" y="86" width="4" height="5"/><rect x="147" y="70" width="4" height="5"/>
      </g>
      <circle cx="126" cy="26" r="12" fill="#f5eecd" opacity=".9"/>
      <circle cx="121" cy="22" r="10" fill="#0b1024" opacity=".85"/>
      <rect y="140" width="160" height="20" fill="#0a0d1c"/>
      <g stroke="#ffd36e" stroke-width="1" opacity=".35"><path d="M0 148 L160 148"/></g>`;
  },
  coffee(u) {
    return `<rect width="160" height="160" fill="#e6ddd0"/>
      <rect y="104" width="160" height="56" fill="#7a5a42"/>
      <ellipse cx="76" cy="96" rx="40" ry="12" fill="#c9bcae"/>
      <path d="M40 92 Q40 60 76 60 Q112 60 112 92 Z" fill="#fbf7f1"/>
      <ellipse cx="76" cy="62" rx="34" ry="9" fill="#5a3a26"/>
      <ellipse cx="76" cy="62" rx="24" ry="6" fill="#8a5c3c"/>
      <path d="M70 60 Q76 54 82 60 Q76 66 70 60" fill="#f2e6d8"/>
      <path d="M112 70 Q130 74 126 86 Q122 94 112 90" stroke="#fbf7f1" stroke-width="7" fill="none"/>
      <rect x="8" y="70" width="26" height="34" rx="3" fill="#3a4a6a"/>
      <rect x="12" y="76" width="18" height="2" fill="#8fa8d0"/><rect x="12" y="82" width="14" height="2" fill="#8fa8d0"/>
      <rect x="12" y="88" width="16" height="2" fill="#8fa8d0"/>
      <g opacity=".35" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round">
        <path d="M66 50 Q70 42 66 34"/><path d="M78 48 Q82 38 78 30"/><path d="M90 52 Q94 44 90 36"/></g>`;
  },
  window(u) {
    return `<rect width="160" height="160" fill="#171426"/>
      <rect x="20" y="18" width="120" height="124" rx="4" fill="#0c1a26"/>
      <rect x="26" y="24" width="50" height="52" fill="url(#sky${u})"/>
      <rect x="84" y="24" width="50" height="52" fill="url(#sky${u})"/>
      <rect x="26" y="84" width="50" height="52" fill="url(#sky${u})"/>
      <rect x="84" y="84" width="50" height="52" fill="url(#sky${u})"/>
      <g fill="#0f1830"><rect x="30" y="52" width="14" height="24"/><rect x="52" y="44" width="18" height="32"/>
        <rect x="90" y="50" width="16" height="26"/><rect x="114" y="40" width="16" height="36"/></g>
      <g fill="#ffd36e" opacity=".7"><rect x="34" y="58" width="3" height="4"/><rect x="58" y="52" width="3" height="4"/>
        <rect x="96" y="58" width="3" height="4"/><rect x="120" y="48" width="3" height="4"/></g>
      <circle cx="112" cy="36" r="8" fill="#f5eecd" opacity=".8"/>
      <rect x="18" y="140" width="124" height="8" rx="2" fill="#2a2338"/>
      <ellipse cx="50" cy="136" rx="12" ry="5" fill="#3a2f4a"/>
      <path d="M50 136 L50 118 M50 124 Q42 118 44 112 M50 122 Q58 116 57 110" stroke="#4c8f5a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  },
  outfit(u) {
    return `<rect width="160" height="160" fill="#f6eef4"/>
      <rect x="14" y="14" width="132" height="132" rx="6" fill="#fdf8fb" stroke="#e8d2e0" stroke-width="2"/>
      <path d="M56 40 L80 52 L104 40 L124 56 L112 70 L110 132 L50 132 L48 70 L36 56 Z" fill="#ff9ec7"/>
      <path d="M56 40 L80 52 L104 40 L96 46 L80 60 L64 46 Z" fill="#ffc4dd"/>
      <rect x="66" y="92" width="28" height="4" rx="2" fill="#fff" opacity=".7"/>
      <circle cx="80" cy="74" r="3" fill="#fff" opacity=".8"/><circle cx="80" cy="86" r="3" fill="#fff" opacity=".8"/>
      <g transform="translate(30,120)"><path d="M0 12 Q6 0 14 6 Q22 0 26 12 Z" fill="#d8b4e8"/></g>
      <g transform="translate(112,116)"><circle cx="8" cy="8" r="8" fill="#ffe08a"/><circle cx="8" cy="8" r="4" fill="#fff3c9"/></g>`;
  },
  selfie(u, spec) {
    const face = portrait(spec || {}, 'happy');
    return `<rect width="160" height="160" fill="#1b1730"/>
      <g transform="translate(24,4) scale(1.1)">${face.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>
      <rect width="160" height="160" fill="url(#warm${u})" opacity=".25"/>
      <circle cx="132" cy="26" r="16" fill="#fff" opacity=".08"/>`;
  },
  hospital(u) {
    return `<rect width="160" height="160" fill="#dfe6e8"/>
      <rect y="96" width="160" height="64" fill="#cdd8dc"/>
      <rect x="16" y="52" width="128" height="48" rx="3" fill="#eef4f5"/>
      <rect x="16" y="52" width="128" height="10" fill="#9fc0c8"/>
      <rect x="24" y="66" width="112" height="4" rx="2" fill="#c3d2d6"/>
      <rect x="24" y="76" width="84" height="4" rx="2" fill="#c3d2d6"/>
      <rect x="24" y="86" width="96" height="4" rx="2" fill="#c3d2d6"/>
      <rect x="102" y="14" width="42" height="34" rx="3" fill="#f7fafa" stroke="#b8c8cc"/>
      <path d="M118 20 L128 20 L128 28 L136 28 L136 38 L128 38 L128 46 L118 46 L118 38 L110 38 L110 28 L118 28 Z" fill="#d94a5a"/>
      <rect x="16" y="14" width="72" height="34" rx="3" fill="#f7fafa" stroke="#b8c8cc"/>
      <g stroke="#8fa8ae" stroke-width="1.4" fill="none"><path d="M22 34 L34 34 L38 24 L44 44 L50 30 L56 34 L82 34"/></g>
      <rect x="30" y="112" width="100" height="36" rx="4" fill="#fff"/>
      <rect x="38" y="120" width="60" height="3" fill="#cbd7da"/>
      <rect x="38" y="128" width="76" height="3" fill="#cbd7da"/>
      <rect x="38" y="136" width="44" height="3" fill="#cbd7da"/>`;
  },
  lab(u) {
    return `<rect width="160" height="160" fill="#060a0e"/>
      <rect width="160" height="90" fill="#0a1119"/>
      <g stroke="#16303c" stroke-width="1"><path d="M0 90 L160 90"/><path d="M0 40 L160 40"/></g>
      <path d="M30 90 L54 60 L106 60 L130 90 Z" fill="#0d1a22"/>
      <!-- sillón neurocognitivo -->
      <g transform="translate(80,96)">
        <ellipse cx="0" cy="42" rx="46" ry="10" fill="#0a141a"/>
        <path d="M-26 40 L-18 -12 Q0 -22 18 -12 L26 40 Z" fill="#16232c"/>
        <path d="M-18 -12 Q0 -22 18 -12 L14 -30 Q0 -38 -14 -30 Z" fill="#1d2d38"/>
        <ellipse cx="0" cy="-26" rx="11" ry="13" fill="#26333c"/>
        <path d="M-11 -30 Q0 -44 11 -30" stroke="#3d5a68" stroke-width="3" fill="none"/>
        <path d="M-11 -28 L-34 -40 M11 -28 L34 -40" stroke="#2a4a58" stroke-width="1.6"/>
        <circle cx="-34" cy="-40" r="2.4" fill="#5fe3ff" opacity=".8"/><circle cx="34" cy="-40" r="2.4" fill="#5fe3ff" opacity=".8"/>
      </g>
      <rect x="6" y="14" width="34" height="24" rx="2" fill="#08171e" stroke="#1d3a46"/>
      <g stroke="#5fe3ff" stroke-width="1" fill="none" opacity=".7"><path d="M10 30 L16 30 L19 22 L23 36 L27 26 L30 30 L36 30"/></g>
      <rect x="120" y="14" width="34" height="24" rx="2" fill="#08171e" stroke="#1d3a46"/>
      <text x="137" y="30" font-family="monospace" font-size="9" fill="#5fe3ff" text-anchor="middle" opacity=".85">C-04</text>`;
  },
  door(u) {
    return `<rect width="160" height="160" fill="#0c1016"/>
      <rect x="34" y="24" width="92" height="124" rx="3" fill="#161e26" stroke="#26333c" stroke-width="2"/>
      <rect x="42" y="34" width="76" height="46" rx="2" fill="#0a1219"/>
      <rect x="46" y="38" width="68" height="38" fill="#0d1c24"/>
      <rect x="66" y="96" width="28" height="38" rx="3" fill="#0f1a22" stroke="#2c3d48"/>
      <g fill="#5fe3ff" opacity=".8">
        <rect x="71" y="102" width="5" height="5"/><rect x="79" y="102" width="5" height="5"/><rect x="87" y="102" width="5" height="5"/>
        <rect x="71" y="110" width="5" height="5"/><rect x="79" y="110" width="5" height="5"/><rect x="87" y="110" width="5" height="5"/>
        <rect x="71" y="118" width="5" height="5"/><rect x="79" y="118" width="5" height="5"/><rect x="87" y="118" width="5" height="5"/>
      </g>
      <circle cx="80" cy="88" r="3.4" fill="#ff5a6e"/>
      <text x="80" y="20" font-family="monospace" font-size="10" fill="#4a6a78" text-anchor="middle">SECTOR C</text>`;
  },
  fest(u) {
    return `<rect width="160" height="160" fill="#141026"/>
      <rect y="110" width="160" height="50" fill="#1c1730"/>
      <g><path d="M0 30 Q40 46 80 30 Q120 14 160 30" stroke="#f0c674" stroke-width="1.4" fill="none"/>
        ${[10, 30, 50, 70, 90, 110, 130, 150].map((x, i) => `<g transform="translate(${x},${32 + Math.sin(i) * 6})">
          <path d="M0 0 L-5 8 L5 8 Z" fill="${['#ff7fb6', '#ffd36e', '#7fe3ff', '#ff9d6e'][i % 4]}"/>
          <rect x="-5" y="8" width="10" height="12" rx="2" fill="${['#ff7fb6', '#ffd36e', '#7fe3ff', '#ff9d6e'][i % 4]}" opacity=".8"/>
          <circle cx="0" cy="14" r="3" fill="#fff" opacity=".5"/></g>`).join('')}</g>
      <g fill="#241d3c"><rect x="10" y="70" width="44" height="42" rx="3"/><rect x="62" y="64" width="40" height="48" rx="3"/><rect x="110" y="74" width="42" height="38" rx="3"/></g>
      <g fill="#ffd36e" opacity=".55"><rect x="16" y="78" width="32" height="4"/><rect x="68" y="72" width="28" height="4"/><rect x="116" y="82" width="30" height="4"/></g>
      <g fill="#0e0b1c"><ellipse cx="40" cy="132" rx="9" ry="18"/><ellipse cx="70" cy="136" rx="8" ry="16"/><ellipse cx="104" cy="130" rx="10" ry="19"/><ellipse cx="128" cy="138" rx="8" ry="15"/></g>`;
  },
  office(u) {
    return `<rect width="160" height="160" fill="#f2f1ee"/>
      <rect y="100" width="160" height="60" fill="#dcdad4"/>
      <rect x="10" y="30" width="60" height="70" rx="2" fill="#fff" stroke="#c9c6bf"/>
      <rect x="18" y="40" width="44" height="3" fill="#0e2a3a"/>
      <rect x="18" y="50" width="36" height="2" fill="#c2c0ba"/><rect x="18" y="57" width="42" height="2" fill="#c2c0ba"/>
      <rect x="18" y="64" width="30" height="2" fill="#c2c0ba"/>
      <rect x="18" y="76" width="26" height="10" rx="2" fill="#0e2a3a"/>
      <rect x="82" y="20" width="66" height="80" rx="3" fill="#0e2a3a"/>
      <rect x="88" y="28" width="54" height="40" rx="2" fill="#123f4e"/>
      <g stroke="#5fe3ff" stroke-width="1.2" fill="none" opacity=".8"><path d="M94 60 L104 46 L112 54 L122 34 L136 42"/></g>
      <rect x="88" y="76" width="54" height="4" rx="2" fill="#2a5a6a"/>
      <rect x="88" y="86" width="36" height="4" rx="2" fill="#2a5a6a"/>
      <ellipse cx="130" cy="118" rx="18" ry="5" fill="#c9c6bf"/>
      <path d="M130 118 L130 104 M130 108 Q120 102 122 96 M130 106 Q140 100 139 94" stroke="#4c8f5a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  },
  cat(u) {
    return `<rect width="160" height="160" fill="#2a2438"/>
      <rect y="112" width="160" height="48" fill="#3a3350"/>
      <ellipse cx="80" cy="118" rx="46" ry="26" fill="#4a4260"/>
      <ellipse cx="80" cy="100" rx="34" ry="26" fill="#5a5270"/>
      <ellipse cx="80" cy="72" rx="24" ry="21" fill="#65597e"/>
      <path d="M60 58 L58 40 L74 52 Z" fill="#65597e"/><path d="M100 58 L102 40 L86 52 Z" fill="#65597e"/>
      <path d="M62 55 L61 45 L70 52 Z" fill="#ff9ec7" opacity=".6"/><path d="M98 55 L99 45 L90 52 Z" fill="#ff9ec7" opacity=".6"/>
      <ellipse cx="71" cy="72" rx="4" ry="6" fill="#ffd36e"/><ellipse cx="89" cy="72" rx="4" ry="6" fill="#ffd36e"/>
      <ellipse cx="71" cy="72" rx="1.4" ry="5" fill="#20182c"/><ellipse cx="89" cy="72" rx="1.4" ry="5" fill="#20182c"/>
      <path d="M76 84 L80 87 L84 84" stroke="#ff9ec7" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g stroke="#cdc4dd" stroke-width="1" opacity=".7"><path d="M62 82 L44 78"/><path d="M62 86 L44 88"/><path d="M98 82 L116 78"/><path d="M98 86 L116 88"/></g>
      <path d="M120 118 Q140 108 134 92" stroke="#5a5270" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  },
  paper(u) {
    return `<rect width="160" height="160" fill="#5a5348"/>
      <g transform="rotate(-3 80 80)">
        <rect x="18" y="14" width="124" height="132" fill="#f4efe2" stroke="#d8d0bd"/>
        <rect x="28" y="26" width="60" height="5" fill="#2a2a2a"/>
        <rect x="28" y="38" width="40" height="3" fill="#8a8a8a"/>
        <rect x="106" y="24" width="26" height="26" rx="2" fill="#e0d8c4"/>
        <g stroke="#b8ae98" stroke-width="1"><path d="M28 56 L132 56"/></g>
        ${[64, 74, 84, 94, 104, 114, 124].map((y, i) => `<rect x="28" y="${y}" width="${104 - (i % 3) * 22}" height="3" fill="#a8a08c"/>`).join('')}
        <rect x="28" y="132" width="44" height="6" fill="#2a2a2a" opacity=".8"/>
      </g>`;
  },
  gift(u) {
    return `<rect width="160" height="160" fill="#1d1830"/>
      <circle cx="80" cy="80" r="60" fill="#2a2145" opacity=".6"/>
      <rect x="44" y="66" width="72" height="60" rx="4" fill="#c9457f"/>
      <rect x="40" y="52" width="80" height="20" rx="4" fill="#e0559a"/>
      <rect x="72" y="52" width="16" height="74" fill="#ffd36e"/>
      <path d="M80 52 Q62 44 66 32 Q76 26 80 48 Q84 26 94 32 Q98 44 80 52 Z" fill="#ffd36e"/>
      <circle cx="80" cy="46" r="5" fill="#f0c674"/>
      <g fill="#fff" opacity=".65"><circle cx="34" cy="40" r="2"/><circle cx="126" cy="52" r="2.5"/><circle cx="118" cy="118" r="2"/><circle cx="40" cy="112" r="1.6"/></g>`;
  },
  empty(u) {
    return `<rect width="160" height="160" fill="#0a0810"/>
      <rect x="30" y="40" width="100" height="80" fill="#0e0b16" stroke="#1c1830"/>
      <text x="80" y="86" font-family="monospace" font-size="11" fill="#3a3350" text-anchor="middle">SIN DATOS</text>`;
  }
};

export function photo(def, opts = {}) {
  const u = 'ph' + Math.random().toString(36).slice(2, 8);
  const scene = SCENES[def.scene] || SCENES.empty;
  const corrupt = opts.corrupt ?? def.corruptDefault ?? false;

  const defs = `<defs>
    <linearGradient id="sky${u}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#131a3c"/><stop offset="55%" stop-color="#2b2050"/><stop offset="100%" stop-color="#5a2a48"/>
    </linearGradient>
    <linearGradient id="warm${u}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffb36e"/><stop offset="100%" stop-color="#ff7fb6"/>
    </linearGradient>
    <filter id="cr${u}"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.6" numOctaves="1" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="${corrupt ? 9 : 0}" xChannelSelector="R"/></filter>
  </defs>`;

  // La anomalía: un detalle que no debería estar ahí.
  let anomaly = '';
  if (corrupt && def.anomaly) {
    const A = {
      reflection: `<g opacity=".8"><rect x="112" y="18" width="34" height="44" rx="3" fill="#08131a" stroke="#2a4a58"/>
        <ellipse cx="129" cy="34" rx="7" ry="9" fill="#1a2c36"/>
        <path d="M129 44 L120 58 L138 58 Z" fill="#c9cdd2" opacity=".7"/>
        <text x="129" y="15" font-family="monospace" font-size="6" fill="#5fe3ff" text-anchor="middle">C-0?</text></g>`,
      wires: `<g opacity=".85" stroke="#5fe3ff" stroke-width="1.4" fill="none">
        <path d="M0 138 Q40 128 80 140 Q120 152 160 136"/><path d="M0 148 Q40 140 80 150"/></g>
        <circle cx="80" cy="140" r="3" fill="#5fe3ff"/>`,
      door: `<rect x="4" y="30" width="26" height="80" rx="2" fill="#0d151c" opacity=".9"/>
        <rect x="8" y="60" width="18" height="14" rx="2" fill="#0a1219"/>
        <text x="17" y="70" font-family="monospace" font-size="6" fill="#5fe3ff" text-anchor="middle">C-04</text>`,
      figure: `<g opacity=".55"><ellipse cx="140" cy="120" rx="13" ry="30" fill="#05070a"/>
        <circle cx="140" cy="92" r="10" fill="#05070a"/></g>`,
      band: `<rect x="30" y="118" width="46" height="12" rx="6" fill="#e8eef0" opacity=".95"/>
        <text x="53" y="127" font-family="monospace" font-size="7" fill="#2a3a44" text-anchor="middle">C-02</text>`,
      nosun: `<circle cx="126" cy="26" r="13" fill="#05070a"/>`,
      dup: `<g opacity=".4" transform="translate(6,-4)"><rect x="40" y="60" width="80" height="70" fill="none" stroke="#5fe3ff" stroke-dasharray="3 3"/></g>`
    };
    anomaly = A[def.anomaly] || '';
  }

  const glitchBars = corrupt
    ? `<g style="mix-blend-mode:screen" opacity=".5">
         <rect y="46" width="160" height="3" fill="#5fe3ff"/>
         <rect y="102" width="160" height="2" fill="#ff5a6e"/>
       </g>`
    : '';

  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(def.title || 'foto')}">
    ${defs}
    <g filter="url(#cr${u})">${scene(u, def.spec)}${anomaly}</g>
    ${glitchBars}
    ${corrupt ? `<rect width="160" height="160" fill="#5fe3ff" opacity=".05"/>` : ''}
  </svg>`;
}

/* ---------------------------------------------------------
   CÁMARAS DE VIGILANCIA
   --------------------------------------------------------- */
export function camera(kind) {
  const base = (inner) => `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="120" fill="#05080a"/>${inner}
    <g opacity=".25" fill="#7fe3c0">${Array.from({ length: 30 }, (_, i) => `<rect y="${i * 4}" width="160" height="1"/>`).join('')}</g>
  </svg>`;

  const C = {
    hall: `<path d="M0 96 L46 52 L114 52 L160 96 L160 120 L0 120 Z" fill="#0b141a"/>
      <rect x="46" y="20" width="68" height="34" fill="#0a1218"/>
      <rect x="70" y="34" width="20" height="20" fill="#0d1c24" stroke="#1c3844"/>
      <g fill="#7fe3c0" opacity=".35"><rect x="20" y="14" width="120" height="2"/><rect x="34" y="6" width="92" height="1.5"/></g>
      <ellipse cx="80" cy="104" rx="60" ry="8" fill="#7fe3c0" opacity=".05"/>`,
    chairs: `<rect y="70" width="160" height="50" fill="#0a1116"/>
      ${[30, 80, 130].map((x, i) => `<g transform="translate(${x},74)">
        <path d="M-14 34 L-10 -6 Q0 -12 10 -6 L14 34 Z" fill="#152029"/>
        <path d="M-10 -6 Q0 -12 10 -6 L8 -18 Q0 -23 -8 -18 Z" fill="#1b2a34"/>
        <ellipse cx="0" cy="-16" rx="6.5" ry="7.5" fill="#26333c"/>
        <path d="M-6.5 -19 Q0 -27 6.5 -19" stroke="#3d5a68" stroke-width="2" fill="none"/>
        <circle cx="0" cy="-30" r="1.8" fill="${i === 1 ? '#ff5a6e' : '#7fe3c0'}" opacity=".9"/>
        <text x="0" y="46" font-family="monospace" font-size="6" fill="#4a6a78" text-anchor="middle">C-0${i + 2}</text>
      </g>`).join('')}
      <rect x="4" y="6" width="30" height="18" fill="#08141a" stroke="#1c3844"/>
      <g stroke="#7fe3c0" stroke-width=".8" fill="none"><path d="M7 16 L12 16 L15 10 L18 22 L21 14 L23 16 L31 16"/></g>`,
    monitors: `<rect y="80" width="160" height="40" fill="#0a1116"/>
      ${[[10, 20], [58, 14], [106, 22]].map(([x, y]) => `<g transform="translate(${x},${y})">
        <rect width="44" height="34" rx="2" fill="#08141a" stroke="#1c3844"/>
        <rect x="3" y="3" width="38" height="28" fill="#0c1e26"/>
        <g fill="#7fe3c0" opacity=".55"><rect x="6" y="8" width="20" height="2"/><rect x="6" y="14" width="28" height="2"/><rect x="6" y="20" width="14" height="2"/></g>
      </g>`).join('')}
      <rect x="20" y="62" width="120" height="6" rx="2" fill="#111c24"/>
      <ellipse cx="80" cy="100" rx="50" ry="10" fill="#7fe3c0" opacity=".04"/>`,
    guard: `<path d="M0 92 L40 56 L120 56 L160 92 L160 120 L0 120 Z" fill="#0b141a"/>
      <g transform="translate(96,52)"><ellipse cx="0" cy="34" rx="12" ry="28" fill="#050809"/><circle cx="0" cy="6" r="9" fill="#050809"/>
        <rect x="-3" y="20" width="6" height="10" fill="#7fe3c0" opacity=".2"/></g>
      <rect x="10" y="14" width="34" height="22" fill="#08141a" stroke="#1c3844"/>
      <text x="27" y="28" font-family="monospace" font-size="7" fill="#7fe3c0" text-anchor="middle">03:12</text>`,
    empty: `<rect width="160" height="120" fill="#05080a"/>
      <text x="80" y="62" font-family="monospace" font-size="9" fill="#1c3844" text-anchor="middle">SIN SEÑAL</text>`
  };
  return base(C[kind] || C.empty);
}

/* ---------------------------------------------------------
   LOGO / MARCA
   --------------------------------------------------------- */
export function logoMark() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fff3d6"/><stop offset="55%" stop-color="#f0c674"/><stop offset="100%" stop-color="#c9457f"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#lg)" stroke-width="1.2" opacity=".45"/>
    <circle cx="60" cy="60" r="44" fill="none" stroke="url(#lg)" stroke-width=".8" opacity=".25" stroke-dasharray="3 6"/>
    <path d="M60 92 C60 92 30 74 30 52 A16 16 0 0 1 60 43 A16 16 0 0 1 90 52 C90 74 60 92 60 92 Z"
      fill="none" stroke="url(#lg)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M44 52 Q60 62 76 52" stroke="url(#lg)" stroke-width="2" fill="none" opacity=".8"/>
    <circle cx="60" cy="43" r="3.4" fill="#f0c674"/>
    <circle cx="30" cy="52" r="2.4" fill="#c9457f"/><circle cx="90" cy="52" r="2.4" fill="#c9457f"/>
  </svg>`;
}

export function starfield(n = 42) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 100, y = Math.random() * 100;
    const r = Math.random() * 1.1 + .25, o = Math.random() * .55 + .15;
    const d = (Math.random() * 4 + 2).toFixed(1);
    s += `<circle cx="${x.toFixed(1)}%" cy="${y.toFixed(1)}%" r="${r.toFixed(2)}" fill="#fff" opacity="${o.toFixed(2)}">
      <animate attributeName="opacity" values="${o.toFixed(2)};${(o * .2).toFixed(2)};${o.toFixed(2)}" dur="${d}s" repeatCount="indefinite"/></circle>`;
  }
  return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

/* ---------------------------------------------------------
   Iconografía de la aplicación
   --------------------------------------------------------- */
export function icon(name) {
  const I = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    chat: '<path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-5 4V6z"/><path d="M8 9h8M8 12h5"/>',
    dm: '<path d="M4 5h16v12H8l-4 3V5z"/><circle cx="9" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="13" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="17" cy="11" r="1.1" fill="currentColor" stroke="none"/>',
    people: '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.6 2.9-5.8 6.5-5.8s6.5 2.2 6.5 5.8"/><path d="M16 5.5a3.4 3.4 0 010 6.4"/><path d="M18 14.6c2.2.6 3.5 2.4 3.5 5.4"/>',
    gallery: '<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="8.5" cy="10" r="1.7"/><path d="M4 17l5-5 4 4 3-2 4 4"/>',
    notes: '<path d="M6 3h9l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M15 3v6h5"/><path d="M9 13h7M9 17h5"/>',
    files: '<path d="M3 7a2 2 0 012-2h4l2 2.5h8a2 2 0 012 2V18a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
    phone: '<path d="M5 3h3.5l1.8 4.5-2.3 1.5a13 13 0 006 6l1.5-2.3L20 14.5V18a2 2 0 01-2.2 2A16.5 16.5 0 013.9 5.2 2 2 0 015 3z"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a7.9 7.9 0 000-2l2-1.6-2-3.4-2.4 1a7.7 7.7 0 00-1.7-1L15 3H9l-.3 2.9a7.7 7.7 0 00-1.7 1l-2.4-1-2 3.4L4.6 11a7.9 7.9 0 000 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.8 1.7 1L9 21h6l.3-2.9c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.7z"/>',
    bell: '<path d="M18 15V10a6 6 0 10-12 0v5l-2 3h16l-2-3z"/><path d="M10 21h4"/>',
    heart: '<path d="M12 20.4S4.3 15.6 4.3 10.3A4.3 4.3 0 0112 7.6a4.3 4.3 0 017.7 2.7c0 5.3-7.7 10.1-7.7 10.1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    send: '<path d="M4 12l16-8-6 16-2.6-6.2L4 12z"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12"/><path d="M12 9S9.5 4 7.2 5.2 9 9 12 9zM12 9s2.5-5 4.8-3.8S15 9 12 9z"/>',
    download: '<path d="M12 4v11"/><path d="M8 12l4 4 4-4"/><path d="M4 19h16"/>',
    share: '<circle cx="17" cy="6" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="17" cy="18" r="2.6"/><path d="M8.4 10.8l6.2-3.4M8.4 13.2l6.2 3.4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    core: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>',
    end: '<path d="M5 4h14v9a7 7 0 01-14 0V4z"/><path d="M9 20v1.5h6V20"/>',
    cam: '<rect x="3" y="7" width="12" height="10" rx="2.5"/><path d="M15 11l6-3v8l-6-3z"/>',
    doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h4"/><path d="M10 13h5M10 17h4"/>',
    missed: '<path d="M5 3h3.5l1.8 4.5-2.3 1.5a13 13 0 006 6l1.5-2.3L20 14.5V18a2 2 0 01-2.2 2A16.5 16.5 0 013.9 5.2 2 2 0 015 3z"/><path d="M15 3l6 6M21 3l-6 6"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || I.chat}</svg>`;
}

/* ---------------------------------------------------------
   Corazón pixelado — la marca de ASSIST
   --------------------------------------------------------- */
export function pixelHeart(size = 104, beat = true) {
  const P = 'M4 5h2v1h1v1h2V6h1V5h2v1h1v3h-1v1h-1v1h-1v1H8v1H7v-1H6v-1H5v-1H4V9H3V6h1z';
  const uid = 'ph' + Math.random().toString(36).slice(2, 7);
  return `<svg viewBox="0 0 16 16" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    style="image-rendering:pixelated">
    <defs>
      <linearGradient id="g${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff9ec7"/><stop offset="55%" stop-color="#ff4d94"/>
        <stop offset="100%" stop-color="#c9256b"/>
      </linearGradient>
    </defs>
    <g${beat ? '' : ''}>
      <path d="${P}" fill="url(#g${uid})"/>
      <rect x="5" y="6" width="1" height="1" fill="#ffd6e8"/>
      <rect x="6" y="6" width="1" height="1" fill="#ffd6e8" opacity=".7"/>
      ${beat ? `<animateTransform attributeName="transform" type="scale" additive="sum"
        values="1;1.09;1;1.04;1" dur="1.9s" repeatCount="indefinite"
        calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animateTransform attributeName="transform" type="translate" additive="sum"
        values="0 0;-0.72 -0.72;0 0;-0.32 -0.32;0 0" dur="1.9s" repeatCount="indefinite"/>` : ''}
    </g>
  </svg>`;
}
