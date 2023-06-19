const matchesMock = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 12,
    awayTeamGoals: 3,
    inProgress: true,
    homeTeam: {
      teamName: 'Avaí/Kindermann',
    },
    awayTeam: {
      teamName: 'Palmeiras',
    }
  },
  {
    id: 2,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 3,
    inProgress: false,
    homeTeam: {
      teamName: 'Avaí/Kindermann',
    },
    awayTeam: {
      teamName: 'Grêmio',
    }
  },
];

const matchesInProgress = [
  {
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 12,
    awayTeamGoals: 3,
    inProgress: true,
  },
];

const matches = [
  {
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 12,
    awayTeamGoals: 3,
    inProgress: true,
  },
  {
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 3,
    inProgress: false,
  }
];

const jwtPayload = {
  email: 'tryber@betrybe.com',
  role: 'user',
};

const goals = {
  homeTeamGoals: 7,
  awayTeamGoals: 1,
};

export {
  matchesMock,
  matchesInProgress,
  matches,
  goals,
  jwtPayload,
};
