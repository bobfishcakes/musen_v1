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

import { SportingEvent } from '../../../modules/sportingEvent/domain'

import { Comment } from '../../../modules/comment/domain'

import { Clip } from '../../../modules/clip/domain'

@Entity()
export class Stream {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  startTime?: string

  @Column({ nullable: true })
  endTime?: string

  @Column({ nullable: true })
  gameTimeRemaining?: string

  @Column({ nullable: true })
  status?: string

  @Column({ nullable: true })
  streamerId?: string

  @ManyToOne(() => User, parent => parent.streamsAsStreamer)
  @JoinColumn({ name: 'streamerId' })
  streamer?: User

  @Column({ nullable: true })
  sportingEventId?: string

  @ManyToOne(() => SportingEvent, parent => parent.streams)
  @JoinColumn({ name: 'sportingEventId' })
  sportingEvent?: SportingEvent

  @OneToMany(() => Comment, child => child.stream)
  comments?: Comment[]

  @OneToMany(() => Clip, child => child.stream)
  clips?: Clip[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
