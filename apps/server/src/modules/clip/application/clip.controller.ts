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
import { Clip, ClipDomainFacade } from '@server/modules/clip/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ClipApplicationEvent } from './clip.application.event'
import { ClipCreateDto, ClipUpdateDto } from './clip.dto'

@Controller('/v1/clips')
export class ClipController {
  constructor(
    private eventService: EventService,
    private clipDomainFacade: ClipDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.clipDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ClipCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.clipDomainFacade.create(body)

    await this.eventService.emit<ClipApplicationEvent.ClipCreated.Payload>(
      ClipApplicationEvent.ClipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:clipId')
  async findOne(@Param('clipId') clipId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.clipDomainFacade.findOneByIdOrFail(
      clipId,
      queryOptions,
    )

    return item
  }

  @Patch('/:clipId')
  async update(@Param('clipId') clipId: string, @Body() body: ClipUpdateDto) {
    const item = await this.clipDomainFacade.findOneByIdOrFail(clipId)

    const itemUpdated = await this.clipDomainFacade.update(
      item,
      body as Partial<Clip>,
    )
    return itemUpdated
  }

  @Delete('/:clipId')
  async delete(@Param('clipId') clipId: string) {
    const item = await this.clipDomainFacade.findOneByIdOrFail(clipId)

    await this.clipDomainFacade.delete(item)

    return item
  }
}
