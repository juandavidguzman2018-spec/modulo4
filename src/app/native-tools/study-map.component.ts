import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Application, isAndroid } from '@nativescript/core';
import type { GoogleMap, MapReadyEvent } from '@nativescript/google-maps';

@Component({
  selector: 'ns-study-map',
  templateUrl: './study-map.component.html',
  styleUrls: ['../search/search.css'],
})
export class StudyMapComponent {
  readonly place = { lat: 4.6298, lng: -74.0819 };
  readonly configured = this.hasAndroidKey();
  private initializedMap?: GoogleMap;

  constructor(private readonly router: RouterExtensions) {}

  onReady(event: MapReadyEvent): void {
    if (event.map !== this.initializedMap) {
      event.map.addMarker({ position: this.place, title: 'Biblioteca Virgilio Barco', snippet: 'Bogotá, Colombia' });
      this.initializedMap = event.map;
    }
  }

  goBack(): void {
    if (this.router.canGoBack()) {
      this.router.back();
    } else {
      this.router.navigate(['/native-tools']);
    }
  }

  private hasAndroidKey(): boolean {
    if (!isAndroid) {
      return false;
    }
    const context = Application.android.context;
    const info = context.getPackageManager().getApplicationInfo(context.getPackageName(), android.content.pm.PackageManager.GET_META_DATA);
    return Boolean(info.metaData?.getString('com.google.android.geo.API_KEY')?.trim());
  }
}
