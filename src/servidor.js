// =============================================================================
// PARTE 2 · Hablar con el servidor: promesas (2 puntos)
//
// El "servidor" está en api.js (no lo modifiques). Sus dos funciones devuelven
// PROMESAS y tardan un poco en contestar:
//
//   pedirCatalogo()  -> promesa con el array de todas las canciones
//   pedirCancion(id) -> promesa con una canción; se RECHAZA si el id no existe
//
// Puedes usar .then()/.catch() o async/await, lo que prefieras.
//
// Comprueba sólo esta parte con:  npm run test:servidor
// =============================================================================

const { pedirCatalogo, pedirCancion } = require('./api');

/**
 * 2.1 · Devuelve una promesa que se cumple pasados `ms` milisegundos.
 * Constrúyela tú con new Promise y setTimeout.
 *
 *   esperar(1000).then(() => console.log('ha pasado un segundo'));
 */
const esperar = (ms) => {
  // TODO
};

/**
 * 2.2 · Pide el catálogo al servidor y devuelve una promesa que se cumple con
 * un array con SÓLO los títulos, en el mismo orden.
 *
 *   cargarTitulos().then((t) => console.log(t));
 *     // ['Luz de neón', 'Verano en Marte', ...]
 */
const cargarTitulos = () => {
  // TODO
};

/**
 * 2.3 · Pide una canción al servidor y devuelve una promesa que se cumple con
 * ella. Si el servidor la rechaza (no existe), la promesa NO debe rechazarse:
 * se cumple con null.
 *
 *   cargarCancion(1)  -> promesa que se cumple con { id: 1, titulo: 'Luz de neón', ... }
 *   cargarCancion(99) -> promesa que se cumple con null
 */
const cargarCancion = (id) => {
  // TODO
};

module.exports = { esperar, cargarTitulos, cargarCancion };
