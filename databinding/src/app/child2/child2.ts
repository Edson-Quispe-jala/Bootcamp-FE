import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child2',
  imports: [],
  templateUrl: './child2.html',
  styleUrl: './child2.css',
})
export class Child2 {
  theme = output();
  
  changeTheme() {
    this.theme.emit()
  }
}
