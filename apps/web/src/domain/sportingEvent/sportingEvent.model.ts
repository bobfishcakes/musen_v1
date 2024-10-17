import { Stream } from '../stream'

export class SportingEvent {
  id: string
  name: string
  startTime: string
  endTime: string
  description?: string
  dateCreated: string
  dateDeleted?: string
  dateUpdated: string
  streams?: Stream[]
  league?: { id: number; name: string }
  teams?: {
    home: { id: number; name: string }
    away: { id: number; name: string }
  }

  constructor(props: Partial<SportingEvent>) {
    Object.assign(this, props)
  }
}
