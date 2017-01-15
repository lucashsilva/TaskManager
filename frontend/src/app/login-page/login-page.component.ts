import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { UserService, UserCredentials } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userCredentials = new UserCredentials();

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()) {
      this.redirect();
    }
  }

  login() {
    this.userService.login(this.userCredentials).subscribe(result => {
      if (result) {
        this.redirect();
      }
    });

  }

  redirect() {
    let redirectUrl = this.getRedirectUrl();

    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
    } else {
      this.router.navigate(['dashboard']);
    }

  }

  getRedirectUrl() {
    let redirectUrl;

    this.route.queryParams.subscribe(
      data => {
        redirectUrl = data['redirectTo'];
      });

      return redirectUrl;
  }
}
