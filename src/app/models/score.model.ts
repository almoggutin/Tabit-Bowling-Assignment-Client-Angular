export interface IScore {
    id?: number;
    name: string;
    score: number;
}

export class Score implements IScore {
    constructor(public name: string, public score: number) {}
}
