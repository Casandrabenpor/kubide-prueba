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
  //Coge el get de los datos de la api
  ngOnInit(): void {
    this.isLoading = true;
    this.CharacterApiService.getCharacters().subscribe(apiResponse => {
      this.characters = apiResponse.results;
      this.charactersToShow = apiResponse.results;
      this.nextPageUrl = apiResponse.info.next;
      this.isLoading = false;
    });
  }

  // SEARCH
  searchCharacter(event: any) {
    if (!event.target.value) {
      this.charactersToShow = this.characters;
      this.searchText = "";
    }
    this.searchText = event.target.value.toUpperCase();
    this.charactersToShow = this.characters.filter((character) =>
      character.name.toUpperCase().includes(event.target.value.toUpperCase())
    );
  }
  //Mostrar mas
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

