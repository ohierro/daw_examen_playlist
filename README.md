# Examen · Mi lista de reproducción

Vas a programar la lógica de una pequeña aplicación de música: los datos de
una lista de reproducción, la conversación con un servidor y la página que
la muestra. Cada parte tiene sus tests, así que **sabrás tu nota de tests
antes de entregar**.

- **Duración:** 1 hora.
- **Sin conexión a internet.** Puedes usar los apuntes que tengas en papel o
  en tu equipo si el profesor lo permite.
- **Material:** este proyecto. Sólo se tocan los tres ficheros de `src/` que
  tienen `// TODO`.

---

## 0 · Antes de empezar (con internet)

Instala las dependencias **mientras todavía tienes conexión**:

```
npm install
npm test
```

Tiene que aparecer la tabla de puntuación con todo a 0. Si es así, el
proyecto está listo y ya puedes trabajar sin internet. Si `npm install`
falla, avisa al profesor **antes** de que se corte la conexión.

---

## 1 · Qué hay en el proyecto

```
src/
  lista.js       PARTE 1 · la escribes tú
  servidor.js    PARTE 2 · la escribes tú
  interfaz.js    PARTE 3 · la escribes tú
  api.js         servidor simulado        (no se toca)
index.html       estructura de la página  (no se toca)
tests/           tests y cálculo de nota  (no se tocan)
```

Cada función de `src/` ya tiene escrito su nombre y sus parámetros, un
comentario que explica qué debe hacer con ejemplos, y un `// TODO` donde va
tu código. **No cambies los nombres de las funciones ni los `module.exports`
del final**: los tests los usan.

Cada canción es un objeto como este. La duración va **en segundos**:

```js
{ id: 1, titulo: 'Luz de neón', artista: 'Los Satélites', genero: 'rock', duracion: 215 }
```

---

## 2 · Cómo comprobar tu trabajo

| Orden | Qué ejecuta |
|---|---|
| `npm test` | todos los tests y la nota total |
| `npm run test:lista` | sólo la parte 1 |
| `npm run test:servidor` | sólo la parte 2 |
| `npm run test:interfaz` | sólo la parte 3 |

Al final de la salida verás algo así:

```
  PUNTUACIÓN (tests)
  ────────────────────────────────────
  Parte 1 · Datos           2,5 / 4
  Parte 2 · Promesas          1 / 2
  Parte 3 · DOM             1,5 / 3,5
  ────────────────────────────────────
  Total tests                 5 / 9,5
  Revisión del profesor       ? / 0,5
```

Cuando un test falla, Jest te dice qué esperaba (`Expected`) y qué ha
recibido (`Received`). Léelo: suele decir exactamente qué falta.

> Si una parte sale con «el fichero no carga», tienes un error de sintaxis
> (un paréntesis o una llave sin cerrar…). Mientras no lo arregles, esa
> parte vale 0.

---

## 3 · Enunciado

Las partes son **independientes en lo posible**: si te atascas en una
función, pasa a la siguiente. La única dependencia es que la parte 3 usa
`formatearDuracion`, `duracionTotal` y `deshacerUltima` de la parte 1.
Hazlas primero: son de las más cortas.

Orden recomendado: parte 1 → parte 2 → parte 3. El tiempo es orientativo.

### Parte 1 · Datos — `src/lista.js` (4 puntos, ~20 min)

Funciones sobre un array de canciones. **Todas se escriben como funciones
flecha**, cada una con el método que se indica.

| # | Función | Qué hace | Con |
|---|---|---|---|
| 1.1 | `formatearDuracion(segundos)` | `215` → `'3:35'` | `Math.floor`, `%` |
| 1.2 | `anadirCancion(lista, cancion)` | añade al final y devuelve la nueva longitud | `push` |
| 1.3 | `deshacerUltima(lista)` | quita la última y la devuelve; `null` si está vacía | `pop` |
| 1.4 | `porGenero(lista, genero)` | canciones de ese género, sin distinguir mayúsculas | `filter` |
| 1.5 | `masLargaQue(segundos)` | **devuelve una función** que dice si una canción dura más | flecha que devuelve flecha |
| 1.6 | `describir(lista)` | `['Luz de neón · Los Satélites (3:35)', ...]` | `map` |
| 1.7 | `duracionTotal(lista)` | suma de las duraciones (0 si está vacía) | `reduce` |
| 1.8 | `contarPorGenero(lista)` | `{ rock: 2, pop: 1, jazz: 1 }` | `for...of` o `forEach` |

### Parte 2 · Promesas — `src/servidor.js` (2 puntos, ~15 min)

`src/api.js` imita un servidor que tarda en contestar. Sus funciones
**devuelven promesas**:

- `pedirCatalogo()` se cumple con el array de todas las canciones.
- `pedirCancion(id)` se cumple con la canción, o **se rechaza** con un
  `Error` si ese id no existe.

| # | Función | Qué hace |
|---|---|---|
| 2.1 | `esperar(ms)` | devuelve una promesa que se cumple pasados `ms` milisegundos: constrúyela con `new Promise` y `setTimeout` |
| 2.2 | `cargarTitulos()` | promesa con un array de **sólo los títulos** del catálogo |
| 2.3 | `cargarCancion(id)` | promesa con la canción pedida… |
| 2.4 | | …y si el servidor la rechaza, se cumple con `null` en vez de fallar |

Puedes usar `.then()`/`.catch()` o `async`/`await`.

### Parte 3 · DOM — `src/interfaz.js` (3,5 puntos, ~25 min)

Abre `index.html` para ver los elementos de la página y sus `id`. Los tests
cargan ese mismo HTML en un navegador simulado (jsdom), así que `document`
funciona igual que en Chrome.

| # | Función | Qué hace |
|---|---|---|
| 3.1 | `crearElemento(cancion)` | crea y devuelve `<li data-id="1">Luz de neón · Los Satélites (3:35) <button class="quitar">Quitar</button></li>` |
| 3.2 | `pintarLista(lista, ul)` | vacía el `<ul>` y añade un `<li>` por canción |
| 3.3 | `actualizarTotal(lista, elemento)` | escribe la duración total, en `m:ss`, en el elemento |
| 3.4 | `iniciar(lista)` | pone la página en marcha (ver abajo) |

`iniciar(lista)` tiene cuatro piezas, y **cada una puntúa por separado**:

- **a)** Al llamarla, pinta la lista en `#lista` y el total en `#total`.
- **b)** El botón `#deshacer` quita la última canción y actualiza la página.
- **c)** Cada botón «Quitar» quita **su** canción (búscala por el id del
  `<li>`) y actualiza la página.
- **d)** Al enviar `#form-cancion`, **sin recargar la página**, se añade al
  final una canción con los valores del formulario. La duración se guarda
  como número, y el id es uno más que el mayor existente (1 si la lista está
  vacía). Después se actualiza la página.

`iniciar` **modifica el array que recibe** (`push`, `pop`, `splice`…): no
crees uno nuevo, porque los tests miran ese mismo array.

---

## 4 · Puntuación

| Parte | Puntos |
|---|---|
| Parte 1 · Datos (8 tests × 0,5) | 4 |
| Parte 2 · Promesas (4 tests × 0,5) | 2 |
| Parte 3 · DOM (7 tests × 0,5) | 3,5 |
| Revisión del profesor | 0,5 |
| **Total** | **10** |

Cada test vale lo que indica su título entre paréntesis y se aprueba entero
o no se aprueba.

La **revisión del profesor** comprueba lo que un test no puede ver:

- las funciones de la parte 1 son funciones flecha y usan el método pedido
  (`filter`, `map`, `reduce`…), no un `for` que haga lo mismo;
- no hay `var`: se usa `const`, y `let` sólo cuando hace falta;
- el código está ordenado y sin restos (`console.log` de pruebas, código
  comentado).

> **Importante:** el profesor corrige con **sus propios tests originales**.
> Modificar los ficheros de `tests/` no cambia tu nota: sólo te engaña a ti.

---

## 5 · Pistas de sintaxis

Una chuleta mínima, porque no tienes internet. No son soluciones.

```js
// Rellenar con ceros por la izquierda
String(5).padStart(2, '0');                 // '05'

// Métodos de array
[1, 2, 3].filter((n) => n > 1);             // [2, 3]
[1, 2, 3].map((n) => n * 10);               // [10, 20, 30]
[1, 2, 3].reduce((acc, n) => acc + n, 0);   // 6
[1, 2, 3].findIndex((n) => n === 2);        // 1
lista.splice(posicion, 1);                  // quita 1 elemento en esa posición

// Una función flecha que devuelve otra función
const multiplicarPor = (n) => (x) => x * n;
multiplicarPor(3)(5);                       // 15

// Promesas
new Promise((resolve, reject) => { /* ... */ resolve(valor); });
promesa.then((valor) => /* ... */).catch((error) => /* ... */);
const f = async () => { try { const v = await promesa; } catch (e) { } };

// DOM
const li = document.createElement('li');
li.textContent = 'texto';
li.dataset.id = 7;                          // <li data-id="7">
ul.append(li);
ul.replaceChildren();                       // vacía el elemento
elemento.addEventListener('click', (evento) => { /* ... */ });
evento.target.closest('li');                // el <li> más cercano hacia arriba
formulario.addEventListener('submit', (e) => { e.preventDefault(); });
```

---

## 6 · Entrega

1. Ejecuta `npm test` una última vez y apunta tu nota de tests.
2. Entrega **sólo la carpeta `src/`** (comprimida como
   `apellido-nombre.zip`), o lo que te indique el profesor. **No incluyas
   `node_modules/`.**
