// =============================================================================
// Servidor simulado. NO MODIFIQUES ESTE FICHERO.
//
// Imita un servidor de música que tarda un poco en contestar. No hace falta
// conexión: las respuestas salen de la constante CATALOGO, pero siempre a
// través de una promesa y con retraso, igual que haría fetch.
// =============================================================================

const CATALOGO = [
  { id: 1, titulo: 'Luz de neón', artista: 'Los Satélites', genero: 'rock', duracion: 215 },
  { id: 2, titulo: 'Verano en Marte', artista: 'Nube Roja', genero: 'pop', duracion: 187 },
  { id: 3, titulo: 'Sin cobertura', artista: 'Los Satélites', genero: 'rock', duracion: 242 },
  { id: 4, titulo: 'Café a las tres', artista: 'Marta Vega', genero: 'jazz', duracion: 305 },
  { id: 5, titulo: 'Bailando en el andén', artista: 'Nube Roja', genero: 'pop', duracion: 199 },
  { id: 6, titulo: 'Tormenta lenta', artista: 'Marta Vega', genero: 'jazz', duracion: 268 },
];

// Devuelve una copia para que nadie pueda modificar el catálogo original.
const copiar = (cancion) => ({ ...cancion });

/**
 * Pide el catálogo completo. Tarda unos 300 ms.
 * @returns {Promise<Array>} promesa que se cumple con el array de canciones
 */
const pedirCatalogo = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(CATALOGO.map(copiar)), 300);
  });

/**
 * Pide una canción por su id. Tarda unos 200 ms.
 * Si el id no existe, la promesa se RECHAZA con un Error.
 * @param {number} id
 * @returns {Promise<Object>} promesa que se cumple con la canción
 */
const pedirCancion = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const cancion = CATALOGO.find((c) => c.id === id);
      if (cancion) {
        resolve(copiar(cancion));
      } else {
        reject(new Error(`No existe la canción ${id}`));
      }
    }, 200);
  });

module.exports = { pedirCatalogo, pedirCancion };
