import { ModelStatic } from 'sequelize';
import IMatches from '../Interfaces/Matches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

class MatchesService {
  constructor(
    private matchesModel: ModelStatic<Matches>,
  ) { }

  public async getAllMatches(): Promise<IMatches[]> {
    const matches = {
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    };
    return this.matchesModel.findAll(matches);
  }

  public async getProgressMatches(inProgress: boolean): Promise<IMatches[]> {
    const matches = {
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    };

    return this.matchesModel.findAll(matches);
  }
}

export default MatchesService;
