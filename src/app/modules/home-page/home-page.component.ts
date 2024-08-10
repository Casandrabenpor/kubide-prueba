import { Component, OnInit } from '@angular/core';
import { Character as Character } from '../../models/character.model';
import { ProductApiService } from '../../product-api.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  characters: Character[] = [];
  charactersToShow: Character[] = []; 

  constructor(private productApiService: ProductApiService) {}
  //Coge el get de los datos de la api
  ngOnInit(): void {
    this.productApiService.getCharacters().subscribe(apiResponse => {
      this.characters = apiResponse.results;
      this.charactersToShow = apiResponse.results;
    });
  }

  // SEARCH
  searchProduct(event: any) {
    if (!event.target.value) {
      this.charactersToShow = this.characters;
    }
    this.charactersToShow = this.characters.filter((product) =>
      product.name.toUpperCase().includes(event.target.value.toUpperCase())
    );
  }
}

//  products: any[] = [];
//   productsToShow: any[] = [];

//   ngOnInit(): void {

//     this.products = [
//       { name: 'Pikachu' },
//       { name: 'Bulbasaur' },
//       { name: 'Charmander' }
//     ];
//     this.productsToShow = this.products;
//   }

