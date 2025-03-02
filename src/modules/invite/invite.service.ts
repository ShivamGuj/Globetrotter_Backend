import { Injectable } from "@nestjs/common";
import { db } from "../../database/drizzle";
import { invites } from "../../database/schema";
import { eq } from 'drizzle-orm';

@Injectable()
export class InviteService {
  async createInvite(username: string) {
    const inviteLink = `https://globetrotter.com/invite/${username}`;
    await db.insert(invites).values({ inviter: username, link: inviteLink });
    return { link: inviteLink };
  }

  async getInvite(username: string) {
    const invite = await db.select().from(invites).where(eq(invites.inviter, username)).limit(1);
    return invite.length ? invite[0] : null;
  }
}
