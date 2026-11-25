import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject } from 'rxjs';
import { Resource, isResource } from './resource';

const KEY = 'catalog.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly items = new BehaviorSubject<readonly Resource[]>(this.restore());
  readonly items$ = this.items.asObservable();

  has(id: string): boolean {
    return this.items.value.some((item) => item.id === id);
  }

  toggle(resource: Resource): void {
    const items = this.has(resource.id)
      ? this.items.value.filter((item) => item.id !== resource.id)
      : [...this.items.value, { ...resource }];
    ApplicationSettings.setString(KEY, JSON.stringify(items));
    this.items.next(items);
  }

  update(resource: Resource): void {
    if (this.has(resource.id)) {
      const items = this.items.value.map((item) => item.id === resource.id ? { ...resource } : item);
      ApplicationSettings.setString(KEY, JSON.stringify(items));
      this.items.next(items);
    }
  }

  private restore(): Resource[] {
    try {
      const value: unknown = JSON.parse(ApplicationSettings.getString(KEY, '[]'));
      return Array.isArray(value) ? value.filter(isResource) : [];
    } catch {
      return [];
    }
  }
}
