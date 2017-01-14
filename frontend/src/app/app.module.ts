import { ChartsModule } from 'ng2-charts/ng2-charts';
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
import { NavbarComponent } from './navbar/navbar.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component'
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { MomentModule } from 'angular2-moment';
import { TaskDateSortPipe } from './tasks/pipes/task-date-sort.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksChartComponent } from './dashboard/tasks-chart/tasks-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    NavbarComponent,
    TaskFormComponent,
    TaskDateSortPipe,
    SidebarComponent,
    DashboardComponent,
    TasksChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2DatetimePickerModule,
    MomentModule,
    ChartsModule
  ],
  providers: [
    Title,
    TasksService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
