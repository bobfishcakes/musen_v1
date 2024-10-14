import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EarningDomainFacade } from './earning.domain.facade'
import { Earning } from './earning.model'

@Module({
  imports: [TypeOrmModule.forFeature([Earning]), DatabaseHelperModule],
  providers: [EarningDomainFacade, EarningDomainFacade],
  exports: [EarningDomainFacade],
})
export class EarningDomainModule {}
