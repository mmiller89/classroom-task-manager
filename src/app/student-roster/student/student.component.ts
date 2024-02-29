import { Component, OnInit, Inject } from '@angular/core';
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

export class Student {

  // constructor(@Inject(String) public name: string, @Inject(TaskComponent)public tasks: TaskComponent[], @Inject(String) public id: string) {}

      constructor(public name: string, public tasks: Task[], public id: string, public displayEditStudent: number) {
      }

      deleteTask(selectedTask: Task){
        for (let i = 0; i < this.tasks.length; i++){
            if (this.tasks[i].taskName == selectedTask.taskName){
                this.tasks.splice(i, 1);
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

