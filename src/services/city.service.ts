import { Injectable } from '@nestjs/common';
import { CityData } from '../models/city.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CityService {
  private cities: CityData[] = [];
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async generateCities(count = 5): Promise<CityData[]> {
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
      
      // Extract JSON from the response
      const jsonMatch = resultText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Could not parse JSON from AI response');
      }
      
      const jsonString = jsonMatch[0];
      const generatedCities = JSON.parse(jsonString) as CityData[];
      
      // Add the generated cities to our cache
      this.cities = [...this.cities, ...generatedCities];
      return this.cities.slice(0, count);
    } catch (error) {
      console.error('Error generating cities:', error);
      throw error;
    }
  }

  async getAllCities(): Promise<CityData[]> {
    if (this.cities.length === 0) {
      return this.generateCities(100);
    }
    return this.cities;
  }

  async getCityByName(cityName: string): Promise<CityData | undefined> {
    await this.ensureCitiesLoaded();
    return this.cities.find(city => 
      city.city.toLowerCase() === cityName.toLowerCase());
  }

  private async ensureCitiesLoaded(): Promise<void> {
    if (this.cities.length === 0) {
      await this.generateCities(100);
    }
  }
}
