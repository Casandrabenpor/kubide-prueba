import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { CharacterDetailsComponent } from './shared/components/character-details/character-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
   { 
    path: 'characters/:characterId', 
    component: CharacterDetailsComponent
   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
