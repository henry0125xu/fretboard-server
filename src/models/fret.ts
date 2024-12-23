import { EnharmonicFullNotes, MIDI_C4 } from "./note";
import {
  mapMIDINoteNumberToPitchClass,
  mapMIDINoteNumberToEnharmonicFullNotes,
} from "../utils/noteUtils";

export class Fret {
  public midiNoteNumber: number = MIDI_C4;

  public get pitchClass(): number {
    return mapMIDINoteNumberToPitchClass(this.midiNoteNumber);
  }

  public get enharmonicNotes(): EnharmonicFullNotes {
    return mapMIDINoteNumberToEnharmonicFullNotes(this.midiNoteNumber);
  }

  public isPressed: boolean = false;

  public toJSON() {
    return {
      midiNoteNumber: this.midiNoteNumber,
      pitchClass: this.pitchClass,
      enharmonicNotes: this.enharmonicNotes,
      isPressed: this.isPressed,
    };
  }
}
