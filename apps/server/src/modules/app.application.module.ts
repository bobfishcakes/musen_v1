import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { SportingEventApplicationModule } from './sportingEvent/application'

import { StreamApplicationModule } from './stream/application'

import { SubscriptionApplicationModule } from './subscription/application'

import { DonationApplicationModule } from './donation/application'

import { CommentApplicationModule } from './comment/application'

import { ClipApplicationModule } from './clip/application'

import { EarningApplicationModule } from './earning/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    SportingEventApplicationModule,

    StreamApplicationModule,

    SubscriptionApplicationModule,

    DonationApplicationModule,

    CommentApplicationModule,

    ClipApplicationModule,

    EarningApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
