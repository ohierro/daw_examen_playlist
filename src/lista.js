// =============================================================================
// PARTE 1 · Datos de la lista de reproducción (4 puntos)
//
// Cada canción es un objeto como este (la duración va en SEGUNDOS):
//
//   { id: 1, titulo: 'Luz de neón', artista: 'Los Satélites', genero: 'rock', duracion: 215 }
//
// Normas de esta parte:
//   - Todas las funciones se escriben como FUNCIONES FLECHA.
//   - Usa el método de array que se indica en cada una.
//   - No cambies los nombres ni los parámetros: los tests los usan.
//
// Comprueba sólo esta parte con:  npm run test:lista
// =============================================================================

/**
 * 1.1 · Convierte una duración en segundos al formato "m:ss".
 * Los segundos siempre llevan dos cifras. Los minutos pueden pasar de 59.
 *
 *   formatearDuracion(215)  -> '3:35'
 *   formatearDuracion(65)   -> '1:05'
 *   formatearDuracion(0)    -> '0:00'
 *   formatearDuracion(3725) -> '62:05'
 */
const formatearDuracion = (segundos) => {
  // TODO
};

/**
 * 1.2 · Añade una canción AL FINAL de la lista (modifica la lista) con push.
 * Devuelve la nueva longitud de la lista.
 *
 *   anadirCancion([c1, c2], c3) -> 3   (y la lista queda [c1, c2, c3])
 */
const anadirCancion = (lista, cancion) => {
  // TODO
};

/**
 * 1.3 · "Deshacer": quita la ÚLTIMA canción de la lista (modifica la lista)
 * con pop y la devuelve. Si la lista está vacía, devuelve null.
 *
 *   deshacerUltima([c1, c2]) -> c2   (y la lista queda [c1])
 *   deshacerUltima([])       -> null
 */
const deshacerUltima = (lista) => {
  // TODO
};

/**
 * 1.4 · Devuelve un array NUEVO con las canciones de un género, usando filter.
 * No distingue mayúsculas: 'Rock', 'ROCK' y 'rock' valen lo mismo.
 * La lista original no se modifica.
 *
 *   porGenero(lista, 'Pop') -> [ ...sólo las canciones de pop ]
 */
const porGenero = (lista, genero) => {
  // TODO
};

/**
 * 1.5 · Devuelve una FUNCIÓN que recibe una canción y dice (true/false) si
 * dura MÁS de los segundos indicados. Pensada para pasársela a filter.
 *
 *   const masDe4Min = masLargaQue(240);
 *   masDe4Min({ ..., duracion: 300 }) -> true
 *   masDe4Min({ ..., duracion: 240 }) -> false
 *   lista.filter(masLargaQue(240))    -> las que duran más de 4 minutos
 */
const masLargaQue = (segundos) => {
  // TODO
};

/**
 * 1.6 · Devuelve un array de textos, uno por canción, usando map.
 * Formato: "<titulo> · <artista> (<duración m:ss>)". Usa formatearDuracion.
 *
 *   describir([{ titulo: 'Luz de neón', artista: 'Los Satélites', duracion: 215, ... }])
 *     -> ['Luz de neón · Los Satélites (3:35)']
 */
const describir = (lista) => {
  // TODO
};

/**
 * 1.7 · Devuelve la duración total de la lista en segundos, usando reduce.
 * Una lista vacía dura 0.
 *
 *   duracionTotal([{ duracion: 200 }, { duracion: 100 }]) -> 300
 *   duracionTotal([])                                     -> 0
 */
const duracionTotal = (lista) => {
  // TODO
};

/**
 * 1.8 · Cuenta cuántas canciones hay de cada género. Recorre la lista con
 * for...of o con forEach y devuelve un objeto { genero: cantidad }.
 *
 *   contarPorGenero(lista) -> { rock: 2, pop: 2, jazz: 2 }
 *   contarPorGenero([])    -> {}
 */
const contarPorGenero = (lista) => {
  // TODO
};

module.exports = {
  formatearDuracion,
  anadirCancion,
  deshacerUltima,
  porGenero,
  masLargaQue,
  describir,
  duracionTotal,
  contarPorGenero,
};
