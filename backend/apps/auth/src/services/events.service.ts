import { CreateEventDto, EVENTS_SERVICE, FilterOptions, UpdateEventDto } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_SERVICE)
    private readonly eventsClient: ClientProxy
  ) { }
  
  //POST
  async createEvent(id: string, event: CreateEventDto) {
    return await lastValueFrom(this.eventsClient.send('create event', { id: id, event: event }));
  }

  //GET
  async findAllEvents() {
    return await lastValueFrom(this.eventsClient.send('find all events', { }));
  }

  async findEventById(id: string) {
    return await lastValueFrom(this.eventsClient.send('find event by id', { id: id }));
  }

  async findEventsByUser(id: string) {
    return await lastValueFrom(this.eventsClient.send('find event by user', { id: id }));
  }

  async filterEvents(options: FilterOptions) {
    return await lastValueFrom(this.eventsClient.send('filter events', { options: options }));
  }

  //PATCH
  async updateEvent(id: string, event: UpdateEventDto) {
    return await lastValueFrom(this.eventsClient.send('update event', { id: id, event: event }));
  }

  async rsvp(id: { event_id: string, user_id: string }) {
    return await lastValueFrom(this.eventsClient.send('rsvp event', id));
  }

  async unRSVP(id: { event_id: string, user_id: string }) {
    return await lastValueFrom(this.eventsClient.send('unRSVP event', id));
  }

  //DELETE
  async removeEvent(id: string) {
    return await lastValueFrom(this.eventsClient.send('remove event', { id: id }));
  }

}