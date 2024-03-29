import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentRosterComponent } from './student-roster/student-roster.component';
import { Task } from './student-roster/student/task/task.component';
import { Student } from './student-roster/student/student.component';
import { UserService } from './services/user.service';
import { User } from './user-data/user';
import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit{

  users: User[] = [];
  transformedList: Student[] = [];
  transformedTaskList: Task[] = [];
  constructor (private userService: UserService){}

  ngOnInit(): void {
    // this.listUsers();
    this.title = 'Classroom Manager';
    this.teacherName = "N/A"
    this.createAccount = false;
    this.enteredFirst = "";
    this.enteredTask = "";
    this.isEventsCritical = false;
    this.beginApplication = false;
    this.georgeEHarrisLogin = 528528;
    this.addStudentOn = false;
    this.criticalActivitiesOn = false;
    this.aboutMeOn = false;
    this.Types = {Student};

    this.todaysDate = format(new Date(), "MMMM/dd/yyyy");
    this.todaysDateDisplay = format(new Date(), 'EE dd MMMM');

    
    this.taskOne = new Task("Test on sight words.", "None", 0, 0, "N/A", "")
    this.taskTwo = new Task("Behavior Check-In", "None", 0, 0, "N/A", "")
    this.taskThree = new Task("RTI Assessment", "None", 0, 0, "N/A", "")
    this.taskFour = new Task("Reassess Math Test", "None", 0, 0, "N/A", "")
    this.taskFive = new Task("ClassDojo Mom", "None", 0, 0, "N/A", "")
    this.taskSix = new Task("Math fluency practice", "None", 0, 0, "N/A", "")
    this.Michael = new Student("Michael M", [this.taskOne, this.taskTwo], "1", 0, false)
    this.Andrea = new Student("Andrea A", [this.taskThree, this.taskFour], "2", 0, false)
    this.Ash = new Student("Ash K", [this.taskFive, this.taskSix], "3", 0, false)
    this.nameExists = true;
    this.taskExists = true;
    this.displayStudentIcons = true;
    this.displayTaskIcons = true;
    this.displayTasksAll = true;
    this.studentList = [];
    
    this.activeUser = User;
    this.dummyUser = new User(99999, "Foo", "[]");
  }

  listUsers(){
    // this.userService.getUserList().subscribe(data => {
    //   this.users = data;
    //   console.log(data)
    // })
  }

  saveUser(value: string){
    // if (value == "save"){
    //   alert("Roster saved!")
    // }
    // for (let i = 0; i < this.users.length; i++){
    //   if (this.users[i].username == this.activeUser.username){
    //     this.users[i].student_list = JSON.stringify(this.studentList);
    //     console.log(this.users[i].student_list);
    //     this.userService.putUser(this.users[i]).subscribe();
    //   }
    // }

    
  }

  addUser(){
    // let newUser = new User(0, this.createAccForm.value.createUser!, "[]");
    // this.userService.addUser(newUser)
    // .subscribe(user => this.users.push(user));
  }


  @ViewChild(StudentRosterComponent) studentRoster: StudentRosterComponent

 





  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  })

  createAccForm = new FormGroup({
    createUser: new FormControl(""),
    
  })

  title: string;
  teacherName: string;

  createAccount: any;
  enteredFirst: any;
  enteredTask: any;
  welcomeMessage: any;
  isEventsCritical: any;
  beginApplication: any;
  georgeEHarrisLogin: any;
  addStudentOn: any;
  criticalActivitiesOn: any;
  aboutMeOn: any;
  Types: any;

  todaysDate: any;
  todaysDateDisplay: any;

  
  taskOne: any;
  taskTwo: any;
  taskThree: any;
  taskFour: any;
  taskFive: any;
  taskSix: any;
  Michael: any;
  Andrea: any;
  Ash: any;
  nameExists: any;
  taskExists: any;
  displayStudentIcons: any;
  displayTaskIcons: any;
  displayTasksAll: any;
  studentList: any;
  
  activeUser: any;
  dummyUser: any;



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
      if (this.addStudentOn){
        this.criticalActivitiesOn = false;
        this.aboutMeOn = false;
      }
    }
    else if (input == 2){
      if (this.criticalActivitiesOn == false){
        this.studentRoster.verifyCriticalUpdates();
      }
      this.criticalActivitiesOn = this.criticalActivitiesOn == true ? false : true;
      if (this.criticalActivitiesOn){
        this.addStudentOn = false;
        this.aboutMeOn = false;
      }
    }
    else if (input == 3){
      this.aboutMeOn = this.aboutMeOn == true ? false : true;
      if (this.aboutMeOn){
        this.addStudentOn = false;
        this.criticalActivitiesOn = false;
      }
      
    }
   
  }

  logout(){
    this.loginForm.reset();
    this.beginApplication = false;
    // this.saveUser("logout");
    // this.transformedList = [];
    // this.transformedTaskList = [];
    // this.activeUser = this.dummyUser;
  }


  validateLogin(){
    
    let userTyped = this.loginForm.value.username;
    if (userTyped == null || userTyped == undefined || userTyped == ""){
      alert("Login failed. Please provide a username.")
    }
    else if (this.loginForm.value.password != "123") {
      alert("Login failed. Password is 123.")
    } 
    else {
      // for (let i = 0; i < this.users.length; i++){
      //   if (this.users.length > 0 && this.users[i].username == userTyped){
      //     this.activeUser = this.users[i];
      //     this.teacherName = this.loginForm.value.username!;
      //     this.welcomeMessage = "Welcome " + this.teacherName;
      //     this.studentList = JSON.parse(this.users[i].student_list);
       
      //     if (this.studentList.length > 0){
      //       for (let i = 0; i < this.studentList.length; i++){
      //         let stu = this.studentList[i];
      //         if (stu.tasks.length > 0){
      //           for (let a = 0; a < stu.tasks.length; a++){
      //             let task = stu.tasks[a];
      //             this.transformedTaskList.push(new Task(task.taskName, task.frequency, task.displayEditTask, task.displayFrequencyTask, task.nextEvent, task.nextEventDisplay))
      //           }
      //           stu.tasks = [...this.transformedTaskList];
      //           this.transformedList.push(new Student(stu.name, stu.tasks, stu.id, stu.displayEditStudent, stu.starChecked));
      //           this.transformedTaskList = [];
      //         } else {
      //           this.transformedList.push(new Student(stu.name, [], stu.id, stu.displayEditStudent, stu.starChecked));
      //         }
                
              
              
              
      //       }
            
      //       this.studentList = [...this.transformedList];
      //     }
      //     else {
      //       this.studentList.push(this.Andrea);
      //       this.studentList.push(this.Michael);
      //       this.studentList.push(this.Ash);
      //     }
            

      //     this.beginApplication = true;
      //   }
      // }

      //Delete this if block in final app. VVVV
      if (userTyped == "Teacher" && this.loginForm.value.password == "123"){
        this.teacherName = this.loginForm.value.username!;
        this.welcomeMessage = "Welcome " + this.teacherName;
        this.studentList = [this.Andrea, this.Michael, this.Ash]
        this.beginApplication = true;
      }
     
    }

    

    
  }
  
}




