import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { MessagingService } from '../../services/messaging.service'
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {

  booking : Booking;
  bookings : Booking[];
  constructor(private message: MessagingService , private dataservice: DataService) { }

  ngOnInit(): void {
    this.booking = JSON.parse(localStorage.getItem('booking'));
    this.dataservice.getAllBookings().subscribe(item => {
      this.bookings =  item.reverse();
      console.log(this.bookings)
    });
  }

  cancelbooking(id:any){
    console.log(id)
    this.dataservice.cancelBooking(id).subscribe(bookingId=>{
      console.log(bookingId);
      this.dataservice.getAllBookings().subscribe(item => {
        this.bookings =  item.reverse();
      });
    });
  }

}
