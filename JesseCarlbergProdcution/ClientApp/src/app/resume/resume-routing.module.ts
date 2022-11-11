import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeHomeComponent } from './resume-home/resume-home.component';

const routes: Routes = [
  {
    path: '',
    component: ResumeHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule { }
