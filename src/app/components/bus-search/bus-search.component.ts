import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';
import { CommonConstants,StatusCodes } from '../../app.constant';
import { FormsModule,FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Bus } from '../../models/bus.model';
import { Route } from '../../models/route.model';
import * as moment from 'moment';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MessagingService } from '../../services/messaging.service';


declare function escape(s: string): string;

@Component({
  selector: 'app-bus-search',
  templateUrl: './bus-search.component.html',
  styleUrls: ['./bus-search.component.css']
})
export class BusSearchComponent implements OnInit {

  users: Object;
  bus: Bus = new Bus();
  searchForm: FormGroup;
  submitted = false;
  public buses: any[] = [];
  constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder,private message: MessagingService) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      busType: ['', Validators.required],
      totalSeats: ['', Validators.required],
      route: null
    });

    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users)
    });

    // this.getAllBuses();

  }
  onSubmit(form){
    
    console.log(form.value);
    console.log(form.value.busType);
    this.submitted = true;
    this.getAllBuses();

  //   if (this.searchForm.invalid) {
  //     return;
  // }

  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.searchForm.value))
  }
  getAllBuses(): void {
    let buses = [{
      busType: 'Ac',
      location: 'Mumbai',
      totalSeats: 50
    },
    {
      busType: 'Non-Ac',
      location: 'Banglore',
      totalSeats: 150
    }]
    this.message.sendMessage(buses);
    this.router.navigate(['/result'])
    // this.data.getSearchResult().subscribe(data => {
    //   this.buses = data;
    //   console.log(this.buses)
    // })
  }
}
