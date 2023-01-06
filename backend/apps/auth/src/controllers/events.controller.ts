import { CreateEventDto, FilterOptions, UpdateEventDto } from "@app/common";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Public } from "../decorators/public.decorator";
import { GetUserId } from "../decorators/user-id.decorator";
import { EventsService } from "../services/events.service";

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  //POST
  @Post('create')
  async createEvent(
    @GetUserId() id: string,
    @Body('event')
    event: CreateEventDto
  ) {
    return await this.eventsService.createEvent(id, event);
  }

  //PATCH
  @Patch('/rsvp/:id')
  async rsvp(
    @Param('id')
    event_id: string,
    @GetUserId()
    user_id: string
  ) {
    console.log('hitting this function');
    return await this.eventsService.rsvp({ event_id: event_id, user_id: user_id });
  }

  @Patch('rsvp/remove/:id')
  async unRSVP(
    @Param('id')
    event_id: string,
    @GetUserId()
    user_id: string
  ) {
    return await this.eventsService.unRSVP({ event_id: event_id, user_id: user_id });
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

  //DELETE
  @Delete(':id')
  async removeEvent(
    @Param('id')
    id: string
  ) {
    return await this.eventsService.removeEvent(id);
  }

  //GET
  @Public()
  @Get('filters')
  async filterEvents(
    @Body('options')
    options: FilterOptions
  ) {
    return await this.eventsService.filterEvents(options);
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

  @Public()
  @Get('/user/:id')
  async getEventsByUser(
    @Param('id') id: string
  ) {
    return await this.eventsService.findEventsByUser(id);
  }
}