import { Place } from '../../places/models/place.model';

export interface Device {
  uid: string;
  type: string;
  placeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DeviceGetResponse = Device & {
  place: Place;
};

export type DeviceUpdateRequest = Partial<Device>;
