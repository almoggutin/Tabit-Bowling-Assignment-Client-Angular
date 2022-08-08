import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    @Input() type: string = 'button';
    @Input() disabled: boolean | null = false;
    @Input() buttonText!: string;

    constructor() {}

    ngOnInit(): void {}
}
