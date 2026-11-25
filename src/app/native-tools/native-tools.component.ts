import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Application, ImageSource } from '@nativescript/core';
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import { shareImage, shareText } from '@nativescript/social-share';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { PushService } from '../core/push.service';

@Component({
  selector: 'ns-native-tools',
  templateUrl: './native-tools.component.html',
  styleUrls: ['../search/search.css'],
})
export class NativeToolsComponent {
  photo?: ImageSource;
  capturing = false;
  connecting = false;
  cameraError = '';
  pushError = '';

  constructor(readonly push: PushService, private readonly router: RouterExtensions) {}

  openDrawer(): void {
    (Application.getRootView() as RadSideDrawer).showDrawer();
  }

  openMap(): void {
    this.router.navigate(['/native-tools', 'map']);
  }

  shareStudyText(): void {
    shareText('Ruta de estudio · Comparte un recurso con tu grupo de estudio.');
  }

  sharePhoto(): void {
    if (this.photo) {
      shareImage(this.photo, { fileFormat: 'jpg' });
    }
  }

  async capture(): Promise<void> {
    this.cameraError = '';
    if (!isAvailable()) {
      this.cameraError = 'El dispositivo no tiene una cámara disponible.';
      return;
    }
    this.capturing = true;
    try {
      await requestCameraPermissions();
      const asset = await takePicture({ width: 900, height: 900, keepAspectRatio: true, saveToGallery: false });
      this.photo = await ImageSource.fromAsset(asset);
    } catch {
      this.cameraError = 'No se tomó la foto. Revisa el permiso de cámara o vuelve a intentarlo.';
    } finally {
      this.capturing = false;
    }
  }

  async enablePush(): Promise<void> {
    this.connecting = true;
    this.pushError = '';
    try {
      await this.push.connect();
    } catch {
      this.pushError = 'No se obtuvo el token. Revisa la configuración de Firebase y los permisos del dispositivo.';
    } finally {
      this.connecting = false;
    }
  }
}
