import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { map } from 'rxjs/operators';
import { StudyActivity, StudyProgressService } from '../core/study-progress.service';

@Component({
  selector: 'ns-study-detail',
  templateUrl: './study-detail.component.html',
  styleUrls: ['./study-common.css', './study.css'],
})
export class StudyDetailComponent {
  readonly activity$ = this.route.paramMap.pipe(map((params) => this.progress.find(params.get('id'))));

  constructor(
    private readonly route: ActivatedRoute,
    readonly progress: StudyProgressService,
    private readonly router: RouterExtensions,
  ) {}

  returnToList(): void {
    if (this.router.canGoBack()) {
      this.router.back();
      return;
    }
    this.router.navigate(['/study']);
  }

  toggle(activity: StudyActivity): void {
    this.progress.toggle(activity);
  }
}
