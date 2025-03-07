"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationsController = void 0;
const common_1 = require("@nestjs/common");
const invitations_service_1 = require("./invitations.service");
let InvitationsController = class InvitationsController {
    constructor(invitationsService) {
        this.invitationsService = invitationsService;
    }
    createInvitation(data) {
        const { inviterId, inviterName, score } = data;
        const invitationId = this.invitationsService.createInvitation(inviterId, inviterName, score);
        return {
            id: invitationId,
            invitationLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/invite/${invitationId}`
        };
    }
    getInvitation(id) {
        const invitation = this.invitationsService.getInvitation(id);
        if (!invitation) {
            throw new common_1.NotFoundException('Invitation not found');
        }
        return invitation;
    }
};
exports.InvitationsController = InvitationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvitationsController.prototype, "createInvitation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], InvitationsController.prototype, "getInvitation", null);
exports.InvitationsController = InvitationsController = __decorate([
    (0, common_1.Controller)('invitations'),
    __metadata("design:paramtypes", [invitations_service_1.InvitationsService])
], InvitationsController);
//# sourceMappingURL=invitations.controller.js.map