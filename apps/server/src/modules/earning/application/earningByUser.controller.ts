import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { EarningDomainFacade } from '@server/modules/earning/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { EarningApplicationEvent } from './earning.application.event'
import { EarningCreateDto } from './earning.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class EarningByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private earningDomainFacade: EarningDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/streamer/:streamerId/earnings')
  async findManyStreamerId(
    @Param('streamerId') streamerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(streamerId)

    const items = await this.earningDomainFacade.findManyByStreamer(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/streamer/:streamerId/earnings')
  async createByStreamerId(
    @Param('streamerId') streamerId: string,
    @Body() body: EarningCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, streamerId }

    const item = await this.earningDomainFacade.create(valuesUpdated)

    await this.eventService.emit<EarningApplicationEvent.EarningCreated.Payload>(
      EarningApplicationEvent.EarningCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
