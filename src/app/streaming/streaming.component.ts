import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SeriesDetailsService } from '../series-detail/series-details.service';

@Component({
  selector: 'app-streaming',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css']
})
export class StreamingComponent implements OnInit {
  seriesName: string | undefined;
  seasonNumber: number | undefined;
  episodeNumber: number | undefined;
  poster: string | undefined;
  overview: string | undefined;
  iframeSrc: SafeResourceUrl | undefined;
  apiUrl: string = 'https://frembed.pro/api/serie.php';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    @Inject(SeriesDetailsService) private seriesDetailsService: SeriesDetailsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.seasonNumber = +params['season'];
      this.episodeNumber = +params['episode'];
      this.updateStream();
    });

    const storedDetails = this.seriesDetailsService.getSeriesDetails();

    if (storedDetails) {
      this.seriesName = storedDetails.name;
      this.poster = storedDetails.poster;
      this.overview = storedDetails.overview;

      if (this.seasonNumber && this.episodeNumber) {
        this.updateStream();
      }
    }
  }

  updateStream() {
    if (this.seasonNumber && this.episodeNumber) {
      const seriesId = this.seriesDetailsService.getSeriesDetails().id;
      if (seriesId && !isNaN(this.seasonNumber) && !isNaN(this.episodeNumber)) {
        const url = `${this.apiUrl}?id=${seriesId}&sa=${this.seasonNumber}&epi=${this.episodeNumber}`;
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        console.error('ID de série, saison ou épisode invalide.');
      }
    } else {
      console.error('Les paramètres de saison ou d\'épisode sont manquants.');
    }
  }
  
}
