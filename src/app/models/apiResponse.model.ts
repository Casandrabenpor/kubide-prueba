import { Character } from "./product.model";

export interface ApiResponse {
    results: Character[]
    next: string,
    prev: string
  }
  