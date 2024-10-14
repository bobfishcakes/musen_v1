import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ClipDomainModule } from '../domain'
import { ClipController } from './clip.controller'

import { StreamDomainModule } from '../../../modules/stream/domain'

import { ClipByStreamController } from './clipByStream.controller'

@Module({
  imports: [AuthenticationDomainModule, ClipDomainModule, StreamDomainModule],
  controllers: [ClipController, ClipByStreamController],
  providers: [],
})
export class ClipApplicationModule {}
