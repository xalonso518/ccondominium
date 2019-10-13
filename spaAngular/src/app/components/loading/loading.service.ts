import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingService {
    public spinnerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

    constructor() {

    }

    show() {
        this.spinnerSubject.next(true);
    }

    hide() {
        this.spinnerSubject.next(false);
    }

    getMessage(): Observable<any> {
        return this.spinnerSubject.asObservable();
    }
}
