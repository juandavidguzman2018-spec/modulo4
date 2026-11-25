import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { ProfileService } from '../core/profile.service';

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../search/search.css'],
})
export class SettingsComponent {
  constructor(readonly profile: ProfileService, private readonly router: RouterExtensions) {}

  openDrawer(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }

  editName(): void {
    this.router.navigate(['/settings', 'profile']);
  }
}
