import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JhExampleService {
  constructor(private http: HttpClient) {}

  getChartInfoCounty(county: string, count: number): Observable<any> {
    return this.http.get<any>('/api/JHExample/county/chartjs?county=' + county + '&count=' + count);
  }

  getChartInfoState(state: string, count: number): Observable<any> {
    return this.http.get<any>('/api/JHExample/state/chartjs?state=' + state + '&count=' + count);
  }

  getStates(): Observable<any[]> {
    return this.http.get<any[]>('/api/JHExample/states');
  }

  getFips(): Observable<any> {
    return this.http.get('../assets/data/county-fips.json', {responseType: 'json'});
  }
}
