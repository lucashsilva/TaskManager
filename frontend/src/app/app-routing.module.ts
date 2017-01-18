import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TaskComponent } from './tasks/task/task.component';
import { AuthGuard } from './providers/auth-guard';

const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard],  children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: DashboardComponent },
      // { path: 'tasks/new', component: TaskFormComponent },
      { path: 'tasks/:id', component: TaskComponent },
      // { path: 'tasks/:id/edit', component: TaskFormComponent }
    ] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
