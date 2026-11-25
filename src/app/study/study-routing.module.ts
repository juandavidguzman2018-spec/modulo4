import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { StudyListComponent } from './study-list.component';
import { StudyDetailComponent } from './study-detail.component';

const routes: Routes = [
  { path: '', component: StudyListComponent },
  { path: ':id', component: StudyDetailComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class StudyRoutingModule {}
