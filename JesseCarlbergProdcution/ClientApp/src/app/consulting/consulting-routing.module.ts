import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultingHomeComponent } from './consulting-home/consulting-home.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultingHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultingRoutingModule { }
