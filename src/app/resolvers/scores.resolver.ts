import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';

import { ScoreService } from '../services/score.service';

@Injectable({
    providedIn: 'root',
})
export class ScoresResolver implements Resolve<boolean> {
    constructor(public scoreService: ScoreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.scoreService.getScores().pipe(map((res: any): Observable<any> => res.data));
    }
}
