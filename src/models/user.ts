import { Fretboard } from "./fretboard";
import { PressStrategy } from "./pressStrategy";

export interface User {
  id: string;
  fretboard: Fretboard;
  pressStrategy: PressStrategy;
}
