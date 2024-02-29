import { Component, Input, Output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Student } from './student/student.component';
import { Task } from './student/task/task.component';
import { EventEmitter } from 'stream';
import { NgModel } from '@angular/forms';
import { add, addDays, addWeeks, addMonths, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, format, isSaturday, isSunday, toDate } from 'date-fns'



@Component({
  selector: 'app-student-roster',
  templateUrl: './student-roster.component.html',
  styleUrl: './student-roster.component.css'
})
export class StudentRosterComponent {
    

    @Input() enteredFirst: string;
    @Input() enteredLast: string;
    @Input() enteredTask: string;


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

    // custom_dates = new FormGroup({
    //   days_checked: new FormControl("")
    // })
    
    //Insert testing data//
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
    //Insert testing data

  

    logDate(task: Task, customSchedule: boolean){
      
      if (customSchedule){
       
       
        task.startDate = format(new Date(), "MMMM/dd/yyyy");
        task.submitCustomSchedule(true);
        task.editFrequencyToggle(3);
  
      } else {
  
       let todaysDate = format(new Date(), "MMMM/dd/yyyy");
       let nextDate: any;
       
       //format the date selected by user//
       let chosenDate = String(this.select_date.value.dateSelected);
       //format the date selected by user//
       
       //convert to readable form
       chosenDate = chosenDate.replace(/-/, '/').replace(/-/, '/');
       let dateHuman = format(new Date(chosenDate), "EE, MMM dd")

       //this format is for date-fns functions to manipulate
       let weekDayCheck = format(new Date(chosenDate), "MMMM/dd/yyyy")
      
       //check to make sure chosen date is not before today, otherwise fails.
  
       if (toDate(new Date(todaysDate)) > toDate(new Date(weekDayCheck))){
         alert("Must choose today or after!")
         task.editFrequencyToggle(2)
         
       } else {
         if (task.frequency == "Daily"){
           nextDate = format(new Date(addDays(weekDayCheck, 1)), 'MMMM dd, yyyy');
           // weekDayCheck = format(new Date(addDays(dateHuman, 1)), "MMMM/dd/yyyy");
           nextDate = task.weekendAdjust(nextDate);
         } 
         else if (task.frequency == "Alternate"){
           nextDate = format(new Date(addDays(weekDayCheck, 2)), 'MMMM dd, yyyy');
           // weekDayCheck = format(new Date(addDays(dateHuman, 2)), "MMMM/dd/yyyy");
           nextDate = task.weekendAdjust(nextDate);
         } 
         else if (task.frequency == "Weekly"){
           nextDate = format(new Date(addWeeks(weekDayCheck, 1)), 'MMMM dd, yyyy');
           // weekDayCheck = format(new Date(addWeeks(dateHuman, 1)), "MMMM/dd/yyyy");
           nextDate = task.weekendAdjust(nextDate);
         } 
         else if (task.frequency == "Bimonthly"){
           nextDate = format(new Date(addWeeks(weekDayCheck, 2)), 'MMMM dd, yyyy');
           // weekDayCheck = format(new Date(addWeeks(dateHuman, 2)), "MMMM/dd/yyyy");
           nextDate = task.weekendAdjust(nextDate);
         }
         else if (task.frequency == "Monthly"){
           nextDate = format(new Date(addMonths(weekDayCheck, 1)), 'MMMM dd, yyyy');
           // weekDayCheck = format(new Date(addMonths(dateHuman, 1)), "MMMM/dd/yyyy");
           nextDate = task.weekendAdjust(nextDate);
         } 
         else if (task.frequency == "Once"){
           nextDate = format(new Date(weekDayCheck), 'MMMM dd, yyyy');
           nextDate = task.weekendAdjust(nextDate);
         }
       }
         task.startDate = dateHuman;
         task.nextEvent = nextDate; 
         chosenDate = "";
         task.editFrequencyToggle(task.frequency == "Once" ? 4 : 3);
       }
       
       
     }
  
     //Ensures that task.nextEvent will never fall on a Saturday or Sunday. Also converts back to readable format to display.
     


    insertStudents(firstname: string, task_list: Task[], displayEditStudent: number){
      let uuid = uuidv4();
      this.studentList.push(new Student(firstname, task_list, uuid, displayEditStudent));
     
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
