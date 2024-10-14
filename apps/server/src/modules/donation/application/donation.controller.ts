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
import { Donation, DonationDomainFacade } from '@server/modules/donation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DonationApplicationEvent } from './donation.application.event'
import { DonationCreateDto, DonationUpdateDto } from './donation.dto'

@Controller('/v1/donations')
export class DonationController {
  constructor(
    private eventService: EventService,
    private donationDomainFacade: DonationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.donationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DonationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.donationDomainFacade.create(body)

    await this.eventService.emit<DonationApplicationEvent.DonationCreated.Payload>(
      DonationApplicationEvent.DonationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:donationId')
  async findOne(
    @Param('donationId') donationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.donationDomainFacade.findOneByIdOrFail(
      donationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:donationId')
  async update(
    @Param('donationId') donationId: string,
    @Body() body: DonationUpdateDto,
  ) {
    const item = await this.donationDomainFacade.findOneByIdOrFail(donationId)

    const itemUpdated = await this.donationDomainFacade.update(
      item,
      body as Partial<Donation>,
    )
    return itemUpdated
  }

  @Delete('/:donationId')
  async delete(@Param('donationId') donationId: string) {
    const item = await this.donationDomainFacade.findOneByIdOrFail(donationId)

    await this.donationDomainFacade.delete(item)

    return item
  }
}
