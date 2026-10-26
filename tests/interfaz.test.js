/**
 * @jest-environment jsdom
 */

// Tests de la PARTE 3. NO MODIFIQUES ESTE FICHERO.
// El número entre paréntesis de cada test es lo que vale.
// Se ejecutan en jsdom, un navegador simulado: document existe como en Chrome.

const fs = require('node:fs');
const path = require('node:path');
const { crearElemento, pintarLista, actualizarTotal, iniciar } = require('../src/interfaz');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cuerpo = html.match(/<body>([\s\S]*)<\/body>/)[1];

const nuevaLista = () => [
  { id: 1, titulo: 'Luz de neón', artista: 'Los Satélites', genero: 'rock', duracion: 215 },
  { id: 2, titulo: 'Verano en Marte', artista: 'Nube Roja', genero: 'pop', duracion: 187 },
  { id: 3, titulo: 'Café a las tres', artista: 'Marta Vega', genero: 'jazz', duracion: 305 },
];

const $ = (selector) => document.querySelector(selector);
const idsPintados = () => [...document.querySelectorAll('#lista li')].map((li) => li.dataset.id);

beforeEach(() => {
  // Página limpia en cada test: se pierden también los listeners anteriores.
  document.body.innerHTML = cuerpo;
});

describe('Parte 3 · DOM', () => {
  test('(0.5) 3.1 crearElemento crea el <li> con data-id, texto y botón Quitar', () => {
    const li = crearElemento(nuevaLista()[0]);
    expect(li?.tagName).toBe('LI');
    expect(li.dataset.id).toBe('1');
    expect(li.textContent.trim().startsWith('Luz de neón · Los Satélites (3:35)')).toBe(true);
    const boton = li.querySelector('button.quitar');
    expect(boton).not.toBeNull();
    expect(boton.textContent.trim()).toBe('Quitar');
    // Sólo se crea, no se añade a la página.
    expect($('#lista').children).toHaveLength(0);
  });

  test('(0.5) 3.2 pintarLista pinta un <li> por canción y no duplica al repetir', () => {
    const ul = $('#lista');
    pintarLista(nuevaLista(), ul);
    expect(idsPintados()).toEqual(['1', '2', '3']);
    pintarLista(nuevaLista().slice(0, 2), ul);
    expect(idsPintados()).toEqual(['1', '2']);
    pintarLista([], ul);
    expect(ul.children).toHaveLength(0);
  });

  test('(0.5) 3.3 actualizarTotal escribe la duración total en m:ss', () => {
    const span = $('#total');
    actualizarTotal(nuevaLista(), span);
    expect(span.textContent).toBe('11:47');
    actualizarTotal([], span);
    expect(span.textContent).toBe('0:00');
  });

  test('(0.5) 3.4a iniciar pinta la lista y el total al arrancar', () => {
    iniciar(nuevaLista());
    expect(idsPintados()).toEqual(['1', '2', '3']);
    expect($('#total').textContent).toBe('11:47');
  });

  test('(0.5) 3.4b el botón Deshacer quita la última canción', () => {
    const lista = nuevaLista();
    iniciar(lista);
    $('#deshacer').click();
    expect(lista.map((c) => c.id)).toEqual([1, 2]);
    expect(idsPintados()).toEqual(['1', '2']);
    expect($('#total').textContent).toBe('6:42');
  });

  test('(0.5) 3.4c cada botón Quitar quita su canción', () => {
    const lista = nuevaLista();
    iniciar(lista);
    $('#lista li[data-id="2"] button.quitar').click();
    expect(lista.map((c) => c.id)).toEqual([1, 3]);
    expect(idsPintados()).toEqual(['1', '3']);
    expect($('#total').textContent).toBe('8:40');
    // Y sigue funcionando después de repintar.
    $('#lista li[data-id="1"] button.quitar').click();
    expect(lista.map((c) => c.id)).toEqual([3]);
    expect(idsPintados()).toEqual(['3']);
  });

  test('(0.5) 3.4d el formulario añade una canción al final sin recargar', () => {
    const lista = nuevaLista();
    iniciar(lista);
    $('#titulo').value = 'Nueva';
    $('#artista').value = 'Alguien';
    $('#genero').value = 'pop';
    $('#duracion').value = '100';

    const envio = new Event('submit', { bubbles: true, cancelable: true });
    $('#form-cancion').dispatchEvent(envio);

    expect(envio.defaultPrevented).toBe(true);
    expect(lista).toHaveLength(4);
    expect(lista[3]).toEqual({ id: 4, titulo: 'Nueva', artista: 'Alguien', genero: 'pop', duracion: 100 });
    expect(idsPintados()).toEqual(['1', '2', '3', '4']);
    expect($('#total').textContent).toBe('13:27');
  });
});
