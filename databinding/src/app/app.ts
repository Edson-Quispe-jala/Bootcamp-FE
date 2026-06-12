import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child } from "./child/child";
import { Child2 } from './child2/child2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Child, Child2],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected count = 0;
  protected darkTheme = signal(false);

  incrementCount() {
    this.count++;
  }

  toggleTheme(){
    this.darkTheme.update(value => !value);
  }
}