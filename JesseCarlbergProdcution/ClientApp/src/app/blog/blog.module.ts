import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { BlogService } from './services/blog.service';


@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogPostComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
