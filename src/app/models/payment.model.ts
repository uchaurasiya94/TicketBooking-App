import {Deserializable} from './deserializable.model';
export class Payment  implements Deserializable{

    public id: string;
    public cardholderName : string;
    public cardNumber : number;
    public expiryDate : string;
    public cvv : number;
    public totalAmount : number;


    deserialize(input: any){
        // Assign input to our object BEFORE deserialize our bus to prevent already deserialized buses from being overwritten.
        Object.assign(this, input);
        return this;
      }

}
