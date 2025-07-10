import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Device, DeviceGetResponse } from '../models/device.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  getDevices(): Observable<DeviceGetResponse[]> {
    return this.http.get<DeviceGetResponse[]>(
      `${environment.apiUrl}/devices?_expand=place`
    );
  }

  getDeviceById(uid: Device['uid']) {
    return this.http.get<Device>(`${environment.apiUrl}/devices/${uid}`);
  }

  createDevice(device: Device) {
    return this.http.post<Device>(`${environment.apiUrl}/devices`, device);
  }

  updateDevice(uid: Device['uid'], device: Device) {
    return this.http.put<Device>(
      `${environment.apiUrl}/devices/${uid}`,
      device
    );
  }

  deleteDevice(uid: Device['uid']) {
    return this.http.delete<void>(`${environment.apiUrl}/devices/${uid}`);
  }
}
