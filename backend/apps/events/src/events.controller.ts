import { CreateEventDto, UpdateEventDto } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('create event')
  async createEvent(
    @Payload('event')
    event: CreateEventDto
  ) {
    return await this.eventsService.createEvent(event);
  }

  @MessagePattern('find all events')
  async findAllEvents() {
    return await this.eventsService.findAllEvents();
  }

  @MessagePattern('find event by id')
  async findEventById(@Payload('id') id: string) {
    return await this.eventsService.findEventById(id);
  }

  @MessagePattern('update event')
  async updateEvent(
    @Payload('id')
    id: string,
    @Payload('event')
    event: UpdateEventDto
  ) {
    return await this.eventsService.updateEvent(id, event);
  }

  @MessagePattern('remove event')
  async removeEvent(@Payload('id') id: string) {
    return await this.eventsService.removeEvent(id);
  }
}
