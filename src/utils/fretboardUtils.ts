import { Fretboard } from "../models/fretboard";
import { setFretMIDINoteNumbersForString } from "./stringUtils";

export function setFretMIDINoteNumbersForFretboard(fretboard: Fretboard) {
  fretboard.strings.forEach((string) =>
    setFretMIDINoteNumbersForString(string)
  );
}
