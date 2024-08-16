import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private tmdbApiKey: string = '819e4850402430664fdf93a2025c2c6d';
  private apiUrl: string = 'https://api.themoviedb.org/3/search/tv';

  constructor(private http: HttpClient) {}

  searchSeries(query: string): Observable<any> {
    if (query.trim()) {
      const url = `${this.apiUrl}?api_key=${this.tmdbApiKey}&query=${query}`;
      return this.http.get<any>(url);
    } else {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }
}
