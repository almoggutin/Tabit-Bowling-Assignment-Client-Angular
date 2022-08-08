import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take, Observable } from 'rxjs';

import { BowlingService } from '../services/bowling.service';

// import { GameState } from '../models/game.model';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private bowlingService: BowlingService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // return this.bowlingService.gameState.pipe(
        //     take(1),
        //     map((gameState: GameState): boolean => {
        //         if (gameState.playerName === '') return true;

        //         if (gameState.playerName !== '' && gameState.isGameOver) return true;

        //         return false;
        //     })
        // );
        return true;
    }
}
