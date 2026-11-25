import { Injectable, NgZone } from '@angular/core';
import { Application, ApplicationSettings, isAndroid, isIOS } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { BehaviorSubject } from 'rxjs';

const ENABLED_KEY = 'push.enabled';

@Injectable({ providedIn: 'root' })
export class PushService {
  private readonly token = new BehaviorSubject('');
  private readonly toast = new BehaviorSubject('');
  readonly token$ = this.token.asObservable();
  readonly toast$ = this.toast.asObservable();
  private timer?: ReturnType<typeof setTimeout>;
  private connection?: Promise<string>;
  private listening = false;

  constructor(private readonly zone: NgZone) {}

  async resume(): Promise<void> {
    if (ApplicationSettings.getBoolean(ENABLED_KEY, false)) {
      await this.connect().catch(() => undefined);
    }
  }

  connect(): Promise<string> {
    if (!this.connection) {
      this.connection = this.register().catch((error) => {
        this.connection = undefined;
        throw error;
      });
    }
    return this.connection;
  }

  private async register(): Promise<string> {
    await firebase().initializeApp();
    const messaging = firebase().messaging();
    if (isIOS) {
      await messaging.requestPermission({ ios: { alert: true, badge: true, sound: true } });
      await messaging.registerDeviceForRemoteMessages();
    }
    if (!this.listening) {
      messaging.showNotificationsWhenInForeground = false;
      messaging.onMessage(({ notification, data }) => {
        const title = notification?.title || data?.title;
        const body = notification?.body || data?.body;
        const text = [title, body].filter(Boolean).join(' · ') || 'Nueva notificación';
        this.zone.run(() => this.showToast(text));
      });
      messaging.onToken((token) => this.zone.run(() => this.token.next(token)));
      this.listening = true;
    }
    const token = await messaging.getToken();
    this.token.next(token);
    ApplicationSettings.setBoolean(ENABLED_KEY, true);
    return token;
  }

  private showToast(message: string): void {
    if (isAndroid) {
      android.widget.Toast.makeText(Application.android.context, message, android.widget.Toast.LENGTH_LONG).show();
      return;
    }
    clearTimeout(this.timer);
    this.toast.next(message);
    this.timer = setTimeout(() => this.toast.next(''), 3000);
  }
}
