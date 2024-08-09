import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/product.model';
import { ProductApiService } from '../../product-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  products: Pokemon[] = [];
  productsToShow: Pokemon[] = []; 

  constructor(private productApiService: ProductApiService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.productApiService.getPokemons().subscribe(pokemons => {
      this.products = pokemons;
      this.productsToShow = pokemons;
    });
  }

  searchProduct(event: any): void {
    const searchValue = event.target.value.toUpperCase();
    console.log('Valor de búsqueda:', searchValue);
    if (!searchValue) {
      this.productsToShow = this.products;
    } else {
      this.productsToShow = this.products.filter((product) =>
        product.name.toUpperCase().includes(searchValue)
      );
    }
  }
}
