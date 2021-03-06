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
  public departures : any[]=[];
  public priceranges : any[]=[];
  selectedBusType : 'AC';
  selectedDeparture : 'Early Morning';
  selectedPriceRange : '0-1000';
  form: FormGroup;
  public bus: Bus;
  filteredBuses : Bus[];

  constructor(private message: MessagingService,private router: Router,
    private data: DataService,private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      busTypes: [''],
      departures: [''],
      priceranges: ['']
    });

    this.busTypes = this.getBusTypes();
  }

  ngOnInit(): void {
    this.buses = JSON.parse(localStorage.getItem('buses'));
    console.log(this.buses);
    this.busTypes = this.getBusTypes();
    this.departures = this.departureList();
    this.priceranges = this.priceRangeList();
  }

  onBusTypeChange(busType) {
    console.log(busType);
    this.selectedBusType = busType;
    this.filteredBuses = this.buses.filter(bus=>bus.busType === this.selectedBusType);
    console.log(this.filteredBuses);
  }
  onDepartureChange(departure) {
    console.log(departure);
    this.selectedDeparture = departure;
    if(departure == 'Early Morning'){
      this.filteredBuses = this.buses.filter(bus=>
        (bus.route.sourceTiming.split(":",1)[0] >=4) && (bus.route.sourceTiming.split(":",1)[0] <=11)
      );
    }else if(departure == 'AfterNoon'){
      this.filteredBuses = this.buses.filter(bus=>
        (bus.route.sourceTiming.split(":",1)[0] >=12) && (bus.route.sourceTiming.split(":",1)[0] <=16)
      );
    }else if(departure == 'Evening'){
      this.filteredBuses = this.buses.filter(bus=>
        (bus.route.sourceTiming.split(":",1)[0] >=17) && (bus.route.sourceTiming.split(":",1)[0] <=23)
      );
    }
    console.log(this.filteredBuses)
  }


  onBusPriceChange(price) {
    if(price == '0-1000'){
      this.filteredBuses = this.buses.filter(bus=>
        (bus.fare >=0) && (bus.fare <=1000)
      );
      console.log(this.filteredBuses)
    }else if(price == '1000-2000'){
      this.filteredBuses = this.buses.filter(bus=>
        (bus.fare>1000) && (bus.fare<=2000)
      );
      console.log(this.filteredBuses)
    }else if(price == '2000-3000'){
      this.filteredBuses = this.buses.filter(bus=>
        (bus.fare>2000) && (bus.fare<=3000)
      );
      console.log(this.filteredBuses)
    }
    else{
      this.filteredBuses = this.buses.filter(bus=>
        (bus.fare>3000)
      );
      console.log(this.filteredBuses)
    }
  }

  getBusTypes(){
    return [
      { id: '1', name: 'Non-AC' },
      { id: '2', name: 'Sleeper' },
      { id: '3', name: 'AC' }
    ];
  }

  departureList(){
    return [
      { id: '1', name: 'Evening' },
      { id: '2', name: 'AfterNoon' },      
      { id: '3', name: 'Early Morning' }
    ]
  }

  priceRangeList(){
    return [
      { id: '1', name: 'Above 3000' },
      { id: '2', name: '2000-3000' },
      { id: '3', name: '1000-2000' },
      { id: '4', name: '0-1000' },
    ]
  }

  submit(form) { 
    console.log(form.value.busTypes);  
  }

  selectSeat(id: any){
    this.data.getBusById(id).subscribe(res=>{
      this.bus = res;
      this.message.sendMessage(this.bus);
      localStorage.setItem('bus', JSON.stringify(this.bus));
      this.router.navigate(['/select'])
    });
   
  }


}
