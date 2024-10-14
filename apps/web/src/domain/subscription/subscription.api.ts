import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Subscription } from './subscription.model'

export class SubscriptionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Subscription>,
  ): Promise<Subscription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/subscriptions${buildOptions}`)
  }

  static findOne(
    subscriptionId: string,
    queryOptions?: ApiHelper.QueryOptions<Subscription>,
  ): Promise<Subscription> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/subscriptions/${subscriptionId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Subscription>): Promise<Subscription> {
    return HttpService.api.post(`/v1/subscriptions`, values)
  }

  static updateOne(
    subscriptionId: string,
    values: Partial<Subscription>,
  ): Promise<Subscription> {
    return HttpService.api.patch(`/v1/subscriptions/${subscriptionId}`, values)
  }

  static deleteOne(subscriptionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/subscriptions/${subscriptionId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Subscription>,
  ): Promise<Subscription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/subscriptions${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Subscription>,
  ): Promise<Subscription> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/subscriptions`,
      values,
    )
  }

  static findManyByStreamerId(
    streamerId: string,
    queryOptions?: ApiHelper.QueryOptions<Subscription>,
  ): Promise<Subscription[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/streamer/${streamerId}/subscriptions${buildOptions}`,
    )
  }

  static createOneByStreamerId(
    streamerId: string,
    values: Partial<Subscription>,
  ): Promise<Subscription> {
    return HttpService.api.post(
      `/v1/users/streamer/${streamerId}/subscriptions`,
      values,
    )
  }
}
