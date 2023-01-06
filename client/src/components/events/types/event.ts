export interface Event {
  id: string;
  event_name: string;
  description: string;
  date: Date;
  tags: string[];
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zipcode: string;
  }
}