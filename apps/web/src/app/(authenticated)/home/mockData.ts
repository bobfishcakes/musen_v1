import { Game } from './interfaces';

export const statusMap = {
  NS: "Not Started",
  Q1: "1st Quarter",
  Q2: "2nd Quarter",
  Q3: "3rd Quarter",
  Q4: "4th Quarter",
  OT: "Overtime",
  BT: "Break",
  HT: "Halftime",
  FT: "Final",
  AOT: "After Over Time",
  POST: "Game Postponed",
  CANC: "Game Cancelled",
  SUSP: "Game Suspended",
  AWD: "Game Awarded",
  ABD: "Game Abandoned"
};

// Only include Broncos @ Chargers TNF game
export const mockNflGames: Game[] = [
  {
    id: "1",
    teams: {
      home: {
        name: "Los Angeles Chargers",
        id: "1",
        logo: "https://media.api-sports.io/american-football/teams/1.png",
      },
      away: {
        name: "Denver Broncos",
        id: "2",
        logo: "https://media.api-sports.io/american-football/teams/2.png",
      }
    },
    league: {
      name: "NFL",
      alias: "NFL"
    },
    date: "2023-12-14",
    game: {
      date: {
        date: "2023-12-14",
        time: "20:15"
      }
    },
    status: {
      short: "Q3",
      long: statusMap.Q3
    },
    scores: {
      home: { total: 17 },
      away: { total: 14 }
    },
    streamers: 3,     // Added mock streamer count
    listeners: 450    // Added mock listener count
  }
];

// Only include Clippers vs Mavs and Warriors vs Grizzlies
export const mockNbaGames: Game[] = [
  {
    id: "132",
    teams: {
      home: {
        name: "Dallas Mavericks",
        id: "132",
        logo: "https://media.api-sports.io/basketball/teams/132.png",
      },
      away: {
        name: "LA Clippers",
        id: "133",
        logo: "https://media.api-sports.io/basketball/teams/133.png",
      }
    },
    league: {
      name: "NBA",
      alias: "NBA"
    },
    date: "2023-12-14",
    game: {
      date: {
        date: "2023-12-14",
        time: "20:30"
      }
    },
    status: {
      short: "Q1",
      long: statusMap.Q1
    },
    scores: {
      home: { total: 12 },
      away: { total: 15 }
    },
    streamers: 5,     // Added mock streamer count
    listeners: 280    // Added mock listener count
  },
  {
    id: "134",
    teams: {
      home: {
        name: "Memphis Grizzlies",
        id: "134",
        logo: "https://media.api-sports.io/basketball/teams/134.png",
      },
      away: {
        name: "Golden State Warriors",
        id: "135",
        logo: "https://media.api-sports.io/basketball/teams/135.png",
      }
    },
    league: {
      name: "NBA",
      alias: "NBA"
    },
    date: "2023-12-14",
    game: {
      date: {
        date: "2023-12-14",
        time: "20:00"
      }
    },
    status: {
      short: "Q2",
      long: statusMap.Q2
    },
    scores: {
      home: { total: 45 },
      away: { total: 42 }
    },
    streamers: 6,     // Added mock streamer count
    listeners: 325    // Added mock listener count
  }
];

// Empty arrays for NCAA games since we don't need them
export const mockNcaaFootballGames: Game[] = [];
export const mockNcaaBasketballGames: Game[] = [];