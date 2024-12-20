import { Request, Response, NextFunction } from "express";
import { FretboardService } from "../services/fretboard.service";

export class FretboardController {
  private readonly service: FretboardService;
  constructor(service: FretboardService = new FretboardService()) {
    this.service = service;
  }

  public async getFretboard(res: Response, next: NextFunction) {
    try {
      const fretboard = await this.service.getFretboard();
      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }

  public async resetFretboard(res: Response, next: NextFunction) {
    try {
      const defaultFretboard = await this.service.resetFretboard();
      res.status(200).json({ fretboard: defaultFretboard });
    } catch (err) {
      next(err);
    }
  }

  public async updateFretboardString(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stringId = req.params.stringId;
      const { openString } = req.body;

      const updatedFretboard = await this.service.updateFretboardString(
        stringId,
        openString
      );

      res.status(200).json({ fretboard: updatedFretboard });
    } catch (err) {
      next(err);
    }
  }
}
