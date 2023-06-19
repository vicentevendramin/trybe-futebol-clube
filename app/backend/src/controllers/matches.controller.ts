import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(
    private matchesService: MatchesService,
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matches = await this.matchesService.getAllMatches();
      return res.status(200).json(matches);
    }

    if (inProgress === 'true') {
      const inProgressMatches = await this.matchesService.getProgressMatches(true);
      return res.status(200).json(inProgressMatches);
    }

    const finishedMatches = await this.matchesService.getProgressMatches(false);
    return res.status(200).json(finishedMatches);
  }
}

export default MatchesController;
