import { Controller, Get, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CityData } from './city.interface';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCities(@Query('count') count?: number): Promise<CityData[]> {
    if (count) {
      return this.cityService.generateCities(count);
    }
    return this.cityService.getAllCities();
  }

  @Get(':name')
  async getCityByName(@Param('name') name: string): Promise<CityData> {
    const city = await this.cityService.getCityByName(name);
    return city;
  }

  @Get('generate/:count')
  async generateCities(@Param('count') count: number): Promise<CityData[]> {
    return this.cityService.generateCities(count);
  }
}
