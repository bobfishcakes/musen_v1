import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Stream } from './stream.model'

import { User } from '../../user/domain'

import { SportingEvent } from '../../sportingEvent/domain'

@Injectable()
export class StreamDomainFacade {
  constructor(
    @InjectRepository(Stream)
    private repository: Repository<Stream>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Stream>): Promise<Stream> {
    return this.repository.save(values)
  }

  async update(item: Stream, values: Partial<Stream>): Promise<Stream> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Stream): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Stream> = {},
  ): Promise<Stream[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Stream> = {},
  ): Promise<Stream> {
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
    queryOptions: RequestHelper.QueryOptions<Stream> = {},
  ): Promise<Stream[]> {
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

  async findManyBySportingEvent(
    item: SportingEvent,
    queryOptions: RequestHelper.QueryOptions<Stream> = {},
  ): Promise<Stream[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('sportingEvent')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        sportingEventId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
