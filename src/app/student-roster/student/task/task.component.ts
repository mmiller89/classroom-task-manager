import { Component, Inject, Input } from '@angular/core';
import { add, addDays, addWeeks, addMonths, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, format, isSaturday, isSunday, closestTo, toDate } from 'date-fns'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {  

}

export class Task {

  public startDate: string;
  public nextEvent: string;
  public nextEventDisplay: string;
  public days_array: any;
  public temp_task_custom = new Set();
  public displayCustomFreq: string;
  

  constructor (public taskName: string, public frequency: string, public displayEditTask: number, public displayFrequencyTask: number){
  }


  editTaskToggle(num: number){
    this.displayEditTask = num;
  }

  editFrequencyToggle(num: number){
    this.displayFrequencyTask = num;
  }

  onSelectFrequency(value: string){
      if (value == "No Change" && this.startDate == null && this.nextEvent == null){
        this.editFrequencyToggle(0);
      } 
      else if (value == "No Change") {
        this.editFrequencyToggle(3);
      } 
      else if (value == "Custom"){
        this.displayCustomFreq = value;
        this.editFrequencyToggle(5);
      } else {
        this.frequency = value;
        this.editFrequencyToggle(2);
      }

     

      
  }

  validateDaysChecked(event: any){
    if (event.target.checked){
      let string: string = event.target.name
      this.temp_task_custom.add(string);
    } 
    else if (!event.target.checked) {
      let string: string = event.target.name
      this.temp_task_custom.delete(string)
      
    }
  }

  submitCustomSchedule(todaysDate: string, initialized: boolean){
      
      let stringFreq: string = ""
      let sortedArray = [...this.temp_task_custom].sort();
      this.days_array = [...sortedArray]

      // console.log(this.temp_task_custom)
      // console.log(this.days_array)
      
      
      //We have a sorted list (in order) of the days checked. We need to check what day it is, and set nextDate to the nearest checked date.
      //This function will put into task component and can be called on refreshing the app.
      //this function should return the nearest date.
  
      for (let i of sortedArray){
        if (i == "amon"){
          stringFreq += "M/";
        }
        else if(i == "btue"){
          stringFreq += "T/";
        }
        else if(i == "cwed"){
          stringFreq += "W/";
        }
        else if(i == "dthu"){
          stringFreq += "TH/";
        }
        else if(i == "efri"){
          stringFreq += "F/";
        }
      }
  
      stringFreq = stringFreq.slice(0,-1)
      this.frequency = stringFreq;
      this.temp_task_custom.clear();
  

    //First day of array is Tuesday and I want custom Thurs/Friday only.
    //[dthu, efri], todays date is saved to Start Date already
    
    this.calculateNextDay(todaysDate, initialized)
    
  }

  calculateNextDay(todaysDate: string, initialized: boolean){
    console.log(this.days_array)
    console.log(todaysDate)

    let arrayUpcomingDates: any
    let plusOne = format(new Date(addDays((todaysDate), 1)), 'MMMM/dd/yyyy')
    let plusTwo = format(new Date(addDays((todaysDate), 2)), 'MMMM/dd/yyyy')
    let plusThree = format(new Date(addDays((todaysDate), 3)), 'MMMM/dd/yyyy')
    let plusFour = format(new Date(addDays((todaysDate), 4)), 'MMMM/dd/yyyy')
    let plusFive = format(new Date(addDays((todaysDate), 5)), 'MMMM/dd/yyyy')
    let plusSix = format(new Date(addDays((todaysDate), 6)), 'MMMM/dd/yyyy')
    let plusSeven = format(new Date(addDays((todaysDate), 7)), 'MMMM/dd/yyyy')

    arrayUpcomingDates = [todaysDate, plusOne, plusTwo, plusThree, plusFour, plusFive, plusSix, plusSeven]
  
   
    let correlatedDates: Date[] = [];

    for (let i = 0; i < this.days_array.length; i++){
      let upperCase = this.days_array[i].charAt(1).toUpperCase();
      let remainder = this.days_array[i].slice(2)
      let adjustedString = upperCase + remainder
      for (let k = 0; k < arrayUpcomingDates.length; k++){
        let dayVal = format(new Date(arrayUpcomingDates[k]), 'EE')
        if (adjustedString == dayVal){
          correlatedDates.push(arrayUpcomingDates[k])
        }
        console.log("Return array = " + correlatedDates)
      }
    }
    
    
    
    this.days_array.push(this.days_array.shift())
    correlatedDates.sort();
    let chosenDate: any;
    chosenDate = format(new Date(correlatedDates[0]), 'MMMM/dd/yyyy')
    this.nextEvent = format(new Date(chosenDate), 'MMMM/dd/yyyy');
    this.nextEventDisplay = format(new Date(chosenDate), 'EE dd MMMM');
  }



  weekendAdjust(nextDate: Date){
    if (isSaturday(nextDate)){
      return format(new Date(addDays(nextDate, 2)), 'MMMM/dd/yyyy');
    }
    if (isSunday(nextDate)){
      return format(new Date(addDays(nextDate, 1)), 'MMMM/dd/yyyy');
    }
    return format(new Date(nextDate), 'MMMM/dd/yyyy');
  }


 
}
