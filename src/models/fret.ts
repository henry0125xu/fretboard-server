import { EnharmonicFullNotes, MIDI_C4 } from "./note";

export class Fret {
  public midiNoteNumber: number = MIDI_C4;
  public pitchClass: number = 0;
  public enharmonicNotes: EnharmonicFullNotes = ["C4"];
  public isPressed: boolean = false;
}
