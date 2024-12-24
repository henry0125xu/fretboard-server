import { Request, Response, NextFunction } from "express";
import { FretboardService } from "../services/fretboard.service";

export class FretboardController {
  private readonly service: FretboardService;
  constructor(service: FretboardService = new FretboardService()) {
    this.service = service;
  }

  public async getFretboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.sessionID;
      const fretboard = await this.service.getFretboard(userId);
      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }

  public async resetFretboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.sessionID;
      const fretboard = await this.service.resetFretboard(userId);
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
      const userId = req.sessionID;
      const stringId = req.params.stringId;
      const { openString } = req.body;

      const fretboard = await this.service.updateOpenString(
        userId,
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
      const userId = req.sessionID;
      const { numFrets } = req.body;
      const fretboard = await this.service.updateNumFrets(userId, numFrets);
      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }
}
