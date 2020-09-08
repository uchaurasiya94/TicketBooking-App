import { Injectable } from '@angular/core';
import { Bus } from '../models/bus.model';

@Injectable()
export class MessagingService {
    storedData: any;

    sendMessage(message: any) {
        this.storedData = message;
    }

    getMessage() {
        return this.storedData;
    }
}