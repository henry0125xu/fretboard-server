import { Fretboard } from "../models/fretboard";

export class FretboardService {
  public async getDefaultFretboard(): Promise<Fretboard> {
    return new Fretboard(["E4", "B3", "G3", "D3", "A2", "E2"], 21);
  }
}
