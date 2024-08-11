import { Component, OnInit } from '@angular/core';
import { Character } from '../../../models/character.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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
formGroup: FormGroup;

constructor(
  private route: ActivatedRoute,
  private CharacterApiService: CharacterApiService,
  formBuilder: FormBuilder,
  private location: Location
) {
  this.formGroup = formBuilder.group({
    name: [''],
    status: [''],
    species: [''],
    type: [''],
    gender:['']
   
  });
}
//Botón función atras
goBack() {
  this.location.back();
}
ngOnInit() {
  // Get a id de la ruta
  const routeParams = this.route.snapshot.paramMap;
  const characterIdFromRoute = routeParams.get('characterId');
  console.log(`characterIdFromRoute: ${characterIdFromRoute}`);

  const characterId = characterIdFromRoute ? parseInt(characterIdFromRoute, 10) : null;

  if (characterId !== null) {
    // Encontrar el id correspondiente para la ruta
    this.CharacterApiService.getCharacter(characterId).subscribe((character) => {
      this.character = character;
      this.formGroup.setValue({
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender

    });
  });
  }
}
}
