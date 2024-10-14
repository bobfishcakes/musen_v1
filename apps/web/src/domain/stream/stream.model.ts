import { User } from '../user'

import { SportingEvent } from '../sportingEvent'

import { Comment } from '../comment'

import { Clip } from '../clip'

export class Stream {
  id: string

  startTime?: string

  endTime?: string

  gameTimeRemaining?: string

  status?: string

  streamerId?: string

  streamer?: User

  sportingEventId?: string

  sportingEvent?: SportingEvent

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  comments?: Comment[]

  clips?: Clip[]
}
