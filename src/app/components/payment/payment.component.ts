import { Component, OnInit } from '@angular/core';
import { Seat } from '../../models/seat.model';
import { MessagingService } from '../../services/messaging.service'
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormsModule,FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { DataService } from '../../services/data.service'
import { Bus } from 'src/app/models/bus.model';
import { Subscription } from 'rxjs';
import { Booking } from '../../models/booking.model'
import { Payment } from '../../models/payment.model'
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  bus: Bus;
  booking : Booking;
  tax:number=250;
  totalAmount:number;
  payment : Payment = new Payment();
  paymentForm : FormGroup;
  submitted = false;
  selectedMonth: string = 'JAN';
  selectedYear : any = 2020;
  constructor(private route:Router, private dataService :DataService,
    private router: Router,private message: MessagingService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.booking = JSON.parse(localStorage.getItem('booking'));
    // this.message.getMessage();
    console.log(this.booking);
    this.getTotalAmount(this.booking.fare);

    this.paymentForm = this.formBuilder.group({
      cardholderName : new FormControl('', [Validators.required]),
      cardNumber : new FormControl('', Validators.required),
      cvv : new FormControl('', Validators.required),
    });
  }

  getTotalAmount(amount:number){
    this.totalAmount=amount+this.tax;
  }


  onMonthChange(month) {
    console.log(month);
    this.selectedMonth = month;
  }

  onYearChange(year){
    console.log(year);
    this.selectedYear = year;
   
  }

  getExpiryDate(){
     return this.selectedMonth+'/'+this.selectedYear;
  }

  onSubmit(form) {
    this.submitted = true;
    if (this.paymentForm.invalid) {
      return;
    } else {
      this.payment.totalAmount = this.totalAmount;
      this.payment.expiryDate = this.getExpiryDate();
      console.log(this.payment)
      this.dataService.makePayment(this.payment, this.booking.id).subscribe(res => {
        this.dataService.getBookingById(this.booking.id).subscribe(item => {
          this.booking = item;
          console.log(this.booking);
          this.message.sendMessage(this.booking);
          localStorage.setItem('booking', JSON.stringify(this.booking));
          this.router.navigate(['/summary'])
        });
      })
    }
  }
}
