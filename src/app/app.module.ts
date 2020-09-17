import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BusSearchComponent } from './components/bus-search/bus-search.component';
import { SelectBusSeatComponent } from './components/select-bus-seat/select-bus-seat.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { MessagingService } from './services/messaging.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';

const routes: Routes = [
  { path: 'search', component: BusSearchComponent },
  { path: 'result', component: SearchResultComponent },
  { path: 'select', component: SelectBusSeatComponent },
  { path: 'summary', component: BookingSummaryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    BusSearchComponent,
    SelectBusSeatComponent,
    SearchResultComponent,
    NavComponent,
    BookingSummaryComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), 
    BrowserAnimationsModule,
    HttpClientModule, ReactiveFormsModule, AppRoutingModule,FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
