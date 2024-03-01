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

  studentForm = new FormGroup({
    first_name: new FormControl(""),
    task: new FormControl("")
  })

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  title = 'Classroom Task Manager';
  teacherName = "N/A"
  welcomeMessage = ""

  
  enteredFirst = "";
  enteredTask = "";
  nameExists = true;
  taskExists = true;
  isEventsCritical = false;
  beginApplication = false;
  georgeEHarrisLogin = 528528;

  logout(){
    this.loginForm.reset();
    this.beginApplication = false;
  }

  validateLogin(){
    if (this.loginForm.value.password == "123"){
      this.teacherName = this.loginForm.value.username!;
      this.welcomeMessage = `Welcome back ${this.teacherName}!`;
      this.beginApplication = true;
    } else {
      alert("Validation failed. Password is 123.")
    }
  }

  addStudent(){

      this.enteredFirst = this.studentForm.value.first_name!;
      this.enteredTask = this.studentForm.value.task!;
      
      if (this.enteredFirst == "" || this.enteredFirst == null){
        this.nameExists = false;
      } else {
        this.nameExists = true;
      }
      
      if (this.enteredTask == "" || this.enteredTask == null){
        this.taskExists = false;
      } else {
        this.taskExists = true;
      }

      if (this.nameExists && this.taskExists) {
        let array_of_tasks: Task[] = []
        array_of_tasks.push(new Task(this.enteredTask, "None", 0, 0))
        this.studentRoster.insertStudents(this.enteredFirst, array_of_tasks, 0)
        this.studentForm.reset();
        this.nameExists = true;
      }
      
   
      
  }
  
}
