// import { StudentRosterComponent } from "./student-roster.component";
// import { Task } from "./task";
// import { Component, Input } from '@angular/core';
// import { FormGroup } from '@angular/forms';

// export class Student {
    

//     public displayEditTask: boolean = false;
    
//     //TASKS WILL EVENTUALLY BE AN ARRAY OF TASKS.

//     //Parameter properties utilized to avoid boilerplate initialized variable.
    
//     constructor (public firstName: string, public tasks: Task[], public studentID: string ){
//     }


//     addTask(){
//         let taskName: any = prompt("Enter the name of the task.");
//         this.tasks.push(new Task(taskName, ""))
//     }

//     editTaskToggle(){
//         if (this.displayEditTask == false){
//             this.displayEditTask = true;
//         } else {
//             this.displayEditTask = false;
//         }
//     }
//     editTask(selectedTask: Task, ele: string){
        

//         for (let i = 0; i < this.tasks.length; i++){
//             if (this.tasks[i].taskName == selectedTask.taskName){
//                 this.tasks[i].taskName = ele;
//             }
//         }

//         this.editTaskToggle();

        
//     }

//     deleteTask(selectedTask: Task){
//         for (let i = 0; i < this.tasks.length; i++){
//             if (this.tasks[i].taskName == selectedTask.taskName){
//                 this.tasks.splice(i, 1);
//             }

//         }
       
//     }

//     setTaskFrequency(){
  
//     }
// }
