import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signals');
  protected readonly showSideBar = signal(true);
  
  protected openSideBar() {
    this.showSideBar.set(!this.showSideBar);
    console.log(this.showSideBar());
  }
}
