import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';

@Injectable({
  providedIn: 'root',
})

export class Recipe {
  readonly recipes = MOCK_RECIPES;
}
