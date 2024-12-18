import { Fretboard } from "../models/fretboard";
import { Accidental, Note, Octave } from "../models/note";
import { mapToFullNote } from "../utils/noteUtils";

export class FretboardService {
  public async getDefaultFretboard(): Promise<Fretboard> {
    return new Fretboard(6, 21, [
      mapToFullNote(Note.E, Accidental.Natural, Octave.Octave4),
      mapToFullNote(Note.B, Accidental.Natural, Octave.Octave3),
      mapToFullNote(Note.G, Accidental.Natural, Octave.Octave3),
      mapToFullNote(Note.D, Accidental.Natural, Octave.Octave3),
      mapToFullNote(Note.A, Accidental.Natural, Octave.Octave2),
      mapToFullNote(Note.E, Accidental.Natural, Octave.Octave2),
    ]);
  }
}
