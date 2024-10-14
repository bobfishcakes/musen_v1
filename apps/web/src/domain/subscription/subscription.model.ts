import { User } from '../user'

export class Subscription {
  id: string

  startDate?: string

  endDate?: string

  userId?: string

  user?: User

  streamerId?: string

  streamer?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
