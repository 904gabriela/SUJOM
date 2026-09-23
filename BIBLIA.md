# Biblia de ASSIST: Connected Hearts

> Esto es la fuente de verdad. Cuando el guion y este documento no
> coincidan, el que está mal es el guion.
>
> Existe porque no existía: la premisa se había hablado antes de empezar
> los diseños, no se escribió en ningún sitio, y las fichas de los
> personajes acabaron contando otra historia sin que nadie lo notara.

## Qué es SUJOM

**SUJOM no es una app de romance para todo el mundo.** Está diseñada
para que le interese exactamente a la gente que ASSIST quiere captar.
Que parezca un juego es la parte del disfraz que se ve.

## Cómo recluta ASSIST

El orden importa, porque de él sale el tono de todo el juego:

1. **Observan.** Analizan a la persona durante un tiempo en redes
   sociales y otras plataformas.
2. **Esperan a tener bastante.** No actúan hasta saber por dónde entra.
3. **Anuncian.** Empiezan a promocionar SUJOM de forma dirigida, para
   que descargarlo parezca idea suya.

El sujeto cree que ha elegido. Es lo único que se lleva de todo esto.

### Por dónde entró cada uno

| | Lo que ASSIST vio |
|---|---|
| **Reiko** | Necesita dinero. Se la puede manipular por sus debilidades. |
| **Kenta** | Está desesperado por dinero. |
| **Lara** | Es inocente y se la manipula fácil. |
| **Ryu** | No hubo manera de que se la descargara. Un día apareció en su teléfono. |

Lo de Ryu no es una anécdota: es la única vez que ASSIST deja de
disimular. Con los otros tres hay una historia que se pueden contar a sí
mismos. Con él no.

## Qué pasa después

1. **Se registran.** Desde que hay acceso, sus datos están en el sistema.
2. **Les dan cosas.** Beneficios, ventajas, regalos. Poco a poco, para
   que se queden.
3. **Les ofrecen el equipo de afiliados**, con una cantidad de dinero
   por delante.
4. **Firman el contrato.** Eso es lo que ellos creen que están haciendo.
5. **Los conectan a la maquinaria** e introducen sus conciencias dentro
   del juego.

**Algunos llevan un año. Otros llevan cinco. Ninguno lo sabe.** Para
ellos sólo están chateando.

## El reparto

Las hojas de diseño mandan. Están en `art-crudo/` y son de septiembre de
2026.

| | Edad | Es | Lo que le pesa |
|---|---|---|---|
| **Ryu** | 26 | Serio, actitud de líder aunque nadie le haga caso | Su familia murió y crió a su hermano pequeño. Vendió droga, robó, fue sicario. No habla de él ni de su vida. |
| **Kenta Hayashi** | 23 | Alto, reactivo, pasional, se cree mejor que el resto | Padres alcohólicos y agresivos. Dejó el instituto y entró en una pandilla con su mejor amigo. El amigo murió parando una pelea. Desde entonces va solo. |
| **Lara** (no es su nombre real) | 18 | Influencer de moda, extroverta, enamoradiza, soñadora | Padres juntos, tres hermanos mayores. Un perro, Sándwich. Pelo y ojos rosas. |

> **Sándwich** es un **mini toy blanco de pelo rizado** — bichón o caniche
> toy, cabeza redonda y esponjosa, ojos oscuros y redondos, patas cortas.
> No es un terrier de pelo duro: se pidió así una vez y estaba mal. Siete
> años y una oreja rota.
| **Reiko Kimura** | 25 | Bailarina **de heels** —baile con tacones—, no de ballet. Segura de sí misma, le gusta intimidar a los hombres | Su padre las abandonó al saber del embarazo. Su madre lo dio todo por ella y hace un año enfermó de leucemia. Reiko dejó el baile y sirve en bares y discotecas para pagarle la quimio. Una gata siamesa, Jade. Pelo gris claro, ojos casi blancos. |

## Lo que el repo contradice ahora mismo

Sin resolver. Está aquí para que no se pierda otra vez:

- **Kenta** es el más grave. En el guion su familia le quiere y le
  ahoga, y no vuelve por orgullo. En la hoja huye de una casa que le
  hacía daño. Es el motivo contrario, no un detalle: su ruta hay que
  rehacerla.
- **Reiko** es sustitución entera. Ainsel, el fraude de sus socios y la
  prensa no existen. Unas 25 menciones entre su ruta, las notas y los
  finales.
- **Ryu** aguanta con cambio de piel: hermana → hermano, 20 → 26. El
  pasado criminal es nuevo y añade, pero le sube el tono a su ruta.
- **Lara** cambia de piel y de color: en el código es rubia de ojos
  verdes con acento dorado, y es rosa. Eso hay que tocarlo aunque no se
  escriba una línea, porque de ahí sale el arte generado.

Dos cosas más, pequeñas y sueltas:

- **Las fechas de ingreso no dan cinco años.** Están todas entre
  noviembre de 2023 y septiembre de 2024, diez meses. Si alguien lleva
  cinco años, alguna fecha tiene que irse a 2020.

  El registro interno guarda la edad de cada uno **al entrar**, y
  restando salen los años que llevan dentro:

  | | Sujeto | Ingreso | Edad al entrar | Edad ahora | Lleva |
  |---|---|---|---|---|---|
  | Ryu | C-04 | 14/11/2023 | 20 | 26 | 6 años |
  | Kenta | C-02 | 03/02/2024 | 18 | 23 | 5 años |
  | Lara | C-03 | 21/06/2024 | 17 | 18 | 1 año |
  | Reiko | C-05 | 09/09/2024 | 25 | 25 | recién llegada |

  Las cuentas de la derecha son las buenas: son las que dice la
  historia. Las fechas de la izquierda no las sostienen, porque entre
  todas hay diez meses. **Se arreglan moviendo las fechas, no las
  edades.**

  Y para poder moverlas falta un número que no está escrito en ningún
  sitio: **en qué año transcurre el juego.** Mientras eso no se
  decida, cualquier fecha que se ponga es a ojo.
- **No hay ningún C-01.** Los sujetos van del C-02 al C-05. O es a
  propósito y significa algo, o es un hueco.

## El arte final lo dibujan personas

**Nada de lo que hay generado en `assets/` es arte final.** Los
retratos, los stickers, las fotos de perfil y lo que venga del álbum
son **bocetos para poder ver cómo queda el juego montado**. El arte de
los personajes lo van a dibujar artistas de verdad.

Eso cambia tres cosas, y conviene tenerlas claras antes de seguir
pidiendo imágenes:

- **El listón es «se entiende la idea», no «está terminado».** En
  cuanto una imagen sirve para decidir si la idea funciona, ya ha
  hecho su trabajo. Insistir para que salga perfecta es tiempo y
  créditos tirados: esa pieza se va a volver a dibujar igualmente.
- **Lo que hay que dejar bien escrito es el encargo, no la imagen.**
  Los tamaños, los encuadres, cuántas piezas, qué tiene que leerse a
  qué tamaño, el registro de cada personaje. Eso es lo que se le pasa
  a alguien. Los `ENCARGO-*.md` de `art-crudo/` son eso y por eso
  existen.
- **Los bocetos valen como referencia visual**, que es justo para lo
  que se hicieron. Enseñan el encuadre y el tono mejor que un párrafo.

### Lo que no es de los artistas

Hay cosas que parecen arte y no lo son, y esas sí están terminadas
porque las hace el código:

- **El texto de los documentos del álbum.** Se dibuja desde
  `data/photos.js`. El artista pinta el papel; las palabras las pone
  el código, y por eso se pueden corregir sin volver a encargar nada.
- **Dos de las anomalías**, `dup` y `nosun`. No son objetos que se
  puedan pintar: una copia un trozo de la imagen y lo pega en otro
  sitio, la otra oscurece la luna. Se hacen sobre el arte que llegue,
  sea de quien sea.
- **El creador de personaje.** Los ocho colores de pelo, los seis de
  piel y los cuatro peinados están dibujados por código a propósito,
  para no encargar arte de algo que el jugador combina.
- **Toda la interfaz.**

### Dónde se enchufa el arte que llegue

La estructura ya está hecha y el arte entra sustituyendo ficheros, sin
tocar código:

    assets/characters/<id>/   retratos por emoción + avatar.png
    assets/stickers/          <id>-<nombre>.png
    assets/ui/

## Todo está pintado, también las fotos

En SUJOM no hay ninguna imagen fotográfica. Los retratos, las
videollamadas, las fotos de perfil y las del álbum son todas **anime
pintado**, semirrealista. Una fotografía dentro de este mundo es una
imagen pintada que se comporta como una foto: encuadre de móvil,
profundidad de campo, grano. Pero pintada.

Es fácil olvidarlo al pedir arte, porque al modelo le pides "una foto de
un perro" y te da una foto de un perro. Pasó con el avatar de Lara: salió
un bichón fotorrealista, con pelo real y desenfoque de lente real, y al
lado de los otros tres avatares pintados cantaba muchísimo.

**La forma de evitarlo es pasar el arte pintado de un personaje como
referencia de estilo**, aunque en la imagen no salga nadie. Así lo pinta
la misma mano que al reparto.

> ⚠️ **Y tiene que ser el diseño de personaje —`portrait.png`— no el
> avatar.** Los dos están en `assets/characters/<id>/` y es fácil coger
> el que no es. El avatar **es una foto de dentro del mundo**: el de
> Kenta es un selfie con el brazo estirado hacia la cámara, el de Ryu es
> una mano en la barra de un bar. Pasar eso como referencia de estilo le
> pide al modelo que imite *una foto hecha por el personaje* en vez de
> *cómo está dibujado el personaje*, y se cuela lo que haya dentro: con
> el avatar de Kenta salieron manos y brazos en escenas donde no había
> nadie, y el dibujo salió con más textura y más grano que el reparto.
>
> Es el mismo patrón que «la palabra arrastra su equipaje», pero con una
> imagen: **la referencia arrastra lo que contiene, no sólo su estilo.**
> En escenas donde no sale nadie, la referencia se elige **por estilo, no
> por de quién es la escena**: no hay identidad que preservar.

### Y tampoco realista «bonito»

No basta con que no sea una fotografía. **El álbum va en el mismo
registro que el reparto**, y no en fondo de anime realista tipo Shinkai
—reflejos, profundidad de campo, mucho detalle—, por muy bien que quede
suelto.

Y ese registro hay que mirarlo, no recordarlo. Abre los cuatro
`portrait.png` y compáralos con lo que acabas de generar. Descrito:
**línea fina y limpia, sombra suave con degradados, paleta apagada y
clara, superficies lisas y muy poca textura.** Es un dibujo ligero y
luminoso, no uno sucio y contrastado.

> Una nota anterior lo llamaba «cel shading plano, línea visible». No
> es exacto: eso describe el avatar de Ryu, no a los personajes, y
> llevó a pedir negros aplastados, hormigón rugoso y pelo dibujado pelo
> a pelo. Si tienes que resumirlo en una frase: **línea fina, sombra
> suave, paleta clara, sin textura.**

Dos motivos, y el segundo es el que manda:

1. **El álbum está dentro del juego.** Es la galería del móvil de un
   personaje, no una ilustración de portada. Si de repente las fotos
   son realistas, sacan al jugador del juego.
2. **Las fotos no son decoración, son pruebas.** Todo el mecanismo
   consiste en que el jugador note que algo está mal: la luna que no
   se ha movido, los dos edificios con las mismas ventanas. Si las
   fotos están pintadas por otra mano que los personajes, esa rareza
   se la atribuye al estilo y no al mundo. Piensa «estas se ven
   distintas» en vez de «aquí pasa algo». **La anomalía se pierde
   dentro de la diferencia de registro.**

## Decisiones de producción

- **El chibi es sólo para los stickers.** No se encarga arte chibi del
  jugador: ni cabezas, ni ropa, ni vestidor, ni ropa comprable con
  gemas.
- **El creador de personaje se queda** tal como está: nombre,
  pronombres, ocho colores de pelo, seis de piel y cuatro peinados,
  todo dibujado por código. No cuesta arte. El nombre y los pronombres
  son obligatorios de todos modos: el guion los usa en 93 sitios.
- **Las referencias de las hojas no son el diseño.** En la hoja de
  Kenta la imagen de referencia tiene el pelo rojo y el arte pintado lo
  tiene rubio. Manda el arte.

## Hecho ya

- Edades al día en la ficha y en los tres sitios donde se dicen en voz
  alta: Ryu 26, Kenta 23, Lara 18, Reiko 25.
- Colores de respaldo muestreados del arte pintado, no inventados.
  Lara era rubia de ojos verdes en el código y es rosa.
- El perro es Sándwich.
- **Lara entró con 17.** El registro interno decía 21, que la hacía
  más joven ahora que cuando entró. Con 17 encaja además con el
  documento de su álbum: por eso hay una cesión de tutela y por eso
  la firman sus padres y no ella.

De ahí salió un efecto que no estaba previsto: **la pequeña del grupo
ahora es Lara, no Kenta.** Reiko le soltaba al jugador "ignora al menor
de edad", y ese pique se ha quedado sin edad a la que agarrarse.
