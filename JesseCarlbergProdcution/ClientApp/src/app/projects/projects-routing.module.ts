import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AzurePhotosComponent } from './azure-photos/azure-photos.component';
import { ChartSampleComponent } from './chart-sample/chart-sample.component';
import { JHExampleComponent } from './jhexample/jhexample.component';
import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';
import { YtubeExampleComponent } from './ytube-example/ytube-example.component';

const routes: Routes = [
  { path: 'azure-photos-sample', component: AzurePhotosComponent },
  { path: 'youtube-sample', component: YtubeExampleComponent },
  { path: 'twitter2-sample', component: TwitterFeedComponent },
  { path: 'jh-sample', component: JHExampleComponent },
  { path: 'chartjs-sample', component: ChartSampleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
