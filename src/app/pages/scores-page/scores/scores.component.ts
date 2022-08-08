import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Score } from 'src/app/models/score.model';

@Component({
    selector: 'app-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
    scores!: Score[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe(({ scores }: any): void => {
            this.scores = scores;
        });
    }
}
