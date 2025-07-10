import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations(query?: string): Observable<Location[]> {
    let params: HttpParams = new HttpParams()
      .set('_page', '1')
      .set('_limit', '10');

    if (query) {
      params = params.set('q', query);
    }

    return this.http.get<Location[]>(`${environment.apiUrl}/locations`, {
      params,
    });
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${environment.apiUrl}/locations/${id}`);
  }
}
