import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EarningDomainModule } from '../domain'
import { EarningController } from './earning.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { EarningByUserController } from './earningByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, EarningDomainModule, UserDomainModule],
  controllers: [EarningController, EarningByUserController],
  providers: [],
})
export class EarningApplicationModule {}
