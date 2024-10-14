import { Stream } from '../stream'

export class SportingEvent {
  id: string

  name?: string

  startTime?: string

  endTime?: string

  description?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  streams?: Stream[]
}
