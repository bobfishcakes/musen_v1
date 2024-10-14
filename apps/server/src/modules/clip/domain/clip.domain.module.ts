import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ClipDomainFacade } from './clip.domain.facade'
import { Clip } from './clip.model'

@Module({
  imports: [TypeOrmModule.forFeature([Clip]), DatabaseHelperModule],
  providers: [ClipDomainFacade, ClipDomainFacade],
  exports: [ClipDomainFacade],
})
export class ClipDomainModule {}
