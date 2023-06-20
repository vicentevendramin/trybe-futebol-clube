import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { sequelizeAtt, queriesLB } from '../utils/leaderboardUtils';

class LeaderboardService {
  constructor(
    private matchesModel: ModelStatic<MatchesModel>,
  ) { }

  async getHomePage(): Promise<object> {
    const promiseResult = await Promise.all(
      queriesLB.ids.map(async (id) => {
        const result = await this.matchesModel.findAll({
          where: { homeTeamId: id, inProgress: false },
          include:
            [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['teamName', 'id'] } }],
          attributes: sequelizeAtt,
          group: ['home_team_id', 'name'],
        });

        return result;
      }),
    );

    const result = promiseResult.flatMap(([obj]) => obj); // remove objs from arr

    return result as object;
  }
}

export default LeaderboardService;
