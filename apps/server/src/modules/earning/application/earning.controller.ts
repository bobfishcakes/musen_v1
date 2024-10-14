import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Earning, EarningDomainFacade } from '@server/modules/earning/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EarningApplicationEvent } from './earning.application.event'
import { EarningCreateDto, EarningUpdateDto } from './earning.dto'

@Controller('/v1/earnings')
export class EarningController {
  constructor(
    private eventService: EventService,
    private earningDomainFacade: EarningDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.earningDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: EarningCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.earningDomainFacade.create(body)

    await this.eventService.emit<EarningApplicationEvent.EarningCreated.Payload>(
      EarningApplicationEvent.EarningCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:earningId')
  async findOne(
    @Param('earningId') earningId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.earningDomainFacade.findOneByIdOrFail(
      earningId,
      queryOptions,
    )

    return item
  }

  @Patch('/:earningId')
  async update(
    @Param('earningId') earningId: string,
    @Body() body: EarningUpdateDto,
  ) {
    const item = await this.earningDomainFacade.findOneByIdOrFail(earningId)

    const itemUpdated = await this.earningDomainFacade.update(
      item,
      body as Partial<Earning>,
    )
    return itemUpdated
  }

  @Delete('/:earningId')
  async delete(@Param('earningId') earningId: string) {
    const item = await this.earningDomainFacade.findOneByIdOrFail(earningId)

    await this.earningDomainFacade.delete(item)

    return item
  }
}
