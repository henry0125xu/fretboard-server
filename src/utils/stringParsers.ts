import { FullNote, FULL_NOTE_REGEX } from "../models/note";

export function parseNumber(input: string): number {
  const result = Number(input);
  if (isNaN(result)) {
    throw new Error(`Invalid format: ${input}`);
  }
  return result === -0 ? 0 : result;
}

export function parseFullNote(input: string): FullNote {
  const match = input.match(FULL_NOTE_REGEX);
  if (!match) {
    throw new Error(`Invalid format: ${input}`);
  }
  return input as FullNote;
}
