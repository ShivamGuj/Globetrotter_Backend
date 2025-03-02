"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let InvitationsService = class InvitationsService {
    constructor() {
        this.invitations = new Map();
    }
    createInvitation(inviterId, inviterName, score) {
        const id = (0, uuid_1.v4)();
        const invitation = {
            id,
            inviterId,
            inviterName,
            score,
            createdAt: new Date(),
        };
        this.invitations.set(id, invitation);
        setTimeout(() => {
            this.invitations.delete(id);
        }, 24 * 60 * 60 * 1000);
        return id;
    }
    getInvitation(id) {
        return this.invitations.get(id);
    }
};
exports.InvitationsService = InvitationsService;
exports.InvitationsService = InvitationsService = __decorate([
    (0, common_1.Injectable)()
], InvitationsService);
//# sourceMappingURL=invitations.service.js.map