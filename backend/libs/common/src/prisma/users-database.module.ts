import { Module } from "@nestjs/common";
import { UsersDatabaseService } from "./users-database.service";

@Module({
  providers: [UsersDatabaseService],
  exports: [UsersDatabaseService]
})
export class UsersDatabaseModule { }