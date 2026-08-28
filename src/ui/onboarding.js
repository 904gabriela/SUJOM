/* =========================================================
   onboarding.js — Portada y creación de perfil.
   ---------------------------------------------------------
   Se parece exactamente a lo que el jugador espera: un juego
   otome pidiéndole un nombre. Ni una palabra fuera de tono.
   El identificador C-1 no aparece por ninguna parte.
   ========================================================= */

import { S, setPlayer, setFlag, hasSave, load, reset, save } from '../engine/state.js';
import { logoMark, starfield, chibi, portrait } from '../engine/art.js';
import { CHARS, CAST } from '../../data/characters.js';
import { go, h, confirmBox } from './shell.js';
import { sfx, setMood } from '../engine/audio.js';
import * as story from '../engine/story.js';

const COLORS = ['#f0c674', '#ff7fb6', '#4fd1c5', '#b28cff', '#ff7a45', '#7fd88f'];

/* ---------------------------------------------------------
   Portada
   --------------------------------------------------------- */
export function titleScreen() {
  setMood('warm');
  const node = h(`
    <div class="view title-screen">
      <div class="title-stars">${starfield(50)}</div>
      <div class="logo-mark">${logoMark()}</div>
      <h1 class="logo-word">SUJOM</h1>
      <p class="logo-sub">Solo un juego otome más</p>
      <p class="logo-tag">Cuatro personas. Una sala. Contesta rápido.</p>
      <div class="title-actions">
        ${hasSave() ? '<button class="btn btn-primary btn-block" data-continue>Continuar</button>' : ''}
        <button class="btn ${hasSave() ? '' : 'btn-primary'} btn-block" data-new>Partida nueva</button>
        ${Object.keys(S.endings || {}).length ? '<button class="btn btn-ghost btn-block" data-gallery>Finales conseguidos</button>' : ''}
      </div>
      <div class="title-version">ASSIST LABS · v1.0.4</div>
    </div>`);

  node.querySelector('[data-new]')?.addEventListener('click', async () => {
    sfx.tap();
    if (hasSave()) {
      const ok = await confirmBox({
        title: '¿Empezar de cero?',
        body: 'Se borrará tu partida actual: tu nombre, tus conversaciones y todo lo que has descubierto.',
        ok: 'Sí, empezar de cero', cancel: 'No'
      });
      if (!ok) return;
      reset();
    }
    go('onboarding', { step: 0 }, true);
  });

  node.querySelector('[data-continue]')?.addEventListener('click', () => {
    sfx.open();
    if (load()) { story.refresh(); go('hub', {}, true); }
    else go('onboarding', { step: 0 }, true);
  });

  node.querySelector('[data-gallery]')?.addEventListener('click', () => { sfx.tap(); go('endings'); });

  return { node, chrome: { visible: false } };
}

/* ---------------------------------------------------------
   Creación de perfil
   --------------------------------------------------------- */
export function onboarding({ step = 0 } = {}) {
  const draft = {
    name: S.player.name || '',
    pronounKey: S.player.pronounKey || 'neutral',
    color: S.player.color || '#f0c674'
  };

  const node = h('<div class="view ob"></div>');
  render();

  function dots(n) {
    return `<div class="ob-progress">${[0, 1, 2, 3].map((i) => `<div class="ob-dot ${i <= n ? 'on' : ''}"></div>`).join('')}</div>`;
  }

  function render() {
    node.innerHTML = '';
    if (step === 0) return stepWelcome();
    if (step === 1) return stepName();
    if (step === 2) return stepPronouns();
    if (step === 3) return stepColor();
    return stepDone();
  }

  function next() { step++; sfx.tap(); render(); node.scrollTop = 0; }
  function prev() { step--; sfx.back(); render(); }

  /* --- 0 --- */
  function stepWelcome() {
    node.appendChild(h(`
      <div>
        ${dots(0)}
        <div class="ob-body">
          <div class="eyebrow">Bienvenid@ a SUJOM</div>
          <h1 class="h1">Antes de empezar,<br>cuéntanos quién eres.</h1>
          <p class="muted" style="line-height:1.7;margin-top:14px">
            SUJOM es una sala. Dentro hay cuatro personas que llevan un tiempo hablando entre ellas
            y a las que les vendría bien alguien nuevo.
          </p>
          <p class="muted" style="line-height:1.7;margin-top:10px">
            Te van a escribir. A veces tarde. A veces mucho.
          </p>
          <div class="card" style="margin-top:22px">
            <h3>Cómo funciona</h3>
            <p class="bio">Las conversaciones llegan solas. Tú eliges qué contestar.<br><br>
            Lo que elijas cambia lo cerca que estás de cada persona — y hay cosas que sólo te van
            a contar si confían en ti.</p>
          </div>
        </div>
        <button class="btn btn-primary btn-block" data-next style="margin-top:20px">Empezar</button>
      </div>`));
    node.querySelector('[data-next]').onclick = next;
  }

  /* --- 1 --- */
  function stepName() {
    node.appendChild(h(`
      <div>
        ${dots(1)}
        <div class="ob-body">
          <div class="eyebrow">Paso 1 de 3</div>
          <h1 class="h1">¿Cómo te llamamos?</h1>
          <div class="field">
            <label for="ob-name">Tu nombre</label>
            <input class="input" id="ob-name" maxlength="18" autocomplete="off"
              placeholder="Escribe tu nombre" value="${draft.name.replace(/"/g, '&quot;')}">
            <div class="hint">Es como te van a llamar los cuatro. Puede ser el de verdad o no.</div>
          </div>
        </div>
        <div class="stack">
          <button class="btn btn-primary btn-block" data-next disabled>Continuar</button>
          <button class="btn btn-ghost btn-block" data-prev>Atrás</button>
        </div>
      </div>`));
    const input = node.querySelector('#ob-name');
    const btn = node.querySelector('[data-next]');
    const sync = () => {
      draft.name = input.value.trim();
      btn.disabled = draft.name.length < 1;
    };
    input.addEventListener('input', sync);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !btn.disabled) next(); });
    sync();
    setTimeout(() => input.focus(), 120);
    btn.onclick = next;
    node.querySelector('[data-prev]').onclick = prev;
  }

  /* --- 2 --- */
  function stepPronouns() {
    node.appendChild(h(`
      <div>
        ${dots(2)}
        <div class="ob-body">
          <div class="eyebrow">Paso 2 de 3</div>
          <h1 class="h1">¿Cómo hablamos de ti?</h1>
          <div class="field">
            <label>Pronombres</label>
            <div class="chips" id="ob-pron">
              <button class="chip" data-p="she">ella / la</button>
              <button class="chip" data-p="he">él / lo</button>
              <button class="chip" data-p="neutral">elle / le</button>
            </div>
            <div class="hint">Se usa en cómo te hablan los personajes. Puedes cambiarlo luego en Ajustes.</div>
          </div>
        </div>
        <div class="stack">
          <button class="btn btn-primary btn-block" data-next>Continuar</button>
          <button class="btn btn-ghost btn-block" data-prev>Atrás</button>
        </div>
      </div>`));
    const chips = node.querySelectorAll('#ob-pron .chip');
    const paint = () => chips.forEach((c) => c.classList.toggle('on', c.dataset.p === draft.pronounKey));
    chips.forEach((c) => c.onclick = () => { draft.pronounKey = c.dataset.p; sfx.tap(); paint(); });
    paint();
    node.querySelector('[data-next]').onclick = next;
    node.querySelector('[data-prev]').onclick = prev;
  }

  /* --- 3 --- */
  function stepColor() {
    node.appendChild(h(`
      <div>
        ${dots(3)}
        <div class="ob-body">
          <div class="eyebrow">Paso 3 de 3</div>
          <h1 class="h1">Elige tu color.</h1>
          <div class="field">
            <label>Color de perfil</label>
            <div class="swatches" id="ob-col">
              ${COLORS.map((c) => `<button class="swatch" data-c="${c}" style="background:${c}"></button>`).join('')}
            </div>
            <div class="hint">Es el color de tus mensajes en la sala.</div>
          </div>
          <div class="card" style="margin-top:20px">
            <h3>Vista previa</h3>
            <div class="msg me" style="margin-top:4px">
              <div class="msg-col"><div class="bubble" id="ob-prev">Hola. Soy ${escapeHtml(draft.name) || 'yo'}.</div></div>
            </div>
          </div>
        </div>
        <div class="stack">
          <button class="btn btn-primary btn-block" data-next>Entrar en SUJOM</button>
          <button class="btn btn-ghost btn-block" data-prev>Atrás</button>
        </div>
      </div>`));
    const sw = node.querySelectorAll('#ob-col .swatch');
    const prev2 = node.querySelector('#ob-prev');
    const paint = () => {
      sw.forEach((s) => s.classList.toggle('on', s.dataset.c === draft.color));
      prev2.style.borderColor = draft.color;
      prev2.style.background = `linear-gradient(135deg, ${draft.color}22, #2b2145)`;
    };
    sw.forEach((s) => s.onclick = () => { draft.color = s.dataset.c; sfx.tap(); paint(); });
    paint();
    node.querySelector('[data-prev]').onclick = prev;
    node.querySelector('[data-next]').onclick = () => { step = 4; sfx.unlock(); render(); };
  }

  /* --- 4: presentación del reparto --- */
  function stepDone() {
    setPlayer({ ...draft, onboarded: true });
    setFlag('onboarded');
    story.refresh();
    save(true);

    node.appendChild(h(`
      <div>
        <div class="ob-body center">
          <div class="eyebrow" style="margin-top:10px">Tu sala</div>
          <h1 class="h1">Hola, ${escapeHtml(draft.name)}.</h1>
          <p class="muted" style="margin-bottom:22px">Estos son los cuatro.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            ${CAST.map((id) => {
              const c = CHARS[id];
              return `<div class="card" style="padding:10px;text-align:center">
                <div style="width:100%;aspect-ratio:1;border-radius:16px;overflow:hidden;border:1.5px solid ${c.accent}">
                  ${chibi(c, 'happy')}
                </div>
                <div style="font-weight:750;margin-top:8px;color:${c.accent}">${c.name}</div>
                <div style="font-size:11px;color:var(--ink-3);line-height:1.4;margin-top:3px">${c.tagline}</div>
              </div>`;
            }).join('')}
          </div>
          <p class="muted" style="margin-top:20px;line-height:1.6">
            Ya te están esperando en la sala común.
          </p>
        </div>
        <button class="btn btn-primary btn-block" data-go style="margin-top:22px">Entrar</button>
      </div>`));
    node.querySelector('[data-go]').onclick = () => { sfx.open(); go('hub', {}, true); };
  }

  return { node, chrome: { visible: false } };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
