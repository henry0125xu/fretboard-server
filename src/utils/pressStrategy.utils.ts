import * as ps from "../models/pressStrategy";
import { Fretboard } from "../models/fretboard";
import { PressStrategy } from "../models/pressStrategy";
import { forEachFret } from "./fretboard.utils";

export const initializePressStrategy = (
  type: ps.PressStrategyType
): ps.PressStrategy => {
  switch (type) {
    case "none":
      return new ps.NonePressStrategy();

    case "pitch-class":
      return new ps.PitchClassPressStrategy();

    default:
      throw new Error("Not implemented yet");
  }
};

export const press = (
  fretboard: Fretboard,
  pressStrategy: PressStrategy
): void => {
  switch (pressStrategy.type) {
    case "none":
      releaseAllFrets(fretboard);
      break;

    case "pitch-class":
      pressPitchClass(fretboard, pressStrategy as ps.PitchClassPressStrategy);
      break;

    default:
      throw new Error("Not implemented yet");
  }
};

const releaseAllFrets = (fretboard: Fretboard): void => {
  forEachFret(fretboard, (fret) => (fret.isPressed = false));
};

const pressPitchClass = (
  fretboard: Fretboard,
  pressStrategy: ps.PitchClassPressStrategy
): void => {
  forEachFret(
    fretboard,
    (fret) => (fret.isPressed = pressStrategy.state[fret.pitchClass])
  );
};
