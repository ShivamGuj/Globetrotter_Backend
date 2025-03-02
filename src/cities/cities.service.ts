import { Injectable } from '@nestjs/common';

// City data interface
export interface CityData {
  id: string;
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  secondChanceClue?: string;
}

@Injectable()
export class CitiesService {
  private readonly cities: CityData[] = [
    {
      id: '1',
      city: 'Paris',
      country: 'France',
      clues: [
        'This city is known as the City of Light',
        'It has a famous iron tower that was built for a World\'s Fair',
        'It\'s divided by a river with many beautiful bridges',
      ],
      fun_fact: [
        'This city has over 470 parks and gardens',
        'There is only one stop sign in the entire city',
        'The Eiffel Tower was originally meant to be a temporary structure',
      ],
      secondChanceClue: 'This city is the capital of a country known for wine, cheese, and baguettes',
    },
    {
      id: '2',
      city: 'Tokyo',
      country: 'Japan',
      clues: [
        'This city has the world\'s busiest pedestrian crossing',
        'It\'s the most populous metropolitan area in the world',
        'It hosts the largest fish market in the world',
      ],
      fun_fact: [
        'This city has over 300 earthquake-resistant skyscrapers',
        'You can find over 12,000 vending machines throughout the city',
        'The subway system handles over 8 million passengers daily',
      ],
      secondChanceClue: 'This city\'s name translates to "Eastern Capital"',
    },
    {
      id: '3',
      city: 'New York City',
      country: 'USA',
      clues: [
        'This city has a famous statue that was a gift from France',
        'It\'s known as the Big Apple',
        'It has a famous park in the middle of the city',
      ],
      fun_fact: [
        'More than 800 languages are spoken in this city',
        'The subway system has over 472 stations',
        'The first pizzeria in the United States opened here in 1905',
      ],
      secondChanceClue: 'This city has five distinct boroughs',
    },
    {
      id: '4',
      city: 'London',
      country: 'UK',
      clues: [
        'This city has a famous clock tower often mistakenly called by the name of its bell',
        'It has a royal residence that\'s still in use today',
        'It hosted the Olympic Games three times',
      ],
      fun_fact: [
        'This city has six major airports',
        'The Underground system is the oldest in the world',
        'Black cabs must be able to turn around in a 25-foot radius',
      ],
      secondChanceClue: 'This city sits on the River Thames',
    },
    {
      id: '5',
      city: 'Rome',
      country: 'Italy',
      clues: [
        'This city was founded by twins raised by a wolf according to legend',
        'It has a famous ancient amphitheater',
        'It contains an independent city-state within its borders',
      ],
      fun_fact: [
        'This city has more than 2,000 fountains',
        'It\'s traditional to throw coins with your right hand over your left shoulder into the Trevi Fountain',
        'The city contains the highest concentration of ancient columns in the world',
      ],
      secondChanceClue: 'This city is known as the "Eternal City"',
    },
  ];

  async generateCities(count: number): Promise<CityData[]> {
    // For this demo, we'll return our predefined cities
    // In a real application, you might fetch from a database or external API
    
    // If we need more cities than we have, we'll duplicate them
    const result: CityData[] = [];
    for (let i = 0; i < count; i++) {
      const city = {...this.cities[i % this.cities.length]};
      // Ensure unique IDs for duplicated cities
      if (i >= this.cities.length) {
        city.id = `${city.id}-${Math.floor(i / this.cities.length)}`;
      }
      result.push(city);
    }
    
    return result;
  }

  async getCityById(id: string): Promise<CityData | undefined> {
    return this.cities.find(city => city.id === id);
  }
}
