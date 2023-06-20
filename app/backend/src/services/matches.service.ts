import { ModelStatic } from 'sequelize';
import IMatches from '../Interfaces/Matches';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IScore from '../Interfaces/Score';
import INewMatch from '../Interfaces/NewMatch';

class MatchesService {
  constructor(
    private matchesModel: ModelStatic<Matches>,
  ) { }

  async getAllMatches(): Promise<IMatches[]> {
    const matches = {
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    };
    return this.matchesModel.findAll(matches);
  }

  async getProgressMatches(inProgress: boolean): Promise<IMatches[]> {
    const matches = {
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    };

    return this.matchesModel.findAll(matches);
  }

  async finishMatch(id: number) {
    const [status] = await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return status;
  }

  async updateMatch(id: number, newScore: IScore) {
    const [status] = await this.matchesModel.update(newScore, { where: { id, inProgress: true } });
    return status;
  }

  async createMatch(newMatch: INewMatch) {
    const match = { ...newMatch, inProgress: true };
    const { dataValues: { id } } = await this.matchesModel.create(match);
    return this.matchesModel.findOne({ where: { id } });
  }
}

export default MatchesService;
