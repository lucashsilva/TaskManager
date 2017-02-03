import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showCategories: boolean;

  constructor(private userService: UserService, private sidebarService: SidebarService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/tasks?category=' + category]);
  }
}
