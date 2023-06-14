import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(
    private teamsService: TeamsService,
  ) { }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const response = await this.teamsService.getAllTeams();
    return res.status(200).json(response);
  }
}

export default TeamsController;
