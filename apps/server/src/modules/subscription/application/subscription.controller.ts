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
import {
  Subscription,
  SubscriptionDomainFacade,
} from '@server/modules/subscription/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SubscriptionApplicationEvent } from './subscription.application.event'
import {
  SubscriptionCreateDto,
  SubscriptionUpdateDto,
} from './subscription.dto'

@Controller('/v1/subscriptions')
export class SubscriptionController {
  constructor(
    private eventService: EventService,
    private subscriptionDomainFacade: SubscriptionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.subscriptionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SubscriptionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.subscriptionDomainFacade.create(body)

    await this.eventService.emit<SubscriptionApplicationEvent.SubscriptionCreated.Payload>(
      SubscriptionApplicationEvent.SubscriptionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:subscriptionId')
  async findOne(
    @Param('subscriptionId') subscriptionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.subscriptionDomainFacade.findOneByIdOrFail(
      subscriptionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:subscriptionId')
  async update(
    @Param('subscriptionId') subscriptionId: string,
    @Body() body: SubscriptionUpdateDto,
  ) {
    const item =
      await this.subscriptionDomainFacade.findOneByIdOrFail(subscriptionId)

    const itemUpdated = await this.subscriptionDomainFacade.update(
      item,
      body as Partial<Subscription>,
    )
    return itemUpdated
  }

  @Delete('/:subscriptionId')
  async delete(@Param('subscriptionId') subscriptionId: string) {
    const item =
      await this.subscriptionDomainFacade.findOneByIdOrFail(subscriptionId)

    await this.subscriptionDomainFacade.delete(item)

    return item
  }
}
