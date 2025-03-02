import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Invitation } from './invitation.interface';

@Injectable()
export class InvitationsService {
  private invitations: Map<string, Invitation> = new Map();

  createInvitation(inviterId: string, inviterName: string, score: number): string {
    const id = uuidv4();
    const invitation: Invitation = {
      id,
      inviterId,
      inviterName,
      score,
      createdAt: new Date(),
    };
    
    this.invitations.set(id, invitation);
    
    // Invitations expire after 24 hours
    setTimeout(() => {
      this.invitations.delete(id);
    }, 24 * 60 * 60 * 1000);
    
    return id;
  }

  getInvitation(id: string): Invitation | undefined {
    return this.invitations.get(id);
  }
}
