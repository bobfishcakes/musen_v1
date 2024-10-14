import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Donation } from './donation.model'

export class DonationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Donation>,
  ): Promise<Donation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/donations${buildOptions}`)
  }

  static findOne(
    donationId: string,
    queryOptions?: ApiHelper.QueryOptions<Donation>,
  ): Promise<Donation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/donations/${donationId}${buildOptions}`)
  }

  static createOne(values: Partial<Donation>): Promise<Donation> {
    return HttpService.api.post(`/v1/donations`, values)
  }

  static updateOne(
    donationId: string,
    values: Partial<Donation>,
  ): Promise<Donation> {
    return HttpService.api.patch(`/v1/donations/${donationId}`, values)
  }

  static deleteOne(donationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/donations/${donationId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Donation>,
  ): Promise<Donation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/donations${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Donation>,
  ): Promise<Donation> {
    return HttpService.api.post(`/v1/users/user/${userId}/donations`, values)
  }

  static findManyByStreamerId(
    streamerId: string,
    queryOptions?: ApiHelper.QueryOptions<Donation>,
  ): Promise<Donation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/streamer/${streamerId}/donations${buildOptions}`,
    )
  }

  static createOneByStreamerId(
    streamerId: string,
    values: Partial<Donation>,
  ): Promise<Donation> {
    return HttpService.api.post(
      `/v1/users/streamer/${streamerId}/donations`,
      values,
    )
  }
}
