import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SubscriptionDomainFacade } from '@server/modules/subscription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SubscriptionApplicationEvent } from './subscription.application.event'
import { SubscriptionCreateDto } from './subscription.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class SubscriptionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private subscriptionDomainFacade: SubscriptionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/subscriptions')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.subscriptionDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/subscriptions')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: SubscriptionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.subscriptionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SubscriptionApplicationEvent.SubscriptionCreated.Payload>(
      SubscriptionApplicationEvent.SubscriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/streamer/:streamerId/subscriptions')
  async findManyStreamerId(
    @Param('streamerId') streamerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(streamerId)

    const items = await this.subscriptionDomainFacade.findManyByStreamer(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/streamer/:streamerId/subscriptions')
  async createByStreamerId(
    @Param('streamerId') streamerId: string,
    @Body() body: SubscriptionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, streamerId }

    const item = await this.subscriptionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SubscriptionApplicationEvent.SubscriptionCreated.Payload>(
      SubscriptionApplicationEvent.SubscriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
