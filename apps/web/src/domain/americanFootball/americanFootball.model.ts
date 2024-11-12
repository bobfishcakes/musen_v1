import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('american_football')
export class AmericanFootball {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  league: number

  @Column({ nullable: true })
  season: number

  @Column({ type: 'date', nullable: true })
  date: Date

  @Column({ nullable: true })
  team: number

  @Column('json', { nullable: true })
  players: any[]

  @Column('json', { nullable: true })
  statistics: any

  constructor(partial: Partial<AmericanFootball>) {
    Object.assign(this, partial)
  }
}
