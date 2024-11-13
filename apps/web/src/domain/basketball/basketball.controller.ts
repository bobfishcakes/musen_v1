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
  CreateBasketballDto,
  UpdateBasketballDto,
} from 'apps/web/src/domain/basketball/basketball.dto'
import { Basketball } from 'apps/web/src/domain/basketball/basketball.model'
import { BasketballService } from 'apps/web/src/domain/basketball/basketball.service'

@Controller('basketball')
export class BasketballController {
  constructor(private readonly basketballService: BasketballService) {}

  @Get()
  async findAll(@Query() query): Promise<Basketball[]> {
    return this.basketballService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Basketball> {
    return this.basketballService.findOne(+id)
  }

  @Post()
  async create(@Body() createDto: CreateBasketballDto): Promise<Basketball> {
    return this.basketballService.create(createDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBasketballDto,
  ): Promise<Basketball> {
    return this.basketballService.update(+id, updateDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.basketballService.remove(+id)
  }

  @Get('games')
  async getGames(@Query() query): Promise<any> {
    return this.basketballService.getGames(query)
  }
}
