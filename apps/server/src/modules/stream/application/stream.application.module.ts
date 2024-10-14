import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { StreamDomainModule } from '../domain'
import { StreamController } from './stream.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { StreamByUserController } from './streamByUser.controller'

import { SportingEventDomainModule } from '../../../modules/sportingEvent/domain'

import { StreamBySportingEventController } from './streamBySportingEvent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    StreamDomainModule,

    UserDomainModule,

    SportingEventDomainModule,
  ],
  controllers: [
    StreamController,

    StreamByUserController,

    StreamBySportingEventController,
  ],
  providers: [],
})
export class StreamApplicationModule {}
