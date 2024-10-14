import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationSportingEventSubscriber } from './subscribers/notification.sportingEvent.subscriber'

import { NotificationStreamSubscriber } from './subscribers/notification.stream.subscriber'

import { NotificationSubscriptionSubscriber } from './subscribers/notification.subscription.subscriber'

import { NotificationDonationSubscriber } from './subscribers/notification.donation.subscriber'

import { NotificationCommentSubscriber } from './subscribers/notification.comment.subscriber'

import { NotificationClipSubscriber } from './subscribers/notification.clip.subscriber'

import { NotificationEarningSubscriber } from './subscribers/notification.earning.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationSportingEventSubscriber,

    NotificationStreamSubscriber,

    NotificationSubscriptionSubscriber,

    NotificationDonationSubscriber,

    NotificationCommentSubscriber,

    NotificationClipSubscriber,

    NotificationEarningSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
