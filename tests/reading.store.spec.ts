import '@angular/compiler';
import { readNow, readingReducer, removeFromQueue, selectReadingQueue } from '../src/app/core/reading.store';
import type { Resource } from '../src/app/core/resource';

const first: Resource = { id: 'a', title: 'Navegación', category: 'Lectura', description: 'Ejemplo' };
const second: Resource = { ...first, id: 'b', title: 'Cámara' };

describe('Reducer de la cola de lectura', () => {
  const initial = () => readingReducer(undefined, { type: '@@init' });

  it('empieza con una cola vacía y conserva las acciones desconocidas', () => {
    const state = initial();
    expect(state.queue).toEqual([]);
    expect(readingReducer(state, { type: 'desconocida' })).toBe(state);
  });

  it('agrega el recurso al principio sin modificar el estado anterior', () => {
    const before = readingReducer(initial(), readNow({ resource: first }));
    const after = readingReducer(before, readNow({ resource: second }));
    expect(selectReadingQueue({ reading: after })).toEqual([second, first]);
    expect(before.queue).toEqual([first]);
  });

  it('vuelve a poner al principio un recurso existente sin duplicarlo', () => {
    const state = readingReducer(initial(), readNow({ resource: first }));
    const next = readingReducer(readingReducer(state, readNow({ resource: second })), readNow({ resource: first }));
    expect(next.queue).toEqual([first, second]);
  });

  it('quita únicamente el recurso seleccionado', () => {
    const state = readingReducer(readingReducer(initial(), readNow({ resource: first })), readNow({ resource: second }));
    expect(readingReducer(state, removeFromQueue({ id: first.id })).queue).toEqual([second]);
  });
});
