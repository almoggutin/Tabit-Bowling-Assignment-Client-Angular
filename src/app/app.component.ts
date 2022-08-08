import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title: string = 'client';
    isLoading: boolean = false;
    isLoadingSub!: Subscription;

    constructor(private router: Router, private loaderService: LoaderService) {
        this.router.events.subscribe((event: Event): void => {
            if (event instanceof NavigationStart) this.loaderService.show();

            if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.loaderService.hide();
            }
        });
    }

    ngOnInit(): void {
        this.isLoadingSub = this.loaderService.isLoading.subscribe((isLoading: boolean) => {
            this.isLoading = isLoading;
        });
    }

    ngOnDestroy(): void {
        this.isLoadingSub.unsubscribe();
    }
}
