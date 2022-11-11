import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { BlogService } from '../services/blog.service';
import { BlogItem } from '../services/models/BlogFeed';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {
  public errors: any;
  public loading: boolean = false;
  public feed: BlogItem[] = [];
  public busy: boolean = false;
  public isMobile: boolean = false;
  public title: string = 'Read the Latest';
  public imageUrl: string = '';
  public description: string = '';
  public selectedId: string = '';
  private blogSubscription: Subscription | undefined;
  private breakPointSubscription: Subscription | undefined;

  constructor(
    private blogService: BlogService,
    private loggingService: LoggingService,
    private breakpointObserver: BreakpointObserver
  ) {

  }

  ngOnInit(): void {
    this.getFeed();


    this.breakPointSubscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Handset,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.isMobile = true;
          }
          if (result.breakpoints[Breakpoints.Handset]) {
            this.isMobile = true;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.isMobile = true;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.isMobile = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.isMobile = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.isMobile = false;
          }
        }
      });
  }


  errorResponse(error: any) {
    this.loading = false;
    if (error) {
      this.loggingService.logException(error);
    } else {

    }
  }

  getFeed() {
    this.loading = true;
    this.blogSubscription = this.blogService.getFeed()
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: this.processResponse.bind(this),
        error: this.errorResponse.bind(this)
      });
  }


  processResponse(data: BlogItem[]) {
    this.feed = data;
    if (this.feed[0]) {
      this.title = this.feed[0].title;
      this.description = this.feed[0].description;
      this.selectedId = this.feed[0].Id;
      this.imageUrl = this.feed[0].mainImageURL;
    }
    this.loading = false;
  }

  setDefaultPic(item: BlogItem) {
    item.thumbImageURL = 'https://jessecarlbergproduction.azureedge.net/images/default.jfif';
    return item;
  }
}