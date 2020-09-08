import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bus} from '../models/bus.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }

 public getSearchResult(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`http://localhost:8181/buses`).pipe(
      map(data => data.map(data => new Bus().deserialize(data)))
    );
  }
}
