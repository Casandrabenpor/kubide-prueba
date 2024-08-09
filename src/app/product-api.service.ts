import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly API_POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Método para obtener una lista de Pokémon
  getPokemons(limit: number = 10): Observable<Pokemon[]> {
    return this.http.get<{ results: Pokemon[] }>(`${this.API_POKEMON_ENDPOINT}?limit=${limit}`)
      .pipe(
        map(response => response.results)
      );
  }

  // Método para obtener un Pokémon específico por su nombre
  getPokemon(name: string): Observable<Pokemon> {
    const endpoint = `${this.API_POKEMON_ENDPOINT}/${name}`;
    return this.http.get<Pokemon>(endpoint);
  }
}