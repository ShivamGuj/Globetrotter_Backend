export declare class InviteService {
    createInvite(username: string): Promise<{
        link: string;
    }>;
    getInvite(username: string): Promise<{
        id: number;
        inviter: string;
        link: string;
    }>;
}
