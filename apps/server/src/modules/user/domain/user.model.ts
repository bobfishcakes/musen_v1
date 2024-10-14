import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { Stream } from '../../../modules/stream/domain'

import { Subscription } from '../../../modules/subscription/domain'

import { Donation } from '../../../modules/donation/domain'

import { Comment } from '../../../modules/comment/domain'

import { Earning } from '../../../modules/earning/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, unique: true })
  email?: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ nullable: true, select: false })
  stripeCustomerId?: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Stream, child => child.streamer)
  streamsAsStreamer?: Stream[]

  @OneToMany(() => Subscription, child => child.user)
  subscriptions?: Subscription[]

  @OneToMany(() => Subscription, child => child.streamer)
  subscriptionsAsStreamer?: Subscription[]

  @OneToMany(() => Donation, child => child.user)
  donations?: Donation[]

  @OneToMany(() => Donation, child => child.streamer)
  donationsAsStreamer?: Donation[]

  @OneToMany(() => Comment, child => child.user)
  comments?: Comment[]

  @OneToMany(() => Earning, child => child.streamer)
  earningsAsStreamer?: Earning[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
