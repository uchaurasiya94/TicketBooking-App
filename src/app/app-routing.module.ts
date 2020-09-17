import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BusSearchComponent } from './components/bus-search/bus-search.component';
import { SelectBusSeatComponent } from './components/select-bus-seat/select-bus-seat.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'search', component: BusSearchComponent },
  { path: 'result', component: SearchResultComponent },
  { path: 'select', component: SelectBusSeatComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'summary', component: BookingSummaryComponent },
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 

export class AppRoutingModule { }
