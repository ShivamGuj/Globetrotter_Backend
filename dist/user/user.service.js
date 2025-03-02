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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('UserService');
    }
    async findByUsername(username) {
        try {
            this.logger.log(`Finding user by username: ${username}`);
            const user = await this.userRepository.findOne({
                where: { username }
            });
            if (!user) {
                this.logger.warn(`User not found: ${username}`);
                return undefined;
            }
            this.logger.log(`User found: ${username}`);
            return user;
        }
        catch (error) {
            this.logger.error(`Error finding user by username: ${error.message}`);
            return undefined;
        }
    }
    async findById(id) {
        try {
            return await this.userRepository.findOne({
                where: { id }
            });
        }
        catch (error) {
            this.logger.error(`Error finding user by ID: ${error.message}`);
            return undefined;
        }
    }
    async create(username, password) {
        try {
            this.logger.log(`Creating user: ${username}`);
            const existingUser = await this.findByUsername(username);
            if (existingUser) {
                this.logger.warn(`Username already exists: ${username}`);
                throw new common_1.ConflictException('Username already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = this.userRepository.create({
                username,
                password: hashedPassword,
                highScore: 0
            });
            const savedUser = await this.userRepository.save(newUser);
            this.logger.log(`User created successfully: ${username}`);
            return savedUser;
        }
        catch (error) {
            this.logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }
    async updateHighScore(username, score) {
        try {
            this.logger.log(`Updating high score for ${username}: ${score}`);
            const user = await this.findByUsername(username);
            if (!user) {
                this.logger.warn(`User not found for high score update: ${username}`);
                throw new common_1.NotFoundException(`User ${username} not found`);
            }
            if (score > user.highScore) {
                user.highScore = score;
                await this.userRepository.save(user);
                this.logger.log(`High score updated for ${username}: ${score}`);
            }
            else {
                this.logger.log(`Score ${score} not higher than current high score ${user.highScore}`);
            }
        }
        catch (error) {
            this.logger.error(`Error updating high score: ${error.message}`);
            throw error;
        }
    }
    async getTopScores(limit = 10) {
        try {
            return await this.userRepository.find({
                order: { highScore: 'DESC' },
                take: limit,
                select: ['id', 'username', 'highScore', 'createdAt']
            });
        }
        catch (error) {
            this.logger.error(`Error getting top scores: ${error.message}`);
            return [];
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map