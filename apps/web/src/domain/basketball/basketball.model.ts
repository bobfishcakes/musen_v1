import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('basketball')
export class Basketball {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  league: number

  @Column({ nullable: true })
  season: string

  @Column({ type: 'date', nullable: true })
  date: Date

  @Column({ nullable: true })
  team: number

  @Column('json', { nullable: true })
  players: any[]

  @Column('json', { nullable: true })
  statistics: any

  constructor(partial: Partial<Basketball>) {
    Object.assign(this, partial)
  }
}
