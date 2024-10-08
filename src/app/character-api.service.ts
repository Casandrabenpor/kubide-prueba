import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from './models/character.model';
import { ApiResponse } from './models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {
  private readonly API_CHARACTER_ENDPOINT = 'https://rickandmortyapi.com/api/character';
  constructor(private httpClient: HttpClient) {}


getCharacter(id: number): Observable<Character> {
  let endpoint = `${this.API_CHARACTER_ENDPOINT}/${id}`;

  return this.httpClient.get<Character>(endpoint);
}

getCharacters(): Observable<ApiResponse> {
  return this.httpClient.get<ApiResponse>(this.API_CHARACTER_ENDPOINT);
  }
getNextCharacters(url:string): Observable<ApiResponse>{
  return this.httpClient.get<ApiResponse>(url);
  }

}
