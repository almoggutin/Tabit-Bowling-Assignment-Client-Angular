import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take, Observable } from 'rxjs';

import { GameService } from '../services/game.service';

@Injectable({
    providedIn: 'root',
})
export class GameGuard implements CanActivate {
    constructor(private router: Router, private gameService: GameService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const playerName: string = this.gameService.playerName;
        const isGameOver: boolean = this.gameService.isGameOver;

        if (playerName === '' || isGameOver === true) return this.router.createUrlTree(['./']);

        return true;
    }
}
