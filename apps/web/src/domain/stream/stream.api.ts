import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Stream } from './stream.model'

export class StreamApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Stream>,
  ): Promise<Stream[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/streams${buildOptions}`)
  }

  static findOne(
    streamId: string,
    queryOptions?: ApiHelper.QueryOptions<Stream>,
  ): Promise<Stream> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/streams/${streamId}${buildOptions}`)
  }

  static createOne(values: Partial<Stream>): Promise<Stream> {
    return HttpService.api.post(`/v1/streams`, values)
  }

  static updateOne(streamId: string, values: Partial<Stream>): Promise<Stream> {
    return HttpService.api.patch(`/v1/streams/${streamId}`, values)
  }

  static deleteOne(streamId: string): Promise<void> {
    return HttpService.api.delete(`/v1/streams/${streamId}`)
  }

  static findManyByStreamerId(
    streamerId: string,
    queryOptions?: ApiHelper.QueryOptions<Stream>,
  ): Promise<Stream[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/streamer/${streamerId}/streams${buildOptions}`,
    )
  }

  static createOneByStreamerId(
    streamerId: string,
    values: Partial<Stream>,
  ): Promise<Stream> {
    return HttpService.api.post(
      `/v1/users/streamer/${streamerId}/streams`,
      values,
    )
  }

  static findManyBySportingEventId(
    sportingEventId: string,
    queryOptions?: ApiHelper.QueryOptions<Stream>,
  ): Promise<Stream[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/sportingEvents/sportingEvent/${sportingEventId}/streams${buildOptions}`,
    )
  }

  static createOneBySportingEventId(
    sportingEventId: string,
    values: Partial<Stream>,
  ): Promise<Stream> {
    return HttpService.api.post(
      `/v1/sportingEvents/sportingEvent/${sportingEventId}/streams`,
      values,
    )
  }
}
