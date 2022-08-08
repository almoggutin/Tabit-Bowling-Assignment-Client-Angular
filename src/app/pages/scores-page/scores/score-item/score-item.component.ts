import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-score-item',
    templateUrl: './score-item.component.html',
    styleUrls: ['./score-item.component.scss'],
})
export class ScoreItemComponent implements OnInit {
    @Input() score!: any;

    constructor() {}

    ngOnInit(): void {}
}
