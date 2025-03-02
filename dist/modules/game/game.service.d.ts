export declare class GameService {
    getRandomDestination(): Promise<{
        city: string;
        country: string;
        clues: string[];
        trivia: string;
    }>;
}
