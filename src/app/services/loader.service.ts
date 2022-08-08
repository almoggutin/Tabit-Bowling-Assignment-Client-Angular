import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private _isLoading = new Subject<boolean>();
    isLoading: Observable<boolean> = this._isLoading.asObservable();

    constructor() {}

    show(): void {
        this._isLoading.next(true);
    }

    hide(): void {
        setTimeout(() => {
            this._isLoading.next(false);
        }, 2000);
    }
}
