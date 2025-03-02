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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    async getAllCities(count) {
        if (count) {
            return this.cityService.generateCities(count);
        }
        return this.cityService.getAllCities();
    }
    async getCityByName(name) {
        const city = await this.cityService.getCityByName(name);
        return city;
    }
    async generateCities(count) {
        return this.cityService.generateCities(count);
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getAllCities", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getCityByName", null);
__decorate([
    (0, common_1.Get)('generate/:count'),
    __param(0, (0, common_1.Param)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "generateCities", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)('cities'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map