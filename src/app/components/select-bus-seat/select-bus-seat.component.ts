import { Component, OnInit } from '@angular/core';
import { Seat } from '../../models/seat.model';
import { MessagingService } from '../../services/messaging.service'
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'
import { DataService } from '../../services/data.service'
import { Bus } from 'src/app/models/bus.model';
import { Subscription } from 'rxjs';
import { Booking } from '../../models/booking.model'
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-select-bus-seat',
  templateUrl: './select-bus-seat.component.html',
  styleUrls: ['./select-bus-seat.component.css']
})
export class SelectBusSeatComponent implements OnInit {

  showSeatList: Seat[] = [];
  total = 0;
  fillupSeat = [];
  seats: Seat = new Seat;
  seat: Seat = <Seat>{}
  alert = false;
  bus: Bus;
  booking: Booking;
  passengers = 0;
  subscription: Subscription;
  isSingleClick: Boolean = true; 
  constructor(private route: Router, private dataService: DataService,
    private router: Router, private message: MessagingService,
  ) { }

  ngOnInit(): void {
    this.bus = JSON.parse(localStorage.getItem('bus'))
    //this.message.getMessage();
    console.log(this.bus);
    this.getbookSeat();
  }

  Seat(e) {
    let seats = [];
    seats = this.showSeatList.map(item => {
      return item.seatNo
    })
    let id = document.getElementById(e);

    if ((this.fillupSeat.indexOf(String(e)) < 0) && (seats.indexOf(e) < 0)) {
      if ((this.showSeatList.length != 4)) {
        id.innerHTML = `<img src="../assets/img/fseat.png" alt="">`
        this.seat = {
          seatNo: e,
          fare: this.bus.fare,
        } as Seat
        this.totalFare(this.seat.fare);
        this.showList(this.seat);
      }
      else {
        this.alert = true;
      }
    }
  }

  clearSeat(e) {
    console.log(e)
    console.log("Doouble Click")
    let seats = [];
    seats = this.showSeatList.map(item => {
      return item.seatNo
    })
    let id = document.getElementById(e);
    id.innerHTML = `<img src="../assets/img/bseat.png" alt="">`
    this.seat = {
      seatNo: e,
      fare: this.bus.fare,
    } as Seat
    this.clearSeatFromList(this.seat)
    this.total -= this.seat.fare;
  }


  clearSeatFromList(seat){
    this.showSeatList = this.showSeatList.filter(item => item.seatNo != seat.seatNo);
    this.passengers = this.showSeatList.length;
    this.bus.passengers = this.passengers;
  }

  showList(seat) {
    this.showSeatList.push(seat)
    this.passengers = this.showSeatList.length;
    this.bus.passengers = this.passengers;
  }

  totalFare(fare) {
    this.total += fare;
  }


  confirmJourney(id, fare) {
    console.log(this.showSeatList)
    this.dataService.bookSeats(this.showSeatList, id).subscribe(res => {
      this.dataService.getBookingById(res.id).subscribe(item => {
        this.booking = item;
        console.log(this.booking);
        this.message.sendMessage(this.booking);
        localStorage.setItem('booking', JSON.stringify(this.booking));
        this.router.navigate(['/payment'])
      })
    });
  }

  getbookSeat(){
    let busid=this.bus.id;
    this.subscription=this.dataService.getBookedSeat(busid)
    .subscribe(seats=>{
      for(let i in seats){
          this.fillupSeat.push(seats[i])
          this.changeSeatColor(seats[i])      
      }
    })
  }

  changeSeatColor(seatNo){
    let id= document.getElementById(seatNo)
    id.innerHTML=`<img src="../assets/img/bookseat.png">`
    id.removeEventListener("click",this.Seat);
  }

}
