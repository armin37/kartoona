import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginateComponent} from './paginate/paginate.component';
import {RouterModule} from '@angular/router';
import {JsonLdComponent} from './json-ld/json-ld.component';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
  declarations: [PaginateComponent, JsonLdComponent],
  exports: [PaginateComponent, JsonLdComponent],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class GeneralModule {
}
