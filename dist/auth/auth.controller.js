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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('AuthController');
    }
    async login(req) {
        try {
            this.logger.log('Login attempt successful, generating token');
            return this.authService.login(req.user);
        }
        catch (error) {
            this.logger.error(`Login error: ${error.message}`);
            throw new common_1.HttpException('Login failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async register(body) {
        try {
            this.logger.log(`Registration attempt for username: ${body.username}`);
            if (!body.username || !body.password) {
                throw new common_1.HttpException('Username and password are required', common_1.HttpStatus.BAD_REQUEST);
            }
            return this.authService.register(body.username, body.password);
        }
        catch (error) {
            this.logger.error(`Registration error: ${error.message}`);
            throw new common_1.HttpException(error.message || 'Registration failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getProfile(req) {
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map