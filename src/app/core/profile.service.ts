import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject } from 'rxjs';

const KEY = 'profile.username';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly name = new BehaviorSubject(ApplicationSettings.getString(KEY, ''));
  readonly name$ = this.name.asObservable();

  get currentName(): string {
    return this.name.value;
  }

  saveName(input: string): boolean {
    const name = input.trim();
    if (name.length < 2 || name.length > 40) {
      return false;
    }
    ApplicationSettings.setString(KEY, name);
    this.name.next(name);
    return true;
  }
}
