import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Task } from '../tasks/task/task.component';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
        throw new Error("Credenciais inválidas.");
      }

    });
   }

   getUser(): Promise<User> {
     return this.http.get(this.apiUrl + '/users/info', this.getOptions()).map(res => {
       if(res.status >= 200 && res.status <= 400) {
         return <User> res.json();
       } else {
         throw new Error("Erro ao obter dados do usuário.");
       }
     }).toPromise();
   }

   isLoggedIn():boolean {
     return (localStorage.getItem('currentUser') != null) && (this.authenticatedUser != null);
   }

   logout() {
     localStorage.removeItem('currentUser');
     this.authenticatedUser = null;
     this.router.navigate(['/login']);
   }

   getToken(): string {
     return this.authenticatedUser.token;
   }

   getOptions() {
     let options = new RequestOptions();
     let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': this.authenticatedUser.token });
     options.headers = headers;

     return options;
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

export class User {
  firstName: string;
  lastName: string;
  email: string;

  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
  }
}