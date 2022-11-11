import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotographyHomeComponent } from './photography-home/photography-home.component';

const routes: Routes = [
  {
    path: '',
    component: PhotographyHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotographyRoutingModule { }
