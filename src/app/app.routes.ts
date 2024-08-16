import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'series/:id/:season/:episode', component: SeriesDetailComponent },
  { path: 'series/:id', component: SeriesDetailComponent },
  { path: '**', redirectTo: '' }
];
