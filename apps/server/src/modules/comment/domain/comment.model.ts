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

import { Stream } from '../../../modules/stream/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  content?: string

  @Column({ nullable: true })
  commentTime?: string

  @Column({ nullable: true })
  streamId?: string

  @ManyToOne(() => Stream, parent => parent.comments)
  @JoinColumn({ name: 'streamId' })
  stream?: Stream

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.comments)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
