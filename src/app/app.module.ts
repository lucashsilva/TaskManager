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
import { NavbarComponent } from './navbar/navbar.component'
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Title,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
