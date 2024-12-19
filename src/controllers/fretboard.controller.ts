import { Request, Response, NextFunction } from "express";
import { FretboardService } from "../services/fretboard.service";

// const service: FretboardService = new FretboardService()

export class FretboardController {
  private readonly service: FretboardService;
  constructor(service: FretboardService = new FretboardService()) {
    this.service = service;
  }

  public async getDefaultFretboard(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fretboard = await this.service.getDefaultFretboard();
      res.status(200).json({ fretboard: fretboard });
    } catch (err) {
      next(err);
    }
  }
}
