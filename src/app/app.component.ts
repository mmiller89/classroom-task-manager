import { Component, Directive, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentRosterComponent } from './student-roster/student-roster.component';
import { Task } from './student-roster/student/task/task.component';
import { add, addDays, addWeeks, addMonths, addYears, formatDistance, subDays, format, getDate, getDay, isSaturday, isSunday } from 'date-fns'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {


  @ViewChild(StudentRosterComponent) studentRoster: StudentRosterComponent



  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  title = 'Classroom Manager';
  teacherName = "N/A"

  
  enteredFirst = "";
  enteredTask = "";
  welcomeMessage: any;
  isEventsCritical = false;
  beginApplication = true;
  georgeEHarrisLogin = 528528;
  addStudentOn = false;
  criticalActivitiesOn = false;
  aboutMeOn = false;

  toggleCards(input: number){
    if (input == 1){
      this.addStudentOn = this.addStudentOn == true ? false : true;
    }
    else if (input == 2){
      if (this.criticalActivitiesOn == false){
        this.studentRoster.verifyCriticalUpdates();
      }
      this.criticalActivitiesOn = this.criticalActivitiesOn == true ? false : true;
    }
    else if (input == 3){
      this.aboutMeOn = this.aboutMeOn == true ? false : true;
    }
   
  }

  logout(){
    this.loginForm.reset();
    this.beginApplication = false;
  }

  validateLogin(){
    let user = this.loginForm.value.username
    if (user == null || user == undefined || user == ""){
      alert("Login failed. Please provide a username.")
    }
    else if (this.loginForm.value.password == "123"){
      this.teacherName = this.loginForm.value.username!;
      this.welcomeMessage = this.loginForm.value.username;
      this.beginApplication = true;
    } 
    else {
      alert("Login failed. Password is 123.")
    }
  }
  
}
