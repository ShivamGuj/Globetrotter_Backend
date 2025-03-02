import { Invitation } from './invitation.interface';
export declare class InvitationsService {
    private invitations;
    createInvitation(inviterId: string, inviterName: string, score: number): string;
    getInvitation(id: string): Invitation | undefined;
}
