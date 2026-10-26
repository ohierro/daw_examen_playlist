// Tests de la PARTE 1. NO MODIFIQUES ESTE FICHERO.
// El número entre paréntesis de cada test es lo que vale.

const {
  formatearDuracion,
  anadirCancion,
  deshacerUltima,
  porGenero,
  masLargaQue,
  describir,
  duracionTotal,
  contarPorGenero,
} = require('../src/lista');

const nuevaLista = () => [
  { id: 1, titulo: 'Luz de neón', artista: 'Los Satélites', genero: 'rock', duracion: 215 },
  { id: 2, titulo: 'Verano en Marte', artista: 'Nube Roja', genero: 'pop', duracion: 187 },
  { id: 3, titulo: 'Café a las tres', artista: 'Marta Vega', genero: 'jazz', duracion: 305 },
  { id: 4, titulo: 'Sin cobertura', artista: 'Los Satélites', genero: 'rock', duracion: 242 },
];

describe('Parte 1 · Datos', () => {
  test('(0.5) 1.1 formatearDuracion convierte segundos a m:ss', () => {
    expect(formatearDuracion(215)).toBe('3:35');
    expect(formatearDuracion(65)).toBe('1:05');
    expect(formatearDuracion(60)).toBe('1:00');
    expect(formatearDuracion(9)).toBe('0:09');
    expect(formatearDuracion(0)).toBe('0:00');
    expect(formatearDuracion(3725)).toBe('62:05');
  });

  test('(0.5) 1.2 anadirCancion añade al final y devuelve la nueva longitud', () => {
    const lista = nuevaLista();
    const nueva = { id: 9, titulo: 'Nueva', artista: 'Alguien', genero: 'pop', duracion: 100 };
    expect(anadirCancion(lista, nueva)).toBe(5);
    expect(lista).toHaveLength(5);
    expect(lista[4]).toBe(nueva);
    expect(lista[0].id).toBe(1);
  });

  test('(0.5) 1.3 deshacerUltima quita y devuelve la última; null si está vacía', () => {
    const lista = nuevaLista();
    const ultima = lista[3];
    expect(deshacerUltima(lista)).toBe(ultima);
    expect(lista).toHaveLength(3);
    expect(lista.map((c) => c.id)).toEqual([1, 2, 3]);
    expect(deshacerUltima([])).toBeNull();
  });

  test('(0.5) 1.4 porGenero filtra sin distinguir mayúsculas y sin tocar la original', () => {
    const lista = nuevaLista();
    expect(porGenero(lista, 'rock').map((c) => c.id)).toEqual([1, 4]);
    expect(porGenero(lista, 'ROCK').map((c) => c.id)).toEqual([1, 4]);
    expect(porGenero(lista, 'Jazz').map((c) => c.id)).toEqual([3]);
    expect(porGenero(lista, 'reggae')).toEqual([]);
    expect(lista).toHaveLength(4);
  });

  test('(0.5) 1.5 masLargaQue devuelve una función que sirve para filter', () => {
    const masDe4Min = masLargaQue(240);
    expect(typeof masDe4Min).toBe('function');
    expect(masDe4Min({ duracion: 300 })).toBe(true);
    expect(masDe4Min({ duracion: 240 })).toBe(false);
    expect(nuevaLista().filter(masLargaQue(240)).map((c) => c.id)).toEqual([3, 4]);
    expect(nuevaLista().filter(masLargaQue(1000))).toEqual([]);
  });

  test('(0.5) 1.6 describir genera "titulo · artista (m:ss)" para cada canción', () => {
    expect(describir(nuevaLista())).toEqual([
      'Luz de neón · Los Satélites (3:35)',
      'Verano en Marte · Nube Roja (3:07)',
      'Café a las tres · Marta Vega (5:05)',
      'Sin cobertura · Los Satélites (4:02)',
    ]);
    expect(describir([])).toEqual([]);
  });

  test('(0.5) 1.7 duracionTotal suma las duraciones; 0 si está vacía', () => {
    expect(duracionTotal(nuevaLista())).toBe(949);
    expect(duracionTotal([{ duracion: 200 }, { duracion: 100 }])).toBe(300);
    expect(duracionTotal([])).toBe(0);
  });

  test('(0.5) 1.8 contarPorGenero cuenta las canciones de cada género', () => {
    expect(contarPorGenero(nuevaLista())).toEqual({ rock: 2, pop: 1, jazz: 1 });
    expect(contarPorGenero([])).toEqual({});
  });
});
