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

@Entity()
export class SportingEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  startTime?: string

  @Column({ nullable: true })
  endTime?: string

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => Stream, child => child.sportingEvent)
  streams?: Stream[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
