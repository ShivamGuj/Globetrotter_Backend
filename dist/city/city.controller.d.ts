import { CityService } from './city.service';
import { CityData } from './city.interface';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    getAllCities(count?: number): Promise<CityData[]>;
    getCityByName(name: string): Promise<CityData>;
    generateCities(count: number): Promise<CityData[]>;
}
