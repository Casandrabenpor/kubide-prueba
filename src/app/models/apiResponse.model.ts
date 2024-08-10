import { Character } from "./character.model";

export interface ApiResponse {
    results: Character[]
    next: string,
    prev: string
  }
  