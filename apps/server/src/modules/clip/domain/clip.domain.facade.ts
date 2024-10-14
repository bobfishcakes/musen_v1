import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Clip } from './clip.model'

import { Stream } from '../../stream/domain'

@Injectable()
export class ClipDomainFacade {
  constructor(
    @InjectRepository(Clip)
    private repository: Repository<Clip>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Clip>): Promise<Clip> {
    return this.repository.save(values)
  }

  async update(item: Clip, values: Partial<Clip>): Promise<Clip> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Clip): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Clip> = {},
  ): Promise<Clip[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Clip> = {},
  ): Promise<Clip> {
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

  async findManyByStream(
    item: Stream,
    queryOptions: RequestHelper.QueryOptions<Clip> = {},
  ): Promise<Clip[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('stream')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        streamId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
