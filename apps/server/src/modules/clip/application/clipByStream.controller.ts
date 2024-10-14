import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ClipDomainFacade } from '@server/modules/clip/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ClipApplicationEvent } from './clip.application.event'
import { ClipCreateDto } from './clip.dto'

import { StreamDomainFacade } from '../../stream/domain'

@Controller('/v1/streams')
export class ClipByStreamController {
  constructor(
    private streamDomainFacade: StreamDomainFacade,

    private clipDomainFacade: ClipDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/stream/:streamId/clips')
  async findManyStreamId(
    @Param('streamId') streamId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.streamDomainFacade.findOneByIdOrFail(streamId)

    const items = await this.clipDomainFacade.findManyByStream(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/stream/:streamId/clips')
  async createByStreamId(
    @Param('streamId') streamId: string,
    @Body() body: ClipCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, streamId }

    const item = await this.clipDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ClipApplicationEvent.ClipCreated.Payload>(
      ClipApplicationEvent.ClipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
