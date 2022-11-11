import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyHomeComponent } from './privacy-home/privacy-home.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyRoutingModule { }
