import { Bus } from './bus.model';
import {Deserializable} from './deserializable.model';
import { Seat } from './seat.model';
import { from } from 'rxjs';
import { Type } from '@angular/core';

export class Booking implements Deserializable{

    public id : String;
    public location : String;
    public fare : number;
    public noOfPassengers : number;
    public bus : Bus = new Bus;
    public seats : Seat[];
    public bookingStatus :string

    deserialize(input: any){
        // Assign input to our object BEFORE deserialize our bus to prevent already deserialized buses from being overwritten.
        Object.assign(this, input);
        return this;
      }
}
