import { Component, signal } from '@angular/core';
import { DatePipe, DATE_PIPE_DEFAULT_OPTIONS  } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "medium" }
    }
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signals');
  protected readonly hideSideBar = signal(false);
  protected readonly data = signal([{name: 'test'}, {name: 'test2'}, {name: 'test3'}]);
  // currentDate = new Date();
  protected readonly currentDate = signal(new Date());
  
  updateDate() {
    this.currentDate.set(new Date());
  }

  openSideBar() {
    console.log(this.hideSideBar());
    this.hideSideBar.update(value => !value);
  }
  getData(){
    console.log("get data");
    return this.data();
  }
}
