import { Component } from '@angular/core';
import { Application } from '@nativescript/core';
import { Store } from '@ngrx/store';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { FavoritesService } from '../core/favorites.service';
import { readNow } from '../core/reading.store';
import type { Resource } from '../core/resource';

@Component({
  selector: 'ns-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../search/search.css'],
})
export class FavoritesComponent {
  lastQueued = '';

  constructor(readonly favorites: FavoritesService, private readonly store: Store) {}

  openDrawer(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }

  queue(resource: Resource): void {
    this.store.dispatch(readNow({ resource }));
    this.lastQueued = resource.title + ' está en tu cola de lectura.';
  }
}
