import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import type { Resource } from './resource';

interface ReadingState {
  queue: readonly Resource[];
}

const initialState: ReadingState = { queue: [] };

export const readNow = createAction('[Favoritos] Leer ahora', props<{ resource: Resource }>());
export const removeFromQueue = createAction('[Inicio] Quitar de lectura', props<{ id: string }>());

export const readingReducer = createReducer(
  initialState,
  on(readNow, (state, { resource }) => ({
    queue: [{ ...resource }, ...state.queue.filter((item) => item.id !== resource.id)],
  })),
  on(removeFromQueue, (state, { id }) => ({
    queue: state.queue.filter((item) => item.id !== id),
  })),
);

const selectReading = createFeatureSelector<ReadingState>('reading');
export const selectReadingQueue = createSelector(selectReading, (state) => state.queue);
