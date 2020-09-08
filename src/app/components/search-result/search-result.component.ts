import { Component, OnInit,Input } from '@angular/core';
import { Bus } from '../../models/bus.model'
import { MessagingService } from '../../services/messaging.service'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  busesData: any;
  
  constructor(private message: MessagingService) { }

  ngOnInit(): void {
    this.busesData = this.message.getMessage();
  }

}
