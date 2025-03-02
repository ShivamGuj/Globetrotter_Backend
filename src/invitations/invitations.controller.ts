import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Invitation } from './invitation.interface';

@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Post()
  createInvitation(@Body() data: { inviterId: string; inviterName: string; score: number }) {
    const { inviterId, inviterName, score } = data;
    const invitationId = this.invitationsService.createInvitation(inviterId, inviterName, score);
    
    return { 
      id: invitationId,
      invitationLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/invite/${invitationId}`
    };
  }

  @Get(':id')
  getInvitation(@Param('id') id: string): Invitation | undefined {
    const invitation = this.invitationsService.getInvitation(id);
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }
    return invitation;
  }
}
