import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { SportingEventDomainModule } from './sportingEvent/domain'

import { StreamDomainModule } from './stream/domain'

import { SubscriptionDomainModule } from './subscription/domain'

import { DonationDomainModule } from './donation/domain'

import { CommentDomainModule } from './comment/domain'

import { ClipDomainModule } from './clip/domain'

import { EarningDomainModule } from './earning/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    SportingEventDomainModule,

    StreamDomainModule,

    SubscriptionDomainModule,

    DonationDomainModule,

    CommentDomainModule,

    ClipDomainModule,

    EarningDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
