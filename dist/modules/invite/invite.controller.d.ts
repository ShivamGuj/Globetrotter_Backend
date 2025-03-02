import { InviteService } from "./invite.service";
export declare class InviteController {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    createInvite(username: string): Promise<{
        link: string;
    }>;
    getInvite(username: string): Promise<{
        id: number;
        inviter: string;
        link: string;
    }>;
}
