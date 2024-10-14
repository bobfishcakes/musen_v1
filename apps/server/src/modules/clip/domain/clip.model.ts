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
export class Clip {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  url?: string

  @Column({ nullable: true })
  creationTime?: string

  @Column({ nullable: true })
  streamId?: string

  @ManyToOne(() => Stream, parent => parent.clips)
  @JoinColumn({ name: 'streamId' })
  stream?: Stream

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
