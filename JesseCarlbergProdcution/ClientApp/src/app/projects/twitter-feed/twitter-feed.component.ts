import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { Tweets, TwitterFeed } from './service/model/TwitterFeed';
import { TwitterService } from './service/twitter.service';
@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.css']
})
export class TwitterFeedComponent implements OnInit {
  public twitterForm;
  public twitterFeed: TwitterFeed | undefined;
  public tweets: Tweets[] = [];
  public loading = false;
  public errors: any;
  public arSub: Subscription | undefined;
  public searchTerm: string = '';
  public searchUser: string = '';

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private twitterapiService: TwitterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.arSub = this.activatedRoute.queryParams.subscribe((params) => {
      this.searchTerm = params['q'];
      this.searchUser = params['user'];

      if (this.searchTerm) {
        this.getFeedByKeyword(this.searchTerm, 100);
      }
    });

    this.twitterForm = this.fb.group({
      search: this.searchTerm,
    });

    if (this.searchUser) {
      // this.getFeedByUser(this.searchUser, 100);
    }

  
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.arSub) {
      this.arSub.unsubscribe();
    }
  }

  getFeedByKeyword(term: string, tweetCount: number): void {
    this.loading = true;
    this.tweets = [];
    this.twitterapiService.getTweets2Keyword(term, tweetCount).subscribe(
      (data) => {
        this.twitterFeed = data;
        this.tweets = this.twitterFeed.tweets;
        this.loading = false;
        if (this.tweets) {
          if (this.twitterFeed.meta.result_count <= 0) {
            this.openSnackBar('No results found', '');
          }
        } else {
        }
      },

      (error) => {
        this.errors = error;
        this.loading = false;
        this.openSnackBar(this.errors, 'Error');
      },
      () => {
        this.router.navigate(['projects/twitter2-sample'], { queryParams: { q: term } });

        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  onSubmit(): void {
    if (this.twitterForm.value.search)
    this.getFeedByKeyword(this.twitterForm.value.search, 100);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  userClick(username: string): void {
    this.router.navigate(['projects/twitter2-sample'], {
      queryParams: { user: username },
    });
    // this.getFeedByUser(username, 100);
  }
}