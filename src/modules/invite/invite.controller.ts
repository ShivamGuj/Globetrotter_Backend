import { Controller } from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Param, Body } from "@nestjs/common";
import { InviteService } from "./invite.service";

@Controller("invite")
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post("create")
  createInvite(@Body("username") username: string) {
    return this.inviteService.createInvite(username);
  }

  @Get(":username")
  getInvite(@Param("username") username: string) {
    return this.inviteService.getInvite(username);
  }
}
