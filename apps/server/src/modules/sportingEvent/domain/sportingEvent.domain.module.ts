import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SportingEventDomainFacade } from './sportingEvent.domain.facade'
import { SportingEvent } from './sportingEvent.model'

@Module({
  imports: [TypeOrmModule.forFeature([SportingEvent]), DatabaseHelperModule],
  providers: [SportingEventDomainFacade, SportingEventDomainFacade],
  exports: [SportingEventDomainFacade],
})
export class SportingEventDomainModule {}
