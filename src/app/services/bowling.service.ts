import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Frame } from '../models/game.model';

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

    constructor() {
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

        const currentFrame = updatedScoreboard[this.round];
        this.roll === 1
            ? this.handleFirstRound(pins, currentFrame, prevFrame)
            : this.handleSecondRound(pins, currentFrame, prevFrame);

        if (prevFrame?.bonusType && currentFrame.bonusType !== 'STRIKE') this.updateFrameBonus(prevFrame, currentFrame);

        this._scoreboard.next(updatedScoreboard);
    }

    private handleFirstRound(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        if (pins === 10) {
            this.handleStrike(pins, currentFrame, prevFrame);

            return;
        }

        currentFrame.firstRoll = pins;

        if (prevFrame?.bonusType) this.updateFrameBonus(prevFrame, currentFrame);
        this.roll = 2;
    }

    private handleSecondRound(pins: number, currentFrame: Frame, prevFrame: Frame): void {
        currentFrame.secondRoll = pins;
        currentFrame.result = <number>currentFrame.firstRoll + pins;

        if (prevFrame) currentFrame.result += <number>prevFrame.result;

        if (<number>currentFrame.firstRoll + pins === 10) {
            currentFrame.bonusType = 'SPARE';
        }

        if (this.round === 9) {
            this.roll++;
            return;
        }

        this.roll = 1;
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

                break;
            }
        }

        prevFrame.bonusType = null;
    }
}
