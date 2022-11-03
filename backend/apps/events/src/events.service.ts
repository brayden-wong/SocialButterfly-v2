import { CreateEventDto, EventsDatabaseService, UpdateEventDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EventsDatabaseService)
    private readonly prisma: EventsDatabaseService
  ) { }

  async createEvent(event: CreateEventDto) {
    const { address, ...currentEvent } = event;
    const newEvent = await this.prisma.event.create({
      data: {
        ...currentEvent,
        address: {
          create: address
        }
      }
    });

    return newEvent;
  }

  async findAllEvents() {
    return await this.prisma.event.findMany();
  }

  async findEventById(id: string) {
    return await this.prisma.event.findUnique({ where: { id: id }});
  }

  async updateEvent(id: string, event: UpdateEventDto) {
    const { address, ...currentEvent } = event;
    return await this.prisma.event.update({ 
      where: { id: id },
      data: {
        ...currentEvent,
        address: {
          update: address
        }
      }
    });
  }

  async removeEvent(id: string) {
    return await this.prisma.event.delete({ where: { id: id }});
  }
}
