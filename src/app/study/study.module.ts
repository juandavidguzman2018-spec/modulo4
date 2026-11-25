import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { StudyRoutingModule } from './study-routing.module';
import { StudyListComponent } from './study-list.component';
import { StudyDetailComponent } from './study-detail.component';

@NgModule({
  imports: [NativeScriptCommonModule, StudyRoutingModule],
  declarations: [StudyListComponent, StudyDetailComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class StudyModule {}
