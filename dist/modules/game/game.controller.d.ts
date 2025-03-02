import { GameService } from "./game.service";
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    getRandomQuestion(): Promise<{
        city: string;
        country: string;
        clues: string[];
        trivia: string;
    }>;
}
