import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SportingEventDomainModule } from '../domain'
import { SportingEventController } from './sportingEvent.controller'

@Module({
  imports: [AuthenticationDomainModule, SportingEventDomainModule],
  controllers: [SportingEventController],
  providers: [],
})
export class SportingEventApplicationModule {}
