import { ModelStatic } from 'sequelize';
import ITeams from '../Interfaces/Teams';
import Teams from '../database/models/TeamsModel';

class TeamsService {
  constructor(
    private teamsModel: ModelStatic<Teams>,
  ) { }

  public async getAllTeams(): Promise<ITeams[]> {
    return this.teamsModel.findAll();
  }

  public async getTeamById(id: number): Promise<ITeams | boolean> {
    const response = await this.teamsModel.findOne({ where: { id } });

    if (!response) {
      return false;
    }
    return response;
  }
}

export default TeamsService;
