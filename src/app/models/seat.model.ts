import {Deserializable} from './deserializable.model';

export class Seat implements Deserializable{
    public seatNo : String;
    public fare : number;

    // deserialize(input: any): this {
    //     return Object.assign(this, input);
    //   }
}
