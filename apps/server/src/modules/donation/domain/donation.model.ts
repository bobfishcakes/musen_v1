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
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  amount?: number

  @Column({ nullable: true })
  donationTime?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.donations)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  streamerId?: string

  @ManyToOne(() => User, parent => parent.donationsAsStreamer)
  @JoinColumn({ name: 'streamerId' })
  streamer?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
