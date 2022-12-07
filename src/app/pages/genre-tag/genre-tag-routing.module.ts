import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GenreTagComponent} from './genre-tag.component';


const routes: Routes = [
  {
    path: '',
    component: GenreTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreTagRoutingModule {
}
