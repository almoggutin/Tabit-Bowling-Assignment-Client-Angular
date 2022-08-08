export type BonusType = 'STRIKE' | 'SPARE' | null;

export type FrameRollType = number | null;

export interface IFrame {
    firstRoll: FrameRollType;
    secondRoll: FrameRollType;
    thirdRoll: FrameRollType;
    result: FrameRollType;
    bonusType: BonusType;
}

export class Frame implements IFrame {
    constructor(
        public firstRoll: FrameRollType = null,
        public secondRoll: FrameRollType = null,
        public thirdRoll: FrameRollType = null,
        public result: FrameRollType = null,
        public bonusType: BonusType = null
    ) {}
}
