import { User } from '../user'

export class Donation {
  id: string

  amount?: number

  donationTime?: string

  userId?: string

  user?: User

  streamerId?: string

  streamer?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
