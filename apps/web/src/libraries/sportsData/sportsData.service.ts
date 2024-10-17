// /apps/server/src/libraries/sportsData/sportsData.service.ts

import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class SportsDataService {
  private apiUrl = 'https://api.sportsdb.com/v1/sports' // Replace with your chosen API

  async getSportsEvents() {
    try {
      const response = await axios.get(this.apiUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching sports data:', error)
      throw error
    }
  }
}
