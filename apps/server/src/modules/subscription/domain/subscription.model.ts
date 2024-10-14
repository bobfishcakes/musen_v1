import { ColumnNumeric } from '@server/core/database'
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

import { User } from '../../../modules/user/domain'

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  startDate?: string

  @Column({ nullable: true })
  endDate?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.subscriptions)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  streamerId?: string

  @ManyToOne(() => User, parent => parent.subscriptionsAsStreamer)
  @JoinColumn({ name: 'streamerId' })
  streamer?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
