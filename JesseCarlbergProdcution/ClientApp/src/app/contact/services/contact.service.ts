import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest } from './models/ContactRequest';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  createContact(contact: ContactRequest) {
    return this.http.post<ContactRequest>('/api/Contact', contact);
  }

  getContactItem(id: string): Observable<ContactRequest> {
    return this.http.get<ContactRequest>('/api/Contact/' + id);
  }
}
