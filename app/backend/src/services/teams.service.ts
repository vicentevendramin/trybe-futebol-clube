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
}

export default TeamsService;
