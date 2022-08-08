import { Component, OnInit, Input } from '@angular/core';

import { Score } from 'src/app/models/score.model';

@Component({
    selector: 'app-score-item',
    templateUrl: './score-item.component.html',
    styleUrls: ['./score-item.component.scss'],
})
export class ScoreItemComponent implements OnInit {
    @Input() score!: Score;

    constructor() {}

    ngOnInit(): void {}
}
