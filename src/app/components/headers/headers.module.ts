import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GenreTagPgHeaderComponent} from './genre-tag-pg-header/genre-tag-pg-header.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GenreTagPgHeaderComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GenreTagPgHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LazyLoadImageModule
  ]
})
export class HeadersModule {
}
