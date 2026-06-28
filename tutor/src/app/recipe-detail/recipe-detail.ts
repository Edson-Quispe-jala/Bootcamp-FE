import { Component, input, signal, computed, inject } from '@angular/core';
import { RecipeModel } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../services/recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly routeId = this.route.snapshot.paramMap.get('id');
    protected readonly recipeService = inject(Recipe);

  private readonly recipeId = Number(this.routeId);

  protected readonly recipe = computed(() =>
    this.recipeService.recipes.find(r => r.id === this.recipeId)!
  );
  
  protected readonly servings = signal(0);
  protected readonly adjustedIngredients = computed(() => this.recipe().ingredients.map(ingredient =>  ({ name: ingredient.name, quantity: ingredient.quantity * this.servings() })));

  protected addServings() {
    this.servings.update(val => val + 1);
  }

  protected substractServings() {
    this.servings.update(val => val - 1);
  }
}
