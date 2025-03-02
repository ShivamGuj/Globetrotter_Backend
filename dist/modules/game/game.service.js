"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_1 = require("../../database/drizzle");
const schema_1 = require("../../database/schema");
const sql_1 = require("drizzle-orm/sql");
const drizzle_orm_1 = require("drizzle-orm");
let GameService = class GameService {
    async getRandomDestination() {
        const destination = await drizzle_1.db.select().from(schema_1.destinations).orderBy((0, sql_1.sql) `RANDOM()`).limit(1);
        if (!destination.length)
            return null;
        const cluesList = await drizzle_1.db.select().from(schema_1.clues).where((0, drizzle_orm_1.eq)(schema_1.clues.destination_id, destination[0].id)).limit(2);
        const triviaList = await drizzle_1.db.select().from(schema_1.trivia).where((0, drizzle_orm_1.eq)(schema_1.trivia.destination_id, destination[0].id)).limit(1);
        return {
            city: destination[0].city,
            country: destination[0].country,
            clues: cluesList.map(c => c.clue_text),
            trivia: triviaList.length ? triviaList[0].trivia_text : null
        };
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)()
], GameService);
//# sourceMappingURL=game.service.js.map