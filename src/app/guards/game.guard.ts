import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take, Observable } from 'rxjs';

import { BowlingService } from '../services/bowling.service';

@Injectable({
    providedIn: 'root',
})
export class GameGuard implements CanActivate {
    constructor(private router: Router, private bowlingService: BowlingService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const playerName: string = this.bowlingService.playerName;
        const isGameOver: boolean = this.bowlingService.isGameOver;

        if (playerName === '' || isGameOver === true) return this.router.createUrlTree(['./']);

        return true;
    }
}
