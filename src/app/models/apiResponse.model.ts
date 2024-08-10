import { Character } from "./character.model";
import { Info } from "./info.model";

export interface ApiResponse {
    results: Character[]
    info: Info
  }
  