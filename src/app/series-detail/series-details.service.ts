import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SeriesDetailsService {
    private seriesDetails: any;

    constructor() { }

    setSeriesDetails(details: any) {
        this.seriesDetails = details;
    }

    getSeriesDetails() {
        return this.seriesDetails;
    }
}
