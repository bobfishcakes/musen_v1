import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Clip } from './clip.model'

export class ClipApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Clip>,
  ): Promise<Clip[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/clips${buildOptions}`)
  }

  static findOne(
    clipId: string,
    queryOptions?: ApiHelper.QueryOptions<Clip>,
  ): Promise<Clip> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/clips/${clipId}${buildOptions}`)
  }

  static createOne(values: Partial<Clip>): Promise<Clip> {
    return HttpService.api.post(`/v1/clips`, values)
  }

  static updateOne(clipId: string, values: Partial<Clip>): Promise<Clip> {
    return HttpService.api.patch(`/v1/clips/${clipId}`, values)
  }

  static deleteOne(clipId: string): Promise<void> {
    return HttpService.api.delete(`/v1/clips/${clipId}`)
  }

  static findManyByStreamId(
    streamId: string,
    queryOptions?: ApiHelper.QueryOptions<Clip>,
  ): Promise<Clip[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/streams/stream/${streamId}/clips${buildOptions}`,
    )
  }

  static createOneByStreamId(
    streamId: string,
    values: Partial<Clip>,
  ): Promise<Clip> {
    return HttpService.api.post(`/v1/streams/stream/${streamId}/clips`, values)
  }
}
