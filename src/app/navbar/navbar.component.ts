import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() addTask = new EventEmitter();

  constructor() { }

  addButton = true;

  ngOnInit() {
  }

  toggleAddTask(): void {
    this.addButton = !this.addButton;
    this.addTask.emit();
  }

}
