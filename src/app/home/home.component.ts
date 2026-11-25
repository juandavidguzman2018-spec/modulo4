import { Component } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import { Store } from '@ngrx/store'
import { removeFromQueue, selectReadingQueue } from '../core/reading.store'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly readingQueue$ = this.store.select(selectReadingQueue);

  constructor(private readonly router: RouterExtensions, private readonly store: Store) {}

  remove(id: string): void {
    this.store.dispatch(removeFromQueue({ id }));
  }

  openCatalog(): void {
    this.router.navigate(['/search']);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
