import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { SportingEvent as SportingEventModel } from './sportingEvent/sportingEvent.model'

import { Stream as StreamModel } from './stream/stream.model'

import { Subscription as SubscriptionModel } from './subscription/subscription.model'

import { Donation as DonationModel } from './donation/donation.model'

import { Comment as CommentModel } from './comment/comment.model'

import { Clip as ClipModel } from './clip/clip.model'

import { Earning as EarningModel } from './earning/earning.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class SportingEvent extends SportingEventModel {}

  export class Stream extends StreamModel {}

  export class Subscription extends SubscriptionModel {}

  export class Donation extends DonationModel {}

  export class Comment extends CommentModel {}

  export class Clip extends ClipModel {}

  export class Earning extends EarningModel {}
}
