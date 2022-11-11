import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TwitterFeed } from './model/TwitterFeed';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private https: HttpClient) { }

  public getTweets2Keyword(keyword: string, tweetCount: number) {
    return this.https.get<TwitterFeed>('api/Twitter/search?keyword=' + keyword + "&tweetCount=" + tweetCount);
  }
}
