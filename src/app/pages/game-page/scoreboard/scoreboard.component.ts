import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BowlingService } from 'src/app/services/bowling.service';

import { Frame } from 'src/app/models/game.model';

@Component({
    selector: 'app-scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit, OnDestroy {
    scoreboardSub!: Subscription;

    pinsInput: string = '';
    scoreboard: any = [];
    round = 0;

    constructor(private bowlingService: BowlingService) {}

    ngOnInit(): void {
        this.scoreboardSub = this.bowlingService.scoreboard.subscribe((scoreboard: Frame[]): void => {
            this.scoreboard = scoreboard;
        });
    }

    ngOnDestroy(): void {
        this.scoreboardSub.unsubscribe();
    }
}
