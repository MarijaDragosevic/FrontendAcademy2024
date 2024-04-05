export interface Pokemon {
    id: number;
    name: string;
    url: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      front_shiny: string;
      back_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    stats: { base_stat: number }[];
    types: { type: { name: string } }[];
    flavorText: string;
    species: { url: string };
  }
  