import { Stream } from '../stream'

export class Clip {
  id: string

  url?: string

  creationTime?: string

  streamId?: string

  stream?: Stream

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
