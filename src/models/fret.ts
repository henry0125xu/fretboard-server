export class Fret {
  public class: number = 0;
  public isPressed: boolean = false;

  public toJSON() {
    return {
      class: this.class,
      isPressed: this.isPressed,
    };
  }
}
