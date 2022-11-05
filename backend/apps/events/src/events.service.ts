import { CreateEventDto, PrismaService, UpdateEventDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
  ) { }

  async createEvent(id: string, event: CreateEventDto) {
    const { address, date, ...currentEvent } = event;
    const newDate = new Date(date + ` ${currentEvent.time}`);
    console.log(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`);
    const newEvent = await this.prisma.event.create({
      data: {
        user_id: id,
        date: new Date(date + ` ${currentEvent.time}`),
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
