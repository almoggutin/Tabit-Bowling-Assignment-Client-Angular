import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BowlingService } from 'src/app/services/bowling.service';

@Component({
    selector: 'app-player-details-form',
    templateUrl: './player-details-form.component.html',
    styleUrls: ['./player-details-form.component.scss'],
})
export class PlayerDetailsFormComponent implements OnInit {
    playerName: string = '';

    constructor(private router: Router, private bowlingService: BowlingService) {}

    ngOnInit(): void {}

    handleSubmit(): void {
        this.bowlingService.playerName = this.playerName;
        this.router.navigate(['/game']);
    }
}
