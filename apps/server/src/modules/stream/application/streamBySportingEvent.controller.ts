import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { StreamDomainFacade } from '@server/modules/stream/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { StreamApplicationEvent } from './stream.application.event'
import { StreamCreateDto } from './stream.dto'

import { SportingEventDomainFacade } from '../../sportingEvent/domain'

@Controller('/v1/sportingEvents')
export class StreamBySportingEventController {
  constructor(
    private sportingEventDomainFacade: SportingEventDomainFacade,

    private streamDomainFacade: StreamDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sportingEvent/:sportingEventId/streams')
  async findManySportingEventId(
    @Param('sportingEventId') sportingEventId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.sportingEventDomainFacade.findOneByIdOrFail(sportingEventId)

    const items = await this.streamDomainFacade.findManyBySportingEvent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sportingEvent/:sportingEventId/streams')
  async createBySportingEventId(
    @Param('sportingEventId') sportingEventId: string,
    @Body() body: StreamCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sportingEventId }

    const item = await this.streamDomainFacade.create(valuesUpdated)

    await this.eventService.emit<StreamApplicationEvent.StreamCreated.Payload>(
      StreamApplicationEvent.StreamCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
