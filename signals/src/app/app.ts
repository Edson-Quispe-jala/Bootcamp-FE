import { Component, signal } from '@angular/core';
import { DatePipe, DATE_PIPE_DEFAULT_OPTIONS  } from "@angular/common";
import { CustomPipe } from './pipe/my-pipe';

@Component({
  selector: 'app-root',
  imports: [DatePipe, CustomPipe],
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
  protected readonly email = signal('');
  protected readonly currentDate = signal(new Date());
  protected readonly otherDate = signal(new Date(2026, 11, 25));
  
  updateEmail(email: string) {
    this.email.set(email);
  }

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
