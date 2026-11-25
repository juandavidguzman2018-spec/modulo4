import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Application, isAndroid } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { StudyActivity, StudyProgressService } from '../core/study-progress.service';

@Component({
  selector: 'ns-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-common.css', './study.css'],
})
export class StudyListComponent {
  readonly platformMessage: string;

  constructor(readonly progress: StudyProgressService, private readonly router: RouterExtensions) {
    this.platformMessage = '';
    if (isAndroid) {
      this.platformMessage = 'Estás usando la versión para Android';
    }
  }

  openDrawer(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }

  openActivity(activity: StudyActivity): void {
    this.router.navigate(['/study', activity.id]);
  }
}
