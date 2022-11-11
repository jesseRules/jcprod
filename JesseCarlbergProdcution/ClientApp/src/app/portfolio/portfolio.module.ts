import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioHomeComponent } from './portfolio-home/portfolio-home.component';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PortfolioHomeComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    ScrollingModule,
    MatButtonModule,
    MatCardModule
    
  ]
})
export class PortfolioModule { }
