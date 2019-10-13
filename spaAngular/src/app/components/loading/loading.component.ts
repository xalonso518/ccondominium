import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})

// loading component
export class LoadingComponent implements OnDestroy {
    subscription: Subscription;
    currentStyleLoading = 'loading-inactive';
    /** loading ctor */
    constructor(private loadingService: LoadingService) {
        this.createServiceSubscription();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    createServiceSubscription() {
        let timer: any;
        timer = 5;

        this.subscription = this.loadingService.getMessage().subscribe(
            show => setTimeout(() => {
                if (show) {
                    this.currentStyleLoading = 'loading-active';
                } else {
                    this.currentStyleLoading = 'loading-inactive';
                }
            }, 0)

        );
    }
}
