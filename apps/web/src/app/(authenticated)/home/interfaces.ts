

export interface Team {
    name: string
    id: string
  }
  
  export interface Teams {
    home: Team
    away: Team
  }
  
  export interface League {
    name: string
    alias?: string
  }
  
  export interface GameDate {
    date: string
    time: string
  }
  
  export interface Game {
    id: string
    teams: Teams
    league: League
    date?: string
    game?: {
      date: GameDate
      status: {
        short: string
      }
    }
  }