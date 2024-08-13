import { Component, OnInit } from '@angular/core';
import { Character as Character } from '../../models/character.model';
import { CharacterApiService } from '../../character-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  characters: Character[] = [];
  charactersToShow: Character[] = []; 
  searchText: string = "";
  nextPageUrl: string = "";
  isLoading: boolean = false;


  constructor(private CharacterApiService: CharacterApiService) {}
  //Obtiene los datos de la api del servicio
  ngOnInit(): void {
    this.isLoading = true;
    this.CharacterApiService.getCharacters().subscribe(apiResponse => {
      this.characters = apiResponse.results;
      this.charactersToShow = apiResponse.results;
      this.nextPageUrl = apiResponse.info.next;
      this.isLoading = false;
    });
  }

  searchCharacter(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.charactersToShow = this.characters;
      this.searchText = "";
    }
    this.searchText = input.value.toUpperCase();
    this.charactersToShow = this.characters.filter((character) =>
      character.name.toUpperCase().includes(input.value.toUpperCase())
    );
  }

  showMore():void{
    this.isLoading = true;
    //llamada al servicio
    // obtienes la respuesta y actualizas los 3 valores(characters, charactersToShow y Nextpageurl)
    this.CharacterApiService.getNextCharacters(this.nextPageUrl)
    .subscribe(apiResponse => {
      this.characters = this.characters.concat(apiResponse.results);
      this.charactersToShow = this.characters.filter((character) =>
        character.name.toUpperCase().includes(this.searchText)
      );
      this.nextPageUrl = apiResponse.info.next;
      this.isLoading = false;
    });
  }
}

