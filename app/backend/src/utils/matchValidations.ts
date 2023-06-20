import INewMatch from '../Interfaces/NewMatch';

const validateMatch = (match: INewMatch) => {
  if (match.homeTeamId === match.awayTeamId) {
    return {
      status: 422,
      message: 'It is not possible to create a match with two equal teams',
    };
  }

  const teamIdValidations = match.homeTeamId > 16
    || match.homeTeamId <= 0
    || match.awayTeamId > 16
    || match.awayTeamId <= 0;

  if (teamIdValidations) return { status: 404, message: 'There is no team with such id!' };
};

export default validateMatch;
