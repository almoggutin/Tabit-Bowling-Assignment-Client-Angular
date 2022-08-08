import { Component, DoCheck, Input, OnInit } from '@angular/core';

import { Frame } from 'src/app/models/game.model';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
    @Input() frame!: Frame;
    @Input() frameIndex: number = 0;

    constructor() {}

    ngOnInit(): void {}

    isSpareOrStrike(): boolean {
        return this.isSpare() || this.isStrike();
    }

    isSpare(): boolean {
        if (this.frame.secondRoll == null) return false;

        return <number>this.frame.firstRoll + <number>this.frame.secondRoll === 10;
    }

    isStrike(): boolean {
        return this.frame.firstRoll === 10;
    }
}
