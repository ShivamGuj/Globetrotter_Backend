import { InvitationsService } from './invitations.service';
import { Invitation } from './invitation.interface';
export declare class InvitationsController {
    private invitationsService;
    constructor(invitationsService: InvitationsService);
    createInvitation(data: {
        inviterId: string;
        inviterName: string;
        score: number;
    }): {
        id: string;
        invitationLink: string;
    };
    getInvitation(id: string): Invitation | undefined;
}
