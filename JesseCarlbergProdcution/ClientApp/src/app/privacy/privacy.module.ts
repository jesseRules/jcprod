import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyHomeComponent } from './privacy-home/privacy-home.component';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    PrivacyHomeComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    MatDividerModule
  ]
})
export class PrivacyModule { }
