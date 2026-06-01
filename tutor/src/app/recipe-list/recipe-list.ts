import { Component, computed, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports: [JsonPipe],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box.');
  protected readonly recipe = signal(MOCK_RECIPES[0]);
  protected readonly servings = signal(0);
  protected readonly adjustedIngredients = computed(() => this.recipe().ingredients.map(ingredient =>  ({ name: ingredient.name, quantity: ingredient.quantity * this.servings() })));

  protected button1Clicked() {
    console.log('Button 1 was clicked!');
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected button2Clicked() {
    console.log('Button 2 was clicked!');
    this.recipe.set(MOCK_RECIPES[1]);
  }

  protected addServings() {
    this.servings.update(val => val + 1);
  }

  protected substractServings() {
    this.servings.update(val => val - 1);
  }
}
