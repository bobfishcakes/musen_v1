import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommentDomainModule } from '../domain'
import { CommentController } from './comment.controller'

import { StreamDomainModule } from '../../../modules/stream/domain'

import { CommentByStreamController } from './commentByStream.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CommentByUserController } from './commentByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CommentDomainModule,

    StreamDomainModule,

    UserDomainModule,
  ],
  controllers: [
    CommentController,

    CommentByStreamController,

    CommentByUserController,
  ],
  providers: [],
})
export class CommentApplicationModule {}
