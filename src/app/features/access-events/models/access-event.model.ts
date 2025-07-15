import { Device } from '@/features/devices/models/device.model';
import { User } from '@/features/users/models/user.model';

export interface AccessEvent {
  id: number;
  entryTime: Date;
  exitTime: Date;
  userId: number;
  errorTypeId: string;
  deviceId: number;
}

export type AccessEventGetResponse = AccessEvent & {
  device: Device;
  user: User;
};

export interface AccessEventSearchParams {
  date?: Date;
  _page?: number;
  _limit?: number;
}
