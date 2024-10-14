import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SubscriptionDomainFacade } from './subscription.domain.facade'
import { Subscription } from './subscription.model'

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), DatabaseHelperModule],
  providers: [SubscriptionDomainFacade, SubscriptionDomainFacade],
  exports: [SubscriptionDomainFacade],
})
export class SubscriptionDomainModule {}
