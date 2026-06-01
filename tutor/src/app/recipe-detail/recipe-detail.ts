import { Component, input, signal, computed } from '@angular/core';
import { RecipeModel } from '../models';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [JsonPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  recipe = input.required<RecipeModel>();
  protected readonly servings = signal(0);
  protected readonly adjustedIngredients = computed(() => this.recipe().ingredients.map(ingredient =>  ({ name: ingredient.name, quantity: ingredient.quantity * this.servings() })));


  protected addServings() {
    this.servings.update(val => val + 1);
  }

  protected substractServings() {
    this.servings.update(val => val - 1);
  }
}
