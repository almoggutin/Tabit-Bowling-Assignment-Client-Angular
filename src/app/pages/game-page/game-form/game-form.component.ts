import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html',
    styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit {
    pinsInput: string = '';

    constructor(private gameService: GameService) {}

    ngOnInit(): void {}

    handleThrowBall(): void {
        const pins: number = parseInt(this.pinsInput.trim());

        this.gameService.throwBall(pins);
    }
}
