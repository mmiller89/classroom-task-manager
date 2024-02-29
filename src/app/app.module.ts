import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentRosterComponent } from './student-roster/student-roster.component';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './student-roster/student/task/task.component';
import { StudentComponent } from './student-roster/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentRosterComponent,
    TaskComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
