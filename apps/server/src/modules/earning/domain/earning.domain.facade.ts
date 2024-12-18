import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Earning } from './earning.model'

import { User } from '../../user/domain'

@Injectable()
export class EarningDomainFacade {
  constructor(
    @InjectRepository(Earning)
    private repository: Repository<Earning>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Earning>): Promise<Earning> {
    return this.repository.save(values)
  }

  async update(item: Earning, values: Partial<Earning>): Promise<Earning> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Earning): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Earning> = {},
  ): Promise<Earning[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Earning> = {},
  ): Promise<Earning> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByStreamer(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Earning> = {},
  ): Promise<Earning[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('streamer')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        streamerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
