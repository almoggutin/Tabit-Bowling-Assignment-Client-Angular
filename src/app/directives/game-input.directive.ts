import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, of, take } from 'rxjs';

import { BowlingService } from '../services/bowling.service';

import { Frame } from '../models/game.model';
import { Observable } from 'rxjs';

@Directive({
    selector: '[appGameInput]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => GameInputDirective), multi: true }],
})
export class GameInputDirective implements AsyncValidator {
    constructor(private bowlingService: BowlingService) {}

    validate(
        control: AbstractControl<any, any>
    ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
        const pinsInput = control.value;
        if (pinsInput === '') return of({ gameInput: '' });

        const pins: number = +pinsInput;
        const { round, roll } = this.bowlingService;

        if (roll !== 2 && (isNaN(pins) || pins < 0 || pins > 10))
            return of({ gameInput: 'Please enter a number between 0-10' });

        return this.bowlingService.scoreboard.pipe(
            take(1),
            map((scoreboard: Frame[]) => {
                if (roll === 2 && <number>scoreboard[round].firstRoll + pins > 10)
                    return {
                        gameInput: `Please enter a number between 0-${10 - <number>scoreboard[round].firstRoll}`,
                    };

                return null;
            })
        );
    }
}
