import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders,HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bus} from '../models/bus.model';
import {catchError, map} from 'rxjs/operators';
import { Seat } from '../models/seat.model';
import { Booking } from '../models/booking.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

 public getSearchResult(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`http://localhost:8181/buses`).pipe(
      map(data => data.map(data => new Bus().deserialize(data)))
    );
  }

  public getBusById(data:any):Observable<Bus> {
    console.log(data);
    const  params = new  HttpParams().set('id', data);
    return this.http.get<Bus>(`http://localhost:8181/bus`,{params}).pipe(
      map(data => new Bus().deserialize(data))
    );
  }

  public getBookingById(data:any):Observable<Booking> {
    console.log(data);
    const  params = new  HttpParams().set('id', data);
    return this.http.get<Booking>(`http://localhost:8181/booking`,{params}).pipe(
      map(data => new Booking().deserialize(data))
    );
  }

  public cancelBooking(id:any){
      const params = new  HttpParams().set('id', id);
      const headers = new HttpHeaders({'Content-Type': 'application/json'})
      return this.http.get<any>(`http://localhost:8181/cancelbooking`, { params, headers });
  }  

  public getAllBookings():Observable<Booking[]> {
    return this.http.get<Booking[]>(`http://localhost:8181/allbookings`).pipe(
      map(data => data.map(data => new Booking().deserialize(data)))
    );
  }

  public getBookedSeat(id:any):Observable<String[]>{
    const  params = new  HttpParams().set('id', id);
    return this.http.get<String[]>(`http://localhost:8181/bookedseat`,{params});
  }

  public bookSeats(data:any, id:any){
    console.log("Calling seat book service");
    console.log(data)
      const params = new  HttpParams().set('id', id);
      const headers = new HttpHeaders({'Content-Type': 'application/json'})
      return this.http.post<any>(`http://localhost:8181/bookseat`, data, { params, headers });
  }  

  public makePayment(data:any, id:any){
    console.log(" Calling Payment Service");
    console.log(data)
      const params = new  HttpParams().set('id', id);
      const headers = new HttpHeaders({'Content-Type': 'application/json'})
      return this.http.post<any>(`http://localhost:8181/payment`, data, { params, headers });
  }  
}
