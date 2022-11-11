import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

import { LoggingService } from 'src/app/services/logging.service';

import { finalize } from 'rxjs/operators';


export interface Section {
  name: string;
  updated: Date;
}

export interface CurrentCourse {
  name: string;
  id: number;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [];
  public events: any[] = [];
  public blogfeed: Section[] = [];
  public courseResults: Section[] = [];
  public datePicker!: MatDatepickerToggle<{}>;
  public selectedDate: Date | undefined;
  private blogSubscription: Subscription | undefined;


  public busy: boolean = false;

  public description: string = 'This card is gonna be here for a while. I\'m mostly putting this card here to remind me to keep at it. That even when this project is complete, I still need to use this website/application. That\'s how I learned to code, I was a user and had a problem I needed fixed. So, I learned how to code. I learned how to manage servers, get the data I needed, and do the things I wanted to do. And even after I automated most of my job, built a fancy interface, I found more that I could do to make my app better. This is what I am striving for here, something I want to use, something that just works.';


  constructor(
    private loggingService: LoggingService,

  ) {}

  ngOnInit() {
    
    this.loggingService.logPageView(
      'Home Page',
      '/home'
    );

  }

  ngOnDestroy(): void {

  }

  getBlogArticles() {
    // this.newsSubscription = this.articleService
    //   .getArticles()
    //   .pipe(finalize(() => (this.busy = false)))
    //   .subscribe({
    //     next: this.articlesResponse.bind(this),
    //     error: this.errorResponse.bind(this),
    //   });
  }

  articlesResponse(context: any) {
    // this.news = context;
  }

  
  errorResponse(error: any) {
    if (error) {
      this.loggingService.logException(error);
    }
  }
}
