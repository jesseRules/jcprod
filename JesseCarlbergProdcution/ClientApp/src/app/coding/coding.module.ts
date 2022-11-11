import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodingRoutingModule } from './coding-routing.module';
import { CodingHomeComponent } from './coding-home/coding-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CodingHomeComponent
  ],
  imports: [
    CommonModule,
    CodingRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CodingModule { }
