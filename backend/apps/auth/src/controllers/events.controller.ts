import { CreateEventDto, UpdateEventDto } from "@app/common";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Public } from "../decorators/public.decorator";
import { GetUserId } from "../decorators/user-id.decorator";
import { EventsService } from "../services/events.service";

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post('create')
  async createEvent(
    @GetUserId() id: string,
    @Body('event')
    event: CreateEventDto
  ) {
    return await this.eventsService.createEvent(id, event);
  }

  @Public()
  @Get()
  async findAllEvents() {
    return await this.eventsService.findAllEvents();
  }

  @Public()
  @Get(':id')
  async findEventById(
    @Param('id')
    id: string
  ) {
    return await this.eventsService.findEventById(id);
  }

  @Patch(':id')
  async updateEvent(
    @Param('id')
    id: string,
    @Body('event')
    event: UpdateEventDto
  ) {
    return await this.eventsService.updateEvent(id, event);
  }

  @Delete(':id')
  async removeEvent(
    @Param('id')
    id: string
  ) {
    return await this.eventsService.removeEvent(id);
  }
}