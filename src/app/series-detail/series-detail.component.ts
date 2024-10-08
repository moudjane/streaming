import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeriesDetailsService } from './series-details.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SearchBarComponent],
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {
  seriesId: number | undefined;
  seriesDetails: any;
  selectedSeason: number | undefined;
  selectedEpisode: number | undefined;
  availableSeasons: any[] = [];
  availableEpisodes: any[] = [];
  tmdbApiKey: string = '819e4850402430664fdf93a2025c2c6d';

  iframeSrc: SafeResourceUrl | undefined;
  videoUrl: string | undefined;  // Stocker l'URL de la vidéo en tant que chaîne de caractères
  apiUrl: string = 'https://frembed.pro/api/serie.php';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private seriesDetailsService: SeriesDetailsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.seriesId = +params['id'];
      this.selectedSeason = +params['season'];
      this.selectedEpisode = +params['episode'];
      this.getSeriesDetails();
      if (this.selectedSeason && this.selectedEpisode) {
        this.launchEpisode();
      }
    });
  }

  getSeriesDetails() {
    const url = `https://api.themoviedb.org/3/tv/${this.seriesId}?api_key=${this.tmdbApiKey}&language=fr-FR`;
    this.http.get(url).subscribe(response => {
      this.seriesDetails = response;
      this.availableSeasons = this.seriesDetails.seasons;
      if (this.selectedSeason) {
        this.getEpisodesForSeason(this.selectedSeason);
      }
    });
  }

  onSeasonChange() {
    if (this.selectedSeason) {
      this.getEpisodesForSeason(this.selectedSeason);
    }
  }

  getEpisodesForSeason(seasonNumber: number) {
    const url = `https://api.themoviedb.org/3/tv/${this.seriesId}/season/${seasonNumber}?api_key=${this.tmdbApiKey}&language=fr-FR`;
    this.http.get(url).subscribe((response: any) => {
      this.availableEpisodes = response.episodes;
    });
  }

  launchEpisode() {
    if (this.selectedSeason !== undefined && this.selectedEpisode !== undefined) {
      this.router.navigate(['/series', this.seriesId, this.selectedSeason, this.selectedEpisode]);

      this.videoUrl = `${this.apiUrl}?id=${this.seriesId}&sa=${this.selectedSeason}&epi=${this.selectedEpisode}`;
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
    }
  }

  openInNewTab() {
    if (this.videoUrl) {
      window.open(this.videoUrl, '_blank');
    }
  }
}
