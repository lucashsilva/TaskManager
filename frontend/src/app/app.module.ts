import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { Title }     from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksService } from './services/tasks.service';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component'
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { MomentModule } from 'angular2-moment';
import { TaskDateSortPipe } from './tasks/pipes/task-date-sort.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    NavbarComponent,
    TaskFormComponent,
    TaskDateSortPipe,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2DatetimePickerModule,
    MomentModule
  ],
  providers: [
    Title,
    TasksService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
