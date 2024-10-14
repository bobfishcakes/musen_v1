import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { SportingEvent } from './sportingEvent.model'

@Injectable()
export class SportingEventDomainFacade {
  constructor(
    @InjectRepository(SportingEvent)
    private repository: Repository<SportingEvent>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<SportingEvent>): Promise<SportingEvent> {
    return this.repository.save(values)
  }

  async update(
    item: SportingEvent,
    values: Partial<SportingEvent>,
  ): Promise<SportingEvent> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: SportingEvent): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<SportingEvent> = {},
  ): Promise<SportingEvent[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<SportingEvent> = {},
  ): Promise<SportingEvent> {
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
}
