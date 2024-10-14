import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DonationDomainFacade } from './donation.domain.facade'
import { Donation } from './donation.model'

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), DatabaseHelperModule],
  providers: [DonationDomainFacade, DonationDomainFacade],
  exports: [DonationDomainFacade],
})
export class DonationDomainModule {}
