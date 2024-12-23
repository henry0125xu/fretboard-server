import { mapMIDINoteNumberToPitchClass } from "../utils/noteUtils";

export class Fret {
  public midiNoteNumber: number = 60;

  public get pitchClass() {
    return mapMIDINoteNumberToPitchClass(this.midiNoteNumber);
  }

  public isPressed: boolean = false;

  public toJSON() {
    return {
      midiNoteNumber: this.midiNoteNumber,
      pitchClass: this.pitchClass,
      isPressed: this.isPressed,
    };
  }
}
