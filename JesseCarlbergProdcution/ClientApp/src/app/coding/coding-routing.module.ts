import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingHomeComponent } from './coding-home/coding-home.component';

const routes: Routes = [
  {
    path: '',
    component: CodingHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingRoutingModule { }
