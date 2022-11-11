import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactHomeComponent } from './contact-home/contact-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ContactHomeComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    ContactService
  ]
})
export class ContactModule { }
