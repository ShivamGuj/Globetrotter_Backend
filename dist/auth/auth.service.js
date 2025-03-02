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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    async validateUser(username, pass) {
        try {
            this.logger.log(`Attempting to validate user: ${username}`);
            const user = await this.userService.findByUsername(username);
            if (!user) {
                this.logger.warn(`User not found: ${username}`);
                return null;
            }
            if (!user.password) {
                this.logger.warn(`User ${username} has no password set`);
                return null;
            }
            try {
                const isMatch = await bcrypt.compare(pass, user.password);
                if (isMatch) {
                    this.logger.log(`User ${username} successfully validated`);
                    const { password } = user, result = __rest(user, ["password"]);
                    return result;
                }
                else {
                    this.logger.warn(`Password mismatch for user: ${username}`);
                    return null;
                }
            }
            catch (bcryptError) {
                this.logger.error(`bcrypt error: ${bcryptError.message}`);
                return null;
            }
        }
        catch (error) {
            this.logger.error(`Error validating user: ${error.message}`);
            return null;
        }
    }
    async login(user) {
        try {
            const payload = {
                username: user.username,
                sub: user.id
            };
            const token = this.jwtService.sign(payload);
            this.logger.log(`Generated token for user: ${user.username}`);
            return {
                access_token: token,
                userId: user.id,
                username: user.username,
            };
        }
        catch (error) {
            this.logger.error(`Error in login: ${error.message}`);
            throw new common_1.UnauthorizedException('Login failed');
        }
    }
    async register(username, password) {
        try {
            const newUser = await this.userService.create(username, password);
            const { password: _ } = newUser, result = __rest(newUser, ["password"]);
            return result;
        }
        catch (error) {
            this.logger.error(`Registration error: ${error.message}`);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map