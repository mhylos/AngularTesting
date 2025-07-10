import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Place,
  PlaceCreateRequest,
  PlaceGetResponse,
  PlaceUpdateRequest,
} from '../models/place.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  constructor(private http: HttpClient) {}

  getPlaces(): Observable<PlaceGetResponse[]> {
    return this.http.get<PlaceGetResponse[]>(
      `${environment.apiUrl}/places?_expand=location`
    );
  }

  getPlaceById(id: Place['id']): Observable<PlaceGetResponse> {
    return this.http.get<PlaceGetResponse>(
      `${environment.apiUrl}/places/${id}?_expand=location`
    );
  }

  createPlace(place: PlaceCreateRequest): Observable<Place> {
    return this.http.post<Place>(`${environment.apiUrl}/places`, place);
  }

  updatePlace(id: Place['id'], place: PlaceUpdateRequest): Observable<Place> {
    return this.http.put<Place>(`${environment.apiUrl}/places/${id}`, place);
  }

  deletePlace(id: Place['id']): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/places/${id}`);
  }
}
