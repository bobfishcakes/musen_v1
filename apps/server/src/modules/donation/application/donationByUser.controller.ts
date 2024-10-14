import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DonationDomainFacade } from '@server/modules/donation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DonationApplicationEvent } from './donation.application.event'
import { DonationCreateDto } from './donation.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DonationByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private donationDomainFacade: DonationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/donations')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.donationDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/donations')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: DonationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.donationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DonationApplicationEvent.DonationCreated.Payload>(
      DonationApplicationEvent.DonationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/streamer/:streamerId/donations')
  async findManyStreamerId(
    @Param('streamerId') streamerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(streamerId)

    const items = await this.donationDomainFacade.findManyByStreamer(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/streamer/:streamerId/donations')
  async createByStreamerId(
    @Param('streamerId') streamerId: string,
    @Body() body: DonationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, streamerId }

    const item = await this.donationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DonationApplicationEvent.DonationCreated.Payload>(
      DonationApplicationEvent.DonationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
