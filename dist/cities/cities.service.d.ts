export interface CityData {
    id: string;
    city: string;
    country: string;
    clues: string[];
    fun_fact: string[];
    secondChanceClue?: string;
}
export declare class CitiesService {
    private readonly cities;
    generateCities(count: number): Promise<CityData[]>;
    getCityById(id: string): Promise<CityData | undefined>;
}
