import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentRosterComponent } from './student-roster/student-roster.component';
import { Task } from './student-roster/student/task/task.component';
import { add, addDays, addWeeks, addMonths, addYears, formatDistance, subDays, format, getDate, getDay, isSaturday, isSunday } from 'date-fns'
import { Student } from './student-roster/student/student.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent{


  @ViewChild(StudentRosterComponent) studentRoster: StudentRosterComponent

 





  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  createAccForm = new FormGroup({
    createUser: new FormControl(""),
    
  })

  title = 'Classroom Manager';
  teacherName = "N/A"

  createAccount = false;
  enteredFirst = "";
  enteredTask = "";
  welcomeMessage: any;
  isEventsCritical = false;
  beginApplication = false;
  georgeEHarrisLogin = 528528;
  addStudentOn = false;
  criticalActivitiesOn = false;
  aboutMeOn = false;

  
  taskOne = new Task("Test on sight words.", "None", 0, 0)
  taskTwo = new Task("Behavior Check-In", "None", 0, 0)
  taskThree = new Task("RTI Assessment", "None", 0, 0)
  taskFour = new Task("Reassess Math Test", "None", 0, 0)
  taskFive = new Task("ClassDojo Mom", "None", 0, 0)
  taskSix = new Task("Math fluency practice", "None", 0, 0)
  Michael = new Student("Michael M", [this.taskOne, this.taskTwo], "1", 0)
  Andrea = new Student("Andrea A", [this.taskThree, this.taskFour], "2", 0)
  Ash = new Student("Ash K", [this.taskFive, this.taskSix], "3", 0)
  nameExists = true;
  taskExists = true;
  displayStudentIcons = true;
  displayTaskIcons = true;
  displayTasksAll = true;
  studentList: Student[] = []
  

  //All of this needs to be loaded from the database on login.
 
 
  //All of this needs to be loaded from the database on login.


  createNewAccount(){
    alert("Created! Welcome " + this.createAccForm.value.createUser!)
    this.createAccount = false;
  }

  toggleCreateAccount(num: number){
    this.createAccount = num == 1 ? true : false;
  }

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
          this.welcomeMessage = "Welcome " + this.teacherName;
          if (this.studentList.length <= 0){
            this.studentList = [this.Andrea, this.Michael,this.Ash];
          }
          this.beginApplication = true;
        }
    else {
      alert("Login failed. Password is 123.")
    }
  }
  
}





