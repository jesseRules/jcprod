import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotographyRoutingModule } from './photography-routing.module';
import { PhotographyHomeComponent } from './photography-home/photography-home.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';


@NgModule({
  declarations: [
    PhotographyHomeComponent
  ],
  imports: [
    CommonModule,
    PhotographyRoutingModule,
    MatDividerModule,
    MatCardModule,
    GalleryModule,
    LightboxModule,
  ]
})
export class PhotographyModule { }
