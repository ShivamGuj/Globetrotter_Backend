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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("@nestjs/config");
let CityService = class CityService {
    constructor(configService) {
        this.configService = configService;
        this.cities = [];
        const apiKey = this.configService.get('GEMINI_API_KEY');
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }
    async generateCities(count = 5) {
        if (this.cities.length >= count) {
            return this.cities.slice(0, count);
        }
        try {
            const prompt = `Generate ${count} unique city data objects for a geography guessing game. 
      Each city should be from a different country and be recognizable. 
      Format the response as valid JSON array with objects having this exact structure:
      {
        "city": "City Name",
        "country": "Country Name",
        "clues": [
          "A unique geographical or cultural clue about the city (no direct mention of city name)",
          "Another unique clue about the city (no direct mention of city name)"
        ],
        "fun_fact": [
          "An interesting fact about the city that's not common knowledge",
          "Another fun fact about the city"
        ],
        "trivia": [
          "An educational trivia item about this city",
          "Another educational trivia item"
        ],
        "secondChanceClue": "A more obvious clue that still doesn't directly name the city"
      }
      
      Make sure the clues are challenging but fair, and don't mention the city name directly.`;
            const result = await this.model.generateContent(prompt);
            const resultText = result.response.text();
            const jsonMatch = resultText.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                throw new Error('Could not parse JSON from AI response');
            }
            const jsonString = jsonMatch[0];
            const generatedCities = JSON.parse(jsonString);
            this.cities = [...this.cities, ...generatedCities];
            return this.cities.slice(0, count);
        }
        catch (error) {
            console.error('Error generating cities:', error);
            throw error;
        }
    }
    async getAllCities() {
        if (this.cities.length === 0) {
            return this.generateCities(100);
        }
        return this.cities;
    }
    async getCityByName(cityName) {
        await this.ensureCitiesLoaded();
        return this.cities.find(city => city.city.toLowerCase() === cityName.toLowerCase());
    }
    async ensureCitiesLoaded() {
        if (this.cities.length === 0) {
            await this.generateCities(100);
        }
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CityService);
//# sourceMappingURL=city.service.js.map