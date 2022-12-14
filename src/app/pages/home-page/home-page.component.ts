import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    constructor(private gameService: GameService) {}

    ngOnInit(): void {
        this.gameService.initGame();
    }
}
