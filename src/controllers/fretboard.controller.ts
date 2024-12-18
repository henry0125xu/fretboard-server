import { Request, Response, NextFunction } from "express";
import { FretboardService } from "../services/fretboard.service";

const service = new FretboardService();

export class FretboardController {
  public async getDefaultFretboard(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fretBoard = await service.getDefaultFretboard();
      res.status(200).json({ fretBoard });
    } catch (err) {
      next(err);
    }
  }
}
