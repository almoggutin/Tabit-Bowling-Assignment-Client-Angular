import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from 'src/app/services/game.service';

@Component({
    selector: 'app-player-details-form',
    templateUrl: './player-details-form.component.html',
    styleUrls: ['./player-details-form.component.scss'],
})
export class PlayerDetailsFormComponent implements OnInit {
    playerName: string = '';

    constructor(private router: Router, private gameService: GameService) {}

    ngOnInit(): void {}

    handleSubmit(): void {
        this.gameService.playerName = this.playerName.trim();
        this.router.navigate(['/game']);
    }
}
