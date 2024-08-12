import { Component, OnInit } from '@angular/core';
import { Character } from '../../../models/character.model';
import { ActivatedRoute } from '@angular/router';
import { CharacterApiService } from '../../../character-api.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit {
character: Character | undefined;

constructor(
  private route: ActivatedRoute,
  private CharacterApiService: CharacterApiService,
  private location: Location
) {
}
//Botón función atras
goBack() {
  this.location.back();
}
ngOnInit() {
  // Get a id de la ruta
  const routeParams = this.route.snapshot.paramMap;
  const characterIdFromRoute = routeParams.get('characterId');
  const characterId = characterIdFromRoute ? parseInt(characterIdFromRoute, 10) : null;

  if (characterId !== null) {
    // Encontrar el id correspondiente para la ruta
    this.CharacterApiService.getCharacter(characterId).subscribe((character) => {
      this.character = character;
      });
    };
  }
}

