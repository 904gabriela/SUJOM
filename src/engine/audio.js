/* =========================================================
   audio.js — Sonido sintetizado con WebAudio.
   ---------------------------------------------------------
   No hay archivos de audio en el repositorio: todo se genera
   en tiempo real. Eso permite que la música cambie de humor
   con el avance de la historia (cálido → inquieto → tenso)
   sin cargar nada.
   ========================================================= */

let ctx = null;
let master = null;
let musicGain = null;
let sfxGain = null;
let currentMood = null;
let moodNodes = [];
let started = false;

const prefs = { sfx: true, music: true };

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);

    musicGain = ctx.createGain();
    musicGain.gain.value = 0.0;
    musicGain.connect(master);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.9;
    sfxGain.connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/** Se llama tras el primer gesto del usuario (política de autoplay). */
export function unlock() {
  const c = ac();
  if (c && !started) {
    started = true;
    if (currentMood) setMood(currentMood, true);
  }
}

export function setPrefs(p) {
  Object.assign(prefs, p);
  if (musicGain) musicGain.gain.setTargetAtTime(prefs.music ? 0.22 : 0, ac()?.currentTime || 0, 0.4);
  if (sfxGain) sfxGain.gain.value = prefs.sfx ? 0.9 : 0;
}

/* ---------------------------------------------------------
   Efectos puntuales
   --------------------------------------------------------- */
function blip({ freq = 660, dur = 0.09, type = 'sine', vol = 0.18, slide = 0, delay = 0 }) {
  const c = ac();
  if (!c || !prefs.sfx) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(sfxGain);
  o.start(t); o.stop(t + dur + 0.02);
}

function noiseHit({ dur = 0.18, vol = 0.12, lp = 1400, delay = 0 }) {
  const c = ac();
  if (!c || !prefs.sfx) return;
  const t = c.currentTime + delay;
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource(); src.buffer = buf;
  const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp;
  const g = c.createGain(); g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(sfxGain);
  src.start(t);
}

export const sfx = {
  message() { blip({ freq: 780, dur: .09, vol: .13, type: 'triangle' }); blip({ freq: 1040, dur: .1, vol: .1, delay: .07, type: 'triangle' }); },
  mine() { blip({ freq: 520, dur: .07, vol: .1, type: 'sine' }); },
  typing() { blip({ freq: 300, dur: .03, vol: .04, type: 'sine' }); },
  tap() { blip({ freq: 440, dur: .04, vol: .07, type: 'square' }); },
  open() { blip({ freq: 380, dur: .12, vol: .1, type: 'triangle', slide: 320 }); },
  back() { blip({ freq: 620, dur: .1, vol: .08, type: 'triangle', slide: -260 }); },
  notify() {
    blip({ freq: 880, dur: .12, vol: .15, type: 'sine' });
    blip({ freq: 1320, dur: .16, vol: .12, type: 'sine', delay: .1 });
  },
  heart() {
    blip({ freq: 660, dur: .1, vol: .12, type: 'sine' });
    blip({ freq: 880, dur: .12, vol: .12, type: 'sine', delay: .08 });
    blip({ freq: 1180, dur: .2, vol: .1, type: 'sine', delay: .16 });
  },
  unlock() {
    [523, 659, 784, 1047].forEach((f, i) => blip({ freq: f, dur: .22, vol: .1, type: 'triangle', delay: i * .07 }));
  },
  error() { blip({ freq: 180, dur: .2, vol: .14, type: 'sawtooth', slide: -80 }); },
  glitch() {
    noiseHit({ dur: .22, vol: .16, lp: 5200 });
    blip({ freq: 90, dur: .3, vol: .12, type: 'sawtooth', slide: 40 });
    for (let i = 0; i < 5; i++) blip({ freq: 200 + Math.random() * 2400, dur: .035, vol: .07, type: 'square', delay: i * .045 });
  },
  alarm() {
    for (let i = 0; i < 4; i++) {
      blip({ freq: 740, dur: .18, vol: .13, type: 'square', delay: i * .42 });
      blip({ freq: 560, dur: .18, vol: .13, type: 'square', delay: i * .42 + .2 });
    }
  },
  callIn() {
    for (let i = 0; i < 3; i++) {
      blip({ freq: 620, dur: .26, vol: .12, type: 'sine', delay: i * .9 });
      blip({ freq: 820, dur: .26, vol: .12, type: 'sine', delay: i * .9 + .28 });
    }
  },
  callEnd() { blip({ freq: 420, dur: .5, vol: .14, type: 'sine', slide: -260 }); noiseHit({ dur: .5, vol: .07, lp: 800 }); },
  machine() { noiseHit({ dur: 1.4, vol: .09, lp: 380 }); blip({ freq: 62, dur: 1.6, vol: .1, type: 'sawtooth' }); },
  camera() { blip({ freq: 1600, dur: .04, vol: .12, type: 'square' }); noiseHit({ dur: .09, vol: .1, lp: 6000, delay: .03 }); }
};

/* ---------------------------------------------------------
   Ambientes musicales.
   Cada "mood" es un pequeño motor de pads + arpegio.
   --------------------------------------------------------- */
const MOODS = {
  // Cálido, romántico. La app "normal".
  warm: { root: 220, chord: [0, 4, 7, 11], wave: 'sine', lfo: 0.07, bright: 1200, arp: [0, 7, 11, 14], arpRate: 1.4, arpVol: .05 },
  // Dulce, íntimo. Chats privados.
  tender: { root: 196, chord: [0, 3, 7, 10], wave: 'sine', lfo: 0.05, bright: 900, arp: [0, 3, 7, 12], arpRate: 2.1, arpVol: .045 },
  // Algo no encaja.
  unease: { root: 174, chord: [0, 3, 6, 10], wave: 'triangle', lfo: 0.11, bright: 620, arp: [0, 6, 10], arpRate: 2.8, arpVol: .035 },
  // Tensión psicológica.
  tense: { root: 146, chord: [0, 1, 6, 7], wave: 'sawtooth', lfo: 0.16, bright: 420, arp: [0, 1, 6], arpRate: 3.4, arpVol: .03 },
  // Fuga / clímax.
  escape: { root: 130, chord: [0, 5, 7, 12], wave: 'sawtooth', lfo: 0.22, bright: 800, arp: [0, 5, 7, 12, 7, 5], arpRate: 5.5, arpVol: .05 },
  // Reencuentro / epílogo.
  resolve: { root: 261, chord: [0, 4, 7, 12], wave: 'sine', lfo: 0.04, bright: 1600, arp: [0, 4, 7, 12], arpRate: 1.1, arpVol: .05 }
};

function stopMood(fade = 1.2) {
  const c = ctx;
  if (!c) return;
  moodNodes.forEach((n) => {
    try {
      if (n.gain) n.gain.gain.setTargetAtTime(0, c.currentTime, fade / 3);
      if (n.stopAt) setTimeout(() => { try { n.osc.stop(); } catch (e) { /* ya parado */ } }, fade * 1000);
      if (n.timer) clearInterval(n.timer);
    } catch (e) { /* nodo ya liberado */ }
  });
  moodNodes = [];
}

export function setMood(name, force = false) {
  if (name === currentMood && !force) return;
  currentMood = name;
  const c = ac();
  if (!c || !prefs.music) return;

  stopMood();
  const m = MOODS[name] || MOODS.warm;
  const t = c.currentTime;

  musicGain.gain.setTargetAtTime(0.22, t, 0.6);

  // Pad: acorde sostenido con leve desafinación y filtro que respira.
  const filt = c.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = m.bright;
  filt.Q.value = 1.2;
  filt.connect(musicGain);

  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = m.lfo;
  lfoGain.gain.value = m.bright * 0.35;
  lfo.connect(lfoGain); lfoGain.connect(filt.frequency);
  lfo.start(t);
  moodNodes.push({ osc: lfo, stopAt: true });

  m.chord.forEach((semi, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = m.wave;
    o.frequency.value = m.root * Math.pow(2, semi / 12) * (i > 1 ? 1 : 1);
    o.detune.value = (i - 1.5) * 5;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.055 / (i * 0.4 + 1), t + 2);
    o.connect(g); g.connect(filt);
    o.start(t);
    moodNodes.push({ osc: o, gain: g, stopAt: true });
  });

  // Arpegio suave por encima.
  let step = 0;
  const timer = setInterval(() => {
    if (!prefs.music || currentMood !== name) return;
    const n = m.arp[step % m.arp.length];
    step++;
    const cc = ac(); if (!cc) return;
    const tt = cc.currentTime;
    const o = cc.createOscillator();
    const g = cc.createGain();
    o.type = 'triangle';
    o.frequency.value = m.root * 2 * Math.pow(2, n / 12);
    g.gain.setValueAtTime(0, tt);
    g.gain.linearRampToValueAtTime(m.arpVol, tt + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.9);
    o.connect(g); g.connect(musicGain);
    o.start(tt); o.stop(tt + 1);
  }, (1000 / m.arpRate) * 1.6);
  moodNodes.push({ timer });
}

export function duckMusic(ms = 1200) {
  const c = ctx; if (!c || !musicGain) return;
  musicGain.gain.setTargetAtTime(0.04, c.currentTime, 0.15);
  setTimeout(() => {
    if (musicGain && prefs.music) musicGain.gain.setTargetAtTime(0.22, ctx.currentTime, 0.6);
  }, ms);
}

export function silence() { stopMood(0.6); currentMood = null; }
