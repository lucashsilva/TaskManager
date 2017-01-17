import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output('toggleSidebar') sidebar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar(): void {
    this.sidebar.emit();
  }

}
