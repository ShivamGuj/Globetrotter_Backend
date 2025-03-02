import { Controller, Get, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('generate/:count')
  async generateCities(@Param('count', ParseIntPipe) count: number) {
    try {
      if (count <= 0 || count > 50) {
        throw new HttpException('Count must be between 1 and 50', HttpStatus.BAD_REQUEST);
      }
      return this.citiesService.generateCities(count);
    } catch (error) {
      // If it's already an HttpException, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }
      // Otherwise, log the error and throw a 500
      console.error('Error generating cities:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getCityById(@Param('id') id: string) {
    try {
      const city = await this.citiesService.getCityById(id);
      if (!city) {
        throw new HttpException('City not found', HttpStatus.NOT_FOUND);
      }
      return city;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error fetching city by id:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
