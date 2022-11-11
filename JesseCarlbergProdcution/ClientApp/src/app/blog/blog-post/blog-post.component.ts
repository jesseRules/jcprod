import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as md from 'markdown-it';
import { Subscription } from 'rxjs';
import { BlogService } from '../services/blog.service';
import { BlogItem } from '../services/models/BlogFeed';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}
  public blogItem: BlogItem | undefined;
  public loading = false;
  public errors: any;
  public markdown: any;
  public content: any;
  // Subscriptions
  public routeSubscription: Subscription | undefined;
  public blogSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.getItem(this.route.snapshot.params.id);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
  }

  getItem(id: string) {
    this.markdown = md();
    this.loading = true;
    this.blogSubscription = this.blogService.getBlogItem(id).subscribe(
      (data) => {
        this.blogItem = data;

        if (this.blogItem.content_markdown) {
          const markdownResponse = this.markdown.render(
            data.content_markdown.replace(/\\"/g, '"')
          );
          this.content = markdownResponse;
        } else {
          this.content = this.blogItem.content;
        }
        this.loading = false;
      },
      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {}
    );
  }
}