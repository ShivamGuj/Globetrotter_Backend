import { Injectable } from "@nestjs/common";
import { db } from "../../database/drizzle";
import { destinations, clues, trivia } from "../../database/schema";
import { sql } from "drizzle-orm/sql";
import { eq } from "drizzle-orm";

@Injectable()
export class GameService {
  async getRandomDestination() {
    const destination = await db.select().from(destinations).orderBy(sql`RANDOM()`).limit(1);
    if (!destination.length) return null;

    const cluesList = await db.select().from(clues).where(eq(clues.destination_id, destination[0].id)).limit(2);
    const triviaList = await db.select().from(trivia).where(eq(trivia.destination_id, destination[0].id)).limit(1);

    return {
      city: destination[0].city,
      country: destination[0].country,
      clues: cluesList.map(c => c.clue_text),
      trivia: triviaList.length ? triviaList[0].trivia_text : null
    };
  }
}
