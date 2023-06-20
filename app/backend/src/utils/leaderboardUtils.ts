import { ProjectionAlias, Sequelize } from 'sequelize';
import IQueryLB from '../Interfaces/QueryLB';

const queriesLB: IQueryLB = {
  q1: `CAST(SUM(CASE WHEN home_team_goals > away_team_goals
    THEN 3 WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)`,
  q2: 'CAST(SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)',
  q3: 'CAST(SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)',
  q4: 'CAST(SUM(CASE WHEN home_team_goals < away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)',
  q5: 'CAST(SUM(CASE WHEN home_team_goals > 0 THEN home_team_goals ELSE 0 END) AS UNSIGNED)',
  q6: 'CAST(SUM(CASE WHEN away_team_goals > 0 THEN away_team_goals ELSE 0 END) AS UNSIGNED)',
  q7: 'SUM(home_team_goals - away_team_goals)',
  q8: `ROUND((SUM(CASE WHEN home_team_goals > away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0 END) / (COUNT(home_team_id) * 3)) * 100, 2)`,
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
};

const { col, literal, fn } = Sequelize;

const sequelizeAtt = [
  [col('homeTeam.team_name'), 'name'],
  [literal(queriesLB.q1), 'totalPoints'],
  [fn('COUNT', col('home_team_id')), 'totalGames'],
  [literal(queriesLB.q2), 'totalVictories'],
  [literal(queriesLB.q3), 'totalDraws'],
  [literal(queriesLB.q4), 'totalLosses'],
  [literal(queriesLB.q5), 'goalsFavor'],
  [literal(queriesLB.q6), 'goalsOwn'],
  [literal(queriesLB.q7), 'goalsBalance'],
  [literal(queriesLB.q8), 'efficiency'],
] as unknown as ProjectionAlias[];

interface ISortLB {
  totalPoints: number;
  totalVictories: number;
  goalsBalance: string;
  goalsFavor: number;
}

const sortLB = (a: ISortLB, b: ISortLB) => (
  b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || parseInt(b.goalsBalance, 10) - parseInt(a.goalsBalance, 10)
    || b.goalsFavor - a.goalsFavor
    || 0
);

export {
  queriesLB,
  sequelizeAtt,
  sortLB,
};
