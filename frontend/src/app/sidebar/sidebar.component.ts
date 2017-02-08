import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router'
import { User } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showCategories: boolean;
  showPriorities: boolean;
  @Input() user: User;
  priorities = ["HIGH", "NORMAL", "LOW"];

  constructor(private userService: UserService, private sidebarService: SidebarService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

   togglePriorities() {
    this.showPriorities = !this.showPriorities;
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/tasks?category=' + category]);
  }

  getPriorityLabel(priority) {
    if(priority == "HIGH") {
      return "Alta";
    } else if (priority == "NORMAL") {
      return "Normal";
    } else if (priority == "LOW") {
      return "Baixa";
    }
  }
}
