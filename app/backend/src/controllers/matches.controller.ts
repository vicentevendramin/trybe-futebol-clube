import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import validateMatch from '../utils/matchValidations';

class MatchesController {
  constructor(
    private matchesService: MatchesService,
  ) { }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
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

  async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await this.matchesService.finishMatch(Number(id));

    return response ? res.status(200).json({ message: 'Finished' })
      : res.status(404).json({ message: 'Team does not exist' });
  }

  async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await this.matchesService.updateMatch(Number(id), req.body);

    return response ? res.status(200).json({ message: 'Updated' })
      : res.status(400).json({ message: 'All fields must be filled' });
  }

  async createMatch(req: Request, res: Response): Promise<Response> {
    const validations = validateMatch(req.body);

    if (validations) return res.status(validations.status).json({ message: validations.message });

    const match = await this.matchesService.createMatch(req.body);

    return res.status(201).json(match);
  }
}

export default MatchesController;
