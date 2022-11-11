import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AzurePhotosComponent } from './azure-photos/azure-photos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgChartsModule } from 'ng2-charts';
import { AzurePhotoService } from './azure-photos/services/azure-photo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from 'ngx-clipboard';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { YtubeExampleComponent } from './ytube-example/ytube-example.component';
import { MatIconModule } from '@angular/material/icon';
import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';
import { HashtagMentionColorizerPipe } from './twitter-feed/pipes/hashtag.pipe';
import { TwitterService } from './twitter-feed/service/twitter.service';
import { JHExampleComponent } from './jhexample/jhexample.component';
import { JhExampleService } from './jhexample/services/jhexample.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ChartSampleComponent } from './chart-sample/chart-sample.component';

@NgModule({
  declarations: [
    AzurePhotosComponent,
    YtubeExampleComponent,
    TwitterFeedComponent,
    HashtagMentionColorizerPipe,
    JHExampleComponent,
    ChartSampleComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatCardModule,
    MatDividerModule,
    NgChartsModule,
    MatProgressBarModule,
    GalleryModule,
    LightboxModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ClipboardModule,
    NgxDropzoneModule,
    YouTubePlayerModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [
    AzurePhotoService,
    TwitterService,
    JhExampleService
  ]
})
export class ProjectsModule { }
