export interface Location {
  id: number;
  name: string;
}

export type LocationUpdateRequest = Omit<Location, 'id'>;
export type LocationCreateRequest = Omit<Location, 'id'>;
