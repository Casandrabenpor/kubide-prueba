import { CharacterLocation } from "./characterLocation.model";

export interface Character {
  id: number;
  name: string;
  image: string;
  url: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location:CharacterLocation;
}
