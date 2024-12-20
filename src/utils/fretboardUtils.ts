import { Fretboard } from "../models/fretboard";
import { setFretClassesForString } from "./stringUtils";

export function setFretClassesForFretboard(fretboard: Fretboard) {
  fretboard.strings.forEach((string) => setFretClassesForString(string));
}
