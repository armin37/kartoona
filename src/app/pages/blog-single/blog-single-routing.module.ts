import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogSingleComponent } from './blog-single.component';


const routes: Routes = [
  {
    path: '',
    component: BlogSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogSingleRoutingModule { }