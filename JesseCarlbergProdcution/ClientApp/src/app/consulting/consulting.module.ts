import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultingRoutingModule } from './consulting-routing.module';
import { ConsultingHomeComponent } from './consulting-home/consulting-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ConsultingHomeComponent
  ],
  imports: [
    CommonModule,
    ConsultingRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ConsultingModule { }
