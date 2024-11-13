import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Stream } from '../stream/stream.model'

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

  @Column({ nullable: true }) // Add this line
  creatorId?: string // Add this line

  @OneToMany(() => Stream, child => child.sportingEvent)
  streams?: Stream[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
