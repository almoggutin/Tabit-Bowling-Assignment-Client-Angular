import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Score } from '../models/score.model';

@Injectable({
    providedIn: 'root',
})
export class ScoreService {
    constructor(private http: HttpClient) {}

    getScores(): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}/scores`, {
            params: {
                limit: 5,
            },
        });
    }

    addScore(score: Score): Observable<any> {
        return this.http.post<any>(`${environment.apiURL}/scores/new`, score);
    }
}
