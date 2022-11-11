import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeHomeComponent } from './resume-home/resume-home.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ResumeHomeComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class ResumeModule { }
