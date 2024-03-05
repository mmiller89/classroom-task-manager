import { Component, Input, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Student } from './student/student.component';
import { Task, TaskComponent } from './student/task/task.component';
import { EventEmitter } from 'stream';
import { NgModel } from '@angular/forms';
import { add, addDays, addWeeks, addMonths, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, format, isSaturday, isSunday, toDate, subDays } from 'date-fns'



@Component({
  selector: 'app-student-roster',
  templateUrl: './student-roster.component.html',
  styleUrl: './student-roster.component.css'
})
export class StudentRosterComponent {
    

    @Input() enteredFirst: string;
    @Input() enteredTask: string;
    @Input() addStudentOn: boolean;
    @Input()criticalActivitiesOn: boolean;
    @Input() aboutMeOn: boolean;
    @Input() welcomeMessage: any;

   

    edit_task_name = new FormGroup({
      valueEntered: new FormControl("")
    })

    edit_student_name = new FormGroup({
      studentValueEntered: new FormControl("")
    })
    
    add_task = new FormGroup({
      taskValueEntered: new FormControl("")
    })

    select_date = new FormGroup({
      dateSelected: new FormControl("")
    })

    studentForm = new FormGroup({
      first_name: new FormControl(""),
      task: new FormControl("")
    })

 
    
    //Insert testing data//
    todaysDate = format(new Date(), "MMMM/dd/yyyy");
    todaysDateDisplay = format(new Date(), 'EE dd MMMM');
    taskOne = new Task("Test on sight words.", "None", 0, 0)
    taskTwo = new Task("Behavior Check-In", "None", 0, 0)
    taskThree = new Task("RTI Assessment", "None", 0, 0)
    taskFour = new Task("Reassess Math Test", "None", 0, 0)
    taskFive = new Task("ClassDojo Mom", "None", 0, 0)
    taskSix = new Task("Math fluency practice", "None", 0, 0)
    Michael = new Student("Michael M", [this.taskOne, this.taskTwo], "1", 0)
    Andrea = new Student("Andrea A", [this.taskThree, this.taskFour], "2", 0)
    Ash = new Student("Ash K", [this.taskFive, this.taskSix], "3", 0)
    studentList: Student[] = [this.Michael, this.Andrea, this.Ash]
    studentsWithCriticalTasks: Student[] = []
    nameExists = true;
    taskExists = true;
    displayStudentIcons = true;
    displayTaskIcons = true;
    displayTasksAll = true;
    studentSortDropDown = "Select";
    
    //Insert testing data

    checkShowFrequencyIcon(event: any){
      this.displayTasksAll = event.target.checked ? false : true;
    }


    filterTaskList(event: any){
      if (event == "alphabetically"){
        for (let student of this.studentList){
          let task = student.tasks
            task.sort(function(a: Task, b: Task) {
            return ((a.taskName < b.taskName) ? -1 : ((a.taskName > b.taskName) ? 1 : 0));
        })
        }
      }
      else if (event == "highest"){
        for (let student of this.studentList){
          let task = student.tasks
            task.sort(function(a: Task, b: Task) {
            return ((a.nextEvent < b.nextEvent) ? -1 : ((a.nextEvent > b.nextEvent) ? 1 : 0));
        })
        }

      }
    }

   

    filterStudentList(stringVal: any){
      if (stringVal == "alphabetically"){
        
        this.studentList.sort(function(a: Student, b: Student) {
          return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
      })
      }
      else if (stringVal == "lowest"){
        this.studentList.sort(function(a: Student, b: Student) { 
          return a.tasks.length - b.tasks.length;
      })
      }
      else if (stringVal == "highest"){
        this.studentList.sort(function(a: Student, b: Student) { 
          return b.tasks.length - a.tasks.length;
      })
      }
      else if (stringVal == "starred"){
        this.studentList.sort(function(a: Student, b:Student){
          let aValue = a.starChecked ? 1 : 0;
          let bValue = b.starChecked ? 1 : 0;
          
          return bValue - aValue;
        })
      }
      
     
    }
   
    checkShowStudentIcon(event: any){
      this.displayStudentIcons = event.target.checked ? false : true;
    }

    checkShowTaskIcon(event: any){
      this.displayTaskIcons = event.target.checked ? false : true;
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
        this.insertStudents(this.enteredFirst, array_of_tasks, 0)
      } 
      else if (this.nameExists) {
        this.insertStudents(this.enteredFirst, [], 0)
      }
      
   
      
  }




  //For Testing Purpose Only
  dayPlusOne(){
    this.todaysDate = format(new Date(addDays(this.todaysDate, 1)), 'MMMM/dd/yyyy');
    this.todaysDateDisplay = format(new Date(this.todaysDate), 'EE dd MMMM');
    this.verifyCriticalUpdates();
  }

  dayMinusOne(){
    this.todaysDate = format(new Date(subDays(this.todaysDate, 1)), 'MMMM/dd/yyyy');
    this.todaysDateDisplay = format(new Date(this.todaysDate), 'EE dd MMMM');
    this.verifyCriticalUpdates();
  }

  //Adjusts all tasks that are past due to next date.
  pushNextEvent(task: Task){
    let date: any;
    if (task.frequency == "Daily"){
      task.nextEvent = format(new Date(this.todaysDate), "MMMM/dd/yyyy");
      date = task.nextEvent;
      task.nextEvent = task.weekendAdjust(date);
    } 
    else if (task.frequency == "Every Other Day"){
      task.nextEvent = format(new Date(addDays(task.nextEvent, 2)), 'MMMM/dd/yyyy');
      date = task.nextEvent;
      task.nextEvent = task.weekendAdjust(date);
    } 
    else if (task.frequency == "Weekly"){
      task.nextEvent = format(new Date(addWeeks(task.nextEvent, 1)), 'MMMM/dd/yyyy');
      date = task.nextEvent;
      task.nextEvent = task.weekendAdjust(date);
    } 
    else if (task.frequency == "Every Other Week"){
      task.nextEvent = format(new Date(addWeeks(task.nextEvent, 2)), 'MMMM/dd/yyyy');
      date = task.nextEvent;
      task.nextEvent = task.weekendAdjust(date);
    }
    else if (task.frequency == "Monthly"){
      task.nextEvent = format(new Date(addMonths(task.nextEvent, 1)), 'MMMM/dd/yyyy');
      date = task.nextEvent;
      task.nextEvent = task.weekendAdjust(date);
    } 
    else if (task.frequency == "Once"){
      task.nextEvent = ""
      task.nextEventDisplay = "Event Expired"
    }
    else if (task.displayCustomFreq == "Custom"){
      task.calculateNextDay(this.todaysDate, false);
    }

    if (task.frequency != "Once"){
      task.nextEventDisplay = format(new Date(task.nextEvent), 'EE dd MMMM'); 
    }
    

  }

    verifyCriticalUpdates(){
      if (this.studentsWithCriticalTasks.length > 0){
        this.studentsWithCriticalTasks = [];
      }
      for (let s of this.studentList){
        if (s.tasks.length > 0){
          for (let t of s.tasks){
            console.log(t.nextEvent)
            if (t.nextEvent != null && t.nextEvent != undefined && t.nextEvent != ""){
              
              // console.log(t.nextEvent);
              // console.log(this.todaysDate);

              if (t.nextEvent < this.todaysDate){
                this.pushNextEvent(t);
              }

              if (t.nextEvent === this.todaysDate){
                s.updateCriticalTasks(t.taskName, true);
              } else {
                s.updateCriticalTasks(t.taskName, false);
              }

              
            }
            
          }
        }
      }

      for (let student of this.studentList){
        if (student.criticalTasks.size > 0){
          this.studentsWithCriticalTasks.push(student)
        }
      }
    }
  

    logDate(task: Task, customSchedule: boolean){
      
      if (customSchedule){
        task.startDate = format(new Date(), "MMMM/dd/yyyy");
        task.submitCustomSchedule(this.todaysDate, true);
        task.editFrequencyToggle(3);
        this.verifyCriticalUpdates();
  
      } else {
       let nextDate: any;
       
       //format the date selected by user//
       let chosenDate = String(this.select_date.value.dateSelected);
       //format the date selected by user//
       
       //convert to readable form
       chosenDate = chosenDate.replace(/-/, '/').replace(/-/, '/');
       
       //this format is for date-fns functions to manipulate
       let weekDayCheck = format(new Date(chosenDate), "MMMM/dd/yyyy")
      
       //check to make sure chosen date is not before today, otherwise fails.
  
       if (toDate(new Date(this.todaysDate)) > toDate(new Date(weekDayCheck))){
         alert("Must choose today or after!")
         task.editFrequencyToggle(2)
         
       } 
       else {
            nextDate = weekDayCheck;
            nextDate = task.weekendAdjust(nextDate);
            task.startDate = this.todaysDate;
            task.nextEvent = nextDate;
            task.nextEventDisplay = format(new Date(nextDate), 'EE dd MMMM') 
            chosenDate = "";
            task.editFrequencyToggle(task.frequency == "Once" ? 4 : 3);
            this.verifyCriticalUpdates();
       }
         
       }
       
       
       
     }
     



    insertStudents(firstname: string, task_list: Task[], displayEditStudent: number){
      let uuid = uuidv4();
      this.studentList.unshift(new Student(firstname, task_list, uuid, displayEditStudent));
     
    }


    sendEditedTask(student: Student, task: Task){

      let sendString = JSON.stringify(this.edit_task_name.get('valueEntered')?.value).replaceAll("\"", "");
      let success = student.editTask(task, sendString);
      if (success){
        this.edit_task_name.controls['valueEntered'].setValue("");
        }

    }


    deleteStudent(student: Student){
        for (let i = 0; i < this.studentList.length; i++){
            if (this.studentList[i].name == student.name && this.studentList[i].id == student.id){
                this.studentList.splice(i, 1);
            }
        }   
      
    }



    goBack(task: Task){
      task.editTaskToggle(0);
    }



    sendEditedStudentName(student: Student){
      let success;
      let duplicateName;
      let sendStringStudent = JSON.stringify(this.edit_student_name.get('studentValueEntered')?.value).replaceAll("\"", "");

      if (sendStringStudent == null || sendStringStudent == "" || duplicateName){
        student.editStudentToggle(0)
        success = false;
      } else {
          for (let i = 0; i < this.studentList.length; i++){
            if (this.studentList[i].name == student.name && this.studentList[i].id == student.id){
                this.studentList[i].name = sendStringStudent; 
            }
          }
          student.editStudentToggle(0)
          success = true;
      }

      if (success){
        this.edit_student_name.controls['studentValueEntered'].setValue("");
      }
    }

    sendAddTask(student: Student){
      let success = false;
      let stringedTask = JSON.stringify(this.add_task.get('taskValueEntered')?.value).replaceAll("\"", "");
      if (stringedTask == null || stringedTask == ""){
        student.editStudentToggle(0);
        success = false;
      } else {
        student.tasks.push(new Task(stringedTask, "None", 0, 0))
        student.editStudentToggle(0);
        success = true;
      }
    }
     

    goBackStudentName(student: Student){
      student.editStudentToggle(0);
    }
}
