import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ResourceDetailComponent } from './resource-detail.component';
import { SearchQueryValidatorDirective } from './search-query-validator.directive';

registerElement('PullToRefresh', () => PullToRefresh);

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SearchRoutingModule],
  declarations: [SearchComponent, ResourceDetailComponent, SearchQueryValidatorDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
