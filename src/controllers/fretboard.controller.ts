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
      const fretboard = await this.service.resetFretboard();
      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }

  public async updateOpenString(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stringId = req.params.stringId;
      const { openString } = req.body;

      const fretboard = await this.service.updateOpenString(
        stringId,
        openString
      );

      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }

  public async updateNumFrets(req: Request, res: Response, next: NextFunction) {
    try {
      const { numFrets } = req.body;
      const fretboard = await this.service.updateNumFrets(numFrets);
      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }
}
