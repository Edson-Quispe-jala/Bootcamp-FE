import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My Recipe Box.');

  protected button1Clicked() {
    console.log('Button 1 was clicked!');
  }

  protected button2Clicked() {
    console.log('Button 2 was clicked!');
  }
}
