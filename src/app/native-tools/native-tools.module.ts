import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule, registerElement } from '@nativescript/angular';
import { MapView } from '@nativescript/google-maps';
import { NativeToolsComponent } from './native-tools.component';
import { StudyMapComponent } from './study-map.component';

registerElement('MapView', () => MapView);

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([
    { path: '', component: NativeToolsComponent, pathMatch: 'full' },
    { path: 'map', component: StudyMapComponent },
  ])],
  declarations: [NativeToolsComponent, StudyMapComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativeToolsModule {}
