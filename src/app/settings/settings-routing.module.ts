import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SettingsComponent } from './settings.component'

import { EditProfileComponent } from './edit-profile.component'

const routes: Routes = [
  { path: '', component: SettingsComponent, pathMatch: 'full' },
  { path: 'profile', component: EditProfileComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SettingsRoutingModule {}
