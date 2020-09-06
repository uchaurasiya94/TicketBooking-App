import { Component, OnInit,Input } from '@angular/core';
import { Bus } from '../models/bus.model'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() buses : Bus[] ;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.buses);
  }

}
