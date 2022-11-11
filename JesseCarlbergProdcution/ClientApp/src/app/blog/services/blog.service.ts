import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogItem } from './models/BlogFeed';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private https: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json'  })
  };

  createPost(post: BlogItem) {
    return this.https.post<BlogItem>('/api/Blog', post);
  }

  updateBlogItem(post: BlogItem) {
    return this.https.put<BlogItem>('/api/Blog/' + post.Id, post);
  }

  getFeed(): Observable<BlogItem[]> {
    return this.https.get<BlogItem[]>('/api/Blog', this.httpOptions);
  }

  getBlogItem(id: string): Observable<BlogItem> {
    return this.https.get<BlogItem>('/api/Blog/' + id, this.httpOptions);
  }

  getMarkdownTemplate(): Observable<any> {
    return this.https.get('../assets/markdown-template.txt', {responseType: 'text'});
  }
}