import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject } from 'rxjs';

export interface StudyActivity {
  readonly id: string;
  readonly title: string;
  readonly minutes: number;
  readonly goal: string;
}

@Injectable({ providedIn: 'root' })
export class StudyProgressService {
  readonly activities: readonly StudyActivity[] = [
    { id: 'rutas', title: 'Navegación modular', minutes: 20,
      goal: 'Sigue la ruta principal hasta el módulo de estudio y localiza sus dos rutas hijas.' },
    { id: 'servicio', title: 'Servicios e inyección', minutes: 25,
      goal: 'Marca una actividad como terminada, vuelve al listado y comprueba que el progreso se actualiza.' },
    { id: 'estilos', title: 'Estilos por plataforma', minutes: 15,
      goal: 'Localiza el selector de la tarjeta en los archivos CSS para Android e iOS y compara sus colores.' },
  ];

  private readonly progress = new BehaviorSubject<ReadonlySet<string>>(
    new Set(this.activities
      .filter(({ id }) => ApplicationSettings.getBoolean(this.storageKey(id), false))
      .map(({ id }) => id))
  );
  readonly completed$ = this.progress.asObservable();

  find(id: string | null): StudyActivity | undefined {
    return this.activities.find((activity) => activity.id === id);
  }

  toggle(activity: StudyActivity): void {
    const completed = new Set(this.progress.value);
    const isComplete = !completed.has(activity.id);
    ApplicationSettings.setBoolean(this.storageKey(activity.id), isComplete);
    if (isComplete) {
      completed.add(activity.id);
    } else {
      completed.delete(activity.id);
    }
    this.progress.next(completed);
  }

  private storageKey(id: string): string {
    return 'study.completed.' + id;
  }
}
