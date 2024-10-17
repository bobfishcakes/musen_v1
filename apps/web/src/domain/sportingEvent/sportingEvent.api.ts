import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { SportingEvent } from './sportingEvent.model'

// Define or import SimplifiedSportingEvent
interface SimplifiedSportingEvent {
  name: string
  startTime: string
  endTime: string
}

export class SportingEventApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<SportingEvent>,
  ): Promise<SportingEvent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)
    return HttpService.api.get(`/v1/sportingEvents${buildOptions}`)
  }

  static findOne(
    sportingEventId: string,
    queryOptions?: ApiHelper.QueryOptions<SportingEvent>,
  ): Promise<SportingEvent> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)
    return HttpService.api.get(
      `/v1/sportingEvents/${sportingEventId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<SportingEvent>): Promise<SportingEvent> {
    return HttpService.api.post(`/v1/sportingEvents`, values)
  }

  static updateOne(
    sportingEventId: string,
    values: Partial<SportingEvent>,
  ): Promise<SportingEvent> {
    return HttpService.api.patch(
      `/v1/sportingEvents/${sportingEventId}`,
      values,
    )
  }

  static deleteOne(sportingEventId: string): Promise<void> {
    return HttpService.api.delete(`/v1/sportingEvents/${sportingEventId}`)
  }

  static convertToSimplifiedSportingEvent(
    event: SportingEvent,
  ): SimplifiedSportingEvent {
    return {
      name: event.name || '',
      startTime: event.startTime, // Keep as string
      endTime: event.endTime, // Keep as string
    }
  }
}
