import { Component } from '@angular/core';
import { Task } from './task/task.component';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})

export class StudentComponent  {
  
    public name: string;
    public tasks: Task[];
    public id: string;

    giveAccessValues(name: string, tasks: Task[], id: string){
      this.name = name;
      this.tasks = tasks;
      this.id = id;
    }
    

}

export class Student{

      constructor(public name: string, public tasks: Task[], public id: string, public displayEditStudent: number, public starChecked: boolean) {}


      criticalTasks = new Set<string>;
      

     
      switchStar(){
        this.starChecked = this.starChecked == false ? true : false;
      }
    
      updateCriticalTasks(taskName: string, isToday: boolean){
        if (isToday){
          this.criticalTasks.add(taskName)
        } 
        else {
          this.criticalTasks.forEach(e => {
            if (e == taskName){
              this.criticalTasks.delete(e);
            }
          });
         
        }
        
      }

      deleteTask(selectedTask: Task){
        for (let i = 0; i < this.tasks.length; i++){
            if (this.tasks[i].taskName == selectedTask.taskName){
                this.tasks.splice(i, 1);
                this.updateCriticalTasks (selectedTask.taskName, false)
            }
        }   
      }

    

      editTask (selectedTask: Task, ele: string){
        if (ele == null || ele == ""){
          selectedTask.editTaskToggle(0);
          return false;
        } else {
          for (let i = 0; i < this.tasks.length; i++){
            if (this.tasks[i].taskName == selectedTask.taskName){
                this.tasks[i].taskName = ele;
                
            }
          }
          
          selectedTask.editTaskToggle(0);
          return true;
        }
          
      }


      editStudentToggle(num: number){
        //0 - Default state
        //1 - Edited state (can edit value)
        //2 - For adding a task
        this.displayEditStudent = num;
      }

      
      setTaskFrequency(){}
}

