import { Address } from '../address.class';

export class CreateEventDto {
  event_name: string;
  user_id?: string;
  date: Date;
  time?: string;
  online: boolean;
  available_slots?: number;
  address?: Address
}