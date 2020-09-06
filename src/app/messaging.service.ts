import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Bus } from './models/bus.model';

@Injectable()
export class MessagingService {
    private subject = new Subject<any>();

    sendMessage(message: Array<Bus>) {
        this.subject.next( message );
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}