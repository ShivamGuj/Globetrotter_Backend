"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trivia = exports.clues = exports.destinations = exports.invites = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.varchar)('username', { length: 255 }).notNull().unique()
});
exports.invites = (0, pg_core_1.pgTable)('invites', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    inviter: (0, pg_core_1.varchar)('inviter', { length: 255 }).notNull(),
    link: (0, pg_core_1.text)('link').notNull()
});
exports.destinations = (0, pg_core_1.pgTable)('destinations', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    city: (0, pg_core_1.varchar)('city', { length: 255 }).notNull(),
    country: (0, pg_core_1.varchar)('country', { length: 255 }).notNull()
});
exports.clues = (0, pg_core_1.pgTable)('clues', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    destination_id: (0, pg_core_1.integer)('destination_id').notNull(),
    clue_text: (0, pg_core_1.text)('clue_text').notNull()
});
exports.trivia = (0, pg_core_1.pgTable)('trivia', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    destination_id: (0, pg_core_1.integer)('destination_id').notNull(),
    trivia_text: (0, pg_core_1.text)('trivia_text').notNull()
});
//# sourceMappingURL=schema.js.map