import { Module } from "@nestjs/common";
import { EventsDatabaseService } from "./events-database.service";

@Module({
  providers: [EventsDatabaseService],
  exports: [EventsDatabaseService]
})
export class EventsDatabaseModule { }