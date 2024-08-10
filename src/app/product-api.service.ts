import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from './models/product.model';
import { ApiResponse } from './models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private readonly API_CHARACTER_ENDPOINT = 'https://rickandmortyapi.com/api/character';

  constructor(private httpClient: HttpClient) {}


getCharacter(id: number | null): Observable<Character> {
  let endpoint = `${this.API_CHARACTER_ENDPOINT}/${id}`;

  return this.httpClient.get<Character>(endpoint);
}

getCharacters(): Observable<ApiResponse> {
  return this.httpClient.get<ApiResponse>(this.API_CHARACTER_ENDPOINT);
}
}