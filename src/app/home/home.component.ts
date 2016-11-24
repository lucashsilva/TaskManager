import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showAddTask = false;

  constructor() { }

  ngOnInit() {
  }

  toggleTaskForm(): void {
    this.showAddTask = !this.showAddTask;
  }
}
