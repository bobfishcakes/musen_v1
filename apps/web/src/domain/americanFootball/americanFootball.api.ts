import { HttpService } from '@web/core/http/http.service'

const API_URL = '/api/proxy/american-football'
const API_KEY = '6c3c11fe1af925ff889d220229ff3297' // Replace with your actual API key

interface ApiResponse<T> {
  get: string
  parameters: Record<string, any>
  errors: any[]
  results: number
  response: T
}

export class AmericanFootballApi {
  static async getTimezones(): Promise<ApiResponse<string[]>> {
    return this.makeRequest('/timezone')
  }

  static async getSeasons(): Promise<ApiResponse<number[]>> {
    return this.makeRequest('/seasons')
  }

  static async getLeagues(params?: {
    id?: number
    season?: number
    current?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/leagues', params)
  }

  static async getTeams(params: {
    id?: number
    league?: number
    season?: number
    name?: string
    code?: string
    search?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/teams', params)
  }

  static async getPlayers(params: {
    id?: number
    name?: string
    team?: number
    season?: number
    search?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/players', params)
  }

  static async getPlayerStatistics(params: {
    id?: number
    team?: number
    season: number
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/players/statistics', params)
  }

  static async getInjuries(params: {
    player?: number
    team?: number
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/injuries', params)
  }

  static async getGames(params: {
    id?: number
    date?: string
    league?: number
    season?: number
    team?: number
    h2h?: string
    live?: string
    timezone?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/games', params)
  }

  static async getGameEvents(id: number): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/games/events', { id })
  }

  static async getGameTeamStatistics(params: {
    id: number
    team?: number
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/games/statistics/teams', params)
  }

  static async getGamePlayerStatistics(params: {
    id: number
    group?: string
    team?: number
    player?: number
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/games/statistics/players', params)
  }

  static async getStandings(params: {
    league: number
    season: number
    team?: number
    conference?: string
    division?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/standings', params)
  }

  static async getStandingsConferences(params: {
    league: number
    season: number
  }): Promise<ApiResponse<string[]>> {
    return this.makeRequest('/standings/conferences', params)
  }

  static async getStandingsDivisions(params: {
    league: number
    season: number
  }): Promise<ApiResponse<string[]>> {
    return this.makeRequest('/standings/divisions', params)
  }

  static async getOdds(params: {
    game: number
    bookmaker?: number
    bet?: number
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/odds', params)
  }

  static async getBets(params?: {
    id?: number
    search?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/odds/bets', params)
  }

  private static async makeRequest<T>(
    endpoint: string,
    params: Record<string, any> = {},
  ): Promise<ApiResponse<T>> {
    try {
      HttpService.api.setBaseUrl(API_URL)

      // Modified request options
      const originalGetRequestOptions = HttpService.api.getRequestOptions
      HttpService.api.getRequestOptions = function () {
        const options = originalGetRequestOptions.call(this)
        return {
          ...options,
          headers: {
            ...options.headers,
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'v1.american-football.api-sports.io',
          },
          credentials: 'omit', // Add this line
          mode: 'cors', // Add this line
        }
      }

      const queryString = new URLSearchParams(params).toString()
      const url = `${endpoint}${queryString ? `?${queryString}` : ''}`
      return await HttpService.api.get<ApiResponse<T>>(url)
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error)
      throw error
    }
  }
}
