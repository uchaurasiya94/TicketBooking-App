import {Deserializable} from './deserializable.model';
import { Seat } from './seat.model';
import { Route } from './route.model'; 
import { from } from 'rxjs';
import { Type } from '@angular/core';

export class Bus implements Deserializable {

    public id : String; 
    public busType : String;
    public location : String;
    public fare : number;
    public totalSeats : number;
    public route : Route = new Route();
  
    deserialize(input: any){
        // Assign input to our object BEFORE deserialize our bus to prevent already deserialized buses from being overwritten.
        Object.assign(this, input);
        return this;
      }

}
