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
  protected readonly hideSideBar = signal(false);
  
  openSideBar() {
    console.log(this.hideSideBar());
    this.hideSideBar.update(value => !value);
  }
}
