/* =========================================================
   comprueba_guardado.js — La partida sobrevive a un cambio.
   ---------------------------------------------------------
   Esto NO es una suite de tests. Cubre un solo sitio, a
   propósito: `src/engine/state.js`.

   El motivo: es el único punto del proyecto donde un error
   destruye un dato real del jugador, y encima en silencio.
   No hay servidor ni base de datos; la partida entera vive
   en localStorage bajo `sujom.save.v1`. Si alguien cambia la
   forma del guardado y no sube SAVE_VERSION, load() se lo
   come sin quejarse y el jugador pierde todo sin que nadie
   se entere hasta que le pasa.

   El resto de sistemas —conditions, story, los stickers— no
   los mira nadie aquí, y es deliberado: no los está tocando
   nadie. Cuando alguien vaya a tocarlos, se cubren entonces.

   Uso:
       node tools/comprueba_guardado.js

   Sale con código 0 si todo bien, 1 si algo falla.
   ========================================================= */

import { createHash } from 'node:crypto';

/* ---------------------------------------------------------
   La huella de la forma del guardado.
   ---------------------------------------------------------
   Se recalcula en cada ejecución a partir del estado inicial
   real. Si no coincide con esto, la forma ha cambiado.

   Si has cambiado la forma A PROPÓSITO:
     1. ¿El guardado viejo se sigue pudiendo leer? Si no, sube
        SAVE_VERSION en state.js Y escribe la migración.
     2. Actualiza estos dos valores.
   --------------------------------------------------------- */
const FORMA_ESPERADA = {
  version: 1,
  huella: '02de2934316aa742'
};

/* ---------------------------------------------------------
   localStorage de mentira, que es todo lo que necesita
   state.js para funcionar fuera del navegador.
   --------------------------------------------------------- */
function falsoAlmacen() {
  const mapa = new Map();
  return {
    getItem: (k) => (mapa.has(k) ? mapa.get(k) : null),
    setItem: (k, v) => { mapa.set(k, String(v)); },
    removeItem: (k) => { mapa.delete(k); },
    clear: () => mapa.clear()
  };
}
globalThis.localStorage = falsoAlmacen();

const CLAVE = 'sujom.save.v1';

/* ---------------------------------------------------------
   Utilidades
   --------------------------------------------------------- */
let fallos = 0;
let avisos = 0;

function ok(msg) { console.log(`  ok    ${msg}`); }
function mal(msg, detalle) {
  fallos++;
  console.log(`  FALLA ${msg}`);
  if (detalle) console.log(`        ${String(detalle).split('\n').join('\n        ')}`);
}
function aviso(msg, detalle) {
  avisos++;
  console.log(`  aviso ${msg}`);
  if (detalle) console.log(`        ${String(detalle).split('\n').join('\n        ')}`);
}

/** Árbol de claves y tipos, sin valores: la "forma" del guardado. */
function forma(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  const t = typeof v;
  if (t !== 'object') return t;
  const salida = {};
  for (const k of Object.keys(v).sort()) salida[k] = forma(v[k]);
  return salida;
}

function huellaDe(v) {
  return createHash('sha256').update(JSON.stringify(forma(v))).digest('hex').slice(0, 16);
}

/** Primera diferencia real entre dos estados, con su ruta. */
function difiere(a, b, ruta = '') {
  if (a === b) return null;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return a === b ? null : `${ruta || '(raíz)'}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return `${ruta}: uno es lista y el otro no`;
  const claves = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of claves) {
    if (!(k in a)) return `${ruta}.${k}: falta al guardar`;
    if (!(k in b)) return `${ruta}.${k}: falta al cargar`;
    const d = difiere(a[k], b[k], ruta ? `${ruta}.${k}` : k);
    if (d) return d;
  }
  return null;
}

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/* =========================================================
   1 · La forma del guardado no ha cambiado a escondidas
   ========================================================= */
async function compruebaForma() {
  console.log('\n1 · La forma del guardado');

  const st = await import('../src/engine/state.js');
  const huella = huellaDe(st.S);
  const version = st.SAVE_VERSION;

  const mismaHuella = huella === FORMA_ESPERADA.huella;
  const mismaVersion = version === FORMA_ESPERADA.version;

  if (FORMA_ESPERADA.huella === 'PENDIENTE') {
    aviso('huella sin fijar', `Pon huella: '${huella}' en FORMA_ESPERADA.`);
    return;
  }

  if (mismaHuella && mismaVersion) {
    ok(`forma intacta (huella ${huella}, SAVE_VERSION ${version})`);
    return;
  }

  if (!mismaHuella && mismaVersion) {
    mal(
      'la forma del guardado ha cambiado y SAVE_VERSION sigue en ' + version,
      `Esperaba ${FORMA_ESPERADA.huella}, calculo ${huella}.\n` +
      'Toda partida guardada con la forma vieja se va a leer con la nueva.\n' +
      'Si los dos formatos NO son compatibles, sube SAVE_VERSION y migra;\n' +
      'si sí lo son, actualiza huella en FORMA_ESPERADA y sigue.'
    );
    return;
  }

  if (!mismaHuella && version > FORMA_ESPERADA.version) {
    aviso(
      `forma nueva con SAVE_VERSION ${version}`,
      `Actualiza FORMA_ESPERADA a { version: ${version}, huella: '${huella}' }.\n` +
      'Y comprueba que existe la migración: al subir la versión, load()\n' +
      'descarta las partidas viejas en vez de convertirlas.'
    );
    return;
  }

  aviso(
    `SAVE_VERSION ha subido a ${version} sin que cambie la forma`,
    'Subir la versión descarta la partida de todo el mundo. Si la forma es\n' +
    'la misma, probablemente no hacía falta.'
  );
}

/* =========================================================
   2 · Guardar y cargar devuelve lo mismo
   ========================================================= */
async function compruebaIdaYVuelta() {
  console.log('\n2 · Guardar, cargar, y que vuelva lo mismo');

  localStorage.clear();
  const a = await import('../src/engine/state.js?ida');

  /* Se toca todo lo que el jugador puede conseguir, con las
     funciones públicas, que es como lo toca el juego. */
  a.setPlayer({
    name: 'Gabriela', pronounKey: 'she', onboarded: true,
    color: '#ff4d94', look: { hair: '#5a2233', skin: '#e8c4a8', style: 'largo' }
  });
  a.applyFx({
    ryu: { affinity: 34, trust: 12, romance: 8, mood: 'contento' },
    reiko: { affinity: 20, awareness: 40, awakening: 15 },
    lara: { dependence: 7, suspicion: 3 }
  });
  a.setFlag('ryu_sabe_lo_del_bar');
  a.setFlag('contador', 3);
  a.unlockPhoto('ryu_ramen');
  a.unlockPhoto('kenta_cat');
  a.corruptPhoto('ryu_window');
  a.markInspected('ryu_window');
  a.unlockNote('nota_1');
  a.reviseNote('nota_1');
  a.unlockPage('pagina_assist');
  a.unlockCam('cam_02');
  a.addEvidence('contrato');
  a.markCall('llamada_ryu_1');
  a.unlockProfileBit('lara', 'perro');
  a.unlockProfileBit('lara', 'trabajo');
  a.pushNotif({ char: 'kenta', title: 'Kenta', body: '¿sigues despierta?', kind: 'msg' });
  a.makeAvailable('ryu_01');
  a.makeAvailable('kenta_01');
  a.complete('ryu_01');
  a.reopen('ryu_01');
  a.recordEnding('final_kenta_bueno', 'kenta', 'good');
  a.setClock(9, '02:14');
  a.advanceTime(1500);           // cruza la medianoche a propósito
  a.setGlitch(2);

  /* La cartera no tiene funciones aquí (vive en engine/tienda.js),
     pero forma parte del guardado y tiene que volver igual. */
  a.S.gems = 120;
  a.S.earned.push('bono_dia_1');
  a.S.owned.push('vestido_rojo');
  a.S.inventory.rosa = 2;
  a.S.given.ryu = ['cafe'];
  a.S.ledger.push({ tipo: 'gasto', id: 'rosa', cantidad: -20, at: 1700000000000 });
  a.S.focusRoute = 'ryu';
  a.S.secretUnlocked = true;

  a.save(true);

  const guardado = localStorage.getItem(CLAVE);
  if (!guardado) { mal('save(true) no ha escrito nada en localStorage'); return; }
  ok(`save(true) escribe (${guardado.length} bytes)`);

  const antes = JSON.parse(JSON.stringify(a.S));

  /* Instancia nueva del módulo: nadie comparte memoria con la
     que guardó. Es lo que pasa de verdad al recargar la app. */
  const b = await import('../src/engine/state.js?vuelta');
  if (!b.hasSave()) { mal('hasSave() dice que no hay partida y sí la hay'); return; }
  if (!b.load()) { mal('load() ha rechazado una partida recién guardada'); return; }
  ok('load() acepta la partida');

  const d = difiere(antes, b.S);
  if (d) mal('lo que vuelve no es lo que se guardó', d);
  else ok('todo vuelve igual, campo por campo');

  /* Y que lo que vuelve siga siendo utilizable, no sólo igual. */
  if (b.clockText() !== a.clockText()) mal(`el reloj cambia: ${a.clockText()} -> ${b.clockText()}`);
  else ok(`el reloj vuelve en ${b.clockText()} (día ${b.S.day})`);

  if (b.bondLevel('ryu') !== a.bondLevel('ryu')) mal('bondLevel no sobrevive');
  else ok(`el vínculo con ryu vuelve en ${b.bondLevel('ryu')}`);

  if (b.pron().key !== 'she') mal(`los pronombres no vuelven: ${b.pron().key}`);
  else ok('los pronombres vuelven');
}

/* =========================================================
   3 · Subir SAVE_VERSION protege de verdad
   ========================================================= */
async function compruebaVersion() {
  console.log('\n3 · Una partida de otra versión se rechaza');

  localStorage.clear();
  const st = await import('../src/engine/state.js?version');

  const vieja = JSON.parse(JSON.stringify(st.S));
  vieja.v = st.SAVE_VERSION + 1;
  localStorage.setItem(CLAVE, JSON.stringify(vieja));
  if (st.load()) mal('load() acepta una partida de otra versión');
  else ok('una partida de versión distinta se rechaza');

  /* Aquí load() avisa por consola, y hace bien. Lo callamos para
     que el aviso esperado no parezca un fallo del script. */
  localStorage.setItem(CLAVE, '{esto no es json');
  const warn = console.warn;
  console.warn = () => {};
  const aceptaBasura = st.load();
  console.warn = warn;
  if (aceptaBasura) mal('load() acepta basura');
  else ok('un guardado ilegible se rechaza sin reventar');

  localStorage.clear();
  if (st.load()) mal('load() dice que sí sin guardado ninguno');
  else ok('sin guardado, load() devuelve false');
}

/* =========================================================
   4 · El guardado con retardo llega a escribir
   ========================================================= */
async function compruebaRetardo() {
  console.log('\n4 · El guardado con retardo (el que usa casi todo)');

  localStorage.clear();
  const st = await import('../src/engine/state.js?retardo');

  st.setFlag('una_bandera');   // save() sin immediate: 220 ms
  if (localStorage.getItem(CLAVE)) {
    aviso('setFlag ha escrito al momento', 'Se esperaba el retardo de 220 ms.');
  }
  await espera(400);
  const raw = localStorage.getItem(CLAVE);
  if (!raw) { mal('tras 400 ms el guardado con retardo no ha escrito nada'); return; }
  const leido = JSON.parse(raw);
  if (leido.flags?.una_bandera !== true) mal('el guardado con retardo escribe pero sin el cambio');
  else ok('el guardado con retardo acaba escribiendo el cambio');
}

/* =========================================================
   Arranque
   ========================================================= */
console.log('Comprobación del guardado — src/engine/state.js');

await compruebaForma();
await compruebaIdaYVuelta();
await compruebaVersion();
await compruebaRetardo();

console.log('');
if (fallos) {
  console.log(`${fallos} fallo(s)${avisos ? `, ${avisos} aviso(s)` : ''}.`);
  process.exit(1);
}
console.log(avisos ? `Todo bien, con ${avisos} aviso(s).` : 'Todo bien.');
process.exit(0);
