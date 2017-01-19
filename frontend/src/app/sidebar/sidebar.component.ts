import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() pendentTasksCounter: Number;

  constructor(private userService: UserService, private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
