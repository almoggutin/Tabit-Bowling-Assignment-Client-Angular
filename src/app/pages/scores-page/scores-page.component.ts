import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BowlingService } from 'src/app/services/bowling.service';

@Component({
    selector: 'app-scores-page',
    templateUrl: './scores-page.component.html',
    styleUrls: ['./scores-page.component.scss'],
})
export class ScoresPageComponent implements OnInit {
    constructor(private router: Router, private bowlingService: BowlingService) {}

    ngOnInit(): void {}

    handleNewGame(): void {
        this.router.navigate(['/']);
    }
}
