import { User } from '../user'

export class Earning {
  id: string

  amount?: number

  earningTime?: string

  streamerId?: string

  streamer?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
