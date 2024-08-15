import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-series',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './top-series.component.html',
  styleUrls: ['./top-series.component.css']
})
export class TopSeriesComponent implements OnInit {
  tmdbApiKey: string = '819e4850402430664fdf93a2025c2c6d';
  topSeries: any[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getTopSeries();
  }

  getTopSeries() {
    const params = new HttpParams().set('api_key', this.tmdbApiKey).set('language', 'fr-FR');
    this.http.get<any>('https://api.themoviedb.org/3/tv/popular', { params })
      .subscribe((response: any) => {
        this.topSeries = response.results.slice(0, 100); // Limiter à 100 résultats
      });
  }

  launchSeries(seriesId: number) {
    this.router.navigate(['/series', seriesId]);
  }
}
