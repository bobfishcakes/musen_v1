import { Stream } from '../stream'

import { User } from '../user'

export class Comment {
  id: string

  content?: string

  commentTime?: string

  streamId?: string

  stream?: Stream

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
