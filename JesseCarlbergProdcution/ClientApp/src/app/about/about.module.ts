import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHomeComponent } from './about-home/about-home.component';
import { MatCardModule } from '@angular/material/card';
import { AboutRoutingModule } from './about-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { GalleryModule } from 'ng-gallery';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AboutHomeComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatCardModule,
    MatDividerModule,
    NgChartsModule,
    MatProgressBarModule,
    GalleryModule,
    LightboxModule,
    MatButtonModule
  ],

})
export class AboutModule { }
