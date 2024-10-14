import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CommentDomainFacade } from '@server/modules/comment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CommentApplicationEvent } from './comment.application.event'
import { CommentCreateDto } from './comment.dto'

import { StreamDomainFacade } from '../../stream/domain'

@Controller('/v1/streams')
export class CommentByStreamController {
  constructor(
    private streamDomainFacade: StreamDomainFacade,

    private commentDomainFacade: CommentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/stream/:streamId/comments')
  async findManyStreamId(
    @Param('streamId') streamId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.streamDomainFacade.findOneByIdOrFail(streamId)

    const items = await this.commentDomainFacade.findManyByStream(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/stream/:streamId/comments')
  async createByStreamId(
    @Param('streamId') streamId: string,
    @Body() body: CommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, streamId }

    const item = await this.commentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CommentApplicationEvent.CommentCreated.Payload>(
      CommentApplicationEvent.CommentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
