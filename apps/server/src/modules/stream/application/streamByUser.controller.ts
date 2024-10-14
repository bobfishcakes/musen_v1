import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { StreamDomainFacade } from '@server/modules/stream/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { StreamApplicationEvent } from './stream.application.event'
import { StreamCreateDto } from './stream.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class StreamByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private streamDomainFacade: StreamDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/streamer/:streamerId/streams')
  async findManyStreamerId(
    @Param('streamerId') streamerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(streamerId)

    const items = await this.streamDomainFacade.findManyByStreamer(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/streamer/:streamerId/streams')
  async createByStreamerId(
    @Param('streamerId') streamerId: string,
    @Body() body: StreamCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, streamerId }

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
