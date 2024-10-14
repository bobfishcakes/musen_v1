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
import { Stream, StreamDomainFacade } from '@server/modules/stream/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { StreamApplicationEvent } from './stream.application.event'
import { StreamCreateDto, StreamUpdateDto } from './stream.dto'

@Controller('/v1/streams')
export class StreamController {
  constructor(
    private eventService: EventService,
    private streamDomainFacade: StreamDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.streamDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: StreamCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.streamDomainFacade.create(body)

    await this.eventService.emit<StreamApplicationEvent.StreamCreated.Payload>(
      StreamApplicationEvent.StreamCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:streamId')
  async findOne(@Param('streamId') streamId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.streamDomainFacade.findOneByIdOrFail(
      streamId,
      queryOptions,
    )

    return item
  }

  @Patch('/:streamId')
  async update(
    @Param('streamId') streamId: string,
    @Body() body: StreamUpdateDto,
  ) {
    const item = await this.streamDomainFacade.findOneByIdOrFail(streamId)

    const itemUpdated = await this.streamDomainFacade.update(
      item,
      body as Partial<Stream>,
    )
    return itemUpdated
  }

  @Delete('/:streamId')
  async delete(@Param('streamId') streamId: string) {
    const item = await this.streamDomainFacade.findOneByIdOrFail(streamId)

    await this.streamDomainFacade.delete(item)

    return item
  }
}
