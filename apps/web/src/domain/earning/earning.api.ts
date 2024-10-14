import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Earning } from './earning.model'

export class EarningApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Earning>,
  ): Promise<Earning[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/earnings${buildOptions}`)
  }

  static findOne(
    earningId: string,
    queryOptions?: ApiHelper.QueryOptions<Earning>,
  ): Promise<Earning> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/earnings/${earningId}${buildOptions}`)
  }

  static createOne(values: Partial<Earning>): Promise<Earning> {
    return HttpService.api.post(`/v1/earnings`, values)
  }

  static updateOne(
    earningId: string,
    values: Partial<Earning>,
  ): Promise<Earning> {
    return HttpService.api.patch(`/v1/earnings/${earningId}`, values)
  }

  static deleteOne(earningId: string): Promise<void> {
    return HttpService.api.delete(`/v1/earnings/${earningId}`)
  }

  static findManyByStreamerId(
    streamerId: string,
    queryOptions?: ApiHelper.QueryOptions<Earning>,
  ): Promise<Earning[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/streamer/${streamerId}/earnings${buildOptions}`,
    )
  }

  static createOneByStreamerId(
    streamerId: string,
    values: Partial<Earning>,
  ): Promise<Earning> {
    return HttpService.api.post(
      `/v1/users/streamer/${streamerId}/earnings`,
      values,
    )
  }
}
