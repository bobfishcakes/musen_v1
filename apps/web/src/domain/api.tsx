import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { SportingEventApi } from './sportingEvent/sportingEvent.api'

import { StreamApi } from './stream/stream.api'

import { SubscriptionApi } from './subscription/subscription.api'

import { DonationApi } from './donation/donation.api'

import { CommentApi } from './comment/comment.api'

import { ClipApi } from './clip/clip.api'

import { EarningApi } from './earning/earning.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class SportingEvent extends SportingEventApi {}

  export class Stream extends StreamApi {}

  export class Subscription extends SubscriptionApi {}

  export class Donation extends DonationApi {}

  export class Comment extends CommentApi {}

  export class Clip extends ClipApi {}

  export class Earning extends EarningApi {}
}
