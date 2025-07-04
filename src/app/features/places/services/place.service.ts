import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Place,
  PlaceCreateRequest,
  PlaceGetResponse,
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

  createPlace(place: PlaceCreateRequest): Observable<Place> {
    return this.http.post<Place>(`${environment.apiUrl}/places`, place);
  }

  updatePlace(id: number, place: Place): Observable<Place> {
    return this.http.put<Place>(`${environment.apiUrl}/places/${id}`, place);
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/places/${id}`);
  }
}
