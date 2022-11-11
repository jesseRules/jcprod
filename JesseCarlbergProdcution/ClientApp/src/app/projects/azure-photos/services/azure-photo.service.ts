import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
@Injectable({
  providedIn: 'root',
})
export class AzurePhotoService {
  constructor(private http: HttpClient) {}

  uploadImage(files: any): Observable<any> {
    let url = '/api/AzImages/Upload';
    let input = new FormData();
    input.append('files', files);
    return this.http.post(url, input, HttpUploadOptions);
  }

  getThumbnails(): Observable<any> {
    return this.http.get<any>('/api/AzImages/thumbnails');
  }

  getImages(): Observable<any> {
    return this.http.get<any>('/api/AzImages/images');
  }
}
