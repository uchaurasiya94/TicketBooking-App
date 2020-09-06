import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { BusSearchComponent } from './bus-search/bus-search.component';
import { SelectBusSeatComponent } from './select-bus-seat/select-bus-seat.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


const routes: Routes = [
  { path: 'search', component: BusSearchComponent },
  { path: 'result', component: SearchResultComponent },
  { path: 'select', component: SelectBusSeatComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    BusSearchComponent,
    SelectBusSeatComponent,
    SearchResultComponent,
    NavComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), HttpClientModule, ReactiveFormsModule, AppRoutingModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
