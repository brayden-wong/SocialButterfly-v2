import { CreateEventDto, EVENTS_SERVICE, UpdateEventDto } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_SERVICE)
    private readonly eventsClient: ClientProxy
  ) { }
  
  async createEvent(event: CreateEventDto) {
    return await lastValueFrom(this.eventsClient.send('create event', { event: event }));
  }

  async findAllEvents() {
    return await lastValueFrom(this.eventsClient.send('find all events', { }));
  }

  async findEventById(id: string) {
    return await lastValueFrom(this.eventsClient.send('find event by id', { id: id }));
  }

  async updateEvent(id: string, event: UpdateEventDto) {
    return await lastValueFrom(this.eventsClient.send('update event', { id: id, event: event }));
  }

  async removeEvent(id: string) {
    return await lastValueFrom(this.eventsClient.send('remove event', { id: id }));
  }

}