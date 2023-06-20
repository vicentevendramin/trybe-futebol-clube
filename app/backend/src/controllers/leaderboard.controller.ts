import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import { sortLB } from '../utils/leaderboardUtils';

class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) { }

  async getHomePage(_req: Request, res: Response): Promise<Response> {
    const response = await this.leaderboardService.getHomePage();

    const result = JSON.parse(JSON.stringify(response));

    result.sort(sortLB);

    return res.status(200).json(result);
  }
}

export default LeaderboardController;
