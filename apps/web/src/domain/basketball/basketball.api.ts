import { HttpService } from '@web/core/http/http.service'

const API_URL = 'https://v1.basketball.api-sports.io'
const API_KEY = '6c3c11fe1af925ff889d220229ff3297' // Replace with your actual API key

interface ApiResponse<T> {
  get: string
  parameters: Record<string, any>
  errors: any[]
  results: number
  response: T
}

export class BasketballApi {
  static async getGames(params: {
    date?: string
    league?: number
    season?: string
    team?: number
    timezone?: string
  }): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/games', params)
  }

  private static async makeRequest<T>(
    endpoint: string,
    params: Record<string, any> = {},
  ): Promise<ApiResponse<T>> {
    try {
      HttpService.api.setBaseUrl(API_URL)
      const originalGetRequestOptions = HttpService.api.getRequestOptions
      HttpService.api.getRequestOptions = function () {
        const options = originalGetRequestOptions.call(this)
        return {
          ...options,
          headers: {
            'x-apisports-key': API_KEY,
          },
          credentials: 'omit',
          mode: 'cors',
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
