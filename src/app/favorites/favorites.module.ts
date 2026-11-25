import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: FavoritesComponent }])],
  declarations: [FavoritesComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FavoritesModule {}
