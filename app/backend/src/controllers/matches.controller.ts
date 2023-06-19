import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(
    private matchesService: MatchesService,
  ) { }

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const response = await this.matchesService.getAllMatches();
    return res.status(200).json(response);
  }
}

export default MatchesController;
