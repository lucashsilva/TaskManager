import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Task } from '../tasks/task/task.component';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private apiUrl = "http://localhost:8080/api";
    private authenticatedUser: AuthenticatedUser;


   constructor(private http: Http, private router: Router) {
      this.authenticatedUser = <AuthenticatedUser> JSON.parse(localStorage.getItem('currentUser'));
   }

   login(userCredentials: UserCredentials):Observable<Boolean> {
     return this.http.post(this.apiUrl + "/login", JSON.stringify(userCredentials))
                      .map((response: Response) => {

       if(response.status >= 200) {
         let data = response.json()
         this.authenticatedUser = <AuthenticatedUser> data;
         localStorage.setItem('currentUser', JSON.stringify({email: this.authenticatedUser.email,
                                                            token: this.authenticatedUser.token}));
        return true;
      } else {
        return false;
      }

    });
   }

   isLoggedIn():boolean {
     return (localStorage.getItem('currentUser') != null) && (this.authenticatedUser != null);
   }

   logout() {
     localStorage.removeItem('currentUser');
     this.authenticatedUser = null;
   }

   getToken(): string {
     return this.authenticatedUser.token;
   }
}


export class UserCredentials {
  email: string;
  password: string;

  constructor() {}

}

export class AuthenticatedUser {
  email: string;
  token: string;

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}
