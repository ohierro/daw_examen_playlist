// Tests de la PARTE 2. NO MODIFIQUES ESTE FICHERO.
// El número entre paréntesis de cada test es lo que vale.

const { esperar, cargarTitulos, cargarCancion } = require('../src/servidor');

describe('Parte 2 · Promesas', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('(0.5) 2.1 esperar devuelve una promesa que se cumple pasado ese tiempo', async () => {
    // Relojes falsos: el test controla el tiempo y no tiene que esperar de verdad.
    jest.useFakeTimers();
    let cumplida = false;
    const promesa = esperar(1000);
    expect(typeof promesa?.then).toBe('function');
    promesa.then(() => {
      cumplida = true;
    });

    await jest.advanceTimersByTimeAsync(999);
    expect(cumplida).toBe(false);
    await jest.advanceTimersByTimeAsync(1);
    expect(cumplida).toBe(true);
  });

  test('(0.5) 2.2 cargarTitulos devuelve una promesa con los títulos del catálogo', async () => {
    const promesa = cargarTitulos();
    expect(typeof promesa?.then).toBe('function');
    expect(await promesa).toEqual([
      'Luz de neón',
      'Verano en Marte',
      'Sin cobertura',
      'Café a las tres',
      'Bailando en el andén',
      'Tormenta lenta',
    ]);
  });

  test('(0.5) 2.3 cargarCancion devuelve una promesa con la canción pedida', async () => {
    const promesa = cargarCancion(4);
    expect(typeof promesa?.then).toBe('function');
    expect(await promesa).toEqual({
      id: 4,
      titulo: 'Café a las tres',
      artista: 'Marta Vega',
      genero: 'jazz',
      duracion: 305,
    });
  });

  test('(0.5) 2.4 cargarCancion se cumple con null si la canción no existe', async () => {
    const promesa = cargarCancion(99);
    expect(typeof promesa?.then).toBe('function');
    await expect(promesa).resolves.toBeNull();
  });
});
