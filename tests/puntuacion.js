// Reporter de Jest que convierte los tests superados en nota.
// NO MODIFIQUES ESTE FICHERO.
//
// Cada test lleva su valor al principio del título, entre paréntesis: "(0.5) ...".
// El máximo de cada parte está fijo aquí para que, si un fichero ni siquiera
// carga (por un error de sintaxis, por ejemplo), la parte cuente como 0 y no
// desaparezca de la tabla.

const path = require('node:path');

const PARTES = [
  { fichero: 'lista.test.js', nombre: 'Parte 1 · Datos', maximo: 4 },
  { fichero: 'servidor.test.js', nombre: 'Parte 2 · Promesas', maximo: 2 },
  { fichero: 'interfaz.test.js', nombre: 'Parte 3 · DOM', maximo: 3.5 },
];
const REVISION = 0.5; // revisión del código a cargo del profesor (ver README)

const valorDe = (titulo) => {
  const encontrado = titulo.match(/^\((\d+(?:[.,]\d+)?)\)/);
  return encontrado ? Number(encontrado[1].replace(',', '.')) : 0;
};

const formatear = (n) => n.toFixed(2).replace(/\.?0+$/, '').replace('.', ',');

class Puntuacion {
  onRunComplete(_contextos, resultados) {
    const filas = [];
    for (const parte of PARTES) {
      const fichero = resultados.testResults.find(
        (r) => path.basename(r.testFilePath) === parte.fichero,
      );
      if (!fichero) continue; // no se ha ejecutado esta parte (npm run test:lista, etc.)
      const puntos = fichero.testResults
        .filter((t) => t.status === 'passed')
        .reduce((suma, t) => suma + valorDe(t.title), 0);
      filas.push({ ...parte, puntos, error: Boolean(fichero.testExecError) });
    }
    if (filas.length === 0) return;

    const ancho = 24;
    const lineas = ['', '  PUNTUACIÓN (tests)', '  ' + '─'.repeat(ancho + 12)];
    for (const f of filas) {
      const aviso = f.error ? '  ← el fichero no carga: revisa errores de sintaxis' : '';
      lineas.push(`  ${f.nombre.padEnd(ancho)}${formatear(f.puntos).padStart(5)} / ${formatear(f.maximo)}${aviso}`);
    }
    if (filas.length === PARTES.length) {
      const total = filas.reduce((s, f) => s + f.puntos, 0);
      lineas.push('  ' + '─'.repeat(ancho + 12));
      lineas.push(`  ${'Total tests'.padEnd(ancho)}${formatear(total).padStart(5)} / ${formatear(10 - REVISION)}`);
      lineas.push(`  ${'Revisión del profesor'.padEnd(ancho)}${'?'.padStart(5)} / ${formatear(REVISION)}`);
    }
    console.log(lineas.join('\n') + '\n');
  }
}

module.exports = Puntuacion;
