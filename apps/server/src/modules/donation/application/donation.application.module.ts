import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DonationDomainModule } from '../domain'
import { DonationController } from './donation.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DonationByUserController } from './donationByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, DonationDomainModule, UserDomainModule],
  controllers: [DonationController, DonationByUserController],
  providers: [],
})
export class DonationApplicationModule {}
