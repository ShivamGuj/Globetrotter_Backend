import { CityData } from './city.interface';
import { ConfigService } from '@nestjs/config';
export declare class CityService {
    private configService;
    private cities;
    private genAI;
    private model;
    constructor(configService: ConfigService);
    generateCities(count?: number): Promise<CityData[]>;
    getAllCities(): Promise<CityData[]>;
    getCityByName(cityName: string): Promise<CityData | undefined>;
    private ensureCitiesLoaded;
}
