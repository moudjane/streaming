import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { StreamingComponent } from './streaming/streaming.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'series/:id', component: SeriesDetailComponent },
  { path: 'launch/:id', component: StreamingComponent },
  { path: '**', redirectTo: '' }
];
