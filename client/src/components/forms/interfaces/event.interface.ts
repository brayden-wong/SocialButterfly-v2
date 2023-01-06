import { Address } from './address.interface';

export interface Event {
  event_name: string;
  description: string;
  date: Date;
  online: false;
  address: Address;
}