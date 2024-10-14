import { Notification } from '../notification'

import { Stream } from '../stream'

import { Subscription } from '../subscription'

import { Donation } from '../donation'

import { Comment } from '../comment'

import { Earning } from '../earning'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email?: string
  status: UserStatus
  name?: string
  pictureUrl?: string
  password?: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  streamsAsStreamer?: Stream[]

  subscriptions?: Subscription[]

  subscriptionsAsStreamer?: Subscription[]

  donations?: Donation[]

  donationsAsStreamer?: Donation[]

  comments?: Comment[]

  earningsAsStreamer?: Earning[]
}
