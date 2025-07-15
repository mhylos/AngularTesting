import { Injectable } from '@angular/core';
import {
  AccessEvent,
  AccessEventGetResponse,
  AccessEventSearchParams,
} from '../models/access-event.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccessEventService {
  constructor(private http: HttpClient) {}

  getAccessEvents(query?: AccessEventSearchParams) {
    let params: HttpParams = new HttpParams()
      .set('_page', '1')
      .set('_limit', '10')
      .set('_expand', 'device');

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<AccessEventGetResponse[]>(
      `${environment.apiUrl}/access-events`,
      {
        params,
      }
    );
  }
}
