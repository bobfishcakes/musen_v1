import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { StreamDomainFacade } from './stream.domain.facade'
import { Stream } from './stream.model'

@Module({
  imports: [TypeOrmModule.forFeature([Stream]), DatabaseHelperModule],
  providers: [StreamDomainFacade, StreamDomainFacade],
  exports: [StreamDomainFacade],
})
export class StreamDomainModule {}
