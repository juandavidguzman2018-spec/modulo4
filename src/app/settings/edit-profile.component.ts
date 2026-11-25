import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ProfileService } from '../core/profile.service';

@Component({
  selector: 'ns-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../search/search.css'],
})
export class EditProfileComponent {
  name = this.profile.currentName;
  error = '';

  constructor(private readonly profile: ProfileService, private readonly router: RouterExtensions) {}

  save(): void {
    if (!this.profile.saveName(this.name)) {
      this.error = 'Escribe un nombre de 2 a 40 caracteres.';
      return;
    }
    this.cancel();
  }

  cancel(): void {
    if (this.router.canGoBack()) {
      this.router.back();
    } else {
      this.router.navigate(['/settings']);
    }
  }
}
