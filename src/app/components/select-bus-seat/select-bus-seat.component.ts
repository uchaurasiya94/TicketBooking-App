import { Component, OnInit } from '@angular/core';
import { Seat } from '../../models/seat.model';
import { MessagingService } from '../../services/messaging.service'
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'
import { DataService } from '../../services/data.service'
import { Bus } from 'src/app/models/bus.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-bus-seat',
  templateUrl: './select-bus-seat.component.html',
  styleUrls: ['./select-bus-seat.component.css']
})
export class SelectBusSeatComponent implements OnInit {

  showSeatList:Seat[]=[];
  total=0;
  fillupSeat=[];
  alert=false;
  bus: Bus;
  passengers=0;
  subscription:Subscription;
  constructor(private route:Router, private dataService :DataService,private message: MessagingService,
    ) { }

  ngOnInit(): void {
    this.bus = this.message.getMessage();
    console.log(this.bus);

  }

  confirmJourney() {

  }

  Seat(e) {
    let seats=[];
    seats= this.showSeatList.map(item=>{
      return item.seatNo
    })
     let id = document.getElementById(e);
   
     if((this.fillupSeat.indexOf(String(e))<0) && (seats.indexOf(e)<0)){
       if((this.showSeatList.length!=4)) {
         id.innerHTML = `   <img src="../assets/img/fseat.png" alt="">`
         let seat={
           seatNo:e,
           fare:this.bus.fare,
           seatClass:'economy'
         }
         this.totalFare(seat.fare);
         this.showList(seat);
       }
       else{
         this.alert=true;
       }
     }
  }
     
  showList(seat){
    this.showSeatList.push(seat)
    this.passengers=this.showSeatList.length;
    this.bus.passengers=this.passengers;
  }

  totalFare(fare){
    this.total+=fare;
  } 
  // getbookSeat(){
  

  //   let busid=this.bus.id;
  //   let key = String(new Date(route.date).getTime());
  //   console.log(busid,key)
  //   this.subscription=this.BusService.getFillupseat(key,busid)
  //   .subscribe(res=>{
  //     for(key in res){
  //       for(let i in res[key].seats){
  //         this.fillupSeat.push(res[key].seats[i])
  //         this.changeSeatColor(res[key].seats[i])
  //       }
  //     }
  //   })
  // }

  // changeSeatColor(seatNo){
  //   let id= document.getElementById(seatNo)
  //   id.innerHTML=`  <img src="../assets/img/bookseat.png">`
  //   id.removeEventListener("click",this.Seat);
    
  
  // }

}
