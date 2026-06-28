import { Component, signal, computed, inject } from '@angular/core';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';
import { RecipeModel } from '../models';
import { Recipe } from '../services/recipe';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box.');
  protected readonly recipeService = inject(Recipe);
  protected readonly recipe = signal(this.recipeService.recipes[0]);
  
  protected readonly searchTerm = signal('');
  protected readonly filterRecipes = computed(() => this.recipeService.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.searchTerm().toLowerCase())));

  protected buttonClicked(selectedRecipe: RecipeModel) {
    console.log(selectedRecipe);
    console.log('Button 1 was clicked!');
    this.recipe.set(selectedRecipe);
  }
}
