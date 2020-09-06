import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { PaymentComponent } from '../payment/payment.component';
import { BusSearchComponent } from '../bus-search/bus-search.component';
import { SelectBusSeatComponent } from '../select-bus-seat/select-bus-seat.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { NavComponent } from '../nav/nav.component';
import { from } from 'rxjs';



const routes: Routes = [
  { path: '', component: NavComponent },
  { path: 'search', component: BusSearchComponent },
  { path: 'select', component: SelectBusSeatComponent },
  { path: 'result', component: SearchResultComponent },
  { path: 'payment', component: PaymentComponent },
];
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
