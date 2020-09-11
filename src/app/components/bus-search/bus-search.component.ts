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

  bus: Bus = new Bus();
  route : Route = new Route();
  searchForm ; FormGroup;
  submitted = false;
  public buses: any[] = [];
  constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder,private message: MessagingService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      source: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      destination: new FormControl('', Validators.required),
      sourceTiming: new FormControl('', Validators.required),
    });

    // this.getAllBuses();

  }
  onSubmit(form){
    this.submitted = true;
    this.getAllBuses(form.value.source, form.value.destination, form.value.sourceTiming);
  }
  getAllBuses(source: string, destination: string, sourceTiming : string): void {
    this.data.getSearchResult().subscribe(data => {
      this.buses = data;
      //data.filter((bus:Bus)=> bus.route.source === source && bus.route.destination === destination)
      console.log(this.buses);
      this.message.sendMessage(this.buses);
      this.router.navigate(['/result'])
      })
  }
}
