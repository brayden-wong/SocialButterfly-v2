import { CreateEventDto, EmailService, PrismaService, UpdateEventDto, USERS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    @Inject(USERS_SERVICE)
    private readonly usersClient: ClientProxy,
    @Inject(EmailService)
    private readonly emailService: EmailService,
  ) { }

  //POST
  async createEvent(id: string, event: CreateEventDto) {
    const { event_name, address, date, time, ...currentEvent } = event;
    const newEvent = await this.prisma.event.create({
      data: {
        event_name: this.capitalizeWords(event_name),
        user_id: id,
        date: new Date(date + ` ${time}`),
        ...currentEvent,
        address: {
          create: address
        }
      }
    });

    return newEvent;
  }

  //GET
  async findAllEvents() {
    return await this.prisma.event.findMany();
  }

  async findEventById(id: string) {
    return await this.prisma.event.findUnique({ where: { id: id }});
  }

  async findEventsByUser(id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        user_id: id
      }, select: {
        id: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,

          }
        },
        event_name: true,
        available_slots: true,
        date: true
      }
    });
    if(events) return events;
    return null;
  }

  //PATCH
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

  async rsvp(event_id: string, user_id: string) {
    const event = await this.prisma.event.update({
      where: {
        id: event_id
      },
      data: {
        rsvp_list: {
          connect: {
            id: user_id
          },
        },
        available_slots: {
          decrement: 1
        }
      }, select: {
        event_name: true,
        date: true,
        user: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        online: true,
        rsvp_list: true,
        address: true,
      }
    });
    const data: { name: string, emails: string[] } = await lastValueFrom(this.usersClient.send('get email', { id: user_id }));
    data.emails.forEach(email => {
      this.emailService.sendMail({
        to: email,
        subject: `RSVP to ${event.event_name}`,
        template: 'rsvp',
        context: {
          name: data.name,
          event_name: event.event_name,
          address: {
            ...event.address
          },
          date: event.date.toLocaleDateString('EN-US'),
          time: this.convertTime(event.date.getHours(), event.date.getMinutes())
        }
      });
    });

    if(event) return event;
    return null;
  }

  //DELETE
  async removeEvent(id: string) {
    return await this.prisma.event.delete({ where: { id: id }});
  }

  //Helper Functions

  capitalizeWords(event: string) {
    const words = event.split(' ');
    words.forEach((word, index) => {
      words[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return words.toString().replace(',', ' ');
  }

  convertTime(hours: number, minutes: number) {
    console.log(minutes);
    if(hours > 12)
      return hours > 10 ? `0${hours - 12}` : (hours - 12) + `:${minutes} PM`;
    else {
      return hours > 10 ? `0${hours}` : hours + `:${minutes} AM`;
    }
  }
}
