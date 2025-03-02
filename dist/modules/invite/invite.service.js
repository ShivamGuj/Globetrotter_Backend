"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_1 = require("../../database/drizzle");
const schema_1 = require("../../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
let InviteService = class InviteService {
    async createInvite(username) {
        const inviteLink = `https://globetrotter.com/invite/${username}`;
        await drizzle_1.db.insert(schema_1.invites).values({ inviter: username, link: inviteLink });
        return { link: inviteLink };
    }
    async getInvite(username) {
        const invite = await drizzle_1.db.select().from(schema_1.invites).where((0, drizzle_orm_1.eq)(schema_1.invites.inviter, username)).limit(1);
        return invite.length ? invite[0] : null;
    }
};
exports.InviteService = InviteService;
exports.InviteService = InviteService = __decorate([
    (0, common_1.Injectable)()
], InviteService);
//# sourceMappingURL=invite.service.js.map