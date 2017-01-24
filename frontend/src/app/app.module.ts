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
import { SidebarService } from './services/sidebar.service';
import { TasksCardComponent } from './tasks/tasks-card/tasks-card.component';
import { TaskComponent } from './tasks/task/task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TaskFormCardComponent } from './tasks/task-form-card/task-form-card.component'
import { MomentModule } from 'angular2-moment';
import { TaskDateSortPipe } from './tasks/pipes/task-date-sort.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksChartComponent } from './dashboard/tasks-chart/tasks-chart.component';
import { AuthGuard } from './providers/auth-guard';
import { RequestOptions, Http, XHRBackend} from '@angular/http';
import { TasksPageComponent } from './tasks/tasks-page/tasks-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TasksCardComponent,
    TaskComponent,
    NavbarComponent,
    TaskFormCardComponent,
    TaskDateSortPipe,
    SidebarComponent,
    DashboardComponent,
    TasksChartComponent,
    LoginPageComponent,
    TasksPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule,
    ChartsModule
  ],
  providers: [
    Title,
    UserService,
    TaskService,
    SidebarService,
    AuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
