import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  buttonClicked = output();

  increase = () => {
    this.buttonClicked.emit()
  }
}