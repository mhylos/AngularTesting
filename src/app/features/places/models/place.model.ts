import { Location } from '../../locations/models/location.model';

export interface Place {
  id: number;
  name: string;
  locationId: number;
}

export type PlaceGetResponse = Place & {
  location: Location;
};

export type PlaceCreateRequest = Omit<Place, 'id'>;
