import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-scores-page',
    templateUrl: './scores-page.component.html',
    styleUrls: ['./scores-page.component.scss'],
})
export class ScoresPageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    handleNewGame(): void {
        this.router.navigate(['/']);
    }
}
