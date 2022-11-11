import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

const routes: Routes = [
  {
    path: '',
    component: BlogHomeComponent,
  },
  {
    path: ':id',
    component: BlogPostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
