import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ScoreService } from './score.service';

import { Frame } from '../models/game.model';
import { Score } from '../models/score.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class BowlingService {
    playerName: string = '';
    isGameOver: boolean = false;
    round: number = 0;
    roll: number = 1;

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

        let prevFrame!: Frame;
        if (this.round > 0) prevFrame = updatedScoreboard[this.round - 1];

        const currentFrame: Frame = updatedScoreboard[this.round];
        this.handleRoll(pins, currentFrame, prevFrame);

        this._scoreboard.next(updatedScoreboard);

        if (this.round === 10) this.handleGameOver();
    }

    private handleRoll(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        switch (this.roll) {
            case 1: {
                this.handleFirstlRoll(pins, currentFrame, prevFrame);
                break;
            }
            case 2: {
                this.handleSecondRoll(pins, currentFrame, prevFrame);
                break;
            }
            case 3: {
                this.handleThirdRoll(pins, currentFrame, prevFrame);
                break;
            }
        }
    }

    private handleFirstlRoll(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        if (pins === 10) {
            this.handleStrike(pins, currentFrame, prevFrame);

            return;
        }

        currentFrame.firstRoll = pins;

        if (prevFrame?.bonusType) this.updateFrameBonus(prevFrame, currentFrame);
        this.roll++;
    }

    private handleSecondRoll(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        currentFrame.secondRoll = pins;
        currentFrame.result = <number>currentFrame.firstRoll + pins;

        if (prevFrame?.bonusType) this.updateFrameBonus(prevFrame, currentFrame);

        if (prevFrame) currentFrame.result += <number>prevFrame.result;

        if (<number>currentFrame.firstRoll + pins === 10) {
            currentFrame.bonusType = 'SPARE';
        }

        if (this.round === 9 && currentFrame.bonusType) {
            this.roll++;

            return;
        }

        this.roll = 1;
        this.round++;
    }

    private handleThirdRoll(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        currentFrame.thirdRoll = pins;
        currentFrame.result = <number>currentFrame.result + pins;

        this.round++;
    }

    private handleStrike(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        currentFrame.firstRoll = pins;
        currentFrame.bonusType = 'STRIKE';
        currentFrame.result = 10;

        if (prevFrame) {
            this.updateFrameBonus(prevFrame, currentFrame);
            currentFrame.result = currentFrame.firstRoll + <number>prevFrame.result;
        }

        this.round++;
    }

    private updateFrameBonus(prevFrame: Frame, currentFrame: Frame): void {
        switch (prevFrame.bonusType) {
            case 'SPARE': {
                (<number>prevFrame.result) += <number>currentFrame.firstRoll;

                prevFrame.bonusType = null;

                break;
            }
            case 'STRIKE': {
                currentFrame.secondRoll == null
                    ? ((<number>prevFrame.result) += <number>currentFrame.firstRoll)
                    : ((<number>prevFrame.result) += <number>currentFrame.result);

                if (this.roll === 2) prevFrame.bonusType = null;

                break;
            }
        }
    }

    private handleGameOver(): void {
        const finalScore: number = <number>this._scoreboard.value[9].result;

        this.isGameOver = true;
        alert(`Your final score is: ${finalScore}`);

        this.scoreService.addScore(new Score(this.playerName, finalScore)).subscribe((res: any) => {});
        this.router.navigate(['/scores']);
    }
}
