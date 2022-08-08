import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
    scores: any = new Array(5).fill({ name: 'almog gutin', score: 100 });

    constructor() {}

    ngOnInit(): void {}
}
