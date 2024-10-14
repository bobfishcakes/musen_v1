import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SubscriptionDomainModule } from '../domain'
import { SubscriptionController } from './subscription.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { SubscriptionByUserController } from './subscriptionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SubscriptionDomainModule,

    UserDomainModule,
  ],
  controllers: [SubscriptionController, SubscriptionByUserController],
  providers: [],
})
export class SubscriptionApplicationModule {}
