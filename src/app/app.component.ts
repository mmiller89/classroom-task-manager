import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StudentRosterComponent } from './student-roster/student-roster.component';
import { Task } from './student-roster/student/task/task.component';
import { Student } from './student-roster/student/student.component';
import { UserService } from './services/user.service';
import { User } from './user-data/user';

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
    this.listUsers();
  }

  listUsers(){
    this.userService.getUserList().subscribe(data => {
      this.users = data;
      console.log(data)
    })
  }

  saveUser(value: string){
    if (value == "save"){
      alert("Roster saved!")
    }
    for (let i = 0; i < this.users.length; i++){
      if (this.users[i].username == this.activeUser.username){
        this.users[i].student_list = JSON.stringify(this.studentList);
        console.log(this.users[i].student_list);
        this.userService.putUser(this.users[i]).subscribe();
      }
    }

    
  }

  addUser(){
    let newUser = new User(0, this.createAccForm.value.createUser!, "[]");
    this.userService.addUser(newUser)
    .subscribe(user => this.users.push(user));
  }


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
  beginApplication = true;
  georgeEHarrisLogin = 528528;
  addStudentOn = false;
  criticalActivitiesOn = false;
  aboutMeOn = false;
  Types = {Student};

  
  taskOne = new Task("Test on sight words.", "None", 0, 0, "N/A", "")
  taskTwo = new Task("Behavior Check-In", "None", 0, 0, "N/A", "")
  taskThree = new Task("RTI Assessment", "None", 0, 0, "N/A", "")
  taskFour = new Task("Reassess Math Test", "None", 0, 0, "N/A", "")
  taskFive = new Task("ClassDojo Mom", "None", 0, 0, "N/A", "")
  taskSix = new Task("Math fluency practice", "None", 0, 0, "N/A", "")
  Michael = new Student("Michael M", [this.taskOne, this.taskTwo], "1", 0, false)
  Andrea = new Student("Andrea A", [this.taskThree, this.taskFour], "2", 0, false)
  Ash = new Student("Ash K", [this.taskFive, this.taskSix], "3", 0, false)
  nameExists = true;
  taskExists = true;
  displayStudentIcons = true;
  displayTaskIcons = true;
  displayTasksAll = true;
  studentList: Student[] = [this.Michael, this.Andrea, this.Ash]
  
  activeUser: User;
  dummyUser = new User(99999, "Foo", "[]");



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
    this.saveUser("logout");
    this.transformedList = [];
    this.transformedTaskList = [];
    this.activeUser = this.dummyUser;
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
      for (let i = 0; i < this.users.length; i++){
        if (this.users.length > 0 && this.users[i].username == userTyped){
          this.activeUser = this.users[i];
          
          
           
        

          console.log(this.studentList); // at this stage, data is good.
            
      

          this.teacherName = this.loginForm.value.username!;
          this.welcomeMessage = "Welcome " + this.teacherName;
          this.studentList = JSON.parse(this.users[i].student_list);
       
          if (this.studentList.length > 0){
            for (let i = 0; i < this.studentList.length; i++){
              let stu = this.studentList[i];
              if (stu.tasks.length > 0){
                for (let a = 0; a < stu.tasks.length; a++){
                  let task = stu.tasks[a];
                  this.transformedTaskList.push(new Task(task.taskName, task.frequency, task.displayEditTask, task.displayFrequencyTask, task.nextEvent, task.nextEventDisplay))
                }
                stu.tasks = [...this.transformedTaskList];
                this.transformedList.push(new Student(stu.name, stu.tasks, stu.id, stu.displayEditStudent, stu.starChecked));
                this.transformedTaskList = [];
              } else {
                this.transformedList.push(new Student(stu.name, [], stu.id, stu.displayEditStudent, stu.starChecked));
              }
                
              
              
              
            }
            
            this.studentList = [...this.transformedList];
          }
          else {
            this.studentList.push(this.Andrea);
            this.studentList.push(this.Michael);
            this.studentList.push(this.Ash);
          }
            
          console.log(this.studentList); //data is not good.
          this.beginApplication = true;

          //NONE OF THE FUNCTIONS/BUTTONS WORK WHEN I SAVE AND PARSE THE JSON LIST. DONE FOR TODAY.
          //CORRECTION - SORT AND ARROW MOVE FUNCTIONS WORK. NONE OF THE BUTTONS DO.
          //https://stackoverflow.com/questions/34031448/typescript-typeerror-myclass-myfunction-is-not-a-function
        }
      }
    }

    

    
  }
  
}




