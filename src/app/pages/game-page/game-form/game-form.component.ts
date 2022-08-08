import { Component, OnInit } from '@angular/core';
import { BowlingService } from 'src/app/services/bowling.service';

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html',
    styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit {
    pinsInput: string = '';

    constructor(private bowlingService: BowlingService) {}

    ngOnInit(): void {}

    handleThrowBall(): void {
        const pins: number = parseInt(this.pinsInput.trim());

        this.bowlingService.throwBall(pins);
    }
}
