import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  iframeSrc: SafeResourceUrl = '';
  apiUrl: string = 'https://frembed.pro/api/serie.php';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    @Inject(SeriesDetailsService) private seriesDetailsService: SeriesDetailsService
  ) { }

  ngOnInit() {
    // Vérifier s'il y a des informations dans le localStorage
    const storedDetails = localStorage.getItem('seriesDetails');
    let seriesDetails;

    if (storedDetails) {
      seriesDetails = JSON.parse(storedDetails);
    } else {
      seriesDetails = this.seriesDetailsService.getSeriesDetails();
    }

    if (seriesDetails) {
      this.seriesName = seriesDetails.name;
      this.poster = seriesDetails.poster;
      this.overview = seriesDetails.overview;
      this.seasonNumber = seriesDetails.season;
      this.episodeNumber = seriesDetails.episode;
    }

    this.route.params.subscribe(params => {
      const seriesId = +params['id'];
      if (!isNaN(seriesId)) {
        this.launchSeriesById(seriesId);
      } else {
        console.error('Invalid series ID:', seriesId);
      }
    });
  }

  launchSeriesById(seriesId: number) {
    if (!seriesId || isNaN(seriesId)) {
      console.error('Invalid series ID:', seriesId);
      return;
    }
    const url = `${this.apiUrl}?id=${seriesId}&sa=${this.seasonNumber}&epi=${this.episodeNumber}`;
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
