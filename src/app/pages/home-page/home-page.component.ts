import { Component, OnInit } from '@angular/core';
import { BowlingService } from 'src/app/services/bowling.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    constructor(private bowlingService: BowlingService) {}

    ngOnInit(): void {}
}
