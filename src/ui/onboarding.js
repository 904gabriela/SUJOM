/* =========================================================
   onboarding.js — Descarga, instalación y alta.
   ---------------------------------------------------------
   El juego no empieza con un menú. Empieza con una app que
   el jugador acaba de descubrir y se está instalando.

   Ni una palabra fuera de tono: aquí ASSIST es sólo una
   aplicación de romance muy bien hecha. El identificador
   C-1 no aparece por ninguna parte.
   ========================================================= */

import { S, setPlayer, setFlag, hasSave, load, reset, save } from '../engine/state.js';
import { pixelHeart, starfield, chibi } from '../engine/art.js';
import { playerFace, PLAYER_HAIR, PLAYER_SKIN, PLAYER_STYLE } from '../engine/portraits.js';
import { CHARS, CAST } from '../../data/characters.js';
import { go, h, esc, confirmBox } from './shell.js';
import { sfx, setMood } from '../engine/audio.js';
import * as story from '../engine/story.js';

const PROFILE_COLORS = ['#ff4d94', '#ff8a5c', '#ffd166', '#7fd88f', '#7fd8e8', '#a78bfa'];

/* =========================================================
   1. DESCARGA E INSTALACIÓN
   ========================================================= */
export function boot() {
  setMood('warm');
  const returning = hasSave();

  const node = h(`
    <div class="boot">
      <div class="boot-stars">${starfield(46)}</div>
      <h1 class="wordmark">ASSIST</h1>
      <p class="wordmark-sub">Connected Hearts</p>
      <div class="pixel-heart">${pixelHeart(104)}</div>
      <p class="boot-tag">Conecta con alguien<br>que te entienda.</p>
      <div id="stage"></div>
      <div class="boot-version">ASSIST LABS · v1.0.4</div>
    </div>`);

  const stage = node.querySelector('#stage');

  if (returning) {
    /* Ya instalada: se entra directamente. */
    const box = h(`
      <div class="boot-actions">
        <button class="btn btn-primary btn-block" data-open>Abrir</button>
        <button class="btn btn-ghost btn-block" data-new>Empezar de cero</button>
      </div>`);
    box.querySelector('[data-open]').addEventListener('click', () => {
      sfx.open();
      if (load()) { story.refresh(); go('home', {}, { replace: true, anim: 'fade' }); }
      else go('onboarding', { step: 0 }, { replace: true });
    });
    box.querySelector('[data-new]').addEventListener('click', async () => {
      sfx.tap();
      const ok = await confirmBox({
        title: '¿Empezar de cero?',
        body: 'Se borrará tu perfil y todas tus conversaciones. No se puede deshacer.',
        ok: 'Sí, borrar todo', cancel: 'No', danger: true
      });
      if (!ok) return;
      reset();
      go('onboarding', { step: 0 }, { replace: true });
    });
    stage.appendChild(box);
  } else {
    /* Primera vez: instalación con barra de progreso. */
    const box = h(`
      <div class="boot-actions">
        <button class="btn btn-primary btn-block" data-install>Instalar</button>
      </div>`);
    box.querySelector('[data-install]').addEventListener('click', () => {
      sfx.tap();
      stage.innerHTML = '';
      stage.appendChild(installer(() => go('onboarding', { step: 0 }, { replace: true, anim: 'up' })));
    });
    stage.appendChild(box);
  }

  return { node, chrome: { visible: false }, tab: 'boot', anim: 'fade' };
}

/** Barra de progreso de 20 segmentos, en plan retro. */
function installer(done) {
  const SEGS = 20;
  const box = h(`
    <div class="progress">
      <div class="progress-track">${'<i></i>'.repeat(SEGS)}</div>
      <div class="progress-pct">0%</div>
      <div class="boot-status">Descargando…</div>
    </div>`);
  const segs = [...box.querySelectorAll('.progress-track i')];
  const pct = box.querySelector('.progress-pct');
  const status = box.querySelector('.boot-status');

  const STEPS = [
    [0, 'Descargando…'],
    [40, 'Descargando perfiles…'],
    [68, 'Preparando tu sala…'],
    [88, 'Casi listo…']
  ];

  let n = 0;
  const t = setInterval(() => {
    n++;
    const p = Math.round((n / SEGS) * 100);
    segs.forEach((s, i) => s.classList.toggle('on', i < n));
    pct.textContent = p + '%';
    const st = [...STEPS].reverse().find((s) => p >= s[0]);
    if (st) status.textContent = st[1];
    if (n % 3 === 0) sfx.tap();
    if (n >= SEGS) {
      clearInterval(t);
      status.textContent = 'Instalada.';
      sfx.unlock();
      setTimeout(done, 700);
    }
  }, 145);

  return box;
}

/* =========================================================
   2. CREACIÓN DE PERFIL
   ========================================================= */
export function onboarding({ step = 0 } = {}) {
  const draft = {
    name: S.player.name || '',
    pronounKey: S.player.pronounKey || 'neutral',
    color: S.player.color || '#ff4d94',
    look: Object.assign({ hair: PLAYER_HAIR[0], skin: PLAYER_SKIN[0], style: 'medio' }, S.player.look || {})
  };

  const node = h('<div class="ob"></div>');
  render();

  function steps(n) {
    return `<div class="ob-steps">${[0, 1, 2, 3].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`;
  }
  function next() { step++; sfx.tap(); render(); }
  function prev() { step--; sfx.back(); render(); }

  function render() {
    node.innerHTML = '';
    if (step === 0) return stepWelcome();
    if (step === 1) return stepName();
    if (step === 2) return stepLook();
    return stepReady();
  }

  /* --- 0 · bienvenida --- */
  function stepWelcome() {
    node.appendChild(h(`
      <div style="display:flex;flex-direction:column;min-height:100%">
        ${steps(0)}
        <div class="ob-body">
          <div class="kicker">Bienvenid@ a ASSIST</div>
          <h1 class="h1">Vamos a crear<br>tu perfil.</h1>
          <p class="muted" style="margin-top:12px">
            ASSIST te pone en contacto con personas que encajan contigo.
            Hoy hay cuatro esperando.
          </p>
          <div style="display:flex;gap:9px;margin:26px 0 20px;justify-content:center">
            ${CAST.map((id) => {
              const c = CHARS[id];
              return `<div style="width:62px;height:62px;border-radius:50%;overflow:hidden;border:2px solid ${c.accent};box-shadow:0 4px 16px ${c.accentWash}">${chibi(c, 'happy')}</div>`;
            }).join('')}
          </div>
          <div class="card">
            <h3>Cómo funciona</h3>
            <p class="muted" style="color:var(--ink-2)">
              Te escriben ellos. Tú eliges qué contestar.<br><br>
              Lo que digas cambia lo cerca que estáis — y hay cosas que sólo
              te van a contar si confían en ti.
            </p>
          </div>
        </div>
        <button class="btn btn-primary btn-block" data-next style="margin-top:18px">Empezar</button>
      </div>`));
    node.querySelector('[data-next]').onclick = next;
  }

  /* --- 1 · nombre y pronombres --- */
  function stepName() {
    node.appendChild(h(`
      <div style="display:flex;flex-direction:column;min-height:100%">
        ${steps(1)}
        <div class="ob-body">
          <div class="kicker">Paso 1 de 3</div>
          <h1 class="h1">¿Cómo te llamamos?</h1>
          <div class="field">
            <label for="ob-name">Tu nombre</label>
            <input class="input" id="ob-name" maxlength="18" autocomplete="off"
              placeholder="Escribe tu nombre" value="${esc(draft.name)}">
            <div class="hint">Así te van a llamar los cuatro. Puede ser el de verdad o no.</div>
          </div>
          <div class="field">
            <label>Pronombres</label>
            <div class="chips" id="ob-pron">
              <button class="chip" data-p="she">ella / la</button>
              <button class="chip" data-p="he">él / lo</button>
              <button class="chip" data-p="neutral">elle / le</button>
            </div>
            <div class="hint">Se usa en cómo te hablan. Puedes cambiarlo luego en Ajustes.</div>
          </div>
        </div>
        <div class="stack" style="margin-top:16px">
          <button class="btn btn-primary btn-block" data-next disabled>Continuar</button>
          <button class="btn btn-ghost btn-block" data-prev>Atrás</button>
        </div>
      </div>`));

    const input = node.querySelector('#ob-name');
    const btn = node.querySelector('[data-next]');
    const sync = () => { draft.name = input.value.trim(); btn.disabled = !draft.name; };
    input.addEventListener('input', sync);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !btn.disabled) next(); });
    sync();
    setTimeout(() => input.focus(), 140);

    const chips = node.querySelectorAll('#ob-pron .chip');
    const paint = () => chips.forEach((c) => c.classList.toggle('on', c.dataset.p === draft.pronounKey));
    chips.forEach((c) => c.onclick = () => { draft.pronounKey = c.dataset.p; sfx.tap(); paint(); });
    paint();

    btn.onclick = next;
    node.querySelector('[data-prev]').onclick = prev;
  }

  /* --- 2 · avatar --- */
  function stepLook() {
    node.appendChild(h(`
      <div style="display:flex;flex-direction:column;min-height:100%">
        ${steps(2)}
        <div class="ob-body">
          <div class="kicker">Paso 2 de 3</div>
          <h1 class="h1">Tu foto de perfil.</h1>
          <p class="muted" style="margin-bottom:20px">Sencillo. Lo importante viene después.</p>
          <div class="avatar-pick">
            <div class="avatar-stage" id="av"></div>
            <div class="avatar-rows">
              <div class="avatar-row">
                <span class="lbl">Pelo</span>
                <div class="swatches" id="sw-hair"></div>
              </div>
              <div class="avatar-row">
                <span class="lbl">Piel</span>
                <div class="swatches" id="sw-skin"></div>
              </div>
              <div class="avatar-row">
                <span class="lbl">Corte</span>
                <div class="chips" id="sw-style"></div>
              </div>
              <div class="avatar-row">
                <span class="lbl">Color</span>
                <div class="swatches" id="sw-col"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="stack" style="margin-top:20px">
          <button class="btn btn-primary btn-block" data-next>Continuar</button>
          <button class="btn btn-ghost btn-block" data-prev>Atrás</button>
        </div>
      </div>`));

    const stage = node.querySelector('#av');
    const draw = () => { stage.innerHTML = playerFace({ ...draft.look }); };

    const bank = (host, list, key) => {
      const box = node.querySelector(host);
      list.forEach((v) => {
        const b = h(`<button class="swatch" data-v="${v}" style="background:${v}"></button>`);
        b.onclick = () => { draft.look[key] = v; sfx.tap(); paint(); draw(); };
        box.appendChild(b);
      });
    };
    bank('#sw-hair', PLAYER_HAIR, 'hair');
    bank('#sw-skin', PLAYER_SKIN, 'skin');

    const colBox = node.querySelector('#sw-col');
    PROFILE_COLORS.forEach((v) => {
      const b = h(`<button class="swatch" data-c="${v}" style="background:${v}"></button>`);
      b.onclick = () => { draft.color = v; sfx.tap(); paint(); draw(); };
      colBox.appendChild(b);
    });

    const styleBox = node.querySelector('#sw-style');
    PLAYER_STYLE.forEach((v) => {
      const b = h(`<button class="chip" data-s="${v}">${v}</button>`);
      b.onclick = () => { draft.look.style = v; sfx.tap(); paint(); draw(); };
      styleBox.appendChild(b);
    });

    function paint() {
      node.querySelectorAll('#sw-hair .swatch').forEach((s) => s.classList.toggle('on', s.dataset.v === draft.look.hair));
      node.querySelectorAll('#sw-skin .swatch').forEach((s) => s.classList.toggle('on', s.dataset.v === draft.look.skin));
      node.querySelectorAll('#sw-col .swatch').forEach((s) => s.classList.toggle('on', s.dataset.c === draft.color));
      node.querySelectorAll('#sw-style .chip').forEach((s) => s.classList.toggle('on', s.dataset.s === draft.look.style));
      node.querySelector('.avatar-stage').style.borderColor = draft.color;
    }
    paint(); draw();

    node.querySelector('[data-next]').onclick = next;
    node.querySelector('[data-prev]').onclick = prev;
  }

  /* --- 3 · listo --- */
  function stepReady() {
    setPlayer({ name: draft.name, pronounKey: draft.pronounKey, color: draft.color, look: draft.look, onboarded: true });
    setFlag('onboarded');
    story.refresh();
    save(true);
    sfx.unlock();

    node.appendChild(h(`
      <div style="display:flex;flex-direction:column;min-height:100%">
        ${steps(3)}
        <div class="ob-body center" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div class="avatar-stage" style="border-color:${draft.color};width:120px;height:120px">
            ${playerFace(draft.look)}
          </div>
          <h1 class="h1" style="margin-top:20px">Hola, ${esc(draft.name)}.</h1>
          <p class="muted" style="max-width:26ch">
            Tu perfil está listo. Los cuatro ya pueden escribirte.
          </p>
          <div class="card" style="margin-top:22px;width:100%;text-align:left">
            <h3>Ya te están esperando</h3>
            <div style="display:flex;flex-direction:column;gap:11px">
              ${CAST.map((id) => {
                const c = CHARS[id];
                return `<div style="display:flex;align-items:center;gap:11px">
                  <div style="width:38px;height:38px;border-radius:50%;overflow:hidden;border:2px solid ${c.accent};flex:0 0 auto">${chibi(c, 'happy')}</div>
                  <div style="min-width:0">
                    <div style="font-weight:700;font-size:13.5px;color:${c.accent}">${c.name}</div>
                    <div style="font-size:11.5px;color:var(--ink-3);line-height:1.4">${c.tagline}</div>
                  </div></div>`;
              }).join('')}
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-block" data-go style="margin-top:20px">Entrar en ASSIST</button>
      </div>`));

    node.querySelector('[data-go]').onclick = () => { sfx.open(); go('home', {}, { replace: true, anim: 'up' }); };
  }

  return { node, chrome: { visible: false }, tab: 'onboarding', anim: 'fade' };
}
