import { Component, OnInit,Input } from '@angular/core';
import { Bus } from '../../models/bus.model'
import { MessagingService } from '../../services/messaging.service'
import { DataService } from '../../services/data.service'
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  buses: any[];
  public busTypes: any[]=[];
  departures : any;
  priceranges : any;
  form: FormGroup;
  public bus: Bus;

  constructor(private message: MessagingService,private router: Router,
    private data: DataService,private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      busTypes: ['']
    });

    this.busTypes = this.getBusTypes();
  }

  ngOnInit(): void {
    this.buses = this.message.getMessage();
    this.busTypes = this.getBusTypes();
  }

  getBusTypes(){
    return [
      { id: '1', name: 'AC' },
      { id: '2', name: 'Non-AC' },
      { id: '3', name: 'Sleeper' },
      { id: '4', name: 'Seater' }
    ];
  }

  submit(form) { 
    console.log(form.value.busTypes);  
  }

  bookSeat(id: any){
    this.data.getBusById(id).subscribe(res=>{
      this.bus = res;
      this.message.sendMessage(this.bus);
      this.router.navigate(['/select'])
    });
   
  }


}
