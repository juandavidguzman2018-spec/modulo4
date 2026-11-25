import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { Application, Dialogs, EventData, isAndroid, View } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { CatalogService } from './catalog.service';
import { CATEGORIES } from '../core/resource';
import type { Resource } from '../core/resource';
import { FavoritesService } from '../core/favorites.service';

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('refreshIcon', { read: ElementRef }) private refreshIcon?: ElementRef<View>;

  query = '';
  toastMessage = '';
  refreshing = false;
  loading = false;
  error = '';
  private requestId = 0;

  private appliedQuery = '';
  private toastTimer?: ReturnType<typeof setTimeout>;
  private active = true;

  results: Resource[] = [];

  constructor(
    private readonly catalog: CatalogService,
    private readonly router: RouterExtensions,
    readonly favorites: FavoritesService,
  ) {}

  ngOnInit(): void {
    void this.loadResults();
  }

  openDrawer(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }

  applySearch(): void {
    this.appliedQuery = this.query.trim();
    void this.loadResults();
  }

  openResource(resource: Resource): void {
    this.router.navigate(['/search', resource.id]);
  }

  async chooseCategory(resource: Resource): Promise<void> {
    const selected = await Dialogs.action({
      title: 'Categoría del recurso',
      message: resource.title + ' · actual: ' + resource.category,
      actions: [...CATEGORIES],
      cancelButtonText: 'Cancelar',
    });
    const category = CATEGORIES.find((option) => option === selected);
    if (category && category !== resource.category) {
      this.catalog.changeCategory(resource, category);
      this.favorites.update(resource);
      this.showToast('Categoría actualizada a ' + category);
    }
  }

  async onPull(event: EventData): Promise<void> {
    const control = event.object as PullToRefresh;
    try {
      await this.refreshResults();
    } finally {
      control.refreshing = false;
    }
  }

  async refreshResults(): Promise<void> {
    if (this.refreshing) {
      return;
    }

    this.refreshing = true;
    const icon = this.refreshIcon?.nativeElement;
    try {
      if (icon?.isLoaded) {
        await icon.animate({ rotate: icon.rotate + 360, duration: 360 }).catch(() => {
          // NativeScript cancels the animation if its view leaves the screen.
        });
      }
      if (!this.active) {
        return;
      }
      await this.loadResults();
      if (!this.error) {
        this.showToast('Catálogo actualizado.');
      }
    } finally {
      this.refreshing = false;
    }
  }

  ngOnDestroy(): void {
    this.active = false;
    clearTimeout(this.toastTimer);
  }

  private async loadResults(): Promise<void> {
    const job = ++this.requestId;
    this.loading = true;
    this.error = '';
    try {
      const results = await this.catalog.search(this.appliedQuery);
      if (this.active && job === this.requestId) {
        this.results = results;
      }
    } catch (error) {
      if (this.active && job === this.requestId) {
        this.results = [];
        const detail = error instanceof Error ? ' ' + error.message : '';
        this.error = 'No se pudo consultar el catálogo.' + detail;
      }
    } finally {
      if (this.active && job === this.requestId) {
        this.loading = false;
      }
    }
  }

  private showToast(message: string): void {
    if (!this.active) {
      return;
    }
    if (isAndroid) {
      android.widget.Toast.makeText(Application.android.context, message, android.widget.Toast.LENGTH_SHORT).show();
      return;
    }
    clearTimeout(this.toastTimer);
    this.toastMessage = message;
    this.toastTimer = setTimeout(() => { this.toastMessage = ''; }, 2400);
  }
}
