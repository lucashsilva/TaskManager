import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TaskComponent } from './tasks/task/task.component';
import { TasksPageComponent } from './tasks/tasks-page/tasks-page.component';
import { TaskListsPageComponent } from './task-lists/task-lists-page/task-lists-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

import { AuthGuard } from './providers/auth-guard';

const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard],  children: [
      { path: '', pathMatch: 'full', redirectTo: 'tasks'},
      { path: 'tasks', component: TasksPageComponent },
      { path: 'tasks/:id', component: TaskComponent },
      { path: 'lists', component: TaskListsPageComponent },
      { path: 'contact', component: ContactPageComponent }
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
