import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { map } from 'rxjs/operators';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'ns-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./search.css'],
})
export class ResourceDetailComponent {
  readonly resource$ = this.route.paramMap.pipe(map((params) => this.catalog.find(params.get('id'))));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly catalog: CatalogService,
    private readonly router: RouterExtensions,
  ) {}

  goBack(): void {
    if (this.router.canGoBack()) {
      this.router.back();
      return;
    }
    this.router.navigate(['/search']);
  }
}
