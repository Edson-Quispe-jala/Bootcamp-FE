import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
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
