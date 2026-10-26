// =============================================================================
// PARTE 3 · La página: manejo del DOM (3,5 puntos)
//
// La estructura de la página está en index.html. Los elementos que vas a usar:
//
//   #form-cancion  formulario con los campos #titulo, #artista, #genero, #duracion
//   #lista         <ul> donde se pintan las canciones
//   #total         <span> con la duración total
//   #deshacer      botón que quita la última canción
//
// Esta parte reutiliza tres funciones de la parte 1: formatearDuracion,
// duracionTotal y deshacerUltima. Tienen que funcionar para que pasen
// algunos tests de aquí.
//
// Comprueba sólo esta parte con:  npm run test:interfaz
// =============================================================================

const { formatearDuracion, duracionTotal, deshacerUltima } = require('./lista');

/**
 * 3.1 · Crea (sin añadirlo a la página) el <li> de una canción:
 *
 *   <li data-id="1">Luz de neón · Los Satélites (3:35) <button class="quitar">Quitar</button></li>
 *
 * Usa document.createElement. Devuelve el <li>.
 */
const crearElemento = (cancion) => {
  // TODO
};

/**
 * 3.2 · Vacía el <ul> que recibe y añade un <li> (crearElemento) por cada
 * canción de la lista. Si se llama dos veces, no se duplican los elementos.
 */
const pintarLista = (lista, ul) => {
  // TODO
};

/**
 * 3.3 · Escribe en el elemento que recibe la duración total de la lista
 * en formato m:ss.
 *
 *   actualizarTotal(lista, document.querySelector('#total'));  // <span>12:23</span>
 */
const actualizarTotal = (lista, elemento) => {
  // TODO
};

/**
 * 3.4 · Pone la página en marcha con la lista recibida. Al llamarla:
 *
 *   a) Pinta la lista en #lista y la duración en #total.
 *   b) Botón #deshacer: quita la última canción de la lista y actualiza la página.
 *   c) Botones "Quitar" de cada <li>: quitan ESA canción de la lista
 *      (búscala por su id) y actualizan la página. Pista: delegación de
 *      eventos sobre #lista, event.target.closest('li') y dataset.
 *   d) Formulario #form-cancion: al enviarlo, sin recargar la página, añade al
 *      final de la lista una canción nueva con los valores de los campos
 *      (la duración como número; como id, uno mayor que el mayor existente,
 *      o 1 si la lista está vacía) y actualiza la página.
 *
 * Importante: la lista recibida se MODIFICA (push, pop, splice...); no crees
 * una nueva, porque los tests miran ese mismo array.
 */
const iniciar = (lista) => {
  // TODO
};

module.exports = { crearElemento, pintarLista, actualizarTotal, iniciar };
