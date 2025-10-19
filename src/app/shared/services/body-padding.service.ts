import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BodyPaddingService {
    private readonly HEADER_HEIGHT = 80;

    constructor(private router: Router) {
        this.initializeRouteListener();
    }

    private initializeRouteListener(): void {
        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe((event) => {
                this.updateBodyPadding(event.url);
            });
    }

    private updateBodyPadding(url: string): void {
        const body = document.body;

        // Remove existing padding classes
        body.classList.remove('no-header-padding', 'with-header-padding');

        // Check if current route is auth route (login or register)
        if (url.includes('/login') || url.includes('/register')) {
            body.classList.add('no-header-padding');
        } else {
            body.classList.add('with-header-padding');
        }
    }

    public setNoPadding(): void {
        document.body.classList.remove('with-header-padding');
        document.body.classList.add('no-header-padding');
    }

    public setWithPadding(): void {
        document.body.classList.remove('no-header-padding');
        document.body.classList.add('with-header-padding');
    }
}
