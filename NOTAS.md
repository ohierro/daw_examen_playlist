# Notas de referencia

Chuleta de JavaScript para consultar durante el examen. Los ejemplos usan
datos que no son los del examen (números, productos…): sirven para recordar
**cómo se escribe** cada cosa, no son la solución de ningún ejercicio.

Índice:
[1 Funciones flecha](#1--funciones-flecha) ·
[2 Arrays](#2--arrays) ·
[3 Textos y números](#3--textos-y-números) ·
[4 Objetos](#4--objetos) ·
[5 Temporizadores](#5--temporizadores) ·
[6 Promesas](#6--promesas) ·
[7 DOM](#7--dom) ·
[8 Eventos](#8--eventos) ·
[9 Módulos CommonJS](#9--módulos-commonjs)

---

## 1 · Funciones flecha

```js
// Forma larga: llaves y return explícito
const sumar = (a, b) => {
  const resultado = a + b;
  return resultado;
};

// Forma corta: una sola expresión, el return es implícito (SIN llaves)
const doble = (n) => n * 2;

// Sin parámetros: paréntesis vacíos
const saludar = () => 'hola';

// Devolver un objeto en forma corta: hay que envolverlo en paréntesis
const crearPunto = (x, y) => ({ x, y });
```

> ⚠️ Con llaves y sin `return`, la función devuelve `undefined`:
> `const doble = (n) => { n * 2 };` → `doble(3)` es `undefined`.

**Funciones que devuelven funciones.** Una flecha puede devolver otra flecha.
La de dentro "recuerda" los parámetros de la de fuera (closure):

```js
const sumarle = (n) => (x) => x + n;

const sumar10 = sumarle(10);   // sumar10 es una función
sumar10(5);                    // 15
[1, 2, 3].map(sumarle(100));   // [101, 102, 103]
```

---

## 2 · Arrays

### Añadir y quitar (modifican el array original)

| Método | Qué hace | Devuelve |
|---|---|---|
| `arr.push(x)` | añade `x` **al final** | la nueva longitud |
| `arr.pop()` | quita el **último** | el elemento quitado (`undefined` si estaba vacío) |
| `arr.unshift(x)` | añade `x` **al principio** | la nueva longitud |
| `arr.shift()` | quita el **primero** | el elemento quitado (`undefined` si estaba vacío) |
| `arr.splice(pos, n)` | quita `n` elementos desde la posición `pos` | un array con los quitados |

```js
const pila = [1, 2];
pila.push(3);        // 3        pila: [1, 2, 3]
pila.pop();          // 3        pila: [1, 2]
pila.pop();          // 2        pila: [1]
[].pop();            // undefined

const letras = ['a', 'b', 'c', 'd'];
letras.splice(1, 2); // ['b', 'c']   letras: ['a', 'd']
```

### Recorrer

```js
const precios = [10, 20, 30];

for (const precio of precios) {        // for...of: el valor de cada elemento
  console.log(precio);
}

precios.forEach((precio, indice) => {  // forEach: no devuelve nada
  console.log(indice, precio);
});
```

> `for...in` recorre las **claves**, no los valores. Para arrays, usa `for...of`.

### Métodos que devuelven algo nuevo (NO modifican el original)

Todos reciben una función (el *callback*). El callback recibe
`(elemento, indice, arrayCompleto)`, y casi siempre basta con el primero.

| Método | El callback devuelve… | El método devuelve… |
|---|---|---|
| `filter(cb)` | `true` / `false` | un array **nuevo** con los elementos que dieron `true` |
| `map(cb)` | el valor transformado | un array **nuevo** de la misma longitud |
| `reduce(cb, inicial)` | el nuevo acumulado | **un solo valor** |
| `find(cb)` | `true` / `false` | el **primer** elemento que da `true`, o `undefined` |
| `findIndex(cb)` | `true` / `false` | la **posición** del primero que da `true`, o `-1` |
| `some(cb)` | `true` / `false` | `true` si **alguno** cumple |
| `every(cb)` | `true` / `false` | `true` si **todos** cumplen |

```js
const productos = [
  { nombre: 'Lápiz', precio: 1, tipo: 'papelería' },
  { nombre: 'Cuaderno', precio: 3, tipo: 'papelería' },
  { nombre: 'Taza', precio: 6, tipo: 'cocina' },
];

productos.filter((p) => p.precio > 2);         // [Cuaderno, Taza]
productos.map((p) => p.nombre);                // ['Lápiz', 'Cuaderno', 'Taza']
productos.find((p) => p.tipo === 'cocina');    // { nombre: 'Taza', ... }
productos.findIndex((p) => p.nombre === 'Taza'); // 2
productos.some((p) => p.precio > 5);           // true
productos.every((p) => p.precio > 5);          // false
```

**`reduce` paso a paso.** El callback recibe `(acumulado, elemento)`. El
segundo argumento de `reduce` es el valor inicial del acumulado:

```js
[4, 5, 6].reduce((acc, n) => acc + n, 0);
// vuelta 1: acc = 0,  n = 4  -> 4
// vuelta 2: acc = 4,  n = 5  -> 9
// vuelta 3: acc = 9,  n = 6  -> 15
// resultado: 15

[].reduce((acc, n) => acc + n, 0);   // 0  (con array vacío devuelve el inicial)
```

> ⚠️ Sin valor inicial, `reduce` sobre un array vacío **lanza un error**.
> Pon siempre el inicial.

**Encadenar.** Como `filter` y `map` devuelven arrays, se pueden encadenar:

```js
productos
  .filter((p) => p.tipo === 'papelería')
  .map((p) => p.precio)
  .reduce((acc, precio) => acc + precio, 0);   // 4
```

### Otros útiles

```js
[1, 2, 3].includes(2);   // true
[1, 2, 3].length;        // 3
[1, 2, 3].slice(0, 2);   // [1, 2]   (copia un trozo, no modifica)
[...arr];                // copia superficial del array
```

---

## 3 · Textos y números

```js
// Plantillas de texto (comillas invertidas)
const nombre = 'Ana';
`Hola, ${nombre}. Tienes ${2 + 3} mensajes`;   // 'Hola, Ana. Tienes 5 mensajes'

// Mayúsculas y minúsculas
'Hola'.toLowerCase();    // 'hola'
'Hola'.toUpperCase();    // 'HOLA'
'  hola  '.trim();       // 'hola'

// Rellenar por la izquierda hasta una longitud
'7'.padStart(3, '0');    // '007'
String(7).padStart(2, '0'); // '07'   (padStart es de los textos: convierte antes)

// División entera y resto
Math.floor(17 / 5);      // 3
17 % 5;                  // 2
Math.max(4, 9, 2);       // 9

// Convertir texto a número (los valores de un <input> siempre son texto)
Number('42');            // 42
Number('');              // 0
Number('hola');          // NaN
```

---

## 4 · Objetos

```js
const libro = { titulo: 'Dune', paginas: 600 };

libro.titulo;            // 'Dune'
libro['titulo'];         // 'Dune'  (corchetes: la clave puede venir de una variable)

const clave = 'paginas';
libro[clave];            // 600

// Añadir o cambiar una propiedad cuya clave está en una variable
const contador = {};
contador['a'] = 1;                         // { a: 1 }
contador['a'] = contador['a'] + 1;         // { a: 2 }

// Valor por defecto si no existe: ?? (sólo sustituye null y undefined)
contador['b'] ?? 0;      // 0

// Copiar un objeto (spread)
const copia = { ...libro, paginas: 700 };  // { titulo: 'Dune', paginas: 700 }
```

---

## 5 · Temporizadores

| Función | Qué hace | Se cancela con |
|---|---|---|
| `setTimeout(fn, ms)` | ejecuta `fn` **una vez**, pasados `ms` milisegundos | `clearTimeout(id)` |
| `setInterval(fn, ms)` | ejecuta `fn` **cada** `ms` milisegundos, hasta que se cancela | `clearInterval(id)` |

Las dos devuelven un identificador, que es lo que se pasa para cancelarlas.

```js
// Una vez, dentro de 2 segundos
const id = setTimeout(() => console.log('¡ya!'), 2000);
clearTimeout(id);      // si se llama antes de los 2 s, no llega a ejecutarse

// Cada segundo, y se para al llegar a 3
let cuenta = 0;
const intervalo = setInterval(() => {
  cuenta++;
  console.log(cuenta);
  if (cuenta === 3) clearInterval(intervalo);
}, 1000);
```

> ⚠️ `setTimeout` **no bloquea**: el código de después se ejecuta enseguida,
> y la función que le pasas se ejecuta más tarde.
>
> ```js
> setTimeout(() => console.log('B'), 0);
> console.log('A');
> // Imprime A y después B
> ```

---

## 6 · Promesas

Una promesa representa un valor que **llegará más tarde**. Puede
**cumplirse** (con un valor) o **rechazarse** (con un error).

### Crear una promesa

```js
const tirarMoneda = () =>
  new Promise((resolve, reject) => {
    // resolve(valor) -> la cumple        reject(error) -> la rechaza
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('cara');
      } else {
        reject(new Error('ha salido cruz'));
      }
    }, 1000);
  });
```

El nombre de los parámetros es libre, pero por convención son `resolve` y
`reject`. Si nunca vas a rechazar, basta con `(resolve) => { ... }`. A
`resolve` se le puede pasar directamente como la función que hay que llamar:
`setTimeout(resolve, 1000)` cumple la promesa al cabo de un segundo, sin valor.

### Consumirla con `then` / `catch`

```js
tirarMoneda()
  .then((resultado) => console.log('Salió', resultado))   // si se cumple
  .catch((error) => console.log('Error:', error.message)) // si se rechaza
  .finally(() => console.log('Fin'));                     // siempre
```

**Lo que devuelves dentro de un `then` es el valor de la siguiente promesa.**
Así se transforma un resultado:

```js
const pedirNumeros = () => Promise.resolve([1, 2, 3]);   // promesa ya cumplida

pedirNumeros()
  .then((numeros) => numeros.map((n) => n * 10))   // devuelve una promesa de [10, 20, 30]
  .then((r) => console.log(r));                    // [10, 20, 30]
```

**`catch` también puede devolver un valor.** Entonces la cadena sigue como
si se hubiera cumplido con ese valor:

```js
tirarMoneda()
  .catch(() => 'sin resultado')
  .then((r) => console.log(r));   // 'cara' o 'sin resultado', nunca falla
```

### Lo mismo con `async` / `await`

- Una función `async` **siempre devuelve una promesa**: lo que hagas `return`
  es el valor con el que se cumple.
- `await` espera a que la promesa se cumpla y te da su valor. Si se rechaza,
  lanza el error, que se captura con `try/catch`.

```js
const jugar = async () => {
  try {
    const resultado = await tirarMoneda();
    return `Salió ${resultado}`;
  } catch (error) {
    return `Falló: ${error.message}`;
  }
};

jugar().then((mensaje) => console.log(mensaje));
```

> ⚠️ `await` sólo se puede usar **dentro** de una función `async`.
>
> ⚠️ Si una función tiene que devolver una promesa, **devuélvela**:
> `const f = () => { pedirNumeros().then(...) }` devuelve `undefined`, porque
> le falta el `return` (o quitar las llaves).

### Varias a la vez: `Promise.all`

```js
const [a, b] = await Promise.all([pedirA(), pedirB()]);
// Se cumple cuando se cumplen todas; se rechaza si cualquiera falla.
```

---

## 7 · DOM

### Buscar elementos

```js
document.querySelector('#menu');           // el primero que encaja con el selector, o null
document.querySelectorAll('.tarjeta');     // todos (NodeList; se recorre con for...of o forEach)
document.getElementById('menu');           // por id, sin '#'
elemento.querySelector('button');          // busca DENTRO de un elemento
```

### Crear, añadir y quitar

```js
const p = document.createElement('p');     // crea <p> (todavía no está en la página)
p.textContent = 'Hola';                    // texto (seguro: no interpreta HTML)
p.className = 'aviso';                     // class="aviso"
p.classList.add('rojo');                   // añade otra clase
p.dataset.id = 7;                          // data-id="7" (se lee siempre como TEXTO: '7')

contenedor.append(p);                      // lo añade al final de contenedor
contenedor.append(p1, p2);                 // se pueden añadir varios
contenedor.prepend(p);                     // lo añade al principio

p.remove();                                // lo quita de la página
contenedor.replaceChildren();              // vacía el contenedor
contenedor.innerHTML = '';                 // también lo vacía
```

> `textContent` escribe texto tal cual. `innerHTML` interpreta HTML: úsalo
> sólo con textos que hayas escrito tú, nunca con lo que escribe el usuario.

### Formularios

```js
const campo = document.querySelector('#edad');
campo.value;              // lo escrito, SIEMPRE como texto: '18'
Number(campo.value);      // 18
campo.value = '';         // vaciar el campo
formulario.reset();       // vaciar todos los campos del formulario
```

---

## 8 · Eventos

```js
boton.addEventListener('click', (evento) => {
  console.log('pulsado', evento.target);   // target: el elemento donde se hizo clic
});
```

| Propiedad / método | Para qué |
|---|---|
| `evento.target` | el elemento exacto que originó el evento |
| `evento.preventDefault()` | evita el comportamiento por defecto (p. ej. que un formulario recargue la página) |
| `elemento.closest('selector')` | sube por los padres hasta el primero que encaje con el selector (incluido él mismo) |
| `elemento.matches('selector')` | `true` si el elemento encaja con el selector |

**Formulario sin recargar la página:**

```js
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  // ...leer los campos y hacer lo que toque
});
```

**Delegación de eventos.** En lugar de poner un listener en cada botón, se
pone **uno solo en el contenedor**. El clic "sube" desde el botón hasta el
contenedor, y con `target` se averigua de dónde vino. También funciona con
los botones que se creen después.

```js
// <ul id="tareas"> <li data-id="3">Comprar <button class="borrar">x</button></li> ... </ul>
lista.addEventListener('click', (evento) => {
  if (!evento.target.matches('.borrar')) return;   // el clic no fue en un botón borrar
  const li = evento.target.closest('li');
  console.log('borrar la tarea', li.dataset.id);    // '3' (texto)
});
```

> ⚠️ Si añades el listener **dentro** de una función que repinta la lista, se
> añade otra vez en cada repintado y el código se ejecuta varias veces.
> Añade los listeners **una sola vez**.

---

## 9 · Módulos CommonJS

Así se comparten funciones entre ficheros en este proyecto:

```js
// matematicas.js
const doble = (n) => n * 2;
const triple = (n) => n * 3;
module.exports = { doble, triple };

// otro.js
const { doble } = require('./matematicas');   // ruta relativa, sin .js
doble(4);   // 8
```

Para probar algo rápido sin tests: `node -e "console.log(require('./src/lista').formatearDuracion(90))"`.
