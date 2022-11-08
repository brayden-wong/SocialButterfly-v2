import { CreateEventDto, UpdateEventDto, FilterOptions } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  //POST
  @MessagePattern('create event')
  async createEvent(
    @Payload('id')
    id: string,
    @Payload('event')
    event: CreateEventDto
  ) {
    return await this.eventsService.createEvent(id, event);
  }

  //GET
  @MessagePattern('find all events')
  async findAllEvents() {
    return await this.eventsService.findAllEvents();
  }

  @MessagePattern('find event by id')
  async findEventById(@Payload('id') id: string) {
    return await this.eventsService.findEventById(id);
  }

  @MessagePattern('find event by user')
  async findEventsByUser(
    @Payload('id') id: string
  ) {
    return await this.eventsService.findEventsByUser(id);
  }

  @MessagePattern('filter events')
  async filterEvents(
    @Payload('options')
    options: FilterOptions
  ) {
    return await this.eventsService.findByFilters(options);
  }

  //PATCH
  @MessagePattern('update event')
  async updateEvent(
    @Payload('id')
    id: string,
    @Payload('event')
    event: UpdateEventDto
  ) {
    return await this.eventsService.updateEvent(id, event);
  }

  @MessagePattern('rsvp event')
  async rsvp(
    @Payload('event_id')
    event_id: string,
    @Payload('user_id')
    user_id: string
  ) {
    return await this.eventsService.rsvp(event_id, user_id);
  }

  @MessagePattern('unRSVP event')
  async unRSVP(
    @Payload('event_id')
    event_id: string,
    @Payload('user_id')
    user_id: string
  ) {
    return await this.eventsService.unRSVP(event_id, user_id);
  }

  //DELETE
  @MessagePattern('remove event')
  async removeEvent(@Payload('id') id: string) {
    return await this.eventsService.removeEvent(id);
  }
}
