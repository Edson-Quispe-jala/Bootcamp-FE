import { Component, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from '../recipe-detail/recipe-detail';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box.');
  protected readonly recipe = signal(MOCK_RECIPES[0]);
  protected button1Clicked() {
    console.log('Button 1 was clicked!');
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected button2Clicked() {
    console.log('Button 2 was clicked!');
    this.recipe.set(MOCK_RECIPES[1]);
  }
}
