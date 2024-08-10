import { Component, OnInit } from '@angular/core';
import { Character } from '../../../models/character.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../../../product-api.service';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit {
characters: Character | undefined;
formGroup: FormGroup;

constructor(
  private route: ActivatedRoute,
  private productApiService: ProductApiService,
  formBuilder: FormBuilder
) {
  this.formGroup = formBuilder.group({
    name: [''],
  });
}

ngOnInit() {
  // First get the product id from the current route.
  const routeParams = this.route.snapshot.paramMap;
  const characterIdFromRoute = routeParams.get('characterId');

  const characterId = characterIdFromRoute ? parseInt(characterIdFromRoute, 10) : null;

  if (characterId !== null) {
    // Find the product that corresponds with the id provided in route.
    this.productApiService.getCharacter(characterId).subscribe((characters) => {
      this.characters = characters;
      this.formGroup.setValue({
        name: characters.name,
    });
  });
  }
}
}
