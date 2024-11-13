import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBasketballDto, UpdateBasketballDto } from './basketball.dto'
import { Basketball } from './basketball.model'

@Injectable()
export class BasketballService {
  constructor(
    @InjectRepository(Basketball)
    private basketballRepository: Repository<Basketball>,
  ) {}

  async findAll(query: any): Promise<Basketball[]> {
    return this.basketballRepository.find(query)
  }

  async findOne(id: number): Promise<Basketball> {
    return this.basketballRepository.findOne({ where: { id } })
  }

  async create(createDto: CreateBasketballDto): Promise<Basketball> {
    const newBasketball = this.basketballRepository.create(createDto)
    return this.basketballRepository.save(newBasketball)
  }

  async update(
    id: number,
    updateDto: UpdateBasketballDto,
  ): Promise<Basketball> {
    await this.basketballRepository.update(id, updateDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.basketballRepository.delete(id)
  }

  async getGames(query: any): Promise<any> {
    return { message: 'Fetching games', query }
  }
}
