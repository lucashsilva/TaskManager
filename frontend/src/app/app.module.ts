import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { Title }     from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { TasksCardComponent } from './tasks/tasks-card/tasks-card.component';
import { TaskComponent } from './tasks/task/task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component'
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { MomentModule } from 'angular2-moment';
import { TaskDateSortPipe } from './tasks/pipes/task-date-sort.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksChartComponent } from './dashboard/tasks-chart/tasks-chart.component';
import { AuthGuard } from './providers/auth-guard';
import { RequestOptions, Http, XHRBackend} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TasksCardComponent,
    TaskComponent,
    NavbarComponent,
    TaskFormComponent,
    TaskDateSortPipe,
    SidebarComponent,
    DashboardComponent,
    TasksChartComponent,
    LoginPageComponent
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
    UserService,
    TaskService,
    AuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
