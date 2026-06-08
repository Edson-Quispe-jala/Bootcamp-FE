import { Component, signal, computed } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box.');
  protected readonly recipe = signal(MOCK_RECIPES[0]);
  
  protected readonly searchTerm = signal('');
  protected readonly filterRecipes = computed(() => MOCK_RECIPES.filter(recipe => recipe.name.toLowerCase().includes(this.searchTerm().toLowerCase())));

  protected buttonClicked(selectedRecipe: RecipeModel) {
    console.log(selectedRecipe);
    console.log('Button 1 was clicked!');
    this.recipe.set(selectedRecipe);
  }
}
