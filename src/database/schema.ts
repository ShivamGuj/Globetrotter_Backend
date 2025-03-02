import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique()
});

export const invites = pgTable('invites', {
  id: serial('id').primaryKey(),
  inviter: varchar('inviter', { length: 255 }).notNull(),
  link: text('link').notNull()
});

export const destinations = pgTable('destinations', {
  id: serial('id').primaryKey(),
  city: varchar('city', { length: 255 }).notNull(),
  country: varchar('country', { length: 255 }).notNull()
});

export const clues = pgTable('clues', {
  id: serial('id').primaryKey(),
  destination_id: integer('destination_id').notNull(),
  clue_text: text('clue_text').notNull()
});

export const trivia = pgTable('trivia', {
  id: serial('id').primaryKey(),
  destination_id: integer('destination_id').notNull(),
  trivia_text: text('trivia_text').notNull()
});
