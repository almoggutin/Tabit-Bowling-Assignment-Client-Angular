import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from 'src/app/services/game.service';

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

    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        this.scoreboardSub = this.gameService.scoreboard.subscribe((scoreboard: Frame[]): void => {
            this.scoreboard = scoreboard;
        });
    }

    ngOnDestroy(): void {
        this.scoreboardSub.unsubscribe();
    }
}
