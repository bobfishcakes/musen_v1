import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import {
  CreateAmericanFootballDto,
  UpdateAmericanFootballDto,
} from 'apps/web/src/domain/americanFootball/americanFootball.dto'
import { AmericanFootballService } from 'apps/web/src/domain/americanFootball/americanFootball.service'
import { AmericanFootball } from './americanFootball.model'

@Controller('american-football')
export class AmericanFootballController {
  constructor(
    private readonly americanFootballService: AmericanFootballService,
  ) {}

  @Get()
  async findAll(@Query() query): Promise<AmericanFootball[]> {
    return this.americanFootballService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AmericanFootball> {
    return this.americanFootballService.findOne(+id)
  }

  @Post()
  async create(
    @Body() createDto: CreateAmericanFootballDto,
  ): Promise<AmericanFootball> {
    return this.americanFootballService.create(createDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAmericanFootballDto,
  ): Promise<AmericanFootball> {
    return this.americanFootballService.update(+id, updateDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.americanFootballService.remove(+id)
  }

  @Get('standings')
  async getStandings(
    @Query('league') league: number,
    @Query('season') season: number,
  ): Promise<any> {
    return this.americanFootballService.getStandings(league, season)
  }

  @Get('games')
  async getGames(@Query() query): Promise<any> {
    return this.americanFootballService.getGames(query)
  }

  @Get('players')
  async getPlayers(@Query() query): Promise<any> {
    return this.americanFootballService.getPlayers(query)
  }

  @Get('teams')
  async getTeams(@Query() query): Promise<any> {
    return this.americanFootballService.getTeams(query)
  }
}
