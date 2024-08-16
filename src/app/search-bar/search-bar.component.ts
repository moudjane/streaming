import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() displayMode: 'fullPage' | 'dropdown' = 'fullPage';  // Détermine le mode d'affichage

  searchQuery: string = '';
  searchResults: any[] = [];
  tmdbApiKey: string = '819e4850402430664fdf93a2025c2c6d';
  imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  searchSeries() {
    if (this.searchQuery.trim()) {
      const url = `https://api.themoviedb.org/3/search/tv?api_key=${this.tmdbApiKey}&query=${this.searchQuery}`;
      this.http.get(url).subscribe((response: any) => {
        this.searchResults = response.results;
      });
    } else {
      this.searchResults = []; // Clear results if search query is empty
    }
  }

  viewSeriesDetails(seriesId: number) {
    this.router.navigate(['/series', seriesId]);
  }
}
