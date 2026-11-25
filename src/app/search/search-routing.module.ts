import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'

import { ResourceDetailComponent } from './resource-detail.component'

const routes: Routes = [
  { path: '', component: SearchComponent, pathMatch: 'full' },
  { path: ':id', component: ResourceDetailComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}
