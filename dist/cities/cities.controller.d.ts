import { CitiesService } from './cities.service';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    generateCities(count: number): Promise<import("./cities.service").CityData[]>;
    getCityById(id: string): Promise<import("./cities.service").CityData>;
}
