import { Game } from './interfaces';

export const mockNcaaFootballGames: Game[] = [
    {
      id: "ncaaFootballGame1",
      teams: {
        home: {
          name: "College Team A",
          id: "collegeTeamA"
        },
        away: {
          name: "College Team B",
          id: "collegeTeamB"
        }
      },
      league: {
        name: "NCAA Football",
        alias: "NCAAF"
      },
      date: "2023-10-01",
      game: {
        date: {
          date: "2023-10-01",
          time: "12:00"
        },
        status: {
          short: "Scheduled"
        }
      }
    },
    {
      id: "ncaaFootballGame2",
      teams: {
        home: {
          name: "College Team C",
          id: "collegeTeamC"
        },
        away: {
          name: "College Team D",
          id: "collegeTeamD"
        }
      },
      league: {
        name: "NCAA Football",
        alias: "NCAAF"
      },
      date: "2023-10-02",
      game: {
        date: {
          date: "2023-10-02",
          time: "15:00"
        },
        status: {
          short: "Scheduled"
        }
      }
    }
  ];
  
export const mockNbaGames: Game[] = [
    {
      id: "nbaGame1",
      teams: {
        home: {
          name: "NBA Team A",
          id: "nbaTeamA"
        },
        away: {
          name: "NBA Team B",
          id: "nbaTeamB"
        }
      },
      league: {
        name: "NBA",
        alias: "NBA"
      },
      date: "2023-10-03",
      game: {
        date: {
          date: "2023-10-03",
          time: "19:00"
        },
        status: {
          short: "Scheduled"
        }
      }
    },
    {
      id: "nbaGame2",
      teams: {
        home: {
          name: "NBA Team C",
          id: "nbaTeamC"
        },
        away: {
          name: "NBA Team D",
          id: "nbaTeamD"
        }
      },
      league: {
        name: "NBA",
        alias: "NBA"
      },
      date: "2023-10-04",
      game: {
        date: {
          date: "2023-10-04",
          time: "21:00"
        },
        status: {
          short: "Scheduled"
        }
      }
    }
  ];
  
export const mockNcaaBasketballGames: Game[] = [
    {
      id: "ncaaBasketballGame1",
      teams: {
        home: {
          name: "College Basketball Team A",
          id: "collegeBasketballTeamA"
        },
        away: {
          name: "College Basketball Team B",
          id: "collegeBasketballTeamB"
        }
      },
      league: {
        name: "NCAA Basketball",
        alias: "NCAAB"
      },
      date: "2023-10-05",
      game: {
        date: {
          date: "2023-10-05",
          time: "18:00"
        },
        status: {
          short: "Scheduled"
        }
      }
    },
    {
      id: "ncaaBasketballGame2",
      teams: {
        home: {
          name: "College Basketball Team C",
          id: "collegeBasketballTeamC"
        },
        away: {
          name: "College Basketball Team D",
          id: "collegeBasketballTeamD"
        }
      },
      league: {
        name: "NCAA Basketball",
        alias: "NCAAB"
      },
      date: "2023-10-06",
      game: {
        date: {
          date: "2023-10-06",
          time: "20:00"
        },
        status: {
          short: "Scheduled"
        }
      }
    }
  ];