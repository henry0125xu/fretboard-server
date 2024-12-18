export class Fret {
  public readonly noteCode: number;

  public constructor(noteCode: number) {
    this.noteCode = noteCode;
  }

  private _isPressed: boolean = false;
  public get isPressed(): boolean {
    return this._isPressed;
  }

  public toJSON() {
    return {
      noteCode: this.noteCode,
      isPressed: this._isPressed,
    };
  }

  public press() {
    this._isPressed = true;
  }

  public release() {
    this._isPressed = false;
  }
}
