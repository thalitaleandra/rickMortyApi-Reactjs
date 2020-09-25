export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

export interface CharacterHero {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
  };
  image: string;
  gender: string;
  episode: string;
}
