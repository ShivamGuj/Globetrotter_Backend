import { Injectable } from '@nestjs/common';
import { db } from '../../database/drizzle';
import { users } from '../../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  async login(username: string) {
    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
    
    // If user doesn't exist, create a new one
    if (!existingUser.length) {
      await db.insert(users).values({ username });
    }
    
    // Return simple token (in a real app, use JWT)
    return {
      username,
      token: `token_${username}_${Date.now()}`,
    };
  }
}
