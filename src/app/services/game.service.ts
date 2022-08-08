import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ScoreService } from './score.service';

import { Frame } from '../models/game.model';
import { Score } from '../models/score.model';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    playerName: string = '';
    isGameOver: boolean = false;
    round: number = 0;
    roll: number = 1;
    allRoles: number[] = [];

    private _scoreboard = new BehaviorSubject<Frame[]>([]);
    scoreboard: Observable<Frame[]> = this._scoreboard.asObservable();

    constructor(private scoreService: ScoreService, private router: Router) {
        this.initGame();
    }

    initGame(): void {
        this.playerName = '';
        this.isGameOver = false;
        this.round = 0;
        this.roll = 1;
        this.allRoles = [];

        this.initScoreBoard();
    }

    private initScoreBoard(): void {
        const scoreboard: Frame[] = [];
        for (let i = 0; i < 10; i++) {
            scoreboard[i] = new Frame();
        }

        this._scoreboard.next(scoreboard);
    }

    throwBall(pins: number): void {
        const updatedScoreboard = [...this._scoreboard.value];

        const currentFrame: Frame = updatedScoreboard[this.round];
        this.handleRoll(pins, currentFrame, updatedScoreboard);

        this._scoreboard.next(updatedScoreboard);

        if (this.round === 10) this.handleGameOver();
    }

    private handleRoll(pins: number, currentFrame: Frame, updatedScoreboard: Frame[]): void {
        switch (this.roll) {
            case 1:
                currentFrame.firstRoll = pins;

                if (pins === 10) currentFrame.bonusType = 'STRIKE';
                break;
            case 2:
                currentFrame.secondRoll = pins;

                if (pins === 10) currentFrame.bonusType = 'STRIKE';
                if (<number>currentFrame.firstRoll + pins === 10) currentFrame.bonusType = 'SPARE';
                break;
            case 3:
                currentFrame.thirdRoll = pins;
                break;
        }

        this.allRoles.push(pins);
        this.calcFrameScores(updatedScoreboard);

        if (this.roll < 3 && ((this.roll === 1 && pins !== 10) || (this.round === 9 && currentFrame.bonusType))) {
            this.roll++;
            return;
        }

        this.roll = 1;
        this.round++;
    }

    private calcFrameScores(updatedScoreboard: Frame[]): void {
        let allRolesIndex = 0;
        let totalScore = 0;

        for (let i = 0; i < updatedScoreboard.length; i++) {
            const frame = updatedScoreboard[i];

            switch (frame.bonusType) {
                case 'SPARE':
                    totalScore += this.spareScore(allRolesIndex);
                    allRolesIndex += 2;

                    break;
                case 'STRIKE':
                    totalScore += this.strikeScore(allRolesIndex);
                    allRolesIndex++;

                    break;
                default:
                    totalScore += this.regularScore(allRolesIndex);
                    allRolesIndex += 2;
            }

            if (isNaN(totalScore)) break;

            frame.result = totalScore;
        }
    }

    private spareScore(index: number): number {
        return this.allRoles[index] + this.allRoles[index + 1] + this.allRoles[index + 2];
    }

    private strikeScore(index: number): number {
        return this.allRoles[index] + this.allRoles[index + 1] + this.allRoles[index + 2];
    }

    private regularScore(index: number): number {
        return this.allRoles[index] + this.allRoles[index + 1];
    }

    private handleGameOver(): void {
        const finalScore: number = <number>this._scoreboard.value[9].result;

        this.isGameOver = true;
        alert(`Your final score is: ${finalScore}`);

        this.scoreService.addScore(new Score(this.playerName, finalScore)).subscribe((res: any) => {});
        this.router.navigate(['/scores']);
    }
}
