import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import {
  SportingEvent,
  SportingEventDomainFacade,
} from '@server/modules/sportingEvent/domain'
import { SportingEventApi } from '@web/domain/sportingEvent/sportingEvent.api'
import { Request } from 'express'
import { RequestHelper } from '../../../helpers/request'
import { SportingEventApplicationEvent } from './sportingEvent.application.event'
import {
  SportingEventCreateDto,
  SportingEventUpdateDto,
} from './sportingEvent.dto'

@Controller('/v1/sportingEvents')
export class SportingEventController {
  constructor(
    private eventService: EventService,
    private sportingEventDomainFacade: SportingEventDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.sportingEventDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SportingEventCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.sportingEventDomainFacade.create(body)

    await this.eventService.emit<SportingEventApplicationEvent.SportingEventCreated.Payload>(
      SportingEventApplicationEvent.SportingEventCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:sportingEventId')
  async findOne(
    @Param('sportingEventId') sportingEventId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.sportingEventDomainFacade.findOneByIdOrFail(
      sportingEventId,
      queryOptions,
    )

    return item
  }

  @Get('live')
  async getLiveEvents(@Query('date') date: string) {
    try {
      const liveEvents = await SportingEventApi.fetchLiveEvents(date)
      return liveEvents.map(event => ({
        id: event.fixture.id.toString(),
        name: `${event.teams.home.name} vs ${event.teams.away.name}`,
        startTime: event.fixture.date,
        endTime: event.fixture.date, // API doesn't provide end time, so we use start time
        league: event.league,
        teams: event.teams,
      }))
    } catch (error) {
      throw new HttpException(
        'Failed to fetch live events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Patch('/:sportingEventId')
  async update(
    @Param('sportingEventId') sportingEventId: string,
    @Body() body: SportingEventUpdateDto,
  ) {
    const item =
      await this.sportingEventDomainFacade.findOneByIdOrFail(sportingEventId)

    const itemUpdated = await this.sportingEventDomainFacade.update(
      item,
      body as Partial<SportingEvent>,
    )
    return itemUpdated
  }

  @Delete('/:sportingEventId')
  async delete(@Param('sportingEventId') sportingEventId: string) {
    const item =
      await this.sportingEventDomainFacade.findOneByIdOrFail(sportingEventId)

    await this.sportingEventDomainFacade.delete(item)

    return item
  }
}
