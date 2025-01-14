export type PressStrategyType = "none" | "pitch-class";

export interface PressStrategy {
  type: PressStrategyType;
  state: any;
}

export class NonePressStrategy implements PressStrategy {
  public readonly type = "none";
  public readonly state = null;
}

export class PitchClassPressStrategy implements PressStrategy {
  public readonly type = "pitch-class";
  public readonly state: boolean[];
  public constructor() {
    this.state = Array(12).fill(false);
  }
}
