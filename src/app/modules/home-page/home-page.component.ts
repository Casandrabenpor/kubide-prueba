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

  constructor(private CharacterApiService: CharacterApiService) {}
  //Coge el get de los datos de la api
  ngOnInit(): void {
    this.CharacterApiService.getCharacters().subscribe(apiResponse => {
      this.characters = apiResponse.results;
      this.charactersToShow = apiResponse.results;
    });
  }

  // SEARCH
  searchCharacter(event: any) {
    if (!event.target.value) {
      this.charactersToShow = this.characters;
    }
    this.charactersToShow = this.characters.filter((character) =>
      character.name.toUpperCase().includes(event.target.value.toUpperCase())
    );
  }
}


