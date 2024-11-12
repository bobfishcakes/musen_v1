import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  CreateAmericanFootballDto,
  UpdateAmericanFootballDto,
} from 'apps/web/src/domain/americanFootball/americanFootball.dto'
import { Repository } from 'typeorm'
import { AmericanFootball } from './americanFootball.model'

@Injectable()
export class AmericanFootballService {
  constructor(
    @InjectRepository(AmericanFootball)
    private americanFootballRepository: Repository<AmericanFootball>,
  ) {}

  async findAll(query: any): Promise<AmericanFootball[]> {
    return this.americanFootballRepository.find(query)
  }

  async findOne(id: number): Promise<AmericanFootball> {
    return this.americanFootballRepository.findOne({ where: { id } })
  }

  async create(
    createDto: CreateAmericanFootballDto,
  ): Promise<AmericanFootball> {
    const newAmericanFootball =
      this.americanFootballRepository.create(createDto)
    return this.americanFootballRepository.save(newAmericanFootball)
  }

  async update(
    id: number,
    updateDto: UpdateAmericanFootballDto,
  ): Promise<AmericanFootball> {
    await this.americanFootballRepository.update(id, updateDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.americanFootballRepository.delete(id)
  }

  async getStandings(league: number, season: number): Promise<any> {
    // Implement logic to fetch standings from an external API or database
    // This is a placeholder implementation
    return {
      message: `Fetching standings for league ${league} and season ${season}`,
    }
  }

  async getGames(query: any): Promise<any> {
    // Implement logic to fetch games based on query parameters
    // This is a placeholder implementation
    return { message: 'Fetching games', query }
  }

  async getPlayers(query: any): Promise<any> {
    // Implement logic to fetch players based on query parameters
    // This is a placeholder implementation
    return { message: 'Fetching players', query }
  }

  async getTeams(query: any): Promise<any> {
    // Implement logic to fetch teams based on query parameters
    // This is a placeholder implementation
    return { message: 'Fetching teams', query }
  }
}
