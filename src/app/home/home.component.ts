import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component'; // Import du SearchBarComponent

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  topSeries: any[] = [];
  tmdbApiKey: string = '819e4850402430664fdf93a2025c2c6d';
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getTopSeries();
  }

  searchSeries() {
    if (this.searchQuery.trim()) {
      const url = `https://api.themoviedb.org/3/search/tv?api_key=${this.tmdbApiKey}&query=${this.searchQuery}`;
      this.http.get(url).subscribe((response: any) => {
        this.searchResults = response.results;
      });
    }
  }

  getTopSeries() {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${this.tmdbApiKey}&language=fr-FR`;
    this.http.get(url).subscribe((response: any) => {
      this.topSeries = response.results.slice(0, 100);  // Limiter à 100 séries
    });
  }

  viewSeriesDetails(seriesId: number) {
    this.router.navigate(['/series', seriesId]);
  }



}
